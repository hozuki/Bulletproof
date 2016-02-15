/**
 * Created by MIC on 2015/12/28.
 */

import {DanmakuProviderBase} from "../DanmakuProviderBase";
import {DanmakuKind} from "../DanmakuKind";
import {DanmakuLayoutManagerBase} from "../DanmakuLayoutManagerBase";
import {SimpleDanmakuLayoutManager} from "./SimpleDanmakuLayoutManager";
import {NotImplementedError} from "../../../lib/glantern/src/_util/NotImplementedError";
import {DanmakuCoordinator} from "../DanmakuCoordinator";
import {SimpleDanmaku} from "./SimpleDanmaku";
import {DanmakuProviderFlag} from "../DanmakuProviderFlag";
import {SimpleDanmakuType} from "./SimpleDanamkuType";
import {ISimpleDanmakuCreateParams} from "./ISimpleDanmakuCreateParams";
import {SimpleDanmakuLayer} from "./SimpleDanmakuLayer";
import {SimpleDanmakuHelper} from "./SimpleDanmakuHelper";
import {StageResizedEventArgs} from "../StageResizedEventArgs";
import {_util} from "../../../lib/glantern/src/_util/_util";
import {IDanmaku} from "../IDanmaku";

/**
 * An implementation of {@link DanmakuProviderBase}, for managing code damakus.
 */
export class SimpleDanmakuProvider extends DanmakuProviderBase {

    constructor(coordinator:DanmakuCoordinator) {
        super(coordinator);
        this._layoutManager = new SimpleDanmakuLayoutManager(this);
        // Mode: 0, 1, 2, 3, 4, 5, 6
        this._partialDanmakuCounts = [0, 0, 0, 0, 0, 0, 0];
        this._partialDisplayingDanmakuCounts = [0, 0, 0, 0, 0, 0, 0];
        this._fullDanmakuList = [];
    }

    get danmakuKind():DanmakuKind {
        return DanmakuKind.Simple;
    }

    initialize():void {
        var stage = this.bulletproof.stage;
        this._danmakuLayer = new SimpleDanmakuLayer(stage, stage, this);
        stage.addChild(this.danmakuLayer);
        this.layoutManager.onStageResize(this, new StageResizedEventArgs(stage.stageWidth, stage.stageHeight));
    }

    dispose():void {
        this._danmakuLayer.parent.removeChild(this._danmakuLayer);
        this._danmakuLayer.dispose();
        this._danmakuLayer = null;
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
        var config = this.bulletproof.config;
        var type:SimpleDanmakuType = _util.isUndefinedOrNull(args) ? config.defaultSimpleDanmakuCreateParams.type : args.type;
        var count = this.partialDanmakuCounts[type];
        return _util.isUndefined(count) ? false : count < config.simpleDanmakuPartCountThreshold;
    }

    addDanmaku(content:string, args?:ISimpleDanmakuCreateParams):IDanmaku {
        return super.addDanmaku(content, args);
    }

    removeDanmaku(danmaku:SimpleDanmaku):boolean {
        var index:number;
        var b = false;
        index = this.fullDanmakuList.indexOf(danmaku);
        if (index >= 0) {
            this.fullDanmakuList.splice(index, 1);
            --this.partialDanmakuCounts[danmaku.createParams.type];
            b = true;
        }
        index = this.displayingDanmakuList.indexOf(danmaku);
        if (index >= 0) {
            this.displayingDanmakuList.splice(index, 1);
            --this.partialDisplayingDanmakuCounts[danmaku.createParams.type];
        }
        return b;
    }

    updateDisplayDanmakuList():void {
        var partialDisplayingCounts = this.partialDisplayingDanmakuCounts;
        var fullList = this.fullDanmakuList;
        var displayingList = this.displayingDanmakuList;

        // TODO: The algorithm can be optimized!
        var timeElapsed = this.bulletproof.timeElapsed;
        var config = this.bulletproof.config;
        var danmaku:SimpleDanmaku;

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
                if (this.isDanmakuDead(danmaku)) {
                    lastDisplayingDanmaku = danmaku;
                    var type = danmaku.createParams.type;
                    --partialDisplayingCounts[type];
                    displayingList.splice(i, 1);
                    --i;
                } else {
                    break;
                }
            }
            // If we removed the last available danmaku in displaying list, we have to use the last removed one as reference.
            var referenceDanmaku = displayingList.length > 0 ? displayingList[displayingList.length - 1] : lastDisplayingDanmaku;
            // Skip danmakus in the front. Beware that the whole list may be skipped.
            i = fullList.indexOf(referenceDanmaku) + 1;
            if (i < fullList.length) {
                for (; i < fullList.length; ++i) {
                    danmaku = fullList[i];
                    if (danmaku.bornTime > timeElapsed) {
                        break;
                    } else {
                        var type = danmaku.createParams.type;
                        if (partialDisplayingCounts[type] < config.simpleDanmakuPartCountThreshold) {
                            displayingList.push(danmaku);
                            ++partialDisplayingCounts[type];
                        }
                    }
                }
            }
        } else {
            // If there is no displaying danmakus, we have to search a little more...
            for (var i = 0; i < fullList.length; ++i) {
                danmaku = fullList[i];
                if (danmaku.bornTime > timeElapsed) {
                    break;
                }
                if (!this.isDanmakuDead(danmaku)) {
                    var type = danmaku.createParams.type;
                    if (partialDisplayingCounts[type] < config.simpleDanmakuPartCountThreshold) {
                        displayingList.push(fullList[i]);
                        ++partialDisplayingCounts[type];
                    }
                }
            }
        }
    }

    isDanmakuDead(danmaku:SimpleDanmaku):boolean {
        var timeElapsed = this.bulletproof.timeElapsed;
        return timeElapsed < danmaku.bornTime || danmaku.bornTime + danmaku.lifeTime * 1000 < timeElapsed;
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

    get danmakuLayer():SimpleDanmakuLayer {
        return this._danmakuLayer;
    }

    update():void {
        if (this._shouldSortDanmakuList) {
            this.fullDanmakuList.sort((d1:SimpleDanmaku, d2:SimpleDanmaku):number => {
                return d1.bornTime - d2.bornTime;
            });
            this._shouldSortDanmakuList = false;
        }
        super.update();
    }

    protected __addDanmaku(content:string, args?:ISimpleDanmakuCreateParams):SimpleDanmaku {
        var config = this.bulletproof.config;
        if (_util.isUndefinedOrNull(args)) {
            args = SimpleDanmakuHelper.getDefaultParams(config);
        } else {
            SimpleDanmakuHelper.fillInCreateParams(config, args);
        }
        var danmaku = new SimpleDanmaku(this.layoutManager, args);
        danmaku.initialize(content, this.bulletproof.timeElapsed);
        this.fullDanmakuList.push(danmaku);
        ++this.partialDanmakuCounts[args.type];
        this._shouldSortDanmakuList = true;
        return danmaku;
    }

    protected _danmakuLayer:SimpleDanmakuLayer;
    protected _displayingDanmakuList:SimpleDanmaku[];
    protected _layoutManager:SimpleDanmakuLayoutManager;
    private _shouldSortDanmakuList:boolean = false;
    private _fullDanmakuList:SimpleDanmaku[] = null;
    private _partialDanmakuCounts:number[] = null;
    private _partialDisplayingDanmakuCounts:number[] = null;

}
