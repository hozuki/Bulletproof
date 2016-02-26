/**
 * Created by MIC on 2016/1/7.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Tween_1 = require("../../../lib/glantern/src/fl/transitions/Tween");
var NotImplementedError_1 = require("../../../lib/glantern/lib/glantern-utils/src/NotImplementedError");
var TweenImpl = (function (_super) {
    __extends(TweenImpl, _super);
    function TweenImpl(obj, prop, func, begin, finish, duration, useSeconds) {
        if (useSeconds === void 0) { useSeconds = false; }
        _super.call(this, obj, prop, func, begin, finish, duration, useSeconds);
        this.stopOnComplete = true;
    }
    TweenImpl.prototype.play = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TweenImpl.prototype.stop = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TweenImpl.prototype.gotoAndPlay = function (time) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TweenImpl.prototype.gotoAndStop = function (time) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TweenImpl.prototype.togglePause = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    return TweenImpl;
})(Tween_1.Tween);
exports.TweenImpl = TweenImpl;

//# sourceMappingURL=TweenImpl.js.map
