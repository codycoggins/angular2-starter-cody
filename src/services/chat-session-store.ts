import {Injectable} from 'angular2/core';
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

    dialogParser: DialogParser;
    chatSessionService: ChatSessionService;
    visualizationStore: VisualizationStore;

    constructor(chatSessionService: ChatSessionService,
        dialogParser: DialogParser,
        visualizationStore: VisualizationStore) {
        this.chatSessionService = chatSessionService;
        this.dialogParser = dialogParser;
        this.visualizationStore = visualizationStore;
        this.loadInitialData();
    }

    get allChatItems() {
        return asObservable(this._allChatItems);
    }


    loadInitialData() {
        // put the request to the server.
        let obs: Observable<any> = this.chatSessionService.initiateChat();

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
                      if (resJson.response[i].length > 0) {
                        let chatResponse: ChatItem = new ChatItem(
                          this.formatReponse(resJson.response[i]),
                           true);
                           this._allChatItems.next(
                             this._allChatItems.getValue().push( chatResponse  ));
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
      console.log('formatReponse()');
      if (watsonText == null) {
          console.log('  null watsonText.');
          return '';
      }
      if (watsonText.match(/<mct\:hide>visual_map<\/mct\:hide>/)) {
        this.visualizationStore.addImage (this.visualizationStore.visMap1)  ;
      }
      if (watsonText.match(/<mct\:hide>visual_barchart<\/mct\:hide>/)) {
        this.visualizationStore.addImage (this.visualizationStore.visBarchart1)  ;
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
