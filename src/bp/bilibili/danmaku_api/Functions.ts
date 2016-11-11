/**
 * Created by MIC on 2016/1/7.
 */

import FiniteTimer from "../../danmaku/scripted/dco/FiniteTimer";
import NotImplementedError from "../../../../lib/glantern/src/gl/flash/errors/NotImplementedError";
import CommonUtil from "../../../../lib/glantern/src/gl/mic/CommonUtil";
import Engine from "../../mic/Engine";
import VirtualDom from "../../../../lib/glantern/src/gl/mic/VirtualDom";

export function trace(message: any): void {
    console.debug(message);
}

export function clear(): void {
    throw new NotImplementedError();
}

// Well, I lost all descriptions for this function. This is my best guess.
export function getTimer(): number {
    return Engine.instance.elapsedMillis;
}

export function timer(source: string, delay: number): number;
export function timer(closure: Function, delay: number): number;
export function timer(obj: any, delay: number): number {
    return <number>VirtualDom.setTimeout(obj, delay);
}

export function interval(source: string, delay: number, times?: number): FiniteTimer;
export function interval(closure: Function, delay: number, times?: number): FiniteTimer;
export function interval(obj: any, delay: number, times: number = 1): FiniteTimer {
    // var timer = new FiniteTimer(obj, delay, times);
    // BiliApiContract.ScriptManager.addTimer(timer);
    // return timer;
    var fn = typeof obj === "string" ? Function(obj) : obj;
    var $counter = 0;
    var handle = setInterval(() => {
        ++$counter;
        fn();
        if (times > 0 && $counter >= times) {
            VirtualDom.clearInterval(handle);
        }
    }, <any>delay);
    // hack
    return <any>handle;
}

export function foreach(loop: any, f: (key: string, value: any) => void): void {
    if (!CommonUtil.ptr(loop)) {
        return;
    }
    for (var key in loop) {
        if (loop.hasOwnProperty(key)) {
            f(key, loop[key]);
        }
    }
}

export function clone(object: any): any {
    return CommonUtil.deepClone(object);
}

export function load(libraryName: string, onComplete: () => void): void {
    var availableLibraries: string[] = [
        "libBitmap",
        "libStorage"
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
    throw new NotImplementedError();
}
