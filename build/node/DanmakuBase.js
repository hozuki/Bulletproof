/**
 * Created by MIC on 2015/12/28.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DisplayObjectContainer_1 = require("../lib/glantern/src/flash/display/DisplayObjectContainer");
var NotImplementedError_1 = require("../lib/glantern/src/_util/NotImplementedError");
var DanmakuBase = (function (_super) {
    __extends(DanmakuBase, _super);
    function DanmakuBase(root, parent, layoutManager) {
        _super.call(this, root, parent);
        this._layoutManager = null;
        this._layoutManager = layoutManager;
    }
    Object.defineProperty(DanmakuBase.prototype, "danmakuKind", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DanmakuBase.prototype, "bornTime", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DanmakuBase.prototype, "lifeTime", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DanmakuBase.prototype, "layoutManager", {
        get: function () {
            return this._layoutManager;
        },
        enumerable: true,
        configurable: true
    });
    return DanmakuBase;
})(DisplayObjectContainer_1.DisplayObjectContainer);
exports.DanmakuBase = DanmakuBase;

//# sourceMappingURL=DanmakuBase.js.map
