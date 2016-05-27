import { Component } from 'angular2/core';
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
  <div id="chart_div" class="border">
    <span _ngcontent-nvs-8='' class='visOverlayLabel h2 center'>
    Example Visual Map<br/>

    </span>

  </div>


  `
})
export class VisualMap {
  ChatSessionStore: ChatSessionStore;

  mapDataUS: string  = require('../data/us.json');

  constructor(ChatSessionStore: ChatSessionStore ) {
    console.log('visualMap constructor() ');

    console.log('us.json\n' + this.mapDataUS);
    this.ChatSessionStore = ChatSessionStore;
    this.draw();
  };

  draw() {

    let width = 960,
        height = 500;

    let centered;
    let path = d3.geo.path();
    console.log('about to create svg');
    let svg = d3.select('body').append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('background-color', 'red');

    let colorScale = d3.scale.category20b(1000);
    function colorByFIPS (fips) {
         return colorScale(Math.floor(fips % 500));
    };

    console.log('loading US map... ');
    d3.json(this.mapDataUS, function(error, topology) {
      if (error) throw error;
      console.log('... map loaded.');
      svg.selectAll('path')
          .data(topojson.feature(topology, topology.objects.counties).features)
        .enter().append('path')
          .attr('d', path)
          .style({
                  fill: function(d, i) {
                    // console.log(JSON.stringify(d.id));
                    return colorByFIPS(d.id);
                  },
                  stroke: function(d, i) {
                    return colorByFIPS(d.id);
                  }
                })
           .on('click', function(d){
             console.log ('You clicked ' + d.id);
           } );

           // onclick led to the clicked function
    });

  }



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
