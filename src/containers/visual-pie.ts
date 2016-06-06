import { Component, OnInit } from 'angular2/core';
import { ChatSessionStore } from '../services/chat-session-store';

import {
  WatsonContainer
} from '../components';

@Component({
  selector: 'visual-pie',
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
    <span _ngcontent-nvs-8="" class="visOverlayLabel h2 center">
    Example Visual Pie<br/>
    <span class="h5">This is a placeholder</span>
    </span>
    <img
    style="-webkit-filter: grayscale(100%);filter: grayscale(100%);"
    src="{{ChatSessionStore.imagePath}}"/>
  </div>


  `
})

export class VisualPie  implements OnInit  {
  chatSessionStore: ChatSessionStore;

  constructor(chatSessionStore: ChatSessionStore ) {
    console.log('VisualPie constructor() ');
    this.chatSessionStore = chatSessionStore;
  };

  ngOnInit() {

  }
}
