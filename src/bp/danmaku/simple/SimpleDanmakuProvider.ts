/**
 * Created by MIC on 2016/8/23.
 */

import {DanmakuProviderBase} from "../DanmakuProviderBase";
import {SimpleDanmakuLayer} from "./SimpleDanmakuLayer";
import {SimpleDanmaku} from "./SimpleDanmaku";
import {SimpleDanmakuLayoutManager} from "./SimpleDanmakuLayoutManager";
import {TimeInfoEx} from "../../mic/TimeInfoEx";
import {ISimpleDanmakuCreateParams} from "./ISimpleDanmakuCreateParams";
import {CommonUtil} from "../../../../lib/glantern/src/gl/mic/CommonUtil";
import {SimpleDanmakuHelper} from "./SimpleDanmakuHelper";
import {DanmakuProviderFlag} from "../DanmakuProviderFlag";
import {NotImplementedError} from "../../../../lib/glantern/src/gl/flash/errors/NotImplementedError";
import {IDanmaku} from "../IDanmaku";
import {DanmakuController} from "../DanmakuController";
import {StageResizedEventArgs} from "../../mic/bulletproof/events/StageResizedEventArgs";

export class SimpleDanmakuProvider extends DanmakuProviderBase {

    constructor(controller: DanmakuController) {
        super(controller);
        this._layoutManager = new SimpleDanmakuLayoutManager(this);
    }

    initialize(): void {
        super.initialize();
        var stage = this.engine.stage;
        var danmakuLayer = new SimpleDanmakuLayer(stage, stage);
        this._layer = danmakuLayer;
        stage.addChild(danmakuLayer);
        this.layoutManager.onStageResize(this, new StageResizedEventArgs(stage.stageWidth, stage.stageHeight));
    }

    get flags(): DanmakuProviderFlag {
        return DanmakuProviderFlag.None;
    }

    get layer(): SimpleDanmakuLayer {
        return this._layer;
    }

    get layoutManager(): SimpleDanmakuLayoutManager {
        return this._layoutManager;
    }

    get displayingDanmakuList(): SimpleDanmaku[] {
        return this._displayingDanmakuList;
    }

    dispose(): void {
        throw new NotImplementedError();
    }

    addDanmaku(content: string, args?: ISimpleDanmakuCreateParams): IDanmaku {
        return super.addDanmaku(content, args);
    }

    removeDanmaku(danmaku: SimpleDanmaku): boolean {
        throw new NotImplementedError;
    }

    canCreateDanmaku(args?: any): boolean {
        throw new NotImplementedError();
    }

    updateDisplayingDanmakuList(timeInfo: TimeInfoEx): void {
        throw new NotImplementedError();
    }

    isDanmakuDead(timeInfo: TimeInfoEx, danmaku: SimpleDanmaku): boolean {
        var now = timeInfo.millisOfVideo;
        return now < danmaku.bornTime || danmaku.bornTime + danmaku.lifeTime * 1000 < now;
    }

    update(timeInfo: TimeInfoEx): void {
        if (this._shouldSortDanmakuList) {
            this.fullDanmakuList.sort((d1: SimpleDanmaku, d2: SimpleDanmaku): number => {
                return d1.bornTime - d2.bornTime;
            });
            this._shouldSortDanmakuList = false;
        }
        super.update(timeInfo);
    }

    protected _$addDanmaku(content: string, args?: ISimpleDanmakuCreateParams): SimpleDanmaku {
        var options = this.engine.options;
        if (CommonUtil.ptr(args)) {
            SimpleDanmakuHelper.fillInCreateParams(options, args);
        } else {
            args = SimpleDanmakuHelper.getDefaultParams(options);
        }
        var danmaku = new SimpleDanmaku(this.layoutManager, args);
        danmaku.initialize(content, this.engine.videoMillis);
        this.fullDanmakuList.push(danmaku);
        this._shouldSortDanmakuList = true;
        return danmaku;
    }

    protected _layer: SimpleDanmakuLayer;
    protected _displayingDanmakuList: SimpleDanmaku[];
    protected _layoutManager: SimpleDanmakuLayoutManager;
    private _shouldSortDanmakuList: boolean = false;

}
