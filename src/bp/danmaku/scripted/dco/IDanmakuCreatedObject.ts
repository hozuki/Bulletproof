/**
 * Created by MIC on 2015/12/29.
 */

import IGeneralCreateParams from "../../../bilibili/danmaku_api/data_types/IGeneralCreateParams";
import IDCExtraCreateParams from "./IDCExtraCreateParams";

interface IDanmakuCreatedObject {

    createParams: IGeneralCreateParams;
    extraCreateParams: IDCExtraCreateParams;
    isCreatedByDanmaku: boolean;

}

export default IDanmakuCreatedObject;
