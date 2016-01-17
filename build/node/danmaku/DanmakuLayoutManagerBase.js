/**
 * Created by MIC on 2015/12/28.
 */
var NotImplementedError_1 = require("../../lib/glantern/src/_util/NotImplementedError");
var _util_1 = require("../../lib/glantern/src/_util/_util");
/**
 * Base class exposing common service of a danmaku layout manager.
 * A danmaku layout manager does layout calculation and performs optimized layout for danmakus of its kind.
 * In special situations, it can also do nothing and let the danmakus themselves to determine the best
 * layout, as in {@link CodeDanmakuLayoutManager}.
 * This class must be inherited.
 */
var DanmakuLayoutManagerBase = (function () {
    /**
     * Creates a new danmaku layout manager.
     * @param provider {DanmakuProviderBase} The danmaku provider that will be attached to.
     */
    function DanmakuLayoutManagerBase(provider) {
        this._locationList = null;
        this._danmakuProvider = null;
        this._danmakuProvider = provider;
        this._locationList = [];
    }
    /**
     * Calculates the best layout and sets the danmakus to their new locations.
     */
    DanmakuLayoutManagerBase.prototype.performLayout = function () {
        var danmakuList = this.danmakuProvider.danmakuList;
        while (this._locationList.length > 0) {
            this._locationList.pop();
        }
        var location;
        // First pass: calculates the locations based on the snapshot of current situation.
        // Second pass: applies the layout.
        for (var i = 0; i < danmakuList.length; ++i) {
            location = this.getAdvisedLocation(danmakuList[i]);
            this._locationList.push(location);
        }
        for (var i = 0; i < danmakuList.length; ++i) {
            location = this._locationList[i];
            if (!_util_1._util.isUndefinedOrNull(location)) {
                danmakuList[i].x = location.x;
                danmakuList[i].y = location.y;
            }
        }
    };
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
    return DanmakuLayoutManagerBase;
})();
exports.DanmakuLayoutManagerBase = DanmakuLayoutManagerBase;

//# sourceMappingURL=DanmakuLayoutManagerBase.js.map
