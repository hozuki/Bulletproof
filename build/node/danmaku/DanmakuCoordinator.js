/**
 * Created by MIC on 2015/12/29.
 */
var _util_1 = require("../../lib/glantern/src/_util/_util");
var DanmakuProviderFlag_1 = require("./DanmakuProviderFlag");
/**
 * The coordinator of all danmakus.
 * This class is a factory and manager of danmaku providers.
 */
var DanmakuCoordinator = (function () {
    /**
     * Creates a new {@Link DanmakuCoordinator} instance.
     * @param bulletproof {Bulletproof} The {@link Bulletproof} instance that will be attached to.
     */
    function DanmakuCoordinator(bulletproof) {
        this._danmakuProviders = null;
        this._bulletproof = null;
        this._bulletproof = bulletproof;
        this._danmakuProviders = new Map();
    }
    /**
     * Disposes the {@link DanmakuCoordinator} instance and release all resources occupied.
     */
    DanmakuCoordinator.prototype.dispose = function () {
        this._danmakuProviders.forEach(function (provider) {
            provider.dispose();
        });
        this._danmakuProviders.clear();
    };
    /**
     * Determines whether a danmaku should be created.
     * For example, if the density of danmakus are too high, this function should returns false when a
     * {@link SimpleDanamkuProvider} is requesting creation of a new danmaku, to avoid performance drop.
     * Danmaku providers should check via this function before actually creating a danmaku.
     * @param requestingProvider {DanmakuProviderBase} The danmaku provider requesting the check.
     */
    DanmakuCoordinator.prototype.shouldCreateDanmaku = function (requestingProvider) {
        if ((requestingProvider.flags & DanmakuProviderFlag_1.DanmakuProviderFlag.UnlimitedCreation) !== 0) {
            return true;
        }
        var canCreate = true;
        if (false) {
            // Can create only when 2 conditions are both met:
            // 1. Total count of danmakus is below global threshold;
            // 2. Total count of danmakus of the kind of requesting danmaku provider is below the provider's threshold.
            var totalDanmakuCount = 0;
            var globalThreshold = 100;
            var specificThreshold = 10;
            this._danmakuProviders.forEach(function (provider) {
                if (canCreate) {
                    var dl = provider.danmakuList.length;
                    totalDanmakuCount += dl;
                    if (totalDanmakuCount > globalThreshold || dl > specificThreshold) {
                        canCreate = false;
                    }
                }
            });
            if (!canCreate) {
                return false;
            }
        }
        return true;
    };
    /**
     * Adds a new kind of danmaku provider to provider instance list. If the a provider of that kind
     * already exists, the new one will not be added.
     * @param provider {DanmakuProviderBase} The danmaku provider preparing to be added.
     */
    DanmakuCoordinator.prototype.addDanmakuProvider = function (provider) {
        if (!_util_1._util.isUndefinedOrNull(provider) && !this._danmakuProviders.has(provider.danmakuKind)) {
            this._danmakuProviders.set(provider.danmakuKind, provider);
        }
    };
    /**
     * Removes a new kind of danmaku provider from provider instance list.
     * @param provider {DanmakuProviderBase} The danmaku provider preparing to be removed.
     */
    DanmakuCoordinator.prototype.removeDanmakuProvider = function (provider) {
        if (!_util_1._util.isUndefinedOrNull(provider) && this._danmakuProviders.has(provider.danmakuKind)) {
            this._danmakuProviders.delete(provider.danmakuKind);
        }
    };
    /**
     * Gets the instance of danmaku provider whose kind is as specified. If the kind is not registered,
     * a null value will be returned.
     * @param kind {DanmakuKind} The danmaku kind of requested danmaku provider.
     * @returns {DanmakuProviderBase}
     */
    DanmakuCoordinator.prototype.getDanmakuProvider = function (kind) {
        var provider = this._danmakuProviders.get(kind);
        if (_util_1._util.isUndefinedOrNull(provider)) {
            return null;
        }
        else {
            return provider;
        }
    };
    /**
     * Updates the status of all danmaku providers.
     */
    DanmakuCoordinator.prototype.update = function () {
        this._danmakuProviders.forEach(function (provider) {
            provider.update();
        });
    };
    /**
     * Perform extra rendering if needed.
     * @param renderer {WebGLRenderer} The renderer used.
     */
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
