/**
 * Created by MIC on 2015/12/28.
 */
var NotImplementedError_1 = require("../lib/glantern/src/_util/NotImplementedError");
var DanmakuProviderBase = (function () {
    function DanmakuProviderBase(coordinator) {
        this._coordinator = null;
        this._layoutManager = null;
        this._coordinator = coordinator;
    }
    Object.defineProperty(DanmakuProviderBase.prototype, "danmakuKind", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DanmakuProviderBase.prototype, "layoutManager", {
        get: function () {
            return this._layoutManager;
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
