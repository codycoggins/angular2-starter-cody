import 'es5-shim';
import 'es6-shim';
import 'es6-promise';
import '../shims/shims_for_IE';

import 'angular2/bundles/angular2-polyfills';

import { enableProdMode, provide } from 'angular2/core';
import { bootstrap} from 'angular2/platform/browser';
import { ROUTER_PROVIDERS } from 'angular2/router';
import { APP_BASE_HREF } from 'angular2/platform/common';
import { WatsonApp } from './containers/watson-app';

declare let __PRODUCTION__: any;

if (__PRODUCTION__) {
  enableProdMode();
}

bootstrap(WatsonApp, [
  ROUTER_PROVIDERS,
  provide(APP_BASE_HREF, { useValue: '/' })
]);
