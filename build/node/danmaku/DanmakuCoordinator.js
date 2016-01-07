/**
 * Created by MIC on 2015/12/29.
 */
var NotImplementedError_1 = require("../../lib/glantern/src/_util/NotImplementedError");
var _util_1 = require("../../lib/glantern/src/_util/_util");
var DanmakuCoordinator = (function () {
    function DanmakuCoordinator(bulletproof) {
        this._danmakuProviders = null;
        this._bulletproof = null;
        this._bulletproof = bulletproof;
        this._danmakuProviders = new Map();
    }
    DanmakuCoordinator.prototype.dispose = function () {
        this._danmakuProviders.forEach(function (provider) {
            provider.dispose();
        });
        this._danmakuProviders.clear();
    };
    DanmakuCoordinator.prototype.shouldCreateDanmaku = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    DanmakuCoordinator.prototype.addDanmakuProvider = function (provider) {
        if (!_util_1._util.isUndefinedOrNull(provider) && !this._danmakuProviders.has(provider.danmakuKind)) {
            this._danmakuProviders.set(provider.danmakuKind, provider);
        }
    };
    DanmakuCoordinator.prototype.removeDanmakuProvider = function (provider) {
        if (!_util_1._util.isUndefinedOrNull(provider) && this._danmakuProviders.has(provider.danmakuKind)) {
            this._danmakuProviders.delete(provider.danmakuKind);
        }
    };
    DanmakuCoordinator.prototype.getDanmakuProvider = function (kind) {
        return this._danmakuProviders.get(kind);
    };
    DanmakuCoordinator.prototype.update = function () {
        this._danmakuProviders.forEach(function (provider) {
            provider.update();
        });
    };
    DanmakuCoordinator.prototype.render = function (renderer) {
        // Do nothing.
    };
    Object.defineProperty(DanmakuCoordinator.prototype, "bulletproof", {
        get: function () {
            return this._bulletproof;
        },
        enumerable: true,
        configurable: true
    });
    return DanmakuCoordinator;
})();
exports.DanmakuCoordinator = DanmakuCoordinator;

//# sourceMappingURL=DanmakuCoordinator.js.map
