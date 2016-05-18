import {Injectable} from 'angular2/core';
import {ChatSessionService, IinitConversation} from './chat-session-service';
import {List} from 'immutable';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/Rx';

import {asObservable} from './asObservable';
import {DialogParser} from './dialog-parser';
import {ChatItem} from './chat-item';

@Injectable()
export class ChatSessionStore {


    private _allChatItems: BehaviorSubject<List<ChatItem>> =
      new BehaviorSubject(List([]));

    dialogParser: DialogParser;
    chatSessionService: ChatSessionService;

    constructor(chatSessionService: ChatSessionService,
        dialogParser: DialogParser) {
        this.chatSessionService = chatSessionService;
        this.dialogParser = dialogParser;
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
                    // console.log ('addChat returned json ' + res.json());
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
                        // if (resJson.response[i] !== null && resJson.response[i] !== '') {
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
                    console.log ('addChat returned text ' + res.text());
                    // console.log ('addChat returned json ' + res.json());
                    let resJson: any = res.json();
                    if (resJson.length === 0) {
                      console.log('WARNING: no data returned from Dialog Service');
                      return;
                    }
                    for (let i: number = 0; i < resJson.length; i++) {
                      if (resJson.response[i] !== null && resJson.response[i] !== '') {
                        let chatResponse: ChatItem = new ChatItem(
                          this.formatReponse(resJson[i]),
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

    formatReponse (watsonText: string): string {
      console.log('formatReponse()');
      if (watsonText == null) {
          console.log('  null watsonText.');
          return '';
      }
      console.log('  formatReponse raw input:\n\n' + watsonText + '\n');
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
