import {
  Component,
  ViewEncapsulation,
  Inject,
  ApplicationRef
} from 'angular2/core';

import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { VisualNone } from './visual-none';
import { VisualBar } from './visual-bar';
import { VisualBubble } from './visual-bubble';
import { VisualColumn } from './visual-column';
import { VisualList } from './visual-list';
import { VisualMap } from './visual-map';
import { VisualPie } from './visual-pie';

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
    ROUTER_DIRECTIVES, AppNavigator, AppNavigatorItem, Chat,
    WatsonContainer, CompanyLogo
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
    #visualization-container {
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
            <a [routerLink]="['Visual-none']"
              class="navbar-link text-decoration-none">Home</a>
          </app-navigator-item>
          <app-navigator-item [mr]=true class="">
            <a [routerLink]="['Visual-bar']"
              class="navbar-link text-decoration-none">Example Bar Chart</a>
          </app-navigator-item>
          <app-navigator-item [mr]=true class="">
            <a [routerLink]="['Visual-map']"
              class="navbar-link text-decoration-none">Example Map</a>
          </app-navigator-item>
          <app-navigator-item [mr]=true class="">
            <a [routerLink]="['Visual-column']"
              class="navbar-link text-decoration-none">Exa  mple Column Chart</a>
          </app-navigator-item>
          <app-navigator-item [mr]=true class="">
            <a [routerLink]="['Visual-none']"
              class="navbar-link text-decoration-none">My Favorites</a>
          </app-navigator-item>
        </div>
      </app-navigator>

      <div id="app-area" class=""
       style="height:100%; margin:0; auto -100px; width: 100%;">
       <div id="main-page-container" class="flex flex-wrap justify-between">
           <chat id="chat-container" class="col col-4 top-0"></chat>
           <div id="visualization-container" class="flex-auto top-0 p1"
             style="min-height:300px">

                <router-outlet></router-outlet>

             </div>
       </div>

      </div>

    </div>
  `
})
// visual-map
// visual-bar
// visual-column
// visual-pie
// visual-list
// visual-bubble
@RouteConfig([
  {
    path: '/',
    name: 'Visual-none',
    component: VisualNone,
    useAsDefault: true
  },
  {
    path: '/visual-bar',
    name: 'Visual-bar',
    component: VisualBar
  },
  {
    path: '/visual-map',
    name: 'Visual-map',
    component: VisualMap
  },
  {
    path: '/visual-pie',
    name: 'Visual-pie',
    component: VisualPie
  },
  {
    path: '/visual-list',
    name: 'Visual-list',
    component: VisualList
  },
  {
    path: '/visual-bubble',
    name: 'Visual-bubble',
    component: VisualBubble
  },
  {
    path: '/visual-column',
    name: 'Visual-column',
    component: VisualColumn
  }
])
export class WatsonApp {
};
