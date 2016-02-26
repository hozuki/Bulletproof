/**
 * Created by MIC on 2015/12/28.
 */
var NotImplementedError_1 = require("../../lib/glantern/lib/glantern-utils/src/NotImplementedError");
/**
 * Base class exposing common service of a danmaku layout manager.
 * A danmaku layout manager does layout calculation and performs optimized layout for danmakus of its kind.
 * In special situations, it can also do nothing and let the danmakus themselves to determine the best
 * layout, as in {@link ScriptedDanmakuLayoutManager}.
 * This class must be inherited.
 */
var DanmakuLayoutManagerBase = (function () {
    /**
     * Creates a new danmaku layout manager.
     * @param provider {DanmakuProviderBase} The danmaku provider that will be attached to.
     */
    function DanmakuLayoutManagerBase(provider) {
        this._danmakuProvider = null;
        this._bulletproof = null;
        this._danmakuProvider = provider;
        this._bulletproof = provider.bulletproof;
    }
    Object.defineProperty(DanmakuLayoutManagerBase.prototype, "danmakuKind", {
        /**
         * Gets the kind of danmaku that this danmaku layout manager handles.
         * @returns {DanmakuKind}
         */
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DanmakuLayoutManagerBase.prototype, "danmakuProvider", {
        /**
         * Gets the danmaku provider specified at the time of creation.
         * @returns {DanmakuProviderBase}
         */
        get: function () {
            return this._danmakuProvider;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DanmakuLayoutManagerBase.prototype, "bulletproof", {
        /**
         * Gets the {@link Bulletproof} instance that controls this {@link DanmakuLayoutManagerBase}.
         * @returns {Bulletproof}
         */
        get: function () {
            return this._bulletproof;
        },
        enumerable: true,
        configurable: true
    });
    return DanmakuLayoutManagerBase;
})();
exports.DanmakuLayoutManagerBase = DanmakuLayoutManagerBase;

//# sourceMappingURL=DanmakuLayoutManagerBase.js.map
