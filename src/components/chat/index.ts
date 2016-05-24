import { Component, Input, Output, EventEmitter, Inject, Injectable,
  AfterViewChecked, ElementRef, ViewChild }
  from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { Observer} from 'rxjs/Observer';
import { Observable} from 'rxjs/Observable';

import { ChatItem } from '../../services/chat-item';
import { ChatSessionStore} from '../../services/chat-session-store';

import { AutoInput } from './autoinput';

// comment
@Component({
  selector: 'chat',
  styles: [`
    .dialog {
      # margin: 10px;
    }

    #chatLog {
      height:500px;
    }
    #chatInput {
      height:30px;
      padding:5px;
      width: 300px;
      margin: 10px;
    }
    mct-hide {
      display: none;
    }
    mct:hide {
      display: none;
    }
    mct {
      display: none;
    }

    /* Speech bubbles - Thanks to:
    http://nicolasgallagher.com/pure-css-speech-bubbles/demo/
    ------------------------------------------ */

    .dialog {
      position:relative;
      padding:15px;
      margin:1em 0 3em;
      color:#fff;
      background:#075698; /* default background for browsers without gradient support */
      /* css3 */
      background:-webkit-gradient(linear, 0 0, 0 100%, from(#2e88c4), to(#075698));
      background:-moz-linear-gradient(#2e88c4, #075698);
      background:-o-linear-gradient(#2e88c4, #075698);
      background:linear-gradient(#2e88c4, #075698);
      -webkit-border-radius:10px;
      -moz-border-radius:10px;
      border-radius:10px;
    }

    .dialog.watson {
      margin-right:50px;
      color:#075698;
      background:#fff;
    }

    .dialog.user {
      margin-right:50px;
      color:#fff;
      background:#075698;
    }

    .dialog:after {
      content:"";
      position:absolute;
      bottom:-15px; /* value = - border-top-width - border-bottom-width */
      left:20px; /* controls horizontal position */
      border-width:15px 15px 0; /* vary these values to change the angle of the vertex */
      border-style:solid;
      /* border-color:red transparent; */
      /* reduce the damage in FF3.0 */
      display:block;
      width:0;
    }

    .dialog.watson:after {
      top:16px; /* controls vertical position */
      right:-20px; /* value = - border-left-width - border-right-width */
      bottom:auto;
      left:auto;
      border-width:10px 0 10px 20px;
      border-color:transparent #fff;
    }

    .dialog.user:after {
      top:16px; /* controls vertical position */
      right:-20px; /* value = - border-left-width - border-right-width */
      bottom:auto;
      left:auto;
      border-width:10px 0 10px 20px;
      border-color:transparent #075698;
    }
    .watson-icon{
      position: relative;
      margin-right:40px;
    }
    .watson-icon:after {
      position: absolute;
      top:8px; /* controls vertical position */
      right:-20px; /* value = - border-left-width - border-right-width */
      text-align: center;
      content: "W";
      font-weight: bold;
      border-radius: 50%;
      height: 33px;
      width: 40px;
      padding-top: 7px;
      background:#fff;
      color: #075698;
    }
    .user-icon{
      position: relative;
      margin-right:40px;
    }
    .user-icon:after {
      position: absolute;
      top:8px; /* controls vertical position */
      right:-20px; /* value = - border-left-width - border-right-width */
      text-align: center;
      content: "U";
      font-weight: bold;
      border-radius: 50%;
      height: 33px;
      width: 40px;
      padding-top: 7px;
      background:#075698;
      color: #fff;
    }

  `],
  template: `
    <div class="clearfix fit" style="560px">
       <div #chatLog id="chatLog" class="fit overflow-auto">
          <div *ngFor="let chatItem of chatSessionStore.allChatItems | async"
            class="{{chatItem.isWatson ? 'watson-icon' : 'user-icon'}}">
            <div
              class="dialog {{chatItem.isWatson ? 'watson' : 'user'}}"
              [innerHTML]="chatItem.text">
            </div>
          </div>
       </div>

       <input #inputBox id="chatInput" type="text"
        class="fit form-control left-0 right-0"
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
  // chatText: string;
  newText: string;
  @ViewChild('chatLog') public chatLogElement: ElementRef;

  constructor(public elementRef: ElementRef,
    private chatSessionStore: ChatSessionStore) {
    // this.chatText = '<div class="dialog watson">Hi, Alvin. How can I '
    //   + 'help you today?</div>';
    this.chatSessionStore = chatSessionStore;
    // let fScroll = this.scrollChat.bind(this);
    // let obsScroll: Observable<any> =   chatSessionStore.allChatItems;
    // obsScroll.subscribe(fScroll);
  }

  send (newText: string) {
    let newChatI: ChatItem = new ChatItem(newText, false);
    this.chatSessionStore.addChatAndResponse (newChatI);
    // this.scrollChat();
  };

  showWatsonMessage(watsonText: string) {
    //  this.chatText = this.chatText + '<div class="dialog watson">'
    //       + watsonText + '</div>';

    let newChatW: ChatItem = new ChatItem(watsonText, true);
    this.chatSessionStore.addChat (newChatW);
  }

  ngAfterViewChecked() {
      // console.log('Chat: ngAfterViewChecked');
      this.scrollChat(0, 0);
  }

  scrollChat(res, err): string {
    // console.log('Chat.scrollChat()');
    try {
          let myElement: ElementRef = this.chatLogElement;

          myElement.nativeElement.scrollTop =
            this.chatLogElement.nativeElement.scrollHeight;
          return '';
        } catch (err) {
          console.error(err);
          return '';
        }
  }
};
