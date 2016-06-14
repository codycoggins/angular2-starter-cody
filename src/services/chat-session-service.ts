
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


    // TODO: change to  'http://nielsen-orchestration-gateway-dev.mybluemix.net';
    // when Juanyong is ready




    // for PROD OL
    // apiHostName: string =
    //   'http://nielsen-orchestration-gateway.mybluemix.net';
    // jwtToken: string = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTQ2NjE3MjE4MH0.6axEGNAAoTPnLWgQ_jmPGbXItEEPoyw7nukpjK7lqvY6JCiITh0krORjLwuM-xPAUGzm3k0b17uwatGeLxWLxw';

    // for DEV OL
    apiHostName: string =
      'http://nielsen-orchestration-gateway-dev.mybluemix.net';

    jwtToken: string =  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTQ2ODUyOTU2M30.mDJgVeTdcrmFDICzx9j7hAenxj40Oj9vbJfrb7-vCDDG3wkpK3O9U2CKrAnHunntPqdm4Bif8wzIQbbiXEe_vQ';

    constructor(http: Http)  {
        this.http = http;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json; charset=utf-8');
        this.headers.append('Accept', 'application/json');
        this.headers.append('Authorization', this.jwtToken );
    }

    // getAllChats() {
    //     return this.http.get('/api/conversation');
    // }

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

    recordSessionIDs(initConversation: IinitConversation) {
      // console.log('recordSessionIDs('
      //   + JSON.stringify(initConversation) + ')') ;
      this.conversationId = initConversation.id.toString();
      this.clientId = initConversation.clientId.toString();
      console.log('extracted conversation_id: ' + initConversation.id);
      console.log('extracted clientId: ' + initConversation.clientId);
      try {
        console.log('extracted response[0]: ' + initConversation.response[0]);
      } catch (err) {
        console.error(err);
      }
    }

    // PUT /api/updateDialogProfile/client/{clientID}
    // formerly returned Observable<List<ChatItem>>
    updateDialogProfile (key: string, value: string)  {
        console.log ('ChatSessionService.updateDialogProfile (key = ' + key + ', value= ' + value + ')');

        let newChatI: ChatItem = new ChatItem(key + ' = ' + value, true);
        let obs = this.addUserChatItem(newChatI);
        obs.subscribe(
                res => {
                  console.log (res);
                },
                err => {
                  console.log (err);
                }
              );

        // now set profile variable
        // const params = new URLSearchParams();
        let body: string = '{\"' + key + '\": \"' + value + '\"}';

        // if this is the first post for the application, only supply input
        let apiPath: string =  '/api/updateDialogProfile/client/'
          + this.clientId ;
        // if not first time, provide dialog and conversation IDs
        if (this.clientId != null && this.conversationId != null) {
          console.log ('PUT ' + this.apiHostName + apiPath );
          console.log ('body= ' + body);
          // payload should be:  JSON.stringify(newChatItem)
          let obs2 = this.http.put(this.apiHostName + apiPath , body,
            {headers: this.headers }).share() ;
          obs2.subscribe(
                    res => {
                      console.log (res);
                    },
                    err => {
                      console.log (err);
                    }
                  );
        }

        // post returns Observable<Response>
    }

    updateDialogProfile2 (key: string, value: string)  {
        console.log ('ChatSessionService.updateDialogProfile (key = ' + key + ', value= ' + value + ')');
        let body: string = '{\"' + key + '\": \"' + value + '\"}';

        // if this is the first post for the application, only supply input
        let apiPath: string =  '/api/updateDialogProfile/client/'
          + this.clientId ;
        // if not first time, provide dialog and conversation IDs
        if (this.clientId != null && this.conversationId != null) {
          console.log ('PUT ' + this.apiHostName + apiPath );
          console.log ('body= ' + body);
          // payload should be:  JSON.stringify(newChatItem)
          let obs2 = this.http.put(this.apiHostName + apiPath , body,
            {headers: this.headers }).share() ;
          obs2.subscribe(
                    res => {
                      console.log (res);
                    },
                    err => {
                      console.log (err);
                    }
                  );
        }
    }

    // getDialogProfile (key: string, value: string) : Observable <Response> {
    //
    //     // const params = new URLSearchParams();
    //     let body: string = '{' + key + ',' + value + '}';
    //     // if this is the first post for the application, only supply input
    //     let apiPath: string =  '/api/updateDialogProfile/client/'
    //       + this.clientId + '/id/' + this.conversationId;
    //     // if not first time, provide dialog and conversation IDs
    //     if (this.clientId != null && this.conversationId != null) {
    //       console.log ('POST ' + this.apiHostName + apiPath );
    //       // payload should be:  JSON.stringify(newChatItem)
    //       return this.http.post(this.apiHostName + apiPath , body,
    //         {headers: this.headers }).share();
    //     }
    //     // post returns Observable<Response>
    // }
}




export interface IinitConversation {
    clientId: number;
    confidence: number;
    dialogId: string;
    id: number; // this is the conversation_id
    input: string;
    response: string[];
}

export interface OLMessage {
    profile: OLProfile;
    data: any;
    clientId: number;
    response: string[];
    mctinputs: string[];
    mcthides: string[];
    dialogId: string;
    cnversationId: number; // this is the conversation_id
}

export interface OLProfile {
    original_question: string;
    CLASSIFIER_CLASS_0: string;
    CLASSIFIER_CONF_0: number;
    retailer: string;
    ui_region: string;
    region: string;
    channel: string;
    sub_brand: string;
    sql_query_in: string;
    sql_query_out: string;
    visual_type: string;
    performance_level: string;
    profile_prompts: string;
    brand: string;
}
