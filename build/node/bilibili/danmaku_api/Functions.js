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
var GLUtil_1 = require("../../../lib/glantern/lib/glantern-utils/src/GLUtil");
var Functions = (function (_super) {
    __extends(Functions, _super);
    function Functions(apiContainer) {
        _super.call(this, apiContainer);
    }
    Functions.prototype.trace = function (message) {
        console.debug(message);
    };
    Functions.prototype.clear = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Functions.prototype.getTimer = function () {
        return this.apiContainer.bulletproof.timeElapsed;
    };
    Functions.prototype.timer = function (obj, delay) {
        return this.apiContainer.api.Utils.delay(obj, delay);
    };
    Functions.prototype.interval = function (obj, delay, times) {
        if (times === void 0) { times = 1; }
        return this.apiContainer.api.Utils.interval(obj, delay, times);
    };
    Functions.prototype.foreach = function (loop, f) {
        if (!GLUtil_1.GLUtil.isUndefinedOrNull(loop)) {
            for (var key in loop) {
                if (loop.hasOwnProperty(key)) {
                    f(key, loop[key]);
                }
            }
        }
    };
    Functions.prototype.clone = function (object) {
        return GLUtil_1.GLUtil.deepClone(object);
    };
    Functions.prototype.load = function (libraryName, onComplete) {
        var availableLibraries = [
            'libBitmap',
            'libStorage'
        ];
        var index = availableLibraries.indexOf(libraryName);
        if (index >= 0) {
            switch (index) {
                case 0:
                    break;
                case 1:
                    break;
                default:
                    break;
            }
        }
    };
    return Functions;
})(BiliBiliDamakuApiObject_1.BiliBiliDamakuApiObject);
exports.Functions = Functions;

//# sourceMappingURL=Functions.js.map
