import { Component, Input } from 'angular2/core';
import { SendButton } from '../button';
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
  directives: [Chat]
})
export class Chat {
  chatText: string;
  newText: string;

  constructor() {
    this.chatText = '<div class="dialog watson">Hello, Alvin. '
      + 'Would you like to examine changes in some of '
      + 'Dove\'s sub-brands or may I help you with something else?</div>';

  }
  send (newText: string) {
    // TODO: how do you add line break?
    this.chatText = this.chatText + '<div class="dialog user">'
      + newText + '</div>';

  };
};
