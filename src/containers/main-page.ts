import { Component } from 'angular2/core';
import { Chat } from '../components';
import { Visualization } from '../components';
import { WatsonContainer } from '../components';

@Component({
  selector: 'main-page',
  directives: [ WatsonContainer, Chat, Visualization ],
  template: `
      <div id="chat-container" class="col col-4 top-0 p1"
       style="border-right: solid black thin;">
      <chat>
      </chat>

      </div>

      <div id="visualization-container" class="col col-8 top-0 p1"
       style="min-height:300px">
       <visualization>Visualization Area</visualization>
      </div>
  `
})
export class MainPage {}
