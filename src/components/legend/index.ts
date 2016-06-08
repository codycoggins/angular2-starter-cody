import { Component, Input, Output, EventEmitter, Inject, Injectable,
  AfterViewChecked, ElementRef, ViewChild }
  from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { Observer} from 'rxjs/Observer';
import { Observable} from 'rxjs/Observable';

import { ChatItem } from '../../services/chat-item';
import { ChatSessionStore} from '../../services/chat-session-store';
import { OLMessage, OLProfile} from '../../services/chat-session-service';


// comment
@Component({
  selector: 'legend',
  styles: [`
    .groupTitle {
      font-size: 18px;
    }
    .values {
      font-size: 14px;
    }
      `],
  template: `
    <span (click)="setHidden(!hidden);" class="underline bold" style="color: #0B3D88;">
      {{hidden ? 'Show legends' : 'Hide legends'}}
    </span>
    <div class="legend" style="display: {{ hidden ? 'None' : 'Block' }};">

      <p class="h3 bold">Legend</p>
      <div><span class="groupTitle">Markets</span> <span class="values">{{getProfileItem('region')}}</span></div>
      <div><span class="groupTitle">Products</span> <span class="values">{{getProfileItem('brand')}}</span></div>
      <div><span class="groupTitle">Periods</span> <span class="values">52 W/E 12/26/2015</span></div>
      <div><span class="groupTitle">Share Basis</span> <span class="values">Shampoo</span></div>
    </div>
  `,
  directives: []
})

export class Legend {
  // chatText: string;
  hidden: boolean = false;
  profile: OLProfile = <OLProfile> {};

  constructor(public elementRef: ElementRef,
    private chatSessionStore: ChatSessionStore) {
    this.chatSessionStore = chatSessionStore;
    this.profile = chatSessionStore.profile;
  }

  setHidden(hidden: boolean) {
    this.hidden =  hidden;
  }

  getIntent() {
    return this.chatSessionStore.intent;
  }
  getProfileItem(itemName: string): string {
    // console.log('getProfileItem');
    this.profile = this.chatSessionStore.profile;
    return this.profile[itemName];
  }

  // getMctHides(): string {
  //   return this.chatSessionStore.mcthides();
  // }
  showData () {
    return JSON.stringify(this.chatSessionStore.visualData).slice(0, 400).replace('\],', '\],\n');
  }
  ngAfterViewChecked() {
      // console.log('Legend: ngAfterViewChecked');
      // this.profile = JSON.parse(JSON.stringify(this.chatSessionStore.profile));
      // console.log('this.profile: \n ' + JSON.stringify(this.profile) + '\n');
  }

};
