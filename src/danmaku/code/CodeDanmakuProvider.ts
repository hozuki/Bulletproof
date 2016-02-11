/**
 * Created by MIC on 2015/12/28.
 */

import {DanmakuProviderBase} from "../DanmakuProviderBase";
import {DanmakuKind} from "../DanmakuKind";
import {DanmakuLayoutManagerBase} from "../DanmakuLayoutManagerBase";
import {CodeDanmakuLayoutManager} from "./CodeDanmakuLayoutManager";
import {NotImplementedError} from "../../../lib/glantern/src/_util/NotImplementedError";
import {DanmakuCoordinator} from "../DanmakuCoordinator";
import {CodeDanmaku} from "./CodeDanmaku";
import {DanmakuProviderFlag} from "../DanmakuProviderFlag";
import {CodeDanmakuLayer} from "./CodeDanmakuLayer";
import {ICodeDanmakuCreateParams} from "./ICodeDanmakuCreateParams";
import {_util} from "../../../lib/glantern/src/_util/_util";
import {CodeDanmakuHelper} from "./CodeDanmakuHelper";
import {IDanmaku} from "../IDanmaku";

/**
 * An implementation of {@link DanmakuProviderBase}, for managing code damakus.
 */
export class CodeDanmakuProvider extends DanmakuProviderBase {

    constructor(coordinator:DanmakuCoordinator) {
        super(coordinator);
        this._layoutManager = new CodeDanmakuLayoutManager(this);
    }

    get danmakuKind():DanmakuKind {
        return DanmakuKind.Code;
    }

    addDanmaku(content:string, args?:ICodeDanmakuCreateParams):IDanmaku {
        return super.addDanmaku(content, args);
    }

    dispose():void {
        this._danmakuLayer.parent.removeChild(this._danmakuLayer);
        this._danmakuLayer.dispose();
        this._layoutManager.dispose();
        this._layoutManager = null;
        for (var i = 0; i < this.displayingDanmakuList.length; ++i) {
            this.displayingDanmakuList[i].dispose();
        }
        while (this.displayingDanmakuList.length > 0) {
            this.displayingDanmakuList.pop();
        }
        this._danmakuLayer = null;
        this._displayingDanmakuList = null;
    }

    initialize():void {
        var stage = this.bulletproof.stage;
        this._danmakuLayer = new CodeDanmakuLayer(stage, stage);
        stage.addChild(this._danmakuLayer);
    }

    canCreateDanmaku(args?:any):boolean {
        return true;
    }

    removeDanmaku(danmaku:CodeDanmaku):boolean {
        var index = this.displayingDanmakuList.indexOf(danmaku);
        if (index < 0) {
            return false;
        } else {
            this.bulletproof.stage.removeChild(danmaku);
            this.displayingDanmakuList.splice(index, 1);
            danmaku.dispose();
            return true;
        }
    }

    isDanmakuDead(danmaku:CodeDanmaku):boolean {
        var timeElapsed = this.bulletproof.timeElapsed;
        if (timeElapsed < danmaku.bornTime) {
            return danmaku.executed;
        } else {
            return danmaku.bornTime + danmaku.lifeTime * 1000 < timeElapsed;
        }
    }

    update():void {
        super.update();
        var danmaku:CodeDanmaku;
        var timeElapsed = this.bulletproof.timeElapsed;
        for (var i = 0; i < this.displayingDanmakuList.length; ++i) {
            danmaku = this.displayingDanmakuList[i];
            if (!danmaku.executed && timeElapsed >= danmaku.bornTime) {
                danmaku.execute();
            }
        }
    }

    updateDisplayDanmakuList():void {
        var danmaku:CodeDanmaku;
        for (var i = 0; i < this.displayingDanmakuList.length; ++i) {
            danmaku = this.displayingDanmakuList[i];
            if (this.isDanmakuDead(danmaku)) {
                this.removeDanmaku(danmaku);
                --i;
            }
        }
    }

    get layoutManager():CodeDanmakuLayoutManager {
        return this._layoutManager;
    }

    get displayingDanmakuList():CodeDanmaku[] {
        return this._displayingDanmakuList;
    }

    get fullDanmakuList():CodeDanmaku[] {
        return this._displayingDanmakuList;
    }

    get danmakuLayer():CodeDanmakuLayer {
        return this._danmakuLayer;
    }

    get flags():DanmakuProviderFlag {
        return DanmakuProviderFlag.UnlimitedCreation;
    }

    protected __addDanmaku(content:string, args?:ICodeDanmakuCreateParams):CodeDanmaku {
        if (_util.isUndefinedOrNull(args)) {
            args = CodeDanmakuHelper.getDefaultParams(this.bulletproof.config);
        }
        var danmaku = new CodeDanmaku(this.bulletproof.stage, this.danmakuLayer, this.layoutManager, args);
        // Add to the last position of all currently active damakus to ensure being drawn as topmost.
        this.danmakuLayer.addChild(danmaku);
        danmaku.initialize(content, this.bulletproof.timeElapsed);
        this.displayingDanmakuList.push(danmaku);
        return danmaku;
    }

    protected _displayingDanmakuList:CodeDanmaku[];
    protected _layoutManager:CodeDanmakuLayoutManager;
    protected _danmakuLayer:CodeDanmakuLayer;

}
