/**
 * Created by MIC on 2016/7/2.
 */

import {IBatchMeasureParams} from "../IBatchMeasureParams";
import {SimpleDanmaku} from "../SimpleDanmaku";

export abstract class SimpleLayoutBase {

    abstract positionX(danmaku: SimpleDanmaku, measureParams: IBatchMeasureParams): void;

    abstract positionY(danmaku: SimpleDanmaku, measureParams: IBatchMeasureParams): void;

    abstract add(danmaku: SimpleDanmaku): void;

    abstract remove(danmaku: SimpleDanmaku): void;

}
