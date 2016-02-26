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
var ScriptedDanmakuLayoutManager_1 = require("./ScriptedDanmakuLayoutManager");
var ScriptedDanmaku_1 = require("./ScriptedDanmaku");
var DanmakuProviderFlag_1 = require("../DanmakuProviderFlag");
var ScriptedDanmakuLayer_1 = require("./ScriptedDanmakuLayer");
var ScriptedDanmakuHelper_1 = require("./ScriptedDanmakuHelper");
var GLUtil_1 = require("../../../lib/glantern/lib/glantern-utils/src/GLUtil");
/**
 * An implementation of {@link DanmakuProviderBase}, for managing code damakus.
 */
var ScriptedDanmakuProvider = (function (_super) {
    __extends(ScriptedDanmakuProvider, _super);
    function ScriptedDanmakuProvider(coordinator) {
        _super.call(this, coordinator);
        this._layoutManager = new ScriptedDanmakuLayoutManager_1.ScriptedDanmakuLayoutManager(this);
    }
    Object.defineProperty(ScriptedDanmakuProvider.prototype, "danmakuKind", {
        get: function () {
            return DanmakuKind_1.DanmakuKind.Scripted;
        },
        enumerable: true,
        configurable: true
    });
    ScriptedDanmakuProvider.prototype.addDanmaku = function (content, args) {
        return _super.prototype.addDanmaku.call(this, content, args);
    };
    ScriptedDanmakuProvider.prototype.dispose = function () {
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
    ScriptedDanmakuProvider.prototype.initialize = function () {
        var stage = this.bulletproof.stage;
        this._danmakuLayer = new ScriptedDanmakuLayer_1.ScriptedDanmakuLayer(stage, stage);
        stage.addChild(this._danmakuLayer);
    };
    ScriptedDanmakuProvider.prototype.canCreateDanmaku = function (args) {
        return true;
    };
    ScriptedDanmakuProvider.prototype.removeDanmaku = function (danmaku) {
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
    ScriptedDanmakuProvider.prototype.isDanmakuDead = function (danmaku) {
        var timeElapsed = this.bulletproof.timeElapsed;
        if (timeElapsed < danmaku.bornTime) {
            return danmaku.executed;
        }
        else {
            return danmaku.bornTime + danmaku.lifeTime * 1000 < timeElapsed;
        }
    };
    ScriptedDanmakuProvider.prototype.update = function () {
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
    ScriptedDanmakuProvider.prototype.updateDisplayDanmakuList = function () {
        var danmaku;
        for (var i = 0; i < this.displayingDanmakuList.length; ++i) {
            danmaku = this.displayingDanmakuList[i];
            if (this.isDanmakuDead(danmaku)) {
                this.removeDanmaku(danmaku);
                --i;
            }
        }
    };
    Object.defineProperty(ScriptedDanmakuProvider.prototype, "layoutManager", {
        get: function () {
            return this._layoutManager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScriptedDanmakuProvider.prototype, "displayingDanmakuList", {
        get: function () {
            return this._displayingDanmakuList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScriptedDanmakuProvider.prototype, "fullDanmakuList", {
        get: function () {
            return this._displayingDanmakuList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScriptedDanmakuProvider.prototype, "danmakuLayer", {
        get: function () {
            return this._danmakuLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScriptedDanmakuProvider.prototype, "flags", {
        get: function () {
            return DanmakuProviderFlag_1.DanmakuProviderFlag.UnlimitedCreation;
        },
        enumerable: true,
        configurable: true
    });
    ScriptedDanmakuProvider.prototype.__addDanmaku = function (content, args) {
        if (GLUtil_1.GLUtil.isUndefinedOrNull(args)) {
            args = ScriptedDanmakuHelper_1.ScriptedDanmakuHelper.getDefaultParams(this.bulletproof.config);
        }
        var danmaku = new ScriptedDanmaku_1.ScriptedDanmaku(this.bulletproof.stage, this.danmakuLayer, this.layoutManager, args);
        // Add to the last position of all currently active damakus to ensure being drawn as topmost.
        this.danmakuLayer.addChild(danmaku);
        danmaku.initialize(content, this.bulletproof.timeElapsed);
        this.displayingDanmakuList.push(danmaku);
        return danmaku;
    };
    return ScriptedDanmakuProvider;
})(DanmakuProviderBase_1.DanmakuProviderBase);
exports.ScriptedDanmakuProvider = ScriptedDanmakuProvider;

//# sourceMappingURL=ScriptedDanmakuProvider.js.map
