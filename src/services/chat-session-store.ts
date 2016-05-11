import {Injectable} from 'angular2/core';
import {ChatSessionService} from './chat-session-service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {ChatItem} from './chat-item';
import {List} from 'immutable';
import {asObservable} from './asObservable';
import {BehaviorSubject} from 'rxjs/Rx';

@Injectable()
export class ChatSessionStore {

    private _allChatItems: BehaviorSubject<List<ChatItem>> =
      new BehaviorSubject(List([]));

    constructor(private chatSessionService: ChatSessionService) {
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
                    let chatResponse: ChatItem =
                      new ChatItem(this.formatReponse(res.json()[0]), true);
                    this._allChatItems.next(
                      this._allChatItems.getValue().push( chatResponse  ));
                    console.log ('addChat returned text ' + res.text());
                    console.log ('addChat returned json ' + res.json());
                });

        return obs;
    }

    formatReponse (watsonText: string): string {
      console.log('formatReponse()');
      console.log('  input\n' + watsonText);
      let processedText: string = watsonText;
      if (processedText.length == 0) {
        processedText =
          'I do not understand your question, can you ask a different way?';
      }
      processedText = processedText.replace(
        'Yes/No',
        '<ul><li><a>Yes</a></li><li><a>Yes</a></li></ul>');

      let re: RegExp = /mct\:/gi;
      processedText = processedText.replace(re, 'mct-');
      processedText = processedText.replace('=====================', '');
      re = /\<br\>/gi;
      processedText = processedText.replace(re, '<li>');
      processedText = processedText.replace('\n\n', '<br>');
      // processedText = processedText.replace('<br>','<li>');
      return processedText;
    }

}
