
import {List, Record} from 'immutable';

const ChatRecord = Record({
    id: 0,
    text: '',
    isWatson: true,
    hasVisual: false
});

export class ChatItem extends ChatRecord {

    public id: number;
    public text: string;
    public isWatson: boolean;
    public hasVisual: boolean;

    constructor(props ) {
        super(props);
        this.id = Math.random();
    }

}
