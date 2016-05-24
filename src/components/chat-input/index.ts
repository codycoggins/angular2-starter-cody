/*
 * adapted from wea-ui-accelerator Copyright IBM Corp. 2015, 2016
 *
 * Displays a clickable element that submits its value to the dialogService.
 */

 import { Component, Injectable, ElementRef, ViewChild } from 'angular2/core';
 import { ChatItem } from '../../services/chat-item';
 import { ChatSessionStore} from '../../services/chat-session-store';

 @Component({
    selector: 'chat-input',
    styles: [`
    #chatInput {
      height:30px;
      padding:5px;
      width: 300px;
      margin: 10px;
    }
    `],
    template: `

    <input #inputBox id="chatInput" type="text"
     class="fit form-control left-0 right-0"
      (keyup.enter)="send(inputBox.value); inputBox.value='';"
      placeholder="Enter Question"
      value="{{newText}}"
    />
    <button (click)="send(inputBox.value);inputBox.value='';"
     class="form-control right-0"
     >ASK</button>
    `
 })


 export class ChatInput {
   @ViewChild('theChatInput') input: ElementRef;

   constructor(private chatSessionStore: ChatSessionStore) {
     this.chatSessionStore = chatSessionStore;
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






};
