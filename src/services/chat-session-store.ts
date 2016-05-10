
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
        let intro: ChatItem = new ChatItem('Welcome, I\'m Watson. How may I help you?', true);
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
                    let chatResponse: ChatItem = new ChatItem(res.text(), true);
                    this._allChatItems.next(
                      this._allChatItems.getValue().push( chatResponse  ));
                    console.log ('addChat returned ' + res.text());
                });

        return obs;
    }

}
