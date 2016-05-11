import {
  Component,
  ViewEncapsulation,
  Inject,
  ApplicationRef
} from 'angular2/core';

import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { AboutPage } from './about-page';
import { MainPage } from './main-page';

import {
  WatsonContainer,
  AppNavigator,
  AppNavigatorItem,
  CompanyLogo,
  Chat
} from '../components';

@Component({
  selector: 'watson-app',
  directives: [
    ROUTER_DIRECTIVES, AppNavigator, AppNavigatorItem,
    CompanyLogo, WatsonContainer
  ],
  // Global styles imported in the app component.
  encapsulation: ViewEncapsulation.None,
  styles: [require('../styles/index.css')],
  template: `
    <div id="wrapper" class="fit" style="height:100%">
      <app-navigator class="p1 fit">

        <app-navigator-item [mr]=true class="flex-none">
          <company-logo></company-logo>
        </app-navigator-item>

        <div class="italic h1 flex-auto">Nielsen Watson POC</div>
        <div style="" class="flex">
          <app-navigator-item [mr]=true class="">
            <a [routerLink]="['Home']"
              class="navbar-link text-decoration-none">Home</a>
          </app-navigator-item>
          <app-navigator-item class="">
            <a [routerLink]="['About']"
              class="navbar-link text-decoration-none">About</a>
          </app-navigator-item>
        </div>
      </app-navigator>

      <div id="app-area" class="flex flex-wrap"
       style="height:100%; margin:0 auto -100px">
      <router-outlet></router-outlet>


      </div>

    </div>
  `
})
@RouteConfig([
  {
    path: '/main',
    name: 'Home',
    component: MainPage,
    useAsDefault: true
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage
  }
])
export class WatsonApp {
};
