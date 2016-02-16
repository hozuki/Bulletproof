/**
 * Created by MIC on 2015/12/29.
 */

import {Bulletproof} from "../Bulletproof";
import {IBiliBiliDanmakuApiContract} from "./IBiliBiliDanmakuApiContract";
import {Display} from "./danmaku_api/Display";
import {Global} from "./danmaku_api/Global";
import {ScriptedDanmaku} from "../danmaku/scripted/ScriptedDanmaku";
import {Functions} from "./danmaku_api/Functions";
import {Utils} from "./danmaku_api/Utils";
import {Bitmap} from "./danmaku_api/Bitmap";
import {Player} from "./danmaku_api/Player";
import {ScriptManager} from "./danmaku_api/ScriptManager";
import {Storage} from "./danmaku_api/Storage";
import {Tween} from "./danmaku_api/Tween";

export class BiliBiliDanmakuApiContainer {

    constructor(codeDanmaku:ScriptedDanmaku) {
        this._codeDanmaku = codeDanmaku;
        this._bulletproof = codeDanmaku.layoutManager.danmakuProvider.danmakuCoordinator.bulletproof;
        this.__initializeApi();
    }

    get bulletproof():Bulletproof {
        return this._bulletproof;
    }

    private __initializeApi() {
        var api:IBiliBiliDanmakuApiContract = <any>Object.create(null);

        api.$ = api.Display = new Display(this);
        api.$G = api.Global = new Global(this);
        api.Bitmap = new Bitmap(this);
        api.Player = new Player(this);
        api.ScriptManager = new ScriptManager(this);
        api.Storage = new Storage(this);
        api.Tween = new Tween(this);
        api.Utils = new Utils(this);

        var f = new Functions(this);
        api.trace = f.trace.bind(f);
        api.clear = f.clear.bind(f);
        api.getTimer = f.getTimer.bind(f);
        api.timer = f.timer.bind(f);
        api.interval = f.interval.bind(f);
        api.foreach = f.foreach.bind(f);
        api.clone = f.clone.bind(f);
        api.load = f.load.bind(f);

        this._api = api;
    }

    get api():IBiliBiliDanmakuApiContract {
        return this._api;
    }

    get danmaku():ScriptedDanmaku {
        return this._codeDanmaku;
    }

    private _codeDanmaku:ScriptedDanmaku = null;
    private _bulletproof:Bulletproof = null;
    private _api:IBiliBiliDanmakuApiContract = null;

}
