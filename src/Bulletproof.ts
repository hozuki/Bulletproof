/**
 * Created by MIC on 2015/12/28.
 */

import {GLantern} from "../lib/glantern/src/GLantern";
import {DanmakuCoordinator} from "./danmaku/DanmakuCoordinator";
import {CodeDanmakuProvider} from "./danmaku/code/CodeDanmakuProvider";
import {DanmakuProviderBase} from "./danmaku/DanmakuProviderBase";
import {NotImplementedError} from "../lib/glantern/src/_util/NotImplementedError";

/**
 * The root controller for Bulletproof.
 */
export class Bulletproof extends GLantern {

    /**
     * Creates a new {@link Bulletproof} instance.
     */
    constructor() {
        super();
    }

    /**
     * Initialize the {@link Bulletproof} instance with default parameters.
     * @param width {Number} Width of stage requested, in pixels.
     * @param height {Number} Height of stage requested, in pixels.
     */
    initialize(width:number, height:number):void {
        if (!this._isInitialized) {
            super.initialize(width, height);
            this.attachUpdateFunction(this.__updateComponents.bind(this));
            var coordinator = new DanmakuCoordinator(this);
            this._coordinator = coordinator;

            var provider:DanmakuProviderBase;
            provider = new CodeDanmakuProvider(coordinator);
            coordinator.addDanmakuProvider(provider);
        }
    }

    /**
     * Starts the animation loop. Updating and rendering are automatically handled in the loop.
     * By default, {@link startAnimation} uses {@link window.requestAnimationFrame} function and relies
     * on the frame rate adjuster of the browser window.
     */
    startAnimation():void {
        if (!this.isAnimationRunning) {
            this._lastUpdatedTime = Date.now();
        }
        super.startAnimation();
    }

    /**
     * Stops the animation loop. Internal state is preserved, and the next {@link startAnimation} call resumes
     * from last state.
     */
    stopAnimation():void {
        this.__updateComponents();
        super.stopAnimation();
    }

    /**
     * Disposes the {@link Bulletproof} instance and release all resources occupied.
     */
    dispose():void {
        this._coordinator.dispose();
        this._coordinator = null;
        super.dispose();
    }

    /**
     * Gets the {@link DanmakuCoordinator} instance associated with current {@link Bulletproof} instance.
     * @returns {DanmakuCoordinator}
     */
    get danmakuCoordinator():DanmakuCoordinator {
        return this._coordinator;
    }

    /**
     * Gets a boolean flag indicating whether the animation loop is running.
     * @returns {Boolean}
     */
    get isAnimationRunning():boolean {
        return this._isRunning;
    }

    /**
     * Gets total time elapsed in handling the animation loop, in milliseconds.
     * @returns {Number}
     */
    get timeElapsed():number {
        return this._totalElapsedTime;
    }

    /**
     * Gets the average FPS (frame per second) of last second.
     * @returns {Number}
     */
    get fps():number {
        return this._fps;
    }

    /**
     * Gets the default life time for simple (text-only) danmakus, in seconds.
     * @returns {Number}
     */
    static get SIMPLE_DANMAKU_LIFE_TIME():number {
        // 10 seconds
        return 10;
    }

    /**
     * Gets the default life time for code danmakus, in seconds.
     * @returns {Number}
     */
    static get CODE_DANMAKU_LIFE_TIME():number {
        return Number.MAX_VALUE;
    }

    protected __updateComponents():void {
        if (this._lastUpdatedTime > 0) {
            var now = Date.now();
            this._totalElapsedTime += now - this._lastUpdatedTime;
            this._lastUpdatedTime = now;
        }
        ++this._fpsCounter;
        if (this.timeElapsed - this._lastFpsUpdateElapsedTime > 1000) {
            this._fps = this._fpsCounter / (this.timeElapsed - this._lastFpsUpdateElapsedTime) * 1000;
            this._fpsCounter = 0;
            this._lastFpsUpdateElapsedTime = this.timeElapsed;
        }
        this._coordinator.update();
    }

    protected _lastUpdatedTime:number = -1;
    protected _totalElapsedTime:number = 0;
    protected _fps:number = 0;
    protected _fpsCounter:number = 0;
    protected _lastFpsUpdateElapsedTime:number = 0;
    protected _coordinator:DanmakuCoordinator = null;

}
