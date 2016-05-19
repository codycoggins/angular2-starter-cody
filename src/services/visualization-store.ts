import {Injectable} from 'angular2/core';
import {List} from 'immutable';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/Rx';

import {asObservable} from './asObservable';

@Injectable()
export class VisualizationStore {

    visDefault = require('../assets/vis-default.png');
    visBarchart1 = require('../assets/vis-example-barchart1.png');
    visBarchart2 = require('../assets/vis-example-barchart2.png');
    visMap1 = require('../assets/vis-example-map1.png');
    visMap2 = require('../assets/vis-example-map2.png');

    private _imageName: BehaviorSubject<any> =
      new BehaviorSubject<any>(this.visDefault);

    constructor() {
      console.log('VisualizationStore constructor');
      this.addImage(this.visDefault);

    }

    get imageName() {
        // console.log('VisualizationStore: imageName=' + this._imageName.getValue());
        console.log('imageName()' +  (<any>this._imageName)._value);
        return asObservable( (<any>this._imageName)._value);
    }

    get imagePath() {
        // console.log('VisualizationStore: imageName=' + this._imageName.getValue());
        console.log('imageName()' +  (<any>this._imageName)._value);
        return  (<any>this._imageName)._value;
    }
    addImage(imageName: string): boolean  {
      console.log('VisualizationStore: addImage(' + imageName + ')');
      this._imageName.next(imageName);
      return true;
    }


}
