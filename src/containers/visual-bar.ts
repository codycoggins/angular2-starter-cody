import { Component, Inject, Injectable, OnInit  } from 'angular2/core';
import { NvD3Watson } from '../components/visualization/nvd3-watson';
import { OLMessage, OLProfile} from '../services/chat-session-service';

declare var d3: any;

import { ChatSessionStore, ITranslatedData } from '../services/chat-session-store';

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
    <div class="visual-title">{{chartTitle}}</div>
    <nvd3-watson [options]="options" [data]="data"></nvd3-watson>
  </div>
  `
})

export class VisualBar implements OnInit  {
  options;
  chartTitle: string = 'Bar Chart';
  data: any;
  dataRough: any;
  chartType;
  chatSessionStore: ChatSessionStore;

  constructor(chatSessionStore: ChatSessionStore ) {
    console.log('VisualBar constructor() ');
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
      this.chartTitle = 'Subbrand Performance';
      if (this.getRegion().length > 0 ) {
        this.chartTitle = this.chartTitle + ' - ' + this.getRegion() + ' Region';
      }

      xFunction = function(d){ return <string> d.SUBBRAND; };
      yFunction = function(d){ return <number> d.SHRCYA; };

      this.options = {
        chart: {
          // type: 'discreteBarChart',
          type: 'multiBarHorizontalChart',
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
      // for question:
      xFunction = function(d){ return d.NEWCHANNEL; };
      yFunction = function(d){ return d.SHRCYA; };

      this.chartTitle = 'Performance by Channel Overview';
      if (this.getBrand().length > 0 ) {
        this.chartTitle = this.getBrand() + ' - ' + this.chartTitle;
      }

      if (this.getRegion().length > 0 ) {
        this.chartTitle = this.getRegion() + ' Region' + ' - ' + this.chartTitle;
      }

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
      this.chartTitle = 'Dollor Opportunity';
      // Question 22

    } else if (intent === 'social_feedback') {
      // Question 24
      this.chartTitle = 'Social Feedback';
      if (this.getBrand().length > 0 ) {
        this.chartTitle = this.getBrand() + ' - ' + this.chartTitle;
      }

      console.log ('\n SOCIAL FEEDBACK \n');
      this.dataRough = this.processSocialFeedback (this.dataRough);
      xFunction = function(d){ return d.SENTIMENT_POLARITY; };
      yFunction = function(d){ return d.COUNT; };

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
            axisLabel: 'Sentiment'
          },
          yAxis: {
            axisLabel: 'Count',
            // tickFormat: function(d){
            //   return d3.format('.02f')(d);
            // },
            axisLabelDistance: -10
          },
          // hardcoding y axis domain to fix bug.  not optimal.
          // yDomain: [-1, 1]
        }
      };

    } else {
      console.log ('I did not recognize the intent \'' + intent + '\'.');
    }


    this.data = this.dataRough;

  }

  getRegion (): string {
    if (this.chatSessionStore.profile.ui_region.length > 0 ) {
      return  this.chatSessionStore.profile.ui_region;
    } else if (this.chatSessionStore.profile.region.length > 0 ) {
      return  this.chatSessionStore.profile.region;
    } else return '';
  }

  getBrand (): string {
    if (this.chatSessionStore.profile.brand.length > 0 ) {
      return  this.chatSessionStore.profile.brand;
    } ;
  }

  processSocialFeedback (dataIn: [ITranslatedData]): [ITranslatedData] {

    console.log('VisualBar.processSocialFeedback()');
    if (dataIn == null) { return null; };
    let socialSummary: any = dataIn[0].values;
    let POSITIVE: number = 0;
    let NEGATIVE: number = 0;
    console.log ('  received ' + dataIn[0].values.length + ' data points.');
    for (let i = 0; i <  dataIn[0].values.length; i++) {
      let myRow: any = dataIn[0].values[i];
      console.log ('myRow=' + JSON.stringify(myRow));
      console.log ('SENTIMENT:' + myRow["SENTIMENT_POLARITY"]);
      if (myRow["SENTIMENT_POLARITY"] == 'POSITIVE') { POSITIVE ++ ; } else
      if (myRow["SENTIMENT_POLARITY"] == 'NEGATIVE') { NEGATIVE ++ ; } else {
        console.log ('unknown SENTIMENT_POLARITY ' + myRow["SENTIMENT_POLARITY"]);
      }
    }
    console.log("NEGATIVE COUNT: " + NEGATIVE);
    console.log("POSITIVE COUNT: " + POSITIVE);
    return [ { "key": "Sentiment Polarity", "values": [
        {"SENTIMENT_POLARITY": "Positive",
        "COUNT": POSITIVE },
        {"SENTIMENT_POLARITY": "Negative",
        "COUNT": NEGATIVE }
      ]}];
    }
}
