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
      <chat>
      </chat>
    </watson-container>
  `
})
export class MainPage {}
