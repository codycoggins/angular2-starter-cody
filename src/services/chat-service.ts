import { Injectable }     from 'angular2/core';
import { Http, Response, Headers, RequestOptions} from 'angular2/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class ChatService {
  private chatUrl = '/api/chat';  // URL to web api
  constructor (private http: Http) {}

  getChat (userText: string)  {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let postBody  = '{' + userText + '}';
    return this.http.post(this.chatUrl, postBody, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: any) {
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return errMsg;
  }
}
