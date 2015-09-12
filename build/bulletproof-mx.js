/**
 * Created by MIC on 2015/9/9.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../include/bulletproof-flash.d.ts"/>
var bulletproof_flash = require("./bulletproof-flash");
var bulletproof;
(function (bulletproof) {
    var mx;
    (function (mx) {
        var flash = bulletproof_flash.bulletproof.flash;
        var containers;
        (function (containers) {
            // The class located as mentioned in
            // http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/mx/containers/Canvas.html.
            // However, the hierarchy is too complicated, so only the most important members are implemented here.
            var Canvas = (function (_super) {
                __extends(Canvas, _super);
                function Canvas(root, parent) {
                    _super.call(this, root, parent, false);
                }
                return Canvas;
            })(flash.display.DisplayObjectContainer);
            containers.Canvas = Canvas;
        })(containers = mx.containers || (mx.containers = {}));
    })(mx = bulletproof.mx || (bulletproof.mx = {}));
})(bulletproof = exports.bulletproof || (exports.bulletproof = {}));
//# sourceMappingURL=bulletproof-mx.js.map