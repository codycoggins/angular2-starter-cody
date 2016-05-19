import { Component } from 'angular2/core';

@Component({
  selector: 'app-navigator',
  styles: [`
    nav {
      background-color: black;
      color: #34B94C;
    }
  `],
  template: `
    <nav class="flex items-baseline justify-between pl1 pr1" min-height="100px">
      <ng-content></ng-content>
    </nav>
  `
})
export class AppNavigator {};
