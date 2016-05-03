import { Component } from 'angular2/core';

@Component({
  selector: 'company-logo',
  styles: [require('./logo.css')],
  template: `
    <div className="flex items-center">
      <img src="../src/assets/watson_logo-e1422392582870.png"
       height="70px" width="7 0px"/>
    </div>
  `
})
export class CompanyLogo {
  // private LogoImage = require('../../assets/rangleio-logo.svg');
};
