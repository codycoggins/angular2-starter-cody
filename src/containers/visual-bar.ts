import { Component, Inject, Injectable, OnInit  } from 'angular2/core';
import { NvD3Watson } from '../components/visualization/nvd3-watson';
declare var d3: any;

import { ChatSessionStore } from '../services/chat-session-store';

import {
  WatsonContainer,
  CompanyLogo
} from '../components';

@Component({
  selector: 'visual-bar',
  directives: [ WatsonContainer, NvD3Watson ],
  styles: [`
    .visOverlayLabel {
      position: absolute;
      color: #0B3D88;
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
    <!--<span class="visOverlayLabel center h2">Example Bar Chart Visualization</span>-->
    <nvd3-watson [options]="options" [data]="data"></nvd3-watson>
  </div>
  `
})

export class VisualBar {
  options;
  data;
  chartType;
  chatSessionStore: ChatSessionStore;

  constructor(chatSessionStore: ChatSessionStore ) {
    console.log('Visualization constructor() ');
    this.chatSessionStore =  chatSessionStore;
  };


  ngOnInit() {
    // console.log('BarChart2.ngOnInit()');

    this.options = {
      chart: {
        type: 'discreteBarChart',
        height: 600,
        margin : {
          top: 20,
          right: 20,
          bottom: 40,
          left: 55
        },
        x: function(d){ return d.SUBBRAND; },
        y: function(d){ return d.SHRCYA; },
        useInteractiveGuideline: true,
        staggerLabels: true,
        xAxis: {
          axisLabel: 'Sub-Brand'
        },
        yAxis: {
          axisLabel: 'SHRCYA',
          // tickFormat: function(d){
          //   return d3.format('.02f')(d);
          // },
          axisLabelDistance: -10
        }
      }
    };

    this.data =  this.chatSessionStore.translatedData();
  }
}
