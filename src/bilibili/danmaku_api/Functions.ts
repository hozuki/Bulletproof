/**
 * Created by MIC on 2016/1/7.
 */

import {BiliBiliDanmakuApiContainer} from "../BiliBiliDanmakuApiContainer";
import {BiliBiliDamakuApiObject} from "./BiliBiliDamakuApiObject";
import {NotImplementedError} from "../../../lib/glantern/src/_util/NotImplementedError";
import {FiniteTimer} from "../../danmaku/scripted/dco/FiniteTimer";
import {_util} from "../../../lib/glantern/src/_util/_util";

export class Functions extends BiliBiliDamakuApiObject {

    constructor(apiContainer:BiliBiliDanmakuApiContainer) {
        super(apiContainer);
    }

    trace(message:any):void {
        console.debug(message);
    }

    clear():void {
        throw new NotImplementedError();
    }

    getTimer():number {
        return this.apiContainer.bulletproof.timeElapsed;
    }

    timer(source:string, delay:number):number;
    timer(closure:Function, delay:number):number;

    timer(obj:any, delay:number):number {
        return this.apiContainer.api.Utils.delay(obj, delay);
    }

    interval(source:string, delay:number, times?:number):FiniteTimer;
    interval(closure:Function, delay:number, times?:number):FiniteTimer;

    interval(obj:any, delay:number, times:number = 1):FiniteTimer {
        return this.apiContainer.api.Utils.interval(obj, delay, times);
    }

    foreach(loop:any, f:(key:string, value:any) => void):void {
        if (!_util.isUndefinedOrNull(loop)) {
            for (var key in loop) {
                if (loop.hasOwnProperty(key)) {
                    f(key, loop[key]);
                }
            }
        }
    }

    clone(object:any):any {
        return _util.deepClone(object);
    }

    load(libraryName:string, onComplete:() => void):void {
        var availableLibraries:string[] = [
            'libBitmap',
            'libStorage'
        ];
        var index = availableLibraries.indexOf(libraryName);
        if (index >= 0) {
            switch (index) {
                case 0:
                    break;
                case 1:
                    break;
                default:
                    break;
            }
        }
    }

}
