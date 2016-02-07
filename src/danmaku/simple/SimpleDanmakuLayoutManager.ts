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
                nextYPosition: 0
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
            var width = isStageSizeUsable ? stage.width : currentStates.bulletproof.view.width;
            var height = isStageSizeUsable ? stage.height : currentStates.bulletproof.view.height;
            if (danmaku.isYPositionSet) {
                if (danmaku.x < width - danmaku.textWidth && danmaku.y < state.nextYPosition) {
                    state.nextYPosition = danmaku.y;
                }
            } else {
                danmaku.y = state.nextYPosition;
                state.nextYPosition += danmaku.textHeight;
                if (state.nextYPosition > height) {
                    state.nextYPosition = 0;
                }
                danmaku.isYPositionSet = true;
            }
            // T-0: At position (STAGE_WIDTH, Y)
            // T-final: At position (-DANMAKU_WIDTH, Y)
            // Add 5 extra pixels to ensure the danmaku is entirely out of the stage when its life should end.
            var elapsedLifeRatio = (currentTime - danmaku.bornTime) / (danmaku.lifeTime * 1000);
            danmaku.x = width - elapsedLifeRatio * (width + danmaku.textWidth + 5);
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
