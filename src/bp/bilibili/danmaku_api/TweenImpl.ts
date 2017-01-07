/**
 * Created by MIC on 2016/1/7.
 */


import ITween from "./ITween";
import Tween from "../../../../lib/glantern/src/gl/fl/transitions/Tween";
import NotImplementedError from "../../../../lib/glantern/src/gl/flash/errors/NotImplementedError";

export default class TweenImpl extends Tween implements ITween {

    constructor(obj: Object, prop: string, func: Function, begin: number, finish: number, duration: number, useSeconds: boolean = false) {
        super(obj, prop, func, begin, finish, duration, useSeconds);
    }

    stopOnComplete: boolean = true;

    play(): void {
        throw new NotImplementedError();
    }

    stop(): void {
        throw new NotImplementedError();
    }

    gotoAndPlay(time: number): void {
        throw new NotImplementedError();
    }

    gotoAndStop(time: number): void {
        throw new NotImplementedError();
    }

    togglePause(): void {
        throw new NotImplementedError();
    }

}
