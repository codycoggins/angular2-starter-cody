import { Component } from 'angular2/core';
import { WatsonContainer } from '../components';

@Component({
  selector: 'rio-about-page',
  directives: [ WatsonContainer ],
  template: `
    <watson-container>
      <h2 class="caps">About The Project NLS POC</h2>
      <p>
        This is a Proof of Concept to demonstrate IBM Watson capabilities. It is not for production use.
      </p>
    </watson-container>
  `
})
export class AboutPage {}
