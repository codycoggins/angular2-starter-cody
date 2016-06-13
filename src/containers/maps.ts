import { Component, OnInit } from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {List} from 'immutable';

import {ChatItem} from '../services/chat-item';
import { ChatSessionStore } from '../services/chat-session-store';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import { OLMessage, OLProfile} from '../services/chat-session-service';
import { VisualMap } from './visual-map';
// import { topojson } from 'ts-topojson';
// import { Base } from 'Topojson';
import {Tabs} from './tabs';
import {Tab} from './tab';
declare let g, d3, topojson: any;

import {
  WatsonContainer,
  Legend
} from '../components';

@Component({
  selector: 'maps',
  directives: [ WatsonContainer, ROUTER_DIRECTIVES, Legend, Tabs, Tab, VisualMap ],
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
      // font-letiant: small-caps;
      opacity: 0.6;
    }

    #Share-Value {
      position: relative;
      min-height: 500px;

      width: 100%;
      height: 100%
    }

    #Dollar-Value {
      position: relative;
      min-height: 500px;

      width: 100%;
      height: 100%
    }

    path:hover {
      fill: red;
    }

    .regionLabel {
      position: absolute;
      font-weight: bold;
      font-size: 24px;
      color: #0B3D88;
      background-color: #79C3E5;
      z-index: 10;
      padding-left: 6px;
      padding-right: 6px;
      opacity: 0.75;
    }



  `],
  template: `

  <div style="{{chatSessionStore.intent=='region_performance' ? '' : 'display: none;'}}" >
  <tabs class="tab-container">
     <tab tabTitle="Share-Value">
     <div class="visual-title">Share-Value</div>
     <div id="Share-Value" class="">
     <span class="regionLabel" style="left: 170px;top: 200px;">West {{map1.westInfo}}</span>
     <span class="regionLabel" style="left: 550px;top: 200px;">MidWest {{map1.midWestInfo}}</span>
     <span class="regionLabel" style="left: 600px;top: 350px;">South {{map1.southInfo}}</span>
     <span class="regionLabel" style="left: 750px;top: 150px;">North East {{map1.northEastInfo}}</span>


        <!--<svg id="svg1" width="100%" height="100%" viewBox="0 0 640 480" preserveAspectRatio="xMaxYMax"></svg>-->
      </div>
      <legend></legend>

      </tab>
     <tab tabTitle="Dollar-Value">
     <div class="visual-title">Dollar-Value</div>
     <div id="Dollar-Value" class="">
      <span class="regionLabel" style="left: 170px;top: 200px;">West &#36;{{map2.westInfo}}</span>
      <span class="regionLabel" style="left: 550px;top: 200px;">MidWest &#36;{{map2.midWestInfo}}</span>
      <span class="regionLabel" style="left: 600px;top: 350px;">South &#36;{{map2.southInfo}}</span>
      <span class="regionLabel" style="left: 750px;top: 150px;">North East &#36;{{map2.northEastInfo}}</span>


        <!--<svg id="svg1" width="100%" height="100%" viewBox="0 0 640 480" preserveAspectRatio="xMaxYMax"></svg>-->
      </div>
      <legend></legend>
      </tab>
   </tabs>
   </div>

  `
})
export class Maps implements OnInit {
  chatSessionStore: ChatSessionStore;
  intent: string;
  chart1Title: string = 'Share-Value';
  chart2Title: string = 'Dollar-Value';
  dataMessage: any;
  map1: VisualMap;
  map2: VisualMap;

  constructor(chatSessionStore: ChatSessionStore ) {
    console.log('visualMap constructor() ');
    this.chatSessionStore = chatSessionStore;
  };

  ngOnInit () {
    console.log('visualMap ngOnInit');
    this.intent = this.chatSessionStore.intent;
    this.dataMessage = this.chatSessionStore.translatedData();
    this.map1 = new VisualMap(this.chatSessionStore,this.chart1Title);
    this.map2 = new VisualMap(this.chatSessionStore,this.chart2Title);
    this.map1.ngOnInit();
    this.map2.ngOnInit();
// call maps methods here

  }




}
