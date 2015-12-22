/**
 * Created by MIC on 2015/8/29.
 */

import bulletproof_org = require("./bulletproof-org");
import bulletproof_flash_base = require("./bulletproof-flash-base");

export module bulletproof.fl {

    import NotImplementedError = bulletproof_org.bulletproof.NotImplementedError;
    import ICloneable = bulletproof_org.bulletproof.ICloneable;
    import flash = bulletproof_flash_base.bulletproof.flash;

    export module transitions {

        export class Tween extends flash.events.EventDispatcher {

            public begin:number = NaN;
            public duration:number;
            public finish:number;
            public FPS:number;
            public func:Function;
            public isPlaying:boolean = false;
            public looping:boolean = false;
            public obj:Object = null;
            public position:number;
            public prop:string;
            public time:number;
            public useSeconds:boolean = false;

            public constructor(obj:Object, prop:string, func:Function, begin:number, finish:number, duration:number, useSeconds:boolean = false) {
                super();
                this.obj = obj;
                this.prop = prop;
                this.func = func;
                this.begin = begin;
                this.finish = finish;
                this.duration = duration;
                this.useSeconds = useSeconds;
            }

            public continueTo(finish:number, duration:number):void {
                throw new NotImplementedError();
            }

            public fforward():void {
                throw new NotImplementedError();
            }

            public nextFrame():void {
                throw new NotImplementedError();
            }

            public prevFrame():void {
                throw new NotImplementedError();
            }

            public resume():void {
                throw new NotImplementedError();
            }

            public rewind(t:number = 0):void {
                throw new NotImplementedError();
            }

            public start():void {
                throw new NotImplementedError();
            }

            public stop():void {
                throw new NotImplementedError();
            }

            public yoyo():void {
                throw new NotImplementedError();
            }

        }

        export class TweenEvent extends flash.events.FlashEvent implements ICloneable<TweenEvent> {

            private _position:number = NaN;
            private _time:number = NaN;

            public constructor(type:string, time:number, position:number, bubbles:boolean = false, cancelable:boolean = false) {
                super(type, bubbles, cancelable);
                this._position = position;
                this._time = time;
            }

            public clone():TweenEvent {
                throw new NotImplementedError();
            }

            public static get MOTION_CHANGE():string {
                return 'motionChange';
            }

            public static get MOTION_FINISH():string {
                return 'motionFinish';
            }

            public static get MOTION_LOOP():string {
                return 'motionLoop';
            }

            public static get MOTION_RESUME():string {
                return 'motionResume';
            }

            public static get MOTION_START():string {
                return 'motionStart';
            }

            public static get MOTION_STOP():string {
                return 'motionStop';
            }

        }

        // http://www.zhangxinxu.com/GitHub/Tween/tween.js
        export module easing {

            export class Back {

                public static easeIn(t:number, b:number, c:number, d:number, s:number = 0):number {
                    //if (typeof s == "undefined") s = 1.70158;
                    return c * (t /= d) * t * ((s + 1) * t - s) + b;
                }

                public static easeInOut(t:number, b:number, c:number, d:number, s:number = 0):number {
                    //if (typeof s == "undefined") s = 1.70158;
                    if ((t /= d / 2) < 1) {
                        return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                    } else {
                        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
                    }
                }

                public static easeOut(t:number, b:number, c:number, d:number, s:number = 0):number {
                    //if (typeof s == "undefined") s = 1.70158;
                    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
                }

            }

            export class Bounce {

                public static easeIn(t:number, b:number, c:number, d:number):number {
                    return c - Bounce.easeOut(d - t, 0, c, d) + b;
                }

                public static easeInOut(t:number, b:number, c:number, d:number):number {
                    if (t < d / 2) {
                        return Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
                    } else {
                        return Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
                    }
                }

                public static easeOut(t:number, b:number, c:number, d:number):number {
                    if ((t /= d) < (1 / 2.75)) {
                        return c * (7.5625 * t * t) + b;
                    } else if (t < (2 / 2.75)) {
                        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                    } else if (t < (2.5 / 2.75)) {
                        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                    } else {
                        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                    }
                }

            }

            export class Elastic {

                public static easeIn(t:number, b:number, c:number, d:number, a:number = 0, p:number = 0):number {
                    var s;
                    if (t == 0) return b;
                    if ((t /= d) == 1) return b + c;
                    //if (typeof p == "undefined") p = d * .3;
                    if (!a || a < Math.abs(c)) {
                        s = p / 4;
                        a = c;
                    } else {
                        s = p / (2 * Math.PI) * Math.asin(c / a);
                    }
                    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                }

                public static easeInOut(t:number, b:number, c:number, d:number, a:number = 0, p:number = 0):number {
                    var s;
                    if (t == 0) return b;
                    if ((t /= d / 2) == 2) return b + c;
                    //if (typeof p == "undefined") p = d * (.3 * 1.5);
                    if (!a || a < Math.abs(c)) {
                        a = c;
                        s = p / 4;
                    } else {
                        s = p / (2 * Math.PI) * Math.asin(c / a);
                    }
                    if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1 )) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
                }

                public static easeOut(t:number, b:number, c:number, d:number, a:number = 0, p:number = 0):number {
                    var s;
                    if (t == 0) return b;
                    if ((t /= d) == 1) return b + c;
                    //if (typeof p == "undefined") p = d * .3;
                    if (!a || a < Math.abs(c)) {
                        a = c;
                        s = p / 4;
                    } else {
                        s = p / (2 * Math.PI) * Math.asin(c / a);
                    }
                    return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
                }

            }

            export class None {

                public static easeIn(t:number, b:number, c:number, d:number):number {
                    return c * t / d + b;
                }

                public static easeInOut(t:number, b:number, c:number, d:number):number {
                    return c * t / d + b;
                }

                public static easeNone(t:number, b:number, c:number, d:number):number {
                    return t < d ? b : b + c;
                }

                public static easeOut(t:number, b:number, c:number, d:number):number {
                    return c * t / d + b;
                }

            }

            export class Regular {

                public static easeIn(t:number, b:number, c:number, d:number):number {
                    throw new NotImplementedError();
                }

                public static easeInOut(t:number, b:number, c:number, d:number):number {
                    throw new NotImplementedError();
                }

                public static easeOut(t:number, b:number, c:number, d:number):number {
                    throw new NotImplementedError();
                }

            }

            export class Strong {

                public static easeIn(t:number, b:number, c:number, d:number):number {
                    throw new NotImplementedError();
                }

                public static easeInOut(t:number, b:number, c:number, d:number):number {
                    throw new NotImplementedError();
                }

                public static easeOut(t:number, b:number, c:number, d:number):number {
                    throw new NotImplementedError();
                }

            }

            // Bulletproof

            export class Quadratic {

                public static easeIn(t:number, b:number, c:number, d:number):number {
                    return c * (t /= d) * t + b;
                }

                public static easeInOut(t:number, b:number, c:number, d:number):number {
                    if ((t /= d / 2) < 1) {
                        return c / 2 * t * t + b;
                    } else {
                        return -c / 2 * ((--t) * (t - 2) - 1) + b;
                    }
                }

                public static easeOut(t:number, b:number, c:number, d:number):number {
                    return -c * (t /= d) * (t - 2) + b;
                }

            }

            export class Cubic {

                public static easeIn(t:number, b:number, c:number, d:number):number {
                    return c * (t /= d) * t * t + b;
                }

                public static easeInOut(t:number, b:number, c:number, d:number):number {
                    if ((t /= d / 2) < 1) {
                        return c / 2 * t * t * t + b;
                    } else {
                        return c / 2 * ((t -= 2) * t * t + 2) + b;
                    }
                }

                public static easeOut(t:number, b:number, c:number, d:number):number {
                    return c * ((t = t / d - 1) * t * t + 1) + b;
                }

            }

            export class Quartic {

                public static easeIn(t:number, b:number, c:number, d:number):number {
                    return c * (t /= d) * t * t * t + b;
                }

                public static easeInOut(t:number, b:number, c:number, d:number):number {
                    if ((t /= d / 2) < 1) {
                        return c / 2 * t * t * t * t + b;
                    } else {
                        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
                    }
                }

                public static easeOut(t:number, b:number, c:number, d:number):number {
                    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
                }

            }

            export class Quintic {

                public static easeIn(t:number, b:number, c:number, d:number):number {
                    return c * (t /= d) * t * t * t * t + b;
                }

                public static easeInOut(t:number, b:number, c:number, d:number):number {
                    if ((t /= d / 2) < 1) {
                        return c / 2 * t * t * t * t * t + b;
                    } else {
                        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
                    }
                }

                public static easeOut(t:number, b:number, c:number, d:number):number {
                    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
                }

            }

            export class Sine {

                public static easeIn(t:number, b:number, c:number, d:number):number {
                    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
                }

                public static easeInOut(t:number, b:number, c:number, d:number):number {
                    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
                }

                public static easeOut(t:number, b:number, c:number, d:number):number {
                    return c * Math.sin(t / d * (Math.PI / 2)) + b;
                }

            }

            export class Exponential {

                public static easeIn(t:number, b:number, c:number, d:number):number {
                    return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
                }

                public static easeInOut(t:number, b:number, c:number, d:number):number {
                    if (t == 0) return b;
                    if (t == d) return b + c;
                    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
                }

                public static easeOut(t:number, b:number, c:number, d:number):number {
                    return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
                }

            }

            export class Circular {

                public static easeIn(t:number, b:number, c:number, d:number):number {
                    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
                }

                public static easeInOut(t:number, b:number, c:number, d:number):number {
                    if ((t /= d / 2) < 1) {
                        return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                    } else {
                        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
                    }
                }

                public static easeOut(t:number, b:number, c:number, d:number):number {
                    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
                }

            }

        }

    }

}
