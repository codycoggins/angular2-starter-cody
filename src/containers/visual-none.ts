import { Component } from 'angular2/core';
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
    <span _ngcontent-nvs-8="" class="visOverlayLabel h2 center">
    When a visualization or supplement is part of your question,
    it will appear here.<br/>
    <span class="h5">Ask your question in the dialog area or View All My Favorites</span>
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
