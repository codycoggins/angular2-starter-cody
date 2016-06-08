import { Component, Inject, Injectable, OnInit  } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import {Observable} from 'rxjs/Observable';
import {List} from 'immutable';

import { NvD3Watson } from '../components/visualization/nvd3-watson';

import {ChatItem} from '../services/chat-item';
import { OLMessage, OLProfile} from '../services/chat-session-service';



declare var d3: any;

import { ChatSessionStore, ITranslatedData } from '../services/chat-session-store';

import {
  WatsonContainer,
  AppNavigator,
  AppNavigatorItem,
  CompanyLogo,
  Legend
} from '../components';

@Component({
  selector: 'visual-bar',
  directives: [ WatsonContainer, NvD3Watson, ROUTER_DIRECTIVES, AppNavigator, AppNavigatorItem, Legend ],
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
  <div style="{{chatSessionStore.intent=='social_feedback' ? '' : 'display: none;'}}" class="tab-container">
     <span class="tab-selected">
       <a [routerLink]="['Visual-bar']"
         class="navbar-link text-decoration-none">Graph</a>
     </span>
     <span class="tab">
       <a [routerLink]="['Visual-list-positive']"
         class="navbar-link text-decoration-none">View Tweets</a>
     </span>
  </div>

  <div id="chart_div" class="chart-div">
    <!--<span class="visOverlayLabel center h2">Example Bar Chart Visualization</span>-->
    <div class="visual-title">{{chartTitle}}</div>

    <nvd3-watson [options]="options" [data]="data"></nvd3-watson>
    <legend></legend>
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

      // code to determine subbrand causing decline
      let subbrand = this.chatSessionStore.findMinMax(6, -1);
      console.log ('The subbrand in decline is ' + subbrand);
      this.chatSessionStore.updateDialogProfile('subbrand', subbrand);

      let obs: Observable<any> = this.chatSessionStore.allChatItems;
      obs.subscribe(
              res => {
                  console.log ('VisualBar.ngOnInit() - intent subbrand_performance - Fixing text');
                  // console.log ('  This is the item I got: \n' + JSON.stringify(res) + '\n\n');
                  let allChatList: List<ChatItem>  = <List<ChatItem>> res;
                  let allChats: ChatItem[] = allChatList.toArray();
                  // console.log ('  length of list is: ' + allChats.length);
                  let myItem: ChatItem = allChats[allChats.length - 2];
                  console.log ('  found chat item: ' + JSON.stringify(myItem));

                  if ( !myItem.text.match( subbrand) && !myItem.text.match( subbrand.toUpperCase() )) {
                    console.log ('  no match on ' + subbrand);
                    myItem.text = myItem.text.replace('var_subbrand',   ' ' + subbrand.toUpperCase() + '.')  ;
                  } else {
                    console.log ('  already contains ' + subbrand );
                  }
                }
              );
      // end of subbrand substition code.

      xFunction = function(d){ return <string> d.LEVEL; };
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
            left: 200
          },
          x: xFunction,
          y: yFunction,
          useInteractiveGuideline: true,
          showValues: true,
          staggerLabels: true,
          transitionDuration: 500,
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
          // hardcoding y axis domain to fix bug.  not optimal.
          // yDomain: [-1, 1]
        }
      };

    } else if (intent === 'channel_performance') {
      // Question 3
      // for question:
      xFunction = function(d){ return d.NEWCHANNEL; };
      yFunction = function(d){ return d.SHRCYA; };
      console.log ('intent: channel_performance');

      this.chartTitle = 'Performance by Channel Overview';
      if (this.getBrand().length > 0 ) {
        this.chartTitle = this.getBrand() + ' - ' + this.chartTitle;
      }

      if (this.getRegion().length > 0 ) {
        this.chartTitle = this.getRegion() + ' Region' + ' - ' + this.chartTitle;
      }

      // code to determine channel causing decline
      let channel = this.chatSessionStore.findMinMax(6, -1);
      console.log ('The channel in decline is ' + channel);
      this.chatSessionStore.updateDialogProfile('channel', channel);

      // channel substition
      let obs2: Observable<any> = this.chatSessionStore.allChatItems;
      obs2.subscribe(
              res => {
                  console.log ('VisualBar.ngOnInit() - Fixing text');
                  // console.log ('  This is the item I got: \n' + JSON.stringify(res) + '\n\n');
                  let allChatList: List<ChatItem>  = <List<ChatItem>> res;
                  let allChats: ChatItem[] = allChatList.toArray();
                  // console.log ('  length of list is: ' + allChats.length);
                  let myItem: ChatItem = allChats[allChats.length - 2];
                  console.log ('  found chat item: ' + JSON.stringify(myItem));

                  if ( !myItem.text.match( channel) && !myItem.text.match( channel.toUpperCase() )) {
                    console.log ('  no match on ' + channel);
                    myItem.text = myItem.text.replace('var_channel',   ' ' + channel.toUpperCase() + '.')  ;
                  } else {
                    console.log ('  already contains ' + channel );
                  }
                }
              );
      // end of channel substition code.

      this.options = {
        chart: {
          type: 'multiBarHorizontalChart',
          height: 600,
          margin : {
            top: 20,
            right: 20,
            bottom: 40,
            left: 200
          },
          x: xFunction,
          y: yFunction,
          useInteractiveGuideline: true,
          showValues: true,
          staggerLabels: true,
          transitionDuration: 500,
          xAxis: {
            axisLabel: 'Channel'
          },
          yAxis: {
            axisLabel: 'SHRCYA',
            // tickFormat: function(d){
            //   return d3.format('.02f')(d);
            // },
            axisLabelDistance: -10
          }
          // hardcoding y axis domain to fix bug.  not optimal.
          // yDomain: [-1, 1]
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
          type: 'multiBarHorizontalChart',
          height: 600,
          margin : {
            top: 20,
            right: 20,
            bottom: 40,
            left: 200
          },
          x: xFunction,
          y: yFunction,
          useInteractiveGuideline: true,
          showValues: true,
          staggerLabels: true,
          transitionDuration: 500,
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
      // console.log ('myRow=' + JSON.stringify(myRow));
      // console.log ('SENTIMENT:' + myRow["SENTIMENT_POLARITY"]);
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
