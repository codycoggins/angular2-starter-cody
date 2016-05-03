import { Component, Input } from 'angular2/core';
import { SendButton } from '../button';
// comment
@Component({
  selector: 'chat',
  template: `
    <div class="clearfix fit">
      <div id="chatlog"
       style="height:300px;"
       class="fit overflow-auto">
       {{chatText}}
      </div>



      <input #inputBox type="text" class="form-control"
        (keyup.enter)="send(inputBox.value); inputBox.value='';"
        value="{{newText}}"
      />
      <button (click)="send(inputBox.value); inputBox.value='';">send</button>

    </div>
  `,
  directives: [Chat]
})
export class Chat {
  chatText: string;
  newText: string;

  constructor() {
    this.chatText = 'Hello, Alvin. Would you like to examine changes in' +
      'some of Dove\'s sub-brands or may I help you with something else?';

  }
  send (newText: string) {
    // TODO: how do you add line break? and clear the box after send.
    this.chatText = this.chatText + '   ' + newText;

  };
};
