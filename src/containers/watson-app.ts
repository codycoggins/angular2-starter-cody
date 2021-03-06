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
import { VisualBullet } from './visual-bullet';
import {Maps} from './maps';
import { VisualList1 } from './visual-list1';
import { VisualList2 } from './visual-list2';

import {
  WatsonContainer,
  AppNavigator,
  AppNavigatorItem,
  CompanyLogo,
  Chat,
  DiagnosticWidget
  } from '../components';

@Component({
  selector: 'watson-app',
  directives: [
    ROUTER_DIRECTIVES, AppNavigator, AppNavigatorItem, Chat,
    WatsonContainer, CompanyLogo, DiagnosticWidget
  ],
  // Global styles imported in the app component.
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('../styles/index.css'),
    require('../styles/nv.d3.css'),
`
    chat {
      min-width: 400px;
      background-image: url("/intro-glow.png");
      background-position: 50% 0%;
      background-size: 100% 100%;
      background-color: #79C3E5;
    }
    visual-none {
      min-width: 400px;
      width: 100%;
      min-height: 400px;
      height: 100%;
      display: block;
      background-image: url("/watson-logo.svg");
      background-position: 50% 0%;
      background-size: 100% 100%;
      background-color: #F5F5F5;
    }
    #visualization-container {
      min-width: 600px;
        display: inline-block;
      }
      `
  ],
  template: `
    <div id="wrapper" class="fit" style="height:100%">

      <div id="app-area" class=""
       style="height:100%; margin:0; auto -100px; width: 100%;">
       <div id="main-page-container" class="flex flex-wrap">
           <chat id="chat-container" class="col col-4 top-0"></chat>


           <div id="visualization-container" class="flex-auto visualization-container"
             style="min-height:300px">
             <app-navigator class="fit">


               <div class="italic bold h1 flex-auto">&nbsp;</div>
               <div style="" class="flex">
                 <app-navigator-item [mr]=true class="">
                   <a [routerLink]="['Visual-bar']"
                     class="navbar-link text-decoration-none" style="color: #fff;">Bar Chart</a>
                 </app-navigator-item>
                 <app-navigator-item [mr]=true class="">
                   <a [routerLink]="['Visual-pie']"
                     class="navbar-link text-decoration-none" style="color: #fff;">Visual Pie</a>
                 </app-navigator-item>
                 <app-navigator-item [mr]=true class="">
                   <a [routerLink]="['Visual-map']"
                     class="navbar-link text-decoration-none" style="color: #fff;">Map</a>
                 </app-navigator-item>
                 <app-navigator-item [mr]=true class="">
                   <a [routerLink]="['Visual-column']"
                     class="navbar-link text-decoration-none" style="color: #fff; text-align:left;">Column Chart</a>
                 </app-navigator-item>
                 <app-navigator-item [mr]=true class="">
                   <a [routerLink]="['Visual-list']"
                     class="navbar-link text-decoration-none" style="color: #fff;">List</a>
                 </app-navigator-item>
                 <app-navigator-item [mr]=true class="">
                   <a [routerLink]="['Visual-none']"
                     class="navbar-link text-decoration-none">Home</a>
                 </app-navigator-item>
                 <app-navigator-item [mr]=true class="">
                   <a [routerLink]="['Visual-none']"
                     class="navbar-link text-decoration-none">My Favorites</a>
                 </app-navigator-item>
               </div>
             </app-navigator>
            <router-outlet></router-outlet>
            <br />
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
    path: '/maps',
    name: 'Visual-map',
    component: Maps
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
    path: '/visual-list1',
    name: 'Visual-list1',
    component: VisualList1
  },
  {
    path: '/visual-list2',
    name: 'Visual-list2',
    component: VisualList2
  },
  {
    path: '/Visual-table-4.1',
    name: 'Visual-table-4.1',
    component: VisualList1
  },
  {
    path: '/Visual-table-4.2',
    name: 'Visual-table-4.2',
    component: VisualList2
  },
  {
    path: '/Visual-list-positive',
    name: 'Visual-list-positive',
    component: VisualList
  },
  {
    path: '/Visual-list-negative',
    name: 'Visual-list-negative',
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
  },
  {
    path: '/visual-bullet',
    name: 'Visual-bullet',
    component: VisualBullet
  }
])
export class WatsonApp {
  introGlow = require('../assets/intro-glow.png');
  watsonLogoSVG = require('../assets/watson-logo.svg');
};
