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
  selector: 'diagnostic-widget',
  styles: [`
    .values {
      font-weight: bold;
    }
      `],
  template: `
    <div (click)="setHidden(!hidden);" class="h6 center" style="color: #0B3D88">
      {{hidden ? 'Show Diagnostics' : 'Hide Diagnostics'}}
    </div>
    <div class="diagnostic" style="display: {{ hidden ? 'None' : 'Block' }};">

      <p class="h3 bold">Diagnostic Information</p>
      <div>intent: {{getIntent()}}</div>
      <div>visual_type: <span class="values">{{getVisualType()}}</span></div>

      <div>retailer: <span class="values">{{getProfileItem('retailer')}}</span></div>
      <div>ui_region: <span class="values">{{getProfileItem('ui_region')}}</span></div>
      <div>region: <span class="values">{{getProfileItem('region')}}</span></div>
      <div>channel: <span class="values">{{getProfileItem('channel')}}</span></div>
      <div>sub_brand: <span class="values">{{getProfileItem('sub_brand')}}</span></div>
      <!-- <div>mcthides: {{getMctHides()}}</div> -->
      <div>performance_level: <span class="values">{{getProfileItem('performance_level')}}</span></div>
      <div>profile_prompts: <span class="values">{{getProfileItem('profile_prompts')}}</span></div>
      <div>brand: <span class="values">{{getProfileItem('brand')}}</span></div>
      <div>mcthides: <span class="values">{{getMctHides()}}</span></div>
      <div>data: {{ showData() }} ... </div>
    </div>
  `,
  directives: []
})

export class DiagnosticWidget {
  // chatText: string;
  hidden: boolean = true;
  profile: OLProfile = <OLProfile> {};

  constructor(public elementRef: ElementRef,
    private chatSessionStore: ChatSessionStore) {
    this.chatSessionStore = chatSessionStore;
    this.profile = chatSessionStore.profile;
  }

  setHidden(hidden: boolean) {
    this.hidden =  hidden;
  }

  getVisualType() {
    return this.chatSessionStore.visualType;
  }

  getIntent() {
    return this.chatSessionStore.intent;
  }

  getMctHides() {
    return JSON.stringify (this.chatSessionStore.mcthides);
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
      // console.log('DiagnosticWidget: ngAfterViewChecked');
      // this.profile = JSON.parse(JSON.stringify(this.chatSessionStore.profile));
      // console.log('this.profile: \n ' + JSON.stringify(this.profile) + '\n');
  }

};
