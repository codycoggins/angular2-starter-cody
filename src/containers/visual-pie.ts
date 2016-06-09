import { Component, OnInit } from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {List} from 'immutable';

import {ChatItem} from '../services/chat-item';
import { ChatSessionStore } from '../services/chat-session-store';
import { OLMessage, OLProfile} from '../services/chat-session-service';
import { ITranslatedData } from '../services/chat-session-store';

// import { topojson } from 'ts-topojson';
// import { Base } from 'Topojson';

declare let g, d3, topojson: any;

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
    <div id="chart_div" >
    <table>
    <tr>

    <div id="pie-chart">
    <div class="visual-title">Sentiments Pie chart</div>
    </div>
    </tr>
    <tr>
    <td valign="top">

    <div id="positive-sentiments-table">
    <div class="visual-title">Positive Sentiments Table</div>
    <div innerHTML="{{ dataInColumnHTML('POSITIVE') }}"></div>
    </div>
    </td>
    <td valign="top">
    <div id="negative-sentiments-table">
    <div class="visual-title"> Negative Sentiments Table</div>
    <div innerHTML="{{ dataInColumnHTML('NEGATIVE') }}"></div>
    </div>
    </td>
    </tr>
    </table>
    </div>
    `
  })

  export class VisualPie  implements OnInit  {
    options;
    data: any;
    dataRough: any;
    chatSessionStore: ChatSessionStore;

    constructor(chatSessionStore: ChatSessionStore ) {
      console.log('VisualPie constructor() ');
      this.chatSessionStore = chatSessionStore;
    };

    ngOnInit() {
      let intent = this.chatSessionStore.intent;
      let xFunction ;
      let yFunction ;
      this.dataRough =  this.chatSessionStore.translatedData();
      this.drawPieChart();
      // this.data = this.dataRough;
      // console.log(' Data JSON ' + JSON.stringify(this.data));
    }

    drawPieChart() {
      console.log ('\n SOCIAL FEEDBACK \n');
      this.dataRough = this.processSocialFeedback (this.dataRough);
      this.data = this.dataRough;
      let donutWidth = 75;
      let width = 360;
      let height = 360;
      let radius = Math.min(width, height) / 2;

      let color = d3.scale.ordinal()
      // .domain(['Positive','Negative'])
      .range(['#2ca02c', '#d62728']);

      let svg = d3.select('#pie-chart')
      .append('svg')
      .data([this.data])
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + (width / 2) +
      ',' + (height / 2) + ')');

      let arc = d3.svg.arc()
      .innerRadius(radius - donutWidth)
      .outerRadius(radius);

      let pie = d3.layout.pie()
      .value(function(d) { return d.value; })
      .sort(null);

      let path = svg.selectAll('path')
      .data(pie)
      .enter()
      .append('path')
      .attr('d', arc)
      .on("click", function(d){
        console.log(d.data.key);
        if (d.data.key == 'Positive') {
          // this.dataInColumnHTML(d.data.key);
        } else
        if (d.data.key == 'Negative') {
          // this.dataInColumnHTML(d.data.key);
        }

      })
      .attr('fill', function(d, i) {
        return color(i);
      }
    );
    let legendRectSize = 18;
    let legendSpacing = 4;

    let legend = svg.selectAll('.legend')
    .data(color.domain())
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', function(d, i) {
      let height = legendRectSize + legendSpacing;
      let offset =  height * color.domain().length / 2;
      let horz = -2 * legendRectSize;
      let vert = i * height - offset;
      return 'translate(' + horz + ',' + vert + ')';
    });

    legend.append('rect')
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)
    .style('fill', color)
    .style('stroke', color);

    legend.append('text')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function(d) { return d; });
  }



  processSocialFeedback (dataIn: [ITranslatedData]): [any] {

    console.log('VisualPie.processSocialFeedback()');
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
    return [
      {key: "Positive",
      "value": POSITIVE },
      {key: "Negative",
      "value": NEGATIVE }
    ];
  }

  dataInColumnHTML(type: string): string {
    // console.log('type is' +type);
    let data: any[][] = this.chatSessionStore.visualData;
    if (data == null || data.length === 0) {
      return '<div style="display: none;">No Data returned</div>';
    }

    let html: string = '';
    html = html + '<table><col width="100"><col width="250"><col width="30"><col width="100"><col width="30"><col width="100">';

    for (let i: number = 0; i < data.length; i++) {

      let tag: string = 'td' ;
      if (i === 0) { tag = 'th'; }


      if (data[i][0] == type || i == 0) {
        html = html + '<tr>';
        for (let j: number = 0; j < data[i].length; j++) {
          if (j == 1) {
            html = html + '<' + tag + ' width="200" >' + data[i][j] + '</' + tag + '>';
          } else {
            html = html + '<' + tag + ' width="40" >' + data[i][j] + '</' + tag + '>';
          }

        }
        html = html + '</tr>';
      }
    }

    html = html + '</table>';
    return html;
  }
}
