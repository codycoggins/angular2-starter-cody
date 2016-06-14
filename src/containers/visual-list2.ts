import { Component, OnInit } from 'angular2/core';
import { Location } from 'angular2/platform/common';
import { Router, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import { List} from 'immutable';
// import { ObjectToArray} from './../components/pipes/pipes';
import { ChatItem} from './../services/chat-item';
import { ChatSessionStore } from '../services/chat-session-store';
import {
    WatsonContainer,
    AppNavigator,
    AppNavigatorItem
} from '../components';

@Component({
    selector: 'visual-list',
    directives: [WatsonContainer, ROUTER_DIRECTIVES, AppNavigator, AppNavigatorItem],
    template: `
    <div class="visual-title">{{chatSessionStore.visualTitle}}</div>
    <autoinput (click)="goBack()">< Back to Performance by Retailer</autoinput>
    <div id="chart_div" class="chart-div">
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
                        {{col}}
                    </td>
                    <td *ngFor="let col of row | slice:1">{{col}}</td>
                </tr>
            </tbody>
        </table>
        <span (click)="prevPage();" class="next-button" style="">
            Previous </span> &nbsp; <span (click)="nextPage();" class="next-button"
            style="display: {{hasNextPage()? '': 'display: none'"> Next </span> <br />
        <br />
    </div>
    `
})
export class VisualList2 implements OnInit {
    chatSessionStore: ChatSessionStore;
    router: Router;
    location: Location;

    constructor(chatSessionStore: ChatSessionStore, router: Router, location: Location) {
        console.log('VisualList2 constructor() ');
        this.chatSessionStore = chatSessionStore;
        this.router = router;
        this.location = location;
    }

    ngOnInit() {
    }

    goBack() {
        let drillDown: ChatItem = new ChatItem("drl_q_4.1", false);
        this.chatSessionStore.addChatAndResponse(drillDown);
    }
}
