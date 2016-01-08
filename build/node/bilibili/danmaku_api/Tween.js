/**
 * Created by MIC on 2016/1/7.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NotImplementedError_1 = require("../../../lib/glantern/src/_util/NotImplementedError");
var BiliBiliDamakuApiObject_1 = require("./BiliBiliDamakuApiObject");
var Tween = (function (_super) {
    __extends(Tween, _super);
    function Tween(apiContainer) {
        _super.call(this, apiContainer);
    }
    Tween.prototype.tween = function (object, dest, src, duration, easing) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Tween.prototype.to = function (object, dest, duration, easing) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Tween.prototype.bezier = function (object, dest, src, control) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Tween.prototype.scale = function (src, scale) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Tween.prototype.delay = function (src, delay) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Tween.prototype.reverse = function (src) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Tween.prototype.repeat = function (src, times) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Tween.prototype.slice = function (src, from, to) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Tween.prototype.serial = function (src1) {
        var other = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            other[_i - 1] = arguments[_i];
        }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Tween.prototype.parallel = function (src1) {
        var other = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            other[_i - 1] = arguments[_i];
        }
        throw new NotImplementedError_1.NotImplementedError();
    };
    return Tween;
})(BiliBiliDamakuApiObject_1.BiliBiliDamakuApiObject);
exports.Tween = Tween;

//# sourceMappingURL=Tween.js.map
