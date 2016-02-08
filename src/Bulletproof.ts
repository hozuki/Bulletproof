/**
 * Created by MIC on 2015/12/28.
 */

import {GLantern} from "../lib/glantern/src/GLantern";
import {DanmakuCoordinator} from "./danmaku/DanmakuCoordinator";
import {CodeDanmakuProvider} from "./danmaku/code/CodeDanmakuProvider";
import {DanmakuProviderBase} from "./danmaku/DanmakuProviderBase";
import {NotImplementedError} from "../lib/glantern/src/_util/NotImplementedError";
import {SimpleDanmakuProvider} from "./danmaku/simple/SimpleDanmakuProvider";
import {BulletproofConfig} from "./BulletproofConfig";
import {VideoPlayerBase} from "./interactive/video/VideoPlayerBase";
import {_util} from "../lib/glantern/src/_util/_util";
import {Html5VideoPlayer} from "./interactive/video/html5/Html5VideoPlayer";

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

            var config = BulletproofConfig;

            this.attachUpdateFunction(this.__updateComponents.bind(this));
            var coordinator = new DanmakuCoordinator(this);
            this._coordinator = coordinator;

            // The earlier a provider is added in, the deeper it is in Z axis.
            var provider:DanmakuProviderBase;
            if (config.codeDanmakuEnabled) {
                provider = new CodeDanmakuProvider(coordinator);
                coordinator.addDanmakuProvider(provider);
            }
            if (config.simpleDanmakuEnabled) {
                provider = new SimpleDanmakuProvider(coordinator);
                coordinator.addDanmakuProvider(provider);
            }

            if (config.useWebChimeraForVideoPlayback) {
            } else {
                this._videoPlayer = new Html5VideoPlayer();
            }
            if (this._videoPlayer !== null) {
                this._videoPlayer.initialize(width, height);
            }
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

    get videoPlayer():VideoPlayerBase {
        return this._videoPlayer;
    }

    get videoView():HTMLElement {
        if (_util.isUndefinedOrNull(this._videoPlayer)) {
            return null;
        } else {
            return this._videoPlayer.view;
        }
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
    protected _videoPlayer:VideoPlayerBase = null;

}
