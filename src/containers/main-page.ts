import { Component } from 'angular2/core';
import { Chat } from '../components';
import { WatsonContainer } from '../components';

@Component({
  selector: 'main-page',
  directives: [ WatsonContainer, Chat ],
  template: `

      <h2 class="caps">Main Page</h2>
      <p>
        This will be the main page.
      </p>


      <div id="chat-container" class="col col-4  border top-0 p1">
      <chat>
      </chat>

      </div>

      <div id="visualization-container" class="col col-8 border bg-red top-0 p1"
       style="min-height:300px">
        Visualization Area
      </div>
  `
})
export class MainPage {}
