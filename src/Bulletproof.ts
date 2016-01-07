/**
 * Created by MIC on 2015/12/28.
 */

import {GLantern} from "../lib/glantern/src/GLantern";
import {DanmakuCoordinator} from "./danmaku/DanmakuCoordinator";
import {CodeDanmakuProvider} from "./danmaku/code/CodeDanmakuProvider";
import {DanmakuProviderBase} from "./danmaku/DanmakuProviderBase";
import {NotImplementedError} from "../lib/glantern/src/_util/NotImplementedError";

export class Bulletproof extends GLantern {

    constructor() {
        super();
    }

    initialize(width:number, height:number):void {
        super.initialize(width, height);
        this.attachUpdateFunction(this.__updateComponents.bind(this));
        var coordinator = new DanmakuCoordinator(this);
        this._coordinator = coordinator;

        var provider:DanmakuProviderBase;
        provider = new CodeDanmakuProvider(coordinator);
        coordinator.addDanmakuProvider(provider);
    }

    startAnimation():void {
        if (!this.isAnimationRunning) {
            this._lastUpdatedTime = Date.now();
        }
        super.startAnimation();
    }

    stopAnimation():void {
        super.stopAnimation();
    }

    dispose():void {
        this._coordinator.dispose();
        this._coordinator = null;
        super.dispose();
    }

    get danmakuCoordinator():DanmakuCoordinator {
        return this._coordinator;
    }

    get isAnimationRunning():boolean {
        return this._isRunning;
    }

    get timeElapsed():number {
        return this._totalElapsedTime;
    }

    static get SIMPLE_DANMAKU_LIFE_TIME():number {
        // 10 seconds
        return 10;
    }

    static get CODE_DANMAKU_LIFE_TIME():number {
        return Number.MAX_VALUE;
    }

    protected __updateComponents():void {
        var now = Date.now();
        if (this._lastUpdatedTime > 0) {
            this._totalElapsedTime += now - this._lastUpdatedTime;
            this._lastUpdatedTime = now;
        }
        this._coordinator.update();
    }

    protected _lastUpdatedTime:number = -1;
    protected _totalElapsedTime:number = 0;
    protected _coordinator:DanmakuCoordinator = null;

}
