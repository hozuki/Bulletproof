/**
 * Created by MIC on 2016-11-10.
 */

import Button from "../../../fl/controls/Button";
import IDanmakuCreatedObject from "./IDanmakuCreatedObject";
import Stage from "../../../../../lib/glantern/src/gl/flash/display/Stage";
import DisplayObjectContainer from "../../../../../lib/glantern/src/gl/flash/display/DisplayObjectContainer";
import IDCExtraCreateParams from "./IDCExtraCreateParams";
import DCOHelper from "./DCOHelper";
import ICommentButtonCreateParams from "../../../bilibili/danmaku_api/data_types/ICommentButtonCreateParams";

export default class DCButton extends Button implements IDanmakuCreatedObject {

    constructor(root: Stage, parent: DisplayObjectContainer, createParams: ICommentButtonCreateParams, extraCreateParams: IDCExtraCreateParams) {
        super(root, parent);
        this._createParams = DCOHelper.fillInCreateParams(extraCreateParams.engine, this, createParams);
        this._extraCreateParams = extraCreateParams;
        DCOHelper.applyGeneralCreateParams(this, this._createParams);
    }

    get createParams(): ICommentButtonCreateParams {
        return this._createParams;
    }

    get extraCreateParams(): IDCExtraCreateParams {
        return this._extraCreateParams;
    }

    get isCreatedByDanmaku(): boolean {
        return true;
    }

    protected _extraCreateParams: IDCExtraCreateParams = null;
    protected _createParams: ICommentButtonCreateParams = null;

}
