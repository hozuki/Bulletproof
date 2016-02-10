/**
 * Created by MIC on 2015/12/29.
 */

import {BiliBiliDanmakuApiContainer} from "../BiliBiliDanmakuApiContainer";
import {IDCExtraCreateParams} from "../../danmaku/code/dco/IDCExtraCreateParams";

export abstract class BiliBiliDamakuApiObject {

    constructor(apiContainer:BiliBiliDanmakuApiContainer) {
        this._apiContainer = apiContainer;
    }

    get apiContainer():BiliBiliDanmakuApiContainer {
        return this._apiContainer;
    }

    protected __getExtraCreateParams():IDCExtraCreateParams {
        var r:IDCExtraCreateParams = <any>Object.create(null);
        r.bulletproof = this.apiContainer.bulletproof;
        r.bornTime = this.apiContainer.bulletproof.timeElapsed;
        r.creator = this.apiContainer.danmaku;
        return r;
    }

    protected _apiContainer:BiliBiliDanmakuApiContainer = null;

}
