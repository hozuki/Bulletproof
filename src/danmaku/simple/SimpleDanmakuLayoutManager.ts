/**
 * Created by MIC on 2015/12/28.
 */

import {DanmakuLayoutManagerBase} from "../DanmakuLayoutManagerBase";
import {SimpleDanmakuProvider} from "./SimpleDanmakuProvider";
import {DanmakuKind} from "../DanmakuKind";
import {IDanmaku} from "../IDanmaku";
import {SimpleDanmaku} from "./SimpleDanmaku";
import {StageResizedEventArgs} from "../StageResizedEventArgs";
import {SimpleDanmakuType} from "./SimpleDanamkuType";
import {Stage} from "../../../lib/glantern/src/flash/display/Stage";
import {GLUtil} from "../../../lib/glantern/lib/glantern-utils/src/GLUtil";

interface IMeasureParams {
    currentTime:number;
    stage:Stage;
    displayingList:SimpleDanmaku[];
}

export class SimpleDanmakuLayoutManager extends DanmakuLayoutManagerBase {

    constructor(provider:SimpleDanmakuProvider) {
        super(provider);
        this._danmakuProvider = provider;
    }

    dispose():void {
    }

    performLayout():void {
        // Please notice that coordinates in this method are in <canvas> coordinate system, the same as Flash
        // coordinate system.

        var measureParams:IMeasureParams = {
            currentTime: this.bulletproof.timeElapsed,
            stage: this.bulletproof.stage,
            displayingList: this.danmakuProvider.displayingDanmakuList
        };

        function isInPlayingRange(danmaku:SimpleDanmaku):boolean {
            return danmaku.bornTime <= measureParams.currentTime && measureParams.currentTime <= danmaku.bornTime + danmaku.lifeTime * 1000;
        }

        var displayingList = measureParams.displayingList;
        if (displayingList.length > 0) {
            for (var i = 0; i < displayingList.length; ++i) {
                var danmaku = displayingList[i];
                if (isInPlayingRange(danmaku)) {
                    if (!danmaku.visible) {
                        danmaku.visible = true;
                    }
                    switch (danmaku.createParams.type) {
                        case SimpleDanmakuType.FlyingR2L:
                            positionFlying(danmaku, measureParams);
                            break;
                        case SimpleDanmakuType.AnchoredTop:
                            positionTop(danmaku, measureParams);
                            break;
                        case SimpleDanmakuType.AnchoredBottom:
                            positionBottom(danmaku, measureParams);
                            break;
                        case SimpleDanmakuType.AnchoredTopLeft:
                            positionTopLeft(danmaku, measureParams);
                            break;
                        case SimpleDanmakuType.AnchoredTopRight:
                            positionTopRight(danmaku, measureParams);
                            break;
                        case SimpleDanmakuType.AnchoredBottomLeft:
                            positionBottomLeft(danmaku, measureParams);
                            break;
                        case SimpleDanmakuType.AnchoredBottomRight:
                            positionBottomRight(danmaku, measureParams);
                            break;
                        default:
                            console.warn("What type is this?");
                            break;
                    }
                } else {
                    // Don't draw danmakus which should not appear now.
                    danmaku.visible = false;
                }
            }
        }
    }

    get danmakuProvider():SimpleDanmakuProvider {
        return this._danmakuProvider;
    }

    get danmakuKind():DanmakuKind {
        return DanmakuKind.Simple;
    }

    onStageResize(sender:any, e:StageResizedEventArgs):void {
        this._stageWidth = e.width;
        this._stageHeight = e.height;
    }

    protected _danmakuProvider:SimpleDanmakuProvider;
    private _stageWidth:number = 0;
    private _stageHeight:number = 0;

}

function positionFlying(danmaku:SimpleDanmaku, measureParams:IMeasureParams):void {
    var stageWidth = measureParams.stage.stageWidth;
    var stageHeight = measureParams.stage.stageHeight;
    // T_0: At position (STAGE_WIDTH, Y)
    // T_final: At position (-DANMAKU_WIDTH, Y)
    // Add 5 extra pixels to ensure the danmaku is entirely out of the stage when its life should end.
    var elapsedLifeRatio = (measureParams.currentTime - danmaku.bornTime) / (danmaku.lifeTime * 1000);
    danmaku.x = stageWidth - elapsedLifeRatio * (stageWidth + danmaku.textWidth + 5);
    var displayingList = measureParams.displayingList;
    if (!danmaku.ySet) {
        if (displayingList.length > 0) {
            var currentY = 0;
            var bottommostThereIs = 0;
            for (var i = 0; i < displayingList.length; ++i) {
                if (displayingList[i].isType(SimpleDanmakuType.FlyingR2L) && displayingList[i].ySet) {
                    // Bottom of current displaying danmaku which is being scanned
                    var currentDDBottom = displayingList[i].y + displayingList[i].textHeight;
                    // Estimated value of the bottom of the danmaku being positioned
                    var estimatedCDPBottom = currentY + danmaku.textHeight;
                    // The danmaku being scanned has (just) left the right edge of the stage.
                    if (displayingList[i].x < stageWidth - displayingList[i].textWidth) {
                        // The danmaku being scanned "embraces" the danmaku being positioned.
                        if (displayingList[i].y <= currentY && estimatedCDPBottom <= currentDDBottom) {
                            currentY = displayingList[i].y;
                        }
                    } else {
                        // The danmaku being scanned "crashes" with the danmaku being positioned.
                        if (displayingList[i].y <= estimatedCDPBottom || currentDDBottom <= currentY) {
                            currentY = currentDDBottom;
                        }
                    }
                    if (currentY > stageHeight - danmaku.textHeight) {
                        // Wrapping in a function is used for the optimizers to detect that variable 'i' is not
                        // modified in the whole array accessing procedure. Sure it can be expanded into normal
                        // form, but I think it will slightly affect performance.
                        currentY = handleOverflow(displayingList, i, SimpleDanmakuType.FlyingR2L);
                        if (currentY > stageHeight - danmaku.textHeight) {
                            currentY = 0;
                        }
                        break;
                    }
                    if (currentDDBottom > bottommostThereIs) {
                        bottommostThereIs = currentDDBottom;
                    }
                }
            }
            // If the space in the bottom is enough, we do not have to care about the complicated layout algorithm.
            if (bottommostThereIs <= stageHeight - danmaku.textHeight) {
                danmaku.y = bottommostThereIs;
            } else {
                danmaku.y = currentY;
            }
        } else {
            danmaku.y = 0;
        }
        danmaku.ySet = true;
    }
}

function handleOverflow(displayingList:SimpleDanmaku[], currentIndex:number, type:SimpleDanmakuType):number {
    // The stage is full of flying (now all types of) danmakus. Now follow the last positioned danmaku.
    // If overflow happens again, reset Y position to the top of the stage.
    // newY will definitely be assigned.
    var newY:number;
    do {
        if (displayingList[currentIndex].isType(type) && displayingList[currentIndex].ySet) {
            newY = displayingList[currentIndex].y + displayingList[currentIndex].textHeight;
        }
        ++currentIndex;
    } while (currentIndex < displayingList.length);
    return newY;
}

function positionTop(danmaku:SimpleDanmaku, measureParams:IMeasureParams):void {
    if (!danmaku.xSet) {
        danmaku.x = (measureParams.stage.stageWidth - danmaku.textWidth) / 2;
        danmaku.xSet = true;
    }
    var stageHeight = measureParams.stage.stageHeight;
    var displayingList = measureParams.displayingList;
    if (!danmaku.ySet) {
        var currentY = 0;
        if (displayingList.length > 0) {
            for (var i = 0; i < displayingList.length; ++i) {
                if (displayingList[i].isType(SimpleDanmakuType.AnchoredTop) && displayingList[i].ySet) {
                    var currentDDBottom = displayingList[i].y + displayingList[i].textHeight;
                    var estimatedCDPBottom = currentY + danmaku.textHeight;
                    // The displaying danmaku being measured "contains" the danmaku being positioned.
                    if (GLUtil.isValueBetweenEquals(estimatedCDPBottom, displayingList[i].y, currentDDBottom) ||
                        GLUtil.isValueBetweenEquals(currentY, displayingList[i].y, currentDDBottom)) {
                        currentY = currentDDBottom;
                    }
                    if (currentY > stageHeight - danmaku.textHeight) {
                        currentY = handleOverflow(displayingList, i, SimpleDanmakuType.AnchoredTop);
                        if (currentY > stageHeight - danmaku.textHeight) {
                            currentY = 0;
                        }
                        break;
                    }
                }
            }
        }
        danmaku.y = currentY;
        danmaku.ySet = true;
    }
}

function positionBottom(danmaku:SimpleDanmaku, measureParams:IMeasureParams):void {
}

function positionTopLeft(danmaku:SimpleDanmaku, measureParams:IMeasureParams):void {

}

function positionTopRight(danmaku:SimpleDanmaku, measureParams:IMeasureParams):void {

}

function positionBottomLeft(danmaku:SimpleDanmaku, measureParams:IMeasureParams):void {

}

function positionBottomRight(danmaku:SimpleDanmaku, measureParams:IMeasureParams):void {

}
