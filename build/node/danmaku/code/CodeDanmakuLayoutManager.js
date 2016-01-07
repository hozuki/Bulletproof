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
var NotImplementedError_1 = require("../../../lib/glantern/src/_util/NotImplementedError");
var CodeDanmakuLayoutManager = (function (_super) {
    __extends(CodeDanmakuLayoutManager, _super);
    function CodeDanmakuLayoutManager(provider) {
        _super.call(this, provider);
        this._danmakuProvider = provider;
    }
    CodeDanmakuLayoutManager.prototype.dispose = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    CodeDanmakuLayoutManager.prototype.getAdvisedLocation = function (danmaku) {
        // Code danmakus decide their locations by themselves.
        return null;
    };
    Object.defineProperty(CodeDanmakuLayoutManager.prototype, "danmakuProvider", {
        get: function () {
            return this._danmakuProvider;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CodeDanmakuLayoutManager.prototype, "danmakuKind", {
        get: function () {
            return DanmakuKind_1.DanmakuKind.Code;
        },
        enumerable: true,
        configurable: true
    });
    return CodeDanmakuLayoutManager;
})(DanmakuLayoutManagerBase_1.DanmakuLayoutManagerBase);
exports.CodeDanmakuLayoutManager = CodeDanmakuLayoutManager;

//# sourceMappingURL=CodeDanmakuLayoutManager.js.map
