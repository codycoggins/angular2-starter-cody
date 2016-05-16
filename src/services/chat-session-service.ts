
import {Injectable, Inject} from 'angular2/core';
import {Http, Headers, URLSearchParams, Response, HTTP_PROVIDERS}
  from 'angular2/http';
import {Observable} from 'rxjs/Observable';

import {ChatItem} from './chat-item';
// import {List} from 'immutable';

@Injectable()
export class ChatSessionService {

    http: Http;
    headers: Headers;

    conversationId: string;
    clientId: string;
    dialogId: string;


    apiHostName: string =
      'http://nielsen-bluemix-orchestration-app.mybluemix.net';

    constructor(http: Http)  {
        this.http = http;
        this.headers.append('Content-Type', 'application/json; charset=utf-8');
        this.headers.append('Accept', 'application/json');
    }

    getAllChats() {
        return this.http.get('/api/conversation');
    }

    initiateChat() : Observable<Response> {
      let apiPath: string = '/api/initConversation';
      return this.http.get( this.apiHostName + apiPath ,
        {headers: this.headers }).share();

    }
    // formerly returned Observable<List<ChatItem>>
    addUserChatItem(newChatItem: ChatItem) : Observable <Response> {


        const params = new URLSearchParams();
        params.set('input', newChatItem.text);

        // if this is the first post for the application, only supply input
        let apiPath: string =  '/api/conversation/client/'
          + this.clientId + '/id/' + this.conversationId;
        // if not first time, provide dialog and conversation IDs
        if (this.clientId != null && this.conversationId != null) {
          console.log ('GET ' + this.apiHostName + apiPath );
          // payload should be:  JSON.stringify(newChatItem)
          return this.http.get(this.apiHostName + apiPath ,
            {headers: this.headers, search: params }).share();
        }
        // post returns Observable<Response>
    }

    recordSessionIDs(res: Response) {
      console.log('recordSessionIDs: ' + res.text());
      let body: any = res.json;
      console.log('extracted conversation_id: ' + body.conversation_id);
      console.log('extracted clientId: ' + body.client_id);
      console.log('extracted response: ' + JSON.stringify(body.response));
    }


}
