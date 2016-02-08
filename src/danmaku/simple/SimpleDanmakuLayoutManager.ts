/**
 * Created by MIC on 2015/12/28.
 */

import {DanmakuLayoutManagerBase} from "../DanmakuLayoutManagerBase";
import {SimpleDanmakuProvider} from "./SimpleDanmakuProvider";
import {DanmakuKind} from "../DanmakuKind";
import {NotImplementedError} from "../../../lib/glantern/src/_util/NotImplementedError";
import {Point} from "../../../lib/glantern/src/flash/geom/Point";
import {IDanmaku} from "../IDanmaku";
import {SimpleDanmaku} from "./SimpleDanmaku";
import {_util} from "../../../lib/glantern/src/_util/_util";
import {StageResizedEventArgs} from "../StageResizedEventArgs";
import {SimpleDanmakuType} from "./SimpleDanamkuType";

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

        var currentTime = this.bulletproof.timeElapsed;
        var stage = this.bulletproof.stage;
        var displayList = this.danmakuProvider.displayingDanmakuList;
        var currentStates = {
            bulletproof: this.bulletproof,
            flying: {
                nextYPosition: 0,
                lowestYPosition: 0
            }
        };

        function isInPlayingRange(danmaku:SimpleDanmaku):boolean {
            return danmaku.bornTime <= currentTime && currentTime <= danmaku.bornTime + danmaku.lifeTime * 1000;
        }

        if (displayList.length > 0) {
            for (var i = 0; i < displayList.length; ++i) {
                var danmaku = displayList[i];
                if (isInPlayingRange(danmaku)) {
                    if (!danmaku.visible) {
                        danmaku.visible = true;
                    }
                    switch (danmaku.createParams.type) {
                        case SimpleDanmakuType.Flying:
                            handleFlying(danmaku);
                            break;
                        case SimpleDanmakuType.Top:
                            handleTop(danmaku);
                            break;
                        case SimpleDanmakuType.Bottom:
                            handleBottom(danmaku);
                            break;
                        case SimpleDanmakuType.TopLeft:
                            handleTopLeft(danmaku);
                            break;
                        case SimpleDanmakuType.TopRight:
                            handleTopRight(danmaku);
                            break;
                        case SimpleDanmakuType.BottomLeft:
                            handleBottomLeft(danmaku);
                            break;
                        case SimpleDanmakuType.BottomRight:
                            handleBottomRight(danmaku);
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

        function handleFlying(danmaku:SimpleDanmaku):void {
            var state = currentStates.flying;
            // FIXME: HACK!
            var isStageSizeUsable = false;
            var stageWidth = isStageSizeUsable ? stage.width : currentStates.bulletproof.view.width;
            var stageHeight = isStageSizeUsable ? stage.height : currentStates.bulletproof.view.height;
            // T-0: At position (STAGE_WIDTH, Y)
            // T-final: At position (-DANMAKU_WIDTH, Y)
            // Add 5 extra pixels to ensure the danmaku is entirely out of the stage when its life should end.
            var elapsedLifeRatio = (currentTime - danmaku.bornTime) / (danmaku.lifeTime * 1000);
            danmaku.x = stageWidth - elapsedLifeRatio * (stageWidth + danmaku.textWidth + 5);
            if (state.nextYPosition > stageHeight - danmaku.textHeight) {
                state.nextYPosition = 0;
            }
            if (danmaku.isYPositionSet) {
                if (danmaku.x < stageWidth - danmaku.textWidth) {
                    if (danmaku.y <= state.nextYPosition) {
                        state.nextYPosition = danmaku.y;
                    }
                } else {
                    if (danmaku.y <= state.nextYPosition) {
                        state.nextYPosition += danmaku.textHeight;
                    }
                }
            } else {
                if (state.lowestYPosition + danmaku.textHeight < stageHeight) {
                    // Fully use the Y space. For example, a 14-pt and a 10-pt danmakus are added to the screen at
                    // the same time, when there is a 12-pt available space, and the 10-pt danmaku should be placed
                    // at bottom and the 14-pt danmaku should be placed at top.
                    state.nextYPosition = state.lowestYPosition;
                }
                danmaku.y = state.nextYPosition;
                state.nextYPosition += danmaku.textHeight;
                danmaku.isYPositionSet = true;
            }
            if (state.lowestYPosition < danmaku.y + danmaku.textHeight) {
                state.lowestYPosition = danmaku.y + danmaku.textHeight;
            }
        }

        function handleTop(danmaku:SimpleDanmaku):void {

        }

        function handleBottom(danmaku:SimpleDanmaku):void {

        }

        function handleTopLeft(danmaku:SimpleDanmaku):void {

        }

        function handleTopRight(danmaku:SimpleDanmaku):void {

        }

        function handleBottomLeft(danmaku:SimpleDanmaku):void {

        }

        function handleBottomRight(danmaku:SimpleDanmaku):void {

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
