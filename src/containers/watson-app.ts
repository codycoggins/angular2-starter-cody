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
  styles: [
    require('../styles/index.css'),
    require('../styles/nv.d3.css'),
`
    chat {
      min-width: 400px;
      background-color: #7AD3EA;
    }
    visualization {
      min-width: 600px;
        display: inline-block;
      }
      `
  ],
  template: `
    <div id="wrapper" class="fit" style="height:100%">
      <app-navigator class="fit">

        <app-navigator-item [mr]=true class="flex-none">
          <company-logo></company-logo>
        </app-navigator-item>

        <div class="italic bold h1 flex-auto">Project NLS</div>
        <div style="" class="flex">
          <app-navigator-item [mr]=true class="">
            <a [routerLink]="['Home']"
              class="navbar-link text-decoration-none">Home</a>
          </app-navigator-item>
          <app-navigator-item [mr]=true class="">
            <a [routerLink]="['Home']"
              class="navbar-link text-decoration-none">My Favorites</a>
          </app-navigator-item>
          <app-navigator-item class="">
            <a [routerLink]="['About']"
              class="navbar-link text-decoration-none">About</a>
          </app-navigator-item>
        </div>
      </app-navigator>

      <div id="app-area" class=""
       style="height:100%; margin:0; auto -100px; width: 100%;">
       <div id="main-page-container" class="flex flex-wrap justify-between">
           <chat id="chat-container" class="col col-4 top-0"></chat>
           <visualization id="visualization-container" class="flex-auto top-0 p1"
             style="min-height:300px">Visualization Area
<router-outlet></router-outlet>
             </visualization>
       </div>



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
