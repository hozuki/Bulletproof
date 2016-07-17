/**
 * Created by MIC on 2016/6/13.
 */

import {Stage} from "../../../../lib/glantern/src/gl/flash/display/Stage";
import {SimpleDanmaku} from "./SimpleDanmaku";

export interface IBatchMeasureParams {
    currentTime:number;
    stage:Stage;
    displayingList:SimpleDanmaku[];
    stageWidth:number;
    stageHeight:number;
}
