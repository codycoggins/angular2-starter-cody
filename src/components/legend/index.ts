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
    .legend-item {
      // flex-grow: 0;
      width: 23%;
      display: inline-block;
      margin-bottom: 20px;
    }

    .item-title {
      font-weight: bold;
      font-size: 16px;
      display: block;
    }

    .item-value {
      font-size: 14px;
    }

    .legend-heading {
      font-weight: bold;
      margin-left: 20px;
    }
      `],
  template: `
    <!-- span (click)="setHidden(!hidden);" class="underline bold" style="color: #0B3D88;">
      {{hidden ? 'Show legends' : 'Hide legends'}}
    </span-->
    <div class="legend-heading" >Legend</div>

    <div class="legend flex flex-wrap" style="display: {{ hidden ? 'None' : 'Block' }};">

      <div class="legend-item"><span class="item-title">Market</span> <span class="item-value">{{getMarket()}}</span></div>
      <div class="legend-item"><span class="item-title">Product</span> <span class="item-value">{{getProfileItem('brand')}}</span></div>
      <div class="legend-item"><span class="item-title">Period</span> <span class="item-value">52 W/E 12/26/2015</span></div>
      <div class="legend-item"><span class="item-title">Fact</span> <span class="item-value">Shr CYA</span></div>
      <div class="legend-item"><span class="item-title">Share Basis</span> <span class="item-value">Shampoo</span></div>
      <div class="legend-item"><span class="item-title">Channel</span> <span class="item-value">{{getProfileItem('channel')}}</span></div>
      <div class="legend-item"><span class="item-title">Subbrand</span> <span class="item-value">{{getProfileItem('sub_brand')}}</span></div>
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

  getMarket() {
    if (this.getIntent() == 'region_performance' ) {
      return 'all regions';
    } else {
      return this.getProfileItem('region');
    }
  }

  getIntent() {
    return this.chatSessionStore.intent;
  }

  getProfileItem(itemName: string): string {
    // console.log('getProfileItem');
    this.profile = this.chatSessionStore.profile;
    let result: string = this.profile[itemName];

    if (itemName == 'sub_brand' && this.chatSessionStore.intent == 'subbrand_performance') {
      return 'all subbrands';
    }
    if (result == '') {
      if (itemName == 'channel') return 'all channels';
      if (itemName == 'sub_brand') return 'all subbrands';
    }
    return result;
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
