import { Component, EventEmitter, Input, Output } from 'angular2/core';

@Component({
  selector: 'send-button',
  template: `
    <button
      (click)="handleClick($event)"
      type="{{type || 'button'}}"
      class="btn btn-primary {{className}}">

      <ng-content></ng-content>
    </button> 
  `
})
export class SendButton {
  @Input() className: string;
  @Input() type: string;
  @Output() onClick: EventEmitter<Event> = new EventEmitter();

  handleClick(event) {
    this.onClick.emit(event);
  }
};
