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
    AppNavigatorItem,
    Legend
} from '../components';

@Component({
    selector: 'visual-list',
    directives: [WatsonContainer, ROUTER_DIRECTIVES, AppNavigator, AppNavigatorItem, Legend],
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
                        <span *ngIf="chatSessionStore.intent!='retailer_performance'">{{col}}</span>
                        <autoinput *ngIf="chatSessionStore.intent=='retailer_performance'" (click)="selectStore(col)">{{col}}</autoinput>
                    </td>
                    <td *ngFor="let col of row | slice:1">{{col}}</td>
                </tr>
            </tbody>
        </table>
        <div>
<!-- TODO: add pagination -->
        </div>
     <legend></legend>
    </div>
    `
})

export class VisualList1 implements OnInit {
    chatSessionStore: ChatSessionStore;
    router: Router;
    location: Location;


    constructor(chatSessionStore: ChatSessionStore, router: Router, location: Location) {
        console.log('VisualList1 constructor() ');
        this.chatSessionStore = chatSessionStore;
        this.router = router;
        this.location = location;
    }

    ngOnInit() {
    }

    selectStore(store: string): void {
        this.chatSessionStore.updateDialogProfile("store", store);
        let drillDown: ChatItem = new ChatItem("drl_q_4.2", false);
        this.chatSessionStore.addChatAndResponse(drillDown);
    }

    goBack() {
        let drillDown: ChatItem = new ChatItem(this.chatSessionStore.profile['sub_brand'], false);
        this.chatSessionStore.addChatAndResponse(drillDown);
    }
}
