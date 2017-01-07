/**
 * Created by MIC on 2015/12/29.
 */

import IDanmakuCreatedObject from "../../danmaku/scripted/dco/IDanmakuCreatedObject";
import IGeneralCreateParams from "./data_types/IGeneralCreateParams";
import IDCExtraCreateParams from "../../danmaku/scripted/dco/IDCExtraCreateParams";
import DCOHelper from "../../danmaku/scripted/dco/DCOHelper";
import TextField from "../../../../lib/glantern/src/gl/flash/text/TextField";
import Stage from "../../../../lib/glantern/src/gl/flash/display/Stage";
import DisplayObjectContainer from "../../../../lib/glantern/src/gl/flash/display/DisplayObjectContainer";
import Engine from "../../mic/Engine";

export default class CommentField extends TextField implements IDanmakuCreatedObject {

    constructor(root: Stage, parent: DisplayObjectContainer, createParams: IGeneralCreateParams, extraCreateParams: IDCExtraCreateParams) {
        super(root, parent);
        this._createParams = DCOHelper.fillInCreateParams(Engine.instance, this, createParams);
        this._extraCreateParams = extraCreateParams;
        DCOHelper.applyGeneralCreateParams(this, this._createParams);
    }

    get createParams(): IGeneralCreateParams {
        return this._createParams;
    }

    get extraCreateParams(): IDCExtraCreateParams {
        return this._extraCreateParams;
    }

    get isCreatedByDanmaku(): boolean {
        return true;
    }

    protected _extraCreateParams: IDCExtraCreateParams = null;
    protected _createParams: IGeneralCreateParams = null;

}
