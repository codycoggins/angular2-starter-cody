import { Component } from 'angular2/core';
import { ChartComponent } from './chart-example1';
import { ChartDirective } from './chart.directive.ts';

@Component({
  selector: 'visualization',
  styles: [],
  template: `
    <div>
      <h3>Visualization here</h3>
      <chart-example1 ></chart-example1>
    </div>
  `,
})
export class Visualization {
  constructor() {
    console.log('Visualization constructor()');

  };
  sampleVisualization = require('../../assets/us-heatmap.png');
};
