/**
 * Created by MIC on 2015/12/28.
 */
var DanmakuKind_1 = require("../DanmakuKind");
var SimpleDanmaku = (function () {
    function SimpleDanmaku(layoutManager, createParams) {
        /**
         * Gets/sets whether the Y position of this {@link SimpleDanmaku} is set. If the it is set, the {@link SimpleDanmakuLayoutManager}
         * should only change the value of X position since sudden modification to Y position will confuse audiences.
         * However, considering that size of the stage may change, simple danmakus fixed at bottom (bottom, bottom left,
         * bottom right) should recalculate their Y positions to fit in the change.
         * @type {Boolean}
         */
        this.isYPositionSet = false;
        /**
         * X coordinate of the top left point of this {@link SimpleDanmaku}.
         * @type {Number}
         */
        this.x = 0;
        /**
         * Y coordinate of the top left point of this {@link SimpleDanmaku}.
         * @type {Number}
         */
        this.y = 0;
        this.visible = false;
        this.displaying = false;
        this._content = null;
        this._bornTime = 0;
        this._bulletproof = null;
        this._createParams = null;
        this._textWidth = -1;
        this._textHeight = -1;
        this._layoutManager = layoutManager;
        this._danmakuProvider = layoutManager.danmakuProvider;
        this._bulletproof = layoutManager.bulletproof;
        this._createParams = createParams;
    }
    SimpleDanmaku.prototype.dispose = function () {
    };
    Object.defineProperty(SimpleDanmaku.prototype, "danmakuKind", {
        get: function () {
            return DanmakuKind_1.DanmakuKind.Simple;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleDanmaku.prototype, "layoutManager", {
        get: function () {
            return this._layoutManager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleDanmaku.prototype, "danmakuProvider", {
        get: function () {
            return this._danmakuProvider;
        },
        enumerable: true,
        configurable: true
    });
    SimpleDanmaku.prototype.getContent = function () {
        return this._content;
    };
    SimpleDanmaku.prototype.getText = function () {
        return this._content;
    };
    SimpleDanmaku.prototype.initialize = function (content, time) {
        this._content = content;
        this._bornTime = typeof this.createParams.bornTime === "number" ? this.createParams.bornTime : time;
    };
    Object.defineProperty(SimpleDanmaku.prototype, "bulletproof", {
        get: function () {
            return this._bulletproof;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleDanmaku.prototype, "bornTime", {
        get: function () {
            return this._bornTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleDanmaku.prototype, "lifeTime", {
        get: function () {
            return this.bulletproof.config.simpleDanmakuLifeTimeSecs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleDanmaku.prototype, "createParams", {
        get: function () {
            return this._createParams;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleDanmaku.prototype, "textHeight", {
        get: function () {
            if (this._textHeight < 0) {
                this._textHeight = this.createParams.fontSize * 1.5;
            }
            return this._textHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleDanmaku.prototype, "textWidth", {
        get: function () {
            if (this._textWidth < 0) {
                var context2D = this.danmakuProvider.danmakuLayer.context2D;
                context2D.font = this.createParams.fontSize.toString() + "pt \"" + this.createParams.fontName + "\"";
                this._textWidth = context2D.measureText(this.getText()).width;
            }
            return this._textWidth;
        },
        enumerable: true,
        configurable: true
    });
    return SimpleDanmaku;
})();
exports.SimpleDanmaku = SimpleDanmaku;

//# sourceMappingURL=SimpleDanmaku.js.map
