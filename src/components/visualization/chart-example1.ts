import {Component } from 'angular2/core';
import {Directive, ElementRef, Input} from 'angular2/core';
import {CORE_DIRECTIVES } from 'angular2/common';

// import {MyModel} from './mymodel.service.ts';
import {ChartDirective} from './chart-directive.ts';


@Component({
selector: 'chartexample1',
styles: [`

`],
template: `
  <div>
    <chart [content]='chartData' ></chart>
  </div>
`,

directives: [CORE_DIRECTIVES, ChartDirective]
})
export class ChartComponent {
  // Injecting my data model into chart component ...
  // constructor argument was private model: MyModel
  w: any;  // To store the window, without generating
    // errors in typescript on window.google
  private _content: any[] = [];
  el: HTMLElement;

  constructor(elementRef: ElementRef) {
    console.log('Constructing chart component');
    this.w = window;
    this.el = elementRef.nativeElement; // You cannot use elementRef directly !

    if (!this.w.google) {
      console.error(
        'Hey ! It seems the needed google script was not loaded ?');
    };


    this._content  = [
      ['Mushrooms', 3],
      ['Onions', 1],
      ['Olives', 1],
      ['Zucchini', 1],
      ['Pepperoni', 2]
    ];
    this.draw();
  };

  draw() {
    // Create the data table.
    let data = new this.w.google.visualization.DataTable();
    data.addColumn('date', 'Quand');
    data.addColumn('number', 'KG');
    let rows = [];
    for (let c in this._content) {
      let d: Date = new Date(this._content[c].quand);
      let k: number = +(this._content[c].kg); // Plus sign to
        // force conversion sting -> number

      rows.push([d, k]);
    }
    data.addRows(rows);
    // Create options
    let options: any = {
      // 'width': 600,
      'height': 300,
      'curveType': 'function'
    };


    // Instantiate and draw our chart, passing in some options.
    let myChart: any = new this.w.google.visualization.LineChart(this.el)
      .draw(data, options);
  }

}
