/**
 * Created by MIC on 2016/1/7.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BiliBiliDamakuApiObject_1 = require("./BiliBiliDamakuApiObject");
var NotImplementedError_1 = require("../../../lib/glantern/lib/glantern-utils/src/NotImplementedError");
var ScriptManager = (function (_super) {
    __extends(ScriptManager, _super);
    function ScriptManager(apiContainer) {
        _super.call(this, apiContainer);
    }
    ScriptManager.prototype.clearTimer = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    ScriptManager.prototype.clearEl = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    ScriptManager.prototype.clearTrigger = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    return ScriptManager;
})(BiliBiliDamakuApiObject_1.BiliBiliDamakuApiObject);
exports.ScriptManager = ScriptManager;

//# sourceMappingURL=ScriptManager.js.map
