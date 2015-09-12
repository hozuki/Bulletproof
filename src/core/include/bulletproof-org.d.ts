/**
 * Created by MIC on 2015/9/12.
 */

export declare module bulletproof {

    export class NotImplementedError implements Error {
        constructor(message?:string);

        name:string;
        message:string;
    }

    export class ArgumentError implements Error {
        public constructor(message?:string, argumentName?:string);

        name:string;
        message:string;
        argumentName:string;
    }

    export interface ICloneable<T> {
        clone():T;
    }

    export interface ICopyable<T> {
        copyFrom(source:T):void;
    }

    export class EventClass implements Event {
        timeStamp:number;
        defaultPrevented:boolean;
        isTrusted:boolean;
        currentTarget:EventTarget;
        cancelBubble:boolean;
        target:EventTarget;
        eventPhase:number;
        cancelable:boolean;
        type:string;
        srcElement:Element;
        bubbles:boolean;
        CAPTURING_PHASE:number;
        AT_TARGET:number;
        BUBBLING_PHASE:number;
        returnValue:boolean;

        constructor(type:string, bubbles?:boolean, cancelable?:boolean);

        initEvent(eventTypeArg:string, canBubbleArg:boolean, cancelableArg:boolean):void;

        stopPropagation():void;

        stopImmediatePropagation();

        preventDefault():void;
    }

}
