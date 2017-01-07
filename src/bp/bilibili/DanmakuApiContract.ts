/**
 * Created by MIC on 2015/12/29.
 */

import Tween from "./danmaku_api/Tween";
import FiniteTimer from "../danmaku/scripted/dco/FiniteTimer";
import IDisplay from "./danmaku_api/IDisplay";
import IBitmap from "./danmaku_api/IBitmap";
import IGlobal from "./danmaku_api/IGlobal";
import IScriptManager from "./danmaku_api/IScriptManager";
import IStorage from "./danmaku_api/IStorage";
import IUtils from "./danmaku_api/IUtils";
import IPlayer from "./danmaku_api/IPlayer";

interface DanmakuApiContract {

    $: IDisplay;
    Display: IDisplay;
    $G: IGlobal;
    Global: IGlobal;
    Utils: IUtils;
    ScriptManager: IScriptManager;
    Tween: Tween;
    Bitmap: IBitmap;
    Storage: IStorage;
    Player: IPlayer;

    trace: (message: any) => void;
    clear: () => void;
    getTimer: () => number;
    timer: (obj: any, delay: number) => number;
    interval: (obj: any, delay: number, times?: number) => FiniteTimer;
    foreach: (loop: any, f: (key: string, value: any) => void) => void;
    clone: (object: any) => any;
    load: (libraryName: string, onComplete: () => void) => void;

}

export default DanmakuApiContract;
