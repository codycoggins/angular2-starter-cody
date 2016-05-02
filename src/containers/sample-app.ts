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
    <div id="wrapper" class="fit">
      <app-navigator>
        <app-navigator-item [mr]=true>
          <company-logo></company-logo>
        </app-navigator-item>
        <app-navigator-item [mr]=true>
          <a [routerLink]="['Main']"
            class="text-decoration-none">Main</a>
        </app-navigator-item>
        <app-navigator-item>
          <a [routerLink]="['About']"
            class="text-decoration-none">About Us</a>
        </app-navigator-item>
        <div class="flex flex-auto"></div>
      </app-navigator>

      <div id="app-area" class="clearfix border fit bg-green">
      <router-outlet></router-outlet>
        <div id="chat-container" class="left border">
          <chat>

          </chat>
        </div>
        <div id="visualization-container" class="right border fit bg-red block">
        Visualization Area
        </div>
      </div>

    </div>
  `
})
@RouteConfig([
  {
    path: '/main',
    name: 'Main',
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
