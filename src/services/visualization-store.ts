import {Injectable} from 'angular2/core';
import {List} from 'immutable';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/Rx';

import {asObservable} from './asObservable';

@Injectable()
export class VisualizationStore {

    private _imageName: BehaviorSubject<string> =
      new BehaviorSubject<string>(this.visDefault);

    constructor() {
    }

    get imageName() {
        return asObservable(this._imageName);
    }

    addImage(imageName: string): boolean  {

      this._imageName.next(imageName);
      return true;
    }

    visDefault = require('../assets/vis-default.png');
    visBarchart1 = require('../assets/vis-example-barchart1.png');
    visBarchart2 = require('../assets/vis-example-barchart2.png');
    visMap1 = require('../assets/vis-example-map1.png');
    visMap2 = require('../assets/vis-example-map2.png');

}
