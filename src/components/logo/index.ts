import { Component } from 'angular2/core';

@Component({
  selector: 'company-logo',
  styles: [require('./logo.css')],
  template: `
    <div class="logoDiv center items-center">
      <img src={{logoImage}} class="logo"
         height="75px" width="75px"/>
    </div>
  `
})
export class CompanyLogo {
  logoImage = require('../../assets/unilever-logo.png');
};
