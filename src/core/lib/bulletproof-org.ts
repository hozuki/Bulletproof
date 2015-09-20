/**
 * Created by MIC on 2015/8/28.
 */

export module bulletproof {

    export interface ICloneable<T> {
        clone():T;
    }

    export interface ICopyable<T> {
        copyFrom(source:T):void;
    }

    export class NotImplementedError implements Error {

        private _message:string;

        public constructor(message:string = 'Not implemented') {
            this._message = message;
        }

        public get name():string {
            return 'NotImplementedError';
        }

        public get message():string {
            return this._message;
        }

    }

    export class ArgumentError implements Error {

        private _message:string;
        private _argumentName:string;

        public constructor(message:string = 'Argument assertion failed', argumentName:string = null) {
            this._message = message;
            this._argumentName = argumentName;
        }

        public get name():string {
            return 'ArgumentError';
        }

        public get message():string {
            return this._message;
        }

        public get argumentName():string {
            return this._argumentName;
        }

    }

    export class EventClass implements Event, ICloneable<EventClass> {
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
        shouldReturnValue:boolean;

        public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false) {
            this.type = type;
            this.bubbles = bubbles;
            this.cancelable = cancelable;
            this.timeStamp = Date.now();
        }

        initEvent(eventTypeArg:string, canBubbleArg:boolean, cancelableArg:boolean):void {
        }

        stopPropagation():void {
        }

        stopImmediatePropagation():void {
        }

        preventDefault():void {
        }

        clone():EventClass {
            throw new NotImplementedError();
        }

    }

}
