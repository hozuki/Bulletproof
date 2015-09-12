/**
 * Created by MIC on 2015/9/12.
 */

/// <reference path="bulletproof-org.d.ts"/>
/// <reference path="bulletproof-flash.d.ts"/>

import bulletproof_flash = require("bulletproof-flash.d");
import bulletproof_org = require("bulletproof-org.d");

export declare module bulletproof.fl {

    import flash = bulletproof_flash.bulletproof.flash;

    import ICloneable = bulletproof_org.bulletproof.ICloneable;

    export module transitions {

        export class Tween extends flash.events.EventDispatcher {
            constructor(obj:Object, prop:string, func:Function, begin:number, finish:number, duration:number, useSeconds?:boolean);

            begin:number;
            duration:number;
            finish:number;
            FPS:number;
            func:Function;
            isPlaying:boolean;
            looping:boolean;
            obj:Object;
            position:number;
            prop:string;
            time:number;
            useSeconds:boolean;

            continueTo(finish:number, duration:number):void;

            ffoward():void;

            nextFrame():void;

            prevFrame():void;

            resume():void;

            rewind(t?:number):void;

            start():void;

            stop():void;

            yoyo():void;
        }

        export class TweenEvent extends flash.events.FlashEvent implements ICloneable<TweenEvent> {
            constructor(type:string, time:number, position:number, bubbles?:boolean, cancelable?:boolean);

            clone():TweenEvent;

            static MOTION_CHANGE:string;
            static MOTION_FINISH:string;
            static MOTION_LOOP:string;
            static MOTION_RESUME:string;
            static MOTION_START:string;
            static MOTION_STOP:string;
        }

        export module easing {

            export class Back {
                static easeIn(t:number, b:number, c:number, d:number, s?:number):number;

                static easeInOut(t:number, b:number, c:number, d:number, s?:number):number;

                static easeOut(t:number, b:number, c:number, d:number, s?:number):number;
            }

            export class Bounce {
                static easeIn(t:number, b:number, c:number, d:number):number;

                static easeInOut(t:number, b:number, c:number, d:number):number;

                static easeOut(t:number, b:number, c:number, d:number):number;
            }

            export class Elastic {
                static easeIn(t:number, b:number, c:number, d:number, a?:number, p?:number):number;

                static easeInOut(t:number, b:number, c:number, d:number, a?:number, p?:number):number;

                static easeOut(t:number, b:number, c:number, d:number, a?:number, p?:number):number;
            }

            export class None {
                static easeIn(t:number, b:number, c:number, d:number):number;

                static easeInOut(t:number, b:number, c:number, d:number):number;

                static easeNone(t:number, b:number, c:number, d:number):number;

                static easeOut(t:number, b:number, c:number, d:number):number;
            }

            export class Regular {
                static easeIn(t:number, b:number, c:number, d:number):number;

                static easeInOut(t:number, b:number, c:number, d:number):number;

                static easeOut(t:number, b:number, c:number, d:number):number;
            }

            export class Strong {
                static easeIn(t:number, b:number, c:number, d:number):number;

                static easeInOut(t:number, b:number, c:number, d:number):number;

                static easeOut(t:number, b:number, c:number, d:number):number;
            }

            export class Quadratic {
                static easeIn(t:number, b:number, c:number, d:number):number;

                static easeInOut(t:number, b:number, c:number, d:number):number;

                static easeOut(t:number, b:number, c:number, d:number):number;
            }

            export class Cubic {
                static easeIn(t:number, b:number, c:number, d:number):number;

                static easeInOut(t:number, b:number, c:number, d:number):number;

                static easeOut(t:number, b:number, c:number, d:number):number;
            }

            export class Quartic {
                static easeIn(t:number, b:number, c:number, d:number):number;

                static easeInOut(t:number, b:number, c:number, d:number):number;

                static easeOut(t:number, b:number, c:number, d:number):number;
            }

            export class Quintic {
                static easeIn(t:number, b:number, c:number, d:number):number;

                static easeInOut(t:number, b:number, c:number, d:number):number;

                static easeOut(t:number, b:number, c:number, d:number):number;
            }

            export class Sine {
                static easeIn(t:number, b:number, c:number, d:number):number;

                static easeInOut(t:number, b:number, c:number, d:number):number;

                static easeOut(t:number, b:number, c:number, d:number):number;
            }

            export class Exponential {
                static easeIn(t:number, b:number, c:number, d:number):number;

                static easeInOut(t:number, b:number, c:number, d:number):number;

                static easeOut(t:number, b:number, c:number, d:number):number;
            }

            export class Circular {
                static easeIn(t:number, b:number, c:number, d:number):number;

                static easeInOut(t:number, b:number, c:number, d:number):number;

                static easeOut(t:number, b:number, c:number, d:number):number;
            }

        }

    }

}
