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
        for (var i = 0; i < this.danmakuList.length; ++i) {
            this.danmakuList[i].dispose();
        }
        while (this.danmakuList.length > 0) {
            this.danmakuList.pop();
        }
    }

    addDanmaku(content:string):CodeDanmaku {
        if (this.danmakuCoordinator.shouldCreateDanmaku(this)) {
            var bulletproof = this.danmakuCoordinator.bulletproof;
            var danmaku = new CodeDanmaku(bulletproof.stage, bulletproof.stage, this.layoutManager);
            // Add to the last position of all currently active damakus to ensure being drawn as topmost.
            bulletproof.stage.addChild(danmaku);
            danmaku.initialize(content, bulletproof.timeElapsed);
            this.danmakuList.unshift(danmaku);
            return danmaku;
        } else {
            return null;
        }
    }

    removeDanmaku(danmaku:CodeDanmaku):boolean {
        var index = this.danmakuList.indexOf(danmaku);
        if (index < 0) {
            return false;
        } else {
            var bulletproof = this.danmakuCoordinator.bulletproof;
            bulletproof.stage.removeChild(danmaku);
            this.danmakuList.splice(index, 1);
            danmaku.dispose();
            return true;
        }
    }

    get layoutManager():CodeDanmakuLayoutManager {
        return this._layoutManager;
    }

    get danmakuList():CodeDanmaku[] {
        return this._danmakuList;
    }

    get flags():DanmakuProviderFlag {
        return DanmakuProviderFlag.UnlimitedCreation;
    }

    // Writing in this pattern avoids force initialization of type-overridden members.
    protected _danmakuList:CodeDanmaku[];
    // Writing in this pattern avoids force initialization of type-overridden members.
    protected _layoutManager:CodeDanmakuLayoutManager;

}
