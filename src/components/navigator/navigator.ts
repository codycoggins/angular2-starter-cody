import { Component } from 'angular2/core';

@Component({
  selector: 'app-navigator',
  template: `
    <nav class="flex items-center p1 bg-white border-bottom" min-height="100px">
      <ng-content></ng-content>
    </nav>
  `
})
export class AppNavigator {};
