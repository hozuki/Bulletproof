/**
 * Created by MIC on 2015/12/29.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BiliBiliDamakuApiObject_1 = require("./BiliBiliDamakuApiObject");
var FiniteTimer_1 = require("../../danmaku/scripted/dco/FiniteTimer");
var GLUtil_1 = require("../../../lib/glantern/lib/glantern-utils/src/GLUtil");
var Utils = (function (_super) {
    __extends(Utils, _super);
    function Utils(apiContainer) {
        _super.call(this, apiContainer);
        this._date = null;
        this._date = new Date();
    }
    Utils.prototype.hue = function (v) {
        v = v % 360;
        // http://blog.sina.com.cn/s/blog_5de73d0b0101baxq.html
        var lambda = v / 60 * 255;
        var r = GLUtil_1.GLUtil.limitInto(510 - lambda, 0, 255);
        var g = GLUtil_1.GLUtil.limitInto(v < 180 ? lambda : lambda - 510, 0, 255);
        var b = GLUtil_1.GLUtil.limitInto(v < 180 ? lambda - 510 : lambda, 0, 255);
        return (0xff << 24) | (r << 16) | (g << 8) | b;
    };
    Utils.prototype.rgb = function (r, g, b) {
        r = GLUtil_1.GLUtil.limitInto(r, 0, 255);
        g = GLUtil_1.GLUtil.limitInto(g, 0, 255);
        b = GLUtil_1.GLUtil.limitInto(b, 0, 255);
        return (0xff << 24) | (r << 16) | (g << 8) | b;
    };
    Utils.prototype.formatTimes = function (time) {
        this._date.setTime(time * 1000);
        return this._date.toLocaleString();
    };
    Utils.prototype.delay = function (obj, delay) {
        return window.setTimeout(obj, delay);
    };
    Utils.prototype.interval = function (obj, delay, times) {
        return new FiniteTimer_1.FiniteTimer(obj, delay, times);
    };
    Utils.prototype.distance = function (x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    };
    Utils.prototype.rand = function (min, max) {
        console.assert(min < max, "'max' must be bigger than 'min'.");
        return Math.random() * (max - min) + min;
    };
    return Utils;
})(BiliBiliDamakuApiObject_1.BiliBiliDamakuApiObject);
exports.Utils = Utils;

//# sourceMappingURL=Utils.js.map
