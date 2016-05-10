
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
        const url =  '/api/testDialogs';
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Accept', 'application/json');

        // post returns Observable<Response>
        console.log ('GET ' + url + ', ' + JSON.stringify(newChatItem));
        // payload should be:  JSON.stringify(newChatItem)
        return this.http.get(url,
          {headers}).share();
    }



}
