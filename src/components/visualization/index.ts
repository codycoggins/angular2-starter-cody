import { Component } from 'angular2/core';
import { ChartComponent } from './chart-example11';
import {ChartDirective} from "./chart.directive.ts";

@Component({
  selector: 'visualization',
  styles: [],
  template: `
    <div>
      <chart [attr.content]="chartData" ></chart>
    </div>
  `
})
export class Visualization {
  constructor() {
    console.log('Visualization constructor()');
    let chartData:any = [
      ['Mushrooms', 3],
      ['Onions', 1],
      ['Olives', 1],
      ['Zucchini', 1],
      ['Pepperoni', 2]
    ];
  };
  sampleVisualization = require('../../assets/us-heatmap.png');
};
