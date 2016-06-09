import { Component, OnInit } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import {List} from 'immutable';


import { ChatSessionStore } from '../services/chat-session-store';

import {
  WatsonContainer,
  AppNavigator,
  AppNavigatorItem
} from '../components';

@Component({
  selector: 'visual-list',
  directives: [ WatsonContainer, ROUTER_DIRECTIVES, AppNavigator, AppNavigatorItem ],
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
  <div style="{{chatSessionStore.intent=='social_feedback' ? '' : 'display: none;'}}" class="tab-container">
     <span class="tab">
       <a [routerLink]="['Visual-bar']"
         class="navbar-link text-decoration-none">Graph</a>
     </span>
     <span class="tab-selected">
       <a [routerLink]="['Visual-list-positive']"
         class="navbar-link text-decoration-none">View Tweets</a>
     </span>
  </div>

  <div class="visual-title">{{chatSessionStore.visualTitle}}</div>

  <div id="chart_div" class="chart-div">
    <!--<span class="visOverlayLabel h2 center">
    Visual List
    </span>-->
    <div innerHTML="{{ dataInListHTML() }}"></div>
  </div>

  `
})
export class VisualList implements OnInit {
  chatSessionStore: ChatSessionStore;
  // chartTitle: string = 'Table';
  constructor(chatSessionStore: ChatSessionStore ) {
    console.log('VisualList constructor() ');
    this.chatSessionStore = chatSessionStore;
  };

  ngOnInit () {
    // if (router.isRouteActive(router.generate(['/Home'])));
  }

  dataInListHTML(): string {
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
