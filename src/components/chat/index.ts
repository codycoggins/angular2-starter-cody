import { Component, Input } from 'angular2/core';
import { SendButton } from '../button';
// comment
@Component({
  selector: 'chat',
  template: `
    <div class="flex">
      <h2>Chat App</h2>
      <div id="chatlog"
       style="height:120px;width:120px;border:1px solid #ccc;overflow:auto;">
      As you can see, once there's enough text in this box,
      the box will grow scroll bars... that's why we call it a scroll
      box! You could also place an image into the scroll box.
      </div>

      <input type="text" id="message_input"/>
      <button onclick="">send</button>

      <div class="flex-auto flex-center center h1">
        {{ counter }}
      </div>

    </div>
  `,
  directives: [Chat]
})
export class Chat {
  @Input() counter: number;
  @Input() increment: () => void;
  @Input() decrement: () => void;
};
