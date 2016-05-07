import { Component } from 'angular2/core';

@Component({
  selector: 'company-logo',
  styles: [require('./logo.css')],
  template: `
    <div className="flex items-center">
      <img src={{logoImage}}
       height="70px" width="70px"/>
    </div>
  `
})
export class CompanyLogo {
  logoImage = require('../../assets/watson_logo_large.png');
};
