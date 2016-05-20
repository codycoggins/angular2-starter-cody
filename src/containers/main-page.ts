import { Component } from 'angular2/core';
import { Chat } from '../components';
import { Visualization } from '../components';
import { WatsonContainer } from '../components';

@Component({
  selector: 'main-page',
  directives: [ WatsonContainer, Chat, Visualization ],
  styles: [`
    chat {
      min-width: 400px;
      background-color: #7AD3EA;
    }
    visualization {
      min-width: 600px;
        display: inline-block;
      }
  `],
  template: `
  <div id="main-page-container" class="flex flex-wrap justify-between">
      <chat id="chat-container" class="col col-4 top-0 p1"></chat>
      <visualization id="visualization-container" class="flex-auto top-0 p1"
        style="min-height:300px">Visualization Area</visualization>
  </div>
  `
})
export class MainPage {}
