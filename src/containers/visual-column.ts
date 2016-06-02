import { Component, OnInit } from 'angular2/core';
import { ChatSessionStore } from '../services/chat-session-store';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';


import {
  WatsonContainer
} from '../components';

@Component({
  selector: 'visual-column',
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
  <div id="chart_div" >
    <!--<span class="visOverlayLabel h2 center">
    Visual Column
    </span>-->
    <div innerHTML="{{ dataInColumnHTML() }}"></div>
  </div>

  `
})
export class VisualColumn implements OnInit {
  chatSessionStore: ChatSessionStore;

  constructor(chatSessionStore: ChatSessionStore ) {
    console.log('VisualColumn constructor() ');
    this.chatSessionStore = chatSessionStore;
  };

  ngOnInit () {

  }

  dataInColumnHTML(): string {
    let data: any[][] = this.chatSessionStore.visualData;
    if (data == null || data.length === 0) {
      return '<div style="display: none;">No Data returned</div>';
    }
    let html: string = '';
    html = html + '<table>';
    for (let i: number = 0; i < data.length; i++) {
      html = html + '<tr>';
      let tag: string = 'td' ;
      if (i === 0) { tag = 'th'; }

      for (let j: number = 0; j < data[i].length; j++) {
        html = html + '<' + tag + '>' + data[i][j] + '</' + tag + '>';
      }
      html = html + '</tr>';
    }

    html = html + '</table>';
    return html;

  }

}
