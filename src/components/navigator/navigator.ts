import { Component } from 'angular2/core';

@Component({
  selector: 'app-navigator',
  styles: [`
    nav {
      background-color: #fff;
      color: #0B3D88;
    }
  `],
  template: `
    <nav class="flex items-baseline justify-between pl1 pr1" min-height="100px">
      <ng-content></ng-content>
    </nav>
  `
})
export class AppNavigator {};
