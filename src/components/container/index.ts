import { Component, Input } from 'angular2/core';

@Component({
  selector: 'watson-container',
  template: `
  <div
    class="clearFix px1"
    [ngClass]= "{
      'max-width-1': size === 1,
      'max-width-2': size === 2,
      'max-width-3': size === 3,
      'max-width-4': size === 4,
      'mx-auto': center
    }">
    <ng-content></ng-content>
  </div>
  `
})
export class WatsonContainer {
  @Input() size = 1;
  @Input() center = false;
};
