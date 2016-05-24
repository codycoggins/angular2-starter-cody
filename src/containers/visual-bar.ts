import { Component, Inject, Injectable  } from 'angular2/core';
import { VisualizationStore } from '../services/visualization-store';

import {
  WatsonContainer,
  AppNavigator,
  AppNavigatorItem,
  CompanyLogo,
  Chat,
  BarChart1
} from '../components';

@Component({
  selector: 'visual-bar',
  directives: [ WatsonContainer, BarChart1 ],
  styles: [`
    .visOverlayLabel {
      position: absolute;
      color: #075698;
      background-color: lightgray;
      z-index: 10;
      left: 170px;
      top: 50px;
      // font-size: 36px;
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
    <span _ngcontent-nvs-8="" class="visOverlayLabel center h2">Example Bar Chart Visualization</span>
    <bar-chart1></bar-chart1>
  </div>
  `
})
export class VisualBar {
  visualizationStore: VisualizationStore;

  constructor(visualizationStore: VisualizationStore ) {
    console.log('Visualization constructor() ');
    this.visualizationStore = visualizationStore;
  };

}
