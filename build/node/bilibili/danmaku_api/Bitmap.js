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
var Rectangle_1 = require("../../../lib/glantern/src/glantern/flash/geom/Rectangle");
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap(apiContainer) {
        _super.call(this, apiContainer);
    }
    Bitmap.prototype.createBitmapData = function (width, height, transparent, fillColor) {
        if (transparent === void 0) { transparent = true; }
        if (fillColor === void 0) { fillColor = 0xffffffff; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Bitmap.prototype.createRectangle = function (x, y, width, height) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        return new Rectangle_1.Rectangle(x, y, width, height);
    };
    Bitmap.prototype.createBitmap = function (params) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    return Bitmap;
})(BiliBiliDamakuApiObject_1.BiliBiliDamakuApiObject);
exports.Bitmap = Bitmap;

//# sourceMappingURL=Bitmap.js.map
