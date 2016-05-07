import { Component } from 'angular2/core';

@Component({
  selector: 'visualization',
  styles: [],
  template: `
    <div>
      <img src={{sampleVisualization}}/>
    </div>
  `
})
export class Visualization {
    sampleVisualization = require('../../assets/us-heatmap.png');
};
