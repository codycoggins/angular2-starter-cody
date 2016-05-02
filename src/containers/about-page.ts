import { Component } from 'angular2/core';
import { WatsonContainer } from '../components';

@Component({
  selector: 'rio-about-page',
  directives: [ WatsonContainer ],
  template: `
    <watson-container>
      <h2 class="caps">About Us</h2>
      <p>
        Rangle.io is a next-generation HTML5 design and development firm
        dedicated to modern, responsive web and mobile applications.
      </p>
    </watson-container>
  `
})
export class AboutPage {}
