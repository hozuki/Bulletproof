/**
 * Created by MIC on 2015/12/28.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DisplayObjectContainer_1 = require("../../lib/glantern/src/flash/display/DisplayObjectContainer");
var NotImplementedError_1 = require("../../lib/glantern/src/_util/NotImplementedError");
var Bulletproof_1 = require("../Bulletproof");
/**
 * Base class exposing common service of a danmaku.
 * This class must be inherited.
 */
var DanmakuBase = (function (_super) {
    __extends(DanmakuBase, _super);
    /**
     * Creates a new danmaku.
     * @param root {Stage}
     * @param parent {DisplayObjectContainer}
     * @param layoutManager {DanmakuLayoutManagerBase} The layout manager that will be used for reversed queries.
     */
    function DanmakuBase(root, parent, layoutManager) {
        _super.call(this, root, parent);
        this._bornTime = 0;
        this._layoutManager = null;
        this._danmakuProvider = null;
        this._layoutManager = layoutManager;
        this._danmakuProvider = layoutManager.danmakuProvider;
        this._bornTime = layoutManager.danmakuProvider.danmakuCoordinator.bulletproof.timeElapsed;
    }
    Object.defineProperty(DanmakuBase.prototype, "danmakuKind", {
        /**
         * Gets the kind of this instance.
         * This property must be overridden.
         */
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DanmakuBase.prototype, "bornTime", {
        /**
         * Gets the born time of this instance, in milliseconds.
         * @returns {Number}
         */
        get: function () {
            return this._bornTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DanmakuBase.prototype, "lifeTime", {
        /**
         * Gets the life time of this instance, in seconds. The default value is
         * {@link Bulletproof.SIMPLE_DANMAKU_LIFE_TIME}. This property can be overridden to apply different life time
         * life time management strategies.
         * @returns {Number}
         */
        get: function () {
            return Bulletproof_1.Bulletproof.SIMPLE_DANMAKU_LIFE_TIME;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DanmakuBase.prototype, "layoutManager", {
        /**
         * Gets the danmaku layout manager specified at the time of creation.
         * @returns {DanmakuLayoutManagerBase}
         */
        get: function () {
            return this._layoutManager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DanmakuBase.prototype, "danmakuProvider", {
        /**
         * Gets the danmaku provider of the danmaku layout manager specified at the time of creation.
         * @returns {DanmakuProviderBase}
         */
        get: function () {
            return this._danmakuProvider;
        },
        enumerable: true,
        configurable: true
    });
    return DanmakuBase;
})(DisplayObjectContainer_1.DisplayObjectContainer);
exports.DanmakuBase = DanmakuBase;

//# sourceMappingURL=DanmakuBase.js.map
