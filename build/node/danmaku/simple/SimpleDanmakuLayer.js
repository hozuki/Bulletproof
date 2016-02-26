/**
 * Created by MIC on 2016/2/2.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TextField_1 = require("../../../lib/glantern/src/flash/text/TextField");
var RenderHelper_1 = require("../../../lib/glantern/src/webgl/RenderHelper");
var GLUtil_1 = require("../../../lib/glantern/lib/glantern-utils/src/GLUtil");
var SimpleDanmakuLayer = (function (_super) {
    __extends(SimpleDanmakuLayer, _super);
    function SimpleDanmakuLayer(root, parent, provider) {
        _super.call(this, root, parent);
        this._provider = null;
        this._provider = provider;
    }
    Object.defineProperty(SimpleDanmakuLayer.prototype, "danmakuProvider", {
        get: function () {
            return this._provider;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleDanmakuLayer.prototype, "context2D", {
        get: function () {
            return this._context2D;
        },
        enumerable: true,
        configurable: true
    });
    SimpleDanmakuLayer.prototype.__update = function () {
        if (this.danmakuProvider.displayingDanmakuList.length > 0) {
            this._canvasTarget.updateImageSize();
            this.__drawTextElements(this.context2D);
        }
    };
    SimpleDanmakuLayer.prototype.__render = function (renderer) {
        if (this.visible && this.alpha > 0 && this.danmakuProvider.displayingDanmakuList.length > 0) {
            this._canvasTarget.updateImageContent();
            RenderHelper_1.RenderHelper.copyImageContent(renderer, this._canvasTarget, renderer.currentRenderTarget, false, true, this.transform.matrix3D, this.alpha, false);
        }
    };
    SimpleDanmakuLayer.prototype.__drawTextElements = function (context2D) {
        var danmaku;
        var lastDanmaku = null;
        var danmakuList = this.danmakuProvider.displayingDanmakuList;
        context2D.clearRect(0, 0, context2D.canvas.width, context2D.canvas.height);
        for (var i = 0; i < danmakuList.length; ++i) {
            danmaku = danmakuList[i];
            this.__drawSimpleDanmaku(context2D, danmaku, lastDanmaku);
            lastDanmaku = danmaku;
        }
    };
    SimpleDanmakuLayer.prototype.__drawSimpleDanmaku = function (context2D, danmaku, last) {
        if (!danmaku.visible) {
            return;
        }
        var x = danmaku.x, y = danmaku.y;
        var cp = danmaku.createParams;
        var baseX = cp.outline && cp.outlineThickness > 0 ? cp.outlineThickness : 0;
        var baseY = baseX;
        var borderThickness = cp.border && cp.borderThickness > 0 ? cp.borderThickness : 0;
        if (GLUtil_1.GLUtil.isUndefinedOrNull(last) || cp.fontName !== last.createParams.fontName || cp.fontSize !== last.createParams.fontSize) {
            context2D.font = cp.fontStyle.toString() + " " + cp.fontSize.toString() + "pt \"" + cp.fontName + "\"";
        }
        var textWidth = danmaku.textWidth;
        // See TextField.ts.
        var textHeight = danmaku.textHeight;
        if (cp.background) {
            context2D.fillStyle = GLUtil_1.GLUtil.colorToCssSharp(cp.backgroundColor);
            context2D.fillRect(x, y, textWidth + borderThickness * 2, textHeight + borderThickness * 2);
        }
        context2D.fillStyle = GLUtil_1.GLUtil.colorToCssSharp(cp.textColor);
        context2D.fillText(danmaku.getText(), x + baseX + borderThickness, y + textHeight * 0.75 + borderThickness);
        if (cp.outline && cp.outlineThickness > 0) {
            context2D.lineWidth = cp.outlineThickness;
            context2D.strokeStyle = GLUtil_1.GLUtil.colorToCssSharp(cp.outlineColor);
            context2D.strokeText(danmaku.getText(), x + baseX + borderThickness, y + textHeight * 0.75 + borderThickness);
        }
        if (cp.border && cp.borderThickness > 0) {
            context2D.lineWidth = cp.borderThickness;
            context2D.strokeStyle = GLUtil_1.GLUtil.colorToCssSharp(cp.borderColor);
            context2D.strokeRect(x + borderThickness, y + borderThickness, textWidth + borderThickness * 2, this.textHeight + borderThickness * 2);
        }
    };
    return SimpleDanmakuLayer;
})(TextField_1.TextField);
exports.SimpleDanmakuLayer = SimpleDanmakuLayer;

//# sourceMappingURL=SimpleDanmakuLayer.js.map
