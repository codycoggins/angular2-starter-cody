import { Component, Input, Output, EventEmitter, Inject, Injectable,
  AfterViewChecked, ElementRef, ViewChild }
  from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { Observer} from 'rxjs/Observer';
import { Observable} from 'rxjs/Observable';

import { ChatItem } from '../../services/chat-item';
import { ChatSessionStore} from '../../services/chat-session-store';
import { ChatInput } from '../chat-input';

// comment
@Component({
  selector: 'chat',
  styles: [`

    chat-input {
      min-width: 400px;
      display: flex;
      color: #fff;
      background-color: #0B3D88;
    }

    .watson-footer {
      color: #fff;
      background-color: #0B3D88;
    }

    #chatLog {
      height:500px;
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
      background:#0B3D88; /* default background for browsers without gradient support */
      /* css3 */
      background:-webkit-gradient(linear, 0 0, 0 100%, from(#2e88c4), to(#0B3D88));
      background:-moz-linear-gradient(#2e88c4, #0B3D88);
      background:-o-linear-gradient(#2e88c4, #0B3D88);
      background:linear-gradient(#2e88c4, #0B3D88);
      -webkit-border-radius:10px;
      -moz-border-radius:10px;
      border-radius:10px;
    }

    .dialog.watson {
      margin-right:50px;
      color:#0B3D88;
      background:#fff;
    }

    .dialog.user {
      margin-right:50px;
      color:#fff;
      background:#0B3D88;
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
      border-color:transparent #0B3D88;
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
      color: #0B3D88;
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
      background:#0B3D88;
      color: #fff;
    }

  `],
  template: `
    <div class="clearfix fit p2" style="560px">
       <div #chatLog id="chatLog" class="fit overflow-auto">
          <div *ngFor="let chatItem of chatSessionStore.allChatItems | async"
            class="{{chatItem.isWatson ? 'watson-icon' : 'user-icon'}}">
            <div
              class="dialog {{chatItem.isWatson ? 'watson' : 'user'}}"
              [innerHTML]="chatItem.text">
            </div>
          </div>
       </div>
    </div>
    <chat-input class="p2 flex"></chat-input>
    <div class="watson-footer center p2">Insights powered by Nielsen</div>
  `,
  directives: [Chat, ChatInput]
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
