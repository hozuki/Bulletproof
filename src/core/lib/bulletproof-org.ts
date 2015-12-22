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

    export interface IDisposable {
        dispose():void;
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
        returnValue:boolean;

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

    export class OMap<K,V> {

        public constructor() {
            this._o = Object.create(null);
            this._size = 0;
        }

        public get(key:K):V {
            return this._o[<any>key];
        }

        public set(key:K, value:V):void {
            if (!this.has(key)) {
                this._size++;
            }
            this._o[<any>key] = value;
        }

        public delete(key:K):boolean {
            var b:boolean = this.has(key);
            if (b) {
                delete this._o[<any>key];
                this._size--;
            }
            return b;
        }

        public has(key:K):boolean {
            return this._o[<any>key] !== void(0);
        }

        public forEach(fn:(value:V, key?:K, map?:OMap<K,V>)=>void):void {
            for (var k in this._o) {
                fn(this._o[k], k, this);
            }
        }

        public keys():Array<K> {
            return <any>Object.keys(this._o);
        }

        public get size():number {
            return this._size;
        }

        private _o:any;
        private _size:number;

    }

}
