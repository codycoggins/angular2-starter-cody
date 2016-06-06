import { Component, Input, Output, EventEmitter, Inject, Injectable,
  AfterViewChecked, ElementRef, ViewChild }
  from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { Observer} from 'rxjs/Observer';
import { Observable} from 'rxjs/Observable';

import { ChatItem } from '../../services/chat-item';
import { ChatSessionStore} from '../../services/chat-session-store';
import { OLMessage, OLProfile} from './../services/chat-session-service';


// comment
@Component({
  selector: 'diagnostic-widget',
  styles: [`
  `],
  template: `
    <div class="diagnostic" style="560px">
      <div style="h3">Diagnostic Information</div>
      <div>question: {{chatSessionStore.}}
      <div>intent: {{chatSessionStore.intent}}</div>
      <div>

    </div>
  `,
  directives: [DiagnosticWidget, ChatInput, CompanyLogo]
})

export class DiagnosticWidget {
  // chatText: string;
  newText: string;

  constructor(public elementRef: ElementRef,
    private chatSessionStore: ChatSessionStore) {
    this.chatSessionStore = chatSessionStore;
  }

  ngAfterViewChecked() {
      // console.log('Chat: ngAfterViewChecked');
  }

};
