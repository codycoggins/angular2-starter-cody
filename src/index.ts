import 'es5-shim';
import 'es6-shim';
import 'es6-promise';
import '../shims/shims_for_IE';

// Add all operators to Observable
import 'rxjs/Rx';

import 'angular2/bundles/angular2-polyfills';

import { enableProdMode, provide } from 'angular2/core';
import { bootstrap} from 'angular2/platform/browser';
import { ROUTER_PROVIDERS } from 'angular2/router';
import { APP_BASE_HREF } from 'angular2/platform/common';
import { HTTP_PROVIDERS } from 'angular2/http';
import { WatsonApp } from './containers/watson-app';
import { asObservable } from './services/asObservable';
import { ChatSessionStore } from './services/chat-session-store';
import { ChatSessionService } from './services/chat-session-service';
import { DialogParser } from './services/dialog-parser';

declare let __PRODUCTION__: any;

// console.log('running src/index.ts');

if (__PRODUCTION__) {
  enableProdMode();
}

bootstrap(WatsonApp, [
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  provide(APP_BASE_HREF, { useValue: '/' }),
  ChatSessionService,
  ChatSessionStore,
  DialogParser
]);
