/**
 * Created by MIC on 2015/12/29.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BiliBiliDamakuApiObject_1 = require("./BiliBiliDamakuApiObject");
var DCShape_1 = require("../../danmaku/scripted/dco/DCShape");
var CommentField_1 = require("./CommentField");
var Matrix_1 = require("../../../lib/glantern/src/flash/geom/Matrix");
var Point_1 = require("../../../lib/glantern/src/flash/geom/Point");
var NotImplementedError_1 = require("../../../lib/glantern/lib/glantern-utils/src/NotImplementedError");
var BitmapFilterQuality_1 = require("../../../lib/glantern/src/flash/filters/BitmapFilterQuality");
var GlowFilter_1 = require("../../../lib/glantern/src/flash/filters/GlowFilter");
var BlurFilter_1 = require("../../../lib/glantern/src/flash/filters/BlurFilter");
var Vector3D_1 = require("../../../lib/glantern/src/flash/geom/Vector3D");
var Matrix3D_1 = require("../../../lib/glantern/src/flash/geom/Matrix3D");
var ColorTransform_1 = require("../../../lib/glantern/src/flash/geom/ColorTransform");
var TextFormat_1 = require("../../../lib/glantern/src/flash/text/TextFormat");
var GLUtil_1 = require("../../../lib/glantern/lib/glantern-utils/src/GLUtil");
var Display = (function (_super) {
    __extends(Display, _super);
    function Display(apiContainer) {
        _super.call(this, apiContainer);
    }
    Object.defineProperty(Display.prototype, "fullScreenWidth", {
        get: function () {
            return window.screen.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Display.prototype, "fullScreenHeight", {
        get: function () {
            return window.screen.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Display.prototype, "width", {
        get: function () {
            return this.apiContainer.bulletproof.view.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Display.prototype, "height", {
        get: function () {
            return this.apiContainer.bulletproof.view.height;
        },
        enumerable: true,
        configurable: true
    });
    Display.prototype.createMatrix = function (a, b, c, d, tx, ty) {
        if (a === void 0) { a = 1; }
        if (b === void 0) { b = 0; }
        if (c === void 0) { c = 1; }
        if (d === void 0) { d = 1; }
        if (tx === void 0) { tx = 0; }
        if (ty === void 0) { ty = 0; }
        return new Matrix_1.Matrix(a, b, c, d, tx, ty);
    };
    Display.prototype.createPoint = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        return new Point_1.Point(x, y);
    };
    Display.prototype.createComment = function (text, params) {
        var danmaku = this.apiContainer.danmaku;
        var textField = new CommentField_1.CommentField(danmaku.stage, danmaku, params, this.__getExtraCreateParams());
        textField.text = text;
        textField.textColor = 0xffffff;
        // Use "Arial" as default font for users outside China.
        textField.defaultTextFormat.font = "SimHei";
        danmaku.addChild(textField);
        return textField;
    };
    Display.prototype.createShape = function (params) {
        var danmaku = this.apiContainer.danmaku;
        var shape = new DCShape_1.DCShape(danmaku.stage, danmaku, params, this.__getExtraCreateParams());
        danmaku.addChild(shape);
        return shape;
    };
    Display.prototype.createCanvas = function (params) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Display.prototype.createButton = function (text, params) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Display.prototype.createGlowFilter = function (color, alpha, blurX, blurY, strength, quality, inner, knockout) {
        if (color === void 0) { color = 0xff0000; }
        if (alpha === void 0) { alpha = 1.0; }
        if (blurX === void 0) { blurX = 6.0; }
        if (blurY === void 0) { blurY = 6.0; }
        if (strength === void 0) { strength = 2; }
        if (quality === void 0) { quality = BitmapFilterQuality_1.BitmapFilterQuality.LOW; }
        if (inner === void 0) { inner = false; }
        if (knockout === void 0) { knockout = false; }
        var renderer = this.apiContainer.danmaku.stage.worldRenderer;
        return new GlowFilter_1.GlowFilter(renderer.filterManager, color, alpha, blurX, blurY, strength, quality, inner, knockout);
    };
    Display.prototype.createBlurFilter = function (blurX, blurY, quality) {
        if (blurX === void 0) { blurX = 4.0; }
        if (blurY === void 0) { blurY = 4.0; }
        if (quality === void 0) { quality = BitmapFilterQuality_1.BitmapFilterQuality.LOW; }
        var renderer = this.apiContainer.danmaku.stage.worldRenderer;
        return new BlurFilter_1.BlurFilter(renderer.filterManager, blurX, blurY, quality);
    };
    Display.prototype.toIntVector = function (array) {
        // jabbany
        Object.defineProperty(array, "as3Type", {
            get: function () {
                return "Vector.<int>";
            }
        });
        return array;
    };
    Display.prototype.toUIntVector = function (array) {
        // jabbany
        Object.defineProperty(array, "as3Type", {
            get: function () {
                return "Vector.<uint>";
            }
        });
        return array;
    };
    Display.prototype.toNumberVector = function (array) {
        // jabbany
        Object.defineProperty(array, "as3Type", {
            get: function () {
                return "Vector.<number>";
            }
        });
        return array;
    };
    Display.prototype.createVector3D = function (x, y, z, w) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        if (w === void 0) { w = 0; }
        return new Vector3D_1.Vector3D(x, y, z, w);
    };
    Display.prototype.createMatrix3D = function (a) {
        if (a === void 0) { a = null; }
        return new Matrix3D_1.Matrix3D(a);
    };
    Display.prototype.createColorTransform = function () {
        return new ColorTransform_1.ColorTransform();
    };
    Display.prototype.createTextFormat = function () {
        return new TextFormat_1.TextFormat();
    };
    Display.prototype.createGraphic = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Display.prototype.projectVector = function (matrix, vector) {
        return matrix.transformVector(vector);
    };
    Display.prototype.projectVectors = function (matrix, vertices, projectedVertices, uvts) {
        while (projectedVertices.length > 0) {
            projectedVertices.pop();
        }
        if (vertices.length % 3 != 0) {
            GLUtil_1.GLUtil.trace("Display.projectVectors input vertex Vector must be a multiple of 3.");
            return;
        }
        var transformed = [];
        matrix.transformVectors(vertices, transformed);
        for (var i = 0; i < transformed.length / 3; i++) {
            var x = transformed[i * 3], y = transformed[i * 3 + 1];
            projectedVertices.push(x, y);
        }
    };
    return Display;
})(BiliBiliDamakuApiObject_1.BiliBiliDamakuApiObject);
exports.Display = Display;

//# sourceMappingURL=Display.js.map
