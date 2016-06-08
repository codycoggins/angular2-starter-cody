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

    private _fullResponse: any = {};
    private _visualType: string = 'visual_none';
    private _visualData: any[] = <any[]>{};
    public intent: string = '';
    public profile: OLProfile = <OLProfile> {};

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

    findMinMaxVal ( columnNum: number, dir: number ): number {
      // return the minimum/maximum value for a column
      if (dir === 0 ) {
        console.log('findMinMaxVal: ERROR dir cannot be 0');
        return 0;
      }
      let data: any = this._visualData;
      // seed with first data row
      let maxVal: number = data[1][columnNum] * dir;
      let returnVal: number = data[1][columnNum];
      // returns column 0 value of the min/max row
      // evalueated by columnNum;
      for (let i = 0; i < data.length; i++) {

        if (i === 0) {
          // Skip; header row
        } else {
          let newNum: number = data[i][columnNum];
          if ((newNum * dir) > maxVal || (newNum * dir) == maxVal) {
            maxVal = newNum * dir;
            returnVal = newNum;
          }
        }
      }
      return returnVal;
    }

    updateDialogProfile (key: string, value: string) {
        this.profile[key] = value;
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
              // console.log ('header ' + j + headers[j]);
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
                    console.log ('\nOrchestration Layer Initialization returned:\n ' + JSON.stringify(res.json()));
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
                      console.log ("ChatSessionStore: Error in communicating with Orchestration Layer.");
                      console.log (err);
                      let chatResponse: ChatItem = new ChatItem(
                         'I am not currently able to commnicate with the server. The system may be under maintenence  Please try again later.',
                           true);
                        //  if ( chatResponse.text.length > 0) {
                           this._allChatItems.next(
                             this._allChatItems.getValue().push( chatResponse  ));
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
                    this._fullResponse = res;
                    this.intent = resJson.profile.CLASSIFIER_CLASS_0;
                    this.profile = resJson.profile;
                    this.visualData = resJson.data;

                    this.manageProfileVariables ();

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
                    this.updateVisual(resJson.mcthides);

                  },
                  err => {
                      console.log (err);
                    }
                  );
        return obs;
    }

    updateVisual(mcthides: string[]) {
      if (mcthides.length > 0 && mcthides[0].length > 0) {
            this.visualType = 'visual_none';
            this.visualType = mcthides[0];
      } else {
        console.log ('chatSessionStore: updateVisual: no mcthides values detected.');
      }
    }

    formatReponse (watsonText: string): string {
      console.log('formatReponse(' + watsonText + ')');
      if (watsonText == null) {
          console.log('  null watsonText.');
          return '';
      }


      // console.log('  formatReponse raw input:\n\n' + watsonText + '\n');
      let processedText: string = this.dialogParser.parse( watsonText);

      processedText = this.substituteProfileVariables(processedText);

      return processedText;
    }

// For reference these are the profile variables:
// {"retailer":"","subbrand_channel_perf":"","channel":"","sub_brand":"","subbrand_retailer_perf":"",
//  "performance_level":"decline","region":"","brand":"SUAVE"}
    substituteProfileVariables (watsonText: string): string {

      let r: string = watsonText;
      r = r.replace('var_region', this.safeGetProfileVar('region'))  ;
      r = r.replace('var_subbrand', this.safeGetProfileVar('sub_brand'))  ;
      r = r.replace('var_performance_level', this.safeGetProfileVar('performance_level'));
      r = r.replace('var_channel', this.safeGetProfileVar('channel'));
      r = r.replace('var_retailer', this.safeGetProfileVar('retailer'));
      r = r.replace('var_subbrand_channel_perf', this.safeGetProfileVar('subbrand_channel_perf'));
      r = r.replace('var_subbrand_retailer_perf', this.safeGetProfileVar('subbrand_retailer_perf'));
      console.log ('substituteProfileVariables(' + watsonText + ') = ' + r );
      return r;
    }

    safeGetProfileVar ( key: string): string {
      if (this.profile[key] && this.profile[key].length > 0) {
        return this.profile[key].toUpperCase();
      } else {
        return '(var_' + key + ')';
      }

    }

    manageProfileVariables () {
      console.log ('manageProfileVariables()');
      if (this.intent == 'region_performance') {
        console.log ('manageProfileVariables()  processing intent region_performance');
        let region: string = this.findMinMax(6, -1);
        console.log ('The region in decline is ' + region);
        this.updateDialogProfile('region', region);

      } else if (this.intent == 'retailer_performance') {
        let retailer: string = this.findMinMax(6, -1);
        console.log ('The retailer causing the decline is ' + retailer);
        this.updateDialogProfile('retailer', retailer);

      } else  if (this.intent === 'subbrand_performance') {
        // code to determine subbrand causing decline
        let subbrand = this.findMinMax(6, -1);
        console.log ('The subbrand in decline is ' + subbrand);
        this.updateDialogProfile('sub_brand', subbrand);

      } else if (this.intent === 'channel_performance') {
        // code to determine channel causing decline
        let channel = this.findMinMax(6, -1);
        console.log ('The channel in decline is ' + channel);
        this.updateDialogProfile('channel', channel);

    } else {
      console.log ('manageProfileVariables()  did not find a matching intent, so no profile variable processing has been done.');

    }
  }
}

export interface ITranslatedData {
    key: string;
    values: any[];
}
