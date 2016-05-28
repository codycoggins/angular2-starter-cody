import { Component, OnInit } from 'angular2/core';
import { ChatSessionStore } from '../services/chat-session-store';
// import { topojson } from 'ts-topojson';
// import { Base } from 'Topojson';

declare let g, d3, topojson: any;

import {
  WatsonContainer
} from '../components';

@Component({
  selector: 'visual-map',
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
      // font-letiant: small-caps;
      opacity: 0.6;
    }

    #chart_div {
      position: relative;
      min-height: 500px;

      width: 100%;
      height: 100%
    }
  `],
  template: `
  <div id="chart_div" class="">
    <!--<svg id="svg1" width="100%" height="100%" viewBox="0 0 640 480" preserveAspectRatio="xMaxYMax"></svg>-->
  </div>

  `
})
export class VisualMap implements OnInit {
  chatSessionStore: ChatSessionStore;
  intent: string;
  mapDataUS: string  = require('../data/USA.json');
  regionData: string = require('../data/regions.json');

  constructor(chatSessionStore: ChatSessionStore ) {
    console.log('visualMap constructor() ');

    this.chatSessionStore = chatSessionStore;
    this.intent = this.chatSessionStore.intent;

  };

  ngOnInit () {
    console.log('visualMap ngOnInit');
    this.draw();
  }

  draw() {

    let width = 960,
        height = 500;

    let centered;
    let path = d3.geo.path();
    console.log('about to create svg');

    let svg = d3.select('#chart_div')
      .append('svg')
      .attr('viewBox', '0 0 640 480')
      .attr('width', '640px')
      .attr('height', '480px')
      .append('g')
      .attr('viewBox', '0 0 640 480')
      .attr('width', '640px')
      .attr('height', '480px')
      .style('fill', 'steelblue');

    let colorScale = d3.scale.category20b(1000);
    function colorByFIPS (fips) {
        //  console.log ('unit:' + fips);
         return colorScale(Math.floor(fips % 500));
    };

    let regionDataMap;
    d3.json(this.regionData, function(error, regionDataLoad) {
      if (error) throw error;
      regionDataMap = regionDataLoad;
    });

    console.log('loading US map... ');
    d3.json(this.mapDataUS, function(error, topology) {
      if (error) throw error;
      console.log('... map loaded.');
      svg.selectAll('path')
          .data(topojson.feature(topology, topology.objects.units).features)
        .enter().append('path')
          .attr('d', path)
          .attr('transform', 'scale(0.75)')
          // .attr('position', 'absolute')
          // .attr('top', '0')
          .style({
                  fill: function(d, i) {
                    // console.log(JSON.stringify(d.id));
                    // console.log (JSON.stringify(d));
                    console.log ('id:' + d.id + ', name:' + d.properties.name);
                    return colorByFIPS(d.id);
                  },
                  stroke: function(d, i) {
                    return colorByFIPS(d.id);
                  }
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
