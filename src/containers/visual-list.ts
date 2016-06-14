import { Component, OnInit } from 'angular2/core';
import { Router, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import { List} from 'immutable';
// import { ObjectToArray} from './../components/pipes/pipes';
import {ChatItem} from './../services/chat-item';




import { ChatSessionStore } from '../services/chat-session-store';

import {
  WatsonContainer,
  AppNavigator,
  AppNavigatorItem
} from '../components';

@Component({
  selector: 'visual-list',
  directives: [ WatsonContainer, ROUTER_DIRECTIVES, AppNavigator, AppNavigatorItem ],
//  pipes: [ObjectToArray],
  styles: [`
    .visOverlayLabel {
      position: absolute;
      color: #0B3D88;
      background-color: lightgray;
      z-index: 10;
      left: 170px;
      top: 50px;
      // font-weight: bold;
      padding: 10px;
      // font-variant: small-caps;
      opacity: 0.6;
    }

    #chart_div {
      position: relative;
    }

    .next-prev-button {
      margin: 10px;
      color: black;
      height: 40px;
      background: #54C6E4;
      padding: 8px;
      cursor: pointer;
      font-weight: bold;
      margin: 0;
      cursor: pointer;
    }

  `],
  template: `
  <div style="{{chatSessionStore.intent=='social_feedback' ? '' : 'display: none;'}}" class="tab-container">
     <span class="tab">
       <a [routerLink]="['Visual-bar']"
         class="navbar-link text-decoration-none">Graph</a>
     </span>
     <span class="tab-selected">
       <a [routerLink]="['Visual-list-positive']"
         class="navbar-link text-decoration-none">View Tweets</a>
     </span>
  </div>

  <div class="visual-title">{{chatSessionStore.visualTitle}}</div>

  <div id="chart_div" class="chart-div">
    <!--<span class=" visOverlayLabel h2 center">
    Visual List
    </span>-->
    <!--div innerHTML="{{ dataInListHTMLWithGroups() }}"></div-->
    <div class="h2" *ngIf="chatSessionStore.visualData.length <= 1">No data found</div>
    <table class="table" *ngIf="chatSessionStore.visualData.length > 1">
        <thead>
            <tr>
                <th *ngFor="let head of chatSessionStore.visualData[0]">{{head}}</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let row of chatSessionStore.visualData | slice:1">
                <td *ngFor="let col of row | slice:0:1">
                    <span *ngIf="chatSessionStore.intent!='retailer_performance'">{{col}}</span>
                    <autoinput *ngIf="chatSessionStore.intent=='retailer_performance'" (click)="selectRetailer(col)">{{col}}</autoinput>
                </td>
                <td *ngFor="let col of row | slice:1">{{col}}</td>
            </tr>
        </tbody>
    </table>
    <br />
    <div>
      <span (click)="prevPage();" class="next-prev-button"
        style="{{(page > 0) ? '' : 'display: none' }}"> Previous </span> &nbsp;
      <span (click)="nextPage();" class="next-prev-button"
      style="{{ (hasNextPage()) ? '' : 'display: none' }}"> Next </span>
    </div>
     <legend></legend>
    <br />
  </div>
  `
})
export class VisualList implements OnInit {
  chatSessionStore: ChatSessionStore;
    router: Router;
  page: number = 0;
  rowsPerPage: number = 20;
  totalRows: number = 0;
  // chartTitle: string = 'Table';

  constructor(chatSessionStore: ChatSessionStore, router: Router ) {
    console.log('VisualList constructor() ');
    this.chatSessionStore = chatSessionStore;
      this.router = router;
  };

  hasNextPage(): boolean {
    if (!this.chatSessionStore.hasData()) return false;
    if (((this.page + 1) * this.rowsPerPage) < this.totalRows ) {
      return true;
    } else {
      return false;
    }
  }
  nextPage() {
    console.log('nextPage()');
    if (this.hasNextPage()) {
       this.page = this.page + 1;
    } else {
      console.log('nextPage(): WARNING there is no next page.');
    }
  }

  prevPage() {
    console.log('prevPage()');
    if (this.page > 0) {
      this.page = this.page - 1;
    }
  }
  ngOnInit () {
    // if (router.isRouteActive(router.generate(['/Home'])));
  }

  dataInListHTML(): string {
    // console.log ('dataInListHTML()');
    if (!this.chatSessionStore.hasData()) {
      this.totalRows = 0;
      return '<div class="h2">No data found</div>';
    }
    let data: any[][] = this.chatSessionStore.visualData;

    this.totalRows = data.length;
    if (data == null || data.length === 0) {
      return '<div style="display: none;">No Data returned</div>';
    }
    let html: string = '';
    html = html + '<table>';
    for (let i: number = 0; i < data.length; i++) {
      html = html + '<tr>';
      let tag: string = 'td' ;
      if (i === 0) { tag = 'th'; }

      for (let j: number = 0; j < data[i].length; j++) {
        html = html + '<' + tag + '>' + data[i][j] + '</' + tag + '>';
      }
      html = html + '</tr>';
    }

    html = html + '</table>';
    return html;

  }


    dataInListHTMLWithGroups(): string {
      // console.log ('dataInListHTML()');
      if (!this.chatSessionStore.hasData()) {
        this.totalRows = 0;
        return '<div class="h2">No data found</div>';
      }
      let data: any[][] = this.chatSessionStore.visualData;
      this.totalRows = data.length;
      // console.log('dataInListHTMLWithGroups() grid size: ' + data.length + ' x ' + data[0].length + '; page=' + this.page);
      if (data == null || data.length === 0) {
        return '<div style="display: none;">No Data returned</div>';
      }
      let html: string = '';
      html = html + '<table>';

      // headings
      for (let j: number = 0; j < data[0].length; j++) {
          html = html + '<th>' + data[0][j] + '</th> ';
      }


      // data
      for (let i: number = (this.page * this.rowsPerPage) + 1; i < data.length && i < ((this.page + 1 ) * this.rowsPerPage); i++) {
        html = html + '<tr>';
        let tag: string = 'td' ;

        for (let j: number = 0; j < data[i].length; j++) {
          // check for groupings
          let skip: boolean = (i > 0) && !this.isBlankOrZero(data[i][j]) && (data[i][j] == data[i - 1][j]) && (i != ( this.page * this.rowsPerPage) + 1);
          let rowSpan = this.getRowSpan(data, i, j, 1);

          if (!skip) {
            html = html + '<' + tag + ' rowspan="' + rowSpan + '">' + data[i][j] + '</' + tag + '>';
          } else {
            html = html + '<!-- skip ' + data[i][j]  + ' -->';
          }
        }
        html = html + '</tr>';
      }

      html = html + '</table>';
      return html;

    }

    getRowSpan (data: any[][], i: number, j: number, count: number) {
      // console.log('getRowSpan (data, ' + i + ',' + j + ',' + count + ')');
      let maxSpan = this.rowsPerPage - 1;
      if (this.isBlankOrZero(data[i][j])) { return count; }
      if ((data.length > (i + 1)) && (count < maxSpan)
          && data[i + 1][j] == data[i][j]) {
        return this.getRowSpan (data, i + 1, j, count + 1);
      } else {
        return count;
      }
   }

   isBlankOrZero (x: any): boolean {
     if (x == null || x  == 0 || x == '') {
       return true;
     } else {
       return false;
     }
   }

   selectRetailer(retailer: string): void {
       this.chatSessionStore.updateDialogProfile("retailer", retailer);
       let drillDown: ChatItem = new ChatItem("drl_q_4.1", false);
       this.chatSessionStore.addChatAndResponse(drillDown);
   }
}
