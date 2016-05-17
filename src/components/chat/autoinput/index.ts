/*
 * adapted from wea-ui-accelerator Copyright IBM Corp. 2015, 2016
 *
 * Displays a clickable element that submits its value to the dialogService.
 */

 import { Component, Injectable, ElementRef, ViewChild } from 'angular2/core';
 import { ChatItem } from '../../../services/chat-item';
 import { ChatSessionStore} from '../../../services/chat-session-store';

 @Component({
    selector: 'autoinput',
    template: `
    <span #theAutoInput class="autoinput"
      (click)="send(inputBox.value);inputBox.value='';" >
      <ng-content></ng-content>
    </span>
    `
 })


 export class AutoInput {
   @ViewChild('theAutoInput') input: ElementRef;

   constructor(private chatSessionStore: ChatSessionStore) {
     this.chatSessionStore = chatSessionStore;
   }

   send () {
     console.log('autoinput click');
     let newText: string = this.input.nativeElement.innerHTML ;
     let newChatI: ChatItem = new ChatItem(newText, false);
     this.chatSessionStore.addChatAndResponse (newChatI);
     // this.scrollChat();
   };





};
