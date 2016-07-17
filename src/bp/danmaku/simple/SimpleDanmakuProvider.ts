/**
 * Created by MIC on 2015/12/28.
 */

import {DanmakuProviderBase} from "../DanmakuProviderBase";
import {DanmakuKind} from "../DanmakuKind";
import {SimpleDanmakuLayoutManager} from "./SimpleDanmakuLayoutManager";
import {DanmakuController} from "../DanmakuController";
import {SimpleDanmaku} from "./SimpleDanmaku";
import {DanmakuProviderFlag} from "../DanmakuProviderFlag";
import {SimpleDanmakuType} from "./SimpleDanamkuType";
import {ISimpleDanmakuCreateParams} from "./ISimpleDanmakuCreateParams";
import {SimpleDanmakuLayer} from "./SimpleDanmakuLayer";
import {SimpleDanmakuHelper} from "./SimpleDanmakuHelper";
import {StageResizedEventArgs} from "../../bulletproof/events/StageResizedEventArgs";
import {IDanmaku} from "../IDanmaku";
import {GlowFilter} from "../../../../lib/glantern/src/gl/flash/filters/GlowFilter";
import {GLUtil} from "../../../../lib/glantern/src/gl/glantern/GLUtil";
import {TimeInfoEx} from "../../bulletproof/TimeInfoEx";

/**
 * An implementation of {@link DanmakuProviderBase}, for managing code damakus.
 */
export class SimpleDanmakuProvider extends DanmakuProviderBase {

    constructor(controller:DanmakuController) {
        super(controller);
        this._layoutManager = new SimpleDanmakuLayoutManager(this);
        this._fullDanmakuList = [];
        var partialCounts:number[] = [], partialDisplayingCounts:number[] = [];
        for (var i = 0; i <= SimpleDanmakuType.Max; ++i) {
            partialCounts.push(0);
            partialDisplayingCounts.push(0);
        }
        this._partialDanmakuCounts = partialCounts;
        this._partialDisplayingDanmakuCounts = partialDisplayingCounts;
    }

    get danmakuKind():DanmakuKind {
        return DanmakuKind.Simple;
    }

    initialize():void {
        super.initialize();
        var stage = this.engine.stage;
        var danmakuLayer = new SimpleDanmakuLayer(stage, stage, this);
        this._layer = danmakuLayer;
        stage.addChild(this.layer);
        var glowFilter = new GlowFilter(this.engine.renderer.filterManager, 0x2f2f2f, 0.8, 3.0, 3.0);
        danmakuLayer.filters = [glowFilter];
        danmakuLayer.alpha = 0.75;
        this.layoutManager.onStageResize(this, new StageResizedEventArgs(stage.stageWidth, stage.stageHeight));
    }

    dispose():void {
        this.layer.parent.removeChild(this.layer);
        this.layer.dispose();
        this._layer = null;
        this._layoutManager.dispose();
        this._layoutManager = null;
        for (var i = 0; i < this.fullDanmakuList.length; ++i) {
            for (var i = 0; i < this.fullDanmakuList.length; ++i) {
                this.fullDanmakuList[i].dispose();
            }
        }
        while (this.fullDanmakuList.length > 0) {
            this.fullDanmakuList.pop();
        }
        while (this.displayingDanmakuList.length > 0) {
            this.displayingDanmakuList.pop();
        }
        this._fullDanmakuList = null;
        this._displayingDanmakuList = null;
    }

    canCreateDanmaku(args?:ISimpleDanmakuCreateParams):boolean {
        var config = this.engine.options;
        var type:SimpleDanmakuType = GLUtil.ptr(args) ? args.type : config.defaultSimpleDanmakuCreateParams.type;
        var count = this.partialDanmakuCounts[type];
        return GLUtil.isUndefined(count) ? false : count < config.simpleDanmakuPartCountThreshold;
    }

    addDanmaku(content:string, args?:ISimpleDanmakuCreateParams):IDanmaku {
        return super.addDanmaku(content, args);
    }

    removeDanmaku(danmaku:SimpleDanmaku):boolean {
        var index:number;
        var b = false;
        index = this.fullDanmakuList.indexOf(danmaku);
        if (index >= 0) {
            GLUtil.removeAt(this.fullDanmakuList, index);
            --this.partialDanmakuCounts[danmaku.createParams.type];
            b = true;
        }
        index = this.displayingDanmakuList.indexOf(danmaku);
        if (index >= 0) {
            GLUtil.removeAt(this.displayingDanmakuList, index);
            --this.partialDisplayingDanmakuCounts[danmaku.createParams.type];
        }
        return b;
    }

    updateDisplayingDanmakuList(timeInfo:TimeInfoEx):void {
        var partialDisplayingCounts = this.partialDisplayingDanmakuCounts;
        var fullList = this.fullDanmakuList;
        var displayingList = this.displayingDanmakuList;

        // TODO: The algorithm can be optimized!
        var now = timeInfo.millisOfVideo;
        var config = this.engine.options;
        var danmaku:SimpleDanmaku;
        var layoutManager = this.layoutManager;

        // We don't handle the situation where cursor is at 00:20, and a danmaku born at 00:15 with life 10s is added.
        // In this situation, the new danmaku is just ignored.

        if (displayingList.length > 0) {
            // Fortunately we have the displaying list for reference.
            // *Assume* that we only play in normal order and don't seek through the track. So we just need to:
            // 1) remove old danmakus in the front of the displaying list;
            // 2) search the danmakus just next to the last in the displaying list.
            var lastDisplayingDanmaku:SimpleDanmaku = null;
            for (var i = 0; i < displayingList.length; ++i) {
                danmaku = displayingList[i];
                if (this.isDanmakuDead(timeInfo, danmaku)) {
                    lastDisplayingDanmaku = danmaku;
                    var type = danmaku.createParams.type;
                    --partialDisplayingCounts[type];
                    layoutManager.removeDanmaku(danmaku);
                    GLUtil.removeAt(displayingList, i);
                    --i;
                } else {
                    break;
                }
            }
            // If we removed the last available danmaku in displaying list, we have to use the last removed one as reference.
            var referenceDanmaku = displayingList.length > 0 ? displayingList[displayingList.length - 1] : lastDisplayingDanmaku;
            // Skip danmakus in the front. Beware that the whole list may be skipped.
            var i = fullList.indexOf(referenceDanmaku) + 1;
            if (i < fullList.length) {
                for (; i < fullList.length; ++i) {
                    danmaku = fullList[i];
                    if (danmaku.bornTime > now) {
                        break;
                    } else {
                        var type = danmaku.createParams.type;
                        if (partialDisplayingCounts[type] < config.simpleDanmakuPartCountThreshold) {
                            displayingList.push(danmaku);
                            layoutManager.addDanmaku(danmaku);
                            ++partialDisplayingCounts[type];
                        }
                    }
                }
            }
        } else {
            // If there is no displaying danmakus, we have to search a little more...
            for (var i = 0; i < fullList.length; ++i) {
                danmaku = fullList[i];
                if (danmaku.bornTime > now) {
                    break;
                }
                if (!this.isDanmakuDead(timeInfo, danmaku)) {
                    var type = danmaku.createParams.type;
                    if (partialDisplayingCounts[type] < config.simpleDanmakuPartCountThreshold) {
                        displayingList.push(fullList[i]);
                        layoutManager.addDanmaku(fullList[i]);
                        ++partialDisplayingCounts[type];
                    }
                }
            }
        }
    }

    isDanmakuDead(timeInfo:TimeInfoEx, danmaku:SimpleDanmaku):boolean {
        var now = timeInfo.millisOfVideo;
        return now < danmaku.bornTime || danmaku.bornTime + danmaku.lifeTime * 1000 < now;
    }

    get layoutManager():SimpleDanmakuLayoutManager {
        return this._layoutManager;
    }

    get partialDanmakuCounts():number[] {
        return this._partialDanmakuCounts;
    }

    get displayingDanmakuList():SimpleDanmaku[] {
        return this._displayingDanmakuList;
    }

    get fullDanmakuList():SimpleDanmaku[] {
        return this._fullDanmakuList;
    }

    get partialDisplayingDanmakuCounts():number[] {
        return this._partialDisplayingDanmakuCounts;
    }

    get flags():DanmakuProviderFlag {
        return DanmakuProviderFlag.None;
    }

    get layer():SimpleDanmakuLayer {
        return this._layer;
    }

    update(timeInfo:TimeInfoEx):void {
        if (this._shouldSortDanmakuList) {
            this.fullDanmakuList.sort((d1:SimpleDanmaku, d2:SimpleDanmaku):number => {
                return d1.bornTime - d2.bornTime;
            });
            this._shouldSortDanmakuList = false;
        }
        super.update(timeInfo);
    }

    protected _$addDanmaku(content:string, args?:ISimpleDanmakuCreateParams):SimpleDanmaku {
        var options = this.engine.options;
        if (GLUtil.ptr(args)) {
            SimpleDanmakuHelper.fillInCreateParams(options, args);
        } else {
            args = SimpleDanmakuHelper.getDefaultParams(options);
        }
        var danmaku = new SimpleDanmaku(this.layoutManager, args);
        danmaku.initialize(content, this.engine.videoMillis);
        this.fullDanmakuList.push(danmaku);
        ++this.partialDanmakuCounts[args.type];
        this._shouldSortDanmakuList = true;
        return danmaku;
    }

    protected _layer:SimpleDanmakuLayer;
    protected _displayingDanmakuList:SimpleDanmaku[];
    protected _layoutManager:SimpleDanmakuLayoutManager;
    private _shouldSortDanmakuList:boolean = false;
    private _fullDanmakuList:SimpleDanmaku[] = null;
    private _partialDanmakuCounts:number[] = null;
    private _partialDisplayingDanmakuCounts:number[] = null;

}
