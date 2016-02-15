/**
 * Created by MIC on 2015/12/28.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DanmakuProviderBase_1 = require("../DanmakuProviderBase");
var DanmakuKind_1 = require("../DanmakuKind");
var CodeDanmakuLayoutManager_1 = require("./CodeDanmakuLayoutManager");
var CodeDanmaku_1 = require("./CodeDanmaku");
var DanmakuProviderFlag_1 = require("../DanmakuProviderFlag");
var CodeDanmakuLayer_1 = require("./CodeDanmakuLayer");
var _util_1 = require("../../../lib/glantern/src/_util/_util");
var CodeDanmakuHelper_1 = require("./CodeDanmakuHelper");
/**
 * An implementation of {@link DanmakuProviderBase}, for managing code damakus.
 */
var CodeDanmakuProvider = (function (_super) {
    __extends(CodeDanmakuProvider, _super);
    function CodeDanmakuProvider(coordinator) {
        _super.call(this, coordinator);
        this._layoutManager = new CodeDanmakuLayoutManager_1.CodeDanmakuLayoutManager(this);
    }
    Object.defineProperty(CodeDanmakuProvider.prototype, "danmakuKind", {
        get: function () {
            return DanmakuKind_1.DanmakuKind.Code;
        },
        enumerable: true,
        configurable: true
    });
    CodeDanmakuProvider.prototype.addDanmaku = function (content, args) {
        return _super.prototype.addDanmaku.call(this, content, args);
    };
    CodeDanmakuProvider.prototype.dispose = function () {
        this._danmakuLayer.parent.removeChild(this._danmakuLayer);
        this._danmakuLayer.dispose();
        this._layoutManager.dispose();
        this._layoutManager = null;
        for (var i = 0; i < this.displayingDanmakuList.length; ++i) {
            this.displayingDanmakuList[i].dispose();
        }
        while (this.displayingDanmakuList.length > 0) {
            this.displayingDanmakuList.pop();
        }
        this._danmakuLayer = null;
        this._displayingDanmakuList = null;
    };
    CodeDanmakuProvider.prototype.initialize = function () {
        var stage = this.bulletproof.stage;
        this._danmakuLayer = new CodeDanmakuLayer_1.CodeDanmakuLayer(stage, stage);
        stage.addChild(this._danmakuLayer);
    };
    CodeDanmakuProvider.prototype.canCreateDanmaku = function (args) {
        return true;
    };
    CodeDanmakuProvider.prototype.removeDanmaku = function (danmaku) {
        var index = this.displayingDanmakuList.indexOf(danmaku);
        if (index < 0) {
            return false;
        }
        else {
            this.bulletproof.stage.removeChild(danmaku);
            this.displayingDanmakuList.splice(index, 1);
            danmaku.dispose();
            return true;
        }
    };
    CodeDanmakuProvider.prototype.isDanmakuDead = function (danmaku) {
        var timeElapsed = this.bulletproof.timeElapsed;
        if (timeElapsed < danmaku.bornTime) {
            return danmaku.executed;
        }
        else {
            return danmaku.bornTime + danmaku.lifeTime * 1000 < timeElapsed;
        }
    };
    CodeDanmakuProvider.prototype.update = function () {
        _super.prototype.update.call(this);
        var danmaku;
        var timeElapsed = this.bulletproof.timeElapsed;
        for (var i = 0; i < this.displayingDanmakuList.length; ++i) {
            danmaku = this.displayingDanmakuList[i];
            if (!danmaku.executed && timeElapsed >= danmaku.bornTime) {
                danmaku.execute();
            }
        }
    };
    CodeDanmakuProvider.prototype.updateDisplayDanmakuList = function () {
        var danmaku;
        for (var i = 0; i < this.displayingDanmakuList.length; ++i) {
            danmaku = this.displayingDanmakuList[i];
            if (this.isDanmakuDead(danmaku)) {
                this.removeDanmaku(danmaku);
                --i;
            }
        }
    };
    Object.defineProperty(CodeDanmakuProvider.prototype, "layoutManager", {
        get: function () {
            return this._layoutManager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CodeDanmakuProvider.prototype, "displayingDanmakuList", {
        get: function () {
            return this._displayingDanmakuList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CodeDanmakuProvider.prototype, "fullDanmakuList", {
        get: function () {
            return this._displayingDanmakuList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CodeDanmakuProvider.prototype, "danmakuLayer", {
        get: function () {
            return this._danmakuLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CodeDanmakuProvider.prototype, "flags", {
        get: function () {
            return DanmakuProviderFlag_1.DanmakuProviderFlag.UnlimitedCreation;
        },
        enumerable: true,
        configurable: true
    });
    CodeDanmakuProvider.prototype.__addDanmaku = function (content, args) {
        if (_util_1._util.isUndefinedOrNull(args)) {
            args = CodeDanmakuHelper_1.CodeDanmakuHelper.getDefaultParams(this.bulletproof.config);
        }
        var danmaku = new CodeDanmaku_1.CodeDanmaku(this.bulletproof.stage, this.danmakuLayer, this.layoutManager, args);
        // Add to the last position of all currently active damakus to ensure being drawn as topmost.
        this.danmakuLayer.addChild(danmaku);
        danmaku.initialize(content, this.bulletproof.timeElapsed);
        this.displayingDanmakuList.push(danmaku);
        return danmaku;
    };
    return CodeDanmakuProvider;
})(DanmakuProviderBase_1.DanmakuProviderBase);
exports.CodeDanmakuProvider = CodeDanmakuProvider;

//# sourceMappingURL=CodeDanmakuProvider.js.map
