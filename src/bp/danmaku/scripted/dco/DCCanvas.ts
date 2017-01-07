/**
 * Created by MIC on 2016-11-10.
 */

import Canvas from "../../../../../lib/glantern/src/gl/mx/containers/Canvas";
import IDanmakuCreatedObject from "./IDanmakuCreatedObject";
import Stage from "../../../../../lib/glantern/src/gl/flash/display/Stage";
import DCOHelper from "./DCOHelper";
import IGeneralCreateParams from "../../../bilibili/danmaku_api/data_types/IGeneralCreateParams";
import DisplayObjectContainer from "../../../../../lib/glantern/src/gl/flash/display/DisplayObjectContainer";
import Engine from "../../../mic/Engine";
import IDCExtraCreateParams from "./IDCExtraCreateParams";

export default class DCCanvas extends Canvas implements IDanmakuCreatedObject {

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
