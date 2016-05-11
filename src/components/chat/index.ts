import { Component, Input, Output, EventEmitter, Inject, Injectable }
  from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { ChatItem } from '../../services/chat-item';
import { ChatSessionService } from '../../services/chat-session-service';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';
import {ChatSessionStore} from '../../services/chat-session-store';

// comment
@Component({
  selector: 'chat',
  styles: [`
    .dialog {
      margin: 10px;
    }

    .watson {
      border-left: solid lightblue thick;
      padding-left: 10px;
    }

    .user {
      border-right: solid lightgreen thick;
      margin-left: 75px;
      padding-right: 10px;
    }
  `],
  template: `
    <div class="clearfix fit" style="560px">
       <div id="chatlog"
          style="height:500px;" class="fit overflow-auto"
           >
          <div *ngFor="let chatItem of chatSessionStore.allChatItems | async" class="dialog {{chatItem.isWatson ? 'watson' : 'user'}}"
            >{{chatItem.text}}</div>
       </div>

       <input #inputBox type="text" class="fit form-control left-0 right-0"
         style="height:30px; padding:5px;"
         (keyup.enter)="send(inputBox.value); inputBox.value='';"
         placeholder="Enter Question"
         value="{{newText}}"
       />
       <button (click)="send(inputBox.value);inputBox.value='';"
       class="form-control right-0"
       >ASK</button>
    </div>
  `,
  directives: [Chat],
  providers: [ChatSessionStore]
})
export class Chat {
  // chatText: string;
  newText: string;

  constructor(private chatSessionStore: ChatSessionStore) {
    // this.chatText = '<div class="dialog watson">Hi, Alvin. How can I '
    //   + 'help you today?</div>';

  }
  send (newText: string) {
    // this.chatText = this.chatText + '<div class="dialog user"> test '
    //   + newText + '</div>';
      // this.heroService.addHero(name)
      //                  .subscribe(
      //                    hero  => this.heroes.push(hero),
      //                    error =>  this.errorMessage = <any>error);

    let newChatI: ChatItem = new ChatItem(newText, false);
    this.chatSessionStore.addChatAndResponse (newChatI);
  };

  showWatsonMessage(watsonText: string) {
    //  this.chatText = this.chatText + '<div class="dialog watson">'
    //       + watsonText + '</div>';

    let newChatW: ChatItem = new ChatItem(watsonText, true);
    this.chatSessionStore.addChat (newChatW);
  }
};
