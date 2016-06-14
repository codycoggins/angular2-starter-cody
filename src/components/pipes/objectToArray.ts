import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'objectToArray',
    pure: true
})

export class ObjectToArray implements PipeTransform {
    transform(input: Object): Object[] {
        console.log("=========ObjectToArray========")
        console.log(input)
        let newArray = []
        for (let key in input) {
            newArray.push(input[key]);
        }
        return newArray;
    }
}
