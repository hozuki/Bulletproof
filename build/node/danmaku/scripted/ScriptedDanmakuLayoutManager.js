/**
 * Created by MIC on 2015/12/28.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DanmakuLayoutManagerBase_1 = require("../DanmakuLayoutManagerBase");
var DanmakuKind_1 = require("../DanmakuKind");
var ScriptedDanmakuLayoutManager = (function (_super) {
    __extends(ScriptedDanmakuLayoutManager, _super);
    function ScriptedDanmakuLayoutManager(provider) {
        _super.call(this, provider);
        this._danmakuProvider = provider;
    }
    ScriptedDanmakuLayoutManager.prototype.dispose = function () {
    };
    ScriptedDanmakuLayoutManager.prototype.performLayout = function () {
        // Do nothing.
    };
    ScriptedDanmakuLayoutManager.prototype.onStageResize = function (sender, e) {
    };
    Object.defineProperty(ScriptedDanmakuLayoutManager.prototype, "danmakuProvider", {
        get: function () {
            return this._danmakuProvider;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScriptedDanmakuLayoutManager.prototype, "danmakuKind", {
        get: function () {
            return DanmakuKind_1.DanmakuKind.Scripted;
        },
        enumerable: true,
        configurable: true
    });
    return ScriptedDanmakuLayoutManager;
})(DanmakuLayoutManagerBase_1.DanmakuLayoutManagerBase);
exports.ScriptedDanmakuLayoutManager = ScriptedDanmakuLayoutManager;

//# sourceMappingURL=ScriptedDanmakuLayoutManager.js.map
