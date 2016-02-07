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

    dispose():void {
        this._layoutManager.dispose();
        this._layoutManager = null;
        for (var i = 0; i < this.displayingDanmakuList.length; ++i) {
            this.displayingDanmakuList[i].dispose();
        }
        while (this.displayingDanmakuList.length > 0) {
            this.displayingDanmakuList.pop();
        }
        this._displayingDanmakuList = null;
    }

    initialize():void {
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
        return timeElapsed < danmaku.bornTime || danmaku.bornTime + danmaku.lifeTime * 1000 < timeElapsed;
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

    get flags():DanmakuProviderFlag {
        return DanmakuProviderFlag.UnlimitedCreation;
    }

    protected __addDanmaku(content:string, args?:any):CodeDanmaku {
        var danmaku = new CodeDanmaku(this.bulletproof.stage, this.bulletproof.stage, this.layoutManager);
        // Add to the last position of all currently active damakus to ensure being drawn as topmost.
        this.bulletproof.stage.addChild(danmaku);
        danmaku.initialize(content, this.bulletproof.timeElapsed);
        this.displayingDanmakuList.push(danmaku);
        return danmaku;
    }

    protected _displayingDanmakuList:CodeDanmaku[];
    protected _layoutManager:CodeDanmakuLayoutManager;

}
