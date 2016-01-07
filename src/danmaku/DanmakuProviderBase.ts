/**
 * Created by MIC on 2015/12/28.
 */

import {IDisposable} from "../../lib/glantern/src/IDisposable";
import {DanmakuKind} from "./DanmakuKind";
import {DanmakuLayoutManagerBase} from "./DanmakuLayoutManagerBase";
import {NotImplementedError} from "../../lib/glantern/src/_util/NotImplementedError";
import {DanmakuCoordinator} from "./DanmakuCoordinator";
import {DanmakuBase} from "./DanmakuBase";

export abstract class DanmakuProviderBase implements IDisposable {

    constructor(coordinator:DanmakuCoordinator) {
        this._coordinator = coordinator;
        this._danmakuList = [];
    }

    get danmakuKind():DanmakuKind {
        throw new NotImplementedError();
    }

    abstract dispose():void;

    update():void {
        this.removeDeadDanmakus();
    }

    abstract addDanmaku(content:string):DanmakuBase;

    abstract removeDanmaku(danmaku:DanmakuBase):boolean;

    removeDeadDanmakus():void {
        var danmaku:DanmakuBase;
        var bulletproof = this.danmakuCoordinator.bulletproof;
        for (var i = 0; i < this.danmakuList.length; ++i) {
            danmaku = this.danmakuList[i];
            if (danmaku.bornTime + danmaku.lifeTime * 1000 < bulletproof.timeElapsed) {
                this.removeDanmaku(danmaku);
                --i;
            }
        }
    }

    get layoutManager():DanmakuLayoutManagerBase {
        return this._layoutManager;
    }

    get danmakuList():DanmakuBase[] {
        return this._danmakuList;
    }

    get danmakuCoordinator():DanmakuCoordinator {
        return this._coordinator;
    }

    protected _danmakuList:DanmakuBase[] = null;
    protected _coordinator:DanmakuCoordinator = null;
    protected _layoutManager:DanmakuLayoutManagerBase = null;

}
