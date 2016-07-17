/**
 * Created by MIC on 2015/12/28.
 */

import {DanmakuLayoutManagerBase} from "../DanmakuLayoutManagerBase";
import {SimpleDanmakuProvider} from "./SimpleDanmakuProvider";
import {DanmakuKind} from "../DanmakuKind";
import {SimpleDanmaku} from "./SimpleDanmaku";
import {StageResizedEventArgs} from "../../bulletproof/events/StageResizedEventArgs";
import {SimpleDanmakuType} from "./SimpleDanamkuType";
import {IBatchMeasureParams} from "./IBatchMeasureParams";
import {ArgumentError} from "../../../../lib/glantern/src/gl/flash/errors/ArgumentError";
import {TimeInfoEx} from "../../bulletproof/TimeInfoEx";
import {SimpleLayoutBase} from "./layout/SimpleLayoutBase";
import {HorizontalR2LLayout} from "./layout/HorizontalR2LLayout";
import {HorizontalL2RLayout} from "./layout/HorizontalL2RLayout";

export class SimpleDanmakuLayoutManager extends DanmakuLayoutManagerBase {

    constructor(provider:SimpleDanmakuProvider) {
        super(provider);
        var layouts:SimpleLayoutBase[] = [];
        for (var i = 0; i <= SimpleDanmakuType.Max; ++i) {
            layouts.push(null);
        }
        this._layouts = layouts;
    }

    initialize():void {
        super.initialize();
        var layouts = this._layouts;
        layouts[SimpleDanmakuType.R2L] = new HorizontalR2LLayout();
        layouts[SimpleDanmakuType.L2R] = new HorizontalL2RLayout();
    }

    dispose():void {
        var layouts = this._layouts;
        while (layouts.length > 0) {
            layouts.pop();
        }
        this._layouts = null;
        super.dispose();
    }

    performLayout(timeInfo:TimeInfoEx):void {
        // Please notice that coordinates in this method are in <canvas> coordinate system, the same as Flash & GDI
        // coordinate system (origin at top-left).

        var measureParams = this.__getMeasureParams(timeInfo.millisOfVideo);
        var displayingList = measureParams.displayingList;
        if (displayingList.length > 0) {
            for (var i = 0; i < displayingList.length; ++i) {
                var danmaku = displayingList[i];
                if (isInPlayingRange(danmaku, measureParams)) {
                    if (!danmaku.visible) {
                        danmaku.visible = true;
                    }
                    var layout = this.getLayout(danmaku.createParams.type);
                    if (layout !== null) {
                        layout.positionX(danmaku, measureParams);
                        layout.positionY(danmaku, measureParams);
                    } else {
                        throw new ArgumentError(`Unknown danmaku type: ${danmaku.createParams.type}`);
                    }
                } else {
                    // Don't draw danmakus which should not appear now.
                    danmaku.visible = false;
                }
            }
        }
    }

    addDanmaku(danmaku:SimpleDanmaku):void {
        var layout = this.getLayout(danmaku.createParams.type);
        if (layout !== null) {
            layout.add(danmaku);
        }
    }

    removeDanmaku(danmaku:SimpleDanmaku):void {
        var layout = this.getLayout(danmaku.createParams.type);
        if (layout !== null) {
            layout.remove(danmaku);
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

    getLayout(type:SimpleDanmakuType):SimpleLayoutBase {
        if (0 <= type && type < this._layouts.length) {
            return this._layouts[type];
        } else {
            return null;
        }
    }

    private __getMeasureParams(currenTime:number):IBatchMeasureParams {
        var stage = this.engine.stage;
        return {
            currentTime: currenTime,
            stage: stage,
            displayingList: this.danmakuProvider.displayingDanmakuList,
            stageWidth: stage.width,
            stageHeight: stage.height
        };
    }

    protected _danmakuProvider:SimpleDanmakuProvider;
    private _stageWidth:number = 0;
    private _stageHeight:number = 0;
    private _layouts:SimpleLayoutBase[] = null;

}

function isInPlayingRange(danmaku:SimpleDanmaku, measureParams:IBatchMeasureParams):boolean {
    return danmaku.bornTime <= measureParams.currentTime && measureParams.currentTime <= danmaku.bornTime + danmaku.lifeTime * 1000;
}
