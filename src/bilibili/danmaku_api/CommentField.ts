/**
 * Created by MIC on 2015/12/29.
 */

import {IDanmakuCreatedObject} from "../../danmaku/scripted/dco/IDanmakuCreatedObject";
import {IGeneralCreateParams} from "./data_types/IGeneralCreateParams";
import {Stage} from "../../../lib/glantern/src/flash/display/Stage";
import {DisplayObjectContainer} from "../../../lib/glantern/src/flash/display/DisplayObjectContainer";
import {IDCExtraCreateParams} from "../../danmaku/scripted/dco/IDCExtraCreateParams";
import {DCOHelper} from "../../danmaku/scripted/dco/DCOHelper";
import {_util} from "../../../lib/glantern/src/_util/_util";
import {TextField} from "../../../lib/glantern/src/flash/text/TextField";

export class CommentField extends TextField implements IDanmakuCreatedObject {

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
