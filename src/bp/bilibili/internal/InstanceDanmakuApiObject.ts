/**
 * Created by MIC on 2015/12/29.
 */

import {DanmakuApiContainer} from "../DanmakuApiContainer";
import {IDCExtraCreateParams} from "../../danmaku/scripted/dco/IDCExtraCreateParams";

export abstract class InstanceDanmakuApiObject {

    constructor(apiContainer: DanmakuApiContainer) {
        this._apiContainer = apiContainer;
    }

    get apiContainer(): DanmakuApiContainer {
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

    protected _apiContainer: DanmakuApiContainer = null;

}
