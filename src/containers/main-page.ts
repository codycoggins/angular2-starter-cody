import { Component } from 'angular2/core';
import { Chat } from '../components';
import { WatsonContainer } from '../components';

@Component({
  selector: 'main-page',
  directives: [ WatsonContainer, Chat ],
  template: `
    <watson-container>
      <h2 class="caps">Main Page</h2>
      <p>
        This will be the main page.
      </p>


      <div id="chat-container" class="col col-4  border">
      <chat>
      </chat>
        
      </div>

      <div id="visualization-container" class="flex-auto border bg-red">
        Visualization Area
      </div>

    </watson-container>
  `
})
export class MainPage {}
