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
    CodeDanmakuProvider.prototype.dispose = function () {
        this._layoutManager.dispose();
        this._layoutManager = null;
        for (var i = 0; i < this.danmakuList.length; ++i) {
            this.danmakuList[i].dispose();
        }
        while (this.danmakuList.length > 0) {
            this.danmakuList.pop();
        }
    };
    CodeDanmakuProvider.prototype.addDanmaku = function (content) {
        if (this.danmakuCoordinator.shouldCreateDanmaku(this)) {
            var bulletproof = this.danmakuCoordinator.bulletproof;
            var danmaku = new CodeDanmaku_1.CodeDanmaku(bulletproof.stage, bulletproof.stage, this.layoutManager);
            // Add to the last position of all currently active damakus to ensure being drawn as topmost.
            bulletproof.stage.addChild(danmaku);
            danmaku.initialize(content, bulletproof.timeElapsed);
            this.danmakuList.unshift(danmaku);
            return danmaku;
        }
        else {
            return null;
        }
    };
    CodeDanmakuProvider.prototype.removeDanmaku = function (danmaku) {
        var index = this.danmakuList.indexOf(danmaku);
        if (index < 0) {
            return false;
        }
        else {
            var bulletproof = this.danmakuCoordinator.bulletproof;
            bulletproof.stage.removeChild(danmaku);
            this.danmakuList.splice(index, 1);
            danmaku.dispose();
            return true;
        }
    };
    Object.defineProperty(CodeDanmakuProvider.prototype, "layoutManager", {
        get: function () {
            return this._layoutManager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CodeDanmakuProvider.prototype, "danmakuList", {
        get: function () {
            return this._danmakuList;
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
    return CodeDanmakuProvider;
})(DanmakuProviderBase_1.DanmakuProviderBase);
exports.CodeDanmakuProvider = CodeDanmakuProvider;

//# sourceMappingURL=CodeDanmakuProvider.js.map
