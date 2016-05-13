import { Component, Input, Output, EventEmitter, Inject, Injectable,
  AfterViewChecked, ElementRef, ViewChild }
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
    mct {
      display: none;
    }
  `],
  template: `
    <div class="clearfix fit" style="560px">
       <div #chatLog id="chatLog" class="fit overflow-auto">
          <div *ngFor="let chatItem of chatSessionStore.allChatItems | async"
            class="dialog {{chatItem.isWatson ? 'watson' : 'user'}}"
            [innerHTML]="chatItem.text"></div>
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
       <button (click)="scrollChat(chatLog);"
       class="form-control right-0"
       >SCROLL</button>
    </div>
  `,
  directives: [Chat],
  providers: [ChatSessionStore]
})
export class Chat {
  // chatText: string;
  newText: string;
  @ViewChild('chatLog') public chatLogElement: ElementRef;

  constructor(public elementRef: ElementRef,
    private chatSessionStore: ChatSessionStore) {
    // this.chatText = '<div class="dialog watson">Hi, Alvin. How can I '
    //   + 'help you today?</div>';
    let fScroll = this.scrollChat.bind(this);
    let obsScroll: Observable<any> =   chatSessionStore.allChatItems;
    obsScroll.subscribe(fScroll);
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
    // this.scrollChat();
  };

  showWatsonMessage(watsonText: string) {
    //  this.chatText = this.chatText + '<div class="dialog watson">'
    //       + watsonText + '</div>';

    let newChatW: ChatItem = new ChatItem(watsonText, true);
    this.chatSessionStore.addChat (newChatW);
  }

  scrollChat(res, err): string {
    console.log('Chat.scrollChat()');
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
