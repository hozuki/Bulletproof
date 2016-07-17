/**
 * Created by MIC on 2015/12/28.
 */

import {DanmakuProviderBase} from "../DanmakuProviderBase";
import {DanmakuKind} from "../DanmakuKind";
import {ScriptedDanmakuLayoutManager} from "./ScriptedDanmakuLayoutManager";
import {DanmakuController} from "../DanmakuController";
import {ScriptedDanmaku} from "./ScriptedDanmaku";
import {DanmakuProviderFlag} from "../DanmakuProviderFlag";
import {ScriptedDanmakuLayer} from "./ScriptedDanmakuLayer";
import {IScriptedDanmakuCreateParams} from "./IScriptedDanmakuCreateParams";
import {ScriptedDanmakuHelper} from "./ScriptedDanmakuHelper";
import {IDanmaku} from "../IDanmaku";
import {GLUtil} from "../../../../lib/glantern/src/gl/glantern/GLUtil";
import {TimeInfoEx} from "../../bulletproof/TimeInfoEx";

/**
 * An implementation of {@link DanmakuProviderBase}, for managing code damakus.
 */
export class ScriptedDanmakuProvider extends DanmakuProviderBase {

    constructor(controller:DanmakuController) {
        super(controller);
        this._layoutManager = new ScriptedDanmakuLayoutManager(this);
    }

    get danmakuKind():DanmakuKind {
        return DanmakuKind.Scripted;
    }

    addDanmaku(content:string, args?:IScriptedDanmakuCreateParams):IDanmaku {
        return super.addDanmaku(content, args);
    }

    dispose():void {
        this.layer.parent.removeChild(this.layer);
        this.layer.dispose();
        this._layoutManager.dispose();
        this._layoutManager = null;
        for (var i = 0; i < this.displayingDanmakuList.length; ++i) {
            this.displayingDanmakuList[i].dispose();
        }
        while (this.displayingDanmakuList.length > 0) {
            this.displayingDanmakuList.pop();
        }
        this._layer = null;
        this._displayingDanmakuList = null;
    }

    initialize():void {
        super.initialize();
        var stage = this.engine.stage;
        this._layer = new ScriptedDanmakuLayer(stage, stage);
        stage.addChild(this.layer);
    }

    canCreateDanmaku(args?:any):boolean {
        return true;
    }

    removeDanmaku(danmaku:ScriptedDanmaku):boolean {
        var index = this.displayingDanmakuList.indexOf(danmaku);
        if (index < 0) {
            return false;
        } else {
            this.engine.stage.removeChild(danmaku);
            GLUtil.removeAt(this.displayingDanmakuList, index);
            danmaku.dispose();
            return true;
        }
    }

    isDanmakuDead(timeInfo:TimeInfoEx, danmaku:ScriptedDanmaku):boolean {
        var now = timeInfo.millisOfVideo;
        if (now < danmaku.bornTime) {
            return danmaku.executed;
        } else {
            return danmaku.bornTime + danmaku.lifeTime * 1000 < now;
        }
    }

    update(timeInfo:TimeInfoEx):void {
        super.update(timeInfo);
        var danmaku:ScriptedDanmaku;
        var now = timeInfo.millisOfVideo;
        for (var i = 0; i < this.displayingDanmakuList.length; ++i) {
            danmaku = this.displayingDanmakuList[i];
            if (!danmaku.executed && now >= danmaku.bornTime) {
                danmaku.execute();
            }
        }
    }

    updateDisplayingDanmakuList(timeInfo:TimeInfoEx):void {
        var danmaku:ScriptedDanmaku;
        for (var i = 0; i < this.displayingDanmakuList.length; ++i) {
            danmaku = this.displayingDanmakuList[i];
            if (this.isDanmakuDead(timeInfo, danmaku)) {
                this.removeDanmaku(danmaku);
                --i;
            }
        }
    }

    get layoutManager():ScriptedDanmakuLayoutManager {
        return this._layoutManager;
    }

    get displayingDanmakuList():ScriptedDanmaku[] {
        return this._displayingDanmakuList;
    }

    get fullDanmakuList():ScriptedDanmaku[] {
        return this._displayingDanmakuList;
    }

    get layer():ScriptedDanmakuLayer {
        return this._layer;
    }

    get flags():DanmakuProviderFlag {
        return DanmakuProviderFlag.UnlimitedCreation;
    }

    protected _$addDanmaku(content:string, args?:IScriptedDanmakuCreateParams):ScriptedDanmaku {
        if (!GLUtil.ptr(args)) {
            args = ScriptedDanmakuHelper.getDefaultParams(this.engine.options);
        }
        var danmaku = new ScriptedDanmaku(this.engine.stage, this.layer, this.layoutManager, args);
        // Add to the last position of all currently active damakus to ensure being drawn as topmost.
        this.layer.addChild(danmaku);
        danmaku.initialize(content, this.engine.videoMillis);
        this.displayingDanmakuList.push(danmaku);
        return danmaku;
    }

    protected _displayingDanmakuList:ScriptedDanmaku[];
    protected _layoutManager:ScriptedDanmakuLayoutManager;
    protected _layer:ScriptedDanmakuLayer;

}
