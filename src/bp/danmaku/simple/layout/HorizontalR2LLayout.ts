/**
 * Created by MIC on 2016/7/2.
 */

import {HorizontalLayout} from "./HorizontalLayout";
import {SimpleDanmaku} from "../SimpleDanmaku";

export class HorizontalR2LLayout extends HorizontalLayout {

    protected _$getNewX(danmaku: SimpleDanmaku, stageWidth: number, lifeRatio: number): number {
        return stageWidth - lifeRatio * (stageWidth + danmaku.width + 5);
    }

    protected _$isDanmakuFullyOnStage(danmaku: SimpleDanmaku, stageWidth: number): boolean {
        return danmaku.x < stageWidth - danmaku.width;
    }

    protected _$getDefaultX(danmaku: SimpleDanmaku, stageWidth: number): number {
        return stageWidth;
    }

}
