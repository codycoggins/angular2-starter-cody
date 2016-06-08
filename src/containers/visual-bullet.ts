import { Component, OnInit } from 'angular2/core';
import { ChatSessionStore } from '../services/chat-session-store';

import {
  WatsonContainer
} from '../components';

@Component({
  selector: 'visual-bullet',
  directives: [ WatsonContainer ],
  styles: [`
    .visOverlayLabel {
      position: absolute;
      color: #0B3D88;
      background-color: lightgray;
      z-index: 10;
      left: 170px;
      top: 50px;
      // font-weight: bold;
      padding: 10px;
      // font-variant: small-caps;
      opacity: 0.6;
    }

    #chart_div {
      position: relative;
    }
  `],
  template: `
  <div id="chart_div" class="chart-div">
    <!-- <span _ngcontent-nvs-8="" class="visOverlayLabel h2 center">
    Example Visual Bullet<br/>
    <span class="h5">This is a placeholder</span>
    </span> -->
    <div innerHTML="{{ dataInBulletHTML() }}"></div>
  </div>


  `
})
export class VisualBullet implements OnInit  {
  chatSessionStore: ChatSessionStore;

  constructor(chatSessionStore: ChatSessionStore ) {
    console.log('VisualBullet constructor() ');
    this.chatSessionStore = chatSessionStore;
  };

  ngOnInit () {

  }

  dataInBulletHTML(): string {
    let data: any[][] = this.chatSessionStore.visualData;
    if (data == null || data.length === 0) {
      return '<div style="display: none;">No Data returned</div>';
    }
    let html: string = '';
    html = html + '<ol>';
    for (let i: number = 0; i < data.length; i++) {
      html = html + '<li>' + data[i][0] + '</li>';
      if (i > 0) { html = html + '<ol>'; }
      for (let j: number = 1; j < data[i].length; j++) {
        html = html + '<li>' + data[i][j] + '</li>';
      }
      if (i > 0) { html = html + '<ol>'; }
    }

    html = html + '</ol>';
    return html;

  }

}
