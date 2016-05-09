//
// import {List, Record} from 'immutable';
// import Immutable = require('immutable');
//
// const ChatRecord = Immutable.Record({
//     id: 0,
//     text: '',
//     isWatson: true,
//     hasVisual: false
// });

export class ChatItem {

    public id: number;
    public text: string;
    public isWatson: boolean;
    public hasVisual: boolean;

    constructor(newText: string, newIsWatson: boolean ) {
        this.id = Math.random();
        this.text = newText;
        this.isWatson = newIsWatson;
    }

}
