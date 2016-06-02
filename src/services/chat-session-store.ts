import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {ChatSessionService, IinitConversation, OLMessage, OLProfile} from './chat-session-service';
import {List} from 'immutable';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/Rx';

import {asObservable} from './asObservable';
import {DialogParser} from './dialog-parser';
import {ChatItem} from './chat-item';
import {VisualizationStore} from './visualization-store';

@Injectable()
export class ChatSessionStore {
    private _allChatItems: BehaviorSubject<List<ChatItem>> =
      new BehaviorSubject(List([]));

    private _visualType: string = 'visual_none';
    private _visualData: any[];
    public intent: string;
    public profile: OLProfile;

    dialogParser: DialogParser;
    chatSessionService: ChatSessionService;
    visualizationStore: VisualizationStore;

    visualTypes: string[] = ['visual_map', 'visual_bar',
    'visual_column', 'visual_pie', 'visual_list',
    'visual_bubble', 'visual_none'];

    constructor(chatSessionService: ChatSessionService,
        dialogParser: DialogParser,
        visualizationStore: VisualizationStore,
        private router: Router) {
        this.chatSessionService = chatSessionService;
        this.dialogParser = dialogParser;
        this.visualizationStore = visualizationStore;
        this.loadInitialData();
    }

    get allChatItems() {
        return asObservable(this._allChatItems);
    }

    set visualType(visualType: string) {
      // special case to fix wrong visual type on social_feedback
      if (this.intent == 'social_feedback') {
        visualType = 'visual_bar';
      }
      this._visualType = visualType;
      let routeName: string = visualType.replace('visual', 'Visual').replace('_', '-');
      console.log ('** Routing to ' + routeName + '**');
      this.router.navigate( [routeName] );
    }

    get visualType () {
      return this._visualType;
    }

    set visualData(visualData: any[][]) {
      // conditional so we only refresh the data if it is non-null.
      // otherwise old data sticks around.
      if (visualData != null && visualData.length > 0 ) {
        console.log ('set data: \n' + JSON.stringify( visualData) + '\n');
        this._visualData = visualData;
      }
    }

    get visualData (){
      return this._visualData;
    }


    // set dir to -1 for min, +1 for max
    // returns column 0 value of the min/max row
    // evalueated by columnNum.
    // column numbers start with 0
    findMinMax ( columnNum: number, dir: number ): any {
      // return column 0 for the row with maximum columnNum

      let data: any = this._visualData;
      let maxVal: number = 0;
      let returnKey;
      // returns column 0 value of the min/max row
      // evalueated by columnNum;
      for (let i = 0; i < data.length; i++) {

        if (i === 0) {
          // Skip; header row
        } else {
          let newNum: number = data[i][columnNum] * dir;
            if (newNum > maxVal || newNum == maxVal) {
              maxVal = newNum;
              returnKey = data[i][0];
            }
        }
      }
      return returnKey;
    }


    updateDialogProfile (key: string, value: string) {
        this.chatSessionService.updateDialogProfile (key, value);
    }

    translatedData(): [ITranslatedData] {
      let data: any[][] = this._visualData;
      let result: ITranslatedData = <ITranslatedData> {"key": "Data", values: []};

      let newJson: string ;
      if (data == null || data.length === 0) {
        console.log('translateData: WARNING null data');
        return null;
      }
      // let newJson: string = '';
      let headers = [ ];

      for (let i = 0; i < data.length; i++) {

        if (i === 0) {
            for (let j = 0; j < data[i].length; j++) {
              headers[j] = data[0][j] ;
              console.log ('header ' + j + headers[j]);
            }
        } else {
          let newItem: any = {};
          for (let j = 0; j < data[i].length; j++) {
            if (headers[j] == 'MESSAGE_BODY') {
              // special case, UUENCODE

              newItem[headers[j]] = encodeURIComponent( data[i][j]);
            } else {
              newItem[headers[j]] = data[i][j];
            }
          }
          result.values.push(newItem);
        }
      }

      console.log('translatedData: \n' + JSON.stringify(result) );
      // return newJson;
      return [result];

    }


    loadInitialData() {
        // put the request to the server.
        let obs: Observable<any> = this.chatSessionService.initiateChat();
        // make sure we are on the starting page
        this.visualType = 'Visual-none';
        // manage the reponse from the server
        obs.subscribe(
                res => {
                    console.log ('Initializing Chat');
                    console.log ('\nOrchestration Layer Initialization returned:\n ' + res.json());
                    let resJson: IinitConversation = <IinitConversation> res.json();
                    if (resJson == null || resJson.id == null) {
                      console.log
                        ('WARNING: no data returned from Dialog Service on initial call');
                      return;
                    }
                    console.log ('initConversation API returned '
                      + JSON.stringify( res.json()));
                    this.chatSessionService.recordSessionIDs(resJson);
                    for (let i: number = 0; i < resJson.response.length; i++) {
                      if (resJson.response[i].trim().length > 0 ) {
                        let chatResponse: ChatItem = new ChatItem(
                           this.formatReponse(resJson.response[i]),
                             true);
                           console.log ('** managing new chat items.  length is ' + chatResponse.text.length );
                          //  if ( chatResponse.text.length > 0) {
                             this._allChatItems.next(
                               this._allChatItems.getValue().push( chatResponse  ));
                          //  }
                      }
                    }
                  },
                  err => {
                      console.log (err);
                    }
                  );
        return obs;

    }

    addChat(newChat: ChatItem): boolean  {

      this._allChatItems.next(
        this._allChatItems.getValue().push( newChat  ));
      return true;
    }

    addChatAndResponse(newChat: ChatItem): Observable<any> {
        // display the user's input
        this.addChat(newChat);
        // put the request to the server.
        let obs = this.chatSessionService.addUserChatItem(newChat);

        // manage the reponse from the server
        obs.subscribe(
                res => {
                    console.log ('\nOrchestration Layer returned: \n' + res.text());
                    // console.log ('addChat returned json ' + res.json());
                    let resJson: OLMessage = <OLMessage> res.json();
                    if (resJson == null ) {
                      console.log('WARNING: no data returned from Dialog Service');
                      return;
                    }
                    this.intent = resJson.profile.CLASSIFIER_CLASS_0;
                    this.profile = resJson.profile;
                    this.visualData = resJson.data;

                    for (let i: number = 0; i < resJson.response.length; i++) {
                      // what is issue with next line?
                      // if (resJson.response[i].length > 0) {
                        let chatResponse: ChatItem = new ChatItem(
                          this.formatReponse(resJson.response[i]),
                           true);
                           this._allChatItems.next(
                             this._allChatItems.getValue().push( chatResponse  ));
                      // }
                    }
                  },
                  err => {
                      console.log (err);
                    }
                  );
        return obs;
    }

    formatReponse (watsonText: string): string {
      console.log('formatReponse(' + watsonText + ')');
      if (watsonText == null) {
          console.log('  null watsonText.');
          return '';
      }
      for (let i: number = 0; i < this.visualTypes.length; i++)  {
        // console.log('try ' + this.visualTypes[i]);
        if (watsonText.match('<mct:hide>' + this.visualTypes[i] + '</mct:hide>')) {
          // this.visualizationStore.addImage (this.visualizationStore.visMap1)  ;
          // console.log ('match ' + this.visualTypes[i]);
          this.visualType = 'visual_none';
          this.visualType = this.visualTypes[i];
          continue;
        } else {
          // console.log ('formatReponse: no match for visuals.');
        }
      }
      // console.log('  formatReponse raw input:\n\n' + watsonText + '\n');
      let processedText: string = this.dialogParser.parse( watsonText);
      // // if (processedText.length === 0) {
      // //   processedText =
      // //     'I do not understand your question, can you ask a different way?';
      // // }
      // processedText = processedText.replace(
      //   'Yes/No',
      //   '<ul><li><a>Yes</a></li><li><a>Yes</a></li></ul>');
      //
      // processedText = processedText.replace(
      //   /Yes.*No/,
      //   '<ul><li><a><b>Yes</b></a></li><li><a>Yes</a></li></ul>');
      // let re: RegExp = /mct\:/gi;
      // processedText = processedText.replace(re, 'mct-');
      // processedText = processedText.replace('=====================', '');
      // re = /\<br\>/gi;
      // processedText = processedText.replace(re, '<li>');
      // processedText = processedText.replace('\n\n', '<br>');
      // // processedText = processedText.replace('<br>','<li>');
      return processedText;
    }

}


export interface ITranslatedData {
    key: string;
    values: any[];
}
