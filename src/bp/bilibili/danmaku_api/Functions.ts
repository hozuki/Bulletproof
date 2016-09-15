/**
 * Created by MIC on 2016/1/7.
 */

import {StaticDanmakuApiObject} from "../internal/StaticDanmakuApiObject";
import {FiniteTimer} from "../../danmaku/scripted/dco/FiniteTimer";
import {NotImplementedError} from "../../../../lib/glantern/src/gl/flash/errors/NotImplementedError";
import {CommonUtil} from "../../../../lib/glantern/src/gl/mic/CommonUtil";
import {StaticDanmakuApiContract} from "../StaticDanmakuApiContract";
import {ScriptedDanmakuProvider} from "../../danmaku/scripted/ScriptedDanmakuProvider";

export class Functions extends StaticDanmakuApiObject {

    constructor(provider: ScriptedDanmakuProvider, contract: StaticDanmakuApiContract) {
        super();
        this._provider = provider;
        this._contract = contract;
    }

    trace(message: any): void {
        console.debug(message);
    }

    clear(): void {
        throw new NotImplementedError();
    }

    // Well, I lost all descriptions for this function. This is my best guess.
    getTimer(): number {
        return this.$$danmakuProvider.engine.elapsedMillis;
    }

    timer(source: string, delay: number): number;
    timer(closure: Function, delay: number): number;
    timer(obj: any, delay: number): number {
        return this.$$contract.Utils.delay(obj, delay);
    }

    interval(source: string, delay: number, times?: number): FiniteTimer;
    interval(closure: Function, delay: number, times?: number): FiniteTimer;
    interval(obj: any, delay: number, times: number = 1): FiniteTimer {
        return this.$$contract.Utils.interval(obj, delay, times);
    }

    foreach(loop: any, f: (key: string, value: any) => void): void {
        if (CommonUtil.ptr(loop)) {
            for (var key in loop) {
                if (loop.hasOwnProperty(key)) {
                    f(key, loop[key]);
                }
            }
        }
    }

    clone(object: any): any {
        return CommonUtil.deepClone(object);
    }

    load(libraryName: string, onComplete: () => void): void {
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

    // Bulletproof
    private get $$contract(): StaticDanmakuApiContract {
        return this._contract;
    }

    private get $$danmakuProvider(): ScriptedDanmakuProvider {
        return this._provider;
    }

    private _provider: ScriptedDanmakuProvider = null;
    private _contract: StaticDanmakuApiContract = null;

}
