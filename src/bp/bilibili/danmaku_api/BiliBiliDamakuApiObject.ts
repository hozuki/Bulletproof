/**
 * Created by MIC on 2015/12/29.
 */

import {BiliBiliDanmakuApiContainer} from "../BiliBiliDanmakuApiContainer";
import {IDCExtraCreateParams} from "../../danmaku/scripted/dco/IDCExtraCreateParams";

export abstract class BiliBiliDamakuApiObject {

    constructor(apiContainer: BiliBiliDanmakuApiContainer) {
        this._apiContainer = apiContainer;
    }

    get apiContainer(): BiliBiliDanmakuApiContainer {
        return this._apiContainer;
    }

    protected _$getExtraCreateParams(): IDCExtraCreateParams {
        var api = this.apiContainer;
        var r: IDCExtraCreateParams = <any>Object.create(null);
        r.engine = api.engine;
        r.bornTime = r.engine.videoMillis;
        r.creator = api.danmaku;
        return r;
    }

    protected _apiContainer: BiliBiliDanmakuApiContainer = null;

}
