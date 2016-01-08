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
var Bulletproof = (function (_super) {
    __extends(Bulletproof, _super);
    function Bulletproof() {
        _super.call(this);
        this._lastUpdatedTime = -1;
        this._totalElapsedTime = 0;
        this._coordinator = null;
    }
    Bulletproof.prototype.initialize = function (width, height) {
        _super.prototype.initialize.call(this, width, height);
        this.attachUpdateFunction(this.__updateComponents.bind(this));
        var coordinator = new DanmakuCoordinator_1.DanmakuCoordinator(this);
        this._coordinator = coordinator;
        var provider;
        provider = new CodeDanmakuProvider_1.CodeDanmakuProvider(coordinator);
        coordinator.addDanmakuProvider(provider);
    };
    Bulletproof.prototype.startAnimation = function () {
        if (!this.isAnimationRunning) {
            this._lastUpdatedTime = Date.now();
        }
        _super.prototype.startAnimation.call(this);
    };
    Bulletproof.prototype.stopAnimation = function () {
        _super.prototype.stopAnimation.call(this);
    };
    Bulletproof.prototype.dispose = function () {
        this._coordinator.dispose();
        this._coordinator = null;
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(Bulletproof.prototype, "danmakuCoordinator", {
        get: function () {
            return this._coordinator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bulletproof.prototype, "isAnimationRunning", {
        get: function () {
            return this._isRunning;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bulletproof.prototype, "timeElapsed", {
        get: function () {
            return this._totalElapsedTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bulletproof, "SIMPLE_DANMAKU_LIFE_TIME", {
        get: function () {
            // 10 seconds
            return 10;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bulletproof, "CODE_DANMAKU_LIFE_TIME", {
        get: function () {
            return Number.MAX_VALUE;
        },
        enumerable: true,
        configurable: true
    });
    Bulletproof.prototype.__updateComponents = function () {
        var now = Date.now();
        if (this._lastUpdatedTime > 0) {
            this._totalElapsedTime += now - this._lastUpdatedTime;
            this._lastUpdatedTime = now;
        }
        this._coordinator.update();
    };
    return Bulletproof;
})(GLantern_1.GLantern);
exports.Bulletproof = Bulletproof;

//# sourceMappingURL=Bulletproof.js.map
