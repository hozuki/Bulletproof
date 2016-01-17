/**
 * Created by MIC on 2015/12/28.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GLantern_1 = require("../lib/glantern/src/GLantern");
var DanmakuCoordinator_1 = require("./danmaku/DanmakuCoordinator");
var CodeDanmakuProvider_1 = require("./danmaku/code/CodeDanmakuProvider");
/**
 * The root controller for Bulletproof.
 */
var Bulletproof = (function (_super) {
    __extends(Bulletproof, _super);
    /**
     * Creates a new {@link Bulletproof} instance.
     */
    function Bulletproof() {
        _super.call(this);
        this._lastUpdatedTime = -1;
        this._totalElapsedTime = 0;
        this._fps = 0;
        this._fpsCounter = 0;
        this._lastFpsUpdateElapsedTime = 0;
        this._coordinator = null;
    }
    /**
     * Initialize the {@link Bulletproof} instance with default parameters.
     * @param width {Number} Width of stage requested, in pixels.
     * @param height {Number} Height of stage requested, in pixels.
     */
    Bulletproof.prototype.initialize = function (width, height) {
        if (!this._isInitialized) {
            _super.prototype.initialize.call(this, width, height);
            this.attachUpdateFunction(this.__updateComponents.bind(this));
            var coordinator = new DanmakuCoordinator_1.DanmakuCoordinator(this);
            this._coordinator = coordinator;
            var provider;
            provider = new CodeDanmakuProvider_1.CodeDanmakuProvider(coordinator);
            coordinator.addDanmakuProvider(provider);
        }
    };
    /**
     * Starts the animation loop. Updating and rendering are automatically handled in the loop.
     * By default, {@link startAnimation} uses {@link window.requestAnimationFrame} function and relies
     * on the frame rate adjuster of the browser window.
     */
    Bulletproof.prototype.startAnimation = function () {
        if (!this.isAnimationRunning) {
            this._lastUpdatedTime = Date.now();
        }
        _super.prototype.startAnimation.call(this);
    };
    /**
     * Stops the animation loop. Internal state is preserved, and the next {@link startAnimation} call resumes
     * from last state.
     */
    Bulletproof.prototype.stopAnimation = function () {
        this.__updateComponents();
        _super.prototype.stopAnimation.call(this);
    };
    /**
     * Disposes the {@link Bulletproof} instance and release all resources occupied.
     */
    Bulletproof.prototype.dispose = function () {
        this._coordinator.dispose();
        this._coordinator = null;
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(Bulletproof.prototype, "danmakuCoordinator", {
        /**
         * Gets the {@link DanmakuCoordinator} instance associated with current {@link Bulletproof} instance.
         * @returns {DanmakuCoordinator}
         */
        get: function () {
            return this._coordinator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bulletproof.prototype, "isAnimationRunning", {
        /**
         * Gets a boolean flag indicating whether the animation loop is running.
         * @returns {Boolean}
         */
        get: function () {
            return this._isRunning;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bulletproof.prototype, "timeElapsed", {
        /**
         * Gets total time elapsed in handling the animation loop, in milliseconds.
         * @returns {Number}
         */
        get: function () {
            return this._totalElapsedTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bulletproof.prototype, "fps", {
        /**
         * Gets the average FPS (frame per second) of last second.
         * @returns {Number}
         */
        get: function () {
            return this._fps;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bulletproof, "SIMPLE_DANMAKU_LIFE_TIME", {
        /**
         * Gets the default life time for simple (text-only) danmakus, in seconds.
         * @returns {Number}
         */
        get: function () {
            // 10 seconds
            return 10;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bulletproof, "CODE_DANMAKU_LIFE_TIME", {
        /**
         * Gets the default life time for code danmakus, in seconds.
         * @returns {Number}
         */
        get: function () {
            return Number.MAX_VALUE;
        },
        enumerable: true,
        configurable: true
    });
    Bulletproof.prototype.__updateComponents = function () {
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
    };
    return Bulletproof;
})(GLantern_1.GLantern);
exports.Bulletproof = Bulletproof;

//# sourceMappingURL=Bulletproof.js.map
