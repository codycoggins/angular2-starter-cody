import { Component, Input } from 'angular2/core';
import { SendButton } from '../button';
// comment
@Component({
  selector: 'chat',
  template: `
    <div class="clearfix border fit">
      <h2>Chat App</h2>
      <div id="chatlog"
       style="height:300px;"
       class="fit border overflow-auto">
      Hello, Alvin. Would you like to examine changes in some of Dove's sub-brands or may I help you with something else?
      </div>

      <input type="text" id="message_input"/>
      <button onclick="">send</button>

    </div>
  `,
  directives: [Chat]
})
export class Chat {
  @Input() counter: number;
  @Input() increment: () => void;
  @Input() decrement: () => void;
};
