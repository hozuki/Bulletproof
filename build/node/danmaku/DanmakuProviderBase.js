/**
 * Created by MIC on 2015/12/28.
 */
var NotImplementedError_1 = require("../../lib/glantern/src/_util/NotImplementedError");
var DanmakuProviderFlag_1 = require("./DanmakuProviderFlag");
/**
 * Base class exposing common service of a danmaku provider.
 * This class must be inherited.
 */
var DanmakuProviderBase = (function () {
    /**
     * Creates a new danmaku provider.
     * @param coordinator {DanmakuCoordinator} The {@link DanmakuCoordinator} that will be used for reversed queries.
     */
    function DanmakuProviderBase(coordinator) {
        this._danmakuList = null;
        this._coordinator = null;
        this._layoutManager = null;
        this._coordinator = coordinator;
        this._danmakuList = [];
    }
    Object.defineProperty(DanmakuProviderBase.prototype, "danmakuKind", {
        /**
         * The kind of this danmaku provider. Override this property and return a unique number to identify from other
         * danmaku providers.
         * This property must be overridden.
         */
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates the state of this instance.
     */
    DanmakuProviderBase.prototype.update = function () {
        this.removeDeadDanmakus();
        this.layoutManager.performLayout();
    };
    /**
     * Removes "dead" danmakus from the internal danmaku list and release the resources they occupy.
     * A danmaku being existed longer than its life time is regarded as "dead".
     */
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
        /**
         * Gets the layout manager associated with this instance.
         * @returns {DanmakuLayoutManagerBase}
         */
        get: function () {
            return this._layoutManager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DanmakuProviderBase.prototype, "danmakuList", {
        /**
         * Gets the list including all danmakus created and managed by this danmaku provider.
         * @returns {DanmakuBase[]}
         */
        get: function () {
            return this._danmakuList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DanmakuProviderBase.prototype, "danmakuCoordinator", {
        /**
         * Gets the danmaku coordinator specified at the time of creation.
         * @returns {DanmakuCoordinator}
         */
        get: function () {
            return this._coordinator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DanmakuProviderBase.prototype, "flags", {
        /**
         * Gets the flags of this danmaku provider. The flags may influence how this danmaku provider is treated,
         * for example, in {@link DanmakuCoordinator.shouldCreateDanmaku}.
         * The default value is {@link DanmakuProviderFlag.None}, indicating no special flag is set.
         * @returns {DanmakuProviderFlag}
         */
        get: function () {
            return DanmakuProviderFlag_1.DanmakuProviderFlag.None;
        },
        enumerable: true,
        configurable: true
    });
    return DanmakuProviderBase;
})();
exports.DanmakuProviderBase = DanmakuProviderBase;

//# sourceMappingURL=DanmakuProviderBase.js.map
