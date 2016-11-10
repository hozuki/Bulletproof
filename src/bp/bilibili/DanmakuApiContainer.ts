/**
 * Created by MIC on 2015/12/29.
 */

import DanmakuApiContract from "./DanmakuApiContract";
import Display from "./danmaku_api/Display";
import Functions from "./danmaku_api/Functions";
import Utils from "./danmaku_api/Utils";
import Bitmap from "./danmaku_api/Bitmap";
import Player from "./danmaku_api/Player";
import ScriptManager from "./danmaku_api/ScriptManager";
import Storage from "./danmaku_api/Storage";
import Tween from "./danmaku_api/Tween";
import ScriptedDanmakuProvider from "../danmaku/scripted/ScriptedDanmakuProvider";
import StaticDanmakuApiContract from "./StaticDanmakuApiContract";
import CommonUtil from "../../../lib/glantern/src/gl/mic/CommonUtil";
import ScriptedDanmaku from "../danmaku/scripted/ScriptedDanmaku";
import Engine from "../mic/Engine";
import Global from "./danmaku_api/Global";

const $staticContexts: Map<ScriptedDanmakuProvider, StaticDanmakuApiContract> = new Map<ScriptedDanmakuProvider, StaticDanmakuApiContract>();

export default class DanmakuApiContainer {

    constructor(danmaku: ScriptedDanmaku) {
        this._danmaku = danmaku;
        this.__initializeApi(danmaku.danmakuProvider);
    }

    private __initializeApi(provider: ScriptedDanmakuProvider) {
        var staticContract: StaticDanmakuApiContract = $getStaticContract(provider);
        var api: DanmakuApiContract = CommonUtil.simpleClone(staticContract);
        api.$ = api.Display = new Display(this);
        this._api = api;
    }

    get api(): DanmakuApiContract {
        return this._api;
    }

    get danmaku(): ScriptedDanmaku {
        return this._danmaku;
    }

    get engine(): Engine {
        return this.danmaku.engine;
    }

    private _danmaku: ScriptedDanmaku = null;
    private _api: DanmakuApiContract = null;

}

function $getStaticContract(provider: ScriptedDanmakuProvider): StaticDanmakuApiContract {
    if ($staticContexts.has(provider)) {
        return $staticContexts.get(provider);
    }
    var contract: StaticDanmakuApiContract = <any>Object.create(null);
    contract.$G = contract.Global = new Global();
    contract.Bitmap = new Bitmap();
    contract.ScriptManager = new ScriptManager(provider);
    contract.Storage = new Storage();
    contract.Tween = new Tween();
    contract.Utils = new Utils(contract);
    contract.Player = new Player(provider, contract);
    var f = new Functions(provider, contract);
    contract.trace = f.trace.bind(f);
    contract.clear = f.clear.bind(f);
    contract.getTimer = f.getTimer.bind(f);
    contract.timer = f.timer.bind(f);
    contract.interval = f.interval.bind(f);
    contract.foreach = f.foreach.bind(f);
    contract.clone = f.clone.bind(f);
    contract.load = f.load.bind(f);
    $staticContexts.set(provider, contract);
    return contract;
}
