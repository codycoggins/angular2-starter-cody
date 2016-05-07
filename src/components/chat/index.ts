import { Component, Input } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { ChatService } from '../../services/chat-service';

// comment
@Component({
  selector: 'chat',
  template: `
    <div class="clearfix fit">
      <div id="chatlog"
       style="height:300px;"
       class="fit overflow-auto"
       [innerHTML]="chatText">
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
  providers:  [
  HTTP_PROVIDERS,
  ChatService
]
})
export class Chat {
  chatText: string;
  newText: string;

  constructor(private chatService: ChatService) {
    this.chatText = '<div class="dialog watson">Hi, Alvin. How can I '
      + 'help you today?</div>';

  }
  send (newText: string) {
    this.chatText = this.chatText + '<div class="dialog user">'
      + newText + '</div>';
      // this.heroService.addHero(name)
      //                  .subscribe(
      //                    hero  => this.heroes.push(hero),
      //                    error =>  this.errorMessage = <any>error);

  this.chatService.getChat(newText)
    .subscribe(
         error =>  this.showWatsonMessage(<any>error),
         any  => this.showWatsonMessage(any.message));
  };

  showWatsonMessage(watsonText: string) {
     this.chatText = this.chatText + '<div class="dialog watson">'
          + watsonText + '</div>';

  }
};
