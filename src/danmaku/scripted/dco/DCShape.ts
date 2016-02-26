/**
 * Created by MIC on 2015/12/29.
 */

import {IDanmakuCreatedObject} from "./IDanmakuCreatedObject";
import {IGeneralCreateParams} from "../../../bilibili/danmaku_api/data_types/IGeneralCreateParams";
import {IDCExtraCreateParams} from "./IDCExtraCreateParams";
import {DCOHelper} from "./DCOHelper";
import {Shape} from "../../../../lib/glantern/src/flash/display/Shape";
import {Stage} from "../../../../lib/glantern/src/flash/display/Stage";
import {DisplayObjectContainer} from "../../../../lib/glantern/src/flash/display/DisplayObjectContainer";

export class DCShape extends Shape implements IDanmakuCreatedObject {

    constructor(root:Stage, parent:DisplayObjectContainer, createParams:IGeneralCreateParams, extraCreateParams:IDCExtraCreateParams) {
        super(root, parent);
        this._createParams = DCOHelper.fillInCreateParams(extraCreateParams.bulletproof, this, createParams);
        this._extraCreateParams = extraCreateParams;
        DCOHelper.applyGeneralCreateParams(this, this._createParams);
    }

    get createParams():IGeneralCreateParams {
        return this._createParams;
    }

    get extraCreateParams():IDCExtraCreateParams {
        return this._extraCreateParams;
    }

    get isCreatedByDanmaku():boolean {
        return true;
    }

    protected _extraCreateParams:IDCExtraCreateParams = null;
    protected _createParams:IGeneralCreateParams = null;

}
