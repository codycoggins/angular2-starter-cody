
import {Injectable, Inject} from 'angular2/core';
import {Http, Headers, URLSearchParams, Response, HTTP_PROVIDERS}
  from 'angular2/http';
import {ChatItem} from './chat-item';
// import {List} from 'immutable';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ChatSessionService {

    http: Http;

    constructor(http: Http)  {
        this.http = http;
    }

    getAllChats() {
        return this.http.get('/api/chat');
    }

    // formerly returned Observable<List<ChatItem>>
    addUserChatItem(newChatItem: ChatItem) : Observable<Response> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        // post returns Observable<Response>

        return this.http.post('/api/chat',
          JSON.stringify(newChatItem),
          {headers}).share();
    }



}
