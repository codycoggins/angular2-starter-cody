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

export class VisualBar implements OnInit  {
  options;
  data;
  dataRough;
  chartType;
  chatSessionStore: ChatSessionStore;

  constructor(chatSessionStore: ChatSessionStore ) {
    console.log('Visualization constructor() ');
    this.chatSessionStore =  chatSessionStore;
  };


  ngOnInit() {
    // console.log('BarChart2.ngOnInit()');

    let intent = this.chatSessionStore.intent;
    let xFunction ;
    let yFunction ;
    this.dataRough =  this.chatSessionStore.translatedData();

    if (intent === 'subbrand_performance') {
      // Question 2,5,6
      // for question 2:
      xFunction = function(d){ return d.SUBBRAND; };
      yFunction = function(d){ return d.SHRCYA; };

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
          x: xFunction,
          y: yFunction,
          useInteractiveGuideline: true,
          showValues: true,
          staggerLabels: true,
          transitionDuration: 350,
          xAxis: {
            axisLabel: 'Sub-Brand'
          },
          yAxis: {
            axisLabel: 'SHRCYA',
            // tickFormat: function(d){
            //   return d3.format('.02f')(d);
            // },
            axisLabelDistance: -10
          },
          // hardcoding y axis domain to fix bug.  not optimal.
          yDomain: [-1, 1]
        }
      };

    } else if (intent === 'channel_performance') {
      // Question 3
      // Question 2,5,6
      // for question 2:
      xFunction = function(d){ return d.NEWCHANNEL; };
      yFunction = function(d){ return d.SHRCYA; };

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
          x: xFunction,
          y: yFunction,
          useInteractiveGuideline: true,
          showValues: true,
          staggerLabels: true,
          transitionDuration: 350,
          xAxis: {
            axisLabel: 'Channel'
          },
          yAxis: {
            axisLabel: 'SHRCYA',
            // tickFormat: function(d){
            //   return d3.format('.02f')(d);
            // },
            axisLabelDistance: -10
          },
          // hardcoding y axis domain to fix bug.  not optimal.
          yDomain: [-1, 1]
        }
      };
    } else if (intent === 'dollar_opportunity') {
      // Question 22

    } else if (intent === 'social_feedback') {
      // Question 24
      this.dataRough = this.processSocialFeedback (this.dataRough);
    } else {
      console.log ('I did not recognize the intent \'' + intent + '\'.');
    }


    this.data = this.dataRough;

  }

  processSocialFeedback (dataIn) {
    return dataIn;
  }
}
