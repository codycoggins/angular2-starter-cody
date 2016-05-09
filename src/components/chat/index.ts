import { Component, Input, Output, EventEmitter, Inject } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { ChatItem } from '../../services/chat-item';
import { ChatSessionService } from '../../services/chat-session-service';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';
import {ChatSessionStore} from '../../services/chat-session-store';


// comment
@Component({
  selector: 'chat',
  template: `
    <div class="clearfix fit">
      <div id="chatlog"
       style="height:300px;"
       class="fit overflow-auto">
         <div *ngFor="#chatItem of chatSessionStore.allChatItems | async"
             [ngClass]="{completed: todo.completed}">
         <div class="dialog watson"></div>
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
  directives: [Chat]
})
export class Chat {
  chatText: string;
  newText: string;

  constructor(private chatSessionStore: ChatSessionStore) {
    // this.chatText = '<div class="dialog watson">Hi, Alvin. How can I '
    //   + 'help you today?</div>';

  }
  send (newText: string) {
    this.chatText = this.chatText + '<div class="dialog user">'
      + newText + '</div>';
      // this.heroService.addHero(name)
      //                  .subscribe(
      //                    hero  => this.heroes.push(hero),
      //                    error =>  this.errorMessage = <any>error);

  let newChatI: ChatItem = new ChatItem({text: newText, isWatson: false});
  this.chatSessionStore.addChat (newChatI);
  };

  showWatsonMessage(watsonText: string) {
     this.chatText = this.chatText + '<div class="dialog watson">'
          + watsonText + '</div>';

  }
};
