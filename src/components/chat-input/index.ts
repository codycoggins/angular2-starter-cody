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
      // font-family: Helvetica, sans-serif;
      border-width: 0;
      height:40px;
      padding:5px;
      width: 330px;
      margin-right: 0;
      font-family: Helvetica Regular, Helvetica, Arial, sans-serif;
      font-size: 18px;

    }

    #chatInput::selection {
      color: #0B3D88;
      background-color: #79C3E5; 
    }

    #chatButton {
      color: black;
      height: 40px;
      background:#54C6E4;
      padding: 8px;
      cursor: pointer;
      font-weight: bold;
      width: 50px;
      margin: 0;
    }
    `],
    template: `

    <input #inputBox id="chatInput" type="text"
     class="flex-auto"
      (keyup.enter)="send(inputBox.value); inputBox.value='';"
      placeholder="Enter Question"
      value="{{newText}}"
    />
    <span #chatButton (click)="send(inputBox.value);inputBox.value='';"
     id="chatButton"
     class="right-0 center"
     >ASK</span>
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
