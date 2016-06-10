import { Component, OnInit } from 'angular2/core';
import { VisualizationStore } from '../services/visualization-store';
import { ChatSessionStore } from '../services/chat-session-store';


import {
  WatsonContainer
} from '../components';

@Component({
  selector: 'visual-none',
  directives: [ WatsonContainer ],
  styles: [`
    .visOverlayLabel {
      position: absolute;
      color: #999999;
      z-index: 10;
      left: 170px;
      top: 50px;
      padding: 10px;
      font-size: 32px;
      font-family: Helvetica Light;
      font-weight: lighter;
      text-align: center;
    }
    .visOverlaySubtitle {
      font-size: 18px;
      text-align: center;
      font-weight: lighter;
      color: #999999;
    }

    #chart_div {
      position: relative;
    }
  `],
  template: `
  <div id="chart_div" class="chart-div">
    <span _ngcontent-nvs-8="" class="visOverlayLabel center">
    When a visualization or supplement is part of your question,
    it will appear here.<br/>
    <span class="visOverlaySubtitle">Ask your question in the dialog area or <a href="#">View All My Favorites</a></span>
    </span>
    <!-- <img
    style="-webkit-filter: grayscale(100%);filter: grayscale(100%);"
    src="{{visualizationStore.imagePath}}"/>-->
  </div>


  `
})
export class VisualNone {
  visualizationStore: VisualizationStore;

  constructor(visualizationStore: VisualizationStore ) {
    console.log('VisualNone constructor() ');
    this.visualizationStore = visualizationStore;
  };
}
