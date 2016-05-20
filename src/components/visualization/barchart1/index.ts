
import { Component, OnInit } from 'angular2/core';
import {nvD3} from 'ng2-nvd3';
//  '//cdn.rawgit.com/krispo/ng2-nvd3/v1.1.0/lib/ng2-nvd3.ts';

@Component({
  moduleId: module.id,
  selector: 'bar-chart1',
  styles: [`
  `],
  template: `

      <div id="bar-chart1" >
      Bar Chart 1
      </div>
  `})

export class BarChart1 implements OnInit {
  constructor() {  }

  ngOnInit() {}
}
