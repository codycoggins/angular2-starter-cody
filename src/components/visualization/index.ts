import { Component, Inject, Injectable } from 'angular2/core';
// import { ChartComponent } from './chart-example1';
// import { ChartDirective } from './chart-directive.ts';
import { Directive, ElementRef, Input} from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { VisualizationStore } from '../../services/visualization-store';

@Component({
  selector: 'visualization',
    // directives: [BarChart1],
  styles: [`
    .visOverlayLabel {
      position: absolute;
      color: #0B3D88;
      background-color: lightgray;
      z-index: 10;
      left: 170px;
      top: 50px;
      font-size: 36px;
      font-weight: bold;
      padding: 10px;
      font-variant: small-caps;
      opacity: 0.6;
    }
    #chart_div {
      position: relative;
    }
  `],
  template: `

      <div id="chart_div" >
        <span _ngcontent-nvs-8="" class="visOverlayLabel">Example Visualization</span>
        <!--<img
        style="-webkit-filter: grayscale(100%);filter: grayscale(100%);"
        src="{{visualizationStore.imagePath}}"/>-->
        <!--<bar-chart1></bar-chart1>-->
      </div>

  `,
})
export class Visualization {
  el: HTMLElement;
  visualizationStore: VisualizationStore;

  constructor(elementRef: ElementRef, visualizationStore: VisualizationStore ) {
    console.log('Visualization constructor() ');
    this.visualizationStore = visualizationStore;
  };

};
