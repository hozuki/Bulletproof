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
        this._displayingDanmakuList = null;
        this._coordinator = null;
        this._layoutManager = null;
        this._danmakuLayer = null;
        this._bulletproof = null;
        this._coordinator = coordinator;
        this._displayingDanmakuList = [];
        this._bulletproof = coordinator.bulletproof;
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
        this.updateDisplayDanmakuList();
        this.layoutManager.performLayout();
    };
    /**
     * Adds a danmaku with the given content and adds it into internal danmaku list.
     * A solid {@link IDanmaku} implementations determines how to interpret the given content.
     * This method must be overridden.
     * @param content {String} The content used to create a new danmaku.
     * @param [args] {*} Extra arguments used to create the danmaku. For example, the exact type must
     *                   be specified when creating a {@link SimpleDanmaku}.
     * @returns {IDanmaku} The created danmaku.
     */
    DanmakuProviderBase.prototype.addDanmaku = function (content, args) {
        if ((true || this.canCreateDanmaku(args)) && this.danmakuCoordinator.shouldCreateDanmaku(this)) {
            return this.__addDanmaku(content, args);
        }
        else {
            return null;
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
    Object.defineProperty(DanmakuProviderBase.prototype, "displayingDanmakuList", {
        /**
         * Gets the list including all displaying danmakus created and managed by this danmaku provider.
         * @returns {IDanmaku[]}
         */
        get: function () {
            return this._displayingDanmakuList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DanmakuProviderBase.prototype, "fullDanmakuList", {
        /**
         * Gets the list including all danmakus created and managed by this danmaku provider.
         * @returns {IDanmaku[]}
         */
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DanmakuProviderBase.prototype, "danmakuLayer", {
        /**
         * Gets the {@link DisplayObject} that contains danmakus of this {@link DanmakuProviderBase} as a layer.
         * @returns {DisplayObject}
         */
        get: function () {
            return this._danmakuLayer;
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
    Object.defineProperty(DanmakuProviderBase.prototype, "bulletproof", {
        /**
         * Gets the {@link Bulletproof} instance that controls this {@link DanmakuProviderBase}.
         * @returns {Bulletproof}
         */
        get: function () {
            return this._bulletproof;
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
