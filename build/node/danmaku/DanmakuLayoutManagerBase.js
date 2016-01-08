/**
 * Created by MIC on 2015/12/28.
 */
var NotImplementedError_1 = require("../../lib/glantern/src/_util/NotImplementedError");
var DanmakuLayoutManagerBase = (function () {
    function DanmakuLayoutManagerBase(provider) {
        this._danmakuProvider = null;
        this._danmakuProvider = provider;
    }
    Object.defineProperty(DanmakuLayoutManagerBase.prototype, "danmakuKind", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DanmakuLayoutManagerBase.prototype, "danmakuProvider", {
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
