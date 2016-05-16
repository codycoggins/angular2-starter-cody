
import {Injectable, Inject} from 'angular2/core';
import {Http, Headers, URLSearchParams, Response, HTTP_PROVIDERS}
  from 'angular2/http';
import {Observable} from 'rxjs/Observable';

import {ChatItem} from './chat-item';
// import {List} from 'immutable';

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
        const url =
      'http://nielsen-bluemix-orchestration-app.mybluemix.net/api/conversation';
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Accept', 'application/json');

        const params = new URLSearchParams();
        params.set('message', newChatItem.text);
        // post returns Observable<Response>
        console.log ('GET ' + url + ', ' + JSON.stringify(newChatItem));
        // payload should be:  JSON.stringify(newChatItem)
        return this.http.get(url,
          {headers: headers, search: params}).share();
    }



}
