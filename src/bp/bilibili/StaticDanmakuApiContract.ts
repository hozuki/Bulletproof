/**
 * Created by MIC on 2016/9/14.
 */

import {Global} from "./danmaku_api/Global";
import {Storage} from "./danmaku_api/Storage";
import {Utils} from "./danmaku_api/Utils";
import {ScriptManager} from "./danmaku_api/ScriptManager";
import {Tween} from "./danmaku_api/Tween";
import {Bitmap} from "./danmaku_api/Bitmap";
import {FiniteTimer} from "../danmaku/scripted/dco/FiniteTimer";
import {Player} from "./danmaku_api/Player";

export interface StaticDanmakuApiContract {

    $G: Global;
    Global: Global;
    Utils: Utils;
    ScriptManager: ScriptManager;
    Tween: Tween;
    Bitmap: Bitmap;
    Storage: Storage;
    Player: Player;

    trace: (message: any) => void;
    clear: () => void;
    getTimer: () => number;
    timer: (obj: any, delay: number) => number;
    interval: (obj: any, delay: number, times?: number) => FiniteTimer;
    foreach: (loop: any, f: (key: string, value: any) => void) => void;
    clone: (object: any) => any;
    load: (libraryName: string, onComplete: () => void) => void;

}
