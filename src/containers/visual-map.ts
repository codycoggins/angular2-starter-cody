import { Component, OnInit } from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {List} from 'immutable';

import {ChatItem} from '../services/chat-item';
import { ChatSessionStore } from '../services/chat-session-store';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import { OLMessage, OLProfile} from '../services/chat-session-service';

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
  selector: 'visual-map',
  directives: [ WatsonContainer, ROUTER_DIRECTIVES, Legend, Tabs, Tab ],
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

    #chart_div {
      position: relative;
      min-height: 500px;

      width: 100%;
      // height: 100%
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
  `
})
export class VisualMap implements OnInit {
  chatSessionStore: ChatSessionStore;
  intent: string;
  chartTitle: string;

  // to be used for map labels
  westInfo: string = '';
  midWestInfo: string = '';
  southInfo: string = '';
  northEastInfo: string = '';

  mapPathUSA: string  = require('../data/USA.json');
  dataPathRegion: string = require('../data/regions.json');
  dataPathStateHash: string = require('../data/states_hash_reverse.json');

  dataMessage: any;
  dataObject: any;

  constructor(chatSessionStore: ChatSessionStore, title: string ) {
    console.log('visualMap constructor() ');

    this.chatSessionStore = chatSessionStore;
    this.chartTitle = title;

  };

  retranslate (someData: any, title: string): any {
    if (someData == null) { return null; };
    let myData: any = someData[0].values;
    let dict = {};
    if (title == 'Share-Value') {
    myData.forEach(function(x) {
        dict[x.REGION] = x.SHRCYA;
        console.log(x.REGION + ', ' + x.SHRCYA);
    });
    console.log('dict is -- ' + JSON.stringify(dict));
    return dict;
  } else {
    myData.forEach(function(x) {
        dict[x.REGION] = x.DOLYA;
        console.log(x.REGION + ', ' + x.DOLYA);
    });
    console.log('dict is -- ' + JSON.stringify(dict));
    return dict;
  }
  }

  ngOnInit () {
    console.log('visualMap ngOnInit');
    this.intent = this.chatSessionStore.intent;
    this.dataMessage = this.chatSessionStore.translatedData();
    this.dataObject = this.retranslate (this.dataMessage, this.chartTitle);
    this.draw(this.chartTitle);
    this.setLabels();
  }

  setLabels() {
    if (this.dataObject) {
      this.westInfo = this.dataObject['West'];
      this.southInfo = this.dataObject['South'];
      this.northEastInfo = this.dataObject['North East'];
      this.midWestInfo = this.dataObject['MidWest'];
    }
  }

  draw(title: string) {
    let dataObject: any = this.dataObject;
    let width = 960,
        height = 500;

    let centered;
    let path = d3.geo.path();
    // console.log('about to create svg');

    console.log('drawing:' + title);
    let svg = d3.select('#' + title)
      .append('svg')
      .attr('viewBox', '0 0 960 500')
      .attr('width', '960px')
      .attr('height', '500px')
      .append('g')
      .attr('viewBox', '0 0 960 500')
      .attr('width', '960x')
      .attr('height', '500px')
      .style('fill', 'steelblue')
      .style('stroke', 'black');

    // let colorScale = d3.scale.category20b(100);

    let minValue: number;
    if (title == 'Share-Value') {
    minValue = this.chatSessionStore.findMinMaxVal(6, -1);
   } else {
       minValue = this.chatSessionStore.findMinMaxVal(2, -1);
   }
    console.log ('minValue: ' + minValue);
    let maxValue: number;
    if (title == 'Share-Value') {
     maxValue = this.chatSessionStore.findMinMaxVal(6,  1);
   } else {
      maxValue = this.chatSessionStore.findMinMaxVal(2,  1);
   }
    console.log ('maxValue: ' + maxValue);

    // if (minValue > 0) { minValue = 0; }
    // if (maxValue < 0) { maxValue = 0; }
    let middleValue: number = (minValue + maxValue) / 2;
    let warningValue: number = (middleValue + minValue ) / 2;

    console.log (minValue, warningValue, middleValue,  maxValue);
    let colorScale = d3.scale.linear()
        .domain([minValue, warningValue, middleValue,  maxValue])
        .range(["red", "yellow", "white", "green"]);

    function colorByState (state: string) {
        //  console.log ('unit:' + fips);
        // console.log('colorByState(' + state + ')');
        let region: string = stateAbbrevToRegion(  stateToAbbrev (state));
        if (region == null || region == '') {
          return 'white';
        }
        let val: number = regionToNumber(region);
        return colorScale(val);
    };

    let regionDataMap;
    d3.json(this.dataPathRegion, function(error, regionDataLoad) {
      if (error) throw error;
      regionDataMap = regionDataLoad;
    });

    function stateAbbrevToRegion (stateAbbrev: string) {
      let result: string = regionDataMap[stateAbbrev];
      if (result == null) { console.log ('no region found for ' + stateAbbrev); }
      // console.log ('stateAbbrevToRegion(' + stateAbbrev + ') =' + result );
      return result;
    }


    let stateHash;
    d3.json(this.dataPathStateHash, function(error, stateHashLoad) {
      if (error) throw error;
      stateHash = stateHashLoad;
    });

    function stateToAbbrev (state: string): string {
      // console.log ('stateToAbbrev(' + state + ') =' + stateHash[state]);
      return stateHash[state];
    }

    function regionToNumber (region: string): number {
      let result = dataObject[region];
      // console.log ('regionToNumber(' + region + ') =' + result);
      return Number( result);
    }

    // function getRowByKey(code: string) {
    //   let myData: any = data;
    //   let result =  myData.filter(
    //     function ( mydata) {
    //       return (myData.REGION == code);
    //     }
    //   );
    //   if (result == null || result == []) {
    //       console.log ('getRowByKey (' + code + ') = nothing' );
    //   }
    //   console.log ('getRowByKey (' + code + ') = ' + JSON.stringify(result) );
    //   return result;
    // };


    console.log('loading US map... ');
    d3.json(this.mapPathUSA, function(error, topology) {
      if (error) throw error;
      console.log('... map loaded.');
      svg.selectAll('path')
          .data(topojson.feature(topology, topology.objects.units).features)
        .enter().append('path')
          .attr('d', path)
          .attr('transform', 'scale(1.00)')
          // .attr('position', 'absolute')
          // .attr('top', '0')
          .style({
                  fill: function(d, i) {
                    // console.log(JSON.stringify(d.id));
                    // console.log (JSON.stringify(d));
                    // console.log ('id:' + d.id + ', name:' + d.properties.name);
                    return colorByState(d.properties.name);
                  },
                  stroke: 'black'
                  // function(d, i) {
                  //   return colorByState(d.properties.name);
                  // }
                });
          //  .on('click', function(d){
          //    console.log ('You clicked ' + d.id);
          //  } );

           // onclick led to the clicked function
    });
    // function sizeChange() {
    // if (svg  == null) { console.log('svg is null'); }
    // if (chartDiv == null) { console.log('chartDiv is null'); } else {console.log('chartDiv ok ready to scale, width= ' + chartDiv.attr('width')); }
    // svg.attr('transform', 'scale(' + chartDiv.attr('width') / 900 + ')');
    // svg.attr('height', chartDiv.attr('width')  * 0.618);

    // svg.attr('transform', '0.4');
    // svg.attr('height', '300');
  // }



  // clicked(d) {
  //   let x, y, k;
  //
  //   if (d && centered !== d) {
  //     let centroid = path.centroid(d);
  //     x = centroid[0];
  //     y = centroid[1];
  //     k = 4;
  //     centered = d;
  //   } else {
  //     x = width / 2;
  //     y = height / 2;
  //     k = 1;
  //     centered = null;
  //   }
  //
  //   g.selectAll('path')
  //       .classed('active', centered && function(d) { return d === centered; });
  //
  //   g.transition()
  //       .duration(750)
  //       .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')')
  //       .style('stroke-width', 1.5 / k + 'px');
  // }


  }
}
