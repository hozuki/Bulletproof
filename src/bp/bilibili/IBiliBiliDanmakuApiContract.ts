/**
 * Created by MIC on 2015/12/29.
 */

import {Display} from "./danmaku_api/Display";
import {Global} from "./danmaku_api/Global";
import {Utils} from "./danmaku_api/Utils";
import {Player} from "./danmaku_api/Player";
import {ScriptManager} from "./danmaku_api/ScriptManager";
import {Tween} from "./danmaku_api/Tween";
import {Bitmap} from "./danmaku_api/Bitmap";
import {Storage} from "./danmaku_api/Storage";
import {FiniteTimer} from "../danmaku/scripted/dco/FiniteTimer";

export interface IBiliBiliDanmakuApiContract {

    $: Display;
    $G: Global;
    Display: Display;
    Global: Global;
    Utils: Utils;
    Player: Player;
    ScriptManager: ScriptManager;
    Tween: Tween;
    Bitmap: Bitmap;
    Storage: Storage;

    trace: (message: any) => void;
    clear: () => void;
    getTimer: () => number;
    timer: (obj: any, delay: number) => number;
    interval: (obj: any, delay: number, times?: number) => FiniteTimer;
    foreach: (loop: any, f: (key: string, value: any) => void) => void;
    clone: (object: any) => any;
    load: (libraryName: string, onComplete: () => void) => void;

}
