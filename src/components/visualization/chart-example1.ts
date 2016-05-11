import {Component } from 'angular2/core';
import {CORE_DIRECTIVES } from 'angular2/common';

// import {MyModel} from "./mymodel.service.ts";
import {ChartDirective} from './chart.directive.ts';


@Component({
selector: 'chart-example1',
template: `
  <div>
    <chart [content]="chartData" ></chart>
  </div>
`,
directives: [CORE_DIRECTIVES, ChartDirective]
})
export class ChartComponent {
  // Injecting my data model into chart component ...
  // constructor argument was private model: MyModel
  constructor() {
    console.log("Constructing chart component");
    let chartData: any = [
      ['Mushrooms', 3],
      ['Onions', 1],
      ['Olives', 1],
      ['Zucchini', 1],
      ['Pepperoni', 2]
    ];
  };
}
