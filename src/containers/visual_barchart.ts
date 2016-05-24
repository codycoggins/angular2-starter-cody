import { Component } from 'angular2/core';
import { Chat } from '../components';
import { Visualization } from '../components';
import { WatsonContainer } from '../components';

@Component({
  selector: 'main-page',
  directives: [ WatsonContainer, Chat, Visualization ],
  styles: [`

  `],
  template: `

  `
})
export class MainPage {}
