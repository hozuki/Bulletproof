/**
 * Created by MIC on 2015/12/29.
 */
var _util_1 = require("../../lib/glantern/src/_util/_util");
var DanmakuProviderFlag_1 = require("./DanmakuProviderFlag");
var BulletproofConfig_1 = require("../BulletproofConfig");
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
        this._danmakuProviders = null;
    };
    /**
     * Determines whether a danmaku should be created, in a global view.
     * For example, if the density of danmakus are too high, this function should returns false when a
     * {@link SimpleDanmakuProvider} is requesting creation of a new danmaku, to avoid performance drop.
     * Danmaku providers should check via this function before actually creating a danmaku.
     * @param requestingProvider {DanmakuProviderBase} The danmaku provider requesting the check.
     */
    DanmakuCoordinator.prototype.shouldCreateDanmaku = function (requestingProvider) {
        var canCreate = true;
        var totalDanmakuCount = 0;
        var globalThreshold = BulletproofConfig_1.BulletproofConfig.globalDanmakuCountThreshold;
        this._danmakuProviders.forEach(function (provider) {
            // If a danmaku provider has no number limit, it contributes 0 to the total count.
            if (!canCreate || (requestingProvider.flags & DanmakuProviderFlag_1.DanmakuProviderFlag.UnlimitedCreation) !== 0) {
                return;
            }
            totalDanmakuCount += provider.displayingDanmakuList.length;
            if (totalDanmakuCount > globalThreshold) {
                canCreate = false;
            }
        });
        return canCreate;
    };
    /**
     * Adds a new kind of danmaku provider to provider instance list. If the a provider of that kind
     * already exists, the new one will not be added.
     * @param provider {DanmakuProviderBase} The danmaku provider preparing to be added.
     */
    DanmakuCoordinator.prototype.addDanmakuProvider = function (provider) {
        if (!_util_1._util.isUndefinedOrNull(provider) && !this._danmakuProviders.has(provider.danmakuKind)) {
            this._danmakuProviders.set(provider.danmakuKind, provider);
            provider.initialize();
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
        /**
         * Gets the {@link Bulletproof} instance that controls this {@link DanmakuCoordinator}.
         * @returns {Bulletproof}
         */
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
