import {Injectable} from 'angular2/core';
import {ChatSessionService} from './chat-session-service';
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
        let intro: ChatItem =
          new ChatItem('Welcome, I\'m Watson. How may I help you?', true);
        this.addChat(intro);
        // this.chatSessionService.getAllChats()
        //     .subscribe(
        //         res => {
        //             let allChatItems =
        //                 (<Object[]>res.json()).map((todo: any) =>
        //                 new ChatItem({id:todo.id,
        // description:todo.description,completed: todo.completed}));
        //
        //             this._allChatItems.next(List(allChatItems));
        //         },
        //         err => console.log('Error retrieving Chats')
        //     );

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
                    console.log ('addChat returned json ' + res.json());
                    let resJson: any = res.json();
                    if (resJson.length === 0) {
                      console.log('WARNING: no data returned from Dialog Service');
                      return;
                    }
                    for (let i: number = 0; i < resJson.length; i++) {
                      ;
                      let chatResponse: ChatItem = new ChatItem(
                        this.formatReponse(resJson[i]),
                         true);
                         this._allChatItems.next(
                           this._allChatItems.getValue().push( chatResponse  ));
                    }
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
      console.log('  input\n' + watsonText);
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
