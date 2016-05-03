import { Component } from 'angular2/core';

@Component({
  selector: 'company-logo',
  styles: [require('./logo.css')],
  template: `
    <div className="flex items-center">
      Company Logo Here
    </div>
  `
})
export class CompanyLogo {
  // private LogoImage = require('../../assets/rangleio-logo.svg');
};
