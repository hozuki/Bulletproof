/**
 * Created by MIC on 2016/2/2.
 */

import {SimpleDanmakuType} from "./SimpleDanamkuType";

export interface ISimpleDanmakuCreateParams {

    /**
     * Manual override for {@link SimpleDanmaku.bornTime}.
     * If the value is specified with a number, its value is used by {@link SimpleDanmaku.bornTime}. Otherwise,
     * {@link SimpleDanmaku.bornTime} is automatically set to {@link Engine.videoMillis}.
     */
    bornTime?: number;
    fontName?: string;
    fontStyle?: string;
    fontSize?: number;
    type?: SimpleDanmakuType;
    border?: boolean;
    borderColor?: number;
    borderThickness?: number;
    background?: boolean;
    backgroundColor?: number;
    textColor?: number;
    outline?: boolean;
    outlineColor?: number;
    outlineThickness?: number;

}
