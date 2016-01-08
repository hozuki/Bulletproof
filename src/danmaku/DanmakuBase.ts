/**
 * Created by MIC on 2015/12/28.
 */

import {DisplayObjectContainer} from "../../lib/glantern/src/flash/display/DisplayObjectContainer";
import {DanmakuKind} from "./DanmakuKind";
import {DanmakuLayoutManagerBase} from "./DanmakuLayoutManagerBase";
import {Stage} from "../../lib/glantern/src/flash/display/Stage";
import {NotImplementedError} from "../../lib/glantern/src/_util/NotImplementedError";
import {Bulletproof} from "../Bulletproof";

export abstract class DanmakuBase extends DisplayObjectContainer {

    constructor(root:Stage, parent:DisplayObjectContainer, layoutManager:DanmakuLayoutManagerBase) {
        super(root, parent);
        this._layoutManager = layoutManager;
        this._bornTime = layoutManager.danmakuProvider.danmakuCoordinator.bulletproof.timeElapsed;
    }

    abstract getContent():string;

    abstract getText():string;

    abstract initialize(content:string, time:number):void;

    get danmakuKind():DanmakuKind {
        throw new NotImplementedError();
    }

    get bornTime():number {
        return this._bornTime;
    }

    get lifeTime():number {
        return Bulletproof.SIMPLE_DANMAKU_LIFE_TIME;
    }

    get layoutManager():DanmakuLayoutManagerBase {
        return this._layoutManager;
    }

    protected _bornTime:number = 0;
    protected _layoutManager:DanmakuLayoutManagerBase = null;

}
