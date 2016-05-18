/**
*      This directive will draw a chart from the array of records provided
*
*           Note : the relevant jsapi scripts should be already available
*                  globally in the window.google object (see index.html)
*
* Adapted from
* http://stackoverflow.com/questions
*   /33797295/google-charts-jsapi-into-angular2-component
* user xavier268
**/

import {Directive, ElementRef, Input} from 'angular2/core';
import {CORE_DIRECTIVES } from 'angular2/common';

@Directive({
  selector: 'chart',
})
export class ChartDirective {

  el: HTMLElement;
  w: any;  // To store the window,
    // without generating errors in typescript on window.google
  private _content: any[] = [];

  // Setter for content will trigger drawing (or refreshing)
  @Input()
  set content(c: any[]) {
    console.log('Setting content ...');
    this._content = c;
    this.draw();
  }

  get content() { return this._content; }



  // Constructor inject a ref to the element
  constructor(elementRef: ElementRef) {
    console.log('Constructing chart directive');
    this.w = window;
    this.el = elementRef.nativeElement; // Cen't  use elementRef directly !
    // console.log('Native HTML :', this.el);
    if (!this.w.google) {
      console.error(
        'Hey ! It seems the needed google script was not loaded ?');
    };
  }

  // Do the actual drawing
  draw() {
    // Create the data table.
    let data = new this.w.google.visualization.DataTable();
    data.addColumn('date', 'Quand');
    data.addColumn('number', 'KG');
    let rows = [];
    for (let c in this._content) {
      let d: Date = new Date(this._content[c].quand);
      let k: number = +(this._content[c].kg);
        // Plus sign to force conversion sting -> number

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
