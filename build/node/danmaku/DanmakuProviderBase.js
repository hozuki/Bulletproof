/**
 * Created by MIC on 2015/12/28.
 */
var NotImplementedError_1 = require("../../lib/glantern/src/_util/NotImplementedError");
var DanmakuProviderBase = (function () {
    function DanmakuProviderBase(coordinator) {
        this._danmakuList = null;
        this._coordinator = null;
        this._layoutManager = null;
        this._coordinator = coordinator;
        this._danmakuList = [];
    }
    Object.defineProperty(DanmakuProviderBase.prototype, "danmakuKind", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    DanmakuProviderBase.prototype.update = function () {
        this.removeDeadDanmakus();
    };
    DanmakuProviderBase.prototype.removeDeadDanmakus = function () {
        var danmaku;
        var bulletproof = this.danmakuCoordinator.bulletproof;
        for (var i = 0; i < this.danmakuList.length; ++i) {
            danmaku = this.danmakuList[i];
            if (danmaku.bornTime + danmaku.lifeTime * 1000 < bulletproof.timeElapsed) {
                this.removeDanmaku(danmaku);
                --i;
            }
        }
    };
    Object.defineProperty(DanmakuProviderBase.prototype, "layoutManager", {
        get: function () {
            return this._layoutManager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DanmakuProviderBase.prototype, "danmakuList", {
        get: function () {
            return this._danmakuList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DanmakuProviderBase.prototype, "danmakuCoordinator", {
        get: function () {
            return this._coordinator;
        },
        enumerable: true,
        configurable: true
    });
    return DanmakuProviderBase;
})();
exports.DanmakuProviderBase = DanmakuProviderBase;

//# sourceMappingURL=DanmakuProviderBase.js.map
