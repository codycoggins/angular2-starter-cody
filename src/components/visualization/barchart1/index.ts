
import { Component, OnInit } from 'angular2/core';
import { NvD3Watson } from '../nvd3-watson';
declare var d3: any;
// import { d3 } from 'ng2-nvd3/d3';
//  '//cdn.rawgit.com/krispo/ng2-nvd3/v1.1.0/lib/ng2-nvd3.ts';

@Component({
  selector: 'bar-chart1',
  directives: [NvD3Watson],
  styles: [`
  `],
  template: `
    <div>
      <nvd3-watson [options]="options" [data]="data"></nvd3-watson>
    </div>
    `})

export class BarChart1 implements OnInit {
  options;
  data;
  chartType;
  constructor() {
      // console.log('BarChart1.constructor()');
  }

  ngOnInit() {
    // console.log('BarChart1.ngOnInit()');

    this.options = {
      chart: {
        type: 'discreteBarChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 40,
          left: 55
        },
        x: function(d){ return d.SUBBRAND; },
        y: function(d){ return d.SHRCYA; },
        useInteractiveGuideline: true,
        xAxis: {
          axisLabel: 'Sub-Brand'
        },
        yAxis: {
          axisLabel: 'SHRCYA'
          // tickFormat: function(d){
          //   return d3.format('.02f')(d);
          // },
          // axisLabelDistance: -10
        }
      }
    };

    this.data = this.getData();
  }


getData() {

 // Line chart data should be sent as an array of series objects.
 return [
   {
      key: 'BarChart1',
      values: [
     {
       'SUBBRAND': 'SUAVE KIDS SBBR',
       'F1': 78063.86,
       'YA': 98865.3,
       'CYA': 20801.44,
       'SHR': 76.5,
       'SHRYA': 75.3,
       'SHRCYA': -1.2
     },
     {
       'SUBBRAND': 'SUAVE MOROCCAN INFUSION',
       'F1': 41094.21,
       'YA': 51554.31,
       'CYA': 10460.1,
       'SHR': 51.5,
       'SHRYA': 51,
       'SHRCYA': -0.5
     },
     {
       'SUBBRAND': 'SUAVE KERATIN INFUSION',
       'F1': 12054.16,
       'YA': 18226.62,
       'CYA': 6172.46,
       'SHR': 50.8,
       'SHRYA': 50.7,
       'SHRCYA': -0.1
     },
     {
       'SUBBRAND': 'SUAVE NTRLS SBBR',
       'F1': 101064.63,
       'YA': 151808.41,
       'CYA': 50743.78,
       'SHR': 65,
       'SHRYA': 64.9,
       'SHRCYA': -0.1
     },
     {
       'SUBBRAND': 'SUAVE SILVER SBBR',
       'F1': 63075.9,
       'YA': 88189.96,
       'CYA': 25114.06,
       'SHR': 59.2,
       'SHRYA': 59.1,
       'SHRCYA': -0.1
     },
     {
       'SUBBRAND': 'SUAVE MEN CORE',
       'F1': 74647.16,
       'YA': 97643.6,
       'CYA': 22996.44,
       'SHR': 100,
       'SHRYA': 100,
       'SHRCYA': 0
     },
     {
       'SUBBRAND': 'SUAVE GREEN SBBR',
       'F1': 53401.83,
       'YA': 82893.6,
       'CYA': 29491.77,
       'SHR': 44.3,
       'SHRYA': 45.7,
       'SHRCYA': 1.4
     }
   ]
 }
 ];

}


exampleData() {
 return  [
    {
      key: 'Cumulative Return',
      values: [
        {
          'label' : 'A Label' ,
          'value' : -29.765957771107
        } ,
        {
          'label' : 'B Label' ,
          'value' : 0
        } ,
        {
          'label' : 'C Label' ,
          'value' : 32.807804682612
        } ,
        {
          'label' : 'D Label' ,
          'value' : 196.45946739256
        } ,
        {
          'label' : 'E Label' ,
          'value' : 0.19434030906893
        } ,
        {
          'label' : 'F Label' ,
          'value' : -98.079782601442
        } ,
        {
          'label' : 'G Label' ,
          'value' : -13.925743130903
        } ,
        {
          'label' : 'H Label' ,
          'value' : -5.1387322875705
        }
      ]
    }
  ];

}

}
