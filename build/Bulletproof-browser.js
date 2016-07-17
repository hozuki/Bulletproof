(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
"use strict";
var transitions = require("./transitions/index");
exports.transitions = transitions;



},{"./transitions/index":18}],2:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventDispatcher_1 = require("../../flash/events/EventDispatcher");
var NotImplementedError_1 = require("../../flash/errors/NotImplementedError");
var Tween = (function (_super) {
    __extends(Tween, _super);
    function Tween(obj, prop, func, begin, finish, duration, useSeconds) {
        if (useSeconds === void 0) { useSeconds = false; }
        _super.call(this);
        this.begin = NaN;
        this.duration = 5;
        this.finish = 5;
        this.FPS = 60;
        this.func = null;
        this.isPlaying = false;
        this.looping = false;
        this.obj = null;
        this.position = 0;
        this.prop = null;
        this.time = 0;
        this.useSeconds = false;
        this.obj = obj;
        this.prop = prop;
        this.func = func;
        this.begin = begin;
        this.finish = finish;
        this.duration = duration;
        this.useSeconds = useSeconds;
    }
    Tween.prototype.continueTo = function (finish, duration) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Tween.prototype.fforward = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Tween.prototype.nextFrame = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Tween.prototype.prevFrame = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Tween.prototype.resume = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Tween.prototype.rewind = function (t) {
        if (t === void 0) { t = 0; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Tween.prototype.start = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Tween.prototype.stop = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Tween.prototype.yoyo = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    return Tween;
}(EventDispatcher_1.EventDispatcher));
exports.Tween = Tween;



},{"../../flash/errors/NotImplementedError":51,"../../flash/events/EventDispatcher":53}],3:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FlashEvent_1 = require("../../flash/events/FlashEvent");
var NotImplementedError_1 = require("../../flash/errors/NotImplementedError");
var TweenEvent = (function (_super) {
    __extends(TweenEvent, _super);
    function TweenEvent(type, time, position, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
        this._position = NaN;
        this._time = NaN;
        this._position = position;
        this._time = time;
    }
    TweenEvent.prototype.clone = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Object.defineProperty(TweenEvent, "MOTION_CHANGE", {
        get: function () {
            return 'motionChange';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TweenEvent, "MOTION_FINISH", {
        get: function () {
            return 'motionFinish';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TweenEvent, "MOTION_LOOP", {
        get: function () {
            return 'motionLoop';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TweenEvent, "MOTION_RESUME", {
        get: function () {
            return 'motionResume';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TweenEvent, "MOTION_START", {
        get: function () {
            return 'motionStart';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TweenEvent, "MOTION_STOP", {
        get: function () {
            return 'motionStop';
        },
        enumerable: true,
        configurable: true
    });
    return TweenEvent;
}(FlashEvent_1.FlashEvent));
exports.TweenEvent = TweenEvent;



},{"../../flash/errors/NotImplementedError":51,"../../flash/events/FlashEvent":54}],4:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
"use strict";
var Back = (function () {
    function Back() {
    }
    Back.easeIn = function (t, b, c, d, s) {
        if (s === void 0) { s = 0; }
        //if (typeof s == "undefined") s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    };
    Back.easeInOut = function (t, b, c, d, s) {
        if (s === void 0) { s = 0; }
        //if (typeof s == "undefined") s = 1.70158;
        if ((t /= d / 2) < 1) {
            return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        }
        else {
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        }
    };
    Back.easeOut = function (t, b, c, d, s) {
        if (s === void 0) { s = 0; }
        //if (typeof s == "undefined") s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    };
    return Back;
}());
exports.Back = Back;



},{}],5:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
"use strict";
var Bounce = (function () {
    function Bounce() {
    }
    Bounce.easeIn = function (t, b, c, d) {
        return c - Bounce.easeOut(d - t, 0, c, d) + b;
    };
    Bounce.easeInOut = function (t, b, c, d) {
        if (t < d / 2) {
            return Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
        }
        else {
            return Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    };
    Bounce.easeOut = function (t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        }
        else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        }
        else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        }
        else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    };
    return Bounce;
}());
exports.Bounce = Bounce;



},{}],6:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
"use strict";
var Circular = (function () {
    function Circular() {
    }
    Circular.easeIn = function (t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    };
    Circular.easeInOut = function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        }
        else {
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    };
    Circular.easeOut = function (t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    };
    return Circular;
}());
exports.Circular = Circular;



},{}],7:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
"use strict";
var Cubic = (function () {
    function Cubic() {
    }
    Cubic.easeIn = function (t, b, c, d) {
        return c * (t /= d) * t * t + b;
    };
    Cubic.easeInOut = function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t + b;
        }
        else {
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        }
    };
    Cubic.easeOut = function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    };
    return Cubic;
}());
exports.Cubic = Cubic;



},{}],8:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
"use strict";
var Elastic = (function () {
    function Elastic() {
    }
    Elastic.easeIn = function (t, b, c, d, a, p) {
        if (a === void 0) { a = 0; }
        if (p === void 0) { p = 0; }
        var s;
        if (t == 0)
            return b;
        if ((t /= d) == 1)
            return b + c;
        //if (typeof p == "undefined") p = d * .3;
        if (!a || a < Math.abs(c)) {
            s = p / 4;
            a = c;
        }
        else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    };
    Elastic.easeInOut = function (t, b, c, d, a, p) {
        if (a === void 0) { a = 0; }
        if (p === void 0) { p = 0; }
        var s;
        if (t == 0)
            return b;
        if ((t /= d / 2) == 2)
            return b + c;
        //if (typeof p == "undefined") p = d * (.3 * 1.5);
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        if (t < 1)
            return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    };
    Elastic.easeOut = function (t, b, c, d, a, p) {
        if (a === void 0) { a = 0; }
        if (p === void 0) { p = 0; }
        var s;
        if (t == 0)
            return b;
        if ((t /= d) == 1)
            return b + c;
        //if (typeof p == "undefined") p = d * .3;
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
    };
    return Elastic;
}());
exports.Elastic = Elastic;



},{}],9:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
"use strict";
var Exponential = (function () {
    function Exponential() {
    }
    Exponential.easeIn = function (t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    };
    Exponential.easeInOut = function (t, b, c, d) {
        if (t == 0)
            return b;
        if (t == d)
            return b + c;
        if ((t /= d / 2) < 1)
            return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    };
    Exponential.easeOut = function (t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    };
    return Exponential;
}());
exports.Exponential = Exponential;



},{}],10:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
"use strict";
var None = (function () {
    function None() {
    }
    None.easeIn = function (t, b, c, d) {
        return c * t / d + b;
    };
    None.easeInOut = function (t, b, c, d) {
        return c * t / d + b;
    };
    None.easeNone = function (t, b, c, d) {
        return t < d ? b : b + c;
    };
    None.easeOut = function (t, b, c, d) {
        return c * t / d + b;
    };
    return None;
}());
exports.None = None;



},{}],11:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
"use strict";
var Quadratic = (function () {
    function Quadratic() {
    }
    Quadratic.easeIn = function (t, b, c, d) {
        return c * (t /= d) * t + b;
    };
    Quadratic.easeInOut = function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t + b;
        }
        else {
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        }
    };
    Quadratic.easeOut = function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    };
    return Quadratic;
}());
exports.Quadratic = Quadratic;



},{}],12:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
"use strict";
var Quartic = (function () {
    function Quartic() {
    }
    Quartic.easeIn = function (t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    };
    Quartic.easeInOut = function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t * t + b;
        }
        else {
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        }
    };
    Quartic.easeOut = function (t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    };
    return Quartic;
}());
exports.Quartic = Quartic;



},{}],13:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
"use strict";
var Quintic = (function () {
    function Quintic() {
    }
    Quintic.easeIn = function (t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    };
    Quintic.easeInOut = function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t * t * t + b;
        }
        else {
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        }
    };
    Quintic.easeOut = function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    };
    return Quintic;
}());
exports.Quintic = Quintic;



},{}],14:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
"use strict";
var NotImplementedError_1 = require("../../../flash/errors/NotImplementedError");
var Regular = (function () {
    function Regular() {
    }
    Regular.easeIn = function (t, b, c, d) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Regular.easeInOut = function (t, b, c, d) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Regular.easeOut = function (t, b, c, d) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    return Regular;
}());
exports.Regular = Regular;



},{"../../../flash/errors/NotImplementedError":51}],15:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
"use strict";
var Sine = (function () {
    function Sine() {
    }
    Sine.easeIn = function (t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    };
    Sine.easeInOut = function (t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    };
    Sine.easeOut = function (t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    };
    return Sine;
}());
exports.Sine = Sine;



},{}],16:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
"use strict";
var NotImplementedError_1 = require("../../../flash/errors/NotImplementedError");
var Strong = (function () {
    function Strong() {
    }
    Strong.easeIn = function (t, b, c, d) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Strong.easeInOut = function (t, b, c, d) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Strong.easeOut = function (t, b, c, d) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    return Strong;
}());
exports.Strong = Strong;



},{"../../../flash/errors/NotImplementedError":51}],17:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./Back"));
__export(require("./Bounce"));
__export(require("./Circular"));
__export(require("./Cubic"));
__export(require("./Elastic"));
__export(require("./Exponential"));
__export(require("./None"));
__export(require("./Quadratic"));
__export(require("./Quartic"));
__export(require("./Quintic"));
__export(require("./Regular"));
__export(require("./Sine"));
__export(require("./Strong"));



},{"./Back":4,"./Bounce":5,"./Circular":6,"./Cubic":7,"./Elastic":8,"./Exponential":9,"./None":10,"./Quadratic":11,"./Quartic":12,"./Quintic":13,"./Regular":14,"./Sine":15,"./Strong":16}],18:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var easing = require("./easing/index");
exports.easing = easing;
__export(require("./Tween"));
__export(require("./TweenEvent"));



},{"./Tween":2,"./TweenEvent":3,"./easing/index":17}],19:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DisplayObject_1 = require("./DisplayObject");
var PixelSnapping_1 = require("./PixelSnapping");
var ShaderID_1 = require("../../webgl/ShaderID");
var RenderHelper_1 = require("../../webgl/RenderHelper");
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap(root, parent, bitmapData, pixelSnapping, smoothing) {
        if (bitmapData === void 0) { bitmapData = null; }
        if (pixelSnapping === void 0) { pixelSnapping = PixelSnapping_1.PixelSnapping.AUTO; }
        if (smoothing === void 0) { smoothing = false; }
        _super.call(this, root, parent);
        this._bitmapData = null;
        this._renderTarget = null;
        this._pixelSnapping = null;
        this._smoothing = false;
        this.bitmapData = bitmapData;
        this.pixelSnapping = pixelSnapping;
        this.smoothing = smoothing;
    }
    Object.defineProperty(Bitmap.prototype, "bitmapData", {
        get: function () {
            return this._bitmapData;
        },
        set: function (v) {
            this.__disposeRenderTarget();
            this._bitmapData = v;
            // HACK: not-assured cast.
            this._renderTarget = this.root.worldRenderer.createRenderTarget(v.canvas);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bitmap.prototype, "pixelSnapping", {
        get: function () {
            return this._pixelSnapping;
        },
        set: function (v) {
            this._pixelSnapping = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bitmap.prototype, "smoothing", {
        get: function () {
            return this._smoothing;
        },
        set: function (v) {
            this._smoothing = v;
        },
        enumerable: true,
        configurable: true
    });
    Bitmap.prototype.dispose = function () {
        this.__disposeRenderTarget();
        _super.prototype.dispose.call(this);
    };
    Bitmap.prototype._$update = function (timeInfo) {
    };
    Bitmap.prototype._$render = function (renderer) {
        if (!this.bitmapData) {
            return;
        }
        RenderHelper_1.RenderHelper.renderImage(renderer, this._renderTarget, renderer.currentRenderTarget, false);
    };
    Bitmap.prototype._$selectShader = function (shaderManager) {
        shaderManager.selectShader(ShaderID_1.ShaderID.COPY_IMAGE);
    };
    Bitmap.prototype.__disposeRenderTarget = function () {
        if (this._renderTarget) {
            this._renderTarget.dispose();
            this._renderTarget = null;
        }
    };
    return Bitmap;
}(DisplayObject_1.DisplayObject));
exports.Bitmap = Bitmap;



},{"../../webgl/RenderHelper":107,"../../webgl/ShaderID":110,"./DisplayObject":26,"./PixelSnapping":36}],20:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
"use strict";
var Rectangle_1 = require("../geom/Rectangle");
var Point_1 = require("../geom/Point");
var NotImplementedError_1 = require("../errors/NotImplementedError");
var ByteArray_1 = require("../utils/ByteArray");
var GLUtil_1 = require("../../glantern/GLUtil");
var MathUtil_1 = require("../../glantern/MathUtil");
var ArgumentError_1 = require("../errors/ArgumentError");
var StageQuality_1 = require("./StageQuality");
var DisplayObject_1 = require("./DisplayObject");
var WebGLRenderer_1 = require("../../webgl/WebGLRenderer");
var BlendMode_1 = require("./BlendMode");
var EOFError_1 = require("../errors/EOFError");
// TODO: Endian matters.
// On Windows (x86/x86-64, little endian), the conversion of 32-bit RGBA to 8-bit bytes are correct. When retrieving
// ImageData objects, the data is always in [RR,GG,BB,AA] order. Thus when constructing a Uint32Array from a Uint8ClampedArray,
// reading from the Uint32Array automatically outputs 0xAABBGGRR. However, on big endian systems, it may outputs 0xRRGGBBAA.
var BitmapData = (function () {
    function BitmapData(width, height, transparent, fillColor) {
        if (transparent === void 0) { transparent = true; }
        if (fillColor === void 0) { fillColor = 0xffffffff; }
        this._canvas = null;
        this._context = null;
        this._supportsTransparent = true;
        this._isLocked = false;
        this._cachedImageData = null;
        this._cachedRenderer = null;
        this._isDataChangedDuringLockDown = false;
        var canvas = window.document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        var context = canvas.getContext("2d");
        context.fillStyle = GLUtil_1.GLUtil.colorToCssSharp(fillColor);
        context.fillRect(0, 0, width, height);
        this._canvas = canvas;
        this._context = context;
        this._supportsTransparent = transparent;
    }
    BitmapData.prototype.applyFilter = function (sourceBitmapData, sourceRect, destPoint, filter) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    BitmapData.prototype.clone = function () {
        var bitmapData = new BitmapData(this.width, this.height, this._supportsTransparent);
        bitmapData._context.putImageData(this.__getArea(0, 0, this.width, this.height), 0, 0);
        return bitmapData;
    };
    BitmapData.prototype.colorTransform = function (rect, colorTransform) {
        var realRect = rect.clone();
        realRect.width = MathUtil_1.MathUtil.clampUpper(realRect.width, this.width - realRect.x);
        realRect.height = MathUtil_1.MathUtil.clampUpper(realRect.height, this.height - realRect.y);
        var imageData = this.__getArea(realRect.x, realRect.y, realRect.width, realRect.height);
        var imageArray = new Uint32Array(imageData.data.buffer);
        for (var i = 0; i < imageArray.length; ++i) {
            imageArray[i] = colorTransform.transform(imageArray[i]);
        }
        this.__setArea(imageData, realRect.x, realRect.y);
    };
    BitmapData.prototype.compare = function (otherBitmapData) {
        if (this.width !== otherBitmapData.width) {
            return -3;
        }
        if (this.height !== otherBitmapData.height) {
            return -4;
        }
        var thisData = this.__getArea(0, 0, this.width, this.height);
        var thatData = otherBitmapData.__getArea(0, 0, otherBitmapData.width, otherBitmapData.height);
        var thisArray = new Uint32Array(thisData.data.buffer), thatArray = new Uint32Array(thatData.data.buffer);
        var imageData = null;
        var imageArray = null;
        for (var i = 0; i < thisArray.length; ++i) {
            var thisColor = GLUtil_1.GLUtil.decomposeRgba(thisArray[i]), thatColor = GLUtil_1.GLUtil.decomposeRgba(thatArray[i]);
            var colorDiff = {
                r: Math.abs(thisColor.r - thatColor.r),
                g: Math.abs(thisColor.g - thatColor.g),
                b: Math.abs(thisColor.b - thatColor.b),
                a: Math.abs(thisColor.a - thatColor.a)
            };
            if (colorDiff.r || colorDiff.g || colorDiff.b) {
                initImageData();
                imageArray[i] = GLUtil_1.GLUtil.rgb(colorDiff.r, colorDiff.g, colorDiff.b);
            }
            else if (colorDiff.a) {
                initImageData();
                imageArray[i] = (colorDiff.a << 24) | 0x00ffffff;
            }
        }
        return imageData !== null ? BitmapData.fromImageData(imageData) : 0;
        function initImageData() {
            if (imageData) {
                return;
            }
            imageData = new ImageData(this.width, this.height);
            imageArray = new Uint32Array(imageData.data);
        }
    };
    BitmapData.prototype.copyChannel = function (sourceBitmapData, sourceRect, destPoint, sourceChannel, destChannel) {
        var realRect = sourceRect.clone();
        realRect.width = MathUtil_1.MathUtil.clampUpper(realRect.width, sourceBitmapData.width - realRect.x);
        realRect.height = MathUtil_1.MathUtil.clampUpper(realRect.height, sourceBitmapData.height - realRect.y);
        realRect.width = MathUtil_1.MathUtil.clampUpper(realRect.width, this.width - destPoint.x);
        realRect.height = MathUtil_1.MathUtil.clampUpper(realRect.height, this.height - destPoint.y);
        var thisData = this.__getArea(destPoint.x, destPoint.y, realRect.width, realRect.height);
        var thatData = sourceBitmapData.__getArea(realRect.x, realRect.y, realRect.width, realRect.height);
        var thisArray = thisData.data, thatArray = thatData.data;
        var srcIndex = Math.round(Math.LOG2E * Math.log(sourceChannel));
        var destIndex = Math.round(Math.LOG2E * Math.log(destChannel));
        for (var i = 0; i < thisArray.length; i += 4) {
            thisArray[i + destIndex] = thatArray[i + srcIndex];
        }
        this.__setArea(thisData, destPoint.x, destPoint.y);
    };
    BitmapData.prototype.copyPixels = function (sourceBitmapData, sourceRect, destPoint, alphaBitmapData, alphaPoint, mergeAlpha) {
        if (alphaBitmapData === void 0) { alphaBitmapData = null; }
        if (alphaPoint === void 0) { alphaPoint = null; }
        if (mergeAlpha === void 0) { mergeAlpha = false; }
        var realRect = sourceRect.clone();
        realRect.width = MathUtil_1.MathUtil.clampUpper(realRect.width, sourceBitmapData.width - realRect.x);
        realRect.height = MathUtil_1.MathUtil.clampUpper(realRect.height, sourceBitmapData.height - realRect.y);
        realRect.width = MathUtil_1.MathUtil.clampUpper(realRect.width, this.width - destPoint.x);
        realRect.height = MathUtil_1.MathUtil.clampUpper(realRect.height, this.height - destPoint.y);
        if (alphaBitmapData) {
            if (!alphaPoint) {
                alphaPoint = new Point_1.Point();
            }
            realRect.width = MathUtil_1.MathUtil.clampUpper(realRect.width, alphaBitmapData.width - alphaPoint.x);
            realRect.height = MathUtil_1.MathUtil.clampUpper(realRect.height, alphaBitmapData.height - alphaPoint.y);
        }
        var thisData = new ImageData(realRect.width, realRect.height);
        var thatData = sourceBitmapData.__getArea(realRect.x, realRect.y, realRect.width, realRect.height);
        var thisArray = new Uint32Array(thisData.data.buffer), thatArray = new Uint32Array(thatData.data.buffer);
        var alphaData = null, alphaArray = null;
        if (alphaBitmapData) {
            alphaData = alphaBitmapData.__getArea(alphaPoint.x, alphaPoint.y, realRect.width, realRect.height);
            alphaArray = new Uint32Array(alphaData.data.buffer);
        }
        for (var i = 0; i < thisArray.length; ++i) {
            var value = thatArray[i];
            if (alphaBitmapData && mergeAlpha) {
                var alphaAlpha = alphaArray[i] >>> 24;
                var sourceAlpha = (value & 0xff000000) >>> 24;
                sourceAlpha *= (alphaAlpha / 0xff) | 0;
                value = (value & 0x00ffffff) | (sourceAlpha << 24);
            }
            thisArray[i] = value;
        }
        this.__setArea(thisData, destPoint.x, destPoint.y);
    };
    BitmapData.prototype.copyPixelsToByteArray = function (rect, data) {
        var expectedLength = rect.width * rect.height * 4;
        if (data.bytesAvailable < expectedLength) {
            data.length = data.position + expectedLength;
        }
        var imageData = this.__getArea(rect.x, rect.y, rect.width, rect.height);
        var dataArray = new Uint32Array(imageData.data.buffer);
        for (var i = 0; i < dataArray.length; ++i) {
            data.writeUnsignedInt(dataArray[i]);
        }
    };
    BitmapData.prototype.dispose = function () {
        this._canvas = null;
        this._context = null;
        if (this._cachedRenderer !== null) {
            this._cachedRenderer.dispose();
            this._cachedRenderer = null;
        }
    };
    BitmapData.prototype.draw = function (source, matrix, colorTransform, blendMode, clipRect, smoothing) {
        if (matrix === void 0) { matrix = null; }
        if (colorTransform === void 0) { colorTransform = null; }
        if (blendMode === void 0) { blendMode = null; }
        if (clipRect === void 0) { clipRect = null; }
        if (smoothing === void 0) { smoothing = false; }
        this.drawWithQuality(source, matrix, colorTransform, blendMode, clipRect, smoothing, StageQuality_1.StageQuality.MEDIUM);
    };
    BitmapData.prototype.drawWithQuality = function (source, matrix, colorTransform, blendMode, clipRect, smoothing, quality) {
        if (matrix === void 0) { matrix = null; }
        if (colorTransform === void 0) { colorTransform = null; }
        if (blendMode === void 0) { blendMode = null; }
        if (clipRect === void 0) { clipRect = null; }
        if (smoothing === void 0) { smoothing = false; }
        if (quality === void 0) { quality = null; }
        if (source instanceof DisplayObject_1.DisplayObject) {
            var displayObject = source;
            this.__buildRenderer();
            var renderer = this._cachedRenderer;
            renderer.setBlendMode(blendMode || BlendMode_1.BlendMode.NORMAL);
            displayObject.render(renderer);
        }
        else {
            throw new NotImplementedError_1.NotImplementedError();
        }
    };
    BitmapData.prototype.encode = function (rect, compressor, byteArray) {
        if (byteArray === void 0) { byteArray = null; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    BitmapData.prototype.fillRect = function (rect, color) {
        var context = this._context;
        context.fillStyle = GLUtil_1.GLUtil.colorToCssSharp(color);
        context.fillRect(rect.x, rect.y, rect.width, rect.height);
    };
    BitmapData.prototype.floodFill = function (x, y, color) {
        if (this.isLocked) {
            return;
        }
        floodFill(this, this.__getArea, this.__setArea, x, y, color);
    };
    BitmapData.prototype.generateFilterRect = function (sourceRect, filter) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    BitmapData.prototype.getColorBoundsRect = function (mask, color, findColor) {
        if (findColor === void 0) { findColor = true; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    BitmapData.prototype.getPixel = function (x, y) {
        var imageData = this.__getArea(x, y, 1, 1);
        var dataBuffer = imageData.data;
        // ImageData order: r,g,b,a
        return GLUtil_1.GLUtil.rgb(dataBuffer[0], dataBuffer[1], dataBuffer[2]);
    };
    BitmapData.prototype.getPixel32 = function (x, y) {
        var imageData = this.__getArea(x, y, 1, 1);
        var dataBuffer = imageData.data;
        return GLUtil_1.GLUtil.rgba(dataBuffer[0], dataBuffer[1], dataBuffer[2], dataBuffer[3]);
    };
    BitmapData.prototype.getPixels = function (rect) {
        var imageData = this.__getArea(rect.x, rect.y, rect.width, rect.height);
        var dataBuffer = imageData.data;
        return ByteArray_1.ByteArray.from(dataBuffer.buffer);
    };
    BitmapData.prototype.getVector = function (rect) {
        var imageData = this.__getArea(rect.x, rect.y, rect.width, rect.height);
        var dataBuffer = imageData.data;
        var uint32Array = new Uint32Array(dataBuffer.buffer);
        var result = new Array(uint32Array.length);
        for (var i = 0; i < result.length; ++i) {
            result[i] = uint32Array[i];
        }
        return result;
    };
    Object.defineProperty(BitmapData.prototype, "height", {
        get: function () {
            return this._canvas.height;
        },
        enumerable: true,
        configurable: true
    });
    BitmapData.prototype.histogram = function (hRect) {
        if (hRect === void 0) { hRect = null; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    BitmapData.prototype.hitTest = function (firstPoint, firstAlphaThreshold, secondObject, secondBitmapDataPoint, secondAlphaThreshold) {
        if (secondBitmapDataPoint === void 0) { secondBitmapDataPoint = null; }
        if (secondAlphaThreshold === void 0) { secondAlphaThreshold = 1; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    BitmapData.prototype.lock = function () {
        this._isLocked = true;
        this._cachedImageData = this._context.getImageData(0, 0, this.width, this.height);
    };
    BitmapData.prototype.merge = function (sourceBitmapData, sourceRect, destPoint, redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    BitmapData.prototype.noise = function (randomSeed, low, high, channelOptions, greyScale) {
        if (low === void 0) { low = 0; }
        if (high === void 0) { high = 255; }
        if (channelOptions === void 0) { channelOptions = 7; }
        if (greyScale === void 0) { greyScale = false; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    BitmapData.prototype.paletteMap = function (sourceBitmapData, sourceRect, destPoint, redArray, greenArray, blueArray, alphaArray) {
        if (redArray === void 0) { redArray = null; }
        if (greenArray === void 0) { greenArray = null; }
        if (blueArray === void 0) { blueArray = null; }
        if (alphaArray === void 0) { alphaArray = null; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    BitmapData.prototype.perlinNoise = function (baseX, baseY, numOctaves, randomSeed, stitch, fractalNoise, channelOptions, grayScale, offsets) {
        if (channelOptions === void 0) { channelOptions = 7; }
        if (grayScale === void 0) { grayScale = false; }
        if (offsets === void 0) { offsets = null; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    BitmapData.prototype.pixelDissolve = function (sourceBitmapData, sourceRect, destPoint, randomSeed, numPixels, fillColor) {
        if (randomSeed === void 0) { randomSeed = 0; }
        if (numPixels === void 0) { numPixels = 0; }
        if (fillColor === void 0) { fillColor = 0; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Object.defineProperty(BitmapData.prototype, "rect", {
        get: function () {
            return new Rectangle_1.Rectangle(0, 0, this.width, this.height);
        },
        enumerable: true,
        configurable: true
    });
    BitmapData.prototype.scroll = function (x, y) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    BitmapData.prototype.setPixel = function (x, y, color) {
        this.setPixel32(x, y, color | 0xff000000);
    };
    BitmapData.prototype.setPixel32 = function (x, y, color) {
        color &= 0xffffffff;
        var imageData = new ImageData(1, 1);
        var rgba = GLUtil_1.GLUtil.decomposeRgba(color);
        var dataBuffer = imageData.data;
        dataBuffer[0] = rgba.r;
        dataBuffer[1] = rgba.g;
        dataBuffer[2] = rgba.b;
        dataBuffer[3] = rgba.a;
        this.__setArea(imageData, x, y);
    };
    /**
     * http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/BitmapData.html#setPixels()
     * @param rect {Rectangle}
     * @param inputByteArray {ByteArray}
     */
    BitmapData.prototype.setPixels = function (rect, inputByteArray) {
        var r = rect.clone();
        r.width = MathUtil_1.MathUtil.clampUpper(r.width, this.width - r.x);
        r.height = MathUtil_1.MathUtil.clampUpper(r.height, this.height - r.y);
        var originalPosition = inputByteArray.position;
        var expectedLength = rect.width * rect.height * 4;
        var pixelsToRead = (inputByteArray.bytesAvailable / 4) | 0;
        var imageData = this.__getArea(rect.x, rect.y, rect.width, rect.height);
        var dataBuffer = new Uint32Array(imageData.data.buffer);
        for (var i = 0; i < expectedLength; ++i) {
            if (i >= pixelsToRead) {
                this._context.putImageData(imageData, rect.x, rect.y);
                throw new EOFError_1.EOFError("The input ByteArray is not large enough.");
            }
            dataBuffer[i] = inputByteArray.readUnsignedInt();
        }
        inputByteArray.position = originalPosition;
        this.__setArea(imageData, rect.x, rect.y);
    };
    BitmapData.prototype.setVector = function (rect, inputVector) {
        var r = rect.clone();
        r.width = MathUtil_1.MathUtil.clampUpper(r.width, this.width - r.x);
        r.height = MathUtil_1.MathUtil.clampUpper(r.height, this.height - r.y);
        var expectedLength = rect.width * rect.height;
        if (inputVector.length !== expectedLength) {
            throw new ArgumentError_1.ArgumentError("Invalid vector is used when trying to set pixels.");
        }
        var imageData = new ImageData(r.width, r.height);
        var dataBuffer = imageData.data;
        var uint32Array = new Uint32Array(dataBuffer.buffer);
        for (var i = 0; i < dataBuffer.length; ++i) {
            uint32Array[i] = inputVector[i] | 0;
        }
        this.__setArea(imageData, rect.x, rect.y);
    };
    BitmapData.prototype.threshold = function (sourceBitmapData, sourceRect, destPoint, operation, threshold, color, mask, copySource) {
        if (color === void 0) { color = 0; }
        if (mask === void 0) { mask = 0xffffffff; }
        if (copySource === void 0) { copySource = false; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Object.defineProperty(BitmapData.prototype, "transparent", {
        get: function () {
            return this._supportsTransparent;
        },
        enumerable: true,
        configurable: true
    });
    BitmapData.prototype.unlock = function () {
        if (this._isDataChangedDuringLockDown) {
            this._context.putImageData(this._cachedImageData, 0, 0);
        }
        this._isLocked = false;
        this._cachedImageData = null;
        this._isDataChangedDuringLockDown = false;
    };
    Object.defineProperty(BitmapData.prototype, "width", {
        get: function () {
            return this._canvas.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BitmapData.prototype, "isLocked", {
        // Bulletproof
        get: function () {
            return this._isLocked;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BitmapData.prototype, "canvas", {
        // Bulletproof
        get: function () {
            return this._canvas;
        },
        enumerable: true,
        configurable: true
    });
    // Bulletproof
    BitmapData.fromImageData = function (imageData) {
        var bitmapData = new BitmapData(imageData.width, imageData.height, true, 0x00000000);
        bitmapData._context.putImageData(imageData, 0, 0);
        return bitmapData;
    };
    BitmapData.prototype.__getArea = function (x, y, width, height) {
        if (this.isLocked) {
            var imageData = this._cachedImageData;
            var imageArray = new Uint32Array(imageData.data.buffer);
            var resultData = new ImageData(width, height);
            var resultArray = new Uint32Array(resultData.data.buffer);
            if (x === 0 && y === 0 && width === this.width && height === this.height) {
                // Fast copy
                for (var i = 0; i < imageArray.length; ++i) {
                    resultArray[i] = imageArray[i];
                }
            }
            else {
                width = MathUtil_1.MathUtil.clampUpper(width, this.width - x);
                height = MathUtil_1.MathUtil.clampUpper(height, this.height - y);
                var lineWidth = this.width;
                var k = 0;
                for (var i = 0; i < imageArray.length; ++i) {
                    var row = (i / lineWidth) | 0;
                    var col = i - row * lineWidth;
                    if (x <= col && col <= x + width && y <= row && row <= y + height) {
                        resultArray[k++] = imageArray[i];
                    }
                }
            }
            return resultData;
        }
        else {
            return this._context.getImageData(x, y, width, height);
        }
    };
    BitmapData.prototype.__setArea = function (imageData, x, y) {
        if (this.isLocked) {
            var cachedData = this._cachedImageData;
            var cachedArray = new Uint32Array(cachedData.data.buffer);
            var imageArray = new Uint32Array(imageData.data.buffer);
            if (x === 0 && y === 0 && imageData.width === this.width && imageData.height === this.height) {
                // Fast copy
                for (var i = 0; i < cachedArray.length; ++i) {
                    cachedArray[i] = imageArray[i];
                }
            }
            else {
                var width = MathUtil_1.MathUtil.clampUpper(imageData.width, this.width - x);
                var height = MathUtil_1.MathUtil.clampUpper(imageData.height, this.height - y);
                var lineWidth = this.width;
                var k = 0;
                for (var i = 0; i < cachedArray.length; ++i) {
                    var row = (i / lineWidth) | 0;
                    var col = i - row * lineWidth;
                    if (x <= col && col <= x + width && y <= row && row <= y + height) {
                        cachedArray[i] = imageArray[k++];
                    }
                }
            }
            this._isDataChangedDuringLockDown = true;
        }
        else {
            this._context.putImageData(imageData, x, y);
        }
    };
    BitmapData.prototype.__buildRenderer = function () {
        if (this._cachedRenderer !== null) {
            return;
        }
        this._cachedRenderer = new WebGLRenderer_1.WebGLRenderer(this._canvas, WebGLRenderer_1.WebGLRenderer.DEFAULT_OPTIONS);
    };
    return BitmapData;
}());
exports.BitmapData = BitmapData;
function floodFill(bitmapData, getCall, setCall, x, y, color) {
    var imageData = getCall(0, 0, bitmapData.width, bitmapData.height);
    var dataBuffer = imageData.data.buffer;
    var u32 = new Uint32Array(dataBuffer);
    var lineWidth = bitmapData.width;
    function point2Index(x, y) {
        return x + y * lineWidth;
    }
    function getColor(x, y) {
        return u32[point2Index(x, y)];
    }
    function setColor(x, y, c) {
        u32[point2Index(x, y)] = c;
    }
    var queue = [{ x: x, y: y }];
    var visited = new Array(u32.length);
    var refColor = getColor(x, y);
    visited[point2Index(x, y)] = true;
    while (queue.length > 0) {
        var coord = queue.shift();
        setColor(coord.x, coord.y, color);
        var index;
        // Top
        if (coord.y > 0) {
            index = point2Index(coord.x, coord.y - 1);
            if (!visited[index] && getColor(coord.x, coord.y - 1) === refColor) {
                visited[index] = true;
                queue.push({ x: coord.x, y: coord.y - 1 });
            }
        }
        // Left
        if (coord.x > 0) {
            index = point2Index(coord.x - 1, coord.y);
            if (!visited[index] && getColor(coord.x - 1, coord.y) === refColor) {
                visited[index] = true;
                queue.push({ x: coord.x - 1, y: coord.y });
            }
        }
        // Bottom
        if (coord.y < this.height - 1) {
            index = point2Index(coord.x, coord.y + 1);
            if (!visited[index] && getColor(coord.x, coord.y + 1) === refColor) {
                visited[index] = true;
                queue.push({ x: coord.x, y: coord.y + 1 });
            }
        }
        // Right
        if (coord.x < this.width - 1) {
            index = point2Index(coord.x + 1, coord.y);
            if (!visited[index] && getColor(coord.x + 1, coord.y) === refColor) {
                visited[index] = true;
                queue.push({ x: coord.x + 1, y: coord.y });
            }
        }
    }
    setCall(imageData, 0, 0);
}



},{"../../glantern/GLUtil":94,"../../glantern/MathUtil":95,"../../webgl/WebGLRenderer":115,"../errors/ArgumentError":48,"../errors/EOFError":49,"../errors/NotImplementedError":51,"../geom/Point":66,"../geom/Rectangle":67,"../utils/ByteArray":85,"./BlendMode":22,"./DisplayObject":26,"./StageQuality":43}],21:[function(require,module,exports){
/**
 * Created by MIC on 2016/6/12.
 */
"use strict";
var BitmapDataChannel = (function () {
    function BitmapDataChannel() {
    }
    Object.defineProperty(BitmapDataChannel, "ALPHA", {
        get: function () {
            return 8;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BitmapDataChannel, "BLUE", {
        get: function () {
            return 4;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BitmapDataChannel, "GREEN", {
        get: function () {
            return 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BitmapDataChannel, "RED", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    return BitmapDataChannel;
}());
exports.BitmapDataChannel = BitmapDataChannel;



},{}],22:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var BlendMode = (function () {
    function BlendMode() {
    }
    Object.defineProperty(BlendMode, "ADD", {
        get: function () {
            return "add";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlendMode, "ALPHA", {
        get: function () {
            return "alpha";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlendMode, "DARKEN", {
        get: function () {
            return "darken";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlendMode, "DIFFERENCE", {
        get: function () {
            return "difference";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlendMode, "ERASE", {
        get: function () {
            return "erase";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlendMode, "HARDLIGHT", {
        get: function () {
            return "hardlight";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlendMode, "INVERT", {
        get: function () {
            return "invert";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlendMode, "LAYER", {
        get: function () {
            return "layer";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlendMode, "LIGHTEN", {
        get: function () {
            return "lighten";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlendMode, "MULTIPLY", {
        get: function () {
            return "multiply";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlendMode, "NORMAL", {
        get: function () {
            return "normal";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlendMode, "OVERLAY", {
        get: function () {
            return "overlay";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlendMode, "SCREEN", {
        get: function () {
            return "screen";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlendMode, "SHADER", {
        get: function () {
            return "shader";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlendMode, "SUBTRACT", {
        get: function () {
            return "subtract";
        },
        enumerable: true,
        configurable: true
    });
    return BlendMode;
}());
exports.BlendMode = BlendMode;



},{}],23:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
"use strict";
var CapsStyle = (function () {
    function CapsStyle() {
    }
    Object.defineProperty(CapsStyle, "NONE", {
        get: function () {
            return "none";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CapsStyle, "ROUND", {
        get: function () {
            return "round";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CapsStyle, "SQUARE", {
        get: function () {
            return "square";
        },
        enumerable: true,
        configurable: true
    });
    return CapsStyle;
}());
exports.CapsStyle = CapsStyle;



},{}],24:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var ColorCorrection = (function () {
    function ColorCorrection() {
    }
    Object.defineProperty(ColorCorrection, "DEFAULT", {
        get: function () {
            return 'default';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorCorrection, "OFF", {
        get: function () {
            return 'off';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorCorrection, "ON", {
        get: function () {
            return 'on';
        },
        enumerable: true,
        configurable: true
    });
    return ColorCorrection;
}());
exports.ColorCorrection = ColorCorrection;



},{}],25:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var ColorCorrectionSupport = (function () {
    function ColorCorrectionSupport() {
    }
    Object.defineProperty(ColorCorrectionSupport, "DEFAULT_OFF", {
        get: function () {
            return 'defaultOff';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorCorrectionSupport, "DEFAULT_ON", {
        get: function () {
            return 'defaultOn';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorCorrectionSupport, "UNSUPPORTED", {
        get: function () {
            return 'unsupported';
        },
        enumerable: true,
        configurable: true
    });
    return ColorCorrectionSupport;
}());
exports.ColorCorrectionSupport = ColorCorrectionSupport;



},{}],26:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Transform_1 = require("../geom/Transform");
var EventDispatcher_1 = require("../events/EventDispatcher");
var BlendMode_1 = require("./BlendMode");
var Matrix3D_1 = require("../geom/Matrix3D");
var Vector3D_1 = require("../geom/Vector3D");
var NotImplementedError_1 = require("../errors/NotImplementedError");
var GLUtil_1 = require("../../glantern/GLUtil");
var MathUtil_1 = require("../../glantern/MathUtil");
var DisplayObject = (function (_super) {
    __extends(DisplayObject, _super);
    function DisplayObject(root, parent) {
        _super.call(this);
        this.blendMode = BlendMode_1.BlendMode.NORMAL;
        this.enabled = true;
        this.mask = null;
        this.visible = true;
        this._parent = null;
        this._root = null;
        this._name = "";
        this._rotation = 0;
        this._rotationX = 0;
        this._rotationY = 0;
        this._rotationZ = 0;
        this._scaleX = 1;
        this._scaleY = 1;
        this._scaleZ = 1;
        this._stage = null;
        this._height = 0;
        this._width = 0;
        this._x = 0;
        this._y = 0;
        this._z = 0;
        this._childIndex = -1;
        this._alpha = 1;
        this._filters = null;
        this._filterTarget = null;
        this._transform = null;
        this._isTransformDirty = true;
        this._isRoot = false;
        this._root = root;
        this._stage = root;
        this._parent = parent;
        this._filters = [];
        this._transform = new Transform_1.Transform();
        this._isRoot = root === null;
    }
    Object.defineProperty(DisplayObject.prototype, "alpha", {
        get: function () {
            return this._alpha;
        },
        set: function (v) {
            this._alpha = MathUtil_1.MathUtil.clamp(v, 0, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "cacheAsBitmap", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        set: function (v) {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "childIndex", {
        get: function () {
            return this._childIndex;
        },
        // DO NOT call manually
        set: function (v) {
            this._childIndex = v;
        },
        enumerable: true,
        configurable: true
    });
    DisplayObject.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.filters = [];
    };
    Object.defineProperty(DisplayObject.prototype, "filters", {
        get: function () {
            return this._filters.slice();
        },
        set: function (v) {
            var i;
            var hasFiltersBefore = this.__shouldProcessFilters();
            if (hasFiltersBefore) {
                for (i = 0; i < this._filters.length; ++i) {
                    this._filters[i].notifyRemoved();
                }
            }
            this._filters = v;
            var hasFiltersNow = this.__shouldProcessFilters();
            if (hasFiltersNow) {
                for (i = 0; i < this._filters.length; ++i) {
                    this._filters[i].notifyAdded();
                }
            }
            if (hasFiltersNow !== hasFiltersBefore) {
                if (hasFiltersNow) {
                    this._$createFilterTarget(this._root.worldRenderer);
                }
                else {
                    this._$releaseFilterTarget();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (v) {
            this._height = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "mouseX", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "mouseY", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (v) {
            this._name = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "root", {
        get: function () {
            return this._root;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "rotation", {
        get: function () {
            return this._rotation;
        },
        set: function (v) {
            while (v < -180) {
                v += 360;
            }
            while (v > 180) {
                v -= 360;
            }
            this._rotation = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "rotationX", {
        get: function () {
            return this._rotationX;
        },
        set: function (v) {
            while (v < -180) {
                v += 360;
            }
            while (v > 180) {
                v -= 360;
            }
            this._rotationX = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "rotationY", {
        get: function () {
            return this._rotationY;
        },
        set: function (v) {
            while (v < -180) {
                v += 360;
            }
            while (v > 180) {
                v -= 360;
            }
            this._rotationY = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "rotationZ", {
        get: function () {
            return this._rotationZ;
        },
        set: function (v) {
            while (v < -180) {
                v += 360;
            }
            while (v > 180) {
                v -= 360;
            }
            this._rotationZ = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "stage", {
        get: function () {
            return this._stage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "transform", {
        get: function () {
            return this._transform;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (v) {
            this._width = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (v) {
            var b = this._x !== v;
            this._x = v;
            if (b) {
                this.requestUpdateTransform();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (v) {
            var b = this._y !== v;
            this._y = v;
            if (b) {
                this.requestUpdateTransform();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "z", {
        get: function () {
            return this._z;
        },
        set: function (v) {
            var b = this._z !== v;
            this._z = v;
            if (b) {
                this.requestUpdateTransform();
            }
        },
        enumerable: true,
        configurable: true
    });
    DisplayObject.prototype.getBounds = function (targetCoordinateSpace) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    DisplayObject.prototype.getRect = function (targetCoordinateSpace) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    DisplayObject.prototype.update = function (timeInfo) {
        if (this._isTransformDirty) {
            this._$updateTransform();
        }
        if (this.enabled) {
            this._$update(timeInfo);
        }
    };
    DisplayObject.prototype.render = function (renderer) {
        if (this.visible && this.alpha > 0) {
            this._$preprocess(renderer);
            this._$render(renderer);
            this._$postprocess(renderer);
        }
        else {
        }
    };
    DisplayObject.prototype.requestUpdateTransform = function () {
        this._isTransformDirty = true;
    };
    DisplayObject.prototype._$updateTransform = function () {
        var matrix3D;
        if (this._isRoot) {
            matrix3D = new Matrix3D_1.Matrix3D();
        }
        else {
            matrix3D = this.parent.transform.matrix3D.clone();
        }
        matrix3D.prependTranslation(this.x, this.y, this.z);
        matrix3D.prependRotation(this.rotationX, Vector3D_1.Vector3D.X_AXIS);
        matrix3D.prependRotation(this.rotationY, Vector3D_1.Vector3D.Y_AXIS);
        matrix3D.prependRotation(this.rotationZ, Vector3D_1.Vector3D.Z_AXIS);
        this.transform.matrix3D.copyFrom(matrix3D);
    };
    DisplayObject.prototype._$preprocess = function (renderer) {
        var _this = this;
        if (this.__shouldProcessFilters()) {
            this._filterTarget.clear();
            renderer.setRenderTarget(this._filterTarget);
        }
        else {
            renderer.setRenderTarget(null);
        }
        var manager = renderer.shaderManager;
        this._$selectShader(manager);
        var shader = manager.currentShader;
        if (GLUtil_1.GLUtil.ptr(shader)) {
            shader.changeValue("uTransformMatrix", function (u) {
                u.value = _this.transform.matrix3D.toArray();
            });
            shader.changeValue("uAlpha", function (u) {
                u.value = _this.alpha;
            });
        }
        renderer.setBlendMode(this.blendMode);
    };
    DisplayObject.prototype._$postprocess = function (renderer) {
        if (this.__shouldProcessFilters()) {
            var filterManager = renderer.filterManager;
            filterManager.pushFilterGroup(this.filters);
            filterManager.processFilters(renderer, this._filterTarget, renderer.screenTarget, false);
            filterManager.popFilterGroup();
        }
    };
    DisplayObject.prototype._$createFilterTarget = function (renderer) {
        if (this._filterTarget !== null) {
            return;
        }
        this._filterTarget = renderer.createRenderTarget();
    };
    DisplayObject.prototype._$releaseFilterTarget = function () {
        if (this._filterTarget === null) {
            return;
        }
        this._root.worldRenderer.releaseRenderTarget(this._filterTarget);
        this._filterTarget = null;
    };
    DisplayObject.prototype.__shouldProcessFilters = function () {
        return this.filters !== null && this.filters.length > 0;
    };
    return DisplayObject;
}(EventDispatcher_1.EventDispatcher));
exports.DisplayObject = DisplayObject;



},{"../../glantern/GLUtil":94,"../../glantern/MathUtil":95,"../errors/NotImplementedError":51,"../events/EventDispatcher":53,"../geom/Matrix3D":63,"../geom/Transform":68,"../geom/Vector3D":69,"./BlendMode":22}],27:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var InteractiveObject_1 = require("./InteractiveObject");
var NotImplementedError_1 = require("../errors/NotImplementedError");
var DisplayObjectContainer = (function (_super) {
    __extends(DisplayObjectContainer, _super);
    function DisplayObjectContainer(root, parent) {
        _super.call(this, root, parent);
        this.mouseChildren = true;
        this.tabChildren = true;
        this._children = null;
        this._children = [];
    }
    Object.defineProperty(DisplayObjectContainer.prototype, "numChildren", {
        get: function () {
            return this._children.length;
        },
        enumerable: true,
        configurable: true
    });
    DisplayObjectContainer.prototype.addChild = function (child) {
        if (this._children.indexOf(child) < 0) {
            this._children.push(child);
        }
        child.childIndex = this._children.length - 1;
        return child;
    };
    DisplayObjectContainer.prototype.addChildAt = function (child, index) {
        if (this._children.indexOf(child) < 0) {
            if (index === 0) {
                this._children.unshift(child);
            }
            else if (index === this._children.length - 1) {
                this._children.push(child);
            }
            else {
                this._children = this._children.slice(0, index - 1).concat(child).concat(this._children.slice(index, this._children.length - 1));
            }
        }
        child.childIndex = index;
        return child;
    };
    DisplayObjectContainer.prototype.areInaccessibleObjectsUnderPoint = function (point) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    DisplayObjectContainer.prototype.contains = function (child) {
        var result = false;
        for (var i = 0; i < this._children.length; ++i) {
            if (this._children[i] === child) {
                return true;
            }
            if (this._children[i] instanceof DisplayObjectContainer) {
                result = this._children[i].contains(child);
                if (result) {
                    return true;
                }
            }
        }
        return false;
    };
    DisplayObjectContainer.prototype.getChildAt = function (index) {
        if (index < 0 || index > this._children.length - 1) {
            return null;
        }
        else {
            return this._children[index];
        }
    };
    DisplayObjectContainer.prototype.getChildByName = function (name) {
        if (this._children.length === 0) {
            return null;
        }
        var result = null;
        for (var i = 0; i < this._children.length; ++i) {
            if (this._children[i].name === name) {
                return this._children[i];
            }
            if (this._children[i] instanceof DisplayObjectContainer) {
                result = this._children[i].getChildByName(name);
                if (result !== null) {
                    return result;
                }
            }
        }
        return null;
    };
    DisplayObjectContainer.prototype.getChildIndex = function (child) {
        return this._children.indexOf(child);
    };
    DisplayObjectContainer.prototype.getObjectsUnderPoint = function (point) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    DisplayObjectContainer.prototype.removeChild = function (child) {
        var childIndex = this._children.indexOf(child);
        if (childIndex >= 0) {
            return this.removeChildAt(childIndex);
        }
        else {
            return null;
        }
    };
    DisplayObjectContainer.prototype.removeChildAt = function (index) {
        if (index < 0 || index >= this.numChildren) {
            return null;
        }
        var child = this._children[index];
        for (var i = index + 1; i < this._children.length; i++) {
            this._children[i].childIndex++;
        }
        this._children.splice(index, 1);
        return child;
    };
    DisplayObjectContainer.prototype.setChildIndex = function (child, index) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    DisplayObjectContainer.prototype.swapChildren = function (child1, child2) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    DisplayObjectContainer.prototype.swapChildrenAt = function (index1, index2) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Object.defineProperty(DisplayObjectContainer.prototype, "width", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        set: function (v) {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObjectContainer.prototype, "height", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        set: function (v) {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    DisplayObjectContainer.prototype.dispatchEvent = function (event, data) {
        var r = _super.prototype.dispatchEvent.call(this, event, data);
        for (var i = 0; i < this._children.length; i++) {
            this._children[i].dispatchEvent(event, data);
        }
        return r;
    };
    DisplayObjectContainer.prototype.update = function (timeInfo) {
        _super.prototype.update.call(this, timeInfo);
        if (this.enabled) {
            for (var i = 0; i < this._children.length; ++i) {
                this._children[i].update(timeInfo);
            }
        }
    };
    DisplayObjectContainer.prototype.render = function (renderer) {
        if (this.visible && this.alpha > 0) {
            this._$preprocess(renderer);
            this._$render(renderer);
            for (var i = 0; i < this._children.length; ++i) {
                var child = this._children[i];
                child.render(renderer);
            }
            this._$postprocess(renderer);
        }
        else {
        }
    };
    DisplayObjectContainer.prototype.requestUpdateTransform = function () {
        this._isTransformDirty = true;
        if (this._children !== null && this._children.length > 0) {
            for (var i = 0; i < this._children.length; ++i) {
                this._children[i].requestUpdateTransform();
            }
        }
    };
    DisplayObjectContainer.prototype._$selectShader = function (shaderManager) {
        // Do nothing
    };
    return DisplayObjectContainer;
}(InteractiveObject_1.InteractiveObject));
exports.DisplayObjectContainer = DisplayObjectContainer;



},{"../errors/NotImplementedError":51,"./InteractiveObject":32}],28:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
"use strict";
var GradientType = (function () {
    function GradientType() {
    }
    Object.defineProperty(GradientType, "LINEAR", {
        get: function () {
            return "linear";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GradientType, "RADIAL", {
        get: function () {
            return "radial";
        },
        enumerable: true,
        configurable: true
    });
    return GradientType;
}());
exports.GradientType = GradientType;



},{}],29:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
"use strict";
var SpreadMethod_1 = require("./SpreadMethod");
var InterpolationMethod_1 = require("./InterpolationMethod");
var GraphicsPathWinding_1 = require("./GraphicsPathWinding");
var GraphicsPathCommand_1 = require("./GraphicsPathCommand");
var TriangleCulling_1 = require("./TriangleCulling");
var LineScaleMode_1 = require("./LineScaleMode");
var BrushType_1 = require("../../webgl/graphics/BrushType");
var SolidStrokeRenderer_1 = require("../../webgl/graphics/SolidStrokeRenderer");
var SolidFillRenderer_1 = require("../../webgl/graphics/SolidFillRenderer");
var NotImplementedError_1 = require("../errors/NotImplementedError");
var GLUtil_1 = require("../../glantern/GLUtil");
var MathUtil_1 = require("../../glantern/MathUtil");
var Graphics = (function () {
    function Graphics(attachTo, renderer) {
        this._displayObject = null;
        this._isFilling = false;
        this._renderer = null;
        this._bufferTarget = null;
        this._isDirty = true;
        this._shouldUpdateRenderTarget = false;
        this._lineType = BrushType_1.BrushType.SOLID;
        this._lineWidth = 1;
        this._lineAlpha = 1;
        this._lineColor = 0;
        this._currentX = 0;
        this._currentY = 0;
        this._lastPathStartX = 0;
        this._lastPathStartY = 0;
        this._currentStrokeRenderer = null;
        this._currentFillRenderer = null;
        this._strokeRenderers = null;
        this._fillRenderers = null;
        this._displayObject = attachTo;
        this._renderer = renderer;
        this._isDirty = true;
        this._strokeRenderers = [];
        this._fillRenderers = [];
        this._bufferTarget = renderer.createRenderTarget();
        this.__updateCurrentPoint(0, 0);
        this.__resetStyles();
        this.clear();
    }
    Graphics.prototype.beginBitmapFill = function (bitmap, matrix, repeat, smooth) {
        if (matrix === void 0) { matrix = null; }
        if (repeat === void 0) { repeat = false; }
        if (smooth === void 0) { smooth = false; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Graphics.prototype.beginFill = function (color, alpha) {
        if (alpha === void 0) { alpha = 1.0; }
        if (this._isFilling) {
            this.endFill();
        }
        if (!this._isFilling) {
            this._isFilling = true;
            this._currentStrokeRenderer = this.__createStrokeRendererWithCurrentSettings();
            this._strokeRenderers.push(this._currentStrokeRenderer);
            this._currentFillRenderer = new SolidFillRenderer_1.SolidFillRenderer(this, this._currentX, this._currentY, color, alpha);
            this._currentFillRenderer.beginIndex = this._strokeRenderers.length - 1;
        }
    };
    Graphics.prototype.beginGradientFill = function (type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio) {
        if (matrix === void 0) { matrix = null; }
        if (spreadMethod === void 0) { spreadMethod = SpreadMethod_1.SpreadMethod.PAD; }
        if (interpolationMethod === void 0) { interpolationMethod = InterpolationMethod_1.InterpolationMethod.RGB; }
        if (focalPointRatio === void 0) { focalPointRatio = 0; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Graphics.prototype.beginShaderFill = function (shader, matrix) {
        if (matrix === void 0) { matrix = null; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Graphics.prototype.clear = function () {
        var i;
        if (this._strokeRenderers !== null) {
            for (i = 0; i < this._strokeRenderers.length; ++i) {
                this._strokeRenderers[i].dispose();
                this._isDirty = true;
            }
        }
        if (this._fillRenderers !== null) {
            for (i = 0; i < this._fillRenderers.length; ++i) {
                this._fillRenderers[i].dispose();
                this._isDirty = true;
            }
        }
        if (this._currentFillRenderer !== null) {
            this._currentFillRenderer.dispose();
            this._isDirty = true;
        }
        while (this._strokeRenderers.length > 0) {
            this._strokeRenderers.pop();
            this._isDirty = true;
        }
        while (this._fillRenderers.length > 0) {
            this._fillRenderers.pop();
            this._isDirty = true;
        }
        // create stroke and fill renderers according to current state
        // and push them into the stack
        this._currentFillRenderer = null;
        this._currentStrokeRenderer = this.__createStrokeRendererWithCurrentSettings();
        this._strokeRenderers.push(this._currentStrokeRenderer);
        this._isFilling = false;
    };
    Graphics.prototype.copyFrom = function (sourceGraphics) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Graphics.prototype.curveTo = function (controlX, controlY, anchorX, anchorY) {
        if (this._isFilling) {
            this._currentFillRenderer.curveTo(controlX, controlY, anchorX, anchorY);
        }
        this._currentStrokeRenderer.curveTo(controlX, controlY, anchorX, anchorY);
        this.__updateCurrentPoint(anchorX, anchorY);
        this._isDirty = true;
    };
    Graphics.prototype.drawCircle = function (x, y, radius) {
        if (this._isFilling) {
            this._currentFillRenderer.drawCircle(x, y, radius);
        }
        this._currentStrokeRenderer.drawCircle(x, y, radius);
        this.__updateCurrentPoint(x, y);
        this.__updateLastPathStartPoint(x + radius, y);
        this._isDirty = true;
    };
    Graphics.prototype.drawEllipse = function (x, y, width, height) {
        if (this._isFilling) {
            this._currentFillRenderer.drawEllipse(x, y, width, height);
        }
        this._currentStrokeRenderer.drawEllipse(x, y, width, height);
        this.__updateCurrentPoint(x + width, y + height / 2);
        this.__updateLastPathStartPoint(x + width, y + height / 2);
        this._isDirty = true;
    };
    Graphics.prototype.drawGraphicsData = function (graphicsData) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    /**
     *
     * @param commands
     * @param data
     * @param winding
     * @param checkCommands Bulletproof
     */
    Graphics.prototype.drawPath = function (commands, data, winding, checkCommands) {
        if (winding === void 0) { winding = GraphicsPathWinding_1.GraphicsPathWinding.EVEN_ODD; }
        if (checkCommands === void 0) { checkCommands = true; }
        if (checkCommands && !__checkPathCommands(commands, data)) {
            return;
        }
        var commandLength = commands.length;
        var j = 0;
        var isInFill = this._isFilling;
        var sr = this._currentStrokeRenderer;
        var fr = this._currentFillRenderer;
        var newX, newY;
        for (var i = 0; i < commandLength; ++i) {
            switch (commands[i]) {
                case GraphicsPathCommand_1.GraphicsPathCommand.CUBIC_CURVE_TO:
                    if (isInFill) {
                        fr.bezierCurveTo(data[j], data[j + 1], data[j + 2], data[j + 3], data[j + 4], data[j + 5]);
                    }
                    sr.bezierCurveTo(data[j], data[j + 1], data[j + 2], data[j + 3], data[j + 4], data[j + 5]);
                    newX = data[j + 4];
                    newY = data[j + 5];
                    j += 6;
                    break;
                case GraphicsPathCommand_1.GraphicsPathCommand.CURVE_TO:
                    if (isInFill) {
                        fr.curveTo(data[j], data[j + 1], data[j + 2], data[j + 3]);
                    }
                    sr.curveTo(data[j], data[j + 1], data[j + 2], data[j + 3]);
                    newX = data[j + 2];
                    newY = data[j + 3];
                    j += 4;
                    break;
                case GraphicsPathCommand_1.GraphicsPathCommand.LINE_TO:
                    if (isInFill) {
                        fr.lineTo(data[j], data[j + 1]);
                    }
                    sr.lineTo(data[j], data[j + 1]);
                    newX = data[j];
                    newY = data[j + 1];
                    j += 2;
                    break;
                case GraphicsPathCommand_1.GraphicsPathCommand.MOVE_TO:
                    if (isInFill) {
                        fr.moveTo(data[j], data[j + 1]);
                    }
                    sr.moveTo(data[j], data[j + 1]);
                    newX = data[j];
                    newY = data[j + 1];
                    j += 2;
                    break;
                case GraphicsPathCommand_1.GraphicsPathCommand.NO_OP:
                    break;
                case GraphicsPathCommand_1.GraphicsPathCommand.WIDE_LINE_TO:
                    if (isInFill) {
                        fr.lineTo(data[j + 2], data[j + 3]);
                    }
                    sr.lineTo(data[j + 2], data[j + 3]);
                    newX = data[j + 2];
                    newY = data[j + 3];
                    j += 4;
                    break;
                case GraphicsPathCommand_1.GraphicsPathCommand.WIDE_MOVE_TO:
                    if (isInFill) {
                        fr.moveTo(data[j + 2], data[j + 3]);
                    }
                    sr.moveTo(data[j + 2], data[j + 3]);
                    newX = data[j + 2];
                    newY = data[j + 3];
                    j += 4;
                    break;
                default:
                    break;
            }
        }
        if (commandLength > 0) {
            this.__updateCurrentPoint(newX, newY);
        }
        this._isDirty = true;
    };
    Graphics.prototype.drawRect = function (x, y, width, height) {
        if (this._isFilling) {
            this._currentFillRenderer.drawRect(x, y, width, height);
        }
        this._currentStrokeRenderer.drawRect(x, y, width, height);
        this.__updateCurrentPoint(x, y);
        this.__updateLastPathStartPoint(x, y);
        this._isDirty = true;
    };
    Graphics.prototype.drawRoundRect = function (x, y, width, height, ellipseWidth, ellipseHeight) {
        if (ellipseHeight === void 0) { ellipseHeight = NaN; }
        if (MathUtil_1.MathUtil.isNaN(ellipseHeight)) {
            ellipseHeight = ellipseWidth;
        }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Graphics.prototype.drawTriangles = function (vectors, indices, uvtData, culling) {
        if (indices === void 0) { indices = null; }
        if (uvtData === void 0) { uvtData = null; }
        if (culling === void 0) { culling = TriangleCulling_1.TriangleCulling.NONE; }
        // jabbany, mostly
        if (indices === null) {
            indices = [];
            for (var i = 0; i < vectors.length; i += 2) {
                indices.push(i / 2);
            }
        }
        else {
            indices = indices.slice(0);
        }
        if (indices.length % 3 !== 0) {
            GLUtil_1.GLUtil.trace("Graphics.drawTriangles malformed indices count. Must be multiple of 3.", "err");
            return;
        }
        /** Do culling of triangles here to lessen work later **/
        if (culling !== TriangleCulling_1.TriangleCulling.NONE) {
            for (var i = 0; i < indices.length / 3; i++) {
                var ux = vectors[2 * indices[i * 3 + 1]] - vectors[2 * indices[i * 3]], uy = vectors[2 * indices[i * 3 + 1] + 1] - vectors[2 * indices[i * 3] + 1], vx = vectors[2 * indices[i * 3 + 2]] - vectors[2 * indices[i * 3 + 1]], vy = vectors[2 * indices[i * 3 + 2] + 1] - vectors[2 * indices[i * 3 + 1] + 1];
                var zcomp = ux * vy - vx * uy;
                if (zcomp < 0 && culling === TriangleCulling_1.TriangleCulling.POSITIVE ||
                    zcomp > 0 && culling === TriangleCulling_1.TriangleCulling.NEGATIVE) {
                    /** Remove the indices. Leave the vertices. **/
                    indices.splice(i * 3, 3);
                    i--;
                }
            }
        }
        var commands = [], data = [];
        for (var i = 0; i < indices.length / 3; i++) {
            var a = indices[3 * i], b = indices[3 * i + 1], c = indices[3 * i + 2];
            var ax = vectors[2 * a], ay = vectors[2 * a + 1];
            var bx = vectors[2 * b], by = vectors[2 * b + 1];
            var cx = vectors[2 * c], cy = vectors[2 * c + 1];
            commands.push(1, 2, 2, 2);
            data.push(ax, ay, bx, by, cx, cy, ax, ay);
        }
        // TODO: Can be optimized by using native WebGL
        this.drawPath(commands, data, void (0), false);
    };
    Graphics.prototype.endFill = function () {
        if (this._isFilling) {
            this._isFilling = false;
            this._currentFillRenderer.endIndex = this._strokeRenderers.length - 1;
            this._currentFillRenderer.closePath();
            this._currentStrokeRenderer.closePath();
            this._fillRenderers.push(this._currentFillRenderer);
            if (this._currentFillRenderer.hasDrawnAnything) {
                this._isDirty = true;
            }
            this._currentFillRenderer = null;
        }
    };
    Graphics.prototype.lineBitmapStyle = function (bitmap, matrix, repeat, smooth) {
        if (matrix === void 0) { matrix = null; }
        if (repeat === void 0) { repeat = true; }
        if (smooth === void 0) { smooth = false; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Graphics.prototype.lineGradientStyle = function (type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio) {
        if (matrix === void 0) { matrix = null; }
        if (spreadMethod === void 0) { spreadMethod = SpreadMethod_1.SpreadMethod.PAD; }
        if (interpolationMethod === void 0) { interpolationMethod = InterpolationMethod_1.InterpolationMethod.RGB; }
        if (focalPointRatio === void 0) { focalPointRatio = 0; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Graphics.prototype.lineShaderStyle = function (shader, matrix) {
        if (matrix === void 0) { matrix = null; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Graphics.prototype.lineStyle = function (thickness, color, alpha, pixelHinting, scaleMode, caps, joints, miterLimit) {
        if (thickness === void 0) { thickness = NaN; }
        if (color === void 0) { color = 0; }
        if (alpha === void 0) { alpha = 1.0; }
        if (pixelHinting === void 0) { pixelHinting = false; }
        if (scaleMode === void 0) { scaleMode = LineScaleMode_1.LineScaleMode.NORMAL; }
        if (caps === void 0) { caps = null; }
        if (joints === void 0) { joints = null; }
        if (miterLimit === void 0) { miterLimit = 3; }
        if (this._lineType !== BrushType_1.BrushType.SOLID || this._lineWidth !== thickness || this._lineColor !== color || this._lineAlpha !== alpha) {
            this._lineType = BrushType_1.BrushType.SOLID;
            if (!MathUtil_1.MathUtil.isNaN(thickness)) {
                this._lineWidth = thickness;
            }
            this._lineColor = color;
            this._lineAlpha = alpha;
            this._currentStrokeRenderer = new SolidStrokeRenderer_1.SolidStrokeRenderer(this, this._lastPathStartX, this._lastPathStartY, this._currentX, this._currentY, thickness, color, alpha);
            this._strokeRenderers.push(this._currentStrokeRenderer);
        }
    };
    Graphics.prototype.lineTo = function (x, y) {
        if (this._isFilling) {
            this._currentFillRenderer.lineTo(x, y);
        }
        this._currentStrokeRenderer.lineTo(x, y);
        this.__updateCurrentPoint(x, y);
        this._isDirty = true;
    };
    Graphics.prototype.moveTo = function (x, y) {
        if (this._isFilling) {
            this._currentFillRenderer.moveTo(x, y);
        }
        this._currentStrokeRenderer.moveTo(x, y);
        this.__updateCurrentPoint(x, y);
        this.__updateLastPathStartPoint(x, y);
        this._isDirty = true;
    };
    Graphics.prototype.update = function (timeInfo) {
        if (this._isDirty) {
            var j = 0, fillLen = this._fillRenderers.length;
            for (var i = 0; i < this._strokeRenderers.length; ++i) {
                if (j < fillLen && i === this._fillRenderers[j].beginIndex) {
                    this._fillRenderers[j].update();
                    j++;
                }
                this._strokeRenderers[i].update();
            }
            this._shouldUpdateRenderTarget = true;
        }
        this._isDirty = false;
    };
    Graphics.prototype.render = function (renderer, target, clearOutput) {
        var j = 0, fillLen = this._fillRenderers.length;
        // TODO: Extend texture copy shader.
        // When _shouldUpdateRenderTarget and _bufferTarget are enabled, content of Graphics
        // is cached so that rendering performance is improved but transforms and alpha changes
        // are not reflected. To fix this behavior, consider extending the replicate shader to
        // support state changes.
        if (true || this._shouldUpdateRenderTarget) {
            this._bufferTarget.clear();
            for (var i = 0; i < this._strokeRenderers.length; ++i) {
                if (j < fillLen && i === this._fillRenderers[j].beginIndex) {
                    this._fillRenderers[j].render(renderer);
                    j++;
                }
                this._strokeRenderers[i].render(renderer);
            }
            this._shouldUpdateRenderTarget = false;
        }
    };
    Graphics.prototype.dispose = function () {
        this.clear();
        this._strokeRenderers.pop();
        this._currentStrokeRenderer.dispose();
        this._currentStrokeRenderer = null;
        this._bufferTarget.dispose();
        this._bufferTarget = null;
    };
    Object.defineProperty(Graphics.prototype, "renderer", {
        get: function () {
            return this._renderer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Graphics.prototype, "isFilling", {
        get: function () {
            return this._isFilling;
        },
        enumerable: true,
        configurable: true
    });
    Graphics.prototype.__createStrokeRendererWithCurrentSettings = function () {
        switch (this._lineType) {
            case BrushType_1.BrushType.SOLID:
                return new SolidStrokeRenderer_1.SolidStrokeRenderer(this, this._lastPathStartX, this._lastPathStartY, this._currentX, this._currentY, this._lineWidth, this._lineColor, this._lineAlpha);
            default:
                throw new NotImplementedError_1.NotImplementedError();
        }
    };
    Graphics.prototype.__updateCurrentPoint = function (x, y) {
        this._currentX = x;
        this._currentY = y;
    };
    Graphics.prototype.__updateLastPathStartPoint = function (x, y) {
        this._lastPathStartX = x;
        this._lastPathStartY = y;
    };
    Graphics.prototype.__resetStyles = function () {
        this._lineType = BrushType_1.BrushType.SOLID;
        this._lineWidth = 1;
        this._lineColor = 0x000000;
        this._lineAlpha = 1;
    };
    return Graphics;
}());
exports.Graphics = Graphics;
function __checkPathCommands(commands, data) {
    if (commands === null || data === null || data.length % 2 !== 0) {
        return false;
    }
    var commandLength = commands.length;
    var dataLength = data.length;
    for (var i = 0; i < commandLength; i++) {
        switch (commands[i]) {
            case GraphicsPathCommand_1.GraphicsPathCommand.CUBIC_CURVE_TO:
                dataLength -= 2 * 3;
                if (dataLength < 0) {
                    return false;
                }
                break;
            case GraphicsPathCommand_1.GraphicsPathCommand.CURVE_TO:
                dataLength -= 2 * 2;
                if (dataLength < 0) {
                    return false;
                }
                break;
            case GraphicsPathCommand_1.GraphicsPathCommand.LINE_TO:
                dataLength -= 2 * 1;
                if (dataLength < 0) {
                    return false;
                }
                break;
            case GraphicsPathCommand_1.GraphicsPathCommand.MOVE_TO:
                dataLength -= 2 * 1;
                if (dataLength < 0) {
                    return false;
                }
                break;
            case GraphicsPathCommand_1.GraphicsPathCommand.NO_OP:
                break;
            case GraphicsPathCommand_1.GraphicsPathCommand.WIDE_LINE_TO:
                dataLength -= 2 * 2;
                if (dataLength < 0) {
                    return false;
                }
                break;
            case GraphicsPathCommand_1.GraphicsPathCommand.WIDE_MOVE_TO:
                dataLength -= 2 * 2;
                if (dataLength < 0) {
                    return false;
                }
                break;
            default:
                return false;
        }
    }
    return true;
}



},{"../../glantern/GLUtil":94,"../../glantern/MathUtil":95,"../../webgl/graphics/BrushType":124,"../../webgl/graphics/SolidFillRenderer":128,"../../webgl/graphics/SolidStrokeRenderer":129,"../errors/NotImplementedError":51,"./GraphicsPathCommand":30,"./GraphicsPathWinding":31,"./InterpolationMethod":33,"./LineScaleMode":35,"./SpreadMethod":39,"./TriangleCulling":45}],30:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
"use strict";
var GraphicsPathCommand = (function () {
    function GraphicsPathCommand() {
    }
    Object.defineProperty(GraphicsPathCommand, "CUBIC_CURVE_TO", {
        get: function () {
            return 6;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphicsPathCommand, "CURVE_TO", {
        get: function () {
            return 3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphicsPathCommand, "LINE_TO", {
        get: function () {
            return 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphicsPathCommand, "MOVE_TO", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphicsPathCommand, "NO_OP", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphicsPathCommand, "WIDE_LINE_TO", {
        get: function () {
            return 5;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphicsPathCommand, "WIDE_MOVE_TO", {
        get: function () {
            return 4;
        },
        enumerable: true,
        configurable: true
    });
    return GraphicsPathCommand;
}());
exports.GraphicsPathCommand = GraphicsPathCommand;



},{}],31:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
"use strict";
var GraphicsPathWinding = (function () {
    function GraphicsPathWinding() {
    }
    Object.defineProperty(GraphicsPathWinding, "EVEN_ODD", {
        get: function () {
            return "evenOdd";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphicsPathWinding, "NON_ZERO", {
        get: function () {
            return "nonZero";
        },
        enumerable: true,
        configurable: true
    });
    return GraphicsPathWinding;
}());
exports.GraphicsPathWinding = GraphicsPathWinding;



},{}],32:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DisplayObject_1 = require("./DisplayObject");
var InteractiveObject = (function (_super) {
    __extends(InteractiveObject, _super);
    function InteractiveObject(root, parent) {
        _super.call(this, root, parent);
        this.doubleClickEnabled = true;
        this.focusRect = true;
        this.mouseEnabled = true;
        this.needsSoftKeyboard = false;
        this.tabEnabled = true;
        this.tabIndex = -1;
    }
    return InteractiveObject;
}(DisplayObject_1.DisplayObject));
exports.InteractiveObject = InteractiveObject;



},{"./DisplayObject":26}],33:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
"use strict";
var InterpolationMethod = (function () {
    function InterpolationMethod() {
    }
    Object.defineProperty(InterpolationMethod, "LINEAR_RGB", {
        get: function () {
            return 'linearRGB';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InterpolationMethod, "RGB", {
        get: function () {
            return 'rgb';
        },
        enumerable: true,
        configurable: true
    });
    return InterpolationMethod;
}());
exports.InterpolationMethod = InterpolationMethod;



},{}],34:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
"use strict";
var JointStyle = (function () {
    function JointStyle() {
    }
    Object.defineProperty(JointStyle, "BEVEL", {
        get: function () {
            return "bevel";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JointStyle, "MITER", {
        get: function () {
            return "miter";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JointStyle, "ROUND", {
        get: function () {
            return "round";
        },
        enumerable: true,
        configurable: true
    });
    return JointStyle;
}());
exports.JointStyle = JointStyle;



},{}],35:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
"use strict";
var LineScaleMode = (function () {
    function LineScaleMode() {
    }
    Object.defineProperty(LineScaleMode, "HORIZONTAL", {
        get: function () {
            return "horizontal";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineScaleMode, "NONE", {
        get: function () {
            return "none";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineScaleMode, "NORMAL", {
        get: function () {
            return "normal";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineScaleMode, "VERTICAL", {
        get: function () {
            return "vertical";
        },
        enumerable: true,
        configurable: true
    });
    return LineScaleMode;
}());
exports.LineScaleMode = LineScaleMode;



},{}],36:[function(require,module,exports){
/**
 * Created by MIC on 2016/6/15.
 */
"use strict";
var PixelSnapping = (function () {
    function PixelSnapping() {
    }
    Object.defineProperty(PixelSnapping, "ALWAYS", {
        get: function () {
            return "always";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PixelSnapping, "AUTO", {
        get: function () {
            return "auto";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PixelSnapping, "NEVER", {
        get: function () {
            return "never";
        },
        enumerable: true,
        configurable: true
    });
    return PixelSnapping;
}());
exports.PixelSnapping = PixelSnapping;



},{}],37:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
"use strict";
var Shader = (function () {
    function Shader() {
    }
    return Shader;
}());
exports.Shader = Shader;



},{}],38:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DisplayObject_1 = require("./DisplayObject");
var Graphics_1 = require("./Graphics");
var ShaderID_1 = require("../../webgl/ShaderID");
var Shape = (function (_super) {
    __extends(Shape, _super);
    function Shape(root, parent) {
        _super.call(this, root, parent);
        this._graphics = null;
        this._graphics = new Graphics_1.Graphics(this, root.worldRenderer);
    }
    Shape.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._graphics.dispose();
        this._graphics = null;
    };
    Object.defineProperty(Shape.prototype, "graphics", {
        get: function () {
            return this._graphics;
        },
        enumerable: true,
        configurable: true
    });
    Shape.prototype._$update = function (timeInfo) {
        this._graphics.update(timeInfo);
    };
    Shape.prototype._$render = function (renderer) {
        this.graphics.render(renderer, renderer.currentRenderTarget, false);
    };
    Shape.prototype._$selectShader = function (shaderManager) {
        // Switched to the new Primitive2Shader. Consider the obsolete of PrimitiveShader.
        shaderManager.selectShader(ShaderID_1.ShaderID.PRIMITIVE2);
    };
    return Shape;
}(DisplayObject_1.DisplayObject));
exports.Shape = Shape;



},{"../../webgl/ShaderID":110,"./DisplayObject":26,"./Graphics":29}],39:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
"use strict";
var SpreadMethod = (function () {
    function SpreadMethod() {
    }
    Object.defineProperty(SpreadMethod, "PAD", {
        get: function () {
            return "pad";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpreadMethod, "REFLECT", {
        get: function () {
            return "reflect";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpreadMethod, "REPEAT", {
        get: function () {
            return "repeat";
        },
        enumerable: true,
        configurable: true
    });
    return SpreadMethod;
}());
exports.SpreadMethod = SpreadMethod;



},{}],40:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ColorCorrectionSupport_1 = require("./ColorCorrectionSupport");
var StageScaleMode_1 = require("./StageScaleMode");
var StageQuality_1 = require("./StageQuality");
var StageDisplayState_1 = require("./StageDisplayState");
var ColorCorrection_1 = require("./ColorCorrection");
var StageAlign_1 = require("./StageAlign");
var DisplayObjectContainer_1 = require("./DisplayObjectContainer");
var NotImplementedError_1 = require("../errors/NotImplementedError");
var Stage = (function (_super) {
    __extends(Stage, _super);
    function Stage(renderer) {
        _super.call(this, null, null);
        this.align = StageAlign_1.StageAlign.TOP_LEFT;
        this.color = 0x000000;
        this.colorCorrection = ColorCorrection_1.ColorCorrection.DEFAULT;
        this.displayState = StageDisplayState_1.StageDisplayState.NORMAL;
        this.focus = null;
        this.frameRate = 60;
        this.fullScreenSourceRect = null;
        this.mouseChildren = true;
        this.quality = StageQuality_1.StageQuality.HIGH;
        this.scaleMode = StageScaleMode_1.StageScaleMode.NO_SCALE;
        this.showDefaultContextMenu = true;
        this.tabChildren = true;
        this._allowFullScreen = true;
        this._allowFullScreenInteractive = true;
        this._colorCorrectionSupport = ColorCorrectionSupport_1.ColorCorrectionSupport.DEFAULT_OFF;
        this._worldRenderer = null;
        this._root = this;
        this._worldRenderer = renderer;
        this.resize(renderer.view.width, renderer.view.height);
    }
    Object.defineProperty(Stage.prototype, "allowFullScreen", {
        get: function () {
            return this._allowFullScreen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "allowFullScreenInteractive", {
        get: function () {
            return this._allowFullScreenInteractive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "colorCorrectionSupport", {
        get: function () {
            return this._colorCorrectionSupport;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "fullScreenHeight", {
        get: function () {
            return screen.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "fullScreenWidth", {
        get: function () {
            return screen.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "softKeyboardRect", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "stageHeight", {
        get: function () {
            return this.worldRenderer.view.height;
        },
        set: function (v) {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "stageWidth", {
        get: function () {
            return this.worldRenderer.view.width;
        },
        set: function (v) {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "x", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "y", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "width", {
        get: function () {
            return this.worldRenderer.view.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "height", {
        get: function () {
            return this.worldRenderer.view.height;
        },
        enumerable: true,
        configurable: true
    });
    Stage.prototype.invalidate = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Stage.prototype.isFocusInaccessible = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Object.defineProperty(Stage.prototype, "worldRenderer", {
        get: function () {
            return this._worldRenderer;
        },
        enumerable: true,
        configurable: true
    });
    Stage.prototype.resize = function (width, height) {
        this._width = width;
        this._height = height;
        // TODO: Fully implement this
    };
    Stage.prototype._$update = function (timeInfo) {
    };
    Stage.prototype._$render = function (renderer) {
        renderer.currentRenderTarget.clear();
    };
    return Stage;
}(DisplayObjectContainer_1.DisplayObjectContainer));
exports.Stage = Stage;



},{"../errors/NotImplementedError":51,"./ColorCorrection":24,"./ColorCorrectionSupport":25,"./DisplayObjectContainer":27,"./StageAlign":41,"./StageDisplayState":42,"./StageQuality":43,"./StageScaleMode":44}],41:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var StageAlign = (function () {
    function StageAlign() {
    }
    Object.defineProperty(StageAlign, "BOTTOM", {
        get: function () {
            return 'B';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageAlign, "BOTTOM_LEFT", {
        get: function () {
            return 'BL';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageAlign, "BOTTOM_RIGHT", {
        get: function () {
            return 'BR';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageAlign, "LEFT", {
        get: function () {
            return 'L';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageAlign, "RIGHT", {
        get: function () {
            return 'R';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageAlign, "TOP", {
        get: function () {
            return 'T';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageAlign, "TOP_LEFT", {
        get: function () {
            return 'TL';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageAlign, "TOP_RIGHT", {
        get: function () {
            return 'TR';
        },
        enumerable: true,
        configurable: true
    });
    return StageAlign;
}());
exports.StageAlign = StageAlign;



},{}],42:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var StageDisplayState = (function () {
    function StageDisplayState() {
    }
    Object.defineProperty(StageDisplayState, "FULL_SCREEN", {
        get: function () {
            return 'fullScreen';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageDisplayState, "FULL_SCREEN_INTERACTIVE", {
        get: function () {
            return 'fullScreenInteractive';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageDisplayState, "NORMAL", {
        get: function () {
            return 'normal';
        },
        enumerable: true,
        configurable: true
    });
    return StageDisplayState;
}());
exports.StageDisplayState = StageDisplayState;



},{}],43:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var StageQuality = (function () {
    function StageQuality() {
    }
    Object.defineProperty(StageQuality, "BEST", {
        get: function () {
            return 'best';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageQuality, "HIGH", {
        get: function () {
            return 'high';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageQuality, "LOW", {
        get: function () {
            return 'low';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageQuality, "MEDIUM", {
        get: function () {
            return 'medium';
        },
        enumerable: true,
        configurable: true
    });
    return StageQuality;
}());
exports.StageQuality = StageQuality;



},{}],44:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var StageScaleMode = (function () {
    function StageScaleMode() {
    }
    Object.defineProperty(StageScaleMode, "EXACT_FIT", {
        get: function () {
            return 'exactFit';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageScaleMode, "NO_BORDER", {
        get: function () {
            return 'noBorder';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageScaleMode, "NO_SCALE", {
        get: function () {
            return 'noScale';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageScaleMode, "SHOW_ALL", {
        get: function () {
            return 'showAll';
        },
        enumerable: true,
        configurable: true
    });
    return StageScaleMode;
}());
exports.StageScaleMode = StageScaleMode;



},{}],45:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
"use strict";
var TriangleCulling = (function () {
    function TriangleCulling() {
    }
    Object.defineProperty(TriangleCulling, "NEGATIVE", {
        get: function () {
            return "negative";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleCulling, "NONE", {
        get: function () {
            return "none";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleCulling, "POSITIVE", {
        get: function () {
            return "positive";
        },
        enumerable: true,
        configurable: true
    });
    return TriangleCulling;
}());
exports.TriangleCulling = TriangleCulling;



},{}],46:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./Bitmap"));
__export(require("./BitmapData"));
__export(require("./BitmapDataChannel"));
__export(require("./BlendMode"));
__export(require("./CapsStyle"));
__export(require("./ColorCorrection"));
__export(require("./ColorCorrectionSupport"));
__export(require("./DisplayObject"));
__export(require("./DisplayObjectContainer"));
__export(require("./GradientType"));
__export(require("./Graphics"));
__export(require("./GraphicsPathCommand"));
__export(require("./GraphicsPathWinding"));
__export(require("./InteractiveObject"));
__export(require("./InterpolationMethod"));
__export(require("./JointStyle"));
__export(require("./LineScaleMode"));
__export(require("./PixelSnapping"));
__export(require("./Shader"));
__export(require("./Shape"));
__export(require("./SpreadMethod"));
__export(require("./Stage"));
__export(require("./StageAlign"));
__export(require("./StageDisplayState"));
__export(require("./StageQuality"));
__export(require("./StageScaleMode"));
__export(require("./TriangleCulling"));



},{"./Bitmap":19,"./BitmapData":20,"./BitmapDataChannel":21,"./BlendMode":22,"./CapsStyle":23,"./ColorCorrection":24,"./ColorCorrectionSupport":25,"./DisplayObject":26,"./DisplayObjectContainer":27,"./GradientType":28,"./Graphics":29,"./GraphicsPathCommand":30,"./GraphicsPathWinding":31,"./InteractiveObject":32,"./InterpolationMethod":33,"./JointStyle":34,"./LineScaleMode":35,"./PixelSnapping":36,"./Shader":37,"./Shape":38,"./SpreadMethod":39,"./Stage":40,"./StageAlign":41,"./StageDisplayState":42,"./StageQuality":43,"./StageScaleMode":44,"./TriangleCulling":45}],47:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by MIC on 2016/6/8.
 */
var ErrorBase_1 = require("../../glantern/ErrorBase");
var ApplicationError = (function (_super) {
    __extends(ApplicationError, _super);
    function ApplicationError(message) {
        if (message === void 0) { message = ""; }
        _super.call(this, message);
    }
    Object.defineProperty(ApplicationError.prototype, "name", {
        get: function () {
            return "ApplicationError";
        },
        enumerable: true,
        configurable: true
    });
    return ApplicationError;
}(ErrorBase_1.ErrorBase));
exports.ApplicationError = ApplicationError;



},{"../../glantern/ErrorBase":92}],48:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ErrorBase_1 = require("../../glantern/ErrorBase");
var ArgumentError = (function (_super) {
    __extends(ArgumentError, _super);
    function ArgumentError(message, argument) {
        if (message === void 0) { message = ""; }
        if (argument === void 0) { argument = null; }
        _super.call(this, message);
        this._argument = null;
        this._argument = argument;
    }
    Object.defineProperty(ArgumentError.prototype, "argument", {
        get: function () {
            return this._argument;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ArgumentError.prototype, "name", {
        get: function () {
            return "ArgumentError";
        },
        enumerable: true,
        configurable: true
    });
    return ArgumentError;
}(ErrorBase_1.ErrorBase));
exports.ArgumentError = ArgumentError;



},{"../../glantern/ErrorBase":92}],49:[function(require,module,exports){
/**
 * Created by MIC on 2016/6/11.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ErrorBase_1 = require("../../glantern/ErrorBase");
var EOFError = (function (_super) {
    __extends(EOFError, _super);
    function EOFError(message) {
        if (message === void 0) { message = ""; }
        _super.call(this, message);
    }
    Object.defineProperty(EOFError.prototype, "name", {
        get: function () {
            return "EOFError";
        },
        enumerable: true,
        configurable: true
    });
    return EOFError;
}(ErrorBase_1.ErrorBase));
exports.EOFError = EOFError;



},{"../../glantern/ErrorBase":92}],50:[function(require,module,exports){
/**
 * Created by MIC on 2016/6/11.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ErrorBase_1 = require("../../glantern/ErrorBase");
var IOError = (function (_super) {
    __extends(IOError, _super);
    function IOError(message) {
        if (message === void 0) { message = ""; }
        _super.call(this, message);
    }
    Object.defineProperty(IOError.prototype, "name", {
        get: function () {
            return "IOError";
        },
        enumerable: true,
        configurable: true
    });
    return IOError;
}(ErrorBase_1.ErrorBase));
exports.IOError = IOError;



},{"../../glantern/ErrorBase":92}],51:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ErrorBase_1 = require("../../glantern/ErrorBase");
var NotImplementedError = (function (_super) {
    __extends(NotImplementedError, _super);
    function NotImplementedError(message) {
        if (message === void 0) { message = ""; }
        _super.call(this, message);
    }
    Object.defineProperty(NotImplementedError.prototype, "name", {
        get: function () {
            return "NotImplementedError";
        },
        enumerable: true,
        configurable: true
    });
    return NotImplementedError;
}(ErrorBase_1.ErrorBase));
exports.NotImplementedError = NotImplementedError;



},{"../../glantern/ErrorBase":92}],52:[function(require,module,exports){
/**
 * Created by MIC on 2016/6/8.
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./ApplicationError"));
__export(require("./ArgumentError"));
__export(require("./NotImplementedError"));
__export(require("./IOError"));
__export(require("./EOFError"));



},{"./ApplicationError":47,"./ArgumentError":48,"./EOFError":49,"./IOError":50,"./NotImplementedError":51}],53:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var GLUtil_1 = require("../../glantern/GLUtil");
var EventDispatcher = (function () {
    function EventDispatcher() {
        this._listeners = null;
        this._listeners = new Map();
    }
    EventDispatcher.prototype.addEventListener = function (type, listener, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        // jabbany
        if (!this._listeners.has(type)) {
            this._listeners.set(type, []);
        }
        this._listeners.get(type).push(listener);
    };
    EventDispatcher.prototype.dispatchEvent = function (event, data) {
        // jabbany
        if (this._listeners.has(event.type) && this._listeners.get(event.type) !== null) {
            var arr = this._listeners.get(event.type);
            for (var i = 0; i < arr.length; ++i) {
                try {
                    arr[i].call(null, data);
                }
                catch (ex) {
                    GLUtil_1.GLUtil.trace(ex.toString(), "dispatchEvent: error");
                }
            }
            return true;
        }
        else {
            return false;
        }
    };
    EventDispatcher.prototype.removeEventListener = function (type, listener, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        // jabbany
        if (!this._listeners.has(type) || this._listeners.get(type).length === 0) {
            return;
        }
        var index = this._listeners.get(type).indexOf(listener);
        if (index >= 0) {
            this._listeners.get(type).splice(index, 1);
        }
    };
    EventDispatcher.prototype.hasEventListener = function (type) {
        return this._listeners.has(type);
    };
    EventDispatcher.prototype.willTrigger = function (type) {
        return this.hasEventListener(type) && this._listeners.get(type).length > 0;
    };
    EventDispatcher.prototype.dispose = function () {
        this._listeners.forEach(function (listeners) {
            while (listeners.length > 0) {
                listeners.pop();
            }
        });
        this._listeners.clear();
    };
    return EventDispatcher;
}());
exports.EventDispatcher = EventDispatcher;



},{"../../glantern/GLUtil":94}],54:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/21.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventBase_1 = require("../../glantern/EventBase");
var FlashEvent = (function (_super) {
    __extends(FlashEvent, _super);
    function FlashEvent() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(FlashEvent, "ENTER_FRAME", {
        get: function () {
            return "enterFrame";
        },
        enumerable: true,
        configurable: true
    });
    return FlashEvent;
}(EventBase_1.EventBase));
exports.FlashEvent = FlashEvent;



},{"../../glantern/EventBase":93}],55:[function(require,module,exports){
/**
 * Created by MIC on 2016/1/7.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FlashEvent_1 = require("./FlashEvent");
var NotImplementedError_1 = require("../errors/NotImplementedError");
var TimerEvent = (function (_super) {
    __extends(TimerEvent, _super);
    function TimerEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    Object.defineProperty(TimerEvent, "TIMER", {
        get: function () {
            return 'timer';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimerEvent, "TIMER_COMPLETE", {
        get: function () {
            return 'timerComplete';
        },
        enumerable: true,
        configurable: true
    });
    TimerEvent.prototype.updateAfterEvent = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TimerEvent.prototype.clone = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    return TimerEvent;
}(FlashEvent_1.FlashEvent));
exports.TimerEvent = TimerEvent;



},{"../errors/NotImplementedError":51,"./FlashEvent":54}],56:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./EventDispatcher"));
var FlashEvent_1 = require("./FlashEvent");
exports.Event = FlashEvent_1.FlashEvent;
__export(require("./TimerEvent"));



},{"./EventDispatcher":53,"./FlashEvent":54,"./TimerEvent":55}],57:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/30.
 */
"use strict";
var BitmapFilterQuality = (function () {
    function BitmapFilterQuality() {
    }
    Object.defineProperty(BitmapFilterQuality, "HIGH", {
        get: function () {
            return 3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BitmapFilterQuality, "LOW", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BitmapFilterQuality, "MEDIUM", {
        get: function () {
            return 2;
        },
        enumerable: true,
        configurable: true
    });
    return BitmapFilterQuality;
}());
exports.BitmapFilterQuality = BitmapFilterQuality;



},{}],58:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/30.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Blur2Filter_1 = require("../../webgl/filters/Blur2Filter");
var BitmapFilterQuality_1 = require("./BitmapFilterQuality");
/**
 * Derive from {@link BlurFilter} for better performance, or {@link Blur2Filter} for better quality.
 */
var BlurFilter = (function (_super) {
    __extends(BlurFilter, _super);
    function BlurFilter(filterManager, blurX, blurY, quality) {
        if (blurX === void 0) { blurX = 4.0; }
        if (blurY === void 0) { blurY = 4.0; }
        if (quality === void 0) { quality = BitmapFilterQuality_1.BitmapFilterQuality.LOW; }
        _super.call(this, filterManager);
        this.blurX = blurX;
        this.blurY = blurY;
        this.quality = quality;
    }
    Object.defineProperty(BlurFilter.prototype, "blurX", {
        get: function () {
            return this.strengthX;
        },
        set: function (v) {
            this.strengthX = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlurFilter.prototype, "blurY", {
        get: function () {
            return this.strengthY;
        },
        set: function (v) {
            this.strengthY = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlurFilter.prototype, "quality", {
        get: function () {
            return this.pass;
        },
        set: function (v) {
            this.pass = v;
        },
        enumerable: true,
        configurable: true
    });
    BlurFilter.prototype.clone = function () {
        return new BlurFilter(this.filterManager, this.blurX, this.blurY, this.quality);
    };
    return BlurFilter;
}(Blur2Filter_1.Blur2Filter));
exports.BlurFilter = BlurFilter;



},{"../../webgl/filters/Blur2Filter":117,"./BitmapFilterQuality":57}],59:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/30.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GlowFilter_1 = require("../../webgl/filters/GlowFilter");
var BitmapFilterQuality_1 = require("./BitmapFilterQuality");
var MathUtil_1 = require("../../glantern/MathUtil");
var GlowFilter = (function (_super) {
    __extends(GlowFilter, _super);
    function GlowFilter(filterManager, color, alpha, blurX, blurY, strength, quality, inner, knockout) {
        if (color === void 0) { color = 0xff0000; }
        if (alpha === void 0) { alpha = 1.0; }
        if (blurX === void 0) { blurX = 6.0; }
        if (blurY === void 0) { blurY = 6.0; }
        if (strength === void 0) { strength = 2; }
        if (quality === void 0) { quality = BitmapFilterQuality_1.BitmapFilterQuality.LOW; }
        if (inner === void 0) { inner = false; }
        if (knockout === void 0) { knockout = false; }
        _super.call(this, filterManager);
        this.inner = false;
        this.knockout = false;
        this.strength = 2;
        this._color = 0x000000;
        this._alpha = 1;
        this.color = color;
        this.alpha = MathUtil_1.MathUtil.clamp(alpha, 0, 1);
        this.blurX = blurX;
        this.blurY = blurY;
        this.strength = strength;
        this.quality = quality;
        this.inner = inner;
        this.knockout = knockout;
    }
    Object.defineProperty(GlowFilter.prototype, "alpha", {
        get: function () {
            return this._alpha;
        },
        set: function (v) {
            var b = v !== this.alpha;
            this._alpha = v;
            if (b) {
                this.__updateColorMatrix();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlowFilter.prototype, "blurX", {
        get: function () {
            return this.strengthX;
        },
        set: function (v) {
            this.strengthX = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlowFilter.prototype, "blurY", {
        get: function () {
            return this.strengthY;
        },
        set: function (v) {
            this.strengthY = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlowFilter.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (v) {
            v |= 0;
            var b = v !== this._color;
            this._color = v;
            if (b) {
                this.__updateColorMatrix();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlowFilter.prototype, "quality", {
        get: function () {
            return this.pass;
        },
        set: function (v) {
            this.pass = v;
        },
        enumerable: true,
        configurable: true
    });
    GlowFilter.prototype.clone = function () {
        return new GlowFilter(this.filterManager, this.color, this.alpha, this.blurX, this.blurY, this.strength, this.quality, this.inner, this.knockout);
    };
    GlowFilter.prototype.__updateColorMatrix = function () {
        var r = ((this._color >>> 16) & 0xff) / 0xff;
        var g = ((this._color >>> 8) & 0xff) / 0xff;
        var b = (this._color & 0xff) / 0xff;
        var a = this._alpha;
        var cm = [
            0, 0, 0, r, 0,
            0, 0, 0, g, 0,
            0, 0, 0, b, 0,
            0, 0, 0, a, 0
        ];
        this.setColorMatrix(cm);
    };
    return GlowFilter;
}(GlowFilter_1.GlowFilter));
exports.GlowFilter = GlowFilter;



},{"../../glantern/MathUtil":95,"../../webgl/filters/GlowFilter":122,"./BitmapFilterQuality":57}],60:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/30.
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./BitmapFilterQuality"));
__export(require("./BlurFilter"));
__export(require("./GlowFilter"));



},{"./BitmapFilterQuality":57,"./BlurFilter":58,"./GlowFilter":59}],61:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var NotImplementedError_1 = require("../errors/NotImplementedError");
var MathUtil_1 = require("../../glantern/MathUtil");
var GLUtil_1 = require("../../glantern/GLUtil");
var ColorTransform = (function () {
    function ColorTransform(redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset) {
        if (redMultiplier === void 0) { redMultiplier = 1; }
        if (greenMultiplier === void 0) { greenMultiplier = 1; }
        if (blueMultiplier === void 0) { blueMultiplier = 1; }
        if (alphaMultiplier === void 0) { alphaMultiplier = 1; }
        if (redOffset === void 0) { redOffset = 0; }
        if (greenOffset === void 0) { greenOffset = 0; }
        if (blueOffset === void 0) { blueOffset = 0; }
        if (alphaOffset === void 0) { alphaOffset = 0; }
        this.color = 0;
        this._alphaMultiplier = 1;
        this._alphaOffset = 0;
        this._redMultiplier = 1;
        this._redOffset = 0;
        this._greenMultiplier = 1;
        this._greenOffset = 0;
        this._blueMultiplier = 1;
        this._blueOffset = 0;
        this.redMultiplier = redMultiplier;
        this.greenMultiplier = greenMultiplier;
        this.blueMultiplier = blueMultiplier;
        this.alphaMultiplier = alphaMultiplier;
        this.redOffset = redOffset;
        this.greenOffset = greenOffset;
        this.blueOffset = blueOffset;
        this.alphaOffset = alphaOffset;
    }
    Object.defineProperty(ColorTransform.prototype, "alphaMultiplier", {
        get: function () {
            return this._alphaMultiplier;
        },
        set: function (v) {
            this._alphaMultiplier = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorTransform.prototype, "alphaOffset", {
        get: function () {
            return this._alphaOffset;
        },
        set: function (v) {
            this._alphaOffset = MathUtil_1.MathUtil.clamp(v, -1, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorTransform.prototype, "redMultiplier", {
        get: function () {
            return this._redMultiplier;
        },
        set: function (v) {
            this._redMultiplier = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorTransform.prototype, "redOffset", {
        get: function () {
            return this._redOffset;
        },
        set: function (v) {
            this._redOffset = MathUtil_1.MathUtil.clamp(v, -1, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorTransform.prototype, "greenMultiplier", {
        get: function () {
            return this._greenMultiplier;
        },
        set: function (v) {
            this._greenMultiplier = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorTransform.prototype, "greenOffset", {
        get: function () {
            return this._greenOffset;
        },
        set: function (v) {
            this._greenOffset = MathUtil_1.MathUtil.clamp(v, -1, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorTransform.prototype, "blueMultiplier", {
        get: function () {
            return this._blueMultiplier;
        },
        set: function (v) {
            this._blueMultiplier = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorTransform.prototype, "blueOffset", {
        get: function () {
            return this._blueOffset;
        },
        set: function (v) {
            this._blueOffset = MathUtil_1.MathUtil.clamp(v, -1, 1);
        },
        enumerable: true,
        configurable: true
    });
    ColorTransform.prototype.concat = function (second) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    // MIC
    ColorTransform.prototype.transform = function (color) {
        var rgba = GLUtil_1.GLUtil.decomposeRgba(color);
        rgba.r = MathUtil_1.MathUtil.clamp(rgba.r * this.redMultiplier + this.redOffset, 0, 0xff);
        rgba.g = MathUtil_1.MathUtil.clamp(rgba.g * this.greenMultiplier + this.greenOffset, 0, 0xff);
        rgba.b = MathUtil_1.MathUtil.clamp(rgba.b * this.blueMultiplier + this.blueOffset, 0, 0xff);
        rgba.a = MathUtil_1.MathUtil.clamp(rgba.a * this.alphaMultiplier + this.alphaOffset, 0, 0xff);
        return GLUtil_1.GLUtil.rgba(rgba.r, rgba.g, rgba.b, rgba.a);
    };
    return ColorTransform;
}());
exports.ColorTransform = ColorTransform;



},{"../../glantern/GLUtil":94,"../../glantern/MathUtil":95,"../errors/NotImplementedError":51}],62:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var Point_1 = require("./Point");
var NotImplementedError_1 = require("../errors/NotImplementedError");
var Matrix = (function () {
    function Matrix(a, b, c, d, tx, ty) {
        if (a === void 0) { a = 1; }
        if (b === void 0) { b = 0; }
        if (c === void 0) { c = 1; }
        if (d === void 0) { d = 1; }
        if (tx === void 0) { tx = 0; }
        if (ty === void 0) { ty = 0; }
        this._data = [a, c, tx, b, d, ty, 0, 0, 1];
    }
    Object.defineProperty(Matrix.prototype, "a", {
        get: function () {
            return this._data[0];
        },
        set: function (v) {
            this._data[0] = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "b", {
        get: function () {
            return this._data[3];
        },
        set: function (v) {
            this._data[3] = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "c", {
        get: function () {
            return this._data[1];
        },
        set: function (v) {
            this._data[1] = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "d", {
        get: function () {
            return this._data[4];
        },
        set: function (v) {
            this._data[4] = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "tx", {
        get: function () {
            return this._data[2];
        },
        set: function (v) {
            this._data[2] = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "ty", {
        get: function () {
            return this._data[5];
        },
        set: function (v) {
            this._data[5] = v;
        },
        enumerable: true,
        configurable: true
    });
    Matrix.prototype.clone = function () {
        return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
    };
    Matrix.prototype.concat = function (m) {
        this._data = Matrix.__dotProduct(this._data, m._data);
    };
    Matrix.prototype.copyColumnFrom = function (column, vector3D) {
        if (column < 0 || column > 2) {
            throw new RangeError('Column must be 0, 1, or 2.');
        }
        this._data[column * 3] = vector3D.x;
        this._data[1 + column * 3] = vector3D.y;
        this._data[2 + column * 3] = vector3D.z;
    };
    Matrix.prototype.copyColumnTo = function (column, vector3D) {
        if (column < 0 || column > 2) {
            throw new RangeError('Column must be 0, 1, or 2.');
        }
        vector3D.x = this._data[column * 3];
        vector3D.y = this._data[1 + column * 3];
        vector3D.z = this._data[2 + column * 3];
    };
    Matrix.prototype.copyFrom = function (sourceMatrix) {
        this._data = sourceMatrix._data.slice();
    };
    Matrix.prototype.copyRowFrom = function (row, vector3D) {
        if (row < 0 || row > 2) {
            throw new RangeError('Row must be 0, 1, or 2.');
        }
        this._data[row] = vector3D.x;
        this._data[row + 3] = vector3D.y;
        this._data[row + 6] = vector3D.z;
    };
    Matrix.prototype.copyRowTo = function (row, vector3D) {
        if (row < 0 || row > 2) {
            throw new RangeError('Column must be 0, 1, or 2.');
        }
        vector3D.x = this._data[row];
        vector3D.y = this._data[3 + row];
        vector3D.z = this._data[6 + row];
    };
    Matrix.prototype.createBox = function (scaleX, scaleY, rotation, tx, ty) {
        if (rotation === void 0) { rotation = 0; }
        if (tx === void 0) { tx = 0; }
        if (ty === void 0) { ty = 0; }
        this.identity();
        this.rotate(rotation);
        this.scale(scaleX, scaleY);
        this.translate(tx, ty);
    };
    Matrix.prototype.createGradientBox = function (width, height, rotation, tx, ty) {
        if (rotation === void 0) { rotation = 0; }
        if (tx === void 0) { tx = 0; }
        if (ty === void 0) { ty = 0; }
        this.createBox(width, height, rotation, tx, ty);
    };
    Matrix.prototype.deltaTransformPoint = function (point) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Matrix.prototype.identity = function () {
        this._data = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    };
    Matrix.prototype.invert = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Matrix.prototype.rotate = function (angle) {
        this._data = Matrix.__dotProduct(this._data, [
            Math.cos(angle), -Math.sin(angle), 0,
            Math.sin(angle), Math.cos(angle), 0,
            0, 0, 1
        ]);
    };
    Matrix.prototype.scale = function (sx, sy) {
        this._data = Matrix.__dotProduct(this._data, [
            sx, 0, 0,
            0, sy, 0,
            0, 0, 1
        ]);
    };
    Matrix.prototype.skew = function (skewX, skewY) {
        this._data = Matrix.__dotProduct(this._data, [
            0, Math.tan(skewX), 0,
            Math.tan(skewY), 0, 0,
            0, 0, 1
        ]);
    };
    Matrix.prototype.setTo = function (aa, ba, ca, da, txa, tya) {
        this._data = [aa, ca, txa, ba, da, tya, 0, 0, 1];
    };
    Matrix.prototype.toString = function () {
        return "[" + this.a + " " + this.b + " 0\r\n" + this.c + " " + this.d + " 0\r\n" + this.tx + " " + this.ty + " 1]";
    };
    Matrix.prototype.transformPoint = function (point) {
        // 由于 Flash 所用的矩阵是转置过的，所以这里变成了行×行
        //var pointVector = [point.x, point.y, 1];
        //var x = pointVector[0] * this._data[0] + pointVector[1] * this._data[1] + pointVector[2] * this._data[2];
        //var y = pointVector[0] * this._data[3] + pointVector[1] * this._data[4] + pointVector[2] * this._data[5];
        //return new Point(x, y);
        return new Point_1.Point(point.x * this._data[0] + point.y * this._data[1] + this._data[2], point.x * this._data[3] + point.y * this._data[4] + this._data[5]);
    };
    Matrix.prototype.translate = function (dx, dy) {
        this.tx += dx;
        this.ty += dy;
    };
    Matrix.__dotProduct = function (a, b) {
        if (b.length != 9) {
            throw new Error('Matrix dot product requires a 3x3 matrix.');
        }
        var result = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                for (var k = 0; k < 3; k++) {
                    result[i * 3 + j] += a[i * 3 + k] * b[k * 3 + j];
                }
            }
        }
        return result;
    };
    return Matrix;
}());
exports.Matrix = Matrix;



},{"../errors/NotImplementedError":51,"./Point":66}],63:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var Vector3D_1 = require("./Vector3D");
var Orientation3D_1 = require("./Orientation3D");
var NotImplementedError_1 = require("../errors/NotImplementedError");
var ArgumentError_1 = require("../errors/ArgumentError");
var ApplicationError_1 = require("../errors/ApplicationError");
var MathUtil_1 = require("../../glantern/MathUtil");
var Matrix3D = (function () {
    function Matrix3D(v) {
        if (v === void 0) { v = null; }
        this.position = null;
        this._data = null;
        if (v === null || v.length <= 0) {
            v = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ];
        }
        this.rawData = v;
    }
    Object.defineProperty(Matrix3D.prototype, "determinant", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix3D.prototype, "rawData", {
        get: function () {
            return this._data;
        },
        set: function (v) {
            if (v.length < 16) {
                throw new Error("Data length of Matrix3D must be no less than 16.");
            }
            this._data = v.slice();
        },
        enumerable: true,
        configurable: true
    });
    Matrix3D.prototype.append = function (lhs) {
        this._data = Matrix3D.__dotProduct(lhs._data, this._data);
    };
    Matrix3D.prototype.appendRotation = function (degrees, axis, pivotPoint) {
        if (pivotPoint === void 0) { pivotPoint = null; }
        if (pivotPoint !== null) {
            this.appendTranslation(pivotPoint.x, pivotPoint.y, pivotPoint.z);
        }
        this._data = Matrix3D.__dotProduct(Matrix3D.__getRotationMatrix(degrees * Math.PI / 180, axis), this._data);
        if (pivotPoint !== null) {
            this.appendTranslation(-pivotPoint.x, -pivotPoint.y, -pivotPoint.z);
        }
    };
    Matrix3D.prototype.appendScale = function (xScale, yScale, zScale) {
        this._data = Matrix3D.__dotProduct([
            xScale, 0, 0, 0,
            0, yScale, 0, 0,
            0, 0, zScale, 0,
            0, 0, 0, 1
        ], this._data);
    };
    Matrix3D.prototype.appendTranslation = function (x, y, z) {
        this._data = Matrix3D.__dotProduct([
            1, 0, 0, x,
            0, 1, 0, y,
            0, 0, 1, z,
            0, 0, 0, 1
        ], this._data);
    };
    Matrix3D.prototype.clone = function () {
        var m = new Matrix3D(this.rawData);
        m.position = this.position !== null ? this.position.clone() : null;
        return m;
    };
    Matrix3D.prototype.copyColumnFrom = function (column, vector3D) {
        if (column < 0 || column > 3) {
            throw new RangeError("Column must be 0, 1, 2 or 3.");
        }
        this._data[column * 4] = vector3D.x;
        this._data[column * 4 + 1] = vector3D.y;
        this._data[column * 4 + 2] = vector3D.z;
        this._data[column * 4 + 3] = vector3D.w;
    };
    Matrix3D.prototype.copyColumnTo = function (column, vector3D) {
        if (column < 0 || column > 3) {
            throw new RangeError("Column must be 0, 1, 2 or 3.");
        }
        vector3D.x = this._data[column * 4];
        vector3D.y = this._data[column * 4 + 1];
        vector3D.z = this._data[column * 4 + 2];
        vector3D.w = this._data[column * 4 + 3];
    };
    Matrix3D.prototype.copyFrom = function (sourceMatrix3D) {
        this.position = sourceMatrix3D.position !== null ? sourceMatrix3D.position.clone() : null;
        this.rawData = sourceMatrix3D.rawData;
    };
    Matrix3D.prototype.copyRawDataFrom = function (vector, index, transpose) {
        if (index === void 0) { index = 0; }
        if (transpose === void 0) { transpose = false; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Matrix3D.prototype.copyRawDataTo = function (vector, index, transpose) {
        if (index === void 0) { index = 0; }
        if (transpose === void 0) { transpose = false; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Matrix3D.prototype.copyRowFrom = function (row, vector3D) {
        if (row < 0 || row > 3) {
            throw new RangeError("Row must be 0, 1, 2 or 3.");
        }
        this._data[row] = vector3D.x;
        this._data[row + 4] = vector3D.y;
        this._data[row + 8] = vector3D.z;
        this._data[row + 12] = vector3D.w;
    };
    Matrix3D.prototype.copyRowTo = function (row, vector3D) {
        if (row < 0 || row > 3) {
            throw new RangeError("Row must be 0, 1, 2 or 3.");
        }
        vector3D.x = this._data[row];
        vector3D.y = this._data[row + 4];
        vector3D.z = this._data[row + 8];
        vector3D.w = this._data[row + 12];
    };
    Matrix3D.prototype.copyToMatrix3D = function (dest) {
        dest.position = this.position !== null ? this.position.clone() : null;
        dest.rawData = this.rawData;
    };
    Matrix3D.prototype.decompose = function (orientationStyle) {
        if (orientationStyle === void 0) { orientationStyle = Orientation3D_1.Orientation3D.EULER_ANGLES; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Matrix3D.prototype.deltaTransformVector = function (v) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Matrix3D.prototype.identity = function () {
        this._data = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    };
    Matrix3D.interpolate = function (thisMat, toMat, percent) {
        percent = MathUtil_1.MathUtil.clamp(percent, 0, 1);
        var data = [];
        for (var i = 0; i < 16; i++) {
            data.push(thisMat._data[i] * (1 - percent) + toMat._data[i] * percent);
        }
        return new Matrix3D(data);
    };
    Matrix3D.prototype.interpolateTo = function (toMat, percent) {
        return Matrix3D.interpolate(this, toMat, percent);
    };
    Matrix3D.prototype.invert = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Matrix3D.prototype.pointAt = function (pos, at, up) {
        if (at === void 0) { at = Vector3D_1.Vector3D.ORIGIN; }
        if (up === void 0) { up = Vector3D_1.Vector3D.Z_AXIS; }
        var fx = at.x - pos.x;
        var fy = at.y - pos.y;
        var fz = at.z - pos.z;
        var rlf = 1 / Math.sqrt(fx * fx + fy * fy + fz * fz);
        fx *= rlf;
        fy *= rlf;
        fz *= rlf;
        var sx = fy * up.z - fz * up.y;
        var sy = fz * up.x - fx * up.z;
        var sz = fx * up.y - fy * up.x;
        var rls = 1 / Math.sqrt(sx * sx + sy * sy + sz * sz);
        sx *= rls;
        sy *= rls;
        sz *= rls;
        var ux = sy * fz - sz * fy;
        var uy = sz * fx - sx * fz;
        var uz = sx * fy - sy * fx;
        var d = this._data;
        d[0] = sx;
        d[1] = sy;
        d[2] = sz;
        d[3] = 0;
        d[4] = ux;
        d[5] = uy;
        d[6] = uz;
        d[7] = 0;
        d[8] = -fx;
        d[9] = -fy;
        d[10] = -fz;
        d[11] = 0;
        d[12] = 0;
        d[13] = 0;
        d[14] = 0;
        d[15] = 1;
        // translate(-pos.x, -pos.y, -pos.z)
        var x = -pos.x, y = -pos.y, z = -pos.z;
        d[3] += d[0] * x + d[1] * y + d[2] * z;
        d[7] += d[4] * x + d[5] * y + d[6] * z;
        d[11] += d[8] * x + d[9] * y + d[10] * z;
        d[15] += d[12] * x + d[13] * y + d[14] * z;
    };
    Matrix3D.prototype.prepend = function (rhs) {
        this._data = Matrix3D.__dotProduct(this._data, rhs._data);
    };
    Matrix3D.prototype.prependRotation = function (degrees, axis, pivotPoint) {
        if (pivotPoint === void 0) { pivotPoint = null; }
        if (pivotPoint !== null) {
            this.prependTranslation(pivotPoint.x, pivotPoint.y, pivotPoint.z);
        }
        this._data = Matrix3D.__dotProduct(this._data, Matrix3D.__getRotationMatrix(degrees * Math.PI / 180, axis));
        if (pivotPoint !== null) {
            this.prependTranslation(-pivotPoint.x, -pivotPoint.y, -pivotPoint.z);
        }
    };
    Matrix3D.prototype.prependScale = function (xScale, yScale, zScale) {
        this._data = Matrix3D.__dotProduct(this._data, [
            xScale, 0, 0, 0,
            0, yScale, 0, 0,
            0, 0, zScale, 0,
            0, 0, 0, 1
        ]);
    };
    Matrix3D.prototype.prependTranslation = function (x, y, z) {
        this._data = Matrix3D.__dotProduct(this._data, [
            1, 0, 0, x,
            0, 1, 0, y,
            0, 0, 1, z,
            0, 0, 0, 1
        ]);
    };
    Matrix3D.prototype.recompose = function (components, orientationStyle) {
        if (orientationStyle === void 0) { orientationStyle = Orientation3D_1.Orientation3D.EULER_ANGLES; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Matrix3D.prototype.transformVector = function (v) {
        var x = this._data[0] * v.x + this._data[1] * v.y + this._data[2] * v.z + this._data[3] * v.w;
        var y = this._data[4] * v.x + this._data[5] * v.y + this._data[6] * v.z + this._data[7] * v.w;
        var z = this._data[8] * v.x + this._data[9] * v.y + this._data[10] * v.z + this._data[11] * v.w;
        var w = this._data[12] * v.x + this._data[13] * v.y + this._data[14] * v.z + this._data[15] * v.w;
        return new Vector3D_1.Vector3D(x, y, z, w);
    };
    Matrix3D.prototype.transformVectors = function (vin, vout) {
        if (vin.length % 3 !== 0) {
            throw new ApplicationError_1.ApplicationError("Matrix3D.transformVectors needs 2 arrays, size of the input array must be multiple of 3.");
        }
        for (var i = 0; i < vin.length / 3; i++) {
            var x = vin[i * 3], y = vin[i * 3 + 1], z = vin[i * 3 + 2];
            var rx = this._data[0] * x + this._data[1] * y + this._data[2] * z;
            var ry = this._data[4] * x + this._data[5] * y + this._data[6] * z;
            var rz = this._data[8] * x + this._data[9] * y + this._data[10] * z;
            vout.push(rx, ry, rz);
        }
    };
    Matrix3D.prototype.transpose = function () {
        var d = this._data;
        this._data = [
            d[0], d[4], d[8], d[12],
            d[1], d[5], d[9], d[13],
            d[2], d[6], d[10], d[14],
            d[3], d[7], d[11], d[15]
        ];
    };
    Matrix3D.prototype.toArray = function () {
        var d = this._data;
        // Matrix3D is stored in row-major order, while WebGL is in column-major order.
        return new Float32Array([
            d[0], d[4], d[8], d[12],
            d[1], d[5], d[9], d[13],
            d[2], d[6], d[10], d[14],
            d[3], d[7], d[11], d[15]
        ]);
    };
    Matrix3D.prototype.setOrthographicProjection = function (left, right, top, bottom, near, far) {
        if (left === right || top === bottom || near === far) {
            throw new ArgumentError_1.ArgumentError("Null frustum");
        }
        var rw = 1 / (right - left);
        var rh = 1 / (top - bottom);
        var rd = 1 / (far - near);
        var d = this._data;
        d[0] = 2 * rw;
        d[1] = 0;
        d[2] = 0;
        d[3] = -(left + right) * rw;
        d[4] = 0;
        d[5] = 2 * rh;
        d[6] = 0;
        d[7] = -(top + bottom) * rh;
        d[8] = 0;
        d[9] = 0;
        d[10] = -2 * rd;
        d[11] = -(near + far) * rd;
        d[12] = 0;
        d[13] = 0;
        d[14] = 0;
        d[15] = 1;
    };
    Matrix3D.prototype.setPerspectiveProjection = function (fov, aspect, near, far) {
        if (near === far || aspect === 0) {
            throw new ArgumentError_1.ArgumentError("Null frustum");
        }
        if (near <= 0) {
            throw new ArgumentError_1.ArgumentError("near <= 0");
        }
        if (far <= 0) {
            throw new ArgumentError_1.ArgumentError("far <= 0");
        }
        fov = Math.PI / 2 * fov / 180;
        var s = Math.sin(fov);
        if (s === 0) {
            throw new ArgumentError_1.ArgumentError("Null frustum");
        }
        var rd = 1 / (far - near);
        var ct = Math.cos(fov) / s;
        var d = this._data;
        d[0] = ct / aspect;
        d[1] = 0;
        d[2] = 0;
        d[3] = 0;
        d[4] = 0;
        d[5] = ct;
        d[6] = 0;
        d[7] = 0;
        d[8] = 0;
        d[9] = 0;
        d[10] = -(far + near) * rd;
        d[11] = -2 * near * far * rd;
        d[12] = 0;
        d[13] = 0;
        d[14] = -1;
        d[15] = 0;
    };
    Matrix3D.__dotProduct = function (a, b) {
        if (a.length !== 16 || b.length !== 16) {
            throw new Error("Matrix3D dot product needs a array of 16 elements.");
        }
        var res = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                for (var k = 0; k < 4; k++) {
                    res[i * 4 + j] += a[i * 4 + k] * b[k * 4 + j];
                }
            }
        }
        return res;
    };
    Matrix3D.__getRotationMatrix = function (angle, axis) {
        // jabbany
        var sT = Math.sin(angle), cT = Math.cos(angle);
        return [
            cT + axis.x * axis.x * (1 - cT), axis.x * axis.y * (1 - cT) - axis.z * sT, axis.x * axis.z * (1 - cT) + axis.y * sT, 0,
            axis.x * axis.y * (1 - cT) + axis.z * sT, cT + axis.y * axis.y * (1 - cT), axis.y * axis.z * (1 - cT) - axis.x * sT, 0,
            axis.z * axis.x * (1 - cT) - axis.y * sT, axis.z * axis.y * (1 - cT) + axis.x * sT, cT + axis.z * axis.z * (1 - cT), 0,
            0, 0, 0, 1
        ];
    };
    return Matrix3D;
}());
exports.Matrix3D = Matrix3D;



},{"../../glantern/MathUtil":95,"../errors/ApplicationError":47,"../errors/ArgumentError":48,"../errors/NotImplementedError":51,"./Orientation3D":64,"./Vector3D":69}],64:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var Orientation3D = (function () {
    function Orientation3D() {
    }
    Object.defineProperty(Orientation3D, "AXIS_ANGLE", {
        get: function () {
            return "axisAngle";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Orientation3D, "EULER_ANGLES", {
        get: function () {
            return "eulerAngles";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Orientation3D, "QUATERNION", {
        get: function () {
            return "quaternion";
        },
        enumerable: true,
        configurable: true
    });
    return Orientation3D;
}());
exports.Orientation3D = Orientation3D;



},{}],65:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var Point_1 = require("./Point");
var NotImplementedError_1 = require("../errors/NotImplementedError");
var MathUtil_1 = require("../../glantern/MathUtil");
var PerspectiveProjection = (function () {
    function PerspectiveProjection() {
        this.focalLength = 10;
        this.projectionCenter = null;
        this._fieldOfView = 90;
        this.projectionCenter = new Point_1.Point();
    }
    Object.defineProperty(PerspectiveProjection.prototype, "fieldOfView", {
        get: function () {
            return this._fieldOfView;
        },
        set: function (v) {
            this._fieldOfView = MathUtil_1.MathUtil.clamp(v, 0, 180);
        },
        enumerable: true,
        configurable: true
    });
    PerspectiveProjection.prototype.toMatrix3D = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    return PerspectiveProjection;
}());
exports.PerspectiveProjection = PerspectiveProjection;



},{"../../glantern/MathUtil":95,"../errors/NotImplementedError":51,"./Point":66}],66:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var MathUtil_1 = require("../../glantern/MathUtil");
var Point = (function () {
    function Point(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
    Point.prototype.add = function (v) {
        return new Point(this.x + v.x, this.y + v.y);
    };
    Point.prototype.clone = function () {
        return new Point(this.x, this.y);
    };
    Point.prototype.copyFrom = function (sourcePoint) {
        this.x = sourcePoint.x;
        this.y = sourcePoint.y;
    };
    Point.distance = function (pt1, pt2) {
        return Math.sqrt((pt1.x - pt2.x) * (pt1.x - pt2.x) + (pt1.y - pt2.y) * (pt1.y - pt2.y));
    };
    Point.prototype.equals = function (toCompare) {
        return this.x === toCompare.x && this.y === toCompare.y;
    };
    Point.interpolate = function (pt1, pt2, f) {
        f = MathUtil_1.MathUtil.clamp(f, 0, 1);
        return new Point(pt1.x * f + pt2.x * (1 - f), pt1.y * f + pt2.y * (1 - f));
    };
    Object.defineProperty(Point.prototype, "length", {
        get: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        enumerable: true,
        configurable: true
    });
    Point.prototype.normalize = function (thickness) {
        var len = this.length;
        if (len > 0) {
            this.x *= thickness / len;
            this.y *= thickness / len;
        }
    };
    Point.prototype.offset = function (dx, dy) {
        this.x += dx;
        this.y += dy;
    };
    Point.polar = function (len, angle) {
        return new Point(len * Math.cos(angle), len * Math.sin(angle));
    };
    Point.prototype.setTo = function (xa, ya) {
        this.x = xa;
        this.y = ya;
    };
    Point.prototype.subtract = function (v) {
        return new Point(this.x - v.x, this.y - v.y);
    };
    Point.prototype.toString = function () {
        return "(X=" + this.x + ", y=" + this.y + ")";
    };
    return Point;
}());
exports.Point = Point;



},{"../../glantern/MathUtil":95}],67:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var Point_1 = require("./Point");
var Rectangle = (function () {
    function Rectangle(x, y, width, height) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        this._x = 0;
        this._y = 0;
        this._w = 0;
        this._h = 0;
        this._x = x >= 0 ? x : 0;
        this._y = y >= 0 ? y : 0;
        this._w = width >= 0 ? width : 0;
        this._h = height >= 0 ? height : 0;
    }
    Object.defineProperty(Rectangle.prototype, "bottom", {
        get: function () {
            return this._y + this._h;
        },
        set: function (v) {
            if (v < this._y) {
                v = this._y;
            }
            this._h = v - this._y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "bottomRight", {
        get: function () {
            return new Point_1.Point(this._x + this._w, this._y + this._h);
        },
        set: function (v) {
            this.right = v.x;
            this.bottom = v.y;
        },
        enumerable: true,
        configurable: true
    });
    Rectangle.prototype.clone = function () {
        return new Rectangle(this._x, this._y, this._w, this._h);
    };
    Rectangle.prototype.contains = function (x, y) {
        return this.left <= x && x <= this.right && this.top <= y && y <= this.bottom;
    };
    Rectangle.prototype.containsPoint = function (point) {
        return this.contains(point.x, point.y);
    };
    Rectangle.prototype.containsRect = function (rect) {
        return this.containsPoint(rect.topLeft) && this.containsPoint(rect.bottomRight);
    };
    Rectangle.prototype.copyFrom = function (sourceRect) {
        this._x = sourceRect._x;
        this._y = sourceRect._y;
        this._w = sourceRect._w;
        this._h = sourceRect._h;
    };
    Rectangle.prototype.equals = function (toCompare) {
        return this._x == toCompare._x && this._y == toCompare._y && this._w == toCompare._w && this._h == toCompare._h;
    };
    Object.defineProperty(Rectangle.prototype, "height", {
        get: function () {
            return this._h;
        },
        set: function (v) {
            this._h = v >= 0 ? v : 0;
        },
        enumerable: true,
        configurable: true
    });
    Rectangle.prototype.inflate = function (dx, dy) {
        // TODO: bug when dx or dy is less than 0
        this.x -= dx;
        this.width += dx + dx;
        this.y -= dy;
        this.height += dy + dy;
    };
    Rectangle.prototype.inflatePoint = function (point) {
        this.inflate(point.x, point.y);
    };
    Rectangle.prototype.intersection = function (toIntersect) {
        var areIntersect = this.intersects(toIntersect);
        if (areIntersect) {
            var r1 = this, r2 = toIntersect;
            var x0 = Math.max(r1.x, r2.x), y1 = Math.max(r1.bottom, r2.bottom), x1 = Math.min(r1.right, r2.right), y0 = Math.min(r1.y, r2.y);
            return new Rectangle(x0, y0, x1 - x0, y1 - y0);
        }
        else {
            return Rectangle.empty;
        }
    };
    Rectangle.prototype.intersects = function (toIntersect) {
        return Rectangle.testIntersection(this, toIntersect);
    };
    Rectangle.prototype.isEmpty = function () {
        return this._w <= 0 || this._h <= 0;
    };
    Object.defineProperty(Rectangle.prototype, "left", {
        get: function () {
            return this._x;
        },
        set: function (v) {
            this._x = v >= 0 ? v : 0;
        },
        enumerable: true,
        configurable: true
    });
    Rectangle.prototype.offset = function (dx, dy) {
        this.x += dx;
        this.y += dy;
    };
    Rectangle.prototype.offsetPoint = function (point) {
        this.offset(point.x, point.y);
    };
    Object.defineProperty(Rectangle.prototype, "right", {
        get: function () {
            return this._x + this._w;
        },
        set: function (v) {
            if (v < this._x) {
                v = this._x;
            }
            this._w = v - this._x;
        },
        enumerable: true,
        configurable: true
    });
    Rectangle.prototype.setEmpty = function () {
        this._x = this._y = this._w = this._h = 0;
    };
    Rectangle.prototype.setTo = function (xa, ya, widtha, heighta) {
        this.x = xa;
        this.y = ya;
        this.width = widtha;
        this.height = heighta;
    };
    Object.defineProperty(Rectangle.prototype, "size", {
        get: function () {
            return new Point_1.Point(this._w, this._h);
        },
        set: function (v) {
            this._w = v.x;
            this._h = v.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "top", {
        get: function () {
            return this._y;
        },
        set: function (v) {
            if (v > this._y + this._h) {
                v = this._y + this._h;
            }
            this._h = this._y + this._h - v;
            this._y = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "topLeft", {
        get: function () {
            return new Point_1.Point(this._x, this._y);
        },
        set: function (v) {
            this.left = v.x;
            this.top = v.y;
        },
        enumerable: true,
        configurable: true
    });
    Rectangle.prototype.toString = function () {
        return "(x=" + this.x + ", y=" + this.y + ", w=" + this.width + ", h=" + this.height + ")";
    };
    Rectangle.prototype.union = function (toUnion) {
        var x = Math.min(this.x, toUnion.x);
        var y = Math.min(this.y, toUnion.y);
        var r = Math.max(this.right, toUnion.right);
        var b = Math.max(this.bottom, toUnion.bottom);
        return new Rectangle(x, y, r - x, b - y);
    };
    Object.defineProperty(Rectangle.prototype, "width", {
        get: function () {
            return this._w;
        },
        set: function (v) {
            this._w = v >= 0 ? v : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (v) {
            this._x = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (v) {
            this._y = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle, "empty", {
        // Bulletproof
        get: function () {
            return emptyRectangle.clone();
        },
        enumerable: true,
        configurable: true
    });
    // Bulletproof
    /**
     * Test intersection between two rectangles.
     * @param rect1 {Rectangle}
     * @param rect2 {Rectangle}
     * @param [strict] {Boolean} In strict mode, edge contact is regarded as intersection.
     * @returns {Boolean}
     */
    Rectangle.testIntersection = function (rect1, rect2, strict) {
        if (strict === void 0) { strict = true; }
        var areSeparate;
        if (strict) {
            areSeparate = rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom;
        }
        else {
            areSeparate = rect1.right <= rect2.left || rect1.left >= rect2.right || rect1.bottom <= rect2.top || rect1.top >= rect2.bottom;
        }
        return !areSeparate;
    };
    return Rectangle;
}());
exports.Rectangle = Rectangle;
var emptyRectangle = new Rectangle();



},{"./Point":66}],68:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var Matrix3D_1 = require("./Matrix3D");
var ColorTransform_1 = require("./ColorTransform");
var Matrix_1 = require("./Matrix");
var PerspectiveProjection_1 = require("./PerspectiveProjection");
var NotImplementedError_1 = require("../errors/NotImplementedError");
var Transform = (function () {
    function Transform() {
        this.colorTransform = null;
        this.matrix = null;
        this.matrix3D = null;
        this.perspectiveProjection = null;
        this._pixelBounds = null;
        this.matrix = new Matrix_1.Matrix();
        this.matrix3D = new Matrix3D_1.Matrix3D();
        this.colorTransform = new ColorTransform_1.ColorTransform();
        this.perspectiveProjection = new PerspectiveProjection_1.PerspectiveProjection();
    }
    Object.defineProperty(Transform.prototype, "concatenatedColorTransform", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "concatenatedMatrix", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "pixelBounds", {
        get: function () {
            return this._pixelBounds;
        },
        enumerable: true,
        configurable: true
    });
    Transform.prototype.getRelativeMatrix3D = function (relativeTo) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    return Transform;
}());
exports.Transform = Transform;



},{"../errors/NotImplementedError":51,"./ColorTransform":61,"./Matrix":62,"./Matrix3D":63,"./PerspectiveProjection":65}],69:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var MathUtil_1 = require("../../glantern/MathUtil");
var Vector3D = (function () {
    function Vector3D(x, y, z, w) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        if (w === void 0) { w = 0; }
        this.w = 0;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    Object.defineProperty(Vector3D, "X_AXIS", {
        get: function () {
            return new Vector3D(1, 0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3D, "Y_AXIS", {
        get: function () {
            return new Vector3D(0, 1, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3D, "Z_AXIS", {
        get: function () {
            return new Vector3D(0, 0, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3D, "ORIGIN", {
        get: function () {
            return new Vector3D(0, 0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3D.prototype, "length", {
        get: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3D.prototype, "lengthSquared", {
        get: function () {
            return this.x * this.x + this.y * this.y + this.z * this.z;
        },
        enumerable: true,
        configurable: true
    });
    Vector3D.prototype.add = function (a) {
        return new Vector3D(this.x + a.x, this.y + a.y, this.z + a.z, this.w);
    };
    Vector3D.angleBetween = function (a, b) {
        var mulNom = a.x * b.x + a.y * b.y + a.z * b.z;
        var den = a.length * b.length;
        var val = Math.sqrt(mulNom * mulNom / den);
        return Math.acos(val);
    };
    Vector3D.prototype.clone = function () {
        return new Vector3D(this.x, this.y, this.z, this.w);
    };
    Vector3D.prototype.copyFrom = function (a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        this.w = a.w;
    };
    Vector3D.prototype.crossProduct = function (a) {
        var i = this.y * a.z - this.z * a.y;
        var j = this.z * a.x - this.x * a.z;
        var k = this.x * a.y - this.y * a.x;
        return new Vector3D(i, j, k, this.w);
    };
    Vector3D.prototype.decrementBy = function (a) {
        this.x -= a.x;
        this.y -= a.y;
        this.z -= a.z;
    };
    Vector3D.distance = function (pt1, pt2) {
        return Math.sqrt((pt1.x - pt2.x) * (pt1.x - pt2.x) + (pt1.y - pt2.y) * (pt1.y - pt2.y) + (pt1.z - pt2.z) * (pt1.z - pt2.z));
    };
    Vector3D.prototype.dotProduct = function (a) {
        return this.x * a.x + this.y * a.y + this.z * a.z;
    };
    Vector3D.prototype.equals = function (toCompare, allFour) {
        if (allFour === void 0) { allFour = false; }
        return this.x == toCompare.x && this.y == toCompare.y && this.z == toCompare.y && !(allFour && this.w != toCompare.w);
    };
    Vector3D.prototype.incrementBy = function (a) {
        this.x += a.x;
        this.y += a.y;
        this.z += a.z;
    };
    Vector3D.prototype.nearEquals = function (toCompare, tolerance, allFour) {
        if (allFour === void 0) { allFour = false; }
        return MathUtil_1.MathUtil.isValueBetweenNotEquals(this.x, toCompare.x - tolerance, toCompare.x + tolerance) &&
            MathUtil_1.MathUtil.isValueBetweenNotEquals(this.y, toCompare.y - tolerance, toCompare.y + tolerance) &&
            MathUtil_1.MathUtil.isValueBetweenNotEquals(this.z, toCompare.z - tolerance, toCompare.z + tolerance) && !(allFour && !MathUtil_1.MathUtil.isValueBetweenNotEquals(this.w, toCompare.w - tolerance, toCompare.w + tolerance));
    };
    Vector3D.prototype.negate = function () {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
    };
    Vector3D.prototype.normalize = function () {
        var len = this.length;
        if (len > 0) {
            this.x /= len;
            this.y /= len;
            this.z /= len;
        }
        return len;
    };
    Vector3D.prototype.project = function () {
        if (this.w != null && this.w != 0) {
            this.x /= this.w;
            this.y /= this.w;
            this.z /= this.w;
        }
    };
    Vector3D.prototype.scaleBy = function (s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
    };
    Vector3D.prototype.setTo = function (xa, ya, za) {
        this.x = xa;
        this.y = ya;
        this.z = za;
    };
    Vector3D.prototype.subtract = function (a) {
        return new Vector3D(this.x - a.x, this.y - a.y, this.z - a.z, this.w);
    };
    Vector3D.prototype.toString = function () {
        return "[x=" + this.x + ", y=" + this.y + ", z=" + this.z + ", w=" + this.w + "]";
    };
    return Vector3D;
}());
exports.Vector3D = Vector3D;



},{"../../glantern/MathUtil":95}],70:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./ColorTransform"));
__export(require("./Matrix"));
__export(require("./Matrix3D"));
__export(require("./Orientation3D"));
__export(require("./PerspectiveProjection"));
__export(require("./Point"));
__export(require("./Rectangle"));
__export(require("./Transform"));
__export(require("./Vector3D"));



},{"./ColorTransform":61,"./Matrix":62,"./Matrix3D":63,"./Orientation3D":64,"./PerspectiveProjection":65,"./Point":66,"./Rectangle":67,"./Transform":68,"./Vector3D":69}],71:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
"use strict";
var display = require("./display/index");
exports.display = display;
var events = require("./events/index");
exports.events = events;
var geom = require("./geom/index");
exports.geom = geom;
var filters = require("./filters/index");
exports.filters = filters;
var text = require("./text/index");
exports.text = text;
var utils = require("./utils/index");
exports.utils = utils;
var media = require("./media/index");
exports.media = media;
var errors = require("./errors/index");
exports.errors = errors;



},{"./display/index":46,"./errors/index":52,"./events/index":56,"./filters/index":60,"./geom/index":70,"./media/index":73,"./text/index":84,"./utils/index":89}],72:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventDispatcher_1 = require("../events/EventDispatcher");
/**
 * Created by MIC on 2016/1/7.
 */
var Sound = (function (_super) {
    __extends(Sound, _super);
    function Sound() {
        _super.apply(this, arguments);
    }
    return Sound;
}(EventDispatcher_1.EventDispatcher));
exports.Sound = Sound;



},{"../events/EventDispatcher":53}],73:[function(require,module,exports){
/**
 * Created by MIC on 2016/1/7.
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./Sound"));



},{"./Sound":72}],74:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/23.
 */
"use strict";
var AntiAliasType = (function () {
    function AntiAliasType() {
    }
    Object.defineProperty(AntiAliasType, "ADVANCED", {
        get: function () {
            return "advanced";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AntiAliasType, "NORMAL", {
        get: function () {
            return "normal";
        },
        enumerable: true,
        configurable: true
    });
    return AntiAliasType;
}());
exports.AntiAliasType = AntiAliasType;



},{}],75:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/23.
 */
"use strict";
var GridFitType = (function () {
    function GridFitType() {
    }
    Object.defineProperty(GridFitType, "NONE", {
        get: function () {
            return "none";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridFitType, "PIXEL", {
        get: function () {
            return "pixel";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridFitType, "SUBPIXEL", {
        get: function () {
            return "subpixel";
        },
        enumerable: true,
        configurable: true
    });
    return GridFitType;
}());
exports.GridFitType = GridFitType;



},{}],76:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/23.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventDispatcher_1 = require("../events/EventDispatcher");
var NotImplementedError_1 = require("../errors/NotImplementedError");
var StyleSheet = (function (_super) {
    __extends(StyleSheet, _super);
    function StyleSheet() {
        _super.call(this);
        throw new NotImplementedError_1.NotImplementedError();
    }
    StyleSheet.prototype.clear = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    StyleSheet.prototype.getStyle = function (styleName) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    StyleSheet.prototype.parseCSS = function (cssText) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    StyleSheet.prototype.setStyle = function (styleName, styleObject) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    StyleSheet.prototype.transform = function (formatObject) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    StyleSheet.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        throw new NotImplementedError_1.NotImplementedError();
    };
    Object.defineProperty(StyleSheet.prototype, "styleNames", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    return StyleSheet;
}(EventDispatcher_1.EventDispatcher));
exports.StyleSheet = StyleSheet;



},{"../errors/NotImplementedError":51,"../events/EventDispatcher":53}],77:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/23.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var InteractiveObject_1 = require("../display/InteractiveObject");
var AntiAliasType_1 = require("./AntiAliasType");
var TextFieldAutoSize_1 = require("./TextFieldAutoSize");
var TextFormat_1 = require("./TextFormat");
var GridFitType_1 = require("./GridFitType");
var TextInteractionMode_1 = require("./TextInteractionMode");
var TextFieldType_1 = require("./TextFieldType");
var ShaderID_1 = require("../../webgl/ShaderID");
var RenderHelper_1 = require("../../webgl/RenderHelper");
var NotImplementedError_1 = require("../errors/NotImplementedError");
var GLUtil_1 = require("../../glantern/GLUtil");
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField(root, parent) {
        _super.call(this, root, parent);
        this.alwaysShowSelection = false;
        this.antiAliasType = AntiAliasType_1.AntiAliasType.NORMAL;
        this.autoSize = TextFieldAutoSize_1.TextFieldAutoSize.NONE;
        this.condenseWhite = false;
        this.displayAsPassword = false;
        this.embedFonts = false;
        this.gridFitType = GridFitType_1.GridFitType.PIXEL;
        this.htmlText = null;
        this.maxChars = 0;
        this.mouseWheelEnabled = true;
        this.multiline = true;
        this.restrict = null;
        this.scrollH = 0;
        this.scrollV = 1;
        this.selectable = true;
        this.sharpness = 0;
        this.styleSheet = null;
        /**
         * When set to true, outline color will not change when setting {@link textColor}, enabling drawing a
         * colorful outline. The default value is false.
         * Non-standard extension.
         * @type {Boolean}
         */
        this.customOutlineEnabled = false;
        this.textInteractionMode = TextInteractionMode_1.TextInteractionMode.NORMAL;
        this.type = TextFieldType_1.TextFieldType.DYNAMIC;
        this.useRichTextClipboard = false;
        this.wordWrap = false;
        this._textFormatChangedHandler = null;
        this._defaultTextFormat = null;
        this._isContentChanged = true;
        this._canvasTarget = null;
        this._canvas = null;
        this._context2D = null;
        this._text = null;
        this._background = false;
        this._backgroundColor = 0xffffff;
        this._border = false;
        this._borderColor = 0x000000;
        this._textColor = 0x000000;
        this._textOutlineColor = 0x000000;
        this._thickness = 0;
        if (root !== null) {
            this._canvasTarget = this._$createCanvasTarget(root.worldRenderer);
        }
        this._textFormatChangedHandler = this.__textFormatChanged.bind(this);
        this.defaultTextFormat = new TextFormat_1.TextFormat();
    }
    TextField.prototype.appendText = function (newText) {
        this.text += newText;
    };
    Object.defineProperty(TextField.prototype, "background", {
        get: function () {
            return this._background;
        },
        set: function (v) {
            var b = v !== this._background;
            if (b) {
                this._background = v;
                this._isContentChanged = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "backgroundColor", {
        get: function () {
            return this._backgroundColor;
        },
        set: function (v) {
            var b = v !== this._backgroundColor;
            if (b) {
                this._backgroundColor = v;
                this._isContentChanged = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "border", {
        get: function () {
            return this._border;
        },
        set: function (v) {
            var b = v !== this._border;
            if (b) {
                this._border = v;
                this._isContentChanged = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "borderColor", {
        get: function () {
            return this._borderColor;
        },
        set: function (v) {
            var b = v !== this._borderColor;
            if (b) {
                this._borderColor = v;
                this._isContentChanged = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "bottomScrollV", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "caretIndex", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "defaultTextFormat", {
        get: function () {
            return this._defaultTextFormat;
        },
        set: function (v) {
            if (this._defaultTextFormat !== null) {
                this._defaultTextFormat.removeEventListener(TextFormat_1.TextFormat.TEXT_FORMAT_CHANGE, this._textFormatChangedHandler);
            }
            this._defaultTextFormat = GLUtil_1.GLUtil.ptr(v) ? v : new TextFormat_1.TextFormat();
            this._defaultTextFormat.addEventListener(TextFormat_1.TextFormat.TEXT_FORMAT_CHANGE, this._textFormatChangedHandler);
        },
        enumerable: true,
        configurable: true
    });
    TextField.prototype.getCharBoundaries = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.getCharIndexAtPoint = function (x, y) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.getFirstCharInParagraph = function (charIndex) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.getImageReference = function (id) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.getLineIndexAtPoint = function (x, y) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.getLineIndexOfChar = function (charIndex) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.getLineLength = function (lineIndex) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.getLineMetrics = function (lineIndex) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.getLineOffset = function (lineIndex) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.getLineText = function (lineIndex) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.getParagraphLength = function (charIndex) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.getTextFormat = function (beginIndex, endIndex) {
        if (beginIndex === void 0) { beginIndex = -1; }
        if (endIndex === void 0) { endIndex = -1; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.isFontCompatible = function (fontName, fontStyle) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.replaceSelectedText = function (value) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.replaceText = function (beginIndex, endIndex, newText) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.setSelection = function (beginIndex, endIndex) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.setTextFormat = function (format, beginIndex, endIndex) {
        if (beginIndex === void 0) { beginIndex = -1; }
        if (endIndex === void 0) { endIndex = -1; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Object.defineProperty(TextField.prototype, "length", {
        get: function () {
            return GLUtil_1.GLUtil.ptr(this.text) ? this.text.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "maxScrollH", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "maxScrollV", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "numLines", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "selectionBeginIndex", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "selectionEndIndex", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (v) {
            var b = this._text !== v;
            if (b) {
                this._text = v;
                this._isContentChanged = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "textColor", {
        get: function () {
            return this.defaultTextFormat.color;
        },
        set: function (v) {
            var b = this.defaultTextFormat.color !== v;
            this.defaultTextFormat.color = v;
            if (b && !this.customOutlineEnabled) {
                this.textOutlineColor = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "textOutlineColor", {
        /**
         * Non-standard extension.
         * @returns {Number}
         */
        get: function () {
            return this._textOutlineColor;
        },
        /**
         * Non-standard extension.
         * @param v {Number}
         */
        set: function (v) {
            var b = this._textOutlineColor !== v;
            if (b) {
                this._textOutlineColor = v;
                this._isContentChanged = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "textHeight", {
        get: function () {
            // TODO: This only works under single line circumstances.
            var height = this.defaultTextFormat.size * 1.5;
            if (this.thickness > 0) {
                height += this.thickness * 2;
            }
            return height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "textWidth", {
        get: function () {
            // TODO: This only works under single line circumstances.
            var metrics = this._context2D.measureText(this.text);
            var width = metrics.width;
            if (this.thickness > 0) {
                width += this.thickness * 2;
            }
            return width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "thickness", {
        get: function () {
            return this._thickness;
        },
        set: function (v) {
            var b = this._thickness !== v;
            if (b) {
                this._thickness = v;
                this._isContentChanged = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    TextField.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        // TODO: WARNING: HACK!
        var renderer = this.root.worldRenderer;
        renderer.releaseRenderTarget(this._canvasTarget);
        this._canvasTarget = null;
        this._canvas = null;
        this._context2D = null;
    };
    TextField.prototype._$update = function (timeInfo) {
        if (!this._isContentChanged) {
            return;
        }
        //var canvas = this._canvas;
        //var context = this._context2D;
        //context.font = this.__getStyleString();
        //var metrics:TextMetrics = context.measureText(this.text);
        //canvas.height = this.defaultTextFormat.size * 1.15;
        //canvas.width = metrics.width;
        this._canvasTarget.updateImageSize();
        this._$updateCanvasTextStyle(this._context2D);
        this._$drawTextElements(this._context2D);
        this._isContentChanged = false;
    };
    TextField.prototype._$render = function (renderer) {
        if (this.visible && this.alpha > 0 && this.text !== null && this.text.length > 0) {
            this._canvasTarget.updateImageContent();
            RenderHelper_1.RenderHelper.copyImageContent(renderer, this._canvasTarget, renderer.currentRenderTarget, false, true, this.transform.matrix3D, this.alpha, false);
        }
    };
    TextField.prototype._$selectShader = function (shaderManager) {
        shaderManager.selectShader(ShaderID_1.ShaderID.COPY_IMAGE);
    };
    TextField.prototype._$createCanvasTarget = function (renderer) {
        if (this._canvas === null) {
            var canvas = window.document.createElement("canvas");
            canvas.width = renderer.view.width;
            canvas.height = renderer.view.height;
            this._canvas = canvas;
            this._context2D = canvas.getContext("2d");
        }
        return renderer.createRenderTarget(this._canvas);
    };
    TextField.prototype._$updateCanvasTextStyle = function (context2D) {
        var fontStyles = [];
        if (this.defaultTextFormat.bold) {
            fontStyles.push("bold");
        }
        if (this.defaultTextFormat.italic) {
            fontStyles.push("italic");
        }
        fontStyles.push(this.defaultTextFormat.size.toString() + "pt");
        fontStyles.push("\"" + this.defaultTextFormat.font + "\"");
        context2D.font = fontStyles.join(" ");
    };
    TextField.prototype._$drawTextElements = function (context2D) {
        var baseX = this.thickness;
        var baseY = this.thickness;
        var borderThickness = 1;
        context2D.clearRect(0, 0, this._canvas.width, this._canvas.height);
        if (this.background) {
            context2D.fillStyle = GLUtil_1.GLUtil.colorToCssSharp(this.backgroundColor);
            context2D.fillRect(0, 0, this.textWidth + borderThickness * 2, this.textHeight + borderThickness * 2);
        }
        context2D.fillStyle = GLUtil_1.GLUtil.colorToCssSharp(this.textColor);
        context2D.fillText(this.text, baseX + borderThickness, this.textHeight * 0.75 + borderThickness);
        if (this.thickness > 0) {
            context2D.lineWidth = this.thickness;
            context2D.strokeStyle = GLUtil_1.GLUtil.colorToCssSharp(this.textOutlineColor);
            context2D.strokeText(this.text, baseX + borderThickness, this.textHeight * 0.75 + borderThickness);
        }
        if (this.border) {
            context2D.lineWidth = 1;
            context2D.strokeStyle = GLUtil_1.GLUtil.colorToCssSharp(this.borderColor);
            context2D.strokeRect(borderThickness, borderThickness, this.textWidth + borderThickness * 2, this.textHeight + borderThickness * 2);
        }
    };
    TextField.prototype.__textFormatChanged = function () {
        // Cannot be declared as static or TypeScript compilation will fail.
        this._isContentChanged = true;
    };
    return TextField;
}(InteractiveObject_1.InteractiveObject));
exports.TextField = TextField;



},{"../../glantern/GLUtil":94,"../../webgl/RenderHelper":107,"../../webgl/ShaderID":110,"../display/InteractiveObject":32,"../errors/NotImplementedError":51,"./AntiAliasType":74,"./GridFitType":75,"./TextFieldAutoSize":78,"./TextFieldType":79,"./TextFormat":80,"./TextInteractionMode":82}],78:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/23.
 */
"use strict";
var TextFieldAutoSize = (function () {
    function TextFieldAutoSize() {
    }
    Object.defineProperty(TextFieldAutoSize, "CENTER", {
        get: function () {
            return "center";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFieldAutoSize, "LEFT", {
        get: function () {
            return "left";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFieldAutoSize, "NONE", {
        get: function () {
            return "none";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFieldAutoSize, "RIGHT", {
        get: function () {
            return "right";
        },
        enumerable: true,
        configurable: true
    });
    return TextFieldAutoSize;
}());
exports.TextFieldAutoSize = TextFieldAutoSize;



},{}],79:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/23.
 */
"use strict";
var TextFieldType = (function () {
    function TextFieldType() {
    }
    Object.defineProperty(TextFieldType, "DYNAMIC", {
        get: function () {
            return "dynamic";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFieldType, "INPUT", {
        get: function () {
            return "input";
        },
        enumerable: true,
        configurable: true
    });
    return TextFieldType;
}());
exports.TextFieldType = TextFieldType;



},{}],80:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/23.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var os = require("os");
var TextFormatAlign_1 = require("./TextFormatAlign");
var EventDispatcher_1 = require("../events/EventDispatcher");
var GLUtil_1 = require("../../glantern/GLUtil");
var EventBase_1 = require("../../glantern/EventBase");
var TextFormat = (function (_super) {
    __extends(TextFormat, _super);
    function TextFormat(font, size, color, bold, italic, underline, url, target, align, leftMargin, rightMargin, indent, leading) {
        if (font === void 0) { font = null; }
        if (size === void 0) { size = 12; }
        if (color === void 0) { color = 0x000000; }
        if (bold === void 0) { bold = false; }
        if (italic === void 0) { italic = false; }
        if (underline === void 0) { underline = false; }
        if (url === void 0) { url = null; }
        if (target === void 0) { target = null; }
        if (align === void 0) { align = TextFormatAlign_1.TextFormatAlign.LEFT; }
        if (leftMargin === void 0) { leftMargin = 0; }
        if (rightMargin === void 0) { rightMargin = 0; }
        if (indent === void 0) { indent = 0; }
        if (leading === void 0) { leading = 0; }
        _super.call(this);
        this._align = TextFormatAlign_1.TextFormatAlign.LEFT;
        this._blockIndent = 0;
        this._bold = false;
        this._bullet = false;
        this._color = 0x000000;
        this._font = null;
        this._indent = 0;
        this._italic = false;
        this._kerning = false;
        this._leading = 0;
        this._leftMargin = 0;
        this._letterSpacing = 0;
        this._rightMargin = 0;
        this._size = 12;
        this._tabStops = [];
        this._target = null;
        this._underline = false;
        this._url = null;
        if (font === null) {
            this.font = os.type().toLowerCase().indexOf("osx") >= 0 ? "Times" : "Times New Roman";
        }
        else {
            this.font = font;
        }
        this.size = size;
        this.color = color;
        this.bold = bold;
        this.italic = italic;
        this.underline = underline;
        this.url = url;
        this.target = target;
        this.align = align;
        this.leftMargin = leftMargin;
        this.rightMargin = rightMargin;
        this.indent = indent;
        this.leading = leading;
    }
    Object.defineProperty(TextFormat, "TEXT_FORMAT_CHANGE", {
        get: function () {
            return "textFormatChange";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "align", {
        get: function () {
            return this._align;
        },
        set: function (v) {
            var b = this._align !== v;
            if (b) {
                this._align = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "blockIndent", {
        get: function () {
            return this._blockIndent;
        },
        set: function (v) {
            var b = this._blockIndent !== v;
            if (b) {
                this._blockIndent = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "bold", {
        get: function () {
            return this._bold;
        },
        set: function (v) {
            var b = this._bold !== v;
            if (b) {
                this._bold = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "bullet", {
        get: function () {
            return this._bullet;
        },
        set: function (v) {
            var b = this._bullet !== v;
            if (b) {
                this._bullet = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (v) {
            var b = this._color !== v;
            if (b) {
                this._color = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "font", {
        get: function () {
            return this._font;
        },
        set: function (v) {
            var b = this._font !== v;
            if (b) {
                this._font = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "indent", {
        get: function () {
            return this._indent;
        },
        set: function (v) {
            var b = this._indent !== v;
            if (b) {
                this._indent = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "italic", {
        get: function () {
            return this._italic;
        },
        set: function (v) {
            var b = this._italic !== v;
            if (b) {
                this._italic = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "kerning", {
        get: function () {
            return this._kerning;
        },
        set: function (v) {
            var b = this._kerning !== v;
            if (b) {
                this._kerning = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "leading", {
        get: function () {
            return this._indent;
        },
        set: function (v) {
            var b = this._leading !== v;
            if (b) {
                this._leading = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "leftMargin", {
        get: function () {
            return this._leftMargin;
        },
        set: function (v) {
            var b = this._leftMargin !== v;
            if (b) {
                this._leftMargin = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "letterSpacing", {
        get: function () {
            return this._letterSpacing;
        },
        set: function (v) {
            var b = this._letterSpacing !== v;
            if (b) {
                this._letterSpacing = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "rightMargin", {
        get: function () {
            return this._rightMargin;
        },
        set: function (v) {
            var b = this._rightMargin !== v;
            if (b) {
                this._rightMargin = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (v) {
            var b = this._size !== v;
            if (b) {
                this._size = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "tabStops", {
        get: function () {
            return this._tabStops;
        },
        set: function (v) {
            if (!GLUtil_1.GLUtil.ptr(v)) {
                v = [];
            }
            var b = false;
            if (!b) {
                b = this._tabStops.length !== v.length;
            }
            if (!b) {
                for (var i = 0; i < v.length; ++i) {
                    if (this._tabStops[i] !== v[i]) {
                        b = true;
                        break;
                    }
                }
            }
            if (b) {
                this._tabStops = v.slice();
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "target", {
        get: function () {
            return this._target;
        },
        set: function (v) {
            var b = this._target !== v;
            if (b) {
                this._target = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "underline", {
        get: function () {
            return this._underline;
        },
        set: function (v) {
            var b = this._underline !== v;
            if (b) {
                this._underline = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "url", {
        get: function () {
            return this._url;
        },
        set: function (v) {
            var b = this._url !== v;
            if (b) {
                this._url = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    TextFormat.prototype.__raiseChange = function () {
        var ev = EventBase_1.EventBase.create(TextFormat.TEXT_FORMAT_CHANGE);
        this.dispatchEvent(ev);
    };
    return TextFormat;
}(EventDispatcher_1.EventDispatcher));
exports.TextFormat = TextFormat;



},{"../../glantern/EventBase":93,"../../glantern/GLUtil":94,"../events/EventDispatcher":53,"./TextFormatAlign":81,"os":209}],81:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/23.
 */
"use strict";
var TextFormatAlign = (function () {
    function TextFormatAlign() {
    }
    Object.defineProperty(TextFormatAlign, "CENTER", {
        get: function () {
            return "center";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormatAlign, "END", {
        get: function () {
            return "end";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormatAlign, "JUSTIFY", {
        get: function () {
            return "justify";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormatAlign, "LEFT", {
        get: function () {
            return "left";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormatAlign, "RIGHT", {
        get: function () {
            return "right";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormatAlign, "START", {
        get: function () {
            return "start";
        },
        enumerable: true,
        configurable: true
    });
    return TextFormatAlign;
}());
exports.TextFormatAlign = TextFormatAlign;



},{}],82:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/23.
 */
"use strict";
var TextInteractionMode = (function () {
    function TextInteractionMode() {
    }
    Object.defineProperty(TextInteractionMode, "NORMAL", {
        get: function () {
            return "normal";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextInteractionMode, "SELECTION", {
        get: function () {
            return "selection";
        },
        enumerable: true,
        configurable: true
    });
    return TextInteractionMode;
}());
exports.TextInteractionMode = TextInteractionMode;



},{}],83:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/23.
 */
"use strict";
var TextLineMetrics = (function () {
    function TextLineMetrics(x, width, height, ascent, descent, leading) {
        this.ascent = 0;
        this.descent = 0;
        this.height = 0;
        this.leading = 0;
        this.width = 0;
        this.x = 0;
        this.x = x;
        this.width = width;
        this.height = height;
        this.ascent = ascent;
        this.descent = descent;
        this.leading = leading;
    }
    return TextLineMetrics;
}());
exports.TextLineMetrics = TextLineMetrics;



},{}],84:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/23.
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./AntiAliasType"));
__export(require("./GridFitType"));
__export(require("./StyleSheet"));
__export(require("./TextField"));
__export(require("./TextFieldAutoSize"));
__export(require("./TextFieldType"));
__export(require("./TextFormat"));
__export(require("./TextFormatAlign"));
__export(require("./TextInteractionMode"));
__export(require("./TextLineMetrics"));



},{"./AntiAliasType":74,"./GridFitType":75,"./StyleSheet":76,"./TextField":77,"./TextFieldAutoSize":78,"./TextFieldType":79,"./TextFormat":80,"./TextFormatAlign":81,"./TextInteractionMode":82,"./TextLineMetrics":83}],85:[function(require,module,exports){
/**
 * Created by MIC on 2016/5/18.
 */
"use strict";
var pako = require("pako");
var NotImplementedError_1 = require("../errors/NotImplementedError");
var Endian_1 = require("./Endian");
var ArgumentError_1 = require("../errors/ArgumentError");
var GLUtil_1 = require("../../glantern/GLUtil");
var EOFError_1 = require("../errors/EOFError");
var CompressionAlgorithm_1 = require("./CompressionAlgorithm");
var ApplicationError_1 = require("../errors/ApplicationError");
var ByteArray = (function () {
    function ByteArray() {
        this._length = 0;
        this._position = -1;
        this._endian = Endian_1.Endian.BIG_ENDIAN;
        this._buffer = null;
        this._dataView = null;
    }
    Object.defineProperty(ByteArray.prototype, "bytesAvailable", {
        get: function () {
            var available = this.length - this.position - 1;
            return available < 0 ? 0 : available;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ByteArray.prototype, "endian", {
        get: function () {
            return this._endian;
        },
        set: function (v) {
            if (v === Endian_1.Endian.BIG_ENDIAN || v === Endian_1.Endian.LITTLE_ENDIAN) {
                this._endian = v;
            }
            else {
                throw new ArgumentError_1.ArgumentError("Argument out of range.", "v");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ByteArray.prototype, "length", {
        get: function () {
            return this._length;
        },
        set: function (v) {
            if (v > 0 && v !== this._length) {
                this.__adjustLength(v);
                this._length = v;
                if (this.position >= v) {
                    this._position = v;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ByteArray.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (v) {
            if (v >= this.length) {
                return;
            }
            else {
                this._position = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    ByteArray.prototype.clear = function () {
        this._dataView = null;
        this._buffer = null;
        this._position = 0;
        this._length = 0;
    };
    ByteArray.prototype.compress = function (algorithm) {
        if (algorithm === void 0) { algorithm = CompressionAlgorithm_1.CompressionAlgorithm.ZLIB; }
        this.__ensureBufferExists();
        var oldDataView = new Uint8Array(this._buffer);
        var newData;
        switch (algorithm) {
            case CompressionAlgorithm_1.CompressionAlgorithm.DEFLATE:
                // Definition hack.
                newData = pako.deflateRaw(oldDataView);
                break;
            case CompressionAlgorithm_1.CompressionAlgorithm.ZLIB:
                // Definition hack.
                newData = pako.deflate(oldDataView);
                break;
            case CompressionAlgorithm_1.CompressionAlgorithm.LZMA:
                throw new NotImplementedError_1.NotImplementedError("LZMA compression algorithm is not implemented yet.");
            default:
                throw new ArgumentError_1.ArgumentError("Unknown compression algorithm.");
        }
        this._buffer = newData.buffer;
        this._dataView = new DataView(this._buffer);
        this._length = this._buffer.byteLength;
        this._position = this._length;
    };
    ByteArray.prototype.deflate = function () {
        this.compress(CompressionAlgorithm_1.CompressionAlgorithm.DEFLATE);
    };
    ByteArray.prototype.inflate = function () {
        this.uncompress(CompressionAlgorithm_1.CompressionAlgorithm.DEFLATE);
    };
    ByteArray.prototype.readBoolean = function () {
        return this.readByte() !== 0;
    };
    ByteArray.prototype.readByte = function () {
        this.__checkPosition(1);
        var value = this._dataView.getInt8(this.position);
        this.position += 1;
        return value;
    };
    ByteArray.prototype.readBytes = function (bytes, offset, length) {
        if (offset === void 0) { offset = 0; }
        if (length === void 0) { length = 0; }
        this.__checkPosition(length);
        bytes.__checkPosition(length);
        if (length > 0) {
            bytes.position = offset;
            var position = this.position;
            for (var i = 0; i < length; ++i) {
                bytes._dataView.setUint8(offset, this._dataView.getUint8(position + i));
            }
            this.position += length;
            bytes.position += length;
        }
    };
    ByteArray.prototype.readDouble = function () {
        this.__checkPosition(8);
        var value = this._dataView.getFloat64(this.position, this.__isLittleEndian());
        this.position += 8;
        return value;
    };
    ByteArray.prototype.readFloat = function () {
        this.__checkPosition(4);
        var value = this._dataView.getFloat32(this.position, this.__isLittleEndian());
        this.position += 4;
        return value;
    };
    ByteArray.prototype.readInt = function () {
        this.__checkPosition(4);
        var value = this._dataView.getInt32(this.position, this.__isLittleEndian());
        this.position += 4;
        return value;
    };
    ByteArray.prototype.readShort = function () {
        this.__checkPosition(2);
        var value = this._dataView.getInt16(this.position, this.__isLittleEndian());
        this.position += 2;
        return value;
    };
    ByteArray.prototype.readUnsignedByte = function () {
        this.__checkPosition(1);
        var value = this._dataView.getUint8(this.position);
        this.position += 1;
        return value;
    };
    ByteArray.prototype.readUnsignedInt = function () {
        this.__checkPosition(4);
        var value = this._dataView.getUint32(this.position, this.__isLittleEndian());
        this.position += 4;
        return value;
    };
    ByteArray.prototype.readUnsignedShort = function () {
        this.__checkPosition(2);
        var value = this._dataView.getUint16(this.position, this.__isLittleEndian());
        this.position += 2;
        return value;
    };
    ByteArray.prototype.uncompress = function (algorithm) {
        if (algorithm === void 0) { algorithm = CompressionAlgorithm_1.CompressionAlgorithm.ZLIB; }
        this.__ensureBufferExists();
        var oldDataView = new Uint8Array(this._buffer);
        var newData;
        switch (algorithm) {
            case CompressionAlgorithm_1.CompressionAlgorithm.DEFLATE:
                newData = pako.inflateRaw(oldDataView);
                break;
            case CompressionAlgorithm_1.CompressionAlgorithm.ZLIB:
                newData = pako.inflate(oldDataView);
                break;
            case CompressionAlgorithm_1.CompressionAlgorithm.LZMA:
                throw new NotImplementedError_1.NotImplementedError("LZMA compression algorithm is not implemented yet.");
            default:
                throw new ArgumentError_1.ArgumentError("Unknown compression algorithm.");
        }
        this._buffer = newData.buffer;
        this._dataView = new DataView(this._buffer);
        this._length = this._buffer.byteLength;
        this._position = this._length;
    };
    ByteArray.prototype.writeBoolean = function (value) {
        this.writeByte(value ? 1 : 0);
    };
    ByteArray.prototype.writeByte = function (value) {
        this.__checkPosition(1);
        this._dataView.setInt8(this.position, value);
        this.position += 1;
    };
    ByteArray.prototype.writeBytes = function (bytes, offset, length) {
        if (offset === void 0) { offset = 0; }
        if (length === void 0) { length = 0; }
        bytes.readBytes(this, offset, length);
    };
    ByteArray.prototype.writeDouble = function (value) {
        this.__checkPosition(8);
        this._dataView.setFloat64(this.position, value, this.__isLittleEndian());
        this.position += 8;
    };
    ByteArray.prototype.writeFloat = function (value) {
        this.__checkPosition(4);
        this._dataView.setFloat64(this.position, value, this.__isLittleEndian());
        this.position += 4;
    };
    ByteArray.prototype.writeInt = function (value) {
        this.__checkPosition(4);
        this._dataView.setInt32(this.position, value, this.__isLittleEndian());
        this.position += 4;
    };
    ByteArray.prototype.writeShort = function (value) {
        this.__checkPosition(2);
        this._dataView.setInt16(this.position, value, this.__isLittleEndian());
        this.position += 2;
    };
    ByteArray.prototype.writeUnsignedByte = function (value) {
        this.__checkPosition(1);
        this._dataView.setUint8(this.position, value);
        this.position += 1;
    };
    ByteArray.prototype.writeUnsignedInt = function (value) {
        this.__checkPosition(4);
        this._dataView.setUint32(this.position, value, this.__isLittleEndian());
        this.position += 4;
    };
    ByteArray.prototype.writeUnsignedShort = function (value) {
        this.__checkPosition(2);
        this._dataView.setUint16(this.position, value, this.__isLittleEndian());
        this.position += 2;
    };
    // MIC
    ByteArray.from = function (buffer) {
        var arrayBuffer = new ByteArray();
        arrayBuffer._buffer = buffer;
        arrayBuffer._dataView = new DataView(buffer);
        arrayBuffer._length = buffer.byteLength;
        arrayBuffer._position = 0;
        return arrayBuffer;
    };
    // MIC
    ByteArray.prototype.flatten = function () {
        this.__ensureBufferExists();
        var array = new Array(this.length);
        for (var i = 0; i < array.length; ++i) {
            array[i] = this._dataView.getUint8(i);
        }
        return array;
    };
    Object.defineProperty(ByteArray.prototype, "rawBuffer", {
        get: function () {
            return this._buffer;
        },
        enumerable: true,
        configurable: true
    });
    ByteArray.prototype.__adjustLength = function (targetLength) {
        var oldBuffer = this._buffer;
        var oldDataView = this._dataView;
        var newBuffer = new ArrayBuffer(targetLength);
        var newDataView = new DataView(newBuffer);
        if (GLUtil_1.GLUtil.ptr(oldBuffer)) {
            var copyLength = targetLength > this.length ? oldBuffer.byteLength : newBuffer.byteLength;
            for (var i = 0; i < copyLength; ++i) {
                newDataView.setUint8(i, oldDataView.getUint8(i));
            }
            for (var i = copyLength; i < newBuffer.byteLength; ++i) {
                newDataView.setUint8(i, 0);
            }
        }
        else {
            for (var i = 0; i < newBuffer.byteLength; ++i) {
                newDataView.setUint8(i, 0);
            }
        }
        this._buffer = newBuffer;
        this._dataView = newDataView;
    };
    ByteArray.prototype.__ensureBufferExists = function () {
        if (this._buffer === null) {
            throw new ApplicationError_1.ApplicationError("Buffer has not been allocated.");
        }
    };
    ByteArray.prototype.__checkPosition = function (minimumReservedBytes) {
        this.__ensureBufferExists();
        if (this.bytesAvailable < minimumReservedBytes) {
            throw new EOFError_1.EOFError("Position is out of buffer range.");
        }
    };
    ByteArray.prototype.__isLittleEndian = function () {
        return this.endian === Endian_1.Endian.LITTLE_ENDIAN;
    };
    return ByteArray;
}());
exports.ByteArray = ByteArray;



},{"../../glantern/GLUtil":94,"../errors/ApplicationError":47,"../errors/ArgumentError":48,"../errors/EOFError":49,"../errors/NotImplementedError":51,"./CompressionAlgorithm":86,"./Endian":87,"pako":210}],86:[function(require,module,exports){
/**
 * Created by MIC on 2016/6/11.
 */
"use strict";
var CompressionAlgorithm = (function () {
    function CompressionAlgorithm() {
    }
    Object.defineProperty(CompressionAlgorithm, "DEFLATE", {
        get: function () {
            return "deflate";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompressionAlgorithm, "LZMA", {
        get: function () {
            return "lzma";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompressionAlgorithm, "ZLIB", {
        get: function () {
            return "zlib";
        },
        enumerable: true,
        configurable: true
    });
    return CompressionAlgorithm;
}());
exports.CompressionAlgorithm = CompressionAlgorithm;



},{}],87:[function(require,module,exports){
/**
 * Created by MIC on 2016/5/18.
 */
"use strict";
var Endian = (function () {
    function Endian() {
    }
    Object.defineProperty(Endian, "BIG_ENDIAN", {
        get: function () {
            return "bigEndian";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Endian, "LITTLE_ENDIAN", {
        get: function () {
            return "littleEndian";
        },
        enumerable: true,
        configurable: true
    });
    return Endian;
}());
exports.Endian = Endian;



},{}],88:[function(require,module,exports){
/**
 * Created by MIC on 2016/1/7.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventDispatcher_1 = require("../events/EventDispatcher");
var TimerEvent_1 = require("../events/TimerEvent");
var Timer = (function (_super) {
    __extends(Timer, _super);
    function Timer(delay, repeatCount) {
        if (repeatCount === void 0) { repeatCount = 0; }
        _super.call(this);
        this.enabled = true;
        this._currentCount = 0;
        this._delay = 1000;
        this._repeatCount = 0;
        this._running = false;
        this._handle = 0;
        this.delay = delay;
        this.repeatCount = repeatCount;
        this.start();
    }
    Object.defineProperty(Timer.prototype, "currentCount", {
        get: function () {
            return this._currentCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timer.prototype, "delay", {
        get: function () {
            return this._delay;
        },
        set: function (v) {
            v = Math.floor(v);
            this._delay = v >= 0 ? v : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timer.prototype, "repeatCount", {
        get: function () {
            return this._repeatCount;
        },
        set: function (v) {
            v = Math.floor(v);
            this._repeatCount = v >= 0 ? v : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timer.prototype, "running", {
        get: function () {
            return this._running;
        },
        enumerable: true,
        configurable: true
    });
    Timer.prototype.reset = function () {
        if (this.running) {
            window.clearInterval(this._handle);
            this._handle = 0;
            this._running = false;
            this._currentCount = 0;
        }
    };
    Timer.prototype.start = function () {
        if (!this.running && (this.currentCount < this.repeatCount || this.repeatCount === 0)) {
            this._handle = window.setInterval(this._$timerCallback.bind(this), this.delay);
            this._running = true;
        }
    };
    Timer.prototype.stop = function () {
        if (this.running) {
            window.clearInterval(this._handle);
            this._handle = 0;
            this._running = false;
        }
    };
    Timer.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.reset();
    };
    Timer.prototype._$timerCallback = function () {
        if (this.enabled) {
            this._currentCount++;
            if (this.repeatCount > 0 && this.currentCount > this.repeatCount) {
                this.stop();
                this._$raiseTimerCompleteEvent();
            }
            else {
                this._$raiseTimerEvent();
            }
        }
    };
    Timer.prototype._$raiseTimerEvent = function () {
        var ev = new TimerEvent_1.TimerEvent(TimerEvent_1.TimerEvent.TIMER);
        ev.timeStamp = Date.now();
        this.dispatchEvent(ev);
    };
    Timer.prototype._$raiseTimerCompleteEvent = function () {
        var ev = new TimerEvent_1.TimerEvent(TimerEvent_1.TimerEvent.TIMER_COMPLETE);
        ev.timeStamp = Date.now();
        this.dispatchEvent(ev);
    };
    return Timer;
}(EventDispatcher_1.EventDispatcher));
exports.Timer = Timer;



},{"../events/EventDispatcher":53,"../events/TimerEvent":55}],89:[function(require,module,exports){
/**
 * Created by MIC on 2016/1/7.
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./Timer"));
__export(require("./ByteArray"));
__export(require("./Endian"));
__export(require("./CompressionAlgorithm"));



},{"./ByteArray":85,"./CompressionAlgorithm":86,"./Endian":87,"./Timer":88}],90:[function(require,module,exports){
/**
 * Created by MIC on 2016/6/11.
 */
"use strict";
var MathUtil_1 = require("./MathUtil");
var arrayBuffer = new ArrayBuffer(8);
var views = {
    uint8View: new Uint8Array(arrayBuffer),
    int8View: new Int8Array(arrayBuffer),
    uint16View: new Uint16Array(arrayBuffer),
    int16View: new Int16Array(arrayBuffer),
    uint32View: new Uint32Array(arrayBuffer),
    int32View: new Int32Array(arrayBuffer),
    float32View: new Float32Array(arrayBuffer),
    float64View: new Float64Array(arrayBuffer)
};
var isSystemLittleEndian;
(function () {
    var buffer = new ArrayBuffer(2);
    var dataView = new DataView(buffer);
    dataView.setInt16(0, 256, true);
    var newBuffer = new Int16Array(buffer);
    isSystemLittleEndian = newBuffer[0] === 256;
})();
function getBufferArray(length) {
    var array = new Array(length);
    for (var i = 0; i < length; ++i) {
        array[i] = views.uint8View[i];
    }
    return array;
}
function setBufferArray(data, dataStartIndex, length) {
    for (var i = dataStartIndex; i < dataStartIndex + length; ++i) {
        views.uint8View[i - dataStartIndex] = data[i];
    }
}
var BitConverter = (function () {
    function BitConverter() {
    }
    Object.defineProperty(BitConverter, "isLittleEndian", {
        get: function () {
            return isSystemLittleEndian;
        },
        enumerable: true,
        configurable: true
    });
    BitConverter.float32ToBytes = function (value) {
        views.float32View[0] = value;
        return getBufferArray(4);
    };
    BitConverter.float64ToBytes = function (value) {
        views.float64View[0] = value;
        return getBufferArray(8);
    };
    BitConverter.bytesToFloat32 = function (bytes, startIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        setBufferArray(bytes, startIndex, 4);
        return views.float32View[0];
    };
    BitConverter.bytesToFloat64 = function (bytes, startIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        setBufferArray(bytes, startIndex, 8);
        return views.float64View[0];
    };
    BitConverter.int16ToBytes = function (value) {
        views.int16View[0] = value;
        return getBufferArray(2);
    };
    BitConverter.uint16ToBytes = function (value) {
        views.uint16View[0] = value;
        return getBufferArray(2);
    };
    BitConverter.int32ToBytes = function (value) {
        views.int32View[0] = value;
        return getBufferArray(4);
    };
    BitConverter.uint32ToBytes = function (value) {
        views.uint32View[0] = value;
        return getBufferArray(4);
    };
    BitConverter.int64ToBytes = function (value) {
        var byteArray = [0, 0, 0, 0, 0, 0, 0, 0];
        for (var index = byteArray.length - 1; index >= 0; index--) {
            var byte = value & 0xff;
            byteArray[index] = byte;
            value = (value - byte) / 256;
        }
        return byteArray;
    };
    BitConverter.uint64ToBytes = function (value) {
        return BitConverter.int64ToBytes(value >= 0 ? value : -value);
    };
    BitConverter.bytesToInt64 = function (bytes, startIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        var value = BitConverter.bytesToUint64(bytes, startIndex);
        var isNegative = BitConverter.__isComplement(bytes, startIndex, 8);
        if (isNegative) {
            value = MathUtil_1.MathUtil.complementToNegative(value);
        }
        return value;
    };
    BitConverter.bytesToUint64 = function (bytes, startIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        var value = 0;
        for (var i = startIndex; i < startIndex + 8; i++) {
            value = (value << 8) + bytes[i];
        }
        return value;
    };
    BitConverter.bytesToInt32 = function (bytes, startIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        setBufferArray(bytes, startIndex, 4);
        return views.int32View[0];
    };
    BitConverter.bytesToUint32 = function (bytes, startIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        setBufferArray(bytes, startIndex, 4);
        return views.uint32View[0];
    };
    BitConverter.bytesToInt16 = function (bytes, startIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        setBufferArray(bytes, startIndex, 2);
        return views.int16View[0];
    };
    BitConverter.bytesToUint16 = function (bytes, startIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        setBufferArray(bytes, startIndex, 2);
        return views.uint16View[0];
    };
    BitConverter.swapEndian = function (bytes, startIndex, length) {
        if (startIndex === void 0) { startIndex = 0; }
        if (length === void 0) { length = bytes.length; }
        var result = new Array(length);
        var endIndex = startIndex + length - 1;
        var halfIndex = startIndex + (((length + 1) / 2) | 0);
        for (var i = startIndex; i < halfIndex; i++) {
            result[i - startIndex] = bytes[endIndex - i];
        }
        return result;
    };
    BitConverter.float64ToInt64Bits = function (value) {
        // Be careful! Only 6-7 digits are significant!
        views.float64View[0] = value;
        var bytes = getBufferArray(8);
        return BitConverter.bytesToInt64(bytes);
    };
    BitConverter.int64ToFloat64Bits = function (value) {
        // Be careful! Only 6-7 digits are significant!
        var bytes = BitConverter.int64ToBytes(value);
        setBufferArray(bytes, 0, bytes.length);
        return views.float64View[0];
    };
    BitConverter.float32ToInt32Bits = function (value) {
        views.float32View[0] = value;
        return views.int32View[0];
    };
    BitConverter.int32ToFloat32Bits = function (value) {
        views.int32View[0] = value;
        return views.float32View[0];
    };
    BitConverter.__isComplement = function (bytes, startIndex, length) {
        return MathUtil_1.MathUtil.isByteComplement(bytes[startIndex + length - 1]);
    };
    return BitConverter;
}());
exports.BitConverter = BitConverter;



},{"./MathUtil":95}],91:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/25.
 */
"use strict";
var WebGLRenderer_1 = require("../webgl/WebGLRenderer");
var Stage_1 = require("../flash/display/Stage");
var FlashEvent_1 = require("../flash/events/FlashEvent");
var VisualUtil_1 = require("./VisualUtil");
var EventBase_1 = require("./EventBase");
var EngineBase = (function () {
    function EngineBase() {
        this._isRunning = false;
        this._renderer = null;
        this._stage = null;
        this._isInitialized = false;
        this._attachedUpdateFunctions = null;
        this._loopFunction = null;
        this._elapsedMillis = 0;
        this._fps = 0;
        this._fpsCounter = 0;
        this._lastTimeFpsUpdated = 0;
        this._lastTimeUpdated = -1;
        this._attachedUpdateFunctions = [];
    }
    EngineBase.prototype.initialize = function (width, height, options) {
        if (options === void 0) { options = WebGLRenderer_1.WebGLRenderer.DEFAULT_OPTIONS; }
        if (this.isInitialized) {
            return;
        }
        this._renderer = new WebGLRenderer_1.WebGLRenderer(width, height, options);
        this._stage = new Stage_1.Stage(this._renderer);
        this._loopFunction = this.__mainLoop.bind(this);
        this._isInitialized = true;
    };
    EngineBase.prototype.dispose = function () {
        if (!this.isInitialized) {
            return;
        }
        this._stage.dispose();
        this._renderer.dispose();
        this._stage = null;
        this._renderer = null;
        while (this._attachedUpdateFunctions.length > 0) {
            this._attachedUpdateFunctions.pop();
        }
        this._isInitialized = false;
    };
    /**
     * Starts the animation loop. Updating and rendering are automatically handled in the loop.
     * By default, {@link startAnimation} uses {@link window.requestAnimationFrame} function and relies
     * on the frame rate adjuster of the browser window.
     */
    EngineBase.prototype.startAnimation = function () {
        if (!this.isInitialized) {
            return;
        }
        if (!this.isAnimationRunning) {
            this._lastTimeUpdated = Date.now();
        }
        this._isRunning = true;
        VisualUtil_1.VisualUtil.requestAnimationFrame(this._loopFunction);
    };
    /**
     * Stops the animation loop. Internal state is preserved, and the next {@link startAnimation} call resumes
     * from last state.
     */
    EngineBase.prototype.stopAnimation = function () {
        if (!this.isInitialized) {
            return;
        }
        this.__updateTimeCounters();
        this._fps = 0;
        this._isRunning = false;
    };
    EngineBase.prototype.clear = function () {
        this._renderer.clear();
    };
    EngineBase.prototype.runOneFrame = function (timeInfo) {
        if (!this._isInitialized) {
            return;
        }
        if (this._attachedUpdateFunctions.length > 0) {
            for (var i = 0; i < this._attachedUpdateFunctions.length; ++i) {
                var func = this._attachedUpdateFunctions[i];
                if (typeof func === "function") {
                    func(timeInfo);
                }
            }
        }
        this._stage.dispatchEvent(EventBase_1.EventBase.create(FlashEvent_1.FlashEvent.ENTER_FRAME));
        this._stage.update(timeInfo);
        this._stage.render(this._renderer);
    };
    Object.defineProperty(EngineBase.prototype, "stage", {
        get: function () {
            return this._stage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EngineBase.prototype, "renderer", {
        get: function () {
            return this._renderer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EngineBase.prototype, "view", {
        get: function () {
            return this.isInitialized ? this._renderer.view : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EngineBase.prototype, "isAnimationRunning", {
        /**
         * Gets a boolean flag indicating whether the animation loop is running.
         * @returns {Boolean}
         */
        get: function () {
            return this.isInitialized && this._isRunning;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EngineBase.prototype, "isInitialized", {
        get: function () {
            return this._isInitialized;
        },
        enumerable: true,
        configurable: true
    });
    EngineBase.prototype.attachUpdateFunction = function (func) {
        if (typeof func === "function" && this._attachedUpdateFunctions.indexOf(func) < 0) {
            this._attachedUpdateFunctions.push(func);
        }
    };
    Object.defineProperty(EngineBase.prototype, "elapsedMillis", {
        /**
         * Gets total time elapsed in handling the animation loop, in milliseconds.
         * @returns {Number}
         */
        get: function () {
            return this._elapsedMillis;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EngineBase.prototype, "fps", {
        /**
         * Gets the average FPS (frame per second) of last second.
         * @returns {Number}
         */
        get: function () {
            return this._fps;
        },
        enumerable: true,
        configurable: true
    });
    EngineBase.prototype.__updateTimeCounters = function () {
        if (this._lastTimeUpdated > 0) {
            var now = Date.now();
            this._elapsedMillis += now - this._lastTimeUpdated;
            this._lastTimeUpdated = now;
        }
        ++this._fpsCounter;
        if (this.elapsedMillis - this._lastTimeFpsUpdated > 1000) {
            this._fps = this._fpsCounter / (this.elapsedMillis - this._lastTimeFpsUpdated) * 1000;
            this._fpsCounter = 0;
            this._lastTimeFpsUpdated = this.elapsedMillis;
        }
    };
    /**
     * The main render loop.
     * @param time {Number} The time argument of {@link window#requestAnimationFrame} callback. However, some browsers
     * does not invoke with this argument.
     * @private
     */
    EngineBase.prototype.__mainLoop = function (time) {
        if (!this.isAnimationRunning) {
            return;
        }
        this.__updateTimeCounters();
        var timeInfo = { millisFromStartup: this.elapsedMillis };
        this.runOneFrame(timeInfo);
        VisualUtil_1.VisualUtil.requestAnimationFrame(this._loopFunction);
    };
    return EngineBase;
}());
exports.EngineBase = EngineBase;



},{"../flash/display/Stage":40,"../flash/events/FlashEvent":54,"../webgl/WebGLRenderer":115,"./EventBase":93,"./VisualUtil":96}],92:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var ErrorBase = (function () {
    function ErrorBase(message) {
        if (message === void 0) { message = ""; }
        this._message = null;
        this._message = message;
    }
    Object.defineProperty(ErrorBase.prototype, "message", {
        get: function () {
            return this._message;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorBase.prototype, "name", {
        get: function () {
            return "ErrorBase";
        },
        enumerable: true,
        configurable: true
    });
    return ErrorBase;
}());
exports.ErrorBase = ErrorBase;



},{}],93:[function(require,module,exports){
/**
 * Created by MIC on 2016/6/13.
 */
"use strict";
var EventBase = (function () {
    function EventBase(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        this.bubbles = false;
        this.cancelBubble = false;
        this.cancelable = false;
        this.currentTarget = null;
        this.defaultPrevented = false;
        this.eventPhase = -1;
        this.isTrusted = true;
        this.returnValue = false;
        this.srcElement = null;
        this.target = null;
        this.timeStamp = 0;
        this.type = null;
        this.AT_TARGET = 2;
        this.BUBBLING_PHASE = 0;
        this.CAPTURING_PHASE = 1;
        this.type = type;
        this.bubbles = bubbles;
        this.cancelable = cancelable;
    }
    EventBase.prototype.initEvent = function (eventTypeArg, canBubbleArg, cancelableArg) {
    };
    EventBase.prototype.preventDefault = function () {
    };
    EventBase.prototype.stopImmediatePropagation = function () {
    };
    EventBase.prototype.stopPropagation = function () {
    };
    EventBase.create = function (type) {
        var ev = new EventBase(type, false, false);
        ev.timeStamp = Date.now();
        return ev;
    };
    return EventBase;
}());
exports.EventBase = EventBase;



},{}],94:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/17.
 */
"use strict";
var $global = window;
/**
 * The class providing utility functions.
 */
var GLUtil = (function () {
    function GLUtil() {
    }
    GLUtil.checkSupportStatus = function () {
        var result = {
            ok: true,
            reasons: []
        };
        var globalObject = window;
        if (!globalObject) {
            result.ok = false;
            result.reasons.push("'window' object is not found in global scope.");
        }
        var notSupportedPrompt = " is not supported by this browser";
        // GLantern is based on <canvas>, so it should exist.
        if (!GLUtil.isClassDefinition(globalObject["HTMLCanvasElement"])) {
            result.ok = false;
            result.reasons.push("Canvas element" + notSupportedPrompt);
        }
        // GLantern uses WebGL, so there should be a corresponding rendering context.
        if (!GLUtil.isClassDefinition(globalObject["WebGLRenderingContext"])) {
            result.ok = false;
            result.reasons.push("WebGL" + notSupportedPrompt);
        }
        // Classes related to array buffer.
        var arrayBufferClasses = ["ArrayBuffer", "DataView", "Uint8Array", "Int8Array", "Uint16Array", "Int16Array", "Uint32Array", "Int32Array", "Float32Array", "Float64Array"];
        for (var i = 0; i < arrayBufferClasses.length; ++i) {
            if (!GLUtil.isClassDefinition(globalObject[arrayBufferClasses[i]])) {
                result.ok = false;
                result.reasons.push("'" + arrayBufferClasses[i] + "' class" + notSupportedPrompt);
            }
        }
        // GLantern uses Map and Set class, so they should exist.
        // Note: Map and Set are ES6 features, but they are implemented on modern browsers.
        if (!GLUtil.isClassDefinition(globalObject["Map"])) {
            result.ok = false;
            result.reasons.push("'Map' class" + notSupportedPrompt);
        }
        if (!GLUtil.isClassDefinition(globalObject["Set"])) {
            result.ok = false;
            result.reasons.push("'Set' class" + notSupportedPrompt);
        }
        // No plans for support of Chrome whose version is under 40, due to a WebGL memory leak problem.
        if (typeof globalObject["chrome"] === "object") {
            var chromeVersionRegExp = /Chrome\/(\d+)(?:\.\d+)*/;
            var chromeVersionInfo = chromeVersionRegExp.exec(window.navigator.appVersion);
            if (chromeVersionInfo.length < 2 || parseInt(chromeVersionInfo[1]) < 40) {
                result.ok = false;
                result.reasons.push("Chrome under version 40 is not supported due to performance faults.");
            }
        }
        return result;
    };
    /**
     * Check whether a value is {@link undefined} or {@link null}.
     * @param value {*} The value to check.
     * @returns {Boolean} True if the value is {@link undefined} or {@link null}, and false otherwise.
     */
    GLUtil.isUndefinedOrNull = function (value) {
        return value === void (0) || value === null;
    };
    /**
     * Check whether a value is {@link undefined}.
     * @param value {*} The value to check.
     * @returns {Boolean} True if the value is {@link undefined}, and false otherwise.
     */
    GLUtil.isUndefined = function (value) {
        return value === void (0);
    };
    /**
     * Check whether a value is logically true.
     * @param value {*} The value to check.
     * @returns {Boolean}
     */
    GLUtil.ptr = function (value) {
        return !!value;
    };
    /**
     * Check whether a value is a function.
     * @param value {*} The value to check.
     * @returns {Boolean} True if the value is a function, and false otherwise.
     */
    GLUtil.isFunction = function (value) {
        return typeof value === "function";
    };
    /**
     * Check whether a value is a class prototype.
     * @param value {*} The value to check.
     * @returns {Boolean} True if the value is a class definition, and false otherwise.
     * @remarks IE11 has a non-standard behavior to declare experimental features (e.g. Map) as functions,
     *          and tested features (e.g. WebGLRenderingContext) as objects.
     */
    GLUtil.isClassDefinition = function (value) {
        var typeCheck;
        if (typeof value === "function") {
            typeCheck = true;
        }
        else {
            var isIE11 = window.navigator.appVersion.indexOf("Trident/7.0") >= 0 && window.navigator.appVersion.indexOf("rv:11.0") >= 0;
            typeCheck = isIE11 && typeof value === "object";
        }
        var constructorCheck = (value && value.prototype ? value.prototype.constructor === value : false);
        return typeCheck && constructorCheck;
    };
    /**
     * Generate a string based on the template, and provided values. This function acts similarly to the String.Format()
     * function in CLR.
     * @param format {String} The template string.
     * @param replaceWithArray {*[]} The value array to provide values for formatting.
     * @example
     * var person = { name: "John Doe", age: 20 };
     * console.log(_util.formatString("{0}'s age is {1}.", person.name, person.age);
     * @returns {String} The generated string, with valid placeholders replaced by values matched.
     */
    GLUtil.formatString = function (format) {
        var replaceWithArray = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            replaceWithArray[_i - 1] = arguments[_i];
        }
        var replaceWithArrayIsNull = !GLUtil.ptr(replaceWithArray);
        var replaceWithArrayLength = replaceWithArrayIsNull ? -1 : replaceWithArray.length;
        function __stringFormatter(matched) {
            var indexString = matched.substring(1, matched.length - 1);
            var indexValue = parseInt(indexString);
            if (!replaceWithArrayIsNull && (0 <= indexValue && indexValue < replaceWithArrayLength)) {
                if (typeof replaceWithArray[indexValue] === "undefined") {
                    return "undefined";
                }
                else if (replaceWithArray[indexValue] === null) {
                    return "null";
                }
                else {
                    return replaceWithArray[indexValue].toString();
                }
            }
            else {
                return matched;
            }
        }
        var regex = /{[\d]+}/g;
        return format.replace(regex, __stringFormatter);
    };
    GLUtil.deepClone = function (sourceObject) {
        if (typeof sourceObject === "undefined" || sourceObject === null || sourceObject === true || sourceObject === false) {
            return sourceObject;
        }
        if (typeof sourceObject === "string" || typeof sourceObject === "number") {
            return sourceObject;
        }
        /* Arrays */
        if (Array.isArray(sourceObject)) {
            var tmpArray = [];
            for (var i = 0; i < sourceObject.length; ++i) {
                tmpArray.push(GLUtil.deepClone(sourceObject[i]));
            }
            return tmpArray;
        }
        /* ES6 classes. Chrome has implemented a part of them so they must be considered. */
        if (typeof $global.Map !== "undefined" && sourceObject instanceof Map) {
            var newMap = new Map();
            sourceObject.forEach(function (v, k) {
                newMap.set(GLUtil.deepClone(k), GLUtil.deepClone(v));
            });
            return newMap;
        }
        if (typeof $global.Set !== "undefined" && sourceObject instanceof Set) {
            var newSet = new Set();
            sourceObject.forEach(function (v) {
                newSet.add(GLUtil.deepClone(v));
            });
            return newSet;
        }
        /* Classic ES5 functions. */
        if (sourceObject instanceof Function || typeof sourceObject === "function") {
            var sourceFunctionObject = sourceObject;
            var fn = (function () {
                return function () {
                    return sourceFunctionObject.apply(this, arguments);
                };
            })();
            fn.prototype = sourceFunctionObject.prototype;
            for (var key in sourceFunctionObject) {
                if (sourceFunctionObject.hasOwnProperty(key)) {
                    fn[key] = sourceFunctionObject[key];
                }
            }
            return fn;
        }
        /* Classic ES5 objects. */
        if (sourceObject instanceof Object || typeof sourceObject === "object") {
            var newObject = Object.create(null);
            if (typeof sourceObject.hasOwnProperty === "function") {
                for (var key in sourceObject) {
                    if (sourceObject.hasOwnProperty(key)) {
                        newObject[key] = GLUtil.deepClone(sourceObject[key]);
                    }
                }
            }
            else {
                for (var key in sourceObject) {
                    newObject[key] = GLUtil.deepClone(sourceObject[key]);
                }
            }
            return newObject;
        }
        return (void 0);
    };
    /**
     * Prints out a message with a stack trace.
     * @param message {String} The message to print.
     * @param [extra] {*} Extra information.
     */
    GLUtil.trace = function (message, extra) {
        if (extra === void 0) { extra = void (0); }
        if (GLUtil.isUndefined(extra)) {
            console.info(message);
        }
        else {
            console.info(message, extra);
        }
        console.trace();
    };
    GLUtil.colorToCssSharp = function (color) {
        color |= 0;
        return "#" + GLUtil.padLeft(color.toString(16), 6, "0");
    };
    GLUtil.colorToCssRgba = function (color) {
        color |= 0;
        var a = (color >> 24) & 0xff;
        var r = (color >> 16) & 0xff;
        var g = (color >> 8) & 0xff;
        var b = color & 0xff;
        return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
    };
    GLUtil.rgb = function (r, g, b) {
        return GLUtil.rgba(r, g, b, 0xff);
    };
    GLUtil.rgba = function (r, g, b, a) {
        return ((a & 0xff) << 24) | ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff);
    };
    GLUtil.decomposeRgb = function (color) {
        var r = (color >> 16) & 0xff;
        var g = (color >> 8) & 0xff;
        var b = color & 0xff;
        return {
            r: r, g: g, b: b, a: 0xff
        };
    };
    GLUtil.decomposeRgba = function (color) {
        var a = (color >> 24) & 0xff;
        var r = (color >> 16) & 0xff;
        var g = (color >> 8) & 0xff;
        var b = color & 0xff;
        return {
            r: r, g: g, b: b, a: a
        };
    };
    GLUtil.padLeft = function (str, targetLength, padWith) {
        while (str.length < targetLength) {
            str = padWith + str;
        }
        if (str.length > targetLength) {
            str = str.substring(str.length - targetLength, str.length - 1);
        }
        return str;
    };
    GLUtil.remove = function (array, value, equalFunc) {
        if (equalFunc === void 0) { equalFunc = null; }
        if (typeof equalFunc !== "function") {
            var searchIndex = array.indexOf(value);
            if (searchIndex >= 0) {
                array.splice(searchIndex, 1);
                return true;
            }
            else {
                return false;
            }
        }
        for (var i = 0; i < array.length; ++i) {
            if (equalFunc(value, array[i])) {
                array.splice(i, 1);
                return true;
            }
        }
        return false;
    };
    GLUtil.removeAll = function (array, value, equalFunc) {
        if (equalFunc === void 0) { equalFunc = null; }
        var func = typeof equalFunc === "function" ? equalFunc : simpleEquals;
        var counter = 0;
        var arrayLength = array.length;
        for (var i = 0; i < arrayLength; ++i) {
            if (func(value, array[i])) {
                array.splice(i, 1);
                --i;
                --arrayLength;
                ++counter;
            }
        }
        return counter;
    };
    GLUtil.removeAt = function (array, index) {
        index |= 0;
        if (0 <= index && index < array.length) {
            array.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    };
    return GLUtil;
}());
exports.GLUtil = GLUtil;
function simpleEquals(t1, t2) {
    return t1 === t2;
}



},{}],95:[function(require,module,exports){
/**
 * Created by MIC on 2016/6/11.
 */
"use strict";
var MathUtil = (function () {
    function MathUtil() {
    }
    /**
     * Limit a number inside a range specified by min and max (both are reachable).
     * @param v {Number} The number to limit.
     * @param min {Number} The lower bound. Numbers strictly less than this bound will be set to the value.
     * @param max {Number} The upper bound. Numbers strictly greater than this bound will be set to this value.
     * @returns {Number} The limited value. If the original number is inside the specified range, it will not be
     * altered. Otherwise, it will be either min or max.
     */
    MathUtil.clamp = function (v, min, max) {
        v < min && (v = min);
        v > max && (v = max);
        return v;
    };
    /**
     * Check whether a number is inside a range specified min a max (both are unreachable).
     * @param v {Number} The number to check.
     * @param min {Number} The lower bound.
     * @param max {Number} The upper bound.
     * @returns {Boolean} True if the number to check is strictly greater than min and strictly less than max, and
     * false otherwise.
     */
    MathUtil.isValueBetweenNotEquals = function (v, min, max) {
        return min < v && v < max;
    };
    /**
     * Check whether a number is inside a range specified min a max (both are reachable).
     * @param v {Number} The number to check.
     * @param min {Number} The lower bound.
     * @param max {Number} The upper bound.
     * @returns {Boolean} True if the number to check is not less than min and not greater than max, and
     * false otherwise.
     */
    MathUtil.isValueBetweenEquals = function (v, min, max) {
        return min <= v && v <= max;
    };
    /**
     * Test whether a positive number is a power of 2.
     * @param positiveNumber {Number} The positive number to test.
     * @returns {Boolean} True if the number is a power of 2, and false otherwise.
     */
    MathUtil.isPowerOfTwo = function (positiveNumber) {
        var num = positiveNumber | 0;
        if (num != positiveNumber || MathUtil.isNaN(num) || !isFinite(num)) {
            return false;
        }
        else {
            return num > 0 && (num & (num - 1)) === 0;
        }
    };
    /**
     * Calculate the smallest power of 2 which is greater than or equals the given positive number.
     * @param positiveNumber {Number} The positive number as the basis.
     * @returns {Number} The smallest power of 2 which is greater than or equals the given positive number
     */
    MathUtil.power2Roundup = function (positiveNumber) {
        if (positiveNumber < 0)
            return 0;
        --positiveNumber;
        positiveNumber |= positiveNumber >>> 1;
        positiveNumber |= positiveNumber >>> 2;
        positiveNumber |= positiveNumber >>> 4;
        positiveNumber |= positiveNumber >>> 8;
        positiveNumber |= positiveNumber >>> 16;
        return positiveNumber + 1;
    };
    MathUtil.complementToNegative = function (complement) {
        return -((~complement) + 1);
    };
    MathUtil.isByteComplement = function (value) {
        return ((value & 0xff) & 0x80) !== 0;
    };
    MathUtil.isInt32Complement = function (value) {
        return ((value & 0xffffffff) & 0x80000000) !== 0;
    };
    MathUtil.clampUpper = function (value, upperBound) {
        return value > upperBound ? upperBound : value;
    };
    MathUtil.clampLower = function (value, lowerBound) {
        return value < lowerBound ? lowerBound : value;
    };
    MathUtil.isNaN = function (value) {
        return value !== value;
    };
    return MathUtil;
}());
exports.MathUtil = MathUtil;



},{}],96:[function(require,module,exports){
/**
 * Created by MIC on 2016/6/11.
 */
"use strict";
var VisualUtil = (function () {
    function VisualUtil() {
    }
    VisualUtil.requestAnimationFrame = function (f) {
        return window.requestAnimationFrame(f);
    };
    VisualUtil.cancelAnimationFrame = function (handle) {
        window.cancelAnimationFrame(handle);
    };
    return VisualUtil;
}());
exports.VisualUtil = VisualUtil;



},{}],97:[function(require,module,exports){
/**
 * Created by MIC on 2016/6/11.
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./EngineBase"));
__export(require("./ErrorBase"));
__export(require("./GLUtil"));
__export(require("./MathUtil"));
__export(require("./VisualUtil"));
__export(require("./BitConverter"));



},{"./BitConverter":90,"./EngineBase":91,"./ErrorBase":92,"./GLUtil":94,"./MathUtil":95,"./VisualUtil":96}],98:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
"use strict";
var flash = require("./flash/index");
exports.flash = flash;
var webgl = require("./webgl/index");
exports.webgl = webgl;
var fl = require("./fl/index");
exports.fl = fl;
var mx = require("./mx/index");
exports.mx = mx;
var glantern = require("./glantern/index");
exports.glantern = glantern;
var EngineBase_1 = require("./glantern/EngineBase");
exports.EngineBase = EngineBase_1.EngineBase;
var GLUtil_1 = require("./glantern/GLUtil");
function injectToGlobal($this) {
    $this["flash"] = flash;
    $this["webgl"] = webgl;
    $this["fl"] = fl;
    $this["mx"] = mx;
}
exports.injectToGlobal = injectToGlobal;
function isSupported() {
    return GLUtil_1.GLUtil.checkSupportStatus().ok;
}
exports.isSupported = isSupported;



},{"./fl/index":1,"./flash/index":71,"./glantern/EngineBase":91,"./glantern/GLUtil":94,"./glantern/index":97,"./mx/index":101,"./webgl/index":131}],99:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DisplayObjectContainer_1 = require("../../flash/display/DisplayObjectContainer");
var NotImplementedError_1 = require("../../flash/errors/NotImplementedError");
var Canvas = (function (_super) {
    __extends(Canvas, _super);
    function Canvas(root, parent) {
        _super.call(this, root, parent);
    }
    Canvas.prototype._$update = function (timeInfo) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Canvas.prototype._$render = function (renderer) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    return Canvas;
}(DisplayObjectContainer_1.DisplayObjectContainer));
exports.Canvas = Canvas;



},{"../../flash/display/DisplayObjectContainer":27,"../../flash/errors/NotImplementedError":51}],100:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./Canvas"));



},{"./Canvas":99}],101:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
"use strict";
var containers = require("./containers/index");
exports.containers = containers;



},{"./containers/index":100}],102:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var AttributeCache = (function () {
    function AttributeCache() {
        this.name = null;
        this.value = undefined;
        this.location = -1;
    }
    return AttributeCache;
}());
exports.AttributeCache = AttributeCache;



},{}],103:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var FilterBase = (function () {
    function FilterBase(manager) {
        this._filterManager = null;
        this._flipY = false;
        this._flipX = false;
        this._referenceCount = 0;
        this._filterManager = manager;
    }
    /**
     * Called when it is added to a {@link DisplayObject.filters} array.
     * Notice that it may be called multiple times, but a filter should only be initialized once
     * if its output buffer is null.
     */
    FilterBase.prototype.notifyAdded = function () {
        if (this._referenceCount <= 0) {
            this._$initialize();
        }
        this._referenceCount++;
    };
    /**
     * Called when it is removed from a {@link DisplayObject.filters} array.
     * Notice that it may be called multiple times, but should do nothing if its output is already null.
     */
    FilterBase.prototype.notifyRemoved = function () {
        this._referenceCount--;
        if (this._referenceCount <= 0) {
            this._$dispose();
        }
    };
    FilterBase.prototype.dispose = function () {
        this._$dispose();
    };
    FilterBase.prototype.initialize = function () {
        this._$initialize();
    };
    Object.defineProperty(FilterBase.prototype, "filterManager", {
        get: function () {
            return this._filterManager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterBase.prototype, "flipX", {
        get: function () {
            return this._flipX;
        },
        set: function (v) {
            this._flipX = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterBase.prototype, "flipY", {
        get: function () {
            return this._flipY;
        },
        set: function (v) {
            this._flipY = v;
        },
        enumerable: true,
        configurable: true
    });
    FilterBase.prototype._$initialize = function () {
    };
    FilterBase.prototype._$dispose = function () {
    };
    return FilterBase;
}());
exports.FilterBase = FilterBase;



},{}],104:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/17.
 */
"use strict";
var RenderHelper_1 = require("./RenderHelper");
var FilterManager = (function () {
    function FilterManager(renderer) {
        this._tempTarget = null;
        this._renderer = null;
        this._filterGroups = null;
        this._renderer = renderer;
        this._filterGroups = [];
        this._tempTarget = renderer.createRenderTarget();
    }
    FilterManager.prototype.dispose = function () {
        this._renderer.releaseRenderTarget(this._tempTarget);
        this.clearFilterGroups();
        this._tempTarget = null;
        this._filterGroups = null;
        this._renderer = null;
    };
    FilterManager.prototype.clearFilterGroups = function () {
        var filterGroup;
        var filterGroups = this._filterGroups;
        if (filterGroups.length > 0) {
            for (var i = 0; i < filterGroups.length; ++i) {
                filterGroup = filterGroups[i];
                while (filterGroup.length > 0) {
                    filterGroup.pop();
                }
            }
        }
        while (filterGroups.length > 0) {
            filterGroups.pop();
        }
    };
    FilterManager.prototype.pushFilterGroup = function (group) {
        this._filterGroups.push(group.slice());
    };
    FilterManager.prototype.popFilterGroup = function () {
        return this.hasFilterGroups ? this._filterGroups.pop() : null;
    };
    Object.defineProperty(FilterManager.prototype, "hasFilterGroups", {
        get: function () {
            return this._filterGroups.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterManager.prototype, "renderer", {
        get: function () {
            return this._renderer;
        },
        enumerable: true,
        configurable: true
    });
    FilterManager.prototype.processFilters = function (renderer, input, output, clearOutput) {
        if (input === output) {
            console.warn("Filter alert: input and output are the same, processing aborted.");
            return;
        }
        if (this.hasFilterGroups) {
            var filterGroup = this._filterGroups[this._filterGroups.length - 1];
            var filter;
            var t1 = input, t2 = this._tempTarget;
            t2.clear();
            var t;
            for (var i = 0; i < filterGroup.length; i++) {
                filter = filterGroup[i];
                if (filter !== null) {
                    filter.process(renderer, t1, t2, true);
                    t = t1;
                    t1 = t2;
                    t2 = t;
                }
            }
            // Y-axis should be flipped from element to screen, due to the difference between OpenGL coordinate
            // system and Flash coordinate system.
            RenderHelper_1.RenderHelper.copyTargetContent(renderer, t1, output, false, true, clearOutput);
        }
    };
    return FilterManager;
}());
exports.FilterManager = FilterManager;



},{"./RenderHelper":107}],105:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var Values = Object.create(null);
var FragmentShaders = (function () {
    function FragmentShaders() {
    }
    Object.defineProperty(FragmentShaders, "buffered", {
        get: function () {
            return Values.buffered;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FragmentShaders, "blur", {
        get: function () {
            return Values.blur;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FragmentShaders, "primitive", {
        get: function () {
            return Values.primitive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FragmentShaders, "colorTransform", {
        get: function () {
            return Values.colorTransform;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FragmentShaders, "fxaa", {
        get: function () {
            return Values.fxaa;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FragmentShaders, "blur2", {
        get: function () {
            return Values.blur2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FragmentShaders, "copyImage", {
        get: function () {
            return Values.copyImage;
        },
        enumerable: true,
        configurable: true
    });
    return FragmentShaders;
}());
exports.FragmentShaders = FragmentShaders;
Values.buffered = "\n    precision mediump float;\n\n    uniform sampler2D uSampler;\n\n    varying vec2 vTextureCoord;\n\n    void main() {\n        gl_FragColor = texture2D(uSampler, vTextureCoord);\n    }\n";
Values.blur = "\n    precision lowp float;\n\n    varying vec2 vTextureCoord;\n    varying vec2 vBlurTexCoords[6];\n\n    uniform sampler2D uSampler;\n\n    void main()\n    {\n       gl_FragColor = vec4(0.0);\n\n       gl_FragColor += texture2D(uSampler, vBlurTexCoords[0]) * 0.004431848411938341;\n       gl_FragColor += texture2D(uSampler, vBlurTexCoords[1]) * 0.05399096651318985;\n       gl_FragColor += texture2D(uSampler, vBlurTexCoords[2]) * 0.2419707245191454;\n       gl_FragColor += texture2D(uSampler, vTextureCoord    ) * 0.3989422804014327;\n       gl_FragColor += texture2D(uSampler, vBlurTexCoords[3]) * 0.2419707245191454;\n       gl_FragColor += texture2D(uSampler, vBlurTexCoords[4]) * 0.05399096651318985;\n       gl_FragColor += texture2D(uSampler, vBlurTexCoords[5]) * 0.004431848411938341;\n    }\n";
Values.primitive = [
    "precision mediump float;",
    "",
    "uniform float uAlpha;",
    "",
    "varying vec4 vVertexColor;",
    "",
    "void main() {",
    "   gl_FragColor = vVertexColor * uAlpha;",
    "}"
].join("\n");
Values.colorTransform = "\n    precision mediump float;\n\n    varying vec2 vTextureCoord;\n    uniform sampler2D uSampler;\n    uniform float uColorMatrix[25];\n\n    void main(void)\n    {\n       vec4 c = texture2D(uSampler, vTextureCoord);\n\n       gl_FragColor.r =  (uColorMatrix[0] * c.r);\n       gl_FragColor.r += (uColorMatrix[1] * c.g);\n       gl_FragColor.r += (uColorMatrix[2] * c.b);\n       gl_FragColor.r += (uColorMatrix[3] * c.a);\n       gl_FragColor.r +=  uColorMatrix[4];\n\n       gl_FragColor.g =  (uColorMatrix[5] * c.r);\n       gl_FragColor.g += (uColorMatrix[6] * c.g);\n       gl_FragColor.g += (uColorMatrix[7] * c.b);\n       gl_FragColor.g += (uColorMatrix[8] * c.a);\n       gl_FragColor.g +=  uColorMatrix[9];\n\n       gl_FragColor.b =  (uColorMatrix[10] * c.r);\n       gl_FragColor.b += (uColorMatrix[11] * c.g);\n       gl_FragColor.b += (uColorMatrix[12] * c.b);\n       gl_FragColor.b += (uColorMatrix[13] * c.a);\n       gl_FragColor.b +=  uColorMatrix[14];\n\n       gl_FragColor.a =  (uColorMatrix[15] * c.r);\n       gl_FragColor.a += (uColorMatrix[16] * c.g);\n       gl_FragColor.a += (uColorMatrix[17] * c.b);\n       gl_FragColor.a += (uColorMatrix[18] * c.a);\n       gl_FragColor.a +=  uColorMatrix[19];\n    }\n";
// For the full license, please refer to shaders/glsl/fxaa.frag
Values.fxaa = "\n    precision lowp float;\n\n    #ifndef FXAA_REDUCE_MIN\n    #define FXAA_REDUCE_MIN   (1.0/ 128.0)\n    #endif\n    #ifndef FXAA_REDUCE_MUL\n    #define FXAA_REDUCE_MUL   (1.0 / 8.0)\n    #endif\n    #ifndef FXAA_SPAN_MAX\n    #define FXAA_SPAN_MAX     8.0\n    #endif\n\n    vec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 resolution,\n    vec2 v_rgbNW, vec2 v_rgbNE,\n    vec2 v_rgbSW, vec2 v_rgbSE,\n    vec2 v_rgbM) {\n    vec4 color;\n    mediump vec2 inverseVP = vec2(1.0 / resolution.x, 1.0 / resolution.y);\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n\n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n\n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n        (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n\n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n            max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n                dir * rcpDirMin)) * inverseVP;\n\n    vec3 rgbA = 0.5 * (\n        texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n        texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n        texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n        texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n\n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n    }\n\n    varying vec2 vTextureCoord;\n    varying vec2 vResolution;\n\n    varying vec2 v_rgbNW;\n    varying vec2 v_rgbNE;\n    varying vec2 v_rgbSW;\n    varying vec2 v_rgbSE;\n    varying vec2 v_rgbM;\n\n    uniform sampler2D uSampler;\n\n    void main() {\n        gl_FragColor = fxaa(uSampler, vTextureCoord * vResolution, vResolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n    }\n";
Values.blur2 = "\n    precision lowp float;\n\n    uniform sampler2D uSampler;\n    \n    uniform float uResolution;\n    uniform float uStrength;\n    uniform vec2 uBlurDirection;\n\n    varying vec2 vTextureCoord;\n\n    float offset[3];\n    float weight[3];\n\n    void main()\n    {\n        offset[0] = 0.0; offset[1] = 1.3846153846; offset[2] = 3.2307692308;\n        weight[0] = 0.2270270270; weight[1] = 0.3162162162; weight[2] = 0.0702702703;\n        gl_FragColor = texture2D(uSampler, vec2(vTextureCoord)) * weight[0];\n        float xDir = uBlurDirection.x / sqrt(uBlurDirection.x * uBlurDirection.x + uBlurDirection.y * uBlurDirection.y);\n        float yDir = uBlurDirection.y / sqrt(uBlurDirection.x * uBlurDirection.x + uBlurDirection.y * uBlurDirection.y);\n        for (int i = 1; i < 3; i++)\n        {\n            gl_FragColor += texture2D(uSampler, (vec2(vTextureCoord) + vec2(offset[i] * xDir, offset[i] * yDir) * uStrength / uResolution)) * weight[i];\n            gl_FragColor += texture2D(uSampler, (vec2(vTextureCoord) - vec2(offset[i] * xDir, offset[i] * yDir) * uStrength / uResolution)) * weight[i];\n        }\n    }\n";
Values.copyImage = "\n    precision mediump float;\n\n    uniform sampler2D uSampler;\n    uniform float uAlpha;\n\n    varying vec2 vTextureCoord;\n\n    void main() {\n        gl_FragColor = texture2D(uSampler, vTextureCoord) * uAlpha;\n    }\n";



},{}],106:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var GLUtil_1 = require("../glantern/GLUtil");
var gl = window.WebGLRenderingContext;
var PackedArrayBuffer = (function () {
    function PackedArrayBuffer() {
        this._glc = null;
        this._isDirty = true;
        this._bufferType = 0;
        this._elementGLType = 0;
        this._webglBuffer = null;
        this._array = null;
        this._arrayType = null;
        this._typedArray = null;
    }
    PackedArrayBuffer.create = function (context, data, elementGLType, bufferType) {
        var T = PackedArrayBuffer.getTypedArrayType(elementGLType);
        if (T === null) {
            console.warn("Failed to create typed array whose elements are of WebGL type 0x" + elementGLType.toString(16));
            return null;
        }
        var wab = new PackedArrayBuffer();
        wab._glc = context;
        wab._elementGLType = elementGLType;
        wab._webglBuffer = context.createBuffer();
        if (wab._webglBuffer == null) {
            console.warn("Failed to create WebGL buffer.");
            return null;
        }
        wab._arrayType = T;
        wab._bufferType = bufferType;
        wab.setNewData(data);
        wab.becomeDirty();
        wab.syncBufferData();
        return wab;
    };
    Object.defineProperty(PackedArrayBuffer.prototype, "webglBuffer", {
        get: function () {
            return this._webglBuffer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PackedArrayBuffer.prototype, "elementSize", {
        get: function () {
            return this._typedArray.BYTES_PER_ELEMENT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PackedArrayBuffer.prototype, "elementCount", {
        get: function () {
            return this._typedArray.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PackedArrayBuffer.prototype, "elementGLType", {
        get: function () {
            return this._elementGLType;
        },
        enumerable: true,
        configurable: true
    });
    PackedArrayBuffer.prototype.setNewData = function (data) {
        this._array = GLUtil_1.GLUtil.ptr(data) ? data.slice() : [];
    };
    PackedArrayBuffer.prototype.becomeDirty = function () {
        this._isDirty = true;
    };
    PackedArrayBuffer.prototype.syncBufferData = function () {
        if (this._isDirty) {
            var T = this._arrayType;
            this._typedArray = new T(this._array);
            this._isDirty = false;
        }
        this._glc.bindBuffer(this._bufferType, this._webglBuffer);
        // DANGER! In complex scenes, bufferData() transfers large amount of data.
        // Improper optimization does harm on performance.
        this._glc.bufferData(this._bufferType, this._typedArray, gl.DYNAMIC_DRAW);
    };
    PackedArrayBuffer.prototype.dispose = function () {
        this._glc.deleteBuffer(this._webglBuffer);
        this._array = null;
        this._typedArray = null;
        this._webglBuffer = null;
        this._glc = null;
    };
    PackedArrayBuffer.getTypedArrayType = function (glType) {
        switch (glType) {
            case gl.FLOAT:
                return Float32Array;
            case gl.UNSIGNED_SHORT:
                return Uint16Array;
            case gl.UNSIGNED_INT:
                return Uint32Array;
            case gl.UNSIGNED_BYTE:
                return Uint8Array;
            case gl.INT:
                return Int32Array;
            case gl.SHORT:
                return Int16Array;
            case gl.BYTE:
                return Int8Array;
            default:
                return null;
        }
    };
    return PackedArrayBuffer;
}());
exports.PackedArrayBuffer = PackedArrayBuffer;



},{"../glantern/GLUtil":94}],107:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var RenderTarget2D_1 = require("./RenderTarget2D");
var PackedArrayBuffer_1 = require("./PackedArrayBuffer");
var ShaderID_1 = require("./ShaderID");
var GLUtil_1 = require("../glantern/GLUtil");
var gl = window.WebGLRenderingContext;
var RenderHelper = (function () {
    function RenderHelper() {
    }
    RenderHelper.renderPrimitives = function (renderer, renderTo, vertices, colors, indices, clearOutput) {
        renderer.shaderManager.selectShader(ShaderID_1.ShaderID.PRIMITIVE);
        var shader = renderer.shaderManager.currentShader;
        var glc = renderer.context;
        var attributeLocation;
        renderTo.activate();
        shader.syncUniforms();
        vertices.syncBufferData();
        attributeLocation = shader.getAttributeLocation("aVertexPosition");
        glc.vertexAttribPointer(attributeLocation, 3, vertices.elementGLType, false, vertices.elementSize * 3, 0);
        glc.enableVertexAttribArray(attributeLocation);
        colors.syncBufferData();
        attributeLocation = shader.getAttributeLocation("aVertexColor");
        glc.vertexAttribPointer(attributeLocation, 4, colors.elementGLType, false, colors.elementSize * 4, 0);
        glc.enableVertexAttribArray(attributeLocation);
        indices.syncBufferData();
        if (clearOutput) {
            renderTo.clear();
        }
        glc.viewport(0, 0, renderTo.originalWidth, renderTo.originalHeight);
        glc.drawElements(gl.TRIANGLES, indices.elementCount, indices.elementGLType, 0);
    };
    RenderHelper.renderPrimitives2 = function (renderer, renderTo, vertices, colors, indices, flipX, flipY, clearOutput) {
        renderer.shaderManager.selectShader(ShaderID_1.ShaderID.PRIMITIVE2);
        var shader = renderer.shaderManager.currentShader;
        var glc = renderer.context;
        var attributeLocation;
        renderTo.activate();
        shader.setOriginalSize([renderTo.originalWidth, renderTo.originalHeight]);
        shader.setFlipX(flipX);
        shader.setFlipY(flipY);
        shader.syncUniforms();
        vertices.syncBufferData();
        attributeLocation = shader.getAttributeLocation("aVertexPosition");
        glc.vertexAttribPointer(attributeLocation, 3, vertices.elementGLType, false, vertices.elementSize * 3, 0);
        glc.enableVertexAttribArray(attributeLocation);
        colors.syncBufferData();
        attributeLocation = shader.getAttributeLocation("aVertexColor");
        glc.vertexAttribPointer(attributeLocation, 4, colors.elementGLType, false, colors.elementSize * 4, 0);
        glc.enableVertexAttribArray(attributeLocation);
        indices.syncBufferData();
        if (clearOutput) {
            renderTo.clear();
        }
        glc.viewport(0, 0, renderTo.originalWidth, renderTo.originalHeight);
        glc.drawElements(gl.TRIANGLES, indices.elementCount, indices.elementGLType, 0);
    };
    RenderHelper.copyTargetContent = function (renderer, source, destination, flipX, flipY, clearOutput) {
        RenderHelper.renderBuffered(renderer, source, destination, ShaderID_1.ShaderID.REPLICATE, clearOutput, function (r) {
            var shader = r.shaderManager.currentShader;
            shader.setFlipX(flipX);
            shader.setFlipY(flipY);
            if (flipX || flipY) {
                shader.setOriginalSize([destination.originalWidth, destination.originalHeight]);
                shader.setFitSize([destination.fitWidth, destination.fitHeight]);
            }
        });
    };
    RenderHelper.copyImageContent = function (renderer, source, destination, flipX, flipY, transform, alpha, clearOutput) {
        RenderHelper.renderBuffered(renderer, source, destination, ShaderID_1.ShaderID.COPY_IMAGE, clearOutput, function (r) {
            var shader = r.shaderManager.currentShader;
            shader.setFlipX(flipX);
            shader.setFlipY(flipY);
            shader.setAlpha(alpha);
            shader.setTransform(transform);
            if (flipX || flipY) {
                shader.setOriginalSize([destination.originalWidth, destination.originalHeight]);
                shader.setFitSize([destination.fitWidth, destination.fitHeight]);
            }
        });
    };
    RenderHelper.renderImage = function (renderer, source, destination, clearOutput) {
        RenderHelper.renderBuffered(renderer, source, destination, ShaderID_1.ShaderID.COPY_IMAGE, clearOutput, function (r) {
            var shader = r.shaderManager.currentShader;
            shader.setFlipX(false);
            shader.setFlipY(false);
        });
    };
    RenderHelper.renderBuffered = function (renderer, source, destination, shaderID, clearOutput, shaderInit) {
        if (!checkRenderTargets(source, destination)) {
            return;
        }
        var glc = renderer.context;
        renderer.shaderManager.selectShader(shaderID);
        shaderInit(renderer);
        var shader = renderer.shaderManager.currentShader;
        // Target must have a 'uSampler' sample2D uniform
        shader.setTexture(source.texture);
        shader.syncUniforms();
        if (RenderHelper._glVertexPositionBuffer === null) {
            var vertexPositions = [
                0, source.fitHeight, 0,
                source.fitWidth, source.fitHeight, 0,
                0, 0, 0,
                source.fitWidth, 0, 0
            ];
            RenderHelper._glVertexPositionBuffer = PackedArrayBuffer_1.PackedArrayBuffer.create(glc, vertexPositions, gl.FLOAT, gl.ARRAY_BUFFER);
        }
        var attributeLocation;
        attributeLocation = shader.getAttributeLocation("aVertexPosition");
        if (attributeLocation >= 0) {
            var glVertexPositionBuffer = RenderHelper._glVertexPositionBuffer;
            glVertexPositionBuffer.syncBufferData();
            glc.vertexAttribPointer(attributeLocation, 3, glVertexPositionBuffer.elementGLType, false, glVertexPositionBuffer.elementSize * 3, 0);
            glc.enableVertexAttribArray(attributeLocation);
        }
        // Some shaders, e.g. the blur-2 shader, have no texture coordinates.
        attributeLocation = shader.getAttributeLocation("aTextureCoord");
        if (attributeLocation >= 0) {
            var textureCoords = RenderTarget2D_1.RenderTarget2D.textureCoords;
            textureCoords.syncBufferData();
            glc.vertexAttribPointer(attributeLocation, 2, textureCoords.elementGLType, false, textureCoords.elementSize * 2, 0);
            glc.enableVertexAttribArray(attributeLocation);
        }
        var textureIndices = RenderTarget2D_1.RenderTarget2D.textureIndices;
        textureIndices.syncBufferData();
        destination.activate();
        if (clearOutput) {
            destination.clear();
        }
        glc.viewport(0, 0, destination.originalWidth, destination.originalHeight);
        glc.enable(gl.SCISSOR_TEST);
        glc.scissor(0, 0, source.originalWidth, source.originalHeight);
        glc.drawElements(gl.TRIANGLES, textureIndices.elementCount, textureIndices.elementGLType, 0);
        glc.disable(gl.SCISSOR_TEST);
    };
    // Be careful! Manually dispose it when the whole module is finalizing.
    RenderHelper._glVertexPositionBuffer = null;
    return RenderHelper;
}());
exports.RenderHelper = RenderHelper;
function checkRenderTargets(source, destination) {
    if (!GLUtil_1.GLUtil.ptr(source)) {
        console.warn("Cannot render a null RenderTarget2D onto another RenderTarget2D.");
        return false;
    }
    if (source.texture === null) {
        console.warn("Cannot use a RenderTarget2D without texture-based frame buffer to render onto another RenderTarget2D.");
        return false;
    }
    if (source.isRoot) {
        console.warn("Cannot use a root RenderTarget2D as source.");
        return false;
    }
    if (source === destination) {
        console.warn("Source and destination must not be the same RenderTarget2D.");
        return false;
    }
    return true;
}



},{"../glantern/GLUtil":94,"./PackedArrayBuffer":106,"./RenderTarget2D":108,"./ShaderID":110}],108:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/17.
 */
"use strict";
var PackedArrayBuffer_1 = require("./PackedArrayBuffer");
var MathUtil_1 = require("../glantern/MathUtil");
var gl = window.WebGLRenderingContext;
var isInitializedStatically = false;
/**
 * Represents a 2D render target based on WebGL texture.
 */
var RenderTarget2D = (function () {
    /**
     * Instantiates a new {@link RenderTarget2D}.
     * @param renderer {WebGLRenderer} The {@link WebGLRenderer} used to create this new {@link RenderTarget2D}.
     * @param [image] {ImageData|HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} The initial image or image-related
     * HTML element. See {@link RenderTarget2D.image} for more information. The default value is null.
     * @param [isRoot] {Boolean} Declares whether the {@link RenderTarget2D} is a root for display. See {@link RenderTarget2D.isRoot}
     * for more information. The default value is false.
     * @implements {IDisposable}
     */
    function RenderTarget2D(renderer, image, isRoot) {
        if (image === void 0) { image = null; }
        if (isRoot === void 0) { isRoot = false; }
        this._glc = null;
        this._renderer = null;
        this._frameBuffer = null;
        this._depthBuffer = null;
        this._texture = null;
        this._originalWidth = 0;
        this._originalHeight = 0;
        this._fitWidth = 0;
        this._fitHeight = 0;
        this._image = null;
        this._isRoot = false;
        if (!isInitializedStatically) {
            initStaticFields(renderer.context);
        }
        this._renderer = renderer;
        this.__initialize(renderer.context, renderer.view.width, renderer.view.height, image, isRoot);
    }
    /**
     * Disposes the {@link RenderTarget2D} and related resources.
     */
    RenderTarget2D.prototype.dispose = function () {
        var glc = this._glc;
        glc.deleteTexture(this._texture);
        glc.deleteFramebuffer(this._frameBuffer);
        glc.deleteRenderbuffer(this._depthBuffer);
        this._texture = null;
        this._frameBuffer = null;
        this._depthBuffer = null;
        this._glc = null;
        this._renderer = null;
    };
    Object.defineProperty(RenderTarget2D.prototype, "originalWidth", {
        /**
         * Returns the original width of the {@link RenderTarget2D}.
         * Old WebGL contexts restrict the width and height of textures to being a power of 2. However, users may want to
         * create custom-sized {@link RenderTarget2D}s, which requires the targets using various sizes of "textures".
         * Creating textures width and height different from power of 2 is not allowed in these cases, so textures slightly
         * larger than needed with width and height being power of 2 is created.
         * Therefore, the original size is the size requested, and the fit size is the real size of texture. During rendering,
         * the original size is used for presenting, and the fit size is used for manipulation.
         * @see {@link RenderTarget2D.originalHeight}
         * @see {@link RenderTarget2D.fitWidth}
         * @see {@link RenderTarget2D.fitHeight}
         * @returns {Number} The original width of the {@link RenderTarget2D}.
         */
        get: function () {
            return this._originalWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderTarget2D.prototype, "originalHeight", {
        /**
         * Returns the original height of the {@link RenderTarget2D}. See {@link RenderTarget2D.originalWidth} for more information.
         * @see {@link RenderTarget2D.originalWidth}
         * @see {@link RenderTarget2D.fitWidth}
         * @see {@link RenderTarget2D.fitHeight}
         * @returns {number}
         */
        get: function () {
            return this._originalHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderTarget2D.prototype, "fitWidth", {
        /**
         * Returns the fit width of the {@link RenderTarget2D}. See {@link RenderTarget2D.originalWidth} for more information.
         * @see {@link RenderTarget2D.originalWidth}
         * @see {@link RenderTarget2D.originalHeight}
         * @see {@link RenderTarget2D.fitHeight}
         * @returns {Number} The fit width of the {@link RenderTarget2D}.
         */
        get: function () {
            return this._fitWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderTarget2D.prototype, "fitHeight", {
        /**
         * Returns the fit height of the {@link RenderTarget2D}. See {@link RenderTarget2D.originalWidth} for more information.
         * @see {@link RenderTarget2D.originalWidth}
         * @see {@link RenderTarget2D.originalHeight}
         * @see {@link RenderTarget2D.fitHeight}
         * @returns {number}
         */
        get: function () {
            return this._fitHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderTarget2D.prototype, "texture", {
        /**
         * Returns the underlying {@link WebGLTexture} of the {@link RenderTarget2D}. May be null if the target is a root target.
         * @returns {WebGLTexture} The underlying texture.
         */
        get: function () {
            return this._texture;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderTarget2D.prototype, "image", {
        /**
         * The content used to create the {@link RenderTarget2D}. It is useful for importing external images, or dynamically
         * rendering image sequences from {@link HTMLVideoElement}s. Null means this is a blank {@link RenderTarget2D}.
         * @returns {ImageData|HTMLCanvasElement|HTMLImageElement|HTMLVideoElement}
         */
        get: function () {
            return this._image;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderTarget2D.prototype, "isRoot", {
        /**
         * Returns whether the {@link RenderTarget2D} is a root for display. A root {@link RenderTarget2D}
         * has no underlying textures and renders directly to the output buffer (i.e. the &lt;canvas&gt; attached to the
         * {@link WebGLRenderer}. So they must be used as final render target, not buffers.
         * @returns {Boolean} True if the {@link RenderTarget2D} is a root target, and false otherwise.
         */
        get: function () {
            return this._isRoot;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Activates the {@link RenderTarget2D}, and all the rendering after the activation will be done on this target.
     */
    RenderTarget2D.prototype.activate = function () {
        var glc = this._glc;
        glc.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);
    };
    /**
     * Clears the content on the {@link RenderTarget2D}.
     */
    RenderTarget2D.prototype.clear = function () {
        this.activate();
        var glc = this._glc;
        glc.viewport(0, 0, this._fitWidth, this._fitHeight);
        glc.clearColor(0, 0, 0, 0);
        glc.clearDepth(0);
        glc.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    };
    /**
     * Resizes the {@link RenderTarget2D}. Note that currently this function is only a wrapper for the internal one, and
     * public calls are experimental.
     * @param newWidth {Number} The new width, in pixels.
     * @param newHeight {Number} The new height, in pixels.
     */
    RenderTarget2D.prototype.resize = function (newWidth, newHeight) {
        this.__resize(newWidth, newHeight, true);
    };
    /**
     * Update the content of this {@link RenderTarget2D} if the source is a {@link HTMLCanvasElement},
     * {@link HTMLImageElement}, {@link HTMLVideoElement}, or {@link ImageData}. This operation will retrieve
     * current image (a snapshot if it is a dynamic canvas or image sequence) and draw it on this
     * {@link RenderTarget2D}.
     */
    RenderTarget2D.prototype.updateImageContent = function () {
        var image = this._image;
        if (this._texture === null || image === null) {
            return;
        }
        var glc = this._glc;
        glc.bindTexture(gl.TEXTURE_2D, this._texture);
        glc.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        glc.bindTexture(gl.TEXTURE_2D, null);
    };
    /**
     * Update image size to fit the whole scene.
     */
    RenderTarget2D.prototype.updateImageSize = function () {
        var image = this._image;
        if (this._texture === null || image === null) {
            return;
        }
        // TODO: Maybe this operation should not be done on each update call.
        // Find a way to optimize, for example, freeze the size when created, or implement a draw call
        // flexible enough to handle all sort of sizes.
        try {
            image.width = MathUtil_1.MathUtil.power2Roundup(image.width);
            image.height = MathUtil_1.MathUtil.power2Roundup(image.height);
        }
        catch (ex) {
        }
        this._originalWidth = this._fitWidth = image.width;
        this._originalHeight = this._fitHeight = image.height;
    };
    /**
     * Initializes the {@link RenderTarget2D}.
     * @param glc {WebGLRenderingContext} The {@link WebGLRenderingContext} used to manipulate the {@link RenderTarget2D}.
     * @param width {Number} The new width, in pixels.
     * @param height {Number} The new height, in pixels.
     * @param image {ImageData|HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} See {@link RenderTarget2D.constructor}
     * for more information.
     * @param isRoot {Boolean} See {@link RenderTarget2D.isRoot} for more information.
     * @private
     */
    RenderTarget2D.prototype.__initialize = function (glc, width, height, image, isRoot) {
        this._glc = glc;
        this._isRoot = isRoot;
        this._image = image;
        function error(message) {
            glc.deleteFramebuffer(this._frameBuffer);
            glc.deleteRenderbuffer(this._depthBuffer);
            glc.deleteTexture(this._texture);
            console.warn(message);
        }
        if (!isRoot) {
            this._frameBuffer = glc.createFramebuffer();
            if (this._frameBuffer === null) {
                return error("Failed to create the frame buffer.");
            }
            this._depthBuffer = glc.createRenderbuffer();
            if (this._depthBuffer === null) {
                return error("Failed to create the depth buffer.");
            }
            this._texture = glc.createTexture();
            if (this._texture === null) {
                return error("Failed to create the underlying texture.");
            }
        }
        this.__resize(width, height, false);
        if (!isRoot) {
            glc.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);
            glc.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._texture, 0);
            glc.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this._depthBuffer);
            var status = glc.checkFramebufferStatus(gl.FRAMEBUFFER);
            if (status !== gl.FRAMEBUFFER_COMPLETE) {
                return error("Frame buffer is not complete: code 0x" + status.toString(16));
            }
        }
        glc.bindRenderbuffer(gl.RENDERBUFFER, null);
        glc.bindTexture(gl.TEXTURE_2D, null);
        glc.bindFramebuffer(gl.FRAMEBUFFER, null);
    };
    /**
     * Resizes the {@link RenderTarget2D}.
     * @param newWidth {Number} The new width, in pixels.
     * @param newHeight {Number} The new height, in pixels.
     * @param unbind {Boolean} Whether should unbind the texture after resizing or not. Unbinding is not required during
     * initialization, but should be done during custom resizing.
     * @private
     */
    RenderTarget2D.prototype.__resize = function (newWidth, newHeight, unbind) {
        var glc = this._glc;
        var image = this._image;
        var isRoot = this._isRoot;
        var texture = this._texture;
        if (image === null) {
            newWidth |= 0;
            newHeight |= 0;
            this._originalWidth = newWidth;
            this._originalHeight = newHeight;
            if (!MathUtil_1.MathUtil.isPowerOfTwo(newWidth)) {
                newWidth = MathUtil_1.MathUtil.power2Roundup(newWidth);
            }
            if (!MathUtil_1.MathUtil.isPowerOfTwo(newHeight)) {
                newHeight = MathUtil_1.MathUtil.power2Roundup(newHeight);
            }
            this._fitWidth = newWidth;
            this._fitHeight = newHeight;
        }
        else {
            // TODO: WARNING: Not tested, may also need to round-up to power of 2.
            newWidth = this._originalWidth = this._fitWidth = image.width;
            newHeight = this._originalHeight = this._fitHeight = image.height;
        }
        if (texture !== null) {
            glc.bindTexture(gl.TEXTURE_2D, this._texture);
            glc.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            glc.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            glc.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            glc.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        }
        if (image !== null) {
            // We flip the whole image vertically during the last stage, drawing to the screen.
            // So there is no need to flip the images here - all the contents in child RenderTarget2Ds
            // are vertically mirrored, and they will be transformed in one at last.
            //glc.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
            if (texture !== null) {
                glc.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            }
        }
        else {
            glc.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
            if (texture !== null) {
                glc.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, newWidth, newHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            }
        }
        if (!isRoot) {
            glc.bindRenderbuffer(gl.RENDERBUFFER, this._depthBuffer);
            glc.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, newWidth, newHeight);
        }
        if (unbind) {
            glc.bindRenderbuffer(gl.RENDERBUFFER, null);
            glc.bindTexture(gl.TEXTURE_2D, null);
        }
    };
    RenderTarget2D.textureCoords = null;
    RenderTarget2D.textureIndices = null;
    return RenderTarget2D;
}());
exports.RenderTarget2D = RenderTarget2D;
function initStaticFields(glc) {
    if (isInitializedStatically) {
        return;
    }
    var textureCoords = [
        0, 1,
        1, 1,
        0, 0,
        1, 0
    ];
    var textureIndices = [
        0, 1, 2,
        1, 2, 3
    ];
    RenderTarget2D.textureCoords = PackedArrayBuffer_1.PackedArrayBuffer.create(glc, textureCoords, gl.FLOAT, gl.ARRAY_BUFFER);
    RenderTarget2D.textureIndices = PackedArrayBuffer_1.PackedArrayBuffer.create(glc, textureIndices, gl.UNSIGNED_SHORT, gl.ELEMENT_ARRAY_BUFFER);
    isInitializedStatically = true;
}



},{"../glantern/MathUtil":95,"./PackedArrayBuffer":106}],109:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var VertexShaders_1 = require("./VertexShaders");
var FragmentShaders_1 = require("./FragmentShaders");
var WebGLDataType_1 = require("./WebGLDataType");
var GLUtil_1 = require("../glantern/GLUtil");
var gl = window.WebGLRenderingContext;
var ShaderBase = (function () {
    function ShaderBase(manager, vertexSource, fragmentSource, uniforms, attributes) {
        this._shaderManager = null;
        this._vertexSource = null;
        this._fragmentSource = null;
        this._vertexShader = null;
        this._fragmentShader = null;
        this._program = null;
        this._uniforms = null;
        this._attributes = null;
        this._id = -1;
        this._glc = null;
        this._shaderManager = manager;
        this._vertexSource = vertexSource;
        this._fragmentSource = fragmentSource;
        this._id = manager.getNextAvailableID();
        this.__initialize(manager.context, vertexSource, fragmentSource);
        this.select();
        if (GLUtil_1.GLUtil.ptr(uniforms) && GLUtil_1.GLUtil.ptr(attributes)) {
            this._uniforms = uniforms;
            this._attributes = attributes;
        }
        else {
            this._uniforms = new Map();
            this._attributes = new Map();
            this._$localInit(manager, this._uniforms, this._attributes);
        }
        this.__cacheUniformLocations();
        this.__cacheAttributeLocations();
        this.syncUniforms();
    }
    Object.defineProperty(ShaderBase.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    ShaderBase.prototype.dispose = function () {
        var glc = this._glc;
        glc.deleteProgram(this._program);
        glc.deleteShader(this._vertexShader);
        glc.deleteShader(this._fragmentShader);
        this._glc = null;
        this._uniforms = null;
        this._attributes = null;
        this._vertexShader = null;
        this._fragmentShader = null;
        this._vertexSource = null;
        this._fragmentSource = null;
        this._shaderManager = null;
    };
    ShaderBase.prototype.syncUniforms = function () {
        var _this = this;
        this._uniforms.forEach(function (v) {
            _this.__syncUniform(v);
        });
    };
    ShaderBase.prototype.changeValue = function (name, callback) {
        var uniform = this._uniforms.get(name);
        if (uniform !== (void 0) && uniform !== null) {
            callback(uniform);
        }
    };
    ShaderBase.prototype.select = function () {
        this._glc.useProgram(this._program);
    };
    ShaderBase.prototype.getUniformLocation = function (name) {
        return this._program !== null ? this._glc.getUniformLocation(this._program, name) : null;
    };
    ShaderBase.prototype.getAttributeLocation = function (name) {
        return this._program !== null ? this._glc.getAttribLocation(this._program, name) : -1;
    };
    Object.defineProperty(ShaderBase.prototype, "vertexSource", {
        get: function () {
            return this._vertexSource;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderBase.prototype, "fragmentSource", {
        get: function () {
            return this._fragmentSource;
        },
        enumerable: true,
        configurable: true
    });
    ShaderBase.prototype._$localInit = function (manager, uniforms, attributes) {
    };
    ShaderBase.prototype.__initialize = function (glc, vertexSource, fragmentSource) {
        this._glc = glc;
        function error(message, extra) {
            if (this._vertexShader !== null) {
                glc.deleteShader(this._vertexShader);
            }
            if (this._fragmentShader !== null) {
                glc.deleteShader(this._fragmentShader);
            }
            if (this._program !== null) {
                glc.deleteProgram(this._program);
            }
            this._vertexShader = this._fragmentShader = this._program = null;
            if (message !== undefined && message !== null) {
                if (extra !== undefined) {
                    console.warn(message, extra);
                }
                else {
                    console.warn(message);
                }
            }
        }
        this._vertexShader = createShaderFromSource(glc, vertexSource, gl.VERTEX_SHADER);
        this._fragmentShader = createShaderFromSource(glc, fragmentSource, gl.FRAGMENT_SHADER);
        if (this._vertexShader === null || this._fragmentShader === null) {
            return error("Vertex shader or fragment shader is null.");
        }
        this._program = glc.createProgram();
        if (this._program === null) {
            return error("Failed to create program.");
        }
        glc.attachShader(this._program, this._vertexShader);
        glc.attachShader(this._program, this._fragmentShader);
        glc.linkProgram(this._program);
        var isLinked = glc.getProgramParameter(this._program, gl.LINK_STATUS);
        if (!isLinked) {
            var errorLog = glc.getProgramInfoLog(this._program);
            return error("Failed to link program: ", errorLog);
        }
    };
    ShaderBase.prototype.__syncUniform = function (uniform) {
        var location = uniform.location;
        var value = uniform.value;
        var glc = this._glc;
        /**
         * @type {Number}
         */
        var i = 0;
        /**
         * @type {Number}
         */
        var il = 0;
        switch (uniform.type) {
            case WebGLDataType_1.WebGLDataType.UBool:
                glc.uniform1i(location, value ? 1 : 0);
                break;
            case WebGLDataType_1.WebGLDataType.U1I:
                glc.uniform1i(location, value);
                break;
            case WebGLDataType_1.WebGLDataType.U1F:
                glc.uniform1f(location, value);
                break;
            case WebGLDataType_1.WebGLDataType.U2F:
                glc.uniform2f(location, value[0], value[1]);
                break;
            case WebGLDataType_1.WebGLDataType.U3F:
                glc.uniform3f(location, value[0], value[1], value[2]);
                break;
            case WebGLDataType_1.WebGLDataType.U4F:
                glc.uniform4f(location, value[0], value[1], value[2], value[3]);
                break;
            case WebGLDataType_1.WebGLDataType.UV2:
                glc.uniform2f(location, value.x, value.y);
                break;
            case WebGLDataType_1.WebGLDataType.UV3:
                glc.uniform3f(location, value.x, value.y, value.z);
                break;
            case WebGLDataType_1.WebGLDataType.UV4:
                glc.uniform4f(location, value.x, value.y, value.z, value.w);
                break;
            case WebGLDataType_1.WebGLDataType.U1IV:
                glc.uniform1iv(location, value);
                break;
            case WebGLDataType_1.WebGLDataType.U2IV:
                glc.uniform2iv(location, value);
                break;
            case WebGLDataType_1.WebGLDataType.U3IV:
                glc.uniform3iv(location, value);
                break;
            case WebGLDataType_1.WebGLDataType.U4IV:
                glc.uniform4iv(location, value);
                break;
            case WebGLDataType_1.WebGLDataType.U1FV:
                glc.uniform1fv(location, value);
                break;
            case WebGLDataType_1.WebGLDataType.U2FV:
                glc.uniform2fv(location, value);
                break;
            case WebGLDataType_1.WebGLDataType.U3FV:
                glc.uniform3fv(location, value);
                break;
            case WebGLDataType_1.WebGLDataType.U4FV:
                glc.uniform4fv(location, value);
                break;
            case WebGLDataType_1.WebGLDataType.UMat2:
                glc.uniformMatrix2fv(location, uniform.transpose, value);
                break;
            case WebGLDataType_1.WebGLDataType.UMat3:
                glc.uniformMatrix3fv(location, uniform.transpose, value);
                break;
            case WebGLDataType_1.WebGLDataType.UMat4:
                glc.uniformMatrix4fv(location, uniform.transpose, value);
                break;
            case WebGLDataType_1.WebGLDataType.UIV:
                glc.uniform3iv(location, value);
                break;
            case WebGLDataType_1.WebGLDataType.UFV:
                glc.uniform3fv(location, value);
                break;
            case WebGLDataType_1.WebGLDataType.UV2V:
                if (!uniform.array) {
                    uniform.array = new Float32Array(2 * value.length);
                }
                for (i = 0, il = value.length; i < il; i++) {
                    uniform.array[i * 2] = value[i].x;
                    uniform.array[i * 2 + 1] = value[i].y;
                }
                glc.uniform2fv(location, uniform.array);
                break;
            case WebGLDataType_1.WebGLDataType.UV3V:
                if (!uniform.array) {
                    uniform.array = new Float32Array(3 * value.length);
                }
                for (i = 0, il = value.length; i < il; i++) {
                    uniform.array[i * 3] = value[i].x;
                    uniform.array[i * 3 + 1] = value[i].y;
                    uniform.array[i * 3 + 2] = value[i].z;
                }
                glc.uniform2fv(location, uniform.array);
                break;
            case WebGLDataType_1.WebGLDataType.UV4V:
                if (!uniform.array) {
                    uniform.array = new Float32Array(4 * value.length);
                }
                for (i = 0, il = value.length; i < il; i++) {
                    uniform.array[i * 4] = value[i].x;
                    uniform.array[i * 4 + 1] = value[i].y;
                    uniform.array[i * 4 + 2] = value[i].z;
                    uniform.array[i * 4 + 3] = value[i].w;
                }
                glc.uniform2fv(location, uniform.array);
                break;
            case WebGLDataType_1.WebGLDataType.USampler2D:
                glc.activeTexture(gl["TEXTURE" + value.toString()]);
                glc.bindTexture(gl.TEXTURE_2D, uniform.texture);
                glc.uniform1i(location, value);
                break;
            default:
                console.warn("Uniform [" + uniform.name + "]: unknown format " + uniform.type);
                break;
        }
    };
    ShaderBase.prototype.__cacheUniformLocations = function () {
        var glc = this._glc;
        var program = this._program;
        this._uniforms.forEach(function (v, k) {
            v.location = glc.getUniformLocation(program, k);
        });
    };
    ShaderBase.prototype.__cacheAttributeLocations = function () {
        var glc = this._glc;
        var program = this._program;
        this._attributes.forEach(function (v, k) {
            v.location = glc.getAttribLocation(program, k);
        });
    };
    ShaderBase.SHADER_CLASS_NAME = "ShaderBase";
    ShaderBase.FRAGMENT_SOURCE = FragmentShaders_1.FragmentShaders.buffered;
    ShaderBase.VERTEX_SOURCE = VertexShaders_1.VertexShaders.buffered;
    return ShaderBase;
}());
exports.ShaderBase = ShaderBase;
function createShaderFromSource(glc, source, type) {
    var shader = glc.createShader(type);
    if (shader === null) {
        console.warn("Cannot create shader.");
        return null;
    }
    glc.shaderSource(shader, source);
    glc.compileShader(shader);
    var isCompiled = glc.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!isCompiled) {
        var error = glc.getShaderInfoLog(shader);
        console.warn("Failed to load shader: " + error);
        glc.deleteShader(shader);
        return null;
    }
    return shader;
}



},{"../glantern/GLUtil":94,"./FragmentShaders":105,"./VertexShaders":113,"./WebGLDataType":114}],110:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var ShaderID = (function () {
    function ShaderID() {
    }
    Object.defineProperty(ShaderID, "PRIMITIVE", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderID, "BLUR_X", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderID, "BLUR_Y", {
        get: function () {
            return 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderID, "REPLICATE", {
        get: function () {
            return 3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderID, "COLOR_TRANSFORM", {
        get: function () {
            return 4;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderID, "FXAA", {
        get: function () {
            return 5;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderID, "BLUR2", {
        get: function () {
            return 6;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderID, "COPY_IMAGE", {
        get: function () {
            return 7;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderID, "PRIMITIVE2", {
        get: function () {
            return 8;
        },
        enumerable: true,
        configurable: true
    });
    return ShaderID;
}());
exports.ShaderID = ShaderID;



},{}],111:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/17.
 */
"use strict";
var PrimitiveShader_1 = require("./shaders/PrimitiveShader");
var BlurXShader_1 = require("./shaders/BlurXShader");
var BlurYShader_1 = require("./shaders/BlurYShader");
var ReplicateShader_1 = require("./shaders/ReplicateShader");
var ColorTransformShader_1 = require("./shaders/ColorTransformShader");
var FxaaShader_1 = require("./shaders/FxaaShader");
var Blur2Shader_1 = require("./shaders/Blur2Shader");
var CopyImageShader_1 = require("./shaders/CopyImageShader");
var Primitive2Shader_1 = require("./shaders/Primitive2Shader");
var ShaderManager = (function () {
    function ShaderManager(renderer) {
        this._renderer = null;
        this._shaders = null;
        this._currentShader = null;
        this._renderer = renderer;
        this._shaders = [];
        this.__insertShaders();
    }
    ShaderManager.prototype.dispose = function () {
        for (var i = 0; i < this._shaders.length; ++i) {
            this._shaders[i].dispose();
        }
        this._currentShader = null;
        this._renderer = null;
        this._shaders = null;
    };
    ShaderManager.prototype.getNextAvailableID = function () {
        return this._shaders.length;
    };
    ShaderManager.prototype.loadShader = function (shaderName, uniforms, attributes) {
        var returnID = -1;
        try {
            var SHADER_CLASS = require("./shaders/" + shaderName + "Shader");
            var shaderClassName = SHADER_CLASS.SHADER_CLASS_NAME;
            var shader = null;
            shader = new SHADER_CLASS(this, SHADER_CLASS.VERTEX_SOURCE, SHADER_CLASS.FRAGMENT_SOURCE, uniforms, attributes);
            this._shaders.push(shader);
            returnID = shader.id;
        }
        catch (e) {
        }
        return returnID;
    };
    ShaderManager.prototype.selectShader = function (id) {
        var shader = this.__getShader(id);
        if (shader !== null) {
            shader.select();
            this._currentShader = shader;
        }
    };
    Object.defineProperty(ShaderManager.prototype, "currentShader", {
        get: function () {
            return this._currentShader;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderManager.prototype, "context", {
        get: function () {
            return this._renderer.context;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderManager.prototype, "renderer", {
        get: function () {
            return this._renderer;
        },
        enumerable: true,
        configurable: true
    });
    ShaderManager.prototype.__getShader = function (id) {
        var shader = null;
        try {
            shader = this._shaders[id];
        }
        catch (e) {
        }
        return shader;
    };
    ShaderManager.prototype.__insertShaders = function () {
        var shaderList = this._shaders;
        shaderList.push(new PrimitiveShader_1.PrimitiveShader(this));
        shaderList.push(new BlurXShader_1.BlurXShader(this));
        shaderList.push(new BlurYShader_1.BlurYShader(this));
        shaderList.push(new ReplicateShader_1.ReplicateShader(this));
        shaderList.push(new ColorTransformShader_1.ColorTransformShader(this));
        shaderList.push(new FxaaShader_1.FxaaShader(this));
        shaderList.push(new Blur2Shader_1.Blur2Shader(this));
        shaderList.push(new CopyImageShader_1.CopyImageShader(this));
        shaderList.push(new Primitive2Shader_1.Primitive2Shader(this));
    };
    return ShaderManager;
}());
exports.ShaderManager = ShaderManager;



},{"./shaders/Blur2Shader":132,"./shaders/BlurXShader":133,"./shaders/BlurYShader":134,"./shaders/ColorTransformShader":136,"./shaders/CopyImageShader":137,"./shaders/FxaaShader":138,"./shaders/Primitive2Shader":139,"./shaders/PrimitiveShader":140,"./shaders/ReplicateShader":141}],112:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/17.
 */
"use strict";
var WebGLDataType_1 = require("./WebGLDataType");
var UniformCache = (function () {
    function UniformCache() {
        this.name = null;
        this.type = WebGLDataType_1.WebGLDataType.UUnknown;
        this.location = null;
        this.value = undefined;
        this.transpose = false;
        this.array = null;
        this.texture = null;
    }
    return UniformCache;
}());
exports.UniformCache = UniformCache;



},{"./WebGLDataType":114}],113:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var Values = Object.create(null);
var VertexShaders = (function () {
    function VertexShaders() {
    }
    Object.defineProperty(VertexShaders, "buffered", {
        get: function () {
            return Values.buffered;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VertexShaders, "blurX", {
        get: function () {
            return Values.blurX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VertexShaders, "blurY", {
        get: function () {
            return Values.blurY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VertexShaders, "primitive", {
        get: function () {
            return Values.primitive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VertexShaders, "replicate", {
        get: function () {
            return Values.replicate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VertexShaders, "fxaa", {
        get: function () {
            return Values.fxaa;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VertexShaders, "blur2", {
        get: function () {
            return Values.blur2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VertexShaders, "copyImage", {
        get: function () {
            return Values.copyImage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VertexShaders, "primitive2", {
        get: function () {
            return Values.primitive2;
        },
        enumerable: true,
        configurable: true
    });
    return VertexShaders;
}());
exports.VertexShaders = VertexShaders;
Values.buffered = "\n    attribute vec3 aVertexPosition;\n    attribute vec2 aTextureCoord;\n\n    uniform mat4 uProjectionMatrix;\n\n    varying vec2 vTextureCoord;\n\n    void main() {\n       gl_Position = uProjectionMatrix * vec4(aVertexPosition.xyz, 1.0);\n       vTextureCoord = aTextureCoord;\n    }\n";
Values.blurX = "\n    precision mediump float;\n\n    attribute vec3 aVertexPosition;\n    attribute vec2 aTextureCoord;\n\n    uniform float uStrength;\n    uniform mat4 uProjectionMatrix;\n\n    varying vec2 vTextureCoord;\n    varying vec2 vBlurTexCoords[6];\n\n    void main()\n    {\n        gl_Position = uProjectionMatrix * vec4(aVertexPosition.xyz, 1.0);\n        vTextureCoord = aTextureCoord;\n\n        vBlurTexCoords[0] = aTextureCoord + vec2(-0.012 * uStrength, 0.0);\n        vBlurTexCoords[1] = aTextureCoord + vec2(-0.008 * uStrength, 0.0);\n        vBlurTexCoords[2] = aTextureCoord + vec2(-0.004 * uStrength, 0.0);\n        vBlurTexCoords[3] = aTextureCoord + vec2( 0.004 * uStrength, 0.0);\n        vBlurTexCoords[4] = aTextureCoord + vec2( 0.008 * uStrength, 0.0);\n        vBlurTexCoords[5] = aTextureCoord + vec2( 0.012 * uStrength, 0.0);\n    }\n";
Values.blurY = "\n    precision mediump float;\n\n    attribute vec3 aVertexPosition;\n    attribute vec2 aTextureCoord;\n\n    uniform float uStrength;\n    uniform mat4 uProjectionMatrix;\n\n    varying vec2 vTextureCoord;\n    varying vec2 vBlurTexCoords[6];\n\n    void main()\n    {\n        gl_Position = uProjectionMatrix * vec4(aVertexPosition.xyz, 1.0);\n        vTextureCoord = aTextureCoord;\n\n        vBlurTexCoords[0] = aTextureCoord + vec2(0.0, -0.012 * uStrength);\n        vBlurTexCoords[1] = aTextureCoord + vec2(0.0, -0.008 * uStrength);\n        vBlurTexCoords[2] = aTextureCoord + vec2(0.0, -0.004 * uStrength);\n        vBlurTexCoords[3] = aTextureCoord + vec2(0.0,  0.004 * uStrength);\n        vBlurTexCoords[4] = aTextureCoord + vec2(0.0,  0.008 * uStrength);\n        vBlurTexCoords[5] = aTextureCoord + vec2(0.0,  0.012 * uStrength);\n    }\n";
Values.primitive = "\n    precision mediump float;\n\n    attribute vec3 aVertexPosition;\n    attribute vec4 aVertexColor;\n\n    uniform mat4 uProjectionMatrix;\n    uniform mat4 uTransformMatrix;\n\n    varying vec4 vVertexColor;\n\n    void main() {\n       gl_Position = uProjectionMatrix * uTransformMatrix * vec4(aVertexPosition.xyz, 1.0);\n       vVertexColor = aVertexColor;\n    }\n";
Values.replicate = "\n    attribute vec3 aVertexPosition;\n    attribute vec2 aTextureCoord;\n\n    uniform mat4 uProjectionMatrix;\n    uniform vec2 uOriginalSize;\n    uniform vec2 uFitSize;\n    uniform bool uFlipX;\n    uniform bool uFlipY;\n\n    varying vec2 vTextureCoord;\n\n    void main() {\n        vec3 newVertexPostion = aVertexPosition;\n       vec2 newTextureCoord = aTextureCoord;\n       if (uFlipX) {\n           newTextureCoord.x = 1.0 - newTextureCoord.x;\n           newVertexPostion.x -= (uFitSize - uOriginalSize).x;\n       }\n       if (uFlipY) {\n           newTextureCoord.y = 1.0 - newTextureCoord.y;\n           newVertexPostion.y -= (uFitSize - uOriginalSize).y;\n       }\n       gl_Position = uProjectionMatrix * vec4(newVertexPostion.xyz, 1.0);\n       vTextureCoord = newTextureCoord;\n    }\n";
// For the full license, please refer to shaders/glsl/fxaa.vert
Values.fxaa = "\n    precision mediump float;\n\n    attribute vec3 aVertexPosition;\n    attribute vec2 aTextureCoord;\n\n    uniform mat4 uProjectionMatrix;\n    uniform vec2 uResolution;\n\n    varying vec2 vTextureCoord;\n    varying vec2 vResolution;\n\n    varying vec2 v_rgbNW;\n    varying vec2 v_rgbNE;\n    varying vec2 v_rgbSW;\n    varying vec2 v_rgbSE;\n    varying vec2 v_rgbM;\n\n    void texcoords(vec2 fragCoord, vec2 resolution,\n       out vec2 v_rgbNW, out vec2 v_rgbNE,\n       out vec2 v_rgbSW, out vec2 v_rgbSE,\n       out vec2 v_rgbM) {\n       vec2 inverseVP = 1.0 / resolution.xy;\n       v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n       v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n       v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n       v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n       v_rgbM = vec2(fragCoord * inverseVP);\n    }\n\n    void main() {\n       gl_Position = uProjectionMatrix * vec4(aVertexPosition, 1.0);\n       vTextureCoord = aTextureCoord;\n       vResolution = uResolution;\n\n       texcoords(aTextureCoord * uResolution, uResolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n    }\n";
Values.blur2 = "\n    precision mediump float;\n\n    attribute vec3 aVertexPosition;\n    attribute vec2 aTextureCoord;\n\n    uniform mat4 uProjectionMatrix;\n\n    varying vec2 vTextureCoord;\n\n    void main()\n    {\n        gl_Position = uProjectionMatrix * vec4(aVertexPosition.xyz, 1.0);\n        vTextureCoord = aTextureCoord;\n    }\n";
Values.copyImage = "\n    attribute vec3 aVertexPosition;\n    attribute vec2 aTextureCoord;\n\n    uniform mat4 uProjectionMatrix;\n    uniform mat4 uTransformMatrix;\n    uniform vec2 uOriginalSize;\n    uniform vec2 uFitSize;\n    uniform bool uFlipX;\n    uniform bool uFlipY;\n\n    varying vec2 vTextureCoord;\n\n    void main() {\n        vec3 newVertexPostion = aVertexPosition;\n        vec2 newTextureCoord = aTextureCoord;\n        if (uFlipX) {\n            newTextureCoord.x = 1.0 - newTextureCoord.x;\n            newVertexPostion.x -= (uFitSize - uOriginalSize).x;\n        }\n        if (uFlipY) {\n            newTextureCoord.y = 1.0 - newTextureCoord.y;\n            newVertexPostion.y -= (uFitSize - uOriginalSize).y;\n        }\n        gl_Position = uProjectionMatrix * uTransformMatrix * vec4(newVertexPostion.xyz, 1.0);\n        vTextureCoord = newTextureCoord;\n    }\n";
Values.primitive2 = "\n    precision mediump float;\n\n    attribute vec3 aVertexPosition;\n    attribute vec4 aVertexColor;\n\n    uniform mat4 uProjectionMatrix;\n    uniform mat4 uTransformMatrix;\n    uniform vec2 uOriginalSize;\n    uniform bool uFlipX;\n    uniform bool uFlipY;\n\n    varying vec4 vVertexColor;\n\n    void main() {\n        vec3 newVertexPostion = aVertexPosition;\n        if (uFlipX) {\n            newVertexPostion.x = uOriginalSize.x - newVertexPostion.x;\n        }\n        if (uFlipY) {\n            newVertexPostion.y = uOriginalSize.y - newVertexPostion.y;\n        }\n        gl_Position = uProjectionMatrix * uTransformMatrix * vec4(newVertexPostion.xyz, 1.0);\n        vVertexColor = aVertexColor;\n    }\n";



},{}],114:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/17.
 */
"use strict";
(function (WebGLDataType) {
    WebGLDataType[WebGLDataType["UUnknown"] = 0] = "UUnknown";
    WebGLDataType[WebGLDataType["UBool"] = 1] = "UBool";
    WebGLDataType[WebGLDataType["U1I"] = 2] = "U1I";
    WebGLDataType[WebGLDataType["U1F"] = 3] = "U1F";
    WebGLDataType[WebGLDataType["U2F"] = 4] = "U2F";
    WebGLDataType[WebGLDataType["U3F"] = 5] = "U3F";
    WebGLDataType[WebGLDataType["U4F"] = 6] = "U4F";
    WebGLDataType[WebGLDataType["UV2"] = 7] = "UV2";
    WebGLDataType[WebGLDataType["UV3"] = 8] = "UV3";
    WebGLDataType[WebGLDataType["UV4"] = 9] = "UV4";
    WebGLDataType[WebGLDataType["U1IV"] = 10] = "U1IV";
    WebGLDataType[WebGLDataType["U2IV"] = 11] = "U2IV";
    WebGLDataType[WebGLDataType["U3IV"] = 12] = "U3IV";
    WebGLDataType[WebGLDataType["U4IV"] = 13] = "U4IV";
    WebGLDataType[WebGLDataType["U1FV"] = 14] = "U1FV";
    WebGLDataType[WebGLDataType["U2FV"] = 15] = "U2FV";
    WebGLDataType[WebGLDataType["U3FV"] = 16] = "U3FV";
    WebGLDataType[WebGLDataType["U4FV"] = 17] = "U4FV";
    WebGLDataType[WebGLDataType["UMat2"] = 18] = "UMat2";
    WebGLDataType[WebGLDataType["UMat3"] = 19] = "UMat3";
    WebGLDataType[WebGLDataType["UMat4"] = 20] = "UMat4";
    WebGLDataType[WebGLDataType["UIV"] = 21] = "UIV";
    WebGLDataType[WebGLDataType["UFV"] = 22] = "UFV";
    WebGLDataType[WebGLDataType["UV2V"] = 23] = "UV2V";
    WebGLDataType[WebGLDataType["UV3V"] = 24] = "UV3V";
    WebGLDataType[WebGLDataType["UV4V"] = 25] = "UV4V";
    WebGLDataType[WebGLDataType["USampler2D"] = 26] = "USampler2D";
})(exports.WebGLDataType || (exports.WebGLDataType = {}));
var WebGLDataType = exports.WebGLDataType;



},{}],115:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/17.
 */
"use strict";
var libtess = require("libtess");
var ShaderManager_1 = require("./ShaderManager");
var FilterManager_1 = require("./FilterManager");
var RenderTarget2D_1 = require("./RenderTarget2D");
var WebGLUtils_1 = require("./WebGLUtils");
var BlendMode_1 = require("../flash/display/BlendMode");
var GLUtil_1 = require("../glantern/GLUtil");
var ArgumentError_1 = require("../flash/errors/ArgumentError");
var gl = window.WebGLRenderingContext;
/**
 * The WebGL renderer, main provider of the rendering services.
 * @implements {IDisposable}
 */
var WebGLRenderer = (function () {
    function WebGLRenderer(p1, p2, p3) {
        this._currentRenderTarget = null;
        this._currentBlendMode = null;
        this._screenTarget = null;
        this._filterManager = null;
        this._shaderManager = null;
        this._tessellator = null;
        this._context = null;
        this._options = null;
        this._isInitialized = false;
        if (typeof p1 === "number") {
            this.__initialize(p3, null, p1, p2);
        }
        else if (p1 instanceof HTMLCanvasElement) {
            this.__initialize(p2, p1);
        }
        else {
            throw new ArgumentError_1.ArgumentError("Invalid constructor parameters.");
        }
    }
    /**
     * Clear the screen.
     */
    WebGLRenderer.prototype.clear = function () {
        if (this._screenTarget !== null) {
            this._screenTarget.clear();
        }
    };
    /**
     * Disposes the {@link WebGLRenderer} and related resources.
     */
    WebGLRenderer.prototype.dispose = function () {
        if (this._isInitialized) {
            this._screenTarget.dispose();
            this._filterManager.dispose();
            this._shaderManager.dispose();
            this._filterManager = null;
            this._shaderManager = null;
            this._screenTarget = null;
            this._context = null;
            if (this._view.parentNode !== null && this._view.parentNode !== undefined) {
                this._view.parentNode.removeChild(this._view);
            }
            this._view = null;
        }
    };
    /**
     * Switches current render target to a specified {@link RenderTarget2D}.
     * @param [target] {RenderTarget2D} The {@link RenderTarget2D} that will be used. Null means using the default first-time
     * render target of the {@link WebGLRenderer}. The default value is null.
     */
    WebGLRenderer.prototype.setRenderTarget = function (target) {
        if (target === void 0) { target = null; }
        if (target === this._currentRenderTarget && GLUtil_1.GLUtil.ptr(target)) {
            return;
        }
        var t = this._currentRenderTarget = GLUtil_1.GLUtil.ptr(target) ? target : this._screenTarget;
        t.activate();
    };
    Object.defineProperty(WebGLRenderer.prototype, "currentRenderTarget", {
        /**
         * Returns current render target of the {@link WebGLRenderer}.
         * @returns {RenderTarget2D} Current render target of the {@link WebGLRenderer}.
         */
        get: function () {
            return this._currentRenderTarget;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebGLRenderer.prototype, "view", {
        /**
         * Returns the output &lt;canvas&gt; for displaying the contents rendered.
         * @returns {HTMLCanvasElement} The output &lt;canvas&gt;.
         */
        get: function () {
            return this._view;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebGLRenderer.prototype, "context", {
        /**
         * Returns the {@link WebGLRenderingContext} attached to the {@link WebGLRenderer}.
         * @returns {WebGLRenderingContext} The {@link WebGLRenderingContext} attached to the {@link WebGLRenderer}.
         */
        get: function () {
            return this._context;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebGLRenderer.prototype, "shaderManager", {
        /**
         * Returns the {@link ShaderManager} used by the {@link WebGLRenderer}.
         * @returns {ShaderManager} The {@link ShaderManager} used by the {@link WebGLRenderer}.
         */
        get: function () {
            return this._shaderManager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebGLRenderer.prototype, "filterManager", {
        /**
         * Returns the {@link FilterManager} used by the {@link WebGLRenderer}.
         * @returns {FilterManager} The {@link FilterManager} used by the {@link WebGLRenderer}.
         */
        get: function () {
            return this._filterManager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebGLRenderer.prototype, "tessellator", {
        /**
         * Returns the tessellator used by the {@link WebGLRenderer}.
         * @returns {libtess.GluTesselator} The tessellator used by the {@link WebGLRenderer}.
         */
        get: function () {
            return this._tessellator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebGLRenderer.prototype, "screenTarget", {
        /**
         * Returns the final output of the {@link WebGLRenderer}. This target is always a root render target, which directly
         * renders to the attached &lt;canvas&gt;. If FXAA is enabled, the copying process from {@link WebGLRenderer.inputTarget}
         * to this target performs a FXAA filtering. If not, it is a simple replicating process.
         * @returns {RenderTarget2D} The output of the {@link WebGLRenderer}.
         */
        get: function () {
            return this._screenTarget;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a new {@link RenderTarget2D} as a buffer. {@link RenderTarget2D}s should be only instanted through this
     * factory method, and be released using {@link WebGLRenderer.releaseRenderTarget}.
     * @param [image] {ImageData|HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} See {@link RenderTarget2D.image}
     * for more information.
     * @returns {RenderTarget2D} The created {@link RenderTarget2D}.
     */
    WebGLRenderer.prototype.createRenderTarget = function (image) {
        if (image === void 0) { image = null; }
        return new RenderTarget2D_1.RenderTarget2D(this, image, false);
    };
    /**
     * Creates a new {@link RenderTarget2D} as an output to the screen. {@link RenderTarget2D}s should be only instanted
     * through this factory method, and be released using {@link WebGLRenderer.releaseRenderTarget}.
     * @param [image] {ImageData|HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} See {@link RenderTarget2D.image}
     * for more information.
     * @returns {RenderTarget2D} The created {@link RenderTarget2D}.
     */
    WebGLRenderer.prototype.createRootRenderTarget = function (image) {
        if (image === void 0) { image = null; }
        return new RenderTarget2D_1.RenderTarget2D(this, image, true);
    };
    /**
     * Releases a {@link RenderTarget2D} created by the {@link WebGLRenderer}.
     * @param target {RenderTarget2D} The {@link RenderTarget2D} to be released.
     */
    WebGLRenderer.prototype.releaseRenderTarget = function (target) {
        if (target !== null && target !== undefined) {
            target.dispose();
        }
    };
    /**
     * Set current blend mode. Blend modes affects how the visual contents are rendered.
     * @param blendMode {String} See {@link BlendMode} for more information.
     * @see {@link BlendMode}
     */
    WebGLRenderer.prototype.setBlendMode = function (blendMode) {
        if (!this._isInitialized) {
            return;
        }
        if (this._currentBlendMode === blendMode) {
            return;
        }
        var config = BMS[blendMode] || BMS[BlendMode_1.BlendMode.NORMAL];
        var glc = this._context;
        if (config[0] >= 0) {
            glc.blendEquation(gl.FUNC_ADD);
        }
        else {
            glc.blendEquation(gl.FUNC_SUBTRACT);
        }
        glc.blendFunc(config[1], config[2]);
        this._currentBlendMode = blendMode;
    };
    /**
     * Initializes the newly created {@link WebGLRenderer}.
     * @param options {RendererOptions} Initialization options.
     * @param [canvas] {HTMLCanvasElement} Base canvas. If not specified, then a new canvas will be created using
     *                                     parameters width and height.
     * @param [width] {Number} The width, in pixels.
     * @param [height] {Number} The height, in pixels.
     * @private
     */
    WebGLRenderer.prototype.__initialize = function (options, canvas, width, height) {
        if (canvas === void 0) { canvas = null; }
        if (width === void 0) { width = 400; }
        if (height === void 0) { height = 300; }
        if (this._isInitialized) {
            return;
        }
        this._isInitialized = true;
        this._options = GLUtil_1.GLUtil.deepClone(options);
        if (!canvas) {
            canvas = window.document.createElement("canvas");
            canvas.className = "glantern-view";
            canvas.width = width;
            canvas.height = height;
        }
        var attributes = Object.create(null);
        attributes.alpha = options.transparent;
        attributes.antialias = options.antialias;
        attributes.premultipliedAlpha = true;
        attributes.depth = false;
        this._context = WebGLUtils_1.WebGLUtils.setupWebGL(canvas, attributes);
        this._view = canvas;
        var glc = this._context;
        glc.disable(gl.DEPTH_TEST);
        glc.disable(gl.CULL_FACE);
        glc.enable(gl.BLEND);
        this.setBlendMode(BlendMode_1.BlendMode.NORMAL);
        this._screenTarget = this.createRootRenderTarget();
        canvas.addEventListener("webglcontextlost", this.__onContextLost.bind(this));
        canvas.addEventListener("webglcontextrestored", this.__onContextRestored.bind(this));
        this._tessellator = new libtess.GluTesselator();
        this._shaderManager = new ShaderManager_1.ShaderManager(this);
        this._filterManager = new FilterManager_1.FilterManager(this);
        this.setRenderTarget(null);
        this.__initializeTessellator();
    };
    /**
     * Initializes the tessellator.
     * @private
     */
    WebGLRenderer.prototype.__initializeTessellator = function () {
        var tess = this._tessellator;
        tess.gluTessCallback(libtess.gluEnum.GLU_TESS_VERTEX_DATA, function (data, polyVertArray) {
            polyVertArray[polyVertArray.length - 1].push(data[0], data[1], data[2]);
        });
        tess.gluTessCallback(libtess.gluEnum.GLU_TESS_BEGIN_DATA, function (type, vertexArrays) {
            if (type !== libtess.primitiveType.GL_TRIANGLES) {
                console.warn('{TESS} expected TRIANGLES but got type: ' + type);
            }
            vertexArrays.push([]);
        });
        tess.gluTessCallback(libtess.gluEnum.GLU_TESS_ERROR, function (errorCode) {
            console.warn('{TESS} error number: ', errorCode);
        });
        tess.gluTessCallback(libtess.gluEnum.GLU_TESS_COMBINE, function (coords, data, weight) {
            return [coords[0], coords[1], coords[2]];
        });
        tess.gluTessCallback(libtess.gluEnum.GLU_TESS_EDGE_FLAG, function (flag) {
            // Do nothing
        });
    };
    /**
     * The event handler for handling the lost of active {@link WebGLRenderingContext}.
     * @param ev {Event} Event parameters.
     */
    WebGLRenderer.prototype.__onContextLost = function (ev) {
    };
    /**
     * The event handler for handling the restoration of active {@link WebGLRenderingContext}.
     * @param ev {Event} Event parameters.
     */
    WebGLRenderer.prototype.__onContextRestored = function (ev) {
    };
    /**
     * The default {@link RendererOptions} for instantiating a {@link WebGLRenderer}.
     * @type {RendererOptions}
     */
    WebGLRenderer.DEFAULT_OPTIONS = {
        antialias: true,
        depth: false,
        transparent: true
    };
    return WebGLRenderer;
}());
exports.WebGLRenderer = WebGLRenderer;
var BMS = Object.create(null);
BMS[BlendMode_1.BlendMode.ADD] = [1, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
BMS[BlendMode_1.BlendMode.ALPHA] = [1, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
BMS[BlendMode_1.BlendMode.DARKEN] = [1, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
BMS[BlendMode_1.BlendMode.DIFFERENCE] = [1, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
BMS[BlendMode_1.BlendMode.ERASE] = [1, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
BMS[BlendMode_1.BlendMode.HARDLIGHT] = [1, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
BMS[BlendMode_1.BlendMode.INVERT] = [1, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
BMS[BlendMode_1.BlendMode.LAYER] = [1, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
BMS[BlendMode_1.BlendMode.LIGHTEN] = [1, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
BMS[BlendMode_1.BlendMode.MULTIPLY] = [1, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
BMS[BlendMode_1.BlendMode.NORMAL] = [1, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
BMS[BlendMode_1.BlendMode.OVERLAY] = [1, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
BMS[BlendMode_1.BlendMode.SCREEN] = [1, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
BMS[BlendMode_1.BlendMode.SHADER] = [1, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
BMS[BlendMode_1.BlendMode.SUBTRACT] = [1, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];



},{"../flash/display/BlendMode":22,"../flash/errors/ArgumentError":48,"../glantern/GLUtil":94,"./FilterManager":104,"./RenderTarget2D":108,"./ShaderManager":111,"./WebGLUtils":116,"libtess":208}],116:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/13.
 */
"use strict";
/*
 * Copyright 2010, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var GLUtil_1 = require("../glantern/GLUtil");
var gl = window.WebGLRenderingContext;
var GET_A_WEBGL_BROWSER = "This page requires a browser that supports WebGL.<br/><a href=\"http://get.webgl.org\">Click here to upgrade your browser.</a>";
var OTHER_PROBLEM = "It appears your computer may not support WebGL.<br/><a href=\"http://get.webgl.org/troubleshooting/\">Click here for more information.</a>";
var WebGLUtils = (function () {
    function WebGLUtils() {
    }
    WebGLUtils.setupWebGL = function (canvas, optionalAttributes) {
        if (GLUtil_1.GLUtil.isUndefined(gl)) {
            showLink(canvas.parentElement, GET_A_WEBGL_BROWSER);
            return null;
        }
        var context = create3DContext(canvas, optionalAttributes);
        if (!context) {
            showLink(canvas.parentElement, OTHER_PROBLEM);
        }
        return context;
    };
    return WebGLUtils;
}());
exports.WebGLUtils = WebGLUtils;
function showLink(container, str) {
    var failHtml = makeFailHtml(str);
    console.error(failHtml);
    if (container) {
        container.innerHTML = failHtml;
    }
}
function makeFailHtml(message) {
    return "\n<table style=\"background-color: #8CE; width: 100%; height: 100%;\"><tr>\n<td align=\"center\">\n<div style=\"display: table-cell; vertical-align: middle;\">\n<div>" + message + "</div>\n</div>\n</td></tr></table>";
}
function create3DContext(canvas, optionalAttributes) {
    var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    var context = null;
    for (var i = 0; i < names.length; ++i) {
        try {
            context = canvas.getContext(names[i], optionalAttributes);
        }
        catch (e) {
        }
        if (context) {
            break;
        }
    }
    return context;
}



},{"../glantern/GLUtil":94}],117:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/22.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FilterBase_1 = require("../FilterBase");
var RenderHelper_1 = require("../RenderHelper");
var ShaderID_1 = require("../ShaderID");
var MathUtil_1 = require("../../glantern/MathUtil");
var Blur2Filter = (function (_super) {
    __extends(Blur2Filter, _super);
    function Blur2Filter(manager) {
        _super.call(this, manager);
        this._tempTarget = null;
        this._strengthX = 5;
        this._strengthY = 5;
        this._pass = 1;
        this._tempTarget = manager.renderer.createRenderTarget();
    }
    Object.defineProperty(Blur2Filter.prototype, "strengthX", {
        get: function () {
            return this._strengthX;
        },
        set: function (v) {
            if (v < 0) {
                v = 1;
            }
            this._strengthX = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Blur2Filter.prototype, "strengthY", {
        get: function () {
            return this._strengthY;
        },
        set: function (v) {
            if (v < 0) {
                v = 1;
            }
            this._strengthY = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Blur2Filter.prototype, "pass", {
        get: function () {
            return this._pass;
        },
        set: function (v) {
            v = MathUtil_1.MathUtil.clamp(v, 1, 3) | 0;
            this._pass = v;
        },
        enumerable: true,
        configurable: true
    });
    Blur2Filter.prototype.process = function (renderer, input, output, clearOutput) {
        var _this = this;
        // Larger value makes image smoother, darker (or less contrastive), but greatly improves efficiency.
        var passCoeff = 3;
        // See http://rastergrid.com/blog/2010/09/efficient-gaussian-blur-with-linear-sampling/
        var t1 = input, t2 = this._tempTarget;
        t2.clear();
        var t;
        for (var i = 0; i < this.pass * passCoeff; ++i) {
            RenderHelper_1.RenderHelper.renderBuffered(renderer, t1, t2, ShaderID_1.ShaderID.BLUR2, true, function (renderer) {
                var shader = renderer.shaderManager.currentShader;
                shader.setStrength(_this.strengthX / 4 / _this.pass / (t1.fitWidth / t1.originalWidth));
                shader.setResolution(input.fitWidth);
                shader.setBlurDirection([1.0, 0.0]);
            });
            t = t1;
            t1 = t2;
            t2 = t;
        }
        for (var i = 0; i < this.pass * passCoeff; ++i) {
            RenderHelper_1.RenderHelper.renderBuffered(renderer, t1, t2, ShaderID_1.ShaderID.BLUR2, true, function (renderer) {
                var shader = renderer.shaderManager.currentShader;
                shader.setStrength(_this.strengthY / 4 / _this.pass / (t1.fitWidth / t1.originalWidth));
                shader.setResolution(input.fitHeight);
                shader.setBlurDirection([0.0, 1.0]);
            });
            t = t1;
            t1 = t2;
            t2 = t;
        }
        RenderHelper_1.RenderHelper.copyTargetContent(renderer, t1, output, this.flipX, this.flipY, clearOutput);
    };
    Blur2Filter.prototype._$initialize = function () {
        this._tempTarget = this.filterManager.renderer.createRenderTarget();
    };
    Blur2Filter.prototype._$dispose = function () {
        this.filterManager.renderer.releaseRenderTarget(this._tempTarget);
        this._tempTarget = null;
    };
    return Blur2Filter;
}(FilterBase_1.FilterBase));
exports.Blur2Filter = Blur2Filter;



},{"../../glantern/MathUtil":95,"../FilterBase":103,"../RenderHelper":107,"../ShaderID":110}],118:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BlurYFilter_1 = require("./BlurYFilter");
var BlurXFilter_1 = require("./BlurXFilter");
var FilterBase_1 = require("../FilterBase");
var MathUtil_1 = require("../../glantern/MathUtil");
var BlurFilter = (function (_super) {
    __extends(BlurFilter, _super);
    function BlurFilter(manager) {
        _super.call(this, manager);
        this._tempTarget = null;
        this._strengthX = 5;
        this._strengthY = 5;
        this._pass = 1;
        this._blurXFilter = null;
        this._blurYFilter = null;
    }
    Object.defineProperty(BlurFilter.prototype, "strengthX", {
        get: function () {
            return this._strengthX;
        },
        set: function (v) {
            if (v < 0) {
                v = 1;
            }
            this._strengthX = v;
            if (this._blurXFilter !== null) {
                this._blurXFilter.strength = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlurFilter.prototype, "strengthY", {
        get: function () {
            return this._strengthY;
        },
        set: function (v) {
            if (v < 0) {
                v = 1;
            }
            this._strengthY = v;
            if (this._blurYFilter !== null) {
                this._blurYFilter.strength = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlurFilter.prototype, "pass", {
        get: function () {
            return this._pass;
        },
        set: function (v) {
            v = MathUtil_1.MathUtil.clamp(v, 1, 3) | 0;
            this._pass = v;
            if (this._blurXFilter !== null) {
                this._blurXFilter.pass = v;
            }
            if (this._blurYFilter !== null) {
                this._blurYFilter.pass = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    BlurFilter.prototype.process = function (renderer, input, output, clearOutput) {
        this._blurXFilter.process(renderer, input, this._tempTarget, true);
        this._blurYFilter.process(renderer, this._tempTarget, output, clearOutput);
    };
    BlurFilter.prototype._$initialize = function () {
        this._blurXFilter = new BlurXFilter_1.BlurXFilter(this.filterManager);
        this._blurYFilter = new BlurYFilter_1.BlurYFilter(this.filterManager);
        this._blurXFilter.initialize();
        this._blurYFilter.initialize();
        this._blurXFilter.strength = this.strengthX;
        this._blurYFilter.strength = this.strengthY;
        this._blurXFilter.pass = this.pass;
        this._blurYFilter.pass = this.pass;
        this._blurXFilter.flipY = false;
        this._tempTarget = this.filterManager.renderer.createRenderTarget();
    };
    BlurFilter.prototype._$dispose = function () {
        this.filterManager.renderer.releaseRenderTarget(this._tempTarget);
        this._tempTarget = null;
        this._blurXFilter.dispose();
        this._blurYFilter.dispose();
        this._blurXFilter = this._blurYFilter = null;
    };
    return BlurFilter;
}(FilterBase_1.FilterBase));
exports.BlurFilter = BlurFilter;



},{"../../glantern/MathUtil":95,"../FilterBase":103,"./BlurXFilter":119,"./BlurYFilter":120}],119:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FilterBase_1 = require("../FilterBase");
var ShaderID_1 = require("../ShaderID");
var RenderHelper_1 = require("../RenderHelper");
var MathUtil_1 = require("../../glantern/MathUtil");
var BlurXFilter = (function (_super) {
    __extends(BlurXFilter, _super);
    function BlurXFilter(manager) {
        _super.call(this, manager);
        this._strength = 5;
        this._pass = 1;
        this._tempTarget = null;
    }
    Object.defineProperty(BlurXFilter.prototype, "strength", {
        get: function () {
            return this._strength;
        },
        set: function (v) {
            if (v < 0) {
                v = 1;
            }
            this._strength = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlurXFilter.prototype, "pass", {
        get: function () {
            return this._pass;
        },
        set: function (v) {
            v = MathUtil_1.MathUtil.clamp(v, 1, 3) | 0;
            this._pass = v;
        },
        enumerable: true,
        configurable: true
    });
    BlurXFilter.prototype.process = function (renderer, input, output, clearOutput) {
        var _this = this;
        // Larger value makes image smoother, darker (or less contrastive), but greatly improves efficiency.
        var passCoeff = 3;
        var t1 = input, t2 = this._tempTarget;
        t2.clear();
        var t;
        for (var i = 0; i < passCoeff * this.pass; ++i) {
            RenderHelper_1.RenderHelper.renderBuffered(renderer, t1, t2, ShaderID_1.ShaderID.BLUR_X, true, function (renderer) {
                var shader = renderer.shaderManager.currentShader;
                shader.setStrength(_this.strength / 4 / _this.pass / (t1.fitWidth / t1.originalWidth));
            });
            t = t1;
            t1 = t2;
            t2 = t;
        }
        //renderer.copyRenderTargetContent(t1, output, clearOutput);
        RenderHelper_1.RenderHelper.copyTargetContent(renderer, t1, output, this.flipX, this.flipY, clearOutput);
    };
    BlurXFilter.prototype._$initialize = function () {
        this._tempTarget = this.filterManager.renderer.createRenderTarget();
    };
    BlurXFilter.prototype._$dispose = function () {
        this.filterManager.renderer.releaseRenderTarget(this._tempTarget);
        this._tempTarget = null;
    };
    return BlurXFilter;
}(FilterBase_1.FilterBase));
exports.BlurXFilter = BlurXFilter;



},{"../../glantern/MathUtil":95,"../FilterBase":103,"../RenderHelper":107,"../ShaderID":110}],120:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FilterBase_1 = require("../FilterBase");
var ShaderID_1 = require("../ShaderID");
var RenderHelper_1 = require("../RenderHelper");
var MathUtil_1 = require("../../glantern/MathUtil");
var BlurYFilter = (function (_super) {
    __extends(BlurYFilter, _super);
    function BlurYFilter(manager) {
        _super.call(this, manager);
        this._strength = 5;
        this._pass = 1;
        this._tempTarget = null;
    }
    Object.defineProperty(BlurYFilter.prototype, "strength", {
        get: function () {
            return this._strength;
        },
        set: function (v) {
            if (v < 0) {
                v = 1;
            }
            this._strength = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlurYFilter.prototype, "pass", {
        get: function () {
            return this._pass;
        },
        set: function (v) {
            v = MathUtil_1.MathUtil.clamp(v, 1, 3) | 0;
            this._pass = v;
        },
        enumerable: true,
        configurable: true
    });
    BlurYFilter.prototype.process = function (renderer, input, output, clearOutput) {
        var _this = this;
        // Larger value makes image smoother, darker (or less contrastive), but greatly improves efficiency.
        var passCoeff = 3;
        var t1 = input, t2 = this._tempTarget;
        t2.clear();
        var t;
        for (var i = 0; i < passCoeff * this.pass; ++i) {
            RenderHelper_1.RenderHelper.renderBuffered(renderer, t1, t2, ShaderID_1.ShaderID.BLUR_Y, true, function (renderer) {
                var shader = renderer.shaderManager.currentShader;
                shader.setStrength(_this.strength / 4 / _this.pass / (t1.fitWidth / t1.originalWidth));
            });
            t = t1;
            t1 = t2;
            t2 = t;
        }
        //renderer.copyRenderTargetContent(t1, output, clearOutput);
        RenderHelper_1.RenderHelper.copyTargetContent(renderer, t1, output, this.flipX, this.flipY, clearOutput);
    };
    BlurYFilter.prototype._$initialize = function () {
        this._tempTarget = this.filterManager.renderer.createRenderTarget();
    };
    BlurYFilter.prototype._$dispose = function () {
        this.filterManager.renderer.releaseRenderTarget(this._tempTarget);
        this._tempTarget = null;
    };
    return BlurYFilter;
}(FilterBase_1.FilterBase));
exports.BlurYFilter = BlurYFilter;



},{"../../glantern/MathUtil":95,"../FilterBase":103,"../RenderHelper":107,"../ShaderID":110}],121:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FilterBase_1 = require("../FilterBase");
var RenderHelper_1 = require("../RenderHelper");
var ShaderID_1 = require("../ShaderID");
var ColorTransformFilter = (function (_super) {
    __extends(ColorTransformFilter, _super);
    function ColorTransformFilter(manager) {
        _super.call(this, manager);
        this._colorMatrix = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        this._tempTarget = null;
    }
    ColorTransformFilter.prototype.setColorMatrix = function (r4c5) {
        this._colorMatrix = r4c5.slice();
    };
    ColorTransformFilter.prototype.process = function (renderer, input, output, clearOutput) {
        var _this = this;
        RenderHelper_1.RenderHelper.renderBuffered(renderer, input, this._tempTarget, ShaderID_1.ShaderID.COLOR_TRANSFORM, true, function (renderer) {
            var shader = renderer.shaderManager.currentShader;
            shader.setColorMatrix(_this._colorMatrix);
        });
        RenderHelper_1.RenderHelper.copyTargetContent(renderer, this._tempTarget, output, this.flipX, this.flipY, clearOutput);
    };
    ColorTransformFilter.prototype._$initialize = function () {
        this._tempTarget = this.filterManager.renderer.createRenderTarget();
    };
    ColorTransformFilter.prototype._$dispose = function () {
        this.filterManager.renderer.releaseRenderTarget(this._tempTarget);
        this._tempTarget = null;
    };
    return ColorTransformFilter;
}(FilterBase_1.FilterBase));
exports.ColorTransformFilter = ColorTransformFilter;



},{"../FilterBase":103,"../RenderHelper":107,"../ShaderID":110}],122:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ColorTransformFilter_1 = require("./ColorTransformFilter");
var FilterBase_1 = require("../FilterBase");
var Blur2Filter_1 = require("./Blur2Filter");
var RenderHelper_1 = require("../RenderHelper");
var MathUtil_1 = require("../../glantern/MathUtil");
var GlowFilter = (function (_super) {
    __extends(GlowFilter, _super);
    function GlowFilter(manager) {
        _super.call(this, manager);
        this._strengthX = 5;
        this._strengthY = 5;
        this._pass = 1;
        this._colorMatrix = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        /**
         * Use {@link BlurFilter} for better performance, or {@link Blur2Filter} for better quality.
         * @type {FilterBase}
         * @private
         */
        this._blurFilter = null;
        this._colorTransformFilter = null;
        this._tempOriginalTarget = null;
        this._tempColorTransformedTarget = null;
    }
    Object.defineProperty(GlowFilter.prototype, "strengthX", {
        get: function () {
            return this._strengthX;
        },
        set: function (v) {
            if (v < 0) {
                v = 1;
            }
            this._strengthX = v;
            if (this._blurFilter !== null) {
                this._blurFilter.strengthX = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlowFilter.prototype, "strengthY", {
        get: function () {
            return this._strengthY;
        },
        set: function (v) {
            if (v < 0) {
                v = 1;
            }
            this._strengthY = v;
            if (this._blurFilter !== null) {
                this._blurFilter.strengthY = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlowFilter.prototype, "pass", {
        get: function () {
            return this._pass;
        },
        set: function (v) {
            v = MathUtil_1.MathUtil.clamp(v, 1, 3) | 0;
            this._pass = v;
            if (this._blurFilter !== null) {
                this._blurFilter.pass = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    GlowFilter.prototype.setColorMatrix = function (r4c5) {
        if (this._colorTransformFilter !== null) {
            this._colorTransformFilter.setColorMatrix(r4c5);
        }
        this._colorMatrix = r4c5.slice();
    };
    GlowFilter.prototype.process = function (renderer, input, output, clearOutput) {
        RenderHelper_1.RenderHelper.copyTargetContent(renderer, input, this._tempOriginalTarget, false, false, true);
        this._colorTransformFilter.process(renderer, input, this._tempColorTransformedTarget, true);
        this._blurFilter.process(renderer, this._tempColorTransformedTarget, output, false);
        RenderHelper_1.RenderHelper.copyTargetContent(renderer, this._tempOriginalTarget, output, this.flipX, this.flipY, false);
    };
    GlowFilter.prototype._$initialize = function () {
        this._blurFilter = new Blur2Filter_1.Blur2Filter(this.filterManager);
        this._colorTransformFilter = new ColorTransformFilter_1.ColorTransformFilter(this.filterManager);
        this._blurFilter.initialize();
        this._colorTransformFilter.initialize();
        this._blurFilter.strengthX = this.strengthX;
        this._blurFilter.strengthY = this.strengthY;
        this._blurFilter.pass = this.pass;
        this._colorTransformFilter.setColorMatrix(this._colorMatrix);
        this._tempOriginalTarget = this.filterManager.renderer.createRenderTarget();
        this._tempColorTransformedTarget = this.filterManager.renderer.createRenderTarget();
    };
    GlowFilter.prototype._$dispose = function () {
        this._blurFilter.dispose();
        this._colorTransformFilter.dispose();
        this._blurFilter = this._colorTransformFilter = null;
        this.filterManager.renderer.releaseRenderTarget(this._tempOriginalTarget);
        this.filterManager.renderer.releaseRenderTarget(this._tempColorTransformedTarget);
        this._tempOriginalTarget = this._tempColorTransformedTarget = null;
    };
    return GlowFilter;
}(FilterBase_1.FilterBase));
exports.GlowFilter = GlowFilter;



},{"../../glantern/MathUtil":95,"../FilterBase":103,"../RenderHelper":107,"./Blur2Filter":117,"./ColorTransformFilter":121}],123:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./BlurFilter"));
__export(require("./BlurXFilter"));
__export(require("./BlurYFilter"));
__export(require("./ColorTransformFilter"));
__export(require("./GlowFilter"));
__export(require("./Blur2Filter"));



},{"./Blur2Filter":117,"./BlurFilter":118,"./BlurXFilter":119,"./BlurYFilter":120,"./ColorTransformFilter":121,"./GlowFilter":122}],124:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
"use strict";
(function (BrushType) {
    BrushType[BrushType["SOLID"] = 0] = "SOLID";
    BrushType[BrushType["GRADIENT"] = 1] = "GRADIENT";
    BrushType[BrushType["BITMAP"] = 2] = "BITMAP";
    BrushType[BrushType["SHADER"] = 3] = "SHADER";
})(exports.BrushType || (exports.BrushType = {}));
var BrushType = exports.BrushType;



},{}],125:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GraphicsDataRendererBase_1 = require("./GraphicsDataRendererBase");
var FillRendererBase = (function (_super) {
    __extends(FillRendererBase, _super);
    function FillRendererBase(graphics, currentX, currentY) {
        _super.call(this, graphics, currentX, currentY, currentX, currentY);
        // Use to track the relative rendering order, based on stroke renderers' orders
        this.beginIndex = -1;
        this.endIndex = -1;
        // See libtess.js Degenerate Hourglass test.
        this._contours = null;
        this._startingNewContour = true;
        this._contours = [[]];
        this.beginIndex = -1;
        this.endIndex = -1;
        this._hasDrawnAnything = false;
        this._startingNewContour = true;
    }
    FillRendererBase.prototype.moveTo = function (x, y) {
        // Consider the code sample:
        // g.beginFill(0xff0000, 1);
        // g.lineStyle(1, 0xffffff);
        // g.moveTo(100, 100);
        // Flash closes the path before each moveTo() call
        this.closePath();
        if (this._hasDrawnAnything) {
            if (this._currentX !== x || this._currentY !== y) {
                this._startingNewContour = true;
            }
        }
        else {
            this._startingNewContour = true;
        }
        this._currentX = x;
        this._currentY = y;
        this._lastPathStartX = x;
        this._lastPathStartY = y;
    };
    FillRendererBase.prototype._$getContourForClosedShapes = function () {
        var currentContour;
        if (this._hasDrawnAnything) {
            currentContour = [];
            this._contours.push(currentContour);
            this._startingNewContour = false;
        }
        else {
            currentContour = this._contours[0];
        }
        return currentContour;
    };
    FillRendererBase.prototype._$getContourForLines = function () {
        var currentContour;
        if (this._hasDrawnAnything) {
            if (this._startingNewContour) {
                currentContour = [];
                this._contours.push(currentContour);
                this._startingNewContour = false;
            }
            else {
                currentContour = this._contours[this._contours.length - 1];
            }
        }
        else {
            currentContour = this._contours[0];
        }
        return currentContour;
    };
    return FillRendererBase;
}(GraphicsDataRendererBase_1.GraphicsDataRendererBase));
exports.FillRendererBase = FillRendererBase;



},{"./GraphicsDataRendererBase":127}],126:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
"use strict";
exports.CURVE_ACCURACY = 20;
exports.STD_Z = 0;



},{}],127:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
"use strict";
var PackedArrayBuffer_1 = require("../PackedArrayBuffer");
var NotImplementedError_1 = require("../../flash/errors/NotImplementedError");
var gl = window.WebGLRenderingContext;
var GraphicsDataRendererBase = (function () {
    function GraphicsDataRendererBase(graphics, lastPathStartX, lastPathStartY, currentX, currentY) {
        this._graphics = null;
        this._glc = null;
        this._isDirty = true;
        // Local points buffer, format: X, Y, Z(=STD_Z)
        this._vertices = null;
        // Colors of points, format: R, G, B, A
        this._colors = null;
        // Local indices (for points) buffer
        this._indices = null;
        this._vertexBuffer = null;
        this._colorBuffer = null;
        this._indexBuffer = null;
        this._currentX = 0;
        this._currentY = 0;
        this._hasDrawnAnything = false;
        this._lastPathStartX = 0;
        this._lastPathStartY = 0;
        this._graphics = graphics;
        this._glc = graphics.renderer.context;
        this.__initializeBuffers();
        this._hasDrawnAnything = false;
        this._lastPathStartX = lastPathStartX;
        this._lastPathStartY = lastPathStartY;
        this.moveTo(currentX, currentY);
        this._isDirty = true;
    }
    GraphicsDataRendererBase.prototype.bezierCurveTo = function (cx1, cy1, cx2, cy2, x, y) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    GraphicsDataRendererBase.prototype.closePath = function () {
        // TODO: Consider the sample
        // g.beginFill(0xff0000); g.drawRect(100, 100, 100, 100); g.lineStyle(0xff0000, 1);
        // g.lineTo(400, 100); g.lineTo(200, 300); g.endFill();
        if (this._hasDrawnAnything && (this._currentX != this._lastPathStartX || this._currentY != this._lastPathStartY)) {
            this.lineTo(this._lastPathStartX, this._lastPathStartY);
        }
    };
    GraphicsDataRendererBase.prototype.curveTo = function (cx, cy, x, y) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    GraphicsDataRendererBase.prototype.drawCircle = function (x, y, radius) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    GraphicsDataRendererBase.prototype.drawEllipse = function (x, y, width, height) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    GraphicsDataRendererBase.prototype.drawRect = function (x, y, width, height) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    GraphicsDataRendererBase.prototype.drawRoundRect = function (x, y, width, height, ellipseWidth, ellipseHeight) {
        if (ellipseHeight === void 0) { ellipseHeight = NaN; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    GraphicsDataRendererBase.prototype.lineTo = function (x, y) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    GraphicsDataRendererBase.prototype.moveTo = function (x, y) {
        // Multiple movements are combined into one, which will be flushed at each
        // IGraphicsDataRenderer call that draws concrete elements
        throw new NotImplementedError_1.NotImplementedError();
    };
    GraphicsDataRendererBase.prototype.update = function () {
        // check whether to update the typed buffer
        this._$syncBuffers();
    };
    GraphicsDataRendererBase.prototype.render = function (renderer) {
        console.warn("Do not call GraphicsDataRendererBase.render().");
    };
    GraphicsDataRendererBase.prototype.dispose = function () {
        this._vertexBuffer.dispose();
        this._colorBuffer.dispose();
        this._indexBuffer.dispose();
        this._vertexBuffer = this._colorBuffer = this._indexBuffer = null;
        this._vertices = this._colors = this._indices = null;
        this._glc = null;
    };
    GraphicsDataRendererBase.prototype.becomeDirty = function () {
        this._isDirty = true;
    };
    Object.defineProperty(GraphicsDataRendererBase.prototype, "hasDrawnAnything", {
        get: function () {
            return this._hasDrawnAnything;
        },
        enumerable: true,
        configurable: true
    });
    GraphicsDataRendererBase.prototype._$syncBuffers = function () {
        if (this._isDirty) {
            // When the array buffers become dirty, their values will be updated automatically
            // at next draw call.
            this._vertexBuffer.setNewData(this._vertices);
            this._vertexBuffer.becomeDirty();
            this._colorBuffer.setNewData(this._colors);
            this._colorBuffer.becomeDirty();
            this._indexBuffer.setNewData(this._indices);
            this._indexBuffer.becomeDirty();
            this._isDirty = false;
        }
    };
    GraphicsDataRendererBase.prototype.__initializeBuffers = function () {
        this._vertices = [];
        this._colors = [];
        this._indices = [];
        this._vertexBuffer = PackedArrayBuffer_1.PackedArrayBuffer.create(this._glc, this._vertices, gl.FLOAT, gl.ARRAY_BUFFER);
        this._colorBuffer = PackedArrayBuffer_1.PackedArrayBuffer.create(this._glc, this._colors, gl.FLOAT, gl.ARRAY_BUFFER);
        this._indexBuffer = PackedArrayBuffer_1.PackedArrayBuffer.create(this._glc, this._indices, gl.UNSIGNED_SHORT, gl.ELEMENT_ARRAY_BUFFER);
    };
    return GraphicsDataRendererBase;
}());
exports.GraphicsDataRendererBase = GraphicsDataRendererBase;



},{"../../flash/errors/NotImplementedError":51,"../PackedArrayBuffer":106}],128:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var libtess = require("libtess");
var FillRendererBase_1 = require("./FillRendererBase");
var GRAPHICS_CONST_1 = require("./GRAPHICS_CONST");
var RenderHelper_1 = require("../RenderHelper");
var NotImplementedError_1 = require("../../flash/errors/NotImplementedError");
var MathUtil_1 = require("../../glantern/MathUtil");
var SolidFillRenderer = (function (_super) {
    __extends(SolidFillRenderer, _super);
    function SolidFillRenderer(graphics, startX, startY, color, alpha) {
        _super.call(this, graphics, startX, startY);
        this._r = 0;
        this._g = 0;
        this._b = 0;
        this._a = 1;
        this._a = MathUtil_1.MathUtil.clamp(alpha, 0, 1);
        this._r = ((color >>> 16) & 0xff) / 0xff;
        this._g = ((color >>> 8) & 0xff) / 0xff;
        this._b = (color & 0xff) / 0xff;
    }
    SolidFillRenderer.prototype.bezierCurveTo = function (cx1, cy1, cx2, cy2, x, y) {
        this._isDirty = true;
        var currentContour = this._$getContourForLines();
        if (!this._hasDrawnAnything || this._startingNewContour) {
            currentContour.push(this._currentX, this._currentY, GRAPHICS_CONST_1.STD_Z);
        }
        var dt1, dt2, dt3;
        var t2, t3;
        var fromX = this._currentX, fromY = this._currentY;
        var xa, ya;
        var j;
        for (var i = 1; i <= GRAPHICS_CONST_1.CURVE_ACCURACY; i++) {
            j = i / GRAPHICS_CONST_1.CURVE_ACCURACY;
            dt1 = 1 - j;
            dt2 = dt1 * dt1;
            dt3 = dt2 * dt1;
            t2 = j * j;
            t3 = t2 * j;
            xa = dt3 * fromX + 3 * dt2 * j * cx1 + 3 * dt1 * t2 * cx2 + t3 * x;
            ya = dt3 * fromY + 3 * dt2 * j * cy1 + 3 * dt1 * t2 * cy2 + t3 * y;
            currentContour.push(xa, ya, GRAPHICS_CONST_1.STD_Z);
        }
        this._currentX = x;
        this._currentY = y;
        this._hasDrawnAnything = true;
        this._startingNewContour = false;
    };
    SolidFillRenderer.prototype.curveTo = function (cx, cy, x, y) {
        this._isDirty = true;
        var currentContour = this._$getContourForLines();
        if (!this._hasDrawnAnything || this._startingNewContour) {
            currentContour.push(this._currentX, this._currentY, GRAPHICS_CONST_1.STD_Z);
        }
        var j;
        var fromX = this._currentX, fromY = this._currentY;
        var xa, ya;
        for (var i = 1; i <= GRAPHICS_CONST_1.CURVE_ACCURACY; i++) {
            j = i / GRAPHICS_CONST_1.CURVE_ACCURACY;
            xa = fromX + (cx - fromX) * j;
            ya = fromY + (cy - fromY) * j;
            xa = xa + (cx + (x - cx) * j - xa) * j;
            ya = ya + (cy + (y - cy) * j - ya) * j;
            currentContour.push(xa, ya, GRAPHICS_CONST_1.STD_Z);
        }
        this._currentX = x;
        this._currentY = y;
        this._hasDrawnAnything = true;
        this._startingNewContour = false;
    };
    SolidFillRenderer.prototype.drawCircle = function (x, y, radius) {
        this._isDirty = true;
        this.moveTo(x, y);
        var currentContour = this._$getContourForClosedShapes();
        var thetaNext;
        var thetaBegin;
        var x2, y2;
        var halfPi = Math.PI / 2;
        currentContour.push(this._currentX + radius, this._currentY, GRAPHICS_CONST_1.STD_Z);
        thetaBegin = 0;
        // Draw 4 segments of arcs, [-PI, -PI/2] [-PI/2, 0] [0, PI/2] [PI/2 PI]
        for (var k = 0; k < 4; k++) {
            for (var i = 1; i <= GRAPHICS_CONST_1.CURVE_ACCURACY; i++) {
                thetaNext = thetaBegin - i / GRAPHICS_CONST_1.CURVE_ACCURACY * halfPi;
                x2 = x + radius * Math.cos(thetaNext);
                y2 = y + radius * Math.sin(thetaNext);
                currentContour.push(x2, y2, GRAPHICS_CONST_1.STD_Z);
            }
            thetaBegin -= halfPi;
        }
        this._currentX = x + radius;
        this._currentY = y;
        this._lastPathStartX = x + radius;
        this._lastPathStartY = y;
        this._hasDrawnAnything = true;
        this._startingNewContour = false;
    };
    SolidFillRenderer.prototype.drawEllipse = function (x, y, width, height) {
        this._isDirty = true;
        this.moveTo(x, y + height / 2);
        var currentContour = this._$getContourForClosedShapes();
        var thetaNext;
        var thetaBegin;
        var centerX = x + width / 2, centerY = y + height / 2;
        var x2, y2;
        var halfPi = Math.PI / 2;
        currentContour.push(this._currentX, this._currentY, GRAPHICS_CONST_1.STD_Z);
        thetaBegin = Math.PI;
        // Draw 4 segments of arcs, [-PI, -PI/2] [-PI/2, 0] [0, PI/2] [PI/2 PI]
        // Brute, huh? Luckily there are 20 segments per PI/2...
        for (var k = 0; k < 4; k++) {
            for (var i = 1; i <= GRAPHICS_CONST_1.CURVE_ACCURACY; i++) {
                thetaNext = thetaBegin - i / GRAPHICS_CONST_1.CURVE_ACCURACY * halfPi;
                x2 = centerX + width / 2 * Math.cos(thetaNext);
                y2 = centerY + height / 2 * Math.sin(thetaNext);
                currentContour.push(x2, y2, GRAPHICS_CONST_1.STD_Z);
            }
            thetaBegin -= halfPi;
        }
        this._currentX = x + width;
        this._currentY = y + height / 2;
        this._lastPathStartX = x + width;
        this._lastPathStartY = y + height / 2;
        this._hasDrawnAnything = true;
        this._startingNewContour = false;
    };
    SolidFillRenderer.prototype.drawRect = function (x, y, width, height) {
        this._isDirty = true;
        this.moveTo(x, y);
        // Create a new contour and draw a independent rectangle, should not use lineTo().
        var currentContour = this._$getContourForClosedShapes();
        currentContour.push(x, y, GRAPHICS_CONST_1.STD_Z);
        currentContour.push(x + width, y, GRAPHICS_CONST_1.STD_Z);
        currentContour.push(x + width, y + height, GRAPHICS_CONST_1.STD_Z);
        currentContour.push(x, y + height, GRAPHICS_CONST_1.STD_Z);
        this._currentX = x;
        this._currentY = y;
        this._hasDrawnAnything = true;
        this._startingNewContour = false;
    };
    SolidFillRenderer.prototype.drawRoundRect = function (x, y, width, height, ellipseWidth, ellipseHeight) {
        if (ellipseHeight === void 0) { ellipseHeight = NaN; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    SolidFillRenderer.prototype.lineTo = function (x, y) {
        this._isDirty = true;
        var currentContour = this._$getContourForLines();
        if (!this._hasDrawnAnything || this._startingNewContour) {
            currentContour.push(this._currentX, this._currentY, GRAPHICS_CONST_1.STD_Z);
        }
        currentContour.push(x, y, GRAPHICS_CONST_1.STD_Z);
        this._currentX = x;
        this._currentY = y;
        this._hasDrawnAnything = true;
        this._startingNewContour = false;
    };
    SolidFillRenderer.prototype.update = function () {
        if (this._isDirty) {
            // Triangulate first
            var tess = this._graphics.renderer.tessellator;
            tess.gluTessProperty(libtess.gluEnum.GLU_TESS_WINDING_RULE, libtess.windingRule.GLU_TESS_WINDING_ODD);
            tess.gluTessNormal(0, 0, 1);
            var resultArray = [];
            tess.gluTessBeginPolygon(resultArray);
            var contour;
            for (var i = 0; i < this._contours.length; i++) {
                contour = this._contours[i];
                if (contour.length > 0) {
                    tess.gluTessBeginContour();
                    for (var j = 0; j < contour.length; j += 3) {
                        var coords = [contour[j], contour[j + 1], contour[j + 2]];
                        tess.gluTessVertex(coords, coords);
                    }
                    tess.gluTessEndContour();
                }
            }
            tess.gluTessEndPolygon();
            this._vertices = [];
            this._colors = [];
            this._indices = [];
            var colors = this._colors;
            var indices = this._indices;
            var vertices = this._vertices;
            j = 0;
            var tempArray;
            for (var i = 0; i < resultArray.length; i++) {
                tempArray = resultArray[i];
                for (var j = 0; j < tempArray.length; j++) {
                    vertices.push(tempArray[j]);
                }
            }
            j = 0;
            for (var i = 0; i < vertices.length; i += 3) {
                colors.push(this._r * this._a, this._g * this._a, this._b * this._a, this._a);
                indices.push(j);
                j++;
            }
        }
        // Then update buffers
        _super.prototype.update.call(this);
    };
    SolidFillRenderer.prototype.render = function (renderer) {
        if (this._vertices.length > 0) {
            var target = renderer.currentRenderTarget;
            RenderHelper_1.RenderHelper.renderPrimitives2(renderer, target, this._vertexBuffer, this._colorBuffer, this._indexBuffer, false, target.isRoot, false);
        }
    };
    return SolidFillRenderer;
}(FillRendererBase_1.FillRendererBase));
exports.SolidFillRenderer = SolidFillRenderer;



},{"../../flash/errors/NotImplementedError":51,"../../glantern/MathUtil":95,"../RenderHelper":107,"./FillRendererBase":125,"./GRAPHICS_CONST":126,"libtess":208}],129:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var StrokeRendererBase_1 = require("./StrokeRendererBase");
var GRAPHICS_CONST_1 = require("./GRAPHICS_CONST");
var RenderHelper_1 = require("../RenderHelper");
var NotImplementedError_1 = require("../../flash/errors/NotImplementedError");
var MathUtil_1 = require("../../glantern/MathUtil");
var SolidStrokeRenderer = (function (_super) {
    __extends(SolidStrokeRenderer, _super);
    function SolidStrokeRenderer(graphics, lastPathStartX, lastPathStartY, currentX, currentY, lineWidth, color, alpha) {
        _super.call(this, graphics, lastPathStartX, lastPathStartY, currentX, currentY);
        this._r = 0;
        this._g = 0;
        this._b = 0;
        this._a = 1;
        this._w = 1;
        this._a = MathUtil_1.MathUtil.clamp(alpha, 0, 1);
        this._r = ((color >>> 16) & 0xff) / 0xff;
        this._g = ((color >>> 8) & 0xff) / 0xff;
        this._b = (color & 0xff) / 0xff;
        this._w = lineWidth;
    }
    SolidStrokeRenderer.prototype.bezierCurveTo = function (cx1, cy1, cx2, cy2, x, y) {
        if (this._w > 0) {
            this._isDirty = true;
            var dt1, dt2, dt3;
            var t2, t3;
            var fromX = this._currentX, fromY = this._currentY;
            var xa, ya;
            var j;
            for (var i = 1; i <= GRAPHICS_CONST_1.CURVE_ACCURACY; i++) {
                j = i / GRAPHICS_CONST_1.CURVE_ACCURACY;
                dt1 = 1 - j;
                dt2 = dt1 * dt1;
                dt3 = dt2 * dt1;
                t2 = j * j;
                t3 = t2 * j;
                xa = dt3 * fromX + 3 * dt2 * j * cx1 + 3 * dt1 * t2 * cx2 + t3 * x;
                ya = dt3 * fromY + 3 * dt2 * j * cy1 + 3 * dt1 * t2 * cy2 + t3 * y;
                this.lineTo(xa, ya);
            }
        }
        this._currentX = x;
        this._currentY = y;
    };
    SolidStrokeRenderer.prototype.curveTo = function (cx, cy, x, y) {
        if (this._w > 0) {
            this._isDirty = true;
            var j;
            var fromX = this._currentX, fromY = this._currentY;
            var xa, ya;
            for (var i = 1; i <= GRAPHICS_CONST_1.CURVE_ACCURACY; i++) {
                j = i / GRAPHICS_CONST_1.CURVE_ACCURACY;
                xa = fromX + (cx - fromX) * j;
                ya = fromY + (cy - fromY) * j;
                xa = xa + (cx + (x - cx) * j - xa) * j;
                ya = ya + (cy + (y - cy) * j - ya) * j;
                this.lineTo(xa, ya);
            }
        }
        this._currentX = x;
        this._currentY = y;
    };
    SolidStrokeRenderer.prototype.drawCircle = function (x, y, radius) {
        this.moveTo(x - radius, y);
        if (this._w > 0) {
            this._isDirty = true;
            var thetaNext;
            var thetaBegin;
            var x2, y2;
            var halfPi = Math.PI / 2;
            thetaBegin = Math.PI;
            // Draw 4 segments of arcs, [-PI, -PI/2] [-PI/2, 0] [0, PI/2] [PI/2 PI]
            for (var k = 0; k < 4; k++) {
                for (var i = 1; i <= GRAPHICS_CONST_1.CURVE_ACCURACY; i++) {
                    thetaNext = thetaBegin - i / GRAPHICS_CONST_1.CURVE_ACCURACY * halfPi;
                    x2 = x + radius * Math.cos(thetaNext);
                    y2 = y + radius * Math.sin(thetaNext);
                    this.lineTo(x2, y2);
                }
                thetaBegin -= halfPi;
            }
        }
        this._currentX = x + radius;
        this._currentY = y;
        this._lastPathStartX = x + radius;
        this._lastPathStartY = y;
    };
    SolidStrokeRenderer.prototype.drawEllipse = function (x, y, width, height) {
        this.moveTo(x, y + height / 2);
        if (this._w > 0) {
            this._isDirty = true;
            var thetaNext;
            var thetaBegin;
            var centerX = x + width / 2, centerY = y + height / 2;
            var x2, y2;
            var halfPi = Math.PI / 2;
            thetaBegin = Math.PI;
            // Draw 4 segments of arcs, [-PI, -PI/2] [-PI/2, 0] [0, PI/2] [PI/2 PI]
            // Brute, huh? Luckily there are 20 segments per PI/2...
            for (var k = 0; k < 4; k++) {
                for (var i = 1; i <= GRAPHICS_CONST_1.CURVE_ACCURACY; i++) {
                    thetaNext = thetaBegin - i / GRAPHICS_CONST_1.CURVE_ACCURACY * halfPi;
                    x2 = centerX + width / 2 * Math.cos(thetaNext);
                    y2 = centerY + height / 2 * Math.sin(thetaNext);
                    this.lineTo(x2, y2);
                }
                thetaBegin -= halfPi;
            }
        }
        this._currentX = x + width;
        this._currentY = y + height / 2;
        this._lastPathStartX = x + width;
        this._lastPathStartY = y + height / 2;
    };
    SolidStrokeRenderer.prototype.drawRect = function (x, y, width, height) {
        this._isDirty = true;
        this.moveTo(x, y);
        this.lineTo(x, y + height);
        this.lineTo(x + width, y + height);
        this.lineTo(x + width, y);
        this.lineTo(x, y);
    };
    SolidStrokeRenderer.prototype.drawRoundRect = function (x, y, width, height, ellipseWidth, ellipseHeight) {
        if (ellipseHeight === void 0) { ellipseHeight = NaN; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    SolidStrokeRenderer.prototype.lineTo = function (x, y) {
        if (this._w > 0) {
            this._isDirty = true;
            var vertices = this._$getSimLineVertices(this._currentX, this._currentY, x, y, GRAPHICS_CONST_1.STD_Z, this._w);
            if (vertices.length > 0) {
                // Generated 4 vertices, matching with 6 indices (2 triangles)
                var cur = this._vertices.length / 3;
                for (var i = 0; i < 12; i++) {
                    this._vertices.push(vertices[i]);
                }
                for (var i = 0; i < 4; i++) {
                    this._colors.push(this._r * this._a, this._g * this._a, this._b * this._a, this._a);
                }
                this._indices.push(cur, cur + 1, cur + 2, cur + 1, cur + 2, cur + 3);
                this._hasDrawnAnything = true;
            }
        }
        this._currentX = x;
        this._currentY = y;
    };
    SolidStrokeRenderer.prototype.render = function (renderer) {
        if (this._vertices.length > 0) {
            var target = renderer.currentRenderTarget;
            RenderHelper_1.RenderHelper.renderPrimitives2(renderer, target, this._vertexBuffer, this._colorBuffer, this._indexBuffer, false, target.isRoot, false);
        }
    };
    return SolidStrokeRenderer;
}(StrokeRendererBase_1.StrokeRendererBase));
exports.SolidStrokeRenderer = SolidStrokeRenderer;



},{"../../flash/errors/NotImplementedError":51,"../../glantern/MathUtil":95,"../RenderHelper":107,"./GRAPHICS_CONST":126,"./StrokeRendererBase":130}],130:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GraphicsDataRendererBase_1 = require("./GraphicsDataRendererBase");
var StrokeRendererBase = (function (_super) {
    __extends(StrokeRendererBase, _super);
    function StrokeRendererBase(graphics, lastPathStartX, lastPathStartY, currentX, currentY) {
        _super.call(this, graphics, lastPathStartX, lastPathStartY, currentX, currentY);
        this._lineVerticesStorage = null;
        this._lineVerticesStorage = [[0, 0], [0, 0], [0, 0], [0, 0]];
    }
    StrokeRendererBase.prototype.moveTo = function (x, y) {
        // This action seems weird...
        if (this._graphics.isFilling) {
            this.closePath();
        }
        this._currentX = x;
        this._currentY = y;
        this._lastPathStartX = x;
        this._lastPathStartY = y;
    };
    StrokeRendererBase.prototype._$getSimLineVertices = function (x1, y1, x2, y2, z, width) {
        if (width < 0) {
            return [];
        }
        var halfWidth = width / 2;
        var vert1 = this._lineVerticesStorage[0], vert2 = this._lineVerticesStorage[1], vert3 = this._lineVerticesStorage[2], vert4 = this._lineVerticesStorage[3];
        if (x1 === x2) {
            vert1[0] = x1 - halfWidth;
            vert1[1] = y1 > y2 ? y1 + halfWidth : y1 - halfWidth;
            vert2[0] = x1 + halfWidth;
            vert2[1] = y1 > y2 ? y1 + halfWidth : y1 - halfWidth;
            vert3[0] = x2 - halfWidth;
            vert3[1] = y1 > y2 ? y2 - halfWidth : y2 + halfWidth;
            vert4[0] = x2 + halfWidth;
            vert4[1] = y1 > y2 ? y2 - halfWidth : y2 + halfWidth;
        }
        else {
            var slope = (y2 - y1) / (x2 - x1);
            var ct = 1 / Math.sqrt(1 + slope * slope);
            var st = Math.sqrt(1 - ct * ct);
            // dx/dy: additional length considering the line width perpendicular to the line itself
            var dx = halfWidth * st;
            var dy = halfWidth * ct;
            // dtx/dty: additional length considering the line width at end points
            var dtx = dy;
            var dty = dx;
            // move the line to their new end points
            if (x1 > x2) {
                x1 += dtx;
                x2 -= dtx;
            }
            else {
                x1 -= dtx;
                x2 += dtx;
            }
            if (y1 > y2) {
                y1 += dty;
                y2 -= dty;
            }
            else {
                y1 -= dty;
                y2 += dty;
            }
            // and calculate simulating rectangle
            vert1[0] = x1 - dx;
            vert2[0] = x1 + dx;
            vert3[0] = x2 - dx;
            vert4[0] = x2 + dx;
            if (slope >= 0) {
                vert1[1] = y1 + dy;
                vert2[1] = y1 - dy;
                vert3[1] = y2 + dy;
                vert4[1] = y2 - dy;
            }
            else {
                vert1[1] = y1 - dy;
                vert2[1] = y1 + dy;
                vert3[1] = y2 - dy;
                vert4[1] = y2 + dy;
            }
        }
        return [
            vert1[0], vert1[1], z, vert2[0], vert2[1], z,
            vert3[0], vert3[1], z, vert4[0], vert4[1], z
        ];
    };
    return StrokeRendererBase;
}(GraphicsDataRendererBase_1.GraphicsDataRendererBase));
exports.StrokeRendererBase = StrokeRendererBase;



},{"./GraphicsDataRendererBase":127}],131:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./AttributeCache"));
__export(require("./FilterBase"));
__export(require("./FilterManager"));
__export(require("./FragmentShaders"));
__export(require("./PackedArrayBuffer"));
__export(require("./RenderHelper"));
__export(require("./RenderTarget2D"));
__export(require("./ShaderBase"));
__export(require("./ShaderID"));
__export(require("./ShaderManager"));
__export(require("./UniformCache"));
__export(require("./VertexShaders"));
__export(require("./WebGLDataType"));
__export(require("./WebGLRenderer"));
__export(require("./WebGLUtils"));
var filters = require("./filters/index");
exports.filters = filters;
var shaders = require("./shaders/index");
exports.shaders = shaders;



},{"./AttributeCache":102,"./FilterBase":103,"./FilterManager":104,"./FragmentShaders":105,"./PackedArrayBuffer":106,"./RenderHelper":107,"./RenderTarget2D":108,"./ShaderBase":109,"./ShaderID":110,"./ShaderManager":111,"./UniformCache":112,"./VertexShaders":113,"./WebGLDataType":114,"./WebGLRenderer":115,"./WebGLUtils":116,"./filters/index":123,"./shaders/index":142}],132:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/22.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UniformCache_1 = require("../UniformCache");
var VertexShaders_1 = require("../VertexShaders");
var FragmentShaders_1 = require("../FragmentShaders");
var BufferedShader_1 = require("./BufferedShader");
var WebGLDataType_1 = require("../WebGLDataType");
var Blur2Shader = (function (_super) {
    __extends(Blur2Shader, _super);
    function Blur2Shader(manager) {
        _super.call(this, manager, Blur2Shader.VERTEX_SOURCE, Blur2Shader.FRAGMENT_SOURCE);
    }
    Blur2Shader.prototype.setStrength = function (strength) {
        if (strength < 0) {
            strength = 1;
        }
        this._uniforms.get("uStrength").value = strength;
    };
    Blur2Shader.prototype.getStrength = function () {
        return this._uniforms.get("uStrength").value;
    };
    Blur2Shader.prototype.setResolution = function (resolution) {
        if (resolution < 0) {
            resolution = 1;
        }
        this._uniforms.get("uResolution").value = resolution;
    };
    Blur2Shader.prototype.setBlurDirection = function (direction) {
        this._uniforms.get("uBlurDirection").value = [direction[0], direction[1]];
    };
    Blur2Shader.prototype._$localInit = function (manager, uniforms, attributes) {
        _super.prototype._$localInit.call(this, manager, uniforms, attributes);
        var u;
        u = new UniformCache_1.UniformCache();
        u.name = "uStrength";
        u.type = WebGLDataType_1.WebGLDataType.U1F;
        u.value = 5;
        uniforms.set(u.name, u);
        u = new UniformCache_1.UniformCache();
        u.name = "uResolution";
        u.type = WebGLDataType_1.WebGLDataType.U1F;
        u.value = 1;
        uniforms.set(u.name, u);
        u = new UniformCache_1.UniformCache();
        u.name = "uBlurDirection";
        u.type = WebGLDataType_1.WebGLDataType.U2F;
        u.value = [1.0, 0.0];
        uniforms.set(u.name, u);
    };
    Blur2Shader.SHADER_CLASS_NAME = "Blur2Shader";
    Blur2Shader.FRAGMENT_SOURCE = FragmentShaders_1.FragmentShaders.blur2;
    Blur2Shader.VERTEX_SOURCE = VertexShaders_1.VertexShaders.blur2;
    return Blur2Shader;
}(BufferedShader_1.BufferedShader));
exports.Blur2Shader = Blur2Shader;



},{"../FragmentShaders":105,"../UniformCache":112,"../VertexShaders":113,"../WebGLDataType":114,"./BufferedShader":135}],133:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UniformCache_1 = require("../UniformCache");
var VertexShaders_1 = require("../VertexShaders");
var FragmentShaders_1 = require("../FragmentShaders");
var BufferedShader_1 = require("./BufferedShader");
var WebGLDataType_1 = require("../WebGLDataType");
var BlurXShader = (function (_super) {
    __extends(BlurXShader, _super);
    function BlurXShader(manager) {
        _super.call(this, manager, BlurXShader.VERTEX_SOURCE, BlurXShader.FRAGMENT_SOURCE);
    }
    BlurXShader.prototype.setStrength = function (strength) {
        if (strength < 0) {
            strength = 1;
        }
        this._uniforms.get("uStrength").value = strength;
    };
    BlurXShader.prototype.getStrength = function () {
        return this._uniforms.get("uStrength").value;
    };
    BlurXShader.prototype._$localInit = function (manager, uniforms, attributes) {
        _super.prototype._$localInit.call(this, manager, uniforms, attributes);
        var u;
        u = new UniformCache_1.UniformCache();
        u.name = "uStrength";
        u.type = WebGLDataType_1.WebGLDataType.U1F;
        u.value = 5;
        uniforms.set(u.name, u);
    };
    BlurXShader.SHADER_CLASS_NAME = "BlurXShader";
    BlurXShader.FRAGMENT_SOURCE = FragmentShaders_1.FragmentShaders.blur;
    BlurXShader.VERTEX_SOURCE = VertexShaders_1.VertexShaders.blurX;
    return BlurXShader;
}(BufferedShader_1.BufferedShader));
exports.BlurXShader = BlurXShader;



},{"../FragmentShaders":105,"../UniformCache":112,"../VertexShaders":113,"../WebGLDataType":114,"./BufferedShader":135}],134:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UniformCache_1 = require("../UniformCache");
var VertexShaders_1 = require("../VertexShaders");
var FragmentShaders_1 = require("../FragmentShaders");
var BufferedShader_1 = require("./BufferedShader");
var WebGLDataType_1 = require("../WebGLDataType");
var BlurYShader = (function (_super) {
    __extends(BlurYShader, _super);
    function BlurYShader(manager) {
        _super.call(this, manager, BlurYShader.VERTEX_SOURCE, BlurYShader.FRAGMENT_SOURCE);
    }
    BlurYShader.prototype.setStrength = function (strength) {
        if (strength < 0) {
            strength = 1;
        }
        this._uniforms.get("uStrength").value = strength;
    };
    BlurYShader.prototype.getStrength = function () {
        return this._uniforms.get("uStrength").value;
    };
    BlurYShader.prototype._$localInit = function (manager, uniforms, attributes) {
        _super.prototype._$localInit.call(this, manager, uniforms, attributes);
        var u;
        u = new UniformCache_1.UniformCache();
        u.name = "uStrength";
        u.type = WebGLDataType_1.WebGLDataType.U1F;
        u.value = 5;
        uniforms.set(u.name, u);
    };
    BlurYShader.SHADER_CLASS_NAME = "BlurYShader";
    BlurYShader.FRAGMENT_SOURCE = FragmentShaders_1.FragmentShaders.blur;
    BlurYShader.VERTEX_SOURCE = VertexShaders_1.VertexShaders.blurY;
    return BlurYShader;
}(BufferedShader_1.BufferedShader));
exports.BlurYShader = BlurYShader;



},{"../FragmentShaders":105,"../UniformCache":112,"../VertexShaders":113,"../WebGLDataType":114,"./BufferedShader":135}],135:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Matrix3D_1 = require("../../flash/geom/Matrix3D");
var UniformCache_1 = require("../UniformCache");
var VertexShaders_1 = require("../VertexShaders");
var FragmentShaders_1 = require("../FragmentShaders");
var ShaderBase_1 = require("../ShaderBase");
var WebGLDataType_1 = require("../WebGLDataType");
var BufferedShader = (function (_super) {
    __extends(BufferedShader, _super);
    function BufferedShader(manager, vertexSource, fragmentSource) {
        _super.call(this, manager, vertexSource, fragmentSource, null, null);
    }
    BufferedShader.prototype.setTexture = function (texture) {
        // Must contains a "uSampler" uniform.
        this._uniforms.get("uSampler").texture = texture;
    };
    BufferedShader.prototype._$localInit = function (manager, uniforms, attributes) {
        _super.prototype._$localInit.call(this, manager, uniforms, attributes);
        var u;
        var projectionMatrix = new Matrix3D_1.Matrix3D();
        var w = manager.renderer.view.width;
        var h = manager.renderer.view.height;
        projectionMatrix.setOrthographicProjection(0, w, h, 0, -1000, 1000);
        u = new UniformCache_1.UniformCache();
        u.name = "uSampler";
        u.type = WebGLDataType_1.WebGLDataType.USampler2D;
        u.value = 0;
        u.texture = null;
        uniforms.set(u.name, u);
        u = new UniformCache_1.UniformCache();
        u.name = "uProjectionMatrix";
        u.type = WebGLDataType_1.WebGLDataType.UMat4;
        u.value = projectionMatrix.toArray();
        u.transpose = false;
        uniforms.set(u.name, u);
    };
    BufferedShader.SHADER_CLASS_NAME = "BufferedShader";
    BufferedShader.FRAGMENT_SOURCE = FragmentShaders_1.FragmentShaders.buffered;
    BufferedShader.VERTEX_SOURCE = VertexShaders_1.VertexShaders.buffered;
    return BufferedShader;
}(ShaderBase_1.ShaderBase));
exports.BufferedShader = BufferedShader;



},{"../../flash/geom/Matrix3D":63,"../FragmentShaders":105,"../ShaderBase":109,"../UniformCache":112,"../VertexShaders":113,"../WebGLDataType":114}],136:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UniformCache_1 = require("../UniformCache");
var VertexShaders_1 = require("../VertexShaders");
var FragmentShaders_1 = require("../FragmentShaders");
var BufferedShader_1 = require("./BufferedShader");
var WebGLDataType_1 = require("../WebGLDataType");
var ColorTransformShader = (function (_super) {
    __extends(ColorTransformShader, _super);
    function ColorTransformShader(manager) {
        _super.call(this, manager, ColorTransformShader.VERTEX_SOURCE, ColorTransformShader.FRAGMENT_SOURCE);
    }
    ColorTransformShader.prototype.setColorMatrix = function (r4c5) {
        if (r4c5.length < 20) {
            console.warn("ColorTransformShader.setColorMatrix needs a 4x5 matrix.");
            return;
        }
        this._uniforms.get("uColorMatrix").value = r4c5.slice();
    };
    ColorTransformShader.prototype._$localInit = function (manager, uniforms, attributes) {
        _super.prototype._$localInit.call(this, manager, uniforms, attributes);
        var u;
        var defaultColorMatrix = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        u = new UniformCache_1.UniformCache();
        u.name = "uColorMatrix";
        u.type = WebGLDataType_1.WebGLDataType.U1FV;
        u.value = defaultColorMatrix;
        uniforms.set(u.name, u);
    };
    ColorTransformShader.SHADER_CLASS_NAME = "ColorTransformShader";
    ColorTransformShader.FRAGMENT_SOURCE = FragmentShaders_1.FragmentShaders.colorTransform;
    ColorTransformShader.VERTEX_SOURCE = VertexShaders_1.VertexShaders.buffered;
    return ColorTransformShader;
}(BufferedShader_1.BufferedShader));
exports.ColorTransformShader = ColorTransformShader;



},{"../FragmentShaders":105,"../UniformCache":112,"../VertexShaders":113,"../WebGLDataType":114,"./BufferedShader":135}],137:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/23.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UniformCache_1 = require("../UniformCache");
var VertexShaders_1 = require("../VertexShaders");
var FragmentShaders_1 = require("../FragmentShaders");
var BufferedShader_1 = require("./BufferedShader");
var WebGLDataType_1 = require("../WebGLDataType");
var Matrix3D_1 = require("../../flash/geom/Matrix3D");
var CopyImageShader = (function (_super) {
    __extends(CopyImageShader, _super);
    function CopyImageShader(manager) {
        _super.call(this, manager, CopyImageShader.VERTEX_SOURCE, CopyImageShader.FRAGMENT_SOURCE);
    }
    CopyImageShader.prototype.setFlipX = function (flip) {
        this._uniforms.get("uFlipX").value = flip;
    };
    CopyImageShader.prototype.setFlipY = function (flip) {
        this._uniforms.get("uFlipY").value = flip;
    };
    CopyImageShader.prototype.setOriginalSize = function (xy) {
        this._uniforms.get("uOriginalSize").value = xy.slice();
    };
    CopyImageShader.prototype.setFitSize = function (xy) {
        this._uniforms.get("uFitSize").value = xy.slice();
    };
    CopyImageShader.prototype.setAlpha = function (alpha) {
        this._uniforms.get("uAlpha").value = alpha;
    };
    CopyImageShader.prototype.setTransform = function (matrix) {
        this._uniforms.get("uTransformMatrix").value = matrix.toArray();
    };
    CopyImageShader.prototype._$localInit = function (manager, uniforms, attributes) {
        _super.prototype._$localInit.call(this, manager, uniforms, attributes);
        var u;
        var transformMatrix = new Matrix3D_1.Matrix3D();
        transformMatrix.identity();
        u = new UniformCache_1.UniformCache();
        u.name = "uFlipX";
        u.type = WebGLDataType_1.WebGLDataType.UBool;
        u.value = false;
        uniforms.set(u.name, u);
        u = new UniformCache_1.UniformCache();
        u.name = "uFlipY";
        u.type = WebGLDataType_1.WebGLDataType.UBool;
        u.value = false;
        uniforms.set(u.name, u);
        u = new UniformCache_1.UniformCache();
        u.name = "uOriginalSize";
        u.type = WebGLDataType_1.WebGLDataType.U2F;
        u.value = [0, 0];
        uniforms.set(u.name, u);
        u = new UniformCache_1.UniformCache();
        u.name = "uFitSize";
        u.type = WebGLDataType_1.WebGLDataType.U2F;
        u.value = [0, 0];
        uniforms.set(u.name, u);
        u = new UniformCache_1.UniformCache();
        u.name = "uTransformMatrix";
        u.type = WebGLDataType_1.WebGLDataType.UMat4;
        u.value = transformMatrix.toArray();
        u.transpose = false;
        uniforms.set(u.name, u);
        u = new UniformCache_1.UniformCache();
        u.name = "uAlpha";
        u.type = WebGLDataType_1.WebGLDataType.U1F;
        u.value = 1;
        uniforms.set(u.name, u);
    };
    CopyImageShader.SHADER_CLASS_NAME = "CopyImageShader";
    CopyImageShader.FRAGMENT_SOURCE = FragmentShaders_1.FragmentShaders.copyImage;
    CopyImageShader.VERTEX_SOURCE = VertexShaders_1.VertexShaders.copyImage;
    return CopyImageShader;
}(BufferedShader_1.BufferedShader));
exports.CopyImageShader = CopyImageShader;



},{"../../flash/geom/Matrix3D":63,"../FragmentShaders":105,"../UniformCache":112,"../VertexShaders":113,"../WebGLDataType":114,"./BufferedShader":135}],138:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UniformCache_1 = require("../UniformCache");
var VertexShaders_1 = require("../VertexShaders");
var FragmentShaders_1 = require("../FragmentShaders");
var BufferedShader_1 = require("./BufferedShader");
var WebGLDataType_1 = require("../WebGLDataType");
var FxaaShader = (function (_super) {
    __extends(FxaaShader, _super);
    function FxaaShader(manager) {
        _super.call(this, manager, FxaaShader.VERTEX_SOURCE, FxaaShader.FRAGMENT_SOURCE);
    }
    FxaaShader.prototype.setResolutionXY = function (xy) {
        this._uniforms.get("uResolution").value = xy.slice();
    };
    FxaaShader.prototype._$localInit = function (manager, uniforms, attributes) {
        _super.prototype._$localInit.call(this, manager, uniforms, attributes);
        var u;
        u = new UniformCache_1.UniformCache();
        u.name = "uResolution";
        u.type = WebGLDataType_1.WebGLDataType.U2F;
        u.value = [1, 1];
        uniforms.set(u.name, u);
    };
    FxaaShader.SHADER_CLASS_NAME = "FxaaShader";
    FxaaShader.FRAGMENT_SOURCE = FragmentShaders_1.FragmentShaders.fxaa;
    FxaaShader.VERTEX_SOURCE = VertexShaders_1.VertexShaders.fxaa;
    return FxaaShader;
}(BufferedShader_1.BufferedShader));
exports.FxaaShader = FxaaShader;



},{"../FragmentShaders":105,"../UniformCache":112,"../VertexShaders":113,"../WebGLDataType":114,"./BufferedShader":135}],139:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Matrix3D_1 = require("../../flash/geom/Matrix3D");
var UniformCache_1 = require("../UniformCache");
var VertexShaders_1 = require("../VertexShaders");
var FragmentShaders_1 = require("../FragmentShaders");
var ShaderBase_1 = require("../ShaderBase");
var WebGLDataType_1 = require("../WebGLDataType");
var Primitive2Shader = (function (_super) {
    __extends(Primitive2Shader, _super);
    function Primitive2Shader(manager) {
        _super.call(this, manager, Primitive2Shader.VERTEX_SOURCE, Primitive2Shader.FRAGMENT_SOURCE, null, null);
    }
    Primitive2Shader.prototype.setProjection = function (matrix) {
        this._uniforms.get("uProjectionMatrix").value = matrix.toArray();
    };
    Primitive2Shader.prototype.setTransform = function (matrix) {
        this._uniforms.get("uTransformMatrix").value = matrix.toArray();
    };
    Primitive2Shader.prototype.setAlpha = function (alpha) {
        this._uniforms.get("uAlpha").value = alpha;
    };
    Primitive2Shader.prototype.setFlipX = function (flip) {
        this._uniforms.get("uFlipX").value = flip;
    };
    Primitive2Shader.prototype.setFlipY = function (flip) {
        this._uniforms.get("uFlipY").value = flip;
    };
    Primitive2Shader.prototype.setOriginalSize = function (xy) {
        this._uniforms.get("uOriginalSize").value = xy.slice();
    };
    Primitive2Shader.prototype._$localInit = function (manager, uniforms, attributes) {
        _super.prototype._$localInit.call(this, manager, uniforms, attributes);
        var u;
        var transformMatrix = new Matrix3D_1.Matrix3D();
        var projectionMatrix = new Matrix3D_1.Matrix3D();
        var w = manager.renderer.view.width;
        var h = manager.renderer.view.height;
        projectionMatrix.setOrthographicProjection(0, w, h, 0, -1000, 1000);
        u = new UniformCache_1.UniformCache();
        u.name = "uProjectionMatrix";
        u.type = WebGLDataType_1.WebGLDataType.UMat4;
        u.value = projectionMatrix.toArray();
        u.transpose = false;
        uniforms.set(u.name, u);
        u = new UniformCache_1.UniformCache();
        u.name = "uTransformMatrix";
        u.type = WebGLDataType_1.WebGLDataType.UMat4;
        u.value = transformMatrix.toArray();
        u.transpose = false;
        uniforms.set(u.name, u);
        u = new UniformCache_1.UniformCache();
        u.name = "uAlpha";
        u.type = WebGLDataType_1.WebGLDataType.U1F;
        u.value = 1;
        uniforms.set(u.name, u);
        u = new UniformCache_1.UniformCache();
        u.name = "uFlipX";
        u.type = WebGLDataType_1.WebGLDataType.UBool;
        u.value = false;
        uniforms.set(u.name, u);
        u = new UniformCache_1.UniformCache();
        u.name = "uFlipY";
        u.type = WebGLDataType_1.WebGLDataType.UBool;
        u.value = false;
        uniforms.set(u.name, u);
        u = new UniformCache_1.UniformCache();
        u.name = "uOriginalSize";
        u.type = WebGLDataType_1.WebGLDataType.U2F;
        u.value = [0, 0];
        uniforms.set(u.name, u);
    };
    Primitive2Shader.SHADER_CLASS_NAME = "Primitive2Shader";
    Primitive2Shader.FRAGMENT_SOURCE = FragmentShaders_1.FragmentShaders.primitive;
    Primitive2Shader.VERTEX_SOURCE = VertexShaders_1.VertexShaders.primitive2;
    return Primitive2Shader;
}(ShaderBase_1.ShaderBase));
exports.Primitive2Shader = Primitive2Shader;



},{"../../flash/geom/Matrix3D":63,"../FragmentShaders":105,"../ShaderBase":109,"../UniformCache":112,"../VertexShaders":113,"../WebGLDataType":114}],140:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Matrix3D_1 = require("../../flash/geom/Matrix3D");
var UniformCache_1 = require("../UniformCache");
var VertexShaders_1 = require("../VertexShaders");
var FragmentShaders_1 = require("../FragmentShaders");
var ShaderBase_1 = require("../ShaderBase");
var WebGLDataType_1 = require("../WebGLDataType");
var PrimitiveShader = (function (_super) {
    __extends(PrimitiveShader, _super);
    function PrimitiveShader(manager) {
        _super.call(this, manager, PrimitiveShader.VERTEX_SOURCE, PrimitiveShader.FRAGMENT_SOURCE, null, null);
    }
    PrimitiveShader.prototype.setProjection = function (matrix) {
        this._uniforms.get("uProjectionMatrix").value = matrix.toArray();
    };
    PrimitiveShader.prototype.setTransform = function (matrix) {
        this._uniforms.get("uTransformMatrix").value = matrix.toArray();
    };
    PrimitiveShader.prototype.setAlpha = function (alpha) {
        this._uniforms.get("uAlpha").value = alpha;
    };
    PrimitiveShader.prototype._$localInit = function (manager, uniforms, attributes) {
        _super.prototype._$localInit.call(this, manager, uniforms, attributes);
        var u;
        var transformMatrix = new Matrix3D_1.Matrix3D();
        var projectionMatrix = new Matrix3D_1.Matrix3D();
        var w = manager.renderer.view.width;
        var h = manager.renderer.view.height;
        projectionMatrix.setOrthographicProjection(0, w, h, 0, -1000, 1000);
        u = new UniformCache_1.UniformCache();
        u.name = "uProjectionMatrix";
        u.type = WebGLDataType_1.WebGLDataType.UMat4;
        u.value = projectionMatrix.toArray();
        u.transpose = false;
        uniforms.set(u.name, u);
        u = new UniformCache_1.UniformCache();
        u.name = "uTransformMatrix";
        u.type = WebGLDataType_1.WebGLDataType.UMat4;
        u.value = transformMatrix.toArray();
        u.transpose = false;
        uniforms.set(u.name, u);
        u = new UniformCache_1.UniformCache();
        u.name = "uAlpha";
        u.type = WebGLDataType_1.WebGLDataType.U1F;
        u.value = 1;
        uniforms.set(u.name, u);
    };
    PrimitiveShader.SHADER_CLASS_NAME = "PrimitiveShader";
    PrimitiveShader.FRAGMENT_SOURCE = FragmentShaders_1.FragmentShaders.primitive;
    PrimitiveShader.VERTEX_SOURCE = VertexShaders_1.VertexShaders.primitive;
    return PrimitiveShader;
}(ShaderBase_1.ShaderBase));
exports.PrimitiveShader = PrimitiveShader;



},{"../../flash/geom/Matrix3D":63,"../FragmentShaders":105,"../ShaderBase":109,"../UniformCache":112,"../VertexShaders":113,"../WebGLDataType":114}],141:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UniformCache_1 = require("../UniformCache");
var VertexShaders_1 = require("../VertexShaders");
var FragmentShaders_1 = require("../FragmentShaders");
var BufferedShader_1 = require("./BufferedShader");
var WebGLDataType_1 = require("../WebGLDataType");
var ReplicateShader = (function (_super) {
    __extends(ReplicateShader, _super);
    function ReplicateShader(manager) {
        _super.call(this, manager, ReplicateShader.VERTEX_SOURCE, ReplicateShader.FRAGMENT_SOURCE);
    }
    ReplicateShader.prototype.setFlipX = function (flip) {
        this._uniforms.get("uFlipX").value = flip;
    };
    ReplicateShader.prototype.setFlipY = function (flip) {
        this._uniforms.get("uFlipY").value = flip;
    };
    ReplicateShader.prototype.setOriginalSize = function (xy) {
        this._uniforms.get("uOriginalSize").value = xy.slice();
    };
    ReplicateShader.prototype.setFitSize = function (xy) {
        this._uniforms.get("uFitSize").value = xy.slice();
    };
    ReplicateShader.prototype._$localInit = function (manager, uniforms, attributes) {
        _super.prototype._$localInit.call(this, manager, uniforms, attributes);
        var u;
        u = new UniformCache_1.UniformCache();
        u.name = "uFlipX";
        u.type = WebGLDataType_1.WebGLDataType.UBool;
        u.value = false;
        uniforms.set(u.name, u);
        u = new UniformCache_1.UniformCache();
        u.name = "uFlipY";
        u.type = WebGLDataType_1.WebGLDataType.UBool;
        u.value = false;
        uniforms.set(u.name, u);
        u = new UniformCache_1.UniformCache();
        u.name = "uOriginalSize";
        u.type = WebGLDataType_1.WebGLDataType.U2F;
        u.value = [0, 0];
        uniforms.set(u.name, u);
        u = new UniformCache_1.UniformCache();
        u.name = "uFitSize";
        u.type = WebGLDataType_1.WebGLDataType.U2F;
        u.value = [0, 0];
        uniforms.set(u.name, u);
    };
    ReplicateShader.SHADER_CLASS_NAME = "ReplicateShader";
    ReplicateShader.FRAGMENT_SOURCE = FragmentShaders_1.FragmentShaders.buffered;
    ReplicateShader.VERTEX_SOURCE = VertexShaders_1.VertexShaders.replicate;
    return ReplicateShader;
}(BufferedShader_1.BufferedShader));
exports.ReplicateShader = ReplicateShader;



},{"../FragmentShaders":105,"../UniformCache":112,"../VertexShaders":113,"../WebGLDataType":114,"./BufferedShader":135}],142:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./BlurXShader"));
__export(require("./BlurYShader"));
__export(require("./BufferedShader"));
__export(require("./ColorTransformShader"));
__export(require("./FxaaShader"));
__export(require("./PrimitiveShader"));
__export(require("./ReplicateShader"));
__export(require("./Blur2Shader"));
__export(require("./CopyImageShader"));



},{"./Blur2Shader":132,"./BlurXShader":133,"./BlurYShader":134,"./BufferedShader":135,"./ColorTransformShader":136,"./CopyImageShader":137,"./FxaaShader":138,"./PrimitiveShader":140,"./ReplicateShader":141}],143:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/29.
 */
"use strict";
var Display_1 = require("./danmaku_api/Display");
var Global_1 = require("./danmaku_api/Global");
var Functions_1 = require("./danmaku_api/Functions");
var Utils_1 = require("./danmaku_api/Utils");
var Bitmap_1 = require("./danmaku_api/Bitmap");
var Player_1 = require("./danmaku_api/Player");
var ScriptManager_1 = require("./danmaku_api/ScriptManager");
var Storage_1 = require("./danmaku_api/Storage");
var Tween_1 = require("./danmaku_api/Tween");
var BiliBiliDanmakuApiContainer = (function () {
    function BiliBiliDanmakuApiContainer(scriptedDanmaku) {
        this._codeDanmaku = null;
        this._engine = null;
        this._api = null;
        this._codeDanmaku = scriptedDanmaku;
        this._engine = scriptedDanmaku.engine;
        this.__initializeApi();
    }
    Object.defineProperty(BiliBiliDanmakuApiContainer.prototype, "engine", {
        get: function () {
            return this._engine;
        },
        enumerable: true,
        configurable: true
    });
    BiliBiliDanmakuApiContainer.prototype.__initializeApi = function () {
        var api = Object.create(null);
        api.$ = api.Display = new Display_1.Display(this);
        api.$G = api.Global = new Global_1.Global(this);
        api.Bitmap = new Bitmap_1.Bitmap(this);
        api.Player = new Player_1.Player(this);
        api.ScriptManager = new ScriptManager_1.ScriptManager(this);
        api.Storage = new Storage_1.Storage(this);
        api.Tween = new Tween_1.Tween(this);
        api.Utils = new Utils_1.Utils(this);
        var f = new Functions_1.Functions(this);
        api.trace = f.trace.bind(f);
        api.clear = f.clear.bind(f);
        api.getTimer = f.getTimer.bind(f);
        api.timer = f.timer.bind(f);
        api.interval = f.interval.bind(f);
        api.foreach = f.foreach.bind(f);
        api.clone = f.clone.bind(f);
        api.load = f.load.bind(f);
        this._api = api;
    };
    Object.defineProperty(BiliBiliDanmakuApiContainer.prototype, "api", {
        get: function () {
            return this._api;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BiliBiliDanmakuApiContainer.prototype, "danmaku", {
        get: function () {
            return this._codeDanmaku;
        },
        enumerable: true,
        configurable: true
    });
    return BiliBiliDanmakuApiContainer;
}());
exports.BiliBiliDanmakuApiContainer = BiliBiliDanmakuApiContainer;



},{"./danmaku_api/Bitmap":145,"./danmaku_api/Display":148,"./danmaku_api/Functions":149,"./danmaku_api/Global":150,"./danmaku_api/Player":152,"./danmaku_api/ScriptManager":154,"./danmaku_api/Storage":155,"./danmaku_api/Tween":156,"./danmaku_api/Utils":158}],144:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/29.
 */
"use strict";
var BiliBiliDamakuApiObject = (function () {
    function BiliBiliDamakuApiObject(apiContainer) {
        this._apiContainer = null;
        this._apiContainer = apiContainer;
    }
    Object.defineProperty(BiliBiliDamakuApiObject.prototype, "apiContainer", {
        get: function () {
            return this._apiContainer;
        },
        enumerable: true,
        configurable: true
    });
    BiliBiliDamakuApiObject.prototype._$getExtraCreateParams = function () {
        var api = this.apiContainer;
        var r = Object.create(null);
        r.engine = api.engine;
        r.bornTime = r.engine.videoMillis;
        r.creator = api.danmaku;
        return r;
    };
    return BiliBiliDamakuApiObject;
}());
exports.BiliBiliDamakuApiObject = BiliBiliDamakuApiObject;



},{}],145:[function(require,module,exports){
/**
 * Created by MIC on 2016/1/7.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BiliBiliDamakuApiObject_1 = require("./BiliBiliDamakuApiObject");
var NotImplementedError_1 = require("../../../../lib/glantern/src/gl/flash/errors/NotImplementedError");
var Rectangle_1 = require("../../../../lib/glantern/src/gl/flash/geom/Rectangle");
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
}(BiliBiliDamakuApiObject_1.BiliBiliDamakuApiObject));
exports.Bitmap = Bitmap;



},{"../../../../lib/glantern/src/gl/flash/errors/NotImplementedError":51,"../../../../lib/glantern/src/gl/flash/geom/Rectangle":67,"./BiliBiliDamakuApiObject":144}],146:[function(require,module,exports){
/**
 * Created by MIC on 2016/1/7.
 */
"use strict";
var CommentBitmap = (function () {
    function CommentBitmap() {
    }
    return CommentBitmap;
}());
exports.CommentBitmap = CommentBitmap;



},{}],147:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/29.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DCOHelper_1 = require("../../danmaku/scripted/dco/DCOHelper");
var TextField_1 = require("../../../../lib/glantern/src/gl/flash/text/TextField");
var CommentField = (function (_super) {
    __extends(CommentField, _super);
    function CommentField(root, parent, createParams, extraCreateParams) {
        _super.call(this, root, parent);
        this._extraCreateParams = null;
        this._createParams = null;
        this._createParams = DCOHelper_1.DCOHelper.fillInCreateParams(extraCreateParams.engine, this, createParams);
        this._extraCreateParams = extraCreateParams;
        DCOHelper_1.DCOHelper.applyGeneralCreateParams(this, this._createParams);
    }
    Object.defineProperty(CommentField.prototype, "createParams", {
        get: function () {
            return this._createParams;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommentField.prototype, "extraCreateParams", {
        get: function () {
            return this._extraCreateParams;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommentField.prototype, "isCreatedByDanmaku", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    return CommentField;
}(TextField_1.TextField));
exports.CommentField = CommentField;



},{"../../../../lib/glantern/src/gl/flash/text/TextField":77,"../../danmaku/scripted/dco/DCOHelper":180}],148:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/29.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BiliBiliDamakuApiObject_1 = require("./BiliBiliDamakuApiObject");
var DCShape_1 = require("../../danmaku/scripted/dco/DCShape");
var CommentField_1 = require("./CommentField");
var Matrix_1 = require("../../../../lib/glantern/src/gl/flash/geom/Matrix");
var Point_1 = require("../../../../lib/glantern/src/gl/flash/geom/Point");
var BitmapFilterQuality_1 = require("../../../../lib/glantern/src/gl/flash/filters/BitmapFilterQuality");
var GlowFilter_1 = require("../../../../lib/glantern/src/gl/flash/filters/GlowFilter");
var BlurFilter_1 = require("../../../../lib/glantern/src/gl/flash/filters/BlurFilter");
var Vector3D_1 = require("../../../../lib/glantern/src/gl/flash/geom/Vector3D");
var Matrix3D_1 = require("../../../../lib/glantern/src/gl/flash/geom/Matrix3D");
var ColorTransform_1 = require("../../../../lib/glantern/src/gl/flash/geom/ColorTransform");
var TextFormat_1 = require("../../../../lib/glantern/src/gl/flash/text/TextFormat");
var NotImplementedError_1 = require("../../../../lib/glantern/src/gl/flash/errors/NotImplementedError");
var GLUtil_1 = require("../../../../lib/glantern/src/gl/glantern/GLUtil");
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
            return this.apiContainer.engine.view.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Display.prototype, "height", {
        get: function () {
            return this.apiContainer.engine.view.height;
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
        var textField = new CommentField_1.CommentField(danmaku.stage, danmaku, params, this._$getExtraCreateParams());
        textField.text = text;
        textField.textColor = 0xffffff;
        // Use "Arial" as default font for users outside China.
        textField.defaultTextFormat.font = "SimHei";
        danmaku.addChild(textField);
        return textField;
    };
    Display.prototype.createShape = function (params) {
        var danmaku = this.apiContainer.danmaku;
        var shape = new DCShape_1.DCShape(danmaku.stage, danmaku, params, this._$getExtraCreateParams());
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
}(BiliBiliDamakuApiObject_1.BiliBiliDamakuApiObject));
exports.Display = Display;



},{"../../../../lib/glantern/src/gl/flash/errors/NotImplementedError":51,"../../../../lib/glantern/src/gl/flash/filters/BitmapFilterQuality":57,"../../../../lib/glantern/src/gl/flash/filters/BlurFilter":58,"../../../../lib/glantern/src/gl/flash/filters/GlowFilter":59,"../../../../lib/glantern/src/gl/flash/geom/ColorTransform":61,"../../../../lib/glantern/src/gl/flash/geom/Matrix":62,"../../../../lib/glantern/src/gl/flash/geom/Matrix3D":63,"../../../../lib/glantern/src/gl/flash/geom/Point":66,"../../../../lib/glantern/src/gl/flash/geom/Vector3D":69,"../../../../lib/glantern/src/gl/flash/text/TextFormat":80,"../../../../lib/glantern/src/gl/glantern/GLUtil":94,"../../danmaku/scripted/dco/DCShape":181,"./BiliBiliDamakuApiObject":144,"./CommentField":147}],149:[function(require,module,exports){
/**
 * Created by MIC on 2016/1/7.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BiliBiliDamakuApiObject_1 = require("./BiliBiliDamakuApiObject");
var NotImplementedError_1 = require("../../../../lib/glantern/src/gl/flash/errors/NotImplementedError");
var GLUtil_1 = require("../../../../lib/glantern/src/gl/glantern/GLUtil");
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
    // Well, I lost all descriptions for this function. This is my best guess.
    Functions.prototype.getTimer = function () {
        return this.apiContainer.engine.elapsedMillis;
    };
    Functions.prototype.timer = function (obj, delay) {
        return this.apiContainer.api.Utils.delay(obj, delay);
    };
    Functions.prototype.interval = function (obj, delay, times) {
        if (times === void 0) { times = 1; }
        return this.apiContainer.api.Utils.interval(obj, delay, times);
    };
    Functions.prototype.foreach = function (loop, f) {
        if (GLUtil_1.GLUtil.ptr(loop)) {
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
            "libBitmap",
            "libStorage"
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
        throw new NotImplementedError_1.NotImplementedError();
    };
    return Functions;
}(BiliBiliDamakuApiObject_1.BiliBiliDamakuApiObject));
exports.Functions = Functions;



},{"../../../../lib/glantern/src/gl/flash/errors/NotImplementedError":51,"../../../../lib/glantern/src/gl/glantern/GLUtil":94,"./BiliBiliDamakuApiObject":144}],150:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/29.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BiliBiliDamakuApiObject_1 = require("./BiliBiliDamakuApiObject");
var Global = (function (_super) {
    __extends(Global, _super);
    function Global(apiContainer) {
        _super.call(this, apiContainer);
        this._map = null;
        this._map = new Map();
    }
    Global.prototype._set = function (key, val) {
        this._map.set(key, val);
    };
    Global.prototype._get = function (key) {
        return this._map.get(key);
    };
    return Global;
}(BiliBiliDamakuApiObject_1.BiliBiliDamakuApiObject));
exports.Global = Global;



},{"./BiliBiliDamakuApiObject":144}],151:[function(require,module,exports){
/**
 * Created by MIC on 2016/1/7.
 */
"use strict";
var MotionEasing = (function () {
    function MotionEasing() {
    }
    Object.defineProperty(MotionEasing, "NONE", {
        get: function () {
            return 'None';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MotionEasing, "BACK", {
        get: function () {
            return 'Back';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MotionEasing, "BOUNCE", {
        get: function () {
            return 'Bounce';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MotionEasing, "CIRCULAR", {
        get: function () {
            return 'Circular';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MotionEasing, "CUBIC", {
        get: function () {
            return 'Cubic';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MotionEasing, "ELASTIC", {
        get: function () {
            return 'Elastic';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MotionEasing, "EXPONENTIAL", {
        get: function () {
            return 'Exponential';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MotionEasing, "SINE", {
        get: function () {
            return 'Sine';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MotionEasing, "QUINTIC", {
        get: function () {
            return 'Quintic';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MotionEasing, "LINEAR", {
        get: function () {
            return 'Linear';
        },
        enumerable: true,
        configurable: true
    });
    return MotionEasing;
}());
exports.MotionEasing = MotionEasing;



},{}],152:[function(require,module,exports){
/**
 * Created by MIC on 2016/1/7.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BiliBiliDamakuApiObject_1 = require("./BiliBiliDamakuApiObject");
var VideoPlayerState_1 = require("../../interactive/video/VideoPlayerState");
var PlayerState_1 = require("./PlayerState");
var GLUtil_1 = require("../../../../lib/glantern/src/gl/glantern/GLUtil");
var NotImplementedError_1 = require("../../../../lib/glantern/src/gl/flash/errors/NotImplementedError");
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(apiContainer) {
        _super.call(this, apiContainer);
        this._videoPlayer = null;
        this._videoPlayer = apiContainer.engine.videoPlayer;
    }
    Player.prototype.play = function () {
        if (this._videoPlayer !== null) {
            this._videoPlayer.play();
        }
    };
    Player.prototype.pause = function () {
        if (this._videoPlayer !== null) {
            this._videoPlayer.pause();
        }
    };
    Player.prototype.seek = function (offset) {
        if (this._videoPlayer !== null) {
            this._videoPlayer.currentTime = offset;
        }
    };
    Player.prototype.jump = function (av, page, newWindow) {
        if (page === void 0) { page = 1; }
        if (newWindow === void 0) { newWindow = false; }
        var url = GLUtil_1.GLUtil.formatString("http://www.bilibili.com/video/{0}/index_{1}.html", av, page);
        if (newWindow) {
            window.open(url, "_blank");
        }
        else {
            window.location.assign(url);
        }
    };
    Object.defineProperty(Player.prototype, "state", {
        get: function () {
            if (this._videoPlayer === null) {
                return PlayerState_1.PlayerState.INVALID;
            }
            else {
                var state = this._videoPlayer.state;
                switch (state) {
                    case VideoPlayerState_1.VideoPlayerState.Playing:
                    case VideoPlayerState_1.VideoPlayerState.Seeking:
                        return PlayerState_1.PlayerState.PLAYING;
                    case VideoPlayerState_1.VideoPlayerState.Paused:
                        return PlayerState_1.PlayerState.PAUSE;
                    case VideoPlayerState_1.VideoPlayerState.Created:
                    case VideoPlayerState_1.VideoPlayerState.Initialized:
                    case VideoPlayerState_1.VideoPlayerState.Loaded:
                    case VideoPlayerState_1.VideoPlayerState.Stopped:
                        return PlayerState_1.PlayerState.STOP;
                    default:
                        return PlayerState_1.PlayerState.INVALID;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "time", {
        get: function () {
            return this.apiContainer.engine.videoMillis;
        },
        enumerable: true,
        configurable: true
    });
    Player.prototype.commentTrigger = function (f, timeout) {
        if (timeout === void 0) { timeout = 1000; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Player.prototype.keyTrigger = function (f, timeout, up) {
        if (timeout === void 0) { timeout = 1000; }
        if (up === void 0) { up = false; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Player.prototype.setMask = function (obj) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Player.prototype.createSound = function (t, onLoad) {
        if (onLoad === void 0) { onLoad = null; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Object.defineProperty(Player.prototype, "commentList", {
        get: function () {
            var comments = [];
            var providers = this.apiContainer.engine.danmakuController.getProviders();
            var provider;
            for (var j = 0; j < providers.length; ++j) {
                provider = providers[j];
                for (var i = 0; i < provider.fullDanmakuList.length; ++i) {
                    comments.push(provider.fullDanmakuList[i].getCommentData());
                }
            }
            return comments;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "refreshRate", {
        get: function () {
            return 1 / this.apiContainer.engine.fps;
        },
        set: function (v) {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "width", {
        get: function () {
            return this.apiContainer.engine.stage.stageWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "height", {
        get: function () {
            return this.apiContainer.engine.stage.stageHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "videoWidth", {
        get: function () {
            return this._videoPlayer !== null ? this._videoPlayer.videoWidth : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "videoHeight", {
        get: function () {
            return this._videoPlayer !== null ? this._videoPlayer.videoHeight : 0;
        },
        enumerable: true,
        configurable: true
    });
    return Player;
}(BiliBiliDamakuApiObject_1.BiliBiliDamakuApiObject));
exports.Player = Player;



},{"../../../../lib/glantern/src/gl/flash/errors/NotImplementedError":51,"../../../../lib/glantern/src/gl/glantern/GLUtil":94,"../../interactive/video/VideoPlayerState":204,"./BiliBiliDamakuApiObject":144,"./PlayerState":153}],153:[function(require,module,exports){
/**
 * Created by MIC on 2016/1/7.
 */
"use strict";
var PlayerState = (function () {
    function PlayerState() {
    }
    Object.defineProperty(PlayerState, "PLAYING", {
        get: function () {
            return "playing";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerState, "STOP", {
        get: function () {
            return "stop";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerState, "PAUSE", {
        get: function () {
            return "pause";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerState, "INVALID", {
        get: function () {
            return "invalid";
        },
        enumerable: true,
        configurable: true
    });
    return PlayerState;
}());
exports.PlayerState = PlayerState;



},{}],154:[function(require,module,exports){
/**
 * Created by MIC on 2016/1/7.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BiliBiliDamakuApiObject_1 = require("./BiliBiliDamakuApiObject");
var NotImplementedError_1 = require("../../../../lib/glantern/src/gl/flash/errors/NotImplementedError");
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
}(BiliBiliDamakuApiObject_1.BiliBiliDamakuApiObject));
exports.ScriptManager = ScriptManager;



},{"../../../../lib/glantern/src/gl/flash/errors/NotImplementedError":51,"./BiliBiliDamakuApiObject":144}],155:[function(require,module,exports){
/**
 * Created by MIC on 2016/1/7.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BiliBiliDamakuApiObject_1 = require("./BiliBiliDamakuApiObject");
var NotImplementedError_1 = require("../../../../lib/glantern/src/gl/flash/errors/NotImplementedError");
var Storage = (function (_super) {
    __extends(Storage, _super);
    function Storage(apiContainer) {
        _super.call(this, apiContainer);
    }
    Storage.prototype.loadRank = function (complete, err) {
        if (err === void 0) { err = null; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Storage.prototype.uploadScore = function (score, name, complete, err) {
        if (name === void 0) { name = null; }
        if (complete === void 0) { complete = null; }
        if (err === void 0) { err = null; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Storage.prototype.saveData = function (userData, complete, err) {
        if (complete === void 0) { complete = null; }
        if (err === void 0) { err = null; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Storage.prototype.loadData = function (complete, err) {
        if (complete === void 0) { complete = null; }
        if (err === void 0) { err = null; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    return Storage;
}(BiliBiliDamakuApiObject_1.BiliBiliDamakuApiObject));
exports.Storage = Storage;



},{"../../../../lib/glantern/src/gl/flash/errors/NotImplementedError":51,"./BiliBiliDamakuApiObject":144}],156:[function(require,module,exports){
/**
 * Created by MIC on 2016/1/7.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BiliBiliDamakuApiObject_1 = require("./BiliBiliDamakuApiObject");
var NotImplementedError_1 = require("../../../../lib/glantern/src/gl/flash/errors/NotImplementedError");
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
}(BiliBiliDamakuApiObject_1.BiliBiliDamakuApiObject));
exports.Tween = Tween;



},{"../../../../lib/glantern/src/gl/flash/errors/NotImplementedError":51,"./BiliBiliDamakuApiObject":144}],157:[function(require,module,exports){
/**
 * Created by MIC on 2016/1/7.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Tween_1 = require("../../../../lib/glantern/src/gl/fl/transitions/Tween");
var NotImplementedError_1 = require("../../../../lib/glantern/src/gl/flash/errors/NotImplementedError");
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
}(Tween_1.Tween));
exports.TweenImpl = TweenImpl;



},{"../../../../lib/glantern/src/gl/fl/transitions/Tween":2,"../../../../lib/glantern/src/gl/flash/errors/NotImplementedError":51}],158:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/29.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BiliBiliDamakuApiObject_1 = require("./BiliBiliDamakuApiObject");
var FiniteTimer_1 = require("../../danmaku/scripted/dco/FiniteTimer");
var MathUtil_1 = require("../../../../lib/glantern/src/gl/glantern/MathUtil");
var GLUtil_1 = require("../../../../lib/glantern/src/gl/glantern/GLUtil");
var date = new Date();
var Utils = (function (_super) {
    __extends(Utils, _super);
    function Utils(apiContainer) {
        _super.call(this, apiContainer);
    }
    Utils.prototype.hue = function (v) {
        v = v % 360;
        // http://blog.sina.com.cn/s/blog_5de73d0b0101baxq.html
        var lambda = v / 60 * 255;
        var r = MathUtil_1.MathUtil.clamp(510 - lambda, 0, 255);
        var g = MathUtil_1.MathUtil.clamp(v < 180 ? lambda : lambda - 510, 0, 255);
        var b = MathUtil_1.MathUtil.clamp(v < 180 ? lambda - 510 : lambda, 0, 255);
        return (0xff << 24) | (r << 16) | (g << 8) | b;
    };
    Utils.prototype.rgb = function (r, g, b) {
        return GLUtil_1.GLUtil.rgb(r, g, b);
    };
    Utils.prototype.formatTimes = function (time) {
        date.setTime(time * 1000);
        return date.toLocaleString();
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
}(BiliBiliDamakuApiObject_1.BiliBiliDamakuApiObject));
exports.Utils = Utils;



},{"../../../../lib/glantern/src/gl/glantern/GLUtil":94,"../../../../lib/glantern/src/gl/glantern/MathUtil":95,"../../danmaku/scripted/dco/FiniteTimer":182,"./BiliBiliDamakuApiObject":144}],159:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/29.
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./BiliBiliDamakuApiObject"));
__export(require("./Display"));
__export(require("./Global"));
__export(require("./Functions"));
__export(require("./Utils"));
__export(require("./Storage"));
__export(require("./CommentBitmap"));
__export(require("./Bitmap"));
__export(require("./ScriptManager"));
__export(require("./Tween"));
__export(require("./TweenImpl"));
__export(require("./Player"));
__export(require("./PlayerState"));
__export(require("./MotionEasing"));
__export(require("./CommentField"));



},{"./BiliBiliDamakuApiObject":144,"./Bitmap":145,"./CommentBitmap":146,"./CommentField":147,"./Display":148,"./Functions":149,"./Global":150,"./MotionEasing":151,"./Player":152,"./PlayerState":153,"./ScriptManager":154,"./Storage":155,"./Tween":156,"./TweenImpl":157,"./Utils":158}],160:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/29.
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./BiliBiliDanmakuApiContainer"));
var danmaku_api = require("./danmaku_api/index");
exports.danmaku_api = danmaku_api;



},{"./BiliBiliDanmakuApiContainer":143,"./danmaku_api/index":159}],161:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/4.
 */
"use strict";
var Bulletproof = require("./index");
/*
 Prepare to run in browsers.
 In browsers, we must find the "window" object as global object in highest priority,
 instead of Node's "global" object.
 */
(function ($global) {
    ($global).Bulletproof = Bulletproof;
})(window || {});



},{"./index":200}],162:[function(require,module,exports){
/**
 * Created by MIC on 2016/2/28.
 */
"use strict";
var OutOfRangeError_1 = require("../flash/errors/OutOfRangeError");
var BPUtil = (function () {
    function BPUtil() {
    }
    BPUtil.createNumberArray = function (length, zeroFill) {
        if (zeroFill === void 0) { zeroFill = true; }
        length |= 0;
        var result;
        if (zeroFill) {
            result = [];
            while (length > 0) {
                result.push(0);
                --length;
            }
        }
        else {
            result = (new Array(length));
        }
        return result;
    };
    BPUtil.insertAt = function (array, item, index) {
        array.splice(index, 0, item);
    };
    /**
     * Binary insertion. If the two
     * @template T
     * @param array {T[]} The array to insert into.
     * @param item {T} The new item to insert.
     * @param comparison {function (T, T): Number} The compare function. It should return a positive number when the first
     * argument is greater than the second one, a negative when less, and 0 when they are equal.
     * @returns {Number} The inserted index of the item.
     */
    BPUtil.binaryInsert = function (array, item, comparison) {
        if (array.length <= 0) {
            array.push(item);
            return 0;
        }
        var arrayLength = array.length;
        if (comparison(item, array[0]) <= 0) {
            array.unshift(item);
            return 0;
        }
        else if (comparison(item, array[arrayLength - 1]) > 0) {
            array.push(item);
            return arrayLength - 1;
        }
        var newIndex = getBSIndex(array, item, comparison);
        if (newIndex < 0) {
            throw new OutOfRangeError_1.OutOfRangeError("Unexpected sorting result.");
        }
        BPUtil.insertAt(array, item, newIndex);
        return newIndex;
    };
    return BPUtil;
}());
exports.BPUtil = BPUtil;
/**
 * Returns the proposed insertion index for binary insertion. The index fulfills that, if there are equal items in the
 * array, the new item will be inserted before the first one; if there is not, the new item will be inserted to the place
 * where the array is still in order after insertion.
 * @template T
 * @param array {T[]}
 * @param item {T}
 * @param comparison {function (T, T): Number}
 */
function getBSIndex(array, item, comparison) {
    var arrayLength = array.length;
    var low = 0, high = arrayLength - 1;
    var middle = -1;
    while (low < high) {
        middle = ((low + high) / 2) | 0;
        var compareResult = comparison(item, array[middle]);
        if (compareResult > 0) {
            // item > array[middle]
            low = middle + 1;
            if (low > high) {
                middle = low;
                break;
            }
        }
        else if (compareResult < 0) {
            // item < array[middle]
            high = middle - 1;
            if (high < low) {
                middle = low;
                break;
            }
        }
        else {
            //middle = middle;
            break;
        }
    }
    if (middle > 0) {
        do {
            if (comparison(item, array[middle]) >= 0) {
                --middle;
            }
            else {
                break;
            }
        } while (middle > 0);
    }
    return middle;
}



},{"../flash/errors/OutOfRangeError":197}],163:[function(require,module,exports){
/**
 * Created by MIC on 2016/2/7.
 */
"use strict";
var SimpleDanamkuType_1 = require("../danmaku/simple/SimpleDanamkuType");
exports.DefaultEngineOptions = Object.create(null);
/**
 * Gets the default life time for simple (text-only) danmakus, in seconds.
 * @type {Number}
 */
exports.DefaultEngineOptions.simpleDanmakuLifeTimeSecs = 8;
/**
 * Gets the default life time for scripted danmakus, in seconds.
 * @type {Number}
 */
exports.DefaultEngineOptions.codeDanmakuLifeTimeSecs = Number.MAX_VALUE;
/**
 * Default parameters for creation of {@link SimpleDanmaku}.
 * @type {ISimpleDanmakuCreateParams}
 */
exports.DefaultEngineOptions.defaultSimpleDanmakuCreateParams = {
    bornTime: void (0),
    fontName: "SimHei",
    fontStyle: "bold",
    fontSize: 20,
    type: SimpleDanamkuType_1.SimpleDanmakuType.R2L,
    border: false,
    borderColor: 0x000000,
    borderThickness: 1,
    background: false,
    backgroundColor: 0x000000,
    textColor: 0xffffff,
    outline: true,
    outlineColor: 0x2f2f2f,
    outlineThickness: 1
};
/**
 * Global threshold of danmaku count. See {@link DanmakuController.shouldCreateDanmaku} for how the number is counted.
 * @type {Number}
 */
exports.DefaultEngineOptions.globalDanmakuCountThreshold = 3000;
/**
 * Local threshold of number of each part of {@link SimpleDanmaku}.
 * @type {Number}
 */
exports.DefaultEngineOptions.simpleDanmakuPartCountThreshold = 1500;
/**
 * Whether should enable scripted danmaku support.
 * @type {Boolean}
 */
exports.DefaultEngineOptions.codeDanmakuEnabled = true;
/**
 * Whether should enable simple danmaku support.
 * @type {Boolean}
 */
exports.DefaultEngineOptions.simpleDanmakuEnabled = true;
/**
 * Whether should enable the default video player.
 * @type {Boolean}
 */
exports.DefaultEngineOptions.videoPlayerEnabled = true;
/**
 * In an environment with WebChimera, this can set to true to use the WebChimera player rather than HTML5 video element.
 * It is used for WebChimera for NW.js or Electron, where the original integrated browser does not support H.264 etc.
 * due to copyright reasons.
 * @type {Boolean}
 */
exports.DefaultEngineOptions.useWebChimeraForVideoPlayback = false;



},{"../danmaku/simple/SimpleDanamkuType":185}],164:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/28.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DanmakuController_1 = require("../danmaku/DanmakuController");
var ScriptedDanmakuProvider_1 = require("../danmaku/scripted/ScriptedDanmakuProvider");
var SimpleDanmakuProvider_1 = require("../danmaku/simple/SimpleDanmakuProvider");
var DefaultEngineOptions_1 = require("./DefaultEngineOptions");
var Html5VideoPlayer_1 = require("../interactive/video/html5/Html5VideoPlayer");
var EngineBase_1 = require("../../../lib/glantern/src/gl/glantern/EngineBase");
var GLUtil_1 = require("../../../lib/glantern/src/gl/glantern/GLUtil");
var VideoPlayerEvent_1 = require("../interactive/video/VideoPlayerEvent");
var VideoPlayerState_1 = require("../interactive/video/VideoPlayerState");
/**
 * The root controller for Bulletproof.
 */
var Engine = (function (_super) {
    __extends(Engine, _super);
    /**
     * Creates a new {@link Engine} instance.
     */
    function Engine() {
        _super.call(this);
        this._videoMillis = 0;
        this._playerReportedVideoMillis = 0;
        this._lastTimeVideoUpdated = -1;
        this._danmakuController = null;
        this._videoPlayer = null;
        this._options = null;
        this._blackCurtainView = null;
        this._options = GLUtil_1.GLUtil.deepClone(DefaultEngineOptions_1.DefaultEngineOptions);
    }
    /**
     * Initialize the {@link Engine} instance with default parameters.
     * @param width {Number} Width of stage requested, in pixels.
     * @param height {Number} Height of stage requested, in pixels.
     */
    Engine.prototype.initialize = function (width, height) {
        if (this.isInitialized) {
            return;
        }
        _super.prototype.initialize.call(this, width, height);
        var options = this.options;
        var controller = new DanmakuController_1.DanmakuController(this);
        this._danmakuController = controller;
        // The earlier a provider is added in, the deeper it is in Z axis.
        var provider;
        if (options.codeDanmakuEnabled) {
            provider = new ScriptedDanmakuProvider_1.ScriptedDanmakuProvider(controller);
            controller.addProvider(provider);
        }
        if (options.simpleDanmakuEnabled) {
            provider = new SimpleDanmakuProvider_1.SimpleDanmakuProvider(controller);
            controller.addProvider(provider);
        }
        if (options.videoPlayerEnabled) {
            var videoPlayer = null;
            if (options.useWebChimeraForVideoPlayback) {
                console.warn("WebChimera integration is not implemented yet.");
            }
            else {
                videoPlayer = new Html5VideoPlayer_1.Html5VideoPlayer();
            }
            this._videoPlayer = videoPlayer;
            if (videoPlayer !== null) {
                videoPlayer.initialize(width, height);
                videoPlayer.addEventListener(VideoPlayerEvent_1.VideoPlayerEvent.VIDEO_TIME_UPDATE, this.__onVideoTimeUpdate.bind(this));
                videoPlayer.addEventListener(VideoPlayerEvent_1.VideoPlayerEvent.VIDEO_PLAY, this.__onVideoPlay.bind(this));
                this.attachUpdateFunction(this.__updateVideoTime.bind(this));
            }
        }
        this.attachUpdateFunction(this.__updateDanmakus.bind(this));
        var blackCurtainView = window.document.createElement("div");
        var blackCurtainStyle = blackCurtainView.style;
        blackCurtainStyle.width = width + "px";
        blackCurtainStyle.height = height + "px";
        blackCurtainStyle.backgroundColor = "black";
        this._blackCurtainView = blackCurtainView;
    };
    /**
     * Disposes the {@link Engine} instance and release all resources occupied.
     */
    Engine.prototype.dispose = function () {
        this._danmakuController.dispose();
        this._danmakuController = null;
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(Engine.prototype, "danmakuController", {
        /**
         * Gets the {@link DanmakuController} instance associated with current {@link Engine} instance.
         * @returns {DanmakuController}
         */
        get: function () {
            return this._danmakuController;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Engine.prototype, "videoMillis", {
        /**
         * Gets current video playback time, in milliseconds.
         * @returns {Number}
         */
        get: function () {
            return this._videoMillis;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Engine.prototype, "videoPlayer", {
        get: function () {
            return this._videoPlayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Engine.prototype, "videoView", {
        get: function () {
            return GLUtil_1.GLUtil.ptr(this.videoPlayer) ? this.videoPlayer.view : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Engine.prototype, "options", {
        get: function () {
            return this._options;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Engine.prototype, "blackCurtainView", {
        get: function () {
            return this._blackCurtainView;
        },
        enumerable: true,
        configurable: true
    });
    Engine.prototype.__updateVideoTime = function (timeInfo) {
        if (this.videoPlayer.state === VideoPlayerState_1.VideoPlayerState.Playing) {
            this._videoMillis += this.elapsedMillis - this._lastTimeVideoUpdated;
            this._lastTimeVideoUpdated = this.elapsedMillis;
        }
        timeInfo.millisOfVideo = this._videoMillis;
    };
    Engine.prototype.__updateDanmakus = function (timeInfo) {
        this.danmakuController.update(timeInfo);
    };
    Engine.prototype.__onVideoTimeUpdate = function () {
        this._playerReportedVideoMillis = this.videoPlayer.currentTime * 1000;
    };
    Engine.prototype.__onVideoPlay = function () {
        this._lastTimeVideoUpdated = this.elapsedMillis;
    };
    return Engine;
}(EngineBase_1.EngineBase));
exports.Engine = Engine;



},{"../../../lib/glantern/src/gl/glantern/EngineBase":91,"../../../lib/glantern/src/gl/glantern/GLUtil":94,"../danmaku/DanmakuController":168,"../danmaku/scripted/ScriptedDanmakuProvider":179,"../danmaku/simple/SimpleDanmakuProvider":190,"../interactive/video/VideoPlayerEvent":203,"../interactive/video/VideoPlayerState":204,"../interactive/video/html5/Html5VideoPlayer":205,"./DefaultEngineOptions":163}],165:[function(require,module,exports){
/**
 * Created by MIC on 2016/2/7.
 */
"use strict";
var StageResizedEventArgs = (function () {
    function StageResizedEventArgs(width, height) {
        this._width = 0;
        this._height = 0;
        this._width = width;
        this._height = height;
    }
    Object.defineProperty(StageResizedEventArgs.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageResizedEventArgs.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    return StageResizedEventArgs;
}());
exports.StageResizedEventArgs = StageResizedEventArgs;



},{}],166:[function(require,module,exports){
/**
 * Created by MIC on 2016/6/13.
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./StageResizedEventArgs"));



},{"./StageResizedEventArgs":165}],167:[function(require,module,exports){
/**
 * Created by MIC on 2016/6/13.
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./BPUtil"));
__export(require("./DefaultEngineOptions"));
__export(require("./Engine"));
var events = require("./events/index");
exports.events = events;



},{"./BPUtil":162,"./DefaultEngineOptions":163,"./Engine":164,"./events/index":166}],168:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/29.
 */
"use strict";
var DanmakuProviderFlag_1 = require("./DanmakuProviderFlag");
var GLUtil_1 = require("../../../lib/glantern/src/gl/glantern/GLUtil");
/**
 * The controller of all danmakus.
 * This class is a factory and manager of danmaku providers.
 */
var DanmakuController = (function () {
    /**
     * Creates a new {@Link DanmakuController} instance.
     * @param bulletproof {Engine} The {@link Engine} instance that will be attached to.
     */
    function DanmakuController(bulletproof) {
        this._danmakuProviders = null;
        this._engine = null;
        this._engine = bulletproof;
        this._danmakuProviders = new Map();
    }
    /**
     * Disposes the {@link DanmakuController} instance and release all resources occupied.
     */
    DanmakuController.prototype.dispose = function () {
        this._danmakuProviders.forEach(function (provider) {
            provider.dispose();
        });
        this._danmakuProviders.clear();
        this._danmakuProviders = null;
    };
    /**
     * Determines whether a danmaku should be created, in a global view.
     * For example, if the density of danmakus are too high, this function should returns false when a
     * {@link SimpleDanmakuProvider} is requesting creation of a new danmaku, to avoid performance drop.
     * Danmaku providers should check via this function before actually creating a danmaku.
     * @param requestingProvider {DanmakuProviderBase} The danmaku provider requesting the check.
     */
    DanmakuController.prototype.shouldCreateDanmaku = function (requestingProvider) {
        var canCreate = true;
        var totalDanmakuCount = 0;
        var globalThreshold = this.engine.options.globalDanmakuCountThreshold;
        this._danmakuProviders.forEach(function (provider) {
            // If a danmaku provider has no number limit, it contributes 0 to the total count.
            if (!canCreate || (requestingProvider.flags & DanmakuProviderFlag_1.DanmakuProviderFlag.UnlimitedCreation) !== 0) {
                return;
            }
            totalDanmakuCount += provider.displayingDanmakuList.length;
            if (totalDanmakuCount > globalThreshold) {
                canCreate = false;
            }
        });
        return canCreate;
    };
    /**
     * Adds a new kind of danmaku provider to provider instance list. If the a provider of that kind
     * already exists, the new one will not be added.
     * @param provider {DanmakuProviderBase} The danmaku provider preparing to be added.
     */
    DanmakuController.prototype.addProvider = function (provider) {
        if (GLUtil_1.GLUtil.ptr(provider) && !this._danmakuProviders.has(provider.danmakuKind)) {
            this._danmakuProviders.set(provider.danmakuKind, provider);
            provider.initialize();
        }
    };
    /**
     * Removes a new kind of danmaku provider from provider instance list.
     * @param provider {DanmakuProviderBase} The danmaku provider preparing to be removed.
     */
    DanmakuController.prototype.removeProvider = function (provider) {
        if (GLUtil_1.GLUtil.ptr(provider) && this._danmakuProviders.has(provider.danmakuKind)) {
            this._danmakuProviders.delete(provider.danmakuKind);
        }
    };
    /**
     * Gets the instance of danmaku provider whose kind is as specified. If the kind is not registered,
     * a null value will be returned.
     * @param kind {DanmakuKind} The danmaku kind of requested danmaku provider.
     * @returns {DanmakuProviderBase}
     */
    DanmakuController.prototype.getProvider = function (kind) {
        var provider = this._danmakuProviders.get(kind);
        return GLUtil_1.GLUtil.ptr(provider) ? provider : null;
    };
    DanmakuController.prototype.getProviders = function () {
        var providers = [];
        this._danmakuProviders.forEach(function (provider) {
            providers.push(provider);
        });
        return providers;
    };
    /**
     * Updates the status of all danmaku providers.
     */
    DanmakuController.prototype.update = function (timeInfo) {
        this._danmakuProviders.forEach(function (provider) {
            provider.update(timeInfo);
        });
    };
    /**
     * Perform extra rendering if needed.
     * @param renderer {WebGLRenderer} The renderer used.
     */
    DanmakuController.prototype.render = function (renderer) {
        // Do nothing.
    };
    Object.defineProperty(DanmakuController.prototype, "engine", {
        /**
         * Gets the {@link Engine} instance that controls this {@link DanmakuController}.
         * @returns {Engine}
         */
        get: function () {
            return this._engine;
        },
        enumerable: true,
        configurable: true
    });
    DanmakuController.prototype.getNextAvailablePool = function () {
        return this._danmakuProviders.size;
    };
    return DanmakuController;
}());
exports.DanmakuController = DanmakuController;



},{"../../../lib/glantern/src/gl/glantern/GLUtil":94,"./DanmakuProviderFlag":172}],169:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/28.
 */
"use strict";
(function (DanmakuKind) {
    /**
     * Note: This type handles all types (0: flying, 1: fixed on top, 2: fixed on bottom) of danmaku
     */
    DanmakuKind[DanmakuKind["Simple"] = 0] = "Simple";
    DanmakuKind[DanmakuKind["Mode7"] = 7] = "Mode7";
    DanmakuKind[DanmakuKind["Scripted"] = 8] = "Scripted";
})(exports.DanmakuKind || (exports.DanmakuKind = {}));
var DanmakuKind = exports.DanmakuKind;



},{}],170:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/28.
 */
"use strict";
var NotImplementedError_1 = require("../../../lib/glantern/src/gl/flash/errors/NotImplementedError");
/**
 * Base class exposing common service of a danmaku layout manager.
 * A danmaku layout manager does layout calculation and performs optimized layout for danmakus of its kind.
 * In special situations, it can also do nothing and let the danmakus themselves to determine the best
 * layout, as in {@link ScriptedDanmakuLayoutManager}.
 * This class must be inherited.
 */
var DanmakuLayoutManagerBase = (function () {
    /**
     * Creates a new danmaku layout manager.
     * @param provider {DanmakuProviderBase} The danmaku provider that will be attached to.
     */
    function DanmakuLayoutManagerBase(provider) {
        this._danmakuProvider = null;
        this._engine = null;
        this._danmakuProvider = provider;
        this._engine = provider.engine;
    }
    /**
     * Initialize the layout manager.
     */
    DanmakuLayoutManagerBase.prototype.initialize = function () {
    };
    /**
     * Disposes the danmaku layout manager and release all resources occupied.
     */
    DanmakuLayoutManagerBase.prototype.dispose = function () {
    };
    Object.defineProperty(DanmakuLayoutManagerBase.prototype, "danmakuKind", {
        /**
         * Gets the kind of danmaku that this danmaku layout manager handles.
         * @returns {DanmakuKind}
         */
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DanmakuLayoutManagerBase.prototype, "danmakuProvider", {
        /**
         * Gets the danmaku provider specified at the time of creation.
         * @returns {DanmakuProviderBase}
         */
        get: function () {
            return this._danmakuProvider;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DanmakuLayoutManagerBase.prototype, "engine", {
        /**
         * Gets the {@link Engine} instance that controls this {@link DanmakuLayoutManagerBase}.
         * @returns {Engine}
         */
        get: function () {
            return this._engine;
        },
        enumerable: true,
        configurable: true
    });
    return DanmakuLayoutManagerBase;
}());
exports.DanmakuLayoutManagerBase = DanmakuLayoutManagerBase;



},{"../../../lib/glantern/src/gl/flash/errors/NotImplementedError":51}],171:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/28.
 */
"use strict";
var DanmakuProviderFlag_1 = require("./DanmakuProviderFlag");
var NotImplementedError_1 = require("../../../lib/glantern/src/gl/flash/errors/NotImplementedError");
/**
 * Base class exposing common service of a danmaku provider.
 * This class must be inherited.
 */
var DanmakuProviderBase = (function () {
    /**
     * Creates a new danmaku provider.
     * @param controller {DanmakuController} The {@link DanmakuController} that will be used for reversed queries.
     */
    function DanmakuProviderBase(controller) {
        this._displayingDanmakuList = null;
        this._controller = null;
        this._layoutManager = null;
        this._layer = null;
        this._engine = null;
        this._pool = -1;
        this._controller = controller;
        this._displayingDanmakuList = [];
        this._engine = controller.engine;
        this._pool = controller.getNextAvailablePool();
    }
    Object.defineProperty(DanmakuProviderBase.prototype, "danmakuKind", {
        /**
         * The kind of this danmaku provider. Override this property and return a unique number to identify from other
         * danmaku providers.
         * This property must be overridden.
         */
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Perform extra initialization after created.
     */
    DanmakuProviderBase.prototype.initialize = function () {
        this.layoutManager.initialize();
    };
    /**
     * Updates the state of this instance.
     */
    DanmakuProviderBase.prototype.update = function (timeInfo) {
        this.updateDisplayingDanmakuList(timeInfo);
        this.layoutManager.performLayout(timeInfo);
    };
    /**
     * Adds a danmaku with the given content and adds it into internal danmaku list.
     * A solid {@link IDanmaku} implementations determines how to interpret the given content.
     * This method must be overridden.
     * @param content {String} The content used to create a new danmaku.
     * @param [args] {*} Extra arguments used to create the danmaku. For example, the exact type must
     *                   be specified when creating a {@link SimpleDanmaku}.
     * @returns {IDanmaku} The created danmaku.
     */
    DanmakuProviderBase.prototype.addDanmaku = function (content, args) {
        if ((true || this.canCreateDanmaku(args)) && this.controller.shouldCreateDanmaku(this)) {
            return this._$addDanmaku(content, args);
        }
        else {
            return null;
        }
    };
    Object.defineProperty(DanmakuProviderBase.prototype, "layoutManager", {
        /**
         * Gets the layout manager associated with this instance.
         * @returns {DanmakuLayoutManagerBase}
         */
        get: function () {
            return this._layoutManager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DanmakuProviderBase.prototype, "displayingDanmakuList", {
        /**
         * Gets the list including all displaying danmakus created and managed by this danmaku provider.
         * @returns {IDanmaku[]}
         */
        get: function () {
            return this._displayingDanmakuList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DanmakuProviderBase.prototype, "fullDanmakuList", {
        /**
         * Gets the list including all danmakus created and managed by this danmaku provider.
         * @returns {IDanmaku[]}
         */
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DanmakuProviderBase.prototype, "layer", {
        /**
         * Gets the {@link DisplayObject} that contains danmakus of this {@link DanmakuProviderBase} as a layer.
         * @returns {DisplayObject}
         */
        get: function () {
            return this._layer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DanmakuProviderBase.prototype, "controller", {
        /**
         * Gets the danmaku controller specified at the time of creation.
         * @returns {DanmakuController}
         */
        get: function () {
            return this._controller;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DanmakuProviderBase.prototype, "engine", {
        /**
         * Gets the {@link Engine} instance that controls this {@link DanmakuProviderBase}.
         * @returns {Engine}
         */
        get: function () {
            return this._engine;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DanmakuProviderBase.prototype, "flags", {
        /**
         * Gets the flags of this danmaku provider. The flags may influence how this danmaku provider is treated,
         * for example, in {@link DanmakuController#shouldCreateDanmaku}.
         * The default value is {@link DanmakuProviderFlag.None}, indicating no special flag is set.
         * @returns {DanmakuProviderFlag}
         */
        get: function () {
            return DanmakuProviderFlag_1.DanmakuProviderFlag.None;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DanmakuProviderBase.prototype, "pool", {
        /**
         * Pool number of this danmaku provider.
         * @returns {Number}
         */
        get: function () {
            return this._pool;
        },
        enumerable: true,
        configurable: true
    });
    return DanmakuProviderBase;
}());
exports.DanmakuProviderBase = DanmakuProviderBase;



},{"../../../lib/glantern/src/gl/flash/errors/NotImplementedError":51,"./DanmakuProviderFlag":172}],172:[function(require,module,exports){
/**
 * Created by MIC on 2016/1/10.
 */
"use strict";
(function (DanmakuProviderFlag) {
    DanmakuProviderFlag[DanmakuProviderFlag["None"] = 0] = "None";
    DanmakuProviderFlag[DanmakuProviderFlag["UnlimitedCreation"] = 1] = "UnlimitedCreation";
})(exports.DanmakuProviderFlag || (exports.DanmakuProviderFlag = {}));
var DanmakuProviderFlag = exports.DanmakuProviderFlag;



},{}],173:[function(require,module,exports){
/**
 * Created by MIC on 2016/6/11.
 */
"use strict";
var NotImplementedError_1 = require("../../../lib/glantern/src/gl/flash/errors/NotImplementedError");
var TextDanmakuBase = (function () {
    function TextDanmakuBase(layoutManager) {
        this._engine = null;
        this._layoutManager = null;
        this._danmakuProvider = null;
        this._visible = true;
        this._x = 0;
        this._y = 0;
        this._layer = null;
        this._layoutManager = layoutManager;
        this._danmakuProvider = layoutManager.danmakuProvider;
        this._engine = layoutManager.engine;
    }
    TextDanmakuBase.prototype.dispose = function () {
    };
    Object.defineProperty(TextDanmakuBase.prototype, "engine", {
        get: function () {
            return this._engine;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextDanmakuBase.prototype, "danmakuKind", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextDanmakuBase.prototype, "bornTime", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextDanmakuBase.prototype, "lifeTime", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextDanmakuBase.prototype, "layoutManager", {
        get: function () {
            return this._layoutManager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextDanmakuBase.prototype, "danmakuProvider", {
        get: function () {
            return this._danmakuProvider;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextDanmakuBase.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (v) {
            this._visible = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextDanmakuBase.prototype, "layer", {
        get: function () {
            return this._layer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextDanmakuBase.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (v) {
            this._x = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextDanmakuBase.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (v) {
            this._y = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextDanmakuBase.prototype, "width", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextDanmakuBase.prototype, "height", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextDanmakuBase.prototype, "right", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextDanmakuBase.prototype, "bottom", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    return TextDanmakuBase;
}());
exports.TextDanmakuBase = TextDanmakuBase;



},{"../../../lib/glantern/src/gl/flash/errors/NotImplementedError":51}],174:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/29.
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./DanmakuController"));
__export(require("./DanmakuKind"));
__export(require("./DanmakuLayoutManagerBase"));
__export(require("./DanmakuProviderBase"));
var scripted = require("./scripted/index");
exports.scripted = scripted;
var simple = require("./simple/index");
exports.simple = simple;



},{"./DanmakuController":168,"./DanmakuKind":169,"./DanmakuLayoutManagerBase":170,"./DanmakuProviderBase":171,"./scripted/index":184,"./simple/index":191}],175:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/28.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DanmakuKind_1 = require("../DanmakuKind");
var BiliBiliDanmakuApiContainer_1 = require("../../bilibili/BiliBiliDanmakuApiContainer");
var DisplayObjectContainer_1 = require("../../../../lib/glantern/src/gl/flash/display/DisplayObjectContainer");
var GLUtil_1 = require("../../../../lib/glantern/src/gl/glantern/GLUtil");
var ScriptedDanmaku = (function (_super) {
    __extends(ScriptedDanmaku, _super);
    function ScriptedDanmaku(root, parent, layoutManager, createParams) {
        _super.call(this, root, parent);
        this._apiNames = null;
        this._apiContainer = null;
        this._lambda = null;
        this._content = null;
        this._bornTime = 0;
        this._engine = null;
        this._layoutManager = null;
        this._danmakuProvider = null;
        this._layer = null;
        this._createParams = null;
        this._executed = false;
        this._layoutManager = layoutManager;
        this._danmakuProvider = layoutManager.danmakuProvider;
        this._engine = layoutManager.engine;
        this._createParams = createParams;
        this._layer = this.danmakuProvider.layer;
    }
    ScriptedDanmaku.prototype.dispose = function () {
        this.parent.removeChild(this);
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(ScriptedDanmaku.prototype, "danmakuKind", {
        get: function () {
            return DanmakuKind_1.DanmakuKind.Scripted;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScriptedDanmaku.prototype, "layoutManager", {
        get: function () {
            return this._layoutManager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScriptedDanmaku.prototype, "danmakuProvider", {
        get: function () {
            return this._danmakuProvider;
        },
        enumerable: true,
        configurable: true
    });
    ScriptedDanmaku.prototype.getContent = function () {
        return this._content;
    };
    ScriptedDanmaku.prototype.getText = function () {
        // No readable text.
        return "";
    };
    Object.defineProperty(ScriptedDanmaku.prototype, "layer", {
        get: function () {
            return this._layer;
        },
        enumerable: true,
        configurable: true
    });
    ScriptedDanmaku.prototype.initialize = function (content, time) {
        this._content = content;
        this._bornTime = typeof this.createParams.bornTime === "number" ? this.createParams.bornTime : time;
        this._apiContainer = new BiliBiliDanmakuApiContainer_1.BiliBiliDanmakuApiContainer(this);
    };
    Object.defineProperty(ScriptedDanmaku.prototype, "executed", {
        get: function () {
            return this._executed;
        },
        enumerable: true,
        configurable: true
    });
    ScriptedDanmaku.prototype.execute = function () {
        if (!this._executed) {
            if (this.__censor()) {
                this._lambda = this.__buildFunction();
                this.__applyFunction();
                this._executed = true;
            }
        }
    };
    Object.defineProperty(ScriptedDanmaku.prototype, "createParams", {
        get: function () {
            return this._createParams;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScriptedDanmaku.prototype, "engine", {
        get: function () {
            return this._engine;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScriptedDanmaku.prototype, "bornTime", {
        get: function () {
            return this._bornTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScriptedDanmaku.prototype, "lifeTime", {
        get: function () {
            return this.engine.options.codeDanmakuLifeTimeSecs;
        },
        enumerable: true,
        configurable: true
    });
    ScriptedDanmaku.prototype.getCommentData = function () {
        return {
            txt: this.getContent(),
            time: this.bornTime.toString(),
            color: 0x000000,
            pool: this.danmakuProvider.pool,
            mode: 8,
            fontSize: 0
        };
    };
    Object.defineProperty(ScriptedDanmaku.prototype, "right", {
        get: function () {
            return this.x + this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScriptedDanmaku.prototype, "bottom", {
        get: function () {
            return this.y + this.height;
        },
        enumerable: true,
        configurable: true
    });
    ScriptedDanmaku.prototype._$update = function (timeInfo) {
        this.__removeDeadDCObjects();
        this.__applyMotionGroups();
    };
    ScriptedDanmaku.prototype._$render = function (renderer) {
        // Do nothing, let children render themselves.
    };
    ScriptedDanmaku.prototype.__applyMotionGroups = function () {
        var child;
        var now = this.engine.videoMillis;
        for (var i = 0; i < this._children.length; ++i) {
            child = this._children[i];
            if (child.isCreatedByDanmaku) {
                if (GLUtil_1.GLUtil.ptr(child.createParams.motion)) {
                    ScriptedDanmaku.__applyMotion(child.createParams.motion, now);
                }
                else if (GLUtil_1.GLUtil.ptr(child.createParams.motionGroup)) {
                    ScriptedDanmaku.__applyMotionGroup(child.createParams.motionGroup, now);
                }
            }
        }
    };
    ScriptedDanmaku.__applyMotionGroup = function (motionGroup, now) {
        var motion;
        if (GLUtil_1.GLUtil.ptr(motionGroup)) {
            //console.log("Calculating: ", obj, " on ", now);
            for (var i = 0; i < motionGroup.length; ++i) {
                motion = motionGroup[i];
                ScriptedDanmaku.__applyMotion(motion, now);
            }
        }
    };
    ScriptedDanmaku.__applyMotion = function (motion, now) {
        var propertyNames = ["x", "y", "alpha", "rotationZ", "rotationY"];
        var motionAnimation;
        var relativeTime;
        var value;
        if (motion.createdTime <= now && now <= motion.createdTime + motion.maximumLifeTime) {
            for (var j = 0; j < propertyNames.length; ++j) {
                motionAnimation = motion[propertyNames[j]];
                if (GLUtil_1.GLUtil.ptr(motionAnimation)) {
                    relativeTime = now - motion.createdTime;
                    if (!GLUtil_1.GLUtil.isUndefined(motionAnimation.startDelay)) {
                        relativeTime -= motionAnimation.startDelay;
                    }
                    if (relativeTime <= motionAnimation.lifeTime * 1000) {
                        // TODO: property 'repeat' is ignored here.
                        // TODO: easing usage is always interpreted as linear here.
                        value = motionAnimation.fromValue +
                            (motionAnimation.toValue - motionAnimation.fromValue) / (motionAnimation.lifeTime * 1000) * relativeTime;
                        motion.sourceObject[propertyNames[j]] = value;
                    }
                }
            }
        }
    };
    ScriptedDanmaku.prototype.__removeDeadDCObjects = function () {
        var bulletproof = this._engine;
        var child;
        for (var i = 0; i < this._children.length; ++i) {
            child = this._children[i];
            if (child.isCreatedByDanmaku) {
                if (child.extraCreateParams.bornTime + child.createParams.lifeTime * 1000 < bulletproof.videoMillis) {
                    this.removeChild(child);
                    child.dispose();
                    --i;
                }
            }
        }
    };
    ScriptedDanmaku.prototype.__buildFunction = function () {
        // Weak defense is better than none.
        // TODO: Use WebWorker to create a safety sandbox.
        var api = this._apiContainer.api;
        this._apiNames = [];
        for (var apiName in api) {
            this._apiNames.push(apiName);
        }
        var funcArgs = this._apiNames.concat(this._content);
        return Function.prototype.constructor.apply(Object.create(null), funcArgs);
    };
    ScriptedDanmaku.prototype.__applyFunction = function () {
        var ac = this._apiContainer;
        var apiValues = [];
        for (var i = 0; i < this._apiNames.length; ++i) {
            apiValues.push(ac.api[this._apiNames[i]]);
        }
        this._lambda.apply(null, apiValues);
    };
    ScriptedDanmaku.prototype.__censor = function () {
        return true;
    };
    return ScriptedDanmaku;
}(DisplayObjectContainer_1.DisplayObjectContainer));
exports.ScriptedDanmaku = ScriptedDanmaku;



},{"../../../../lib/glantern/src/gl/flash/display/DisplayObjectContainer":27,"../../../../lib/glantern/src/gl/glantern/GLUtil":94,"../../bilibili/BiliBiliDanmakuApiContainer":143,"../DanmakuKind":169}],176:[function(require,module,exports){
/**
 * Created by MIC on 2016/2/11.
 */
"use strict";
var ScriptedDanmakuHelper = (function () {
    function ScriptedDanmakuHelper() {
    }
    ScriptedDanmakuHelper.getDefaultParams = function (config) {
        return {};
    };
    return ScriptedDanmakuHelper;
}());
exports.ScriptedDanmakuHelper = ScriptedDanmakuHelper;



},{}],177:[function(require,module,exports){
/**
 * Created by MIC on 2016/2/8.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DisplayObjectContainer_1 = require("../../../../lib/glantern/src/gl/flash/display/DisplayObjectContainer");
var ScriptedDanmakuLayer = (function (_super) {
    __extends(ScriptedDanmakuLayer, _super);
    function ScriptedDanmakuLayer(root, parent) {
        _super.call(this, root, parent);
    }
    ScriptedDanmakuLayer.prototype._$update = function (timeInfo) {
    };
    ScriptedDanmakuLayer.prototype._$render = function (renderer) {
    };
    return ScriptedDanmakuLayer;
}(DisplayObjectContainer_1.DisplayObjectContainer));
exports.ScriptedDanmakuLayer = ScriptedDanmakuLayer;



},{"../../../../lib/glantern/src/gl/flash/display/DisplayObjectContainer":27}],178:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/28.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DanmakuLayoutManagerBase_1 = require("../DanmakuLayoutManagerBase");
var DanmakuKind_1 = require("../DanmakuKind");
var ScriptedDanmakuLayoutManager = (function (_super) {
    __extends(ScriptedDanmakuLayoutManager, _super);
    function ScriptedDanmakuLayoutManager(provider) {
        _super.call(this, provider);
    }
    ScriptedDanmakuLayoutManager.prototype.performLayout = function (timeInfo) {
        // Do nothing.
    };
    ScriptedDanmakuLayoutManager.prototype.onStageResize = function (sender, e) {
    };
    Object.defineProperty(ScriptedDanmakuLayoutManager.prototype, "danmakuProvider", {
        get: function () {
            return this._danmakuProvider;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScriptedDanmakuLayoutManager.prototype, "danmakuKind", {
        get: function () {
            return DanmakuKind_1.DanmakuKind.Scripted;
        },
        enumerable: true,
        configurable: true
    });
    return ScriptedDanmakuLayoutManager;
}(DanmakuLayoutManagerBase_1.DanmakuLayoutManagerBase));
exports.ScriptedDanmakuLayoutManager = ScriptedDanmakuLayoutManager;



},{"../DanmakuKind":169,"../DanmakuLayoutManagerBase":170}],179:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/28.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DanmakuProviderBase_1 = require("../DanmakuProviderBase");
var DanmakuKind_1 = require("../DanmakuKind");
var ScriptedDanmakuLayoutManager_1 = require("./ScriptedDanmakuLayoutManager");
var ScriptedDanmaku_1 = require("./ScriptedDanmaku");
var DanmakuProviderFlag_1 = require("../DanmakuProviderFlag");
var ScriptedDanmakuLayer_1 = require("./ScriptedDanmakuLayer");
var ScriptedDanmakuHelper_1 = require("./ScriptedDanmakuHelper");
var GLUtil_1 = require("../../../../lib/glantern/src/gl/glantern/GLUtil");
/**
 * An implementation of {@link DanmakuProviderBase}, for managing code damakus.
 */
var ScriptedDanmakuProvider = (function (_super) {
    __extends(ScriptedDanmakuProvider, _super);
    function ScriptedDanmakuProvider(controller) {
        _super.call(this, controller);
        this._layoutManager = new ScriptedDanmakuLayoutManager_1.ScriptedDanmakuLayoutManager(this);
    }
    Object.defineProperty(ScriptedDanmakuProvider.prototype, "danmakuKind", {
        get: function () {
            return DanmakuKind_1.DanmakuKind.Scripted;
        },
        enumerable: true,
        configurable: true
    });
    ScriptedDanmakuProvider.prototype.addDanmaku = function (content, args) {
        return _super.prototype.addDanmaku.call(this, content, args);
    };
    ScriptedDanmakuProvider.prototype.dispose = function () {
        this.layer.parent.removeChild(this.layer);
        this.layer.dispose();
        this._layoutManager.dispose();
        this._layoutManager = null;
        for (var i = 0; i < this.displayingDanmakuList.length; ++i) {
            this.displayingDanmakuList[i].dispose();
        }
        while (this.displayingDanmakuList.length > 0) {
            this.displayingDanmakuList.pop();
        }
        this._layer = null;
        this._displayingDanmakuList = null;
    };
    ScriptedDanmakuProvider.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        var stage = this.engine.stage;
        this._layer = new ScriptedDanmakuLayer_1.ScriptedDanmakuLayer(stage, stage);
        stage.addChild(this.layer);
    };
    ScriptedDanmakuProvider.prototype.canCreateDanmaku = function (args) {
        return true;
    };
    ScriptedDanmakuProvider.prototype.removeDanmaku = function (danmaku) {
        var index = this.displayingDanmakuList.indexOf(danmaku);
        if (index < 0) {
            return false;
        }
        else {
            this.engine.stage.removeChild(danmaku);
            GLUtil_1.GLUtil.removeAt(this.displayingDanmakuList, index);
            danmaku.dispose();
            return true;
        }
    };
    ScriptedDanmakuProvider.prototype.isDanmakuDead = function (timeInfo, danmaku) {
        var now = timeInfo.millisOfVideo;
        if (now < danmaku.bornTime) {
            return danmaku.executed;
        }
        else {
            return danmaku.bornTime + danmaku.lifeTime * 1000 < now;
        }
    };
    ScriptedDanmakuProvider.prototype.update = function (timeInfo) {
        _super.prototype.update.call(this, timeInfo);
        var danmaku;
        var now = timeInfo.millisOfVideo;
        for (var i = 0; i < this.displayingDanmakuList.length; ++i) {
            danmaku = this.displayingDanmakuList[i];
            if (!danmaku.executed && now >= danmaku.bornTime) {
                danmaku.execute();
            }
        }
    };
    ScriptedDanmakuProvider.prototype.updateDisplayingDanmakuList = function (timeInfo) {
        var danmaku;
        for (var i = 0; i < this.displayingDanmakuList.length; ++i) {
            danmaku = this.displayingDanmakuList[i];
            if (this.isDanmakuDead(timeInfo, danmaku)) {
                this.removeDanmaku(danmaku);
                --i;
            }
        }
    };
    Object.defineProperty(ScriptedDanmakuProvider.prototype, "layoutManager", {
        get: function () {
            return this._layoutManager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScriptedDanmakuProvider.prototype, "displayingDanmakuList", {
        get: function () {
            return this._displayingDanmakuList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScriptedDanmakuProvider.prototype, "fullDanmakuList", {
        get: function () {
            return this._displayingDanmakuList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScriptedDanmakuProvider.prototype, "layer", {
        get: function () {
            return this._layer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScriptedDanmakuProvider.prototype, "flags", {
        get: function () {
            return DanmakuProviderFlag_1.DanmakuProviderFlag.UnlimitedCreation;
        },
        enumerable: true,
        configurable: true
    });
    ScriptedDanmakuProvider.prototype._$addDanmaku = function (content, args) {
        if (!GLUtil_1.GLUtil.ptr(args)) {
            args = ScriptedDanmakuHelper_1.ScriptedDanmakuHelper.getDefaultParams(this.engine.options);
        }
        var danmaku = new ScriptedDanmaku_1.ScriptedDanmaku(this.engine.stage, this.layer, this.layoutManager, args);
        // Add to the last position of all currently active damakus to ensure being drawn as topmost.
        this.layer.addChild(danmaku);
        danmaku.initialize(content, this.engine.videoMillis);
        this.displayingDanmakuList.push(danmaku);
        return danmaku;
    };
    return ScriptedDanmakuProvider;
}(DanmakuProviderBase_1.DanmakuProviderBase));
exports.ScriptedDanmakuProvider = ScriptedDanmakuProvider;



},{"../../../../lib/glantern/src/gl/glantern/GLUtil":94,"../DanmakuKind":169,"../DanmakuProviderBase":171,"../DanmakuProviderFlag":172,"./ScriptedDanmaku":175,"./ScriptedDanmakuHelper":176,"./ScriptedDanmakuLayer":177,"./ScriptedDanmakuLayoutManager":178}],180:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/29.
 */
"use strict";
var GLUtil_1 = require("../../../../../lib/glantern/src/gl/glantern/GLUtil");
var DCOHelper = (function () {
    function DCOHelper() {
    }
    DCOHelper.fillInCreateParams = function (engine, requestingObject, createParams) {
        var r = Object.create(null);
        r.color = createParams.color;
        r.alpha = createParams.alpha;
        r.fontsize = createParams.fontsize;
        r.lifeTime = createParams.lifeTime !== undefined ? createParams.lifeTime : Number.MAX_VALUE;
        r.parent = createParams.parent;
        r.x = createParams.x;
        r.y = createParams.y;
        function __getMaximumLifeTime(motion) {
            var motionAnimation;
            var propertyNames = ["x", "y", "alpha", "rotationZ", "rotationY"];
            var maxLife = 0;
            var literalMaxLife = 0;
            for (var j = 0; j < propertyNames.length; ++j) {
                motionAnimation = motion[propertyNames[j]];
                if (GLUtil_1.GLUtil.ptr(motionAnimation)) {
                    if (GLUtil_1.GLUtil.isUndefined(motionAnimation.lifeTime)) {
                        motionAnimation.lifeTime = requestingObject.extraCreateParams.creator.lifeTime;
                    }
                    if (typeof motionAnimation.startDelay === "number") {
                        maxLife = Math.max(maxLife, motionAnimation.lifeTime * 1000 + motionAnimation.startDelay);
                    }
                    else {
                        maxLife = Math.max(maxLife, motionAnimation.lifeTime * 1000);
                    }
                    literalMaxLife = Math.max(literalMaxLife, motionAnimation.lifeTime * 1000);
                }
            }
            return {
                maxLife: maxLife,
                literalMaxLife: literalMaxLife
            };
        }
        if (GLUtil_1.GLUtil.ptr(createParams.motion) && GLUtil_1.GLUtil.ptr(createParams.motionGroup)) {
            console.warn("'motion' and 'motionGroup' are both set!");
        }
        var now = engine.videoMillis;
        var life;
        var motion;
        if (GLUtil_1.GLUtil.ptr(createParams.motion)) {
            motion = createParams.motion;
            motion.sourceObject = requestingObject;
            motion.createdTime = now;
            life = __getMaximumLifeTime(motion);
            motion.maximumLifeTime = life.maxLife;
        }
        if (GLUtil_1.GLUtil.ptr(createParams.motionGroup)) {
            for (var i = 0; i < createParams.motionGroup.length; ++i) {
                motion = createParams.motionGroup[i];
                motion.sourceObject = requestingObject;
                motion.createdTime = now;
                life = __getMaximumLifeTime(motion);
                motion.maximumLifeTime = life.maxLife;
                now += life.literalMaxLife;
            }
        }
        // Warning: shallow copy
        r.motion = createParams.motion;
        r.motionGroup = createParams.motionGroup;
        return r;
    };
    DCOHelper.applyGeneralCreateParams = function (displayObject, createParams) {
        if (!GLUtil_1.GLUtil.isUndefined(createParams.alpha)) {
            displayObject.alpha = createParams.alpha;
        }
        if (!GLUtil_1.GLUtil.isUndefined(createParams.x)) {
            displayObject.x = createParams.x;
        }
        if (!GLUtil_1.GLUtil.isUndefined(createParams.y)) {
            displayObject.y = createParams.y;
        }
    };
    DCOHelper.applyButtonCreateParams = function (displayObject, createParams) {
        DCOHelper.applyGeneralCreateParams(displayObject, createParams);
    };
    return DCOHelper;
}());
exports.DCOHelper = DCOHelper;



},{"../../../../../lib/glantern/src/gl/glantern/GLUtil":94}],181:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/29.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DCOHelper_1 = require("./DCOHelper");
var Shape_1 = require("../../../../../lib/glantern/src/gl/flash/display/Shape");
var DCShape = (function (_super) {
    __extends(DCShape, _super);
    function DCShape(root, parent, createParams, extraCreateParams) {
        _super.call(this, root, parent);
        this._extraCreateParams = null;
        this._createParams = null;
        this._createParams = DCOHelper_1.DCOHelper.fillInCreateParams(extraCreateParams.engine, this, createParams);
        this._extraCreateParams = extraCreateParams;
        DCOHelper_1.DCOHelper.applyGeneralCreateParams(this, this._createParams);
    }
    Object.defineProperty(DCShape.prototype, "createParams", {
        get: function () {
            return this._createParams;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DCShape.prototype, "extraCreateParams", {
        get: function () {
            return this._extraCreateParams;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DCShape.prototype, "isCreatedByDanmaku", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    return DCShape;
}(Shape_1.Shape));
exports.DCShape = DCShape;



},{"../../../../../lib/glantern/src/gl/flash/display/Shape":38,"./DCOHelper":180}],182:[function(require,module,exports){
/**
 * Created by MIC on 2016/1/7.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Timer_1 = require("../../../../../lib/glantern/src/gl/flash/utils/Timer");
var TimerEvent_1 = require("../../../../../lib/glantern/src/gl/flash/events/TimerEvent");
var FiniteTimer = (function (_super) {
    __extends(FiniteTimer, _super);
    function FiniteTimer(obj, delay, repeatCount) {
        if (repeatCount === void 0) { repeatCount = 1; }
        _super.call(this, delay, repeatCount);
        this._closure = null;
        this._funcSource = null;
        this._closureIsFunction = false;
        if (typeof obj === "string") {
            this._funcSource = obj;
            this._closure = new Function(this._funcSource);
            this._closureIsFunction = false;
        }
        else {
            this._closure = obj;
            this._closureIsFunction = true;
        }
        this.addEventListener(TimerEvent_1.TimerEvent.TIMER, this.__closureTimerHandler.bind(this));
        this.addEventListener(TimerEvent_1.TimerEvent.TIMER_COMPLETE, this.__closureTimerCompleteHandler.bind(this));
    }
    FiniteTimer.prototype.__closureTimerHandler = function () {
        this._closure.call(null);
    };
    FiniteTimer.prototype.__closureTimerCompleteHandler = function () {
    };
    return FiniteTimer;
}(Timer_1.Timer));
exports.FiniteTimer = FiniteTimer;



},{"../../../../../lib/glantern/src/gl/flash/events/TimerEvent":55,"../../../../../lib/glantern/src/gl/flash/utils/Timer":88}],183:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/29.
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./DCOHelper"));
__export(require("./DCShape"));



},{"./DCOHelper":180,"./DCShape":181}],184:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/29.
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./ScriptedDanmaku"));
__export(require("./ScriptedDanmakuLayoutManager"));
__export(require("./ScriptedDanmakuProvider"));
__export(require("./ScriptedDanmakuLayer"));
__export(require("./ScriptedDanmakuHelper"));
var dco = require("./dco/index");
exports.dco = dco;



},{"./ScriptedDanmaku":175,"./ScriptedDanmakuHelper":176,"./ScriptedDanmakuLayer":177,"./ScriptedDanmakuLayoutManager":178,"./ScriptedDanmakuProvider":179,"./dco/index":183}],185:[function(require,module,exports){
/**
 * Created by MIC on 2016/2/2.
 */
"use strict";
(function (SimpleDanmakuType) {
    SimpleDanmakuType[SimpleDanmakuType["None"] = 0] = "None";
    SimpleDanmakuType[SimpleDanmakuType["R2L"] = 1] = "R2L";
    SimpleDanmakuType[SimpleDanmakuType["L2R"] = 2] = "L2R";
    SimpleDanmakuType[SimpleDanmakuType["Top"] = 3] = "Top";
    SimpleDanmakuType[SimpleDanmakuType["Bottom"] = 4] = "Bottom";
    SimpleDanmakuType[SimpleDanmakuType["TopLeft"] = 5] = "TopLeft";
    SimpleDanmakuType[SimpleDanmakuType["TopRight"] = 6] = "TopRight";
    SimpleDanmakuType[SimpleDanmakuType["BottomLeft"] = 7] = "BottomLeft";
    SimpleDanmakuType[SimpleDanmakuType["BottomRight"] = 8] = "BottomRight";
    SimpleDanmakuType[SimpleDanmakuType["Max"] = 8] = "Max";
})(exports.SimpleDanmakuType || (exports.SimpleDanmakuType = {}));
var SimpleDanmakuType = exports.SimpleDanmakuType;



},{}],186:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/28.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DanmakuKind_1 = require("../DanmakuKind");
var TextDanmakuBase_1 = require("../TextDanmakuBase");
var GLUtil_1 = require("../../../../lib/glantern/src/gl/glantern/GLUtil");
var SimpleDanmaku = (function (_super) {
    __extends(SimpleDanmaku, _super);
    function SimpleDanmaku(layoutManager, createParams) {
        _super.call(this, layoutManager);
        /**
         * Gets/sets whether the Y position of this {@link SimpleDanmaku} is set. If the it is set, the {@link SimpleDanmakuLayoutManager}
         * should only change the value of X position since sudden modification to Y position will confuse audiences.
         * However, considering that size of the stage may change, simple danmakus fixed at bottom (bottom, bottom left,
         * bottom right) should recalculate their Y positions to fit in the change.
         * @type {Boolean}
         */
        this.isYSet = false;
        /**
         * Gets/sets whether the X position of this {@link SimpleDanmaku} is set. Common languages are horizontally displayed,
         * that means the X position changes much less frequently than the Y position.
         * @type {Boolean}
         */
        this.isXSet = false;
        this.displaying = false;
        this._content = null;
        this._bornTime = 0;
        this._textWidth = -1;
        this._textHeight = -1;
        this._metrics = null;
        this._createParams = createParams;
        this._layer = this.danmakuProvider.layer;
    }
    Object.defineProperty(SimpleDanmaku.prototype, "danmakuKind", {
        get: function () {
            return DanmakuKind_1.DanmakuKind.Simple;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleDanmaku.prototype, "layoutManager", {
        get: function () {
            return this._layoutManager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleDanmaku.prototype, "danmakuProvider", {
        get: function () {
            return this._danmakuProvider;
        },
        enumerable: true,
        configurable: true
    });
    SimpleDanmaku.prototype.getContent = function () {
        return this._content;
    };
    SimpleDanmaku.prototype.getText = function () {
        return this._content;
    };
    SimpleDanmaku.prototype.initialize = function (content, time) {
        this._content = content;
        this._bornTime = typeof this.createParams.bornTime === "number" ? this.createParams.bornTime : time;
    };
    Object.defineProperty(SimpleDanmaku.prototype, "bornTime", {
        get: function () {
            return this._bornTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleDanmaku.prototype, "lifeTime", {
        get: function () {
            return this.engine.options.simpleDanmakuLifeTimeSecs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleDanmaku.prototype, "layer", {
        get: function () {
            return this._layer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleDanmaku.prototype, "createParams", {
        get: function () {
            return this._createParams;
        },
        enumerable: true,
        configurable: true
    });
    SimpleDanmaku.prototype.getTextHeight = function () {
        if (this._textHeight < 0) {
            this._textHeight = this.createParams.fontSize * 1.5;
        }
        return this._textHeight;
    };
    SimpleDanmaku.prototype.getTextWidth = function () {
        if (this._textWidth < 0) {
            var context2D = this.layer.context2D;
            context2D.font = this.createParams.fontSize + "pt \"" + this.createParams.fontName + "\"";
            this._textWidth = context2D.measureText(this.getText()).width;
        }
        return this._textWidth;
    };
    Object.defineProperty(SimpleDanmaku.prototype, "width", {
        get: function () {
            return this.metrics.borderWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleDanmaku.prototype, "height", {
        get: function () {
            return this.metrics.borderHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleDanmaku.prototype, "right", {
        get: function () {
            return this.x + this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleDanmaku.prototype, "bottom", {
        get: function () {
            return this.y + this.height;
        },
        enumerable: true,
        configurable: true
    });
    SimpleDanmaku.prototype.getCommentData = function () {
        return {
            txt: this.getContent(),
            time: this.bornTime.toString(),
            color: this.createParams.textColor,
            pool: this.danmakuProvider.pool,
            mode: this.createParams.type,
            fontSize: this.createParams.fontSize
        };
    };
    SimpleDanmaku.prototype.isType = function (type) {
        return this.createParams.type === type;
    };
    Object.defineProperty(SimpleDanmaku.prototype, "metrics", {
        get: function () {
            if (!GLUtil_1.GLUtil.ptr(this._metrics)) {
                this._metrics = this.__calcMetrics();
            }
            return this._metrics;
        },
        enumerable: true,
        configurable: true
    });
    SimpleDanmaku.prototype.__calcMetrics = function () {
        var cp = this.createParams;
        var outlineThickness = cp.outline && cp.outlineThickness > 0 ? cp.outlineThickness : 0;
        var borderThickness = cp.border && cp.borderThickness > 0 ? cp.borderThickness : 0;
        var textWidth = this.getTextWidth(), textHeight = this.getTextHeight();
        var metrics = Object.create(null);
        /* Background */
        metrics.bgBaseX = metrics.bgBaseY = 0;
        metrics.bgWidth = textWidth + borderThickness * 2 + outlineThickness * 2 + 2;
        metrics.bgHeight = textHeight + borderThickness * 2 + outlineThickness * 2;
        /* Text */
        metrics.textWidth = textWidth;
        metrics.textHeight = textHeight;
        // textBase is the bottom left point.
        metrics.textBaseX = outlineThickness + borderThickness;
        metrics.textBaseY = textHeight * 0.75 + borderThickness;
        /* Outline */
        metrics.outlineBaseX = outlineThickness + borderThickness;
        metrics.outlineBaseY = textHeight * 0.75 + borderThickness;
        metrics.outlineWidth = textWidth + 2 * outlineThickness;
        metrics.outlineHeight = textHeight + 2 * outlineThickness;
        /* Border */
        metrics.borderWidth = textWidth + borderThickness * 2 + outlineThickness * 2 + 2;
        metrics.borderHeight = textHeight + borderThickness * 2 + outlineThickness * 2;
        metrics.borderBaseX = metrics.borderBaseY = 0;
        return metrics;
    };
    return SimpleDanmaku;
}(TextDanmakuBase_1.TextDanmakuBase));
exports.SimpleDanmaku = SimpleDanmaku;



},{"../../../../lib/glantern/src/gl/glantern/GLUtil":94,"../DanmakuKind":169,"../TextDanmakuBase":173}],187:[function(require,module,exports){
/**
 * Created by MIC on 2016/2/7.
 */
"use strict";
var GLUtil_1 = require("../../../../lib/glantern/src/gl/glantern/GLUtil");
var SimpleDanmakuHelper = (function () {
    function SimpleDanmakuHelper() {
    }
    SimpleDanmakuHelper.getDefaultParams = function (config) {
        return GLUtil_1.GLUtil.deepClone(config.defaultSimpleDanmakuCreateParams);
    };
    SimpleDanmakuHelper.fillInCreateParams = function (config, params) {
        function applyValue(name) {
            if (!GLUtil_1.GLUtil.ptr(params[name])) {
                params[name] = config.defaultSimpleDanmakuCreateParams[name];
            }
        }
        function setDefaultValue(name, def) {
            if (GLUtil_1.GLUtil.isUndefined(params[name])) {
                params[name] = def;
            }
        }
        // Field bornTime is ignored. See SimpleDanmaku.initialize() for more information.
        var optionNames = [
            "fontName", "fontStyle", "fontSize", "type", "border", "borderColor", "borderThickness", "background",
            "backgroundColor", "textColor", "outline", "outlineColor", "outlineThickness"
        ];
        for (var i = 0; i < optionNames.length; ++i) {
            applyValue(optionNames[i]);
        }
    };
    return SimpleDanmakuHelper;
}());
exports.SimpleDanmakuHelper = SimpleDanmakuHelper;



},{"../../../../lib/glantern/src/gl/glantern/GLUtil":94}],188:[function(require,module,exports){
/**
 * Created by MIC on 2016/2/2.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TextField_1 = require("../../../../lib/glantern/src/gl/flash/text/TextField");
var RenderHelper_1 = require("../../../../lib/glantern/src/gl/webgl/RenderHelper");
var GLUtil_1 = require("../../../../lib/glantern/src/gl/glantern/GLUtil");
var SimpleDanmakuLayer = (function (_super) {
    __extends(SimpleDanmakuLayer, _super);
    function SimpleDanmakuLayer(root, parent, provider) {
        _super.call(this, root, parent);
        this._provider = null;
        this._engine = null;
        this._provider = provider;
        this._engine = provider.engine;
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
    Object.defineProperty(SimpleDanmakuLayer.prototype, "engine", {
        get: function () {
            return this._engine;
        },
        enumerable: true,
        configurable: true
    });
    SimpleDanmakuLayer.prototype._$update = function (timeInfo) {
        if (this.danmakuProvider.displayingDanmakuList.length > 0) {
            this._canvasTarget.updateImageSize();
            this._$drawTextElements(this.context2D);
        }
    };
    SimpleDanmakuLayer.prototype._$render = function (renderer) {
        if (this.visible && this.alpha > 0 && this.danmakuProvider.displayingDanmakuList.length > 0) {
            this._canvasTarget.updateImageContent();
            RenderHelper_1.RenderHelper.copyImageContent(renderer, this._canvasTarget, renderer.currentRenderTarget, false, renderer.currentRenderTarget.isRoot, this.transform.matrix3D, this.alpha, false);
        }
    };
    SimpleDanmakuLayer.prototype._$drawTextElements = function (context2D) {
        var danmaku;
        var lastDanmaku = null;
        var danmakuList = this.danmakuProvider.displayingDanmakuList;
        context2D.clearRect(0, 0, context2D.canvas.width, context2D.canvas.height);
        for (var i = 0; i < danmakuList.length; ++i) {
            danmaku = danmakuList[i];
            SimpleDanmakuLayer.__drawSimpleDanmaku(context2D, danmaku, lastDanmaku);
            lastDanmaku = danmaku;
        }
    };
    SimpleDanmakuLayer.__drawSimpleDanmaku = function (context2D, danmaku, last) {
        if (!danmaku.visible) {
            return;
        }
        var x = danmaku.x, y = danmaku.y;
        var cp = danmaku.createParams;
        var lastCP = last ? last.createParams : null;
        var metrics = danmaku.metrics;
        if (!GLUtil_1.GLUtil.ptr(last) || cp.fontName !== lastCP.fontName ||
            cp.fontSize !== lastCP.fontSize || cp.fontStyle !== lastCP.fontStyle) {
            context2D.font = cp.fontStyle + " " + cp.fontSize + "pt \"" + cp.fontName + "\"";
        }
        if (cp.background) {
            context2D.fillStyle = GLUtil_1.GLUtil.colorToCssSharp(cp.backgroundColor);
            context2D.fillRect(x + metrics.bgBaseX, y + metrics.bgBaseY, metrics.bgWidth, metrics.bgHeight);
        }
        context2D.fillStyle = GLUtil_1.GLUtil.colorToCssSharp(cp.textColor);
        context2D.fillText(danmaku.getText(), x + metrics.textBaseX, y + metrics.textBaseY);
        if (cp.outline && cp.outlineThickness > 0) {
            context2D.lineWidth = cp.outlineThickness;
            context2D.strokeStyle = GLUtil_1.GLUtil.colorToCssSharp(cp.outlineColor);
            context2D.strokeText(danmaku.getText(), x + metrics.outlineBaseX, y + metrics.outlineBaseY);
        }
        if (cp.border && cp.borderThickness > 0) {
            context2D.lineWidth = cp.borderThickness;
            context2D.strokeStyle = GLUtil_1.GLUtil.colorToCssSharp(cp.borderColor);
            context2D.strokeRect(x + metrics.borderBaseX, y + metrics.borderBaseY, metrics.borderWidth, metrics.borderHeight);
        }
    };
    return SimpleDanmakuLayer;
}(TextField_1.TextField));
exports.SimpleDanmakuLayer = SimpleDanmakuLayer;



},{"../../../../lib/glantern/src/gl/flash/text/TextField":77,"../../../../lib/glantern/src/gl/glantern/GLUtil":94,"../../../../lib/glantern/src/gl/webgl/RenderHelper":107}],189:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/28.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DanmakuLayoutManagerBase_1 = require("../DanmakuLayoutManagerBase");
var DanmakuKind_1 = require("../DanmakuKind");
var SimpleDanamkuType_1 = require("./SimpleDanamkuType");
var ArgumentError_1 = require("../../../../lib/glantern/src/gl/flash/errors/ArgumentError");
var HorizontalR2LLayout_1 = require("./layout/HorizontalR2LLayout");
var HorizontalL2RLayout_1 = require("./layout/HorizontalL2RLayout");
var SimpleDanmakuLayoutManager = (function (_super) {
    __extends(SimpleDanmakuLayoutManager, _super);
    function SimpleDanmakuLayoutManager(provider) {
        _super.call(this, provider);
        this._stageWidth = 0;
        this._stageHeight = 0;
        this._layouts = null;
        var layouts = [];
        for (var i = 0; i <= SimpleDanamkuType_1.SimpleDanmakuType.Max; ++i) {
            layouts.push(null);
        }
        this._layouts = layouts;
    }
    SimpleDanmakuLayoutManager.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        var layouts = this._layouts;
        layouts[SimpleDanamkuType_1.SimpleDanmakuType.R2L] = new HorizontalR2LLayout_1.HorizontalR2LLayout();
        layouts[SimpleDanamkuType_1.SimpleDanmakuType.L2R] = new HorizontalL2RLayout_1.HorizontalL2RLayout();
    };
    SimpleDanmakuLayoutManager.prototype.dispose = function () {
        var layouts = this._layouts;
        while (layouts.length > 0) {
            layouts.pop();
        }
        this._layouts = null;
        _super.prototype.dispose.call(this);
    };
    SimpleDanmakuLayoutManager.prototype.performLayout = function (timeInfo) {
        // Please notice that coordinates in this method are in <canvas> coordinate system, the same as Flash & GDI
        // coordinate system (origin at top-left).
        var measureParams = this.__getMeasureParams(timeInfo.millisOfVideo);
        var displayingList = measureParams.displayingList;
        if (displayingList.length > 0) {
            for (var i = 0; i < displayingList.length; ++i) {
                var danmaku = displayingList[i];
                if (isInPlayingRange(danmaku, measureParams)) {
                    if (!danmaku.visible) {
                        danmaku.visible = true;
                    }
                    var layout = this.getLayout(danmaku.createParams.type);
                    if (layout !== null) {
                        layout.positionX(danmaku, measureParams);
                        layout.positionY(danmaku, measureParams);
                    }
                    else {
                        throw new ArgumentError_1.ArgumentError("Unknown danmaku type: " + danmaku.createParams.type);
                    }
                }
                else {
                    // Don't draw danmakus which should not appear now.
                    danmaku.visible = false;
                }
            }
        }
    };
    SimpleDanmakuLayoutManager.prototype.addDanmaku = function (danmaku) {
        var layout = this.getLayout(danmaku.createParams.type);
        if (layout !== null) {
            layout.add(danmaku);
        }
    };
    SimpleDanmakuLayoutManager.prototype.removeDanmaku = function (danmaku) {
        var layout = this.getLayout(danmaku.createParams.type);
        if (layout !== null) {
            layout.remove(danmaku);
        }
    };
    Object.defineProperty(SimpleDanmakuLayoutManager.prototype, "danmakuProvider", {
        get: function () {
            return this._danmakuProvider;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleDanmakuLayoutManager.prototype, "danmakuKind", {
        get: function () {
            return DanmakuKind_1.DanmakuKind.Simple;
        },
        enumerable: true,
        configurable: true
    });
    SimpleDanmakuLayoutManager.prototype.onStageResize = function (sender, e) {
        this._stageWidth = e.width;
        this._stageHeight = e.height;
    };
    SimpleDanmakuLayoutManager.prototype.getLayout = function (type) {
        if (0 <= type && type < this._layouts.length) {
            return this._layouts[type];
        }
        else {
            return null;
        }
    };
    SimpleDanmakuLayoutManager.prototype.__getMeasureParams = function (currenTime) {
        var stage = this.engine.stage;
        return {
            currentTime: currenTime,
            stage: stage,
            displayingList: this.danmakuProvider.displayingDanmakuList,
            stageWidth: stage.width,
            stageHeight: stage.height
        };
    };
    return SimpleDanmakuLayoutManager;
}(DanmakuLayoutManagerBase_1.DanmakuLayoutManagerBase));
exports.SimpleDanmakuLayoutManager = SimpleDanmakuLayoutManager;
function isInPlayingRange(danmaku, measureParams) {
    return danmaku.bornTime <= measureParams.currentTime && measureParams.currentTime <= danmaku.bornTime + danmaku.lifeTime * 1000;
}



},{"../../../../lib/glantern/src/gl/flash/errors/ArgumentError":48,"../DanmakuKind":169,"../DanmakuLayoutManagerBase":170,"./SimpleDanamkuType":185,"./layout/HorizontalL2RLayout":192,"./layout/HorizontalR2LLayout":194}],190:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/28.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DanmakuProviderBase_1 = require("../DanmakuProviderBase");
var DanmakuKind_1 = require("../DanmakuKind");
var SimpleDanmakuLayoutManager_1 = require("./SimpleDanmakuLayoutManager");
var SimpleDanmaku_1 = require("./SimpleDanmaku");
var DanmakuProviderFlag_1 = require("../DanmakuProviderFlag");
var SimpleDanamkuType_1 = require("./SimpleDanamkuType");
var SimpleDanmakuLayer_1 = require("./SimpleDanmakuLayer");
var SimpleDanmakuHelper_1 = require("./SimpleDanmakuHelper");
var StageResizedEventArgs_1 = require("../../bulletproof/events/StageResizedEventArgs");
var GlowFilter_1 = require("../../../../lib/glantern/src/gl/flash/filters/GlowFilter");
var GLUtil_1 = require("../../../../lib/glantern/src/gl/glantern/GLUtil");
/**
 * An implementation of {@link DanmakuProviderBase}, for managing code damakus.
 */
var SimpleDanmakuProvider = (function (_super) {
    __extends(SimpleDanmakuProvider, _super);
    function SimpleDanmakuProvider(controller) {
        _super.call(this, controller);
        this._shouldSortDanmakuList = false;
        this._fullDanmakuList = null;
        this._partialDanmakuCounts = null;
        this._partialDisplayingDanmakuCounts = null;
        this._layoutManager = new SimpleDanmakuLayoutManager_1.SimpleDanmakuLayoutManager(this);
        this._fullDanmakuList = [];
        var partialCounts = [], partialDisplayingCounts = [];
        for (var i = 0; i <= SimpleDanamkuType_1.SimpleDanmakuType.Max; ++i) {
            partialCounts.push(0);
            partialDisplayingCounts.push(0);
        }
        this._partialDanmakuCounts = partialCounts;
        this._partialDisplayingDanmakuCounts = partialDisplayingCounts;
    }
    Object.defineProperty(SimpleDanmakuProvider.prototype, "danmakuKind", {
        get: function () {
            return DanmakuKind_1.DanmakuKind.Simple;
        },
        enumerable: true,
        configurable: true
    });
    SimpleDanmakuProvider.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        var stage = this.engine.stage;
        var danmakuLayer = new SimpleDanmakuLayer_1.SimpleDanmakuLayer(stage, stage, this);
        this._layer = danmakuLayer;
        stage.addChild(this.layer);
        var glowFilter = new GlowFilter_1.GlowFilter(this.engine.renderer.filterManager, 0x2f2f2f, 0.8, 3.0, 3.0);
        danmakuLayer.filters = [glowFilter];
        danmakuLayer.alpha = 0.75;
        this.layoutManager.onStageResize(this, new StageResizedEventArgs_1.StageResizedEventArgs(stage.stageWidth, stage.stageHeight));
    };
    SimpleDanmakuProvider.prototype.dispose = function () {
        this.layer.parent.removeChild(this.layer);
        this.layer.dispose();
        this._layer = null;
        this._layoutManager.dispose();
        this._layoutManager = null;
        for (var i = 0; i < this.fullDanmakuList.length; ++i) {
            for (var i = 0; i < this.fullDanmakuList.length; ++i) {
                this.fullDanmakuList[i].dispose();
            }
        }
        while (this.fullDanmakuList.length > 0) {
            this.fullDanmakuList.pop();
        }
        while (this.displayingDanmakuList.length > 0) {
            this.displayingDanmakuList.pop();
        }
        this._fullDanmakuList = null;
        this._displayingDanmakuList = null;
    };
    SimpleDanmakuProvider.prototype.canCreateDanmaku = function (args) {
        var config = this.engine.options;
        var type = GLUtil_1.GLUtil.ptr(args) ? args.type : config.defaultSimpleDanmakuCreateParams.type;
        var count = this.partialDanmakuCounts[type];
        return GLUtil_1.GLUtil.isUndefined(count) ? false : count < config.simpleDanmakuPartCountThreshold;
    };
    SimpleDanmakuProvider.prototype.addDanmaku = function (content, args) {
        return _super.prototype.addDanmaku.call(this, content, args);
    };
    SimpleDanmakuProvider.prototype.removeDanmaku = function (danmaku) {
        var index;
        var b = false;
        index = this.fullDanmakuList.indexOf(danmaku);
        if (index >= 0) {
            GLUtil_1.GLUtil.removeAt(this.fullDanmakuList, index);
            --this.partialDanmakuCounts[danmaku.createParams.type];
            b = true;
        }
        index = this.displayingDanmakuList.indexOf(danmaku);
        if (index >= 0) {
            GLUtil_1.GLUtil.removeAt(this.displayingDanmakuList, index);
            --this.partialDisplayingDanmakuCounts[danmaku.createParams.type];
        }
        return b;
    };
    SimpleDanmakuProvider.prototype.updateDisplayingDanmakuList = function (timeInfo) {
        var partialDisplayingCounts = this.partialDisplayingDanmakuCounts;
        var fullList = this.fullDanmakuList;
        var displayingList = this.displayingDanmakuList;
        // TODO: The algorithm can be optimized!
        var now = timeInfo.millisOfVideo;
        var config = this.engine.options;
        var danmaku;
        var layoutManager = this.layoutManager;
        // We don't handle the situation where cursor is at 00:20, and a danmaku born at 00:15 with life 10s is added.
        // In this situation, the new danmaku is just ignored.
        if (displayingList.length > 0) {
            // Fortunately we have the displaying list for reference.
            // *Assume* that we only play in normal order and don't seek through the track. So we just need to:
            // 1) remove old danmakus in the front of the displaying list;
            // 2) search the danmakus just next to the last in the displaying list.
            var lastDisplayingDanmaku = null;
            for (var i = 0; i < displayingList.length; ++i) {
                danmaku = displayingList[i];
                if (this.isDanmakuDead(timeInfo, danmaku)) {
                    lastDisplayingDanmaku = danmaku;
                    var type = danmaku.createParams.type;
                    --partialDisplayingCounts[type];
                    layoutManager.removeDanmaku(danmaku);
                    GLUtil_1.GLUtil.removeAt(displayingList, i);
                    --i;
                }
                else {
                    break;
                }
            }
            // If we removed the last available danmaku in displaying list, we have to use the last removed one as reference.
            var referenceDanmaku = displayingList.length > 0 ? displayingList[displayingList.length - 1] : lastDisplayingDanmaku;
            // Skip danmakus in the front. Beware that the whole list may be skipped.
            var i = fullList.indexOf(referenceDanmaku) + 1;
            if (i < fullList.length) {
                for (; i < fullList.length; ++i) {
                    danmaku = fullList[i];
                    if (danmaku.bornTime > now) {
                        break;
                    }
                    else {
                        var type = danmaku.createParams.type;
                        if (partialDisplayingCounts[type] < config.simpleDanmakuPartCountThreshold) {
                            displayingList.push(danmaku);
                            layoutManager.addDanmaku(danmaku);
                            ++partialDisplayingCounts[type];
                        }
                    }
                }
            }
        }
        else {
            // If there is no displaying danmakus, we have to search a little more...
            for (var i = 0; i < fullList.length; ++i) {
                danmaku = fullList[i];
                if (danmaku.bornTime > now) {
                    break;
                }
                if (!this.isDanmakuDead(timeInfo, danmaku)) {
                    var type = danmaku.createParams.type;
                    if (partialDisplayingCounts[type] < config.simpleDanmakuPartCountThreshold) {
                        displayingList.push(fullList[i]);
                        layoutManager.addDanmaku(fullList[i]);
                        ++partialDisplayingCounts[type];
                    }
                }
            }
        }
    };
    SimpleDanmakuProvider.prototype.isDanmakuDead = function (timeInfo, danmaku) {
        var now = timeInfo.millisOfVideo;
        return now < danmaku.bornTime || danmaku.bornTime + danmaku.lifeTime * 1000 < now;
    };
    Object.defineProperty(SimpleDanmakuProvider.prototype, "layoutManager", {
        get: function () {
            return this._layoutManager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleDanmakuProvider.prototype, "partialDanmakuCounts", {
        get: function () {
            return this._partialDanmakuCounts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleDanmakuProvider.prototype, "displayingDanmakuList", {
        get: function () {
            return this._displayingDanmakuList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleDanmakuProvider.prototype, "fullDanmakuList", {
        get: function () {
            return this._fullDanmakuList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleDanmakuProvider.prototype, "partialDisplayingDanmakuCounts", {
        get: function () {
            return this._partialDisplayingDanmakuCounts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleDanmakuProvider.prototype, "flags", {
        get: function () {
            return DanmakuProviderFlag_1.DanmakuProviderFlag.None;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleDanmakuProvider.prototype, "layer", {
        get: function () {
            return this._layer;
        },
        enumerable: true,
        configurable: true
    });
    SimpleDanmakuProvider.prototype.update = function (timeInfo) {
        if (this._shouldSortDanmakuList) {
            this.fullDanmakuList.sort(function (d1, d2) {
                return d1.bornTime - d2.bornTime;
            });
            this._shouldSortDanmakuList = false;
        }
        _super.prototype.update.call(this, timeInfo);
    };
    SimpleDanmakuProvider.prototype._$addDanmaku = function (content, args) {
        var options = this.engine.options;
        if (GLUtil_1.GLUtil.ptr(args)) {
            SimpleDanmakuHelper_1.SimpleDanmakuHelper.fillInCreateParams(options, args);
        }
        else {
            args = SimpleDanmakuHelper_1.SimpleDanmakuHelper.getDefaultParams(options);
        }
        var danmaku = new SimpleDanmaku_1.SimpleDanmaku(this.layoutManager, args);
        danmaku.initialize(content, this.engine.videoMillis);
        this.fullDanmakuList.push(danmaku);
        ++this.partialDanmakuCounts[args.type];
        this._shouldSortDanmakuList = true;
        return danmaku;
    };
    return SimpleDanmakuProvider;
}(DanmakuProviderBase_1.DanmakuProviderBase));
exports.SimpleDanmakuProvider = SimpleDanmakuProvider;



},{"../../../../lib/glantern/src/gl/flash/filters/GlowFilter":59,"../../../../lib/glantern/src/gl/glantern/GLUtil":94,"../../bulletproof/events/StageResizedEventArgs":165,"../DanmakuKind":169,"../DanmakuProviderBase":171,"../DanmakuProviderFlag":172,"./SimpleDanamkuType":185,"./SimpleDanmaku":186,"./SimpleDanmakuHelper":187,"./SimpleDanmakuLayer":188,"./SimpleDanmakuLayoutManager":189}],191:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/29.
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./SimpleDanmaku"));
__export(require("./SimpleDanmakuLayoutManager"));
__export(require("./SimpleDanmakuProvider"));
__export(require("./SimpleDanamkuType"));
__export(require("./SimpleDanmakuHelper"));
__export(require("./SimpleDanmakuLayer"));
var layout = require("./layout/index");
exports.layout = layout;



},{"./SimpleDanamkuType":185,"./SimpleDanmaku":186,"./SimpleDanmakuHelper":187,"./SimpleDanmakuLayer":188,"./SimpleDanmakuLayoutManager":189,"./SimpleDanmakuProvider":190,"./layout/index":196}],192:[function(require,module,exports){
/**
 * Created by MIC on 2016/7/2.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HorizontalLayout_1 = require("./HorizontalLayout");
var HorizontalL2RLayout = (function (_super) {
    __extends(HorizontalL2RLayout, _super);
    function HorizontalL2RLayout() {
        _super.apply(this, arguments);
    }
    HorizontalL2RLayout.prototype._$getNewX = function (danmaku, stageWidth, lifeRatio) {
        return -(danmaku.width + 5) + lifeRatio * (stageWidth + danmaku.width + 5);
    };
    HorizontalL2RLayout.prototype._$isDanmakuFullyOnStage = function (danmaku, stageWidth) {
        return danmaku.x >= 0;
    };
    HorizontalL2RLayout.prototype._$getDefaultX = function (danmaku, stageWidth) {
        return -(danmaku.width + 5);
    };
    return HorizontalL2RLayout;
}(HorizontalLayout_1.HorizontalLayout));
exports.HorizontalL2RLayout = HorizontalL2RLayout;



},{"./HorizontalLayout":193}],193:[function(require,module,exports){
/**
 * Created by MIC on 2016/7/2.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SimpleLayoutBase_1 = require("./SimpleLayoutBase");
var SimpleDanamkuType_1 = require("../SimpleDanamkuType");
var GLUtil_1 = require("../../../../../lib/glantern/src/gl/glantern/GLUtil");
var BPUtil_1 = require("../../../bulletproof/BPUtil");
var Rectangle_1 = require("../../../../../lib/glantern/src/gl/flash/geom/Rectangle");
var HorizontalLayout = (function (_super) {
    __extends(HorizontalLayout, _super);
    function HorizontalLayout() {
        _super.call(this);
        this._ySortedList = null;
        this._ySortedList = [];
    }
    HorizontalLayout.prototype.positionX = function (danmaku, measureParams) {
        var elapsedLifeRatio = (measureParams.currentTime - danmaku.bornTime) / (danmaku.lifeTime * 1000);
        danmaku.x = this._$getNewX(danmaku, measureParams.stageWidth, elapsedLifeRatio);
    };
    HorizontalLayout.prototype.positionY = function (danmaku, measureParams) {
        if (danmaku.isYSet) {
            return;
        }
        var ySortedList = this._ySortedList;
        var ySortedListLength = ySortedList.length;
        var currentHost;
        var stageWidth = measureParams.stageWidth;
        var stageHeight = measureParams.stageHeight;
        // if (ySortedListLength > 0) {
        //     var lastHostBottom = 0;
        //     for (var i = 0; i < ySortedListLength; ++i) {
        //         currentHost = ySortedList[i];
        //         if (currentHost.y - lastHostBottom > danmaku.height) {
        //             // If there is enough vertical space for current danmaku to insert into, just place it there.
        //             danmaku.y = lastHostBottom;
        //             danmaku.isYSet = true;
        //             break;
        //         }
        //         lastHostBottom = currentHost.bottom + 1;
        //     }
        // } else {
        //     danmaku.y = 0;
        //     danmaku.isYSet = true;
        // }
        if (ySortedListLength <= 0) {
            danmaku.y = 0;
            danmaku.isYSet = true;
        }
        if (!danmaku.isYSet) {
            // Scan to stage's top to bottom, and find a place which is able to fill in the new danmaku.
            // The host is fully on stage, and the host is able to "contain" the new danmaku
            // vertically, so the new danmaku should horizontally follow the host.
            var xForNewDanmaku = this._$getDefaultX(danmaku, stageWidth);
            var yForNewDanmaku = 0;
            for (var i = 0; i < ySortedListLength; ++i) {
                var danmakuRect = new Rectangle_1.Rectangle(xForNewDanmaku, yForNewDanmaku, danmaku.width, danmaku.height);
                var intersectionTestPassed = false;
                var testResultChanged = false;
                // Start the scan for space.
                // TODO: Lower the iteration cost.
                console.log("Outer loop: i = " + i);
                for (var j = i; j < ySortedListLength; ++j) {
                    var testHost = ySortedList[j];
                    console.log("Inner loop: j = " + j);
                    if (testHost.y > yForNewDanmaku + danmaku.height) {
                        // The test host is vertically too far from our test subject.
                        // TODO: Can we use 'i = j;' here to accelerate our search?
                        console.log("Inner loop: break - vertical");
                        intersectionTestPassed = true;
                        testResultChanged = true;
                        break;
                    }
                    var testHostRect = new Rectangle_1.Rectangle(testHost.x, testHost.y, testHost.width, testHost.height);
                    var intersects = Rectangle_1.Rectangle.testIntersection(testHostRect, danmakuRect);
                    console.log("Comparing: v1{" + testHost.x + "," + testHost.y + "," + testHost.width + "," + testHost.height + "}v2{" + xForNewDanmaku + "," + yForNewDanmaku + "," + danmaku.width + "," + danmaku.height + "},i:" + intersects);
                    if (intersects) {
                        //intersectionTestPassed = false;
                        console.log("Inner loop: break - test failed");
                        testResultChanged = true;
                        break;
                    }
                }
                if (!intersectionTestPassed && !testResultChanged && i >= ySortedListLength) {
                    if (yForNewDanmaku + danmaku.height < stageHeight) {
                        intersectionTestPassed = true;
                        console.log("Outer loop: extra passed");
                    }
                }
                if (intersectionTestPassed) {
                    danmaku.y = yForNewDanmaku;
                    danmaku.isYSet = true;
                    break;
                }
                else {
                    // Skip redundant iterations.
                    var oi = i;
                    do {
                        if (ySortedList[i].y <= yForNewDanmaku) {
                            ++i;
                        }
                        else {
                            break;
                        }
                    } while (i < ySortedListLength);
                    if (i < ySortedListLength) {
                        --i;
                        console.log("Outer loop: skipped from " + oi + " to " + i);
                        yForNewDanmaku = ySortedList[i].bottom + 1;
                    }
                    else {
                        break;
                    }
                }
            }
        }
        if (!danmaku.isYSet) {
            // If the new danmaku's Y coordinate is still unset, it should vertically follow the latest danmaku in the
            // displaying list. If there is an overflow, set the new danmaku's Y coordinate to 0.
            // The displaying list is sorted by birth time.
            // BTW, the case when the length of the displaying list is 0 is handled in `ySortedListLength > 0`.
            var displayingList = measureParams.displayingList;
            var displayingListLength = displayingList.length;
            var latestHorizontalDanmakuInDL = null;
            for (var i = displayingListLength - 1; i >= 0; --i) {
                var dan = displayingList[i];
                if (isDanmakuHorizontal(dan) && dan.isYSet) {
                    latestHorizontalDanmakuInDL = displayingList[i];
                    break;
                }
            }
            if (latestHorizontalDanmakuInDL !== null && latestHorizontalDanmakuInDL.bottom + danmaku.height <= stageHeight) {
                danmaku.y = latestHorizontalDanmakuInDL.bottom + 1;
            }
            else {
                danmaku.y = 0;
            }
            danmaku.isYSet = true;
        }
        console.info("Y coord: " + danmaku.y + ", yList:", ySortedList);
        this.__updateYSortedList(danmaku);
    };
    HorizontalLayout.prototype.add = function (danmaku) {
    };
    HorizontalLayout.prototype.remove = function (danmaku) {
        GLUtil_1.GLUtil.remove(this._ySortedList, danmaku);
    };
    HorizontalLayout.prototype.__updateYSortedList = function (danmaku) {
        BPUtil_1.BPUtil.binaryInsert(this._ySortedList, danmaku, function (toInsert, standard) {
            var yDiff = toInsert.y - standard.y;
            return yDiff !== 0 ? toInsert.x - standard.x : yDiff;
        });
    };
    return HorizontalLayout;
}(SimpleLayoutBase_1.SimpleLayoutBase));
exports.HorizontalLayout = HorizontalLayout;
function isDanmakuHorizontal(danmaku) {
    return danmaku.isType(SimpleDanamkuType_1.SimpleDanmakuType.R2L) || danmaku.isType(SimpleDanamkuType_1.SimpleDanmakuType.L2R);
}



},{"../../../../../lib/glantern/src/gl/flash/geom/Rectangle":67,"../../../../../lib/glantern/src/gl/glantern/GLUtil":94,"../../../bulletproof/BPUtil":162,"../SimpleDanamkuType":185,"./SimpleLayoutBase":195}],194:[function(require,module,exports){
/**
 * Created by MIC on 2016/7/2.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HorizontalLayout_1 = require("./HorizontalLayout");
var HorizontalR2LLayout = (function (_super) {
    __extends(HorizontalR2LLayout, _super);
    function HorizontalR2LLayout() {
        _super.apply(this, arguments);
    }
    HorizontalR2LLayout.prototype._$getNewX = function (danmaku, stageWidth, lifeRatio) {
        return stageWidth - lifeRatio * (stageWidth + danmaku.width + 5);
    };
    HorizontalR2LLayout.prototype._$isDanmakuFullyOnStage = function (danmaku, stageWidth) {
        return danmaku.x < stageWidth - danmaku.width;
    };
    HorizontalR2LLayout.prototype._$getDefaultX = function (danmaku, stageWidth) {
        return stageWidth;
    };
    return HorizontalR2LLayout;
}(HorizontalLayout_1.HorizontalLayout));
exports.HorizontalR2LLayout = HorizontalR2LLayout;



},{"./HorizontalLayout":193}],195:[function(require,module,exports){
/**
 * Created by MIC on 2016/7/2.
 */
"use strict";
var SimpleLayoutBase = (function () {
    function SimpleLayoutBase() {
    }
    return SimpleLayoutBase;
}());
exports.SimpleLayoutBase = SimpleLayoutBase;



},{}],196:[function(require,module,exports){
/**
 * Created by MIC on 2016/6/13.
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./SimpleLayoutBase"));
__export(require("./HorizontalLayout"));
__export(require("./HorizontalR2LLayout"));
__export(require("./HorizontalL2RLayout"));



},{"./HorizontalL2RLayout":192,"./HorizontalLayout":193,"./HorizontalR2LLayout":194,"./SimpleLayoutBase":195}],197:[function(require,module,exports){
/**
 * Created by MIC on 2016/7/15.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ErrorBase_1 = require("../../../../lib/glantern/src/gl/glantern/ErrorBase");
var OutOfRangeError = (function (_super) {
    __extends(OutOfRangeError, _super);
    function OutOfRangeError() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(OutOfRangeError.prototype, "name", {
        get: function () {
            return "OutOfRangeError";
        },
        enumerable: true,
        configurable: true
    });
    return OutOfRangeError;
}(ErrorBase_1.ErrorBase));
exports.OutOfRangeError = OutOfRangeError;



},{"../../../../lib/glantern/src/gl/glantern/ErrorBase":92}],198:[function(require,module,exports){
/**
 * Created by MIC on 2016/7/15.
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./OutOfRangeError"));



},{"./OutOfRangeError":197}],199:[function(require,module,exports){
/**
 * Created by MIC on 2016/7/15.
 */
"use strict";
var errors = require("./errors/index");
exports.errors = errors;



},{"./errors/index":198}],200:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/28.
 */
"use strict";
var VERSION = "0.6.0-alpha";
exports.version = VERSION;
var USER_AGENT = "Bulletproof/" + VERSION + " (BiliBili, like BSE, like CCL, like Flash)";
exports.userAgent = USER_AGENT;
// Bulletproof
var bilibili = require("./bilibili/index");
exports.bilibili = bilibili;
var danmaku = require("./danmaku/index");
exports.danmaku = danmaku;
var interactive = require("./interactive/index");
exports.interactive = interactive;
var DefaultEngineOptions_1 = require("./bulletproof/DefaultEngineOptions");
exports.defaultOptions = DefaultEngineOptions_1.DefaultEngineOptions;
var bulletproof = require("./bulletproof/index");
exports.bulletproof = bulletproof;
var Engine = bulletproof.Engine;
exports.Engine = Engine;
// GLantern
var gl_root = require("../../lib/glantern/src/gl/index");
var flash = gl_root.flash;
exports.flash = flash;
var fl = gl_root.fl;
exports.fl = fl;
var mx = gl_root.mx;
exports.mx = mx;
var glantern = gl_root.glantern;
exports.glantern = glantern;
var webgl = gl_root.webgl;
exports.webgl = webgl;
var injectToGlobal = gl_root.injectToGlobal;
exports.injectToGlobal = injectToGlobal;
var isSupported = gl_root.isSupported;
exports.isSupported = isSupported;
var flash_fix = require("./flash/index");
fuse(flash, flash_fix);
function fuse(baseObject, attachment) {
    for (var propName in attachment) {
        if (baseObject.hasOwnProperty(propName)) {
            fuse(baseObject[propName], attachment[propName]);
        }
        else {
            baseObject[propName] = attachment[propName];
        }
    }
}



},{"../../lib/glantern/src/gl/index":98,"./bilibili/index":160,"./bulletproof/DefaultEngineOptions":163,"./bulletproof/index":167,"./danmaku/index":174,"./flash/index":199,"./interactive/index":201}],201:[function(require,module,exports){
/**
 * Created by MIC on 2016/2/8.
 */
"use strict";
var video = require("./video/index");
exports.video = video;



},{"./video/index":207}],202:[function(require,module,exports){
/**
 * Created by MIC on 2016/2/8.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var VideoPlayerState_1 = require("./VideoPlayerState");
var NotImplementedError_1 = require("../../../../lib/glantern/src/gl/flash/errors/NotImplementedError");
var EventDispatcher_1 = require("../../../../lib/glantern/src/gl/flash/events/EventDispatcher");
var VideoPlayerBase = (function (_super) {
    __extends(VideoPlayerBase, _super);
    function VideoPlayerBase() {
        _super.call(this);
    }
    Object.defineProperty(VideoPlayerBase.prototype, "currentTime", {
        /**
         * Gets current playing timestamp, in seconds.
         * @returns {Number}
         */
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        set: function (v) {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(VideoPlayerBase.prototype, "currentRatio", {
        /**
         * Gets current playing ratio. The ratio is a value between 0 and 1 from start to end.
         * @returns {Number}
         */
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        set: function (v) {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "duration", {
        /**
         * Gets the duration of current video, in seconds.
         */
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "autoPlay", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        set: function (v) {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "loop", {
        /**
         * Gets whether the video should be looped.
         */
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        set: function (v) {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "muted", {
        /**
         * Gets whether the video should be muted.
         */
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        set: function (v) {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "defaultMuted", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        set: function (v) {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "playbackRate", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        set: function (v) {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "defaultPlaybackRate", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        set: function (v) {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "volume", {
        /**
         * Gets current volume. The value is between 0 and 1 from silence to maximum volume.
         */
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        set: function (v) {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "state", {
        /**
         * Gets the state enum of the player.
         */
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "stateText", {
        get: function () {
            return VideoPlayerState_1.VideoPlayerState[this.state];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "playing", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "paused", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "seeking", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "videoWidth", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "videoHeight", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "fileURL", {
        /**
         * Gets the URL of current video.
         */
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "hasVideo", {
        /**
         * Gets whether there is a video prepared.
         */
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "view", {
        /**
         * Gets the element created by the player.
         */
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    return VideoPlayerBase;
}(EventDispatcher_1.EventDispatcher));
exports.VideoPlayerBase = VideoPlayerBase;



},{"../../../../lib/glantern/src/gl/flash/errors/NotImplementedError":51,"../../../../lib/glantern/src/gl/flash/events/EventDispatcher":53,"./VideoPlayerState":204}],203:[function(require,module,exports){
/**
 * Created by MIC on 2016/6/13.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventBase_1 = require("../../../../lib/glantern/src/gl/glantern/EventBase");
var VideoPlayerEvent = (function (_super) {
    __extends(VideoPlayerEvent, _super);
    function VideoPlayerEvent() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(VideoPlayerEvent, "VIDEO_ENDED", {
        get: function () {
            return "videoEnded";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerEvent, "VIDEO_PLAY", {
        get: function () {
            return "videoPlay";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerEvent, "VIDEO_PAUSE", {
        get: function () {
            return "videoPause";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerEvent, "VIDEO_PLAYING", {
        get: function () {
            return "videoPlaying";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerEvent, "VIDEO_SEEKED", {
        get: function () {
            return "videoSeeked";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerEvent, "VIDEO_SEEKING", {
        get: function () {
            return "videoSeeking";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerEvent, "VIDEO_LOADED_DATA", {
        get: function () {
            return "videoLoadedData";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerEvent, "VIDEO_TIME_UPDATE", {
        get: function () {
            return "videoTimeUpdate";
        },
        enumerable: true,
        configurable: true
    });
    return VideoPlayerEvent;
}(EventBase_1.EventBase));
exports.VideoPlayerEvent = VideoPlayerEvent;



},{"../../../../lib/glantern/src/gl/glantern/EventBase":93}],204:[function(require,module,exports){
/**
 * Created by MIC on 2016/2/8.
 */
"use strict";
(function (VideoPlayerState) {
    VideoPlayerState[VideoPlayerState["Invalid"] = -1] = "Invalid";
    VideoPlayerState[VideoPlayerState["Created"] = 0] = "Created";
    VideoPlayerState[VideoPlayerState["Initialized"] = 1] = "Initialized";
    VideoPlayerState[VideoPlayerState["Loaded"] = 2] = "Loaded";
    VideoPlayerState[VideoPlayerState["Playing"] = 3] = "Playing";
    VideoPlayerState[VideoPlayerState["Paused"] = 4] = "Paused";
    VideoPlayerState[VideoPlayerState["Stopped"] = 5] = "Stopped";
    VideoPlayerState[VideoPlayerState["Seeking"] = 6] = "Seeking";
})(exports.VideoPlayerState || (exports.VideoPlayerState = {}));
var VideoPlayerState = exports.VideoPlayerState;



},{}],205:[function(require,module,exports){
/**
 * Created by MIC on 2016/2/8.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var VideoPlayerBase_1 = require("../VideoPlayerBase");
var VideoPlayerState_1 = require("../VideoPlayerState");
var GLUtil_1 = require("../../../../../lib/glantern/src/gl/glantern/GLUtil");
var MathUtil_1 = require("../../../../../lib/glantern/src/gl/glantern/MathUtil");
var VideoPlayerEvent_1 = require("../VideoPlayerEvent");
var EventBase_1 = require("../../../../../lib/glantern/src/gl/glantern/EventBase");
var Html5VideoPlayer = (function (_super) {
    __extends(Html5VideoPlayer, _super);
    function Html5VideoPlayer(videoElement) {
        if (videoElement === void 0) { videoElement = null; }
        _super.call(this);
        this._videoElement = null;
        this._state = VideoPlayerState_1.VideoPlayerState.Invalid;
        this._originalStateBeforeSeeking = VideoPlayerState_1.VideoPlayerState.Invalid;
        this._eventHandlers = null;
        if (!GLUtil_1.GLUtil.ptr(videoElement) || !(videoElement instanceof HTMLVideoElement)) {
            videoElement = window.document.createElement("video");
        }
        this._videoElement = videoElement;
        this._eventHandlers = [];
        this._state = VideoPlayerState_1.VideoPlayerState.Created;
    }
    Html5VideoPlayer.prototype.initialize = function (width, height) {
        var vid = this._videoElement;
        var handlers = this._eventHandlers;
        vid.width = width;
        vid.height = height;
        var $this = this;
        function addListener(name, listener) {
            var f = listener.bind($this);
            handlers.push({ name: name, handler: f });
            vid.addEventListener(name, f);
        }
        addListener("ended", this.__onEnded);
        addListener("play", this.__onPlay);
        addListener("playing", this.__onPlaying);
        addListener("pause", this.__onPause);
        addListener("loadeddata", this.__onLoadedData);
        // This is not a spelling mistake.
        addListener("seeked", this.__onSeeked);
        addListener("seeking", this.__onSeeking);
        addListener("timeupdate", this.__onTimeUpdate);
    };
    Html5VideoPlayer.prototype.dispose = function () {
        var video = this._videoElement;
        var videoParent = video.parentElement;
        var handlers = this._eventHandlers;
        for (var i = 0; i < handlers.length; ++i) {
            video.removeEventListener(handlers[i].name, handlers[i].handler);
        }
        if (GLUtil_1.GLUtil.ptr(videoParent)) {
            videoParent.removeChild(video);
        }
        while (handlers.length > 0) {
            handlers.pop();
        }
        this._state = VideoPlayerState_1.VideoPlayerState.Invalid;
        this._videoElement = null;
        this._eventHandlers = null;
        _super.prototype.dispose.call(this);
    };
    Html5VideoPlayer.prototype.load = function (url) {
        if (this._state !== VideoPlayerState_1.VideoPlayerState.Invalid) {
            this.unload();
            try {
                this._videoElement.src = url;
                this._state = VideoPlayerState_1.VideoPlayerState.Loaded;
                return true;
            }
            catch (ex) {
                return false;
            }
        }
    };
    Html5VideoPlayer.prototype.unload = function () {
        if (this.hasVideo) {
            this.stop();
            this._videoElement.src = null;
            this._state = VideoPlayerState_1.VideoPlayerState.Initialized;
        }
    };
    Html5VideoPlayer.prototype.play = function () {
        if (this.hasVideo) {
            this._videoElement.play();
            this._state = VideoPlayerState_1.VideoPlayerState.Playing;
        }
    };
    Html5VideoPlayer.prototype.pause = function () {
        if (this.hasVideo) {
            this._videoElement.pause();
            this._state = VideoPlayerState_1.VideoPlayerState.Paused;
        }
    };
    Html5VideoPlayer.prototype.resume = function () {
        if (this.hasVideo) {
            if (this._state === VideoPlayerState_1.VideoPlayerState.Paused) {
                this.play();
            }
        }
    };
    Html5VideoPlayer.prototype.stop = function () {
        if (this.hasVideo) {
            this._videoElement.pause();
            this._videoElement.currentTime = 0;
            this._state = VideoPlayerState_1.VideoPlayerState.Stopped;
        }
    };
    Object.defineProperty(Html5VideoPlayer.prototype, "currentTime", {
        get: function () {
            return this.hasVideo ? this._videoElement.currentTime : 0;
        },
        set: function (v) {
            if (this.hasVideo) {
                this._videoElement.currentTime = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "currentRatio", {
        get: function () {
            return this.hasVideo ? this.currentTime / this.duration : 0;
        },
        set: function (v) {
            if (this.hasVideo) {
                v = MathUtil_1.MathUtil.clamp(v, 0, 1);
                this.currentTime = v * this.duration;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "duration", {
        get: function () {
            return this.hasVideo ? this._videoElement.duration : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "autoPlay", {
        get: function () {
            return this._videoElement !== null ? this._videoElement.autoplay : false;
        },
        set: function (v) {
            if (this._videoElement !== null) {
                this._videoElement.autoplay = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "loop", {
        get: function () {
            return this._videoElement !== null ? this._videoElement.loop : false;
        },
        set: function (v) {
            if (this._videoElement !== null) {
                this._videoElement.loop = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "muted", {
        get: function () {
            return this._videoElement !== null ? this._videoElement.muted : false;
        },
        set: function (v) {
            if (this._videoElement !== null) {
                this._videoElement.muted = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "defaultMuted", {
        get: function () {
            return this._videoElement !== null ? this._videoElement.defaultMuted : false;
        },
        set: function (v) {
            if (this._videoElement !== null) {
                this._videoElement.defaultMuted = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "playbackRate", {
        get: function () {
            return this._videoElement !== null ? this._videoElement.playbackRate : 0;
        },
        set: function (v) {
            if (this._videoElement !== null) {
                this._videoElement.playbackRate = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "defaultPlaybackRate", {
        get: function () {
            return this._videoElement !== null ? this._videoElement.defaultPlaybackRate : 0;
        },
        set: function (v) {
            if (this._videoElement !== null) {
                this._videoElement.defaultPlaybackRate = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "volume", {
        get: function () {
            return this._videoElement !== null ? this._videoElement.volume / 200 : 0;
        },
        set: function (v) {
            if (this._videoElement !== null) {
                v = MathUtil_1.MathUtil.clamp(v, 0, 1);
                this._videoElement.volume = v * 200;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "playing", {
        get: function () {
            return this.state === VideoPlayerState_1.VideoPlayerState.Playing;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "paused", {
        get: function () {
            return this.state === VideoPlayerState_1.VideoPlayerState.Paused;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "seeking", {
        get: function () {
            return this._videoElement !== null ? this._videoElement.seeking : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "videoWidth", {
        get: function () {
            return this._videoElement !== null ? this._videoElement.videoWidth : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "videoHeight", {
        get: function () {
            return this._videoElement !== null ? this._videoElement.videoHeight : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "fileURL", {
        get: function () {
            return this._videoElement !== null ? this._videoElement.currentSrc : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "hasVideo", {
        get: function () {
            return this.state > VideoPlayerState_1.VideoPlayerState.Initialized;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "view", {
        get: function () {
            return this._videoElement;
        },
        enumerable: true,
        configurable: true
    });
    Html5VideoPlayer.prototype.__onEnded = function (ev) {
        this._state = VideoPlayerState_1.VideoPlayerState.Stopped;
        this.dispatchEvent(EventBase_1.EventBase.create(VideoPlayerEvent_1.VideoPlayerEvent.VIDEO_ENDED));
    };
    Html5VideoPlayer.prototype.__onPlay = function (ev) {
        this._state = VideoPlayerState_1.VideoPlayerState.Playing;
        this.dispatchEvent(EventBase_1.EventBase.create(VideoPlayerEvent_1.VideoPlayerEvent.VIDEO_PLAY));
    };
    Html5VideoPlayer.prototype.__onPause = function (ev) {
        this._state = VideoPlayerState_1.VideoPlayerState.Paused;
        this.dispatchEvent(EventBase_1.EventBase.create(VideoPlayerEvent_1.VideoPlayerEvent.VIDEO_PAUSE));
    };
    Html5VideoPlayer.prototype.__onPlaying = function (ev) {
        this._state = VideoPlayerState_1.VideoPlayerState.Playing;
        this.dispatchEvent(EventBase_1.EventBase.create(VideoPlayerEvent_1.VideoPlayerEvent.VIDEO_PLAYING));
    };
    Html5VideoPlayer.prototype.__onSeeked = function (ev) {
        this._state = this._originalStateBeforeSeeking;
        this.dispatchEvent(EventBase_1.EventBase.create(VideoPlayerEvent_1.VideoPlayerEvent.VIDEO_SEEKED));
    };
    Html5VideoPlayer.prototype.__onSeeking = function (ev) {
        this._originalStateBeforeSeeking = this._state;
        this._state = VideoPlayerState_1.VideoPlayerState.Seeking;
        this.dispatchEvent(EventBase_1.EventBase.create(VideoPlayerEvent_1.VideoPlayerEvent.VIDEO_SEEKING));
    };
    Html5VideoPlayer.prototype.__onLoadedData = function (ev) {
        if (this._state === VideoPlayerState_1.VideoPlayerState.Initialized) {
            this._state = VideoPlayerState_1.VideoPlayerState.Loaded;
        }
        this.dispatchEvent(EventBase_1.EventBase.create(VideoPlayerEvent_1.VideoPlayerEvent.VIDEO_LOADED_DATA));
    };
    Html5VideoPlayer.prototype.__onTimeUpdate = function (ev) {
        this.dispatchEvent(new VideoPlayerEvent_1.VideoPlayerEvent(VideoPlayerEvent_1.VideoPlayerEvent.VIDEO_TIME_UPDATE));
    };
    return Html5VideoPlayer;
}(VideoPlayerBase_1.VideoPlayerBase));
exports.Html5VideoPlayer = Html5VideoPlayer;



},{"../../../../../lib/glantern/src/gl/glantern/EventBase":93,"../../../../../lib/glantern/src/gl/glantern/GLUtil":94,"../../../../../lib/glantern/src/gl/glantern/MathUtil":95,"../VideoPlayerBase":202,"../VideoPlayerEvent":203,"../VideoPlayerState":204}],206:[function(require,module,exports){
/**
 * Created by MIC on 2016/2/8.
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./Html5VideoPlayer"));



},{"./Html5VideoPlayer":205}],207:[function(require,module,exports){
/**
 * Created by MIC on 2016/2/8.
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./VideoPlayerBase"));
__export(require("./VideoPlayerState"));
__export(require("./VideoPlayerEvent"));
var html5 = require("./html5/index");
exports.html5 = html5;



},{"./VideoPlayerBase":202,"./VideoPlayerEvent":203,"./VideoPlayerState":204,"./html5/index":206}],208:[function(require,module,exports){
/*

 Copyright 2000, Silicon Graphics, Inc. All Rights Reserved.
 Copyright 2015, Google Inc. All Rights Reserved.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to
 deal in the Software without restriction, including without limitation the
 rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 sell copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice including the dates of first publication and
 either this permission notice or a reference to http://oss.sgi.com/projects/FreeB/
 shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 SILICON GRAPHICS, INC. BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
 IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 Original Code. The Original Code is: OpenGL Sample Implementation,
 Version 1.2.1, released January 26, 2000, developed by Silicon Graphics,
 Inc. The Original Code is Copyright (c) 1991-2000 Silicon Graphics, Inc.
 Copyright in any portions created by third parties is as indicated
 elsewhere herein. All Rights Reserved.
*/
'use strict';var n;function t(a,b){return a.b===b.b&&a.a===b.a}function u(a,b){return a.b<b.b||a.b===b.b&&a.a<=b.a}function v(a,b,c){var d=b.b-a.b,e=c.b-b.b;return 0<d+e?d<e?b.a-a.a+d/(d+e)*(a.a-c.a):b.a-c.a+e/(d+e)*(c.a-a.a):0}function x(a,b,c){var d=b.b-a.b,e=c.b-b.b;return 0<d+e?(b.a-c.a)*d+(b.a-a.a)*e:0}function z(a,b){return a.a<b.a||a.a===b.a&&a.b<=b.b}function aa(a,b,c){var d=b.a-a.a,e=c.a-b.a;return 0<d+e?d<e?b.b-a.b+d/(d+e)*(a.b-c.b):b.b-c.b+e/(d+e)*(c.b-a.b):0}
function ba(a,b,c){var d=b.a-a.a,e=c.a-b.a;return 0<d+e?(b.b-c.b)*d+(b.b-a.b)*e:0}function ca(a){return u(a.b.a,a.a)}function da(a){return u(a.a,a.b.a)}function A(a,b,c,d){a=0>a?0:a;c=0>c?0:c;return a<=c?0===c?(b+d)/2:b+a/(a+c)*(d-b):d+c/(a+c)*(b-d)};function ea(a){var b=B(a.b);C(b,a.c);C(b.b,a.c);D(b,a.a);return b}function E(a,b){var c=!1,d=!1;a!==b&&(b.a!==a.a&&(d=!0,F(b.a,a.a)),b.d!==a.d&&(c=!0,G(b.d,a.d)),H(b,a),d||(C(b,a.a),a.a.c=a),c||(D(b,a.d),a.d.a=a))}function I(a){var b=a.b,c=!1;a.d!==a.b.d&&(c=!0,G(a.d,a.b.d));a.c===a?F(a.a,null):(a.b.d.a=J(a),a.a.c=a.c,H(a,J(a)),c||D(a,a.d));b.c===b?(F(b.a,null),G(b.d,null)):(a.d.a=J(b),b.a.c=b.c,H(b,J(b)));fa(a)}
function K(a){var b=B(a),c=b.b;H(b,a.e);b.a=a.b.a;C(c,b.a);b.d=c.d=a.d;b=b.b;H(a.b,J(a.b));H(a.b,b);a.b.a=b.a;b.b.a.c=b.b;b.b.d=a.b.d;b.f=a.f;b.b.f=a.b.f;return b}function L(a,b){var c=!1,d=B(a),e=d.b;b.d!==a.d&&(c=!0,G(b.d,a.d));H(d,a.e);H(e,b);d.a=a.b.a;e.a=b.a;d.d=e.d=a.d;a.d.a=e;c||D(d,a.d);return d}function B(a){var b=new M,c=new M,d=a.b.h;c.h=d;d.b.h=b;b.h=a;a.b.h=c;b.b=c;b.c=b;b.e=c;c.b=b;c.c=c;return c.e=b}function H(a,b){var c=a.c,d=b.c;c.b.e=b;d.b.e=a;a.c=d;b.c=c}
function C(a,b){var c=b.f,d=new N(b,c);c.e=d;b.f=d;c=d.c=a;do c.a=d,c=c.c;while(c!==a)}function D(a,b){var c=b.d,d=new ga(b,c);c.b=d;b.d=d;d.a=a;d.c=b.c;c=a;do c.d=d,c=c.e;while(c!==a)}function fa(a){var b=a.h;a=a.b.h;b.b.h=a;a.b.h=b}function F(a,b){var c=a.c,d=c;do d.a=b,d=d.c;while(d!==c);c=a.f;d=a.e;d.f=c;c.e=d}function G(a,b){var c=a.a,d=c;do d.d=b,d=d.e;while(d!==c);c=a.d;d=a.b;d.d=c;c.b=d};function ha(a){var b=0;Math.abs(a[1])>Math.abs(a[0])&&(b=1);Math.abs(a[2])>Math.abs(a[b])&&(b=2);return b};var O=4*1E150;function P(a,b){a.f+=b.f;a.b.f+=b.b.f}function ia(a,b,c){a=a.a;b=b.a;c=c.a;if(b.b.a===a)return c.b.a===a?u(b.a,c.a)?0>=x(c.b.a,b.a,c.a):0<=x(b.b.a,c.a,b.a):0>=x(c.b.a,a,c.a);if(c.b.a===a)return 0<=x(b.b.a,a,b.a);b=v(b.b.a,a,b.a);a=v(c.b.a,a,c.a);return b>=a}function Q(a){a.a.i=null;var b=a.e;b.a.c=b.c;b.c.a=b.a;a.e=null}function ja(a,b){I(a.a);a.c=!1;a.a=b;b.i=a}function ka(a){var b=a.a.a;do a=R(a);while(a.a.a===b);a.c&&(b=L(S(a).a.b,a.a.e),ja(a,b),a=R(a));return a}
function la(a,b,c){var d=new ma;d.a=c;d.e=na(a.f,b.e,d);return c.i=d}function oa(a,b){switch(a.s){case 100130:return 0!==(b&1);case 100131:return 0!==b;case 100132:return 0<b;case 100133:return 0>b;case 100134:return 2<=b||-2>=b}return!1}function pa(a){var b=a.a,c=b.d;c.c=a.d;c.a=b;Q(a)}function T(a,b,c){a=b;for(b=b.a;a!==c;){a.c=!1;var d=S(a),e=d.a;if(e.a!==b.a){if(!d.c){pa(a);break}e=L(b.c.b,e.b);ja(d,e)}b.c!==e&&(E(J(e),e),E(b,e));pa(a);b=d.a;a=d}return b}
function U(a,b,c,d,e,f){var g=!0;do la(a,b,c.b),c=c.c;while(c!==d);for(null===e&&(e=S(b).a.b.c);;){d=S(b);c=d.a.b;if(c.a!==e.a)break;c.c!==e&&(E(J(c),c),E(J(e),c));d.f=b.f-c.f;d.d=oa(a,d.f);b.b=!0;!g&&qa(a,b)&&(P(c,e),Q(b),I(e));g=!1;b=d;e=c}b.b=!0;f&&ra(a,b)}function sa(a,b,c,d,e){var f=[b.g[0],b.g[1],b.g[2]];b.d=null;b.d=a.o?a.o(f,c,d,a.c)||null:null;null===b.d&&(e?a.n||(V(a,100156),a.n=!0):b.d=c[0])}
function ta(a,b,c){var d=[null,null,null,null];d[0]=b.a.d;d[1]=c.a.d;sa(a,b.a,d,[.5,.5,0,0],!1);E(b,c)}function ua(a,b,c,d,e){var f=Math.abs(b.b-a.b)+Math.abs(b.a-a.a),g=Math.abs(c.b-a.b)+Math.abs(c.a-a.a),h=e+1;d[e]=.5*g/(f+g);d[h]=.5*f/(f+g);a.g[0]+=d[e]*b.g[0]+d[h]*c.g[0];a.g[1]+=d[e]*b.g[1]+d[h]*c.g[1];a.g[2]+=d[e]*b.g[2]+d[h]*c.g[2]}
function qa(a,b){var c=S(b),d=b.a,e=c.a;if(u(d.a,e.a)){if(0<x(e.b.a,d.a,e.a))return!1;if(!t(d.a,e.a))K(e.b),E(d,J(e)),b.b=c.b=!0;else if(d.a!==e.a){var c=a.e,f=d.a.h;if(0<=f){var c=c.b,g=c.d,h=c.e,k=c.c,l=k[f];g[l]=g[c.a];k[g[l]]=l;l<=--c.a&&(1>=l?W(c,l):u(h[g[l>>1]],h[g[l]])?W(c,l):va(c,l));h[f]=null;k[f]=c.b;c.b=f}else for(c.c[-(f+1)]=null;0<c.a&&null===c.c[c.d[c.a-1]];)--c.a;ta(a,J(e),d)}}else{if(0>x(d.b.a,e.a,d.a))return!1;R(b).b=b.b=!0;K(d.b);E(J(e),d)}return!0}
function wa(a,b){var c=S(b),d=b.a,e=c.a,f=d.a,g=e.a,h=d.b.a,k=e.b.a,l=new N;x(h,a.a,f);x(k,a.a,g);if(f===g||Math.min(f.a,h.a)>Math.max(g.a,k.a))return!1;if(u(f,g)){if(0<x(k,f,g))return!1}else if(0>x(h,g,f))return!1;var r=h,p=f,q=k,y=g,m,w;u(r,p)||(m=r,r=p,p=m);u(q,y)||(m=q,q=y,y=m);u(r,q)||(m=r,r=q,q=m,m=p,p=y,y=m);u(q,p)?u(p,y)?(m=v(r,q,p),w=v(q,p,y),0>m+w&&(m=-m,w=-w),l.b=A(m,q.b,w,p.b)):(m=x(r,q,p),w=-x(r,y,p),0>m+w&&(m=-m,w=-w),l.b=A(m,q.b,w,y.b)):l.b=(q.b+p.b)/2;z(r,p)||(m=r,r=p,p=m);z(q,y)||
(m=q,q=y,y=m);z(r,q)||(m=r,r=q,q=m,m=p,p=y,y=m);z(q,p)?z(p,y)?(m=aa(r,q,p),w=aa(q,p,y),0>m+w&&(m=-m,w=-w),l.a=A(m,q.a,w,p.a)):(m=ba(r,q,p),w=-ba(r,y,p),0>m+w&&(m=-m,w=-w),l.a=A(m,q.a,w,y.a)):l.a=(q.a+p.a)/2;u(l,a.a)&&(l.b=a.a.b,l.a=a.a.a);r=u(f,g)?f:g;u(r,l)&&(l.b=r.b,l.a=r.a);if(t(l,f)||t(l,g))return qa(a,b),!1;if(!t(h,a.a)&&0<=x(h,a.a,l)||!t(k,a.a)&&0>=x(k,a.a,l)){if(k===a.a)return K(d.b),E(e.b,d),b=ka(b),d=S(b).a,T(a,S(b),c),U(a,b,J(d),d,d,!0),!0;if(h===a.a){K(e.b);E(d.e,J(e));f=c=b;g=f.a.b.a;
do f=R(f);while(f.a.b.a===g);b=f;f=S(b).a.b.c;c.a=J(e);e=T(a,c,null);U(a,b,e.c,d.b.c,f,!0);return!0}0<=x(h,a.a,l)&&(R(b).b=b.b=!0,K(d.b),d.a.b=a.a.b,d.a.a=a.a.a);0>=x(k,a.a,l)&&(b.b=c.b=!0,K(e.b),e.a.b=a.a.b,e.a.a=a.a.a);return!1}K(d.b);K(e.b);E(J(e),d);d.a.b=l.b;d.a.a=l.a;d.a.h=xa(a.e,d.a);d=d.a;e=[0,0,0,0];l=[f.d,h.d,g.d,k.d];d.g[0]=d.g[1]=d.g[2]=0;ua(d,f,h,e,0);ua(d,g,k,e,2);sa(a,d,l,e,!0);R(b).b=b.b=c.b=!0;return!1}
function ra(a,b){for(var c=S(b);;){for(;c.b;)b=c,c=S(c);if(!b.b&&(c=b,b=R(b),null===b||!b.b))break;b.b=!1;var d=b.a,e=c.a,f;if(f=d.b.a!==e.b.a)a:{f=b;var g=S(f),h=f.a,k=g.a,l=void 0;if(u(h.b.a,k.b.a)){if(0>x(h.b.a,k.b.a,h.a)){f=!1;break a}R(f).b=f.b=!0;l=K(h);E(k.b,l);l.d.c=f.d}else{if(0<x(k.b.a,h.b.a,k.a)){f=!1;break a}f.b=g.b=!0;l=K(k);E(h.e,k.b);l.b.d.c=f.d}f=!0}f&&(c.c?(Q(c),I(e),c=S(b),e=c.a):b.c&&(Q(b),I(d),b=R(c),d=b.a));if(d.a!==e.a)if(d.b.a===e.b.a||b.c||c.c||d.b.a!==a.a&&e.b.a!==a.a)qa(a,
b);else if(wa(a,b))break;d.a===e.a&&d.b.a===e.b.a&&(P(e,d),Q(b),I(d),b=R(c))}}
function ya(a,b){a.a=b;for(var c=b.c;null===c.i;)if(c=c.c,c===b.c){var c=a,d=b,e=new ma;e.a=d.c.b;var f=c.f,g=f.a;do g=g.a;while(null!==g.b&&!f.c(f.b,e,g.b));var f=g.b,h=S(f),e=f.a,g=h.a;if(0===x(e.b.a,d,e.a))e=f.a,t(e.a,d)||t(e.b.a,d)||(K(e.b),f.c&&(I(e.c),f.c=!1),E(d.c,e),ya(c,d));else{var k=u(g.b.a,e.b.a)?f:h,h=void 0;f.d||k.c?(k===f?h=L(d.c.b,e.e):h=L(g.b.c.b,d.c).b,k.c?ja(k,h):(e=c,f=la(c,f,h),f.f=R(f).f+f.a.f,f.d=oa(e,f.f)),ya(c,d)):U(c,f,d.c,d.c,null,!0)}return}c=ka(c.i);e=S(c);f=e.a;e=T(a,
e,null);if(e.c===f){var f=e,e=f.c,g=S(c),h=c.a,k=g.a,l=!1;h.b.a!==k.b.a&&wa(a,c);t(h.a,a.a)&&(E(J(e),h),c=ka(c),e=S(c).a,T(a,S(c),g),l=!0);t(k.a,a.a)&&(E(f,J(k)),f=T(a,g,null),l=!0);l?U(a,c,f.c,e,e,!0):(u(k.a,h.a)?d=J(k):d=h,d=L(f.c.b,d),U(a,c,d,d.c,d.c,!1),d.b.i.c=!0,ra(a,c))}else U(a,c,e.c,f,f,!0)}function za(a,b){var c=new ma,d=ea(a.b);d.a.b=O;d.a.a=b;d.b.a.b=-O;d.b.a.a=b;a.a=d.b.a;c.a=d;c.f=0;c.d=!1;c.c=!1;c.h=!0;c.b=!1;d=a.f;d=na(d,d.a,c);c.e=d};function Aa(a){this.a=new Ba;this.b=a;this.c=ia}function na(a,b,c){do b=b.c;while(null!==b.b&&!a.c(a.b,b.b,c));a=new Ba(c,b.a,b);b.a.c=a;return b.a=a};function Ba(a,b,c){this.b=a||null;this.a=b||this;this.c=c||this};function X(){this.d=Y;this.p=this.b=this.q=null;this.j=[0,0,0];this.s=100130;this.n=!1;this.o=this.a=this.e=this.f=null;this.m=!1;this.c=this.r=this.i=this.k=this.l=this.h=null}var Y=0;n=X.prototype;n.x=function(){Z(this,Y)};n.B=function(a,b){switch(a){case 100142:return;case 100140:switch(b){case 100130:case 100131:case 100132:case 100133:case 100134:this.s=b;return}break;case 100141:this.m=!!b;return;default:V(this,100900);return}V(this,100901)};
n.y=function(a){switch(a){case 100142:return 0;case 100140:return this.s;case 100141:return this.m;default:V(this,100900)}return!1};n.A=function(a,b,c){this.j[0]=a;this.j[1]=b;this.j[2]=c};
n.z=function(a,b){var c=b?b:null;switch(a){case 100100:case 100106:this.h=c;break;case 100104:case 100110:this.l=c;break;case 100101:case 100107:this.k=c;break;case 100102:case 100108:this.i=c;break;case 100103:case 100109:this.p=c;break;case 100105:case 100111:this.o=c;break;case 100112:this.r=c;break;default:V(this,100900)}};
n.C=function(a,b){var c=!1,d=[0,0,0];Z(this,2);for(var e=0;3>e;++e){var f=a[e];-1E150>f&&(f=-1E150,c=!0);1E150<f&&(f=1E150,c=!0);d[e]=f}c&&V(this,100155);c=this.q;null===c?(c=ea(this.b),E(c,c.b)):(K(c),c=c.e);c.a.d=b;c.a.g[0]=d[0];c.a.g[1]=d[1];c.a.g[2]=d[2];c.f=1;c.b.f=-1;this.q=c};n.u=function(a){Z(this,Y);this.d=1;this.b=new Ca;this.c=a};n.t=function(){Z(this,1);this.d=2;this.q=null};n.v=function(){Z(this,2);this.d=1};
n.w=function(){Z(this,1);this.d=Y;var a=this.j[0],b=this.j[1],c=this.j[2],d=!1,e=[a,b,c];if(0===a&&0===b&&0===c){for(var b=[-2*1E150,-2*1E150,-2*1E150],f=[2*1E150,2*1E150,2*1E150],c=[],g=[],d=this.b.c,a=d.e;a!==d;a=a.e)for(var h=0;3>h;++h){var k=a.g[h];k<f[h]&&(f[h]=k,g[h]=a);k>b[h]&&(b[h]=k,c[h]=a)}a=0;b[1]-f[1]>b[0]-f[0]&&(a=1);b[2]-f[2]>b[a]-f[a]&&(a=2);if(f[a]>=b[a])e[0]=0,e[1]=0,e[2]=1;else{b=0;f=g[a];c=c[a];g=[0,0,0];f=[f.g[0]-c.g[0],f.g[1]-c.g[1],f.g[2]-c.g[2]];h=[0,0,0];for(a=d.e;a!==d;a=
a.e)h[0]=a.g[0]-c.g[0],h[1]=a.g[1]-c.g[1],h[2]=a.g[2]-c.g[2],g[0]=f[1]*h[2]-f[2]*h[1],g[1]=f[2]*h[0]-f[0]*h[2],g[2]=f[0]*h[1]-f[1]*h[0],k=g[0]*g[0]+g[1]*g[1]+g[2]*g[2],k>b&&(b=k,e[0]=g[0],e[1]=g[1],e[2]=g[2]);0>=b&&(e[0]=e[1]=e[2]=0,e[ha(f)]=1)}d=!0}g=ha(e);a=this.b.c;b=(g+1)%3;c=(g+2)%3;g=0<e[g]?1:-1;for(e=a.e;e!==a;e=e.e)e.b=e.g[b],e.a=g*e.g[c];if(d){e=0;d=this.b.a;for(a=d.b;a!==d;a=a.b)if(b=a.a,!(0>=b.f)){do e+=(b.a.b-b.b.a.b)*(b.a.a+b.b.a.a),b=b.e;while(b!==a.a)}if(0>e)for(e=this.b.c,d=e.e;d!==
e;d=d.e)d.a=-d.a}this.n=!1;e=this.b.b;for(a=e.h;a!==e;a=d)if(d=a.h,b=a.e,t(a.a,a.b.a)&&a.e.e!==a&&(ta(this,b,a),I(a),a=b,b=a.e),b.e===a){if(b!==a){if(b===d||b===d.b)d=d.h;I(b)}if(a===d||a===d.b)d=d.h;I(a)}this.e=e=new Da;d=this.b.c;for(a=d.e;a!==d;a=a.e)a.h=xa(e,a);Ea(e);this.f=new Aa(this);za(this,-O);for(za(this,O);null!==(e=Fa(this.e));){for(;;){a:if(a=this.e,0===a.a)d=Ga(a.b);else if(d=a.c[a.d[a.a-1]],0!==a.b.a&&(a=Ga(a.b),u(a,d))){d=a;break a}if(null===d||!t(d,e))break;d=Fa(this.e);ta(this,e.c,
d.c)}ya(this,e)}this.a=this.f.a.a.b.a.a;for(e=0;null!==(d=this.f.a.a.b);)d.h||++e,Q(d);this.f=null;e=this.e;e.b=null;e.d=null;this.e=e.c=null;e=this.b;for(a=e.a.b;a!==e.a;a=d)d=a.b,a=a.a,a.e.e===a&&(P(a.c,a),I(a));if(!this.n){e=this.b;if(this.m)for(a=e.b.h;a!==e.b;a=d)d=a.h,a.b.d.c!==a.d.c?a.f=a.d.c?1:-1:I(a);else for(a=e.a.b;a!==e.a;a=d)if(d=a.b,a.c){for(a=a.a;u(a.b.a,a.a);a=a.c.b);for(;u(a.a,a.b.a);a=a.e);b=a.c.b;for(c=void 0;a.e!==b;)if(u(a.b.a,b.a)){for(;b.e!==a&&(ca(b.e)||0>=x(b.a,b.b.a,b.e.b.a));)c=
L(b.e,b),b=c.b;b=b.c.b}else{for(;b.e!==a&&(da(a.c.b)||0<=x(a.b.a,a.a,a.c.b.a));)c=L(a,a.c.b),a=c.b;a=a.e}for(;b.e.e!==a;)c=L(b.e,b),b=c.b}if(this.h||this.i||this.k||this.l)if(this.m)for(e=this.b,d=e.a.b;d!==e.a;d=d.b){if(d.c){this.h&&this.h(2,this.c);a=d.a;do this.k&&this.k(a.a.d,this.c),a=a.e;while(a!==d.a);this.i&&this.i(this.c)}}else{e=this.b;d=!!this.l;a=!1;b=-1;for(c=e.a.d;c!==e.a;c=c.d)if(c.c){a||(this.h&&this.h(4,this.c),a=!0);g=c.a;do d&&(f=g.b.d.c?0:1,b!==f&&(b=f,this.l&&this.l(!!b,this.c))),
this.k&&this.k(g.a.d,this.c),g=g.e;while(g!==c.a)}a&&this.i&&this.i(this.c)}if(this.r){e=this.b;for(a=e.a.b;a!==e.a;a=d)if(d=a.b,!a.c){b=a.a;c=b.e;g=void 0;do g=c,c=g.e,g.d=null,null===g.b.d&&(g.c===g?F(g.a,null):(g.a.c=g.c,H(g,J(g))),f=g.b,f.c===f?F(f.a,null):(f.a.c=f.c,H(f,J(f))),fa(g));while(g!==b);b=a.d;a=a.b;a.d=b;b.b=a}this.r(this.b);this.c=this.b=null;return}}this.b=this.c=null};
function Z(a,b){if(a.d!==b)for(;a.d!==b;)if(a.d<b)switch(a.d){case Y:V(a,100151);a.u(null);break;case 1:V(a,100152),a.t()}else switch(a.d){case 2:V(a,100154);a.v();break;case 1:V(a,100153),a.w()}}function V(a,b){a.p&&a.p(b,a.c)};function ga(a,b){this.b=a||this;this.d=b||this;this.a=null;this.c=!1};function M(){this.h=this;this.i=this.d=this.a=this.e=this.c=this.b=null;this.f=0}function J(a){return a.b.e};function Ca(){this.c=new N;this.a=new ga;this.b=new M;this.d=new M;this.b.b=this.d;this.d.b=this.b};function N(a,b){this.e=a||this;this.f=b||this;this.d=this.c=null;this.g=[0,0,0];this.h=this.a=this.b=0};function Da(){this.c=[];this.d=null;this.a=0;this.e=!1;this.b=new Ha}function Ea(a){a.d=[];for(var b=0;b<a.a;b++)a.d[b]=b;a.d.sort(function(a){return function(b,e){return u(a[b],a[e])?1:-1}}(a.c));a.e=!0;Ia(a.b)}function xa(a,b){if(a.e){var c=a.b,d=++c.a;2*d>c.f&&(c.f*=2,c.c=Ja(c.c,c.f+1));var e;0===c.b?e=d:(e=c.b,c.b=c.c[c.b]);c.e[e]=b;c.c[e]=d;c.d[d]=e;c.h&&va(c,d);return e}c=a.a++;a.c[c]=b;return-(c+1)}
function Fa(a){if(0===a.a)return Ka(a.b);var b=a.c[a.d[a.a-1]];if(0!==a.b.a&&u(Ga(a.b),b))return Ka(a.b);do--a.a;while(0<a.a&&null===a.c[a.d[a.a-1]]);return b};function Ha(){this.d=Ja([0],33);this.e=[null,null];this.c=[0,0];this.a=0;this.f=32;this.b=0;this.h=!1;this.d[1]=1}function Ja(a,b){for(var c=Array(b),d=0;d<a.length;d++)c[d]=a[d];for(;d<b;d++)c[d]=0;return c}function Ia(a){for(var b=a.a;1<=b;--b)W(a,b);a.h=!0}function Ga(a){return a.e[a.d[1]]}function Ka(a){var b=a.d,c=a.e,d=a.c,e=b[1],f=c[e];0<a.a&&(b[1]=b[a.a],d[b[1]]=1,c[e]=null,d[e]=a.b,a.b=e,0<--a.a&&W(a,1));return f}
function W(a,b){for(var c=a.d,d=a.e,e=a.c,f=b,g=c[f];;){var h=f<<1;h<a.a&&u(d[c[h+1]],d[c[h]])&&(h+=1);var k=c[h];if(h>a.a||u(d[g],d[k])){c[f]=g;e[g]=f;break}c[f]=k;e[k]=f;f=h}}function va(a,b){for(var c=a.d,d=a.e,e=a.c,f=b,g=c[f];;){var h=f>>1,k=c[h];if(0===h||u(d[k],d[g])){c[f]=g;e[g]=f;break}c[f]=k;e[k]=f;f=h}};function ma(){this.e=this.a=null;this.f=0;this.c=this.b=this.h=this.d=!1}function S(a){return a.e.c.b}function R(a){return a.e.a.b};this.libtess={GluTesselator:X,windingRule:{GLU_TESS_WINDING_ODD:100130,GLU_TESS_WINDING_NONZERO:100131,GLU_TESS_WINDING_POSITIVE:100132,GLU_TESS_WINDING_NEGATIVE:100133,GLU_TESS_WINDING_ABS_GEQ_TWO:100134},primitiveType:{GL_LINE_LOOP:2,GL_TRIANGLES:4,GL_TRIANGLE_STRIP:5,GL_TRIANGLE_FAN:6},errorType:{GLU_TESS_MISSING_BEGIN_POLYGON:100151,GLU_TESS_MISSING_END_POLYGON:100153,GLU_TESS_MISSING_BEGIN_CONTOUR:100152,GLU_TESS_MISSING_END_CONTOUR:100154,GLU_TESS_COORD_TOO_LARGE:100155,GLU_TESS_NEED_COMBINE_CALLBACK:100156},
gluEnum:{GLU_TESS_MESH:100112,GLU_TESS_TOLERANCE:100142,GLU_TESS_WINDING_RULE:100140,GLU_TESS_BOUNDARY_ONLY:100141,GLU_INVALID_ENUM:100900,GLU_INVALID_VALUE:100901,GLU_TESS_BEGIN:100100,GLU_TESS_VERTEX:100101,GLU_TESS_END:100102,GLU_TESS_ERROR:100103,GLU_TESS_EDGE_FLAG:100104,GLU_TESS_COMBINE:100105,GLU_TESS_BEGIN_DATA:100106,GLU_TESS_VERTEX_DATA:100107,GLU_TESS_END_DATA:100108,GLU_TESS_ERROR_DATA:100109,GLU_TESS_EDGE_FLAG_DATA:100110,GLU_TESS_COMBINE_DATA:100111}};X.prototype.gluDeleteTess=X.prototype.x;
X.prototype.gluTessProperty=X.prototype.B;X.prototype.gluGetTessProperty=X.prototype.y;X.prototype.gluTessNormal=X.prototype.A;X.prototype.gluTessCallback=X.prototype.z;X.prototype.gluTessVertex=X.prototype.C;X.prototype.gluTessBeginPolygon=X.prototype.u;X.prototype.gluTessBeginContour=X.prototype.t;X.prototype.gluTessEndContour=X.prototype.v;X.prototype.gluTessEndPolygon=X.prototype.w; if (typeof module !== 'undefined') { module.exports = this.libtess; }

},{}],209:[function(require,module,exports){
exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

},{}],210:[function(require,module,exports){
// Top level file is just a mixin of submodules & constants
'use strict';

var assign    = require('./lib/utils/common').assign;

var deflate   = require('./lib/deflate');
var inflate   = require('./lib/inflate');
var constants = require('./lib/zlib/constants');

var pako = {};

assign(pako, deflate, inflate, constants);

module.exports = pako;

},{"./lib/deflate":211,"./lib/inflate":212,"./lib/utils/common":213,"./lib/zlib/constants":216}],211:[function(require,module,exports){
'use strict';


var zlib_deflate = require('./zlib/deflate.js');
var utils = require('./utils/common');
var strings = require('./utils/strings');
var msg = require('./zlib/messages');
var zstream = require('./zlib/zstream');

var toString = Object.prototype.toString;

/* Public constants ==========================================================*/
/* ===========================================================================*/

var Z_NO_FLUSH      = 0;
var Z_FINISH        = 4;

var Z_OK            = 0;
var Z_STREAM_END    = 1;
var Z_SYNC_FLUSH    = 2;

var Z_DEFAULT_COMPRESSION = -1;

var Z_DEFAULT_STRATEGY    = 0;

var Z_DEFLATED  = 8;

/* ===========================================================================*/


/**
 * class Deflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[deflate]],
 * [[deflateRaw]] and [[gzip]].
 **/

/* internal
 * Deflate.chunks -> Array
 *
 * Chunks of output data, if [[Deflate#onData]] not overriden.
 **/

/**
 * Deflate.result -> Uint8Array|Array
 *
 * Compressed result, generated by default [[Deflate#onData]]
 * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Deflate#push]] with `Z_FINISH` / `true` param)  or if you
 * push a chunk with explicit flush (call [[Deflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Deflate.err -> Number
 *
 * Error code after deflate finished. 0 (Z_OK) on success.
 * You will not need it in real life, because deflate errors
 * are possible only on wrong options or bad `onData` / `onEnd`
 * custom handlers.
 **/

/**
 * Deflate.msg -> String
 *
 * Error message, if [[Deflate.err]] != 0
 **/


/**
 * new Deflate(options)
 * - options (Object): zlib deflate options.
 *
 * Creates new deflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `level`
 * - `windowBits`
 * - `memLevel`
 * - `strategy`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw deflate
 * - `gzip` (Boolean) - create gzip wrapper
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 * - `header` (Object) - custom header for gzip
 *   - `text` (Boolean) - true if compressed data believed to be text
 *   - `time` (Number) - modification time, unix timestamp
 *   - `os` (Number) - operation system code
 *   - `extra` (Array) - array of bytes with extra data (max 65536)
 *   - `name` (String) - file name (binary string)
 *   - `comment` (String) - comment (binary string)
 *   - `hcrc` (Boolean) - true if header crc should be added
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var deflate = new pako.Deflate({ level: 3});
 *
 * deflate.push(chunk1, false);
 * deflate.push(chunk2, true);  // true -> last chunk
 *
 * if (deflate.err) { throw new Error(deflate.err); }
 *
 * console.log(deflate.result);
 * ```
 **/
var Deflate = function(options) {

  this.options = utils.assign({
    level: Z_DEFAULT_COMPRESSION,
    method: Z_DEFLATED,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: Z_DEFAULT_STRATEGY,
    to: ''
  }, options || {});

  var opt = this.options;

  if (opt.raw && (opt.windowBits > 0)) {
    opt.windowBits = -opt.windowBits;
  }

  else if (opt.gzip && (opt.windowBits > 0) && (opt.windowBits < 16)) {
    opt.windowBits += 16;
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm = new zstream();
  this.strm.avail_out = 0;

  var status = zlib_deflate.deflateInit2(
    this.strm,
    opt.level,
    opt.method,
    opt.windowBits,
    opt.memLevel,
    opt.strategy
  );

  if (status !== Z_OK) {
    throw new Error(msg[status]);
  }

  if (opt.header) {
    zlib_deflate.deflateSetHeader(this.strm, opt.header);
  }
};

/**
 * Deflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data. Strings will be
 *   converted to utf8 byte sequence.
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.
 *
 * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
 * new compressed chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Deflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the compression context.
 *
 * On fail call [[Deflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * array format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Deflate.prototype.push = function(data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var status, _mode;

  if (this.ended) { return false; }

  _mode = (mode === ~~mode) ? mode : ((mode === true) ? Z_FINISH : Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // If we need to compress text, change encoding to utf8.
    strm.input = strings.string2buf(data);
  } else if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    status = zlib_deflate.deflate(strm, _mode);    /* no bad return value */

    if (status !== Z_STREAM_END && status !== Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }
    if (strm.avail_out === 0 || (strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH))) {
      if (this.options.to === 'string') {
        this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)));
      } else {
        this.onData(utils.shrinkBuf(strm.output, strm.next_out));
      }
    }
  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END);

  // Finalize on the last chunk.
  if (_mode === Z_FINISH) {
    status = zlib_deflate.deflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === Z_OK;
  }

  // callback interim results if Z_SYNC_FLUSH.
  if (_mode === Z_SYNC_FLUSH) {
    this.onEnd(Z_OK);
    strm.avail_out = 0;
    return true;
  }

  return true;
};


/**
 * Deflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): ouput data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Deflate.prototype.onData = function(chunk) {
  this.chunks.push(chunk);
};


/**
 * Deflate#onEnd(status) -> Void
 * - status (Number): deflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called once after you tell deflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Deflate.prototype.onEnd = function(status) {
  // On success - join
  if (status === Z_OK) {
    if (this.options.to === 'string') {
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * deflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * Compress `data` with deflate alrorythm and `options`.
 *
 * Supported options are:
 *
 * - level
 * - windowBits
 * - memLevel
 * - strategy
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , data = Uint8Array([1,2,3,4,5,6,7,8,9]);
 *
 * console.log(pako.deflate(data));
 * ```
 **/
function deflate(input, options) {
  var deflator = new Deflate(options);

  deflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (deflator.err) { throw deflator.msg; }

  return deflator.result;
}


/**
 * deflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function deflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return deflate(input, options);
}


/**
 * gzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but create gzip wrapper instead of
 * deflate one.
 **/
function gzip(input, options) {
  options = options || {};
  options.gzip = true;
  return deflate(input, options);
}


exports.Deflate = Deflate;
exports.deflate = deflate;
exports.deflateRaw = deflateRaw;
exports.gzip = gzip;

},{"./utils/common":213,"./utils/strings":214,"./zlib/deflate.js":218,"./zlib/messages":223,"./zlib/zstream":225}],212:[function(require,module,exports){
'use strict';


var zlib_inflate = require('./zlib/inflate.js');
var utils = require('./utils/common');
var strings = require('./utils/strings');
var c = require('./zlib/constants');
var msg = require('./zlib/messages');
var zstream = require('./zlib/zstream');
var gzheader = require('./zlib/gzheader');

var toString = Object.prototype.toString;

/**
 * class Inflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[inflate]]
 * and [[inflateRaw]].
 **/

/* internal
 * inflate.chunks -> Array
 *
 * Chunks of output data, if [[Inflate#onData]] not overriden.
 **/

/**
 * Inflate.result -> Uint8Array|Array|String
 *
 * Uncompressed result, generated by default [[Inflate#onData]]
 * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Inflate#push]] with `Z_FINISH` / `true` param) or if you
 * push a chunk with explicit flush (call [[Inflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Inflate.err -> Number
 *
 * Error code after inflate finished. 0 (Z_OK) on success.
 * Should be checked if broken data possible.
 **/

/**
 * Inflate.msg -> String
 *
 * Error message, if [[Inflate.err]] != 0
 **/


/**
 * new Inflate(options)
 * - options (Object): zlib inflate options.
 *
 * Creates new inflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `windowBits`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw inflate
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 * By default, when no options set, autodetect deflate/gzip data format via
 * wrapper header.
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var inflate = new pako.Inflate({ level: 3});
 *
 * inflate.push(chunk1, false);
 * inflate.push(chunk2, true);  // true -> last chunk
 *
 * if (inflate.err) { throw new Error(inflate.err); }
 *
 * console.log(inflate.result);
 * ```
 **/
var Inflate = function(options) {

  this.options = utils.assign({
    chunkSize: 16384,
    windowBits: 0,
    to: ''
  }, options || {});

  var opt = this.options;

  // Force window size for `raw` data, if not set directly,
  // because we have no header for autodetect.
  if (opt.raw && (opt.windowBits >= 0) && (opt.windowBits < 16)) {
    opt.windowBits = -opt.windowBits;
    if (opt.windowBits === 0) { opt.windowBits = -15; }
  }

  // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
  if ((opt.windowBits >= 0) && (opt.windowBits < 16) &&
      !(options && options.windowBits)) {
    opt.windowBits += 32;
  }

  // Gzip header has no info about windows size, we can do autodetect only
  // for deflate. So, if window size not set, force it to max when gzip possible
  if ((opt.windowBits > 15) && (opt.windowBits < 48)) {
    // bit 3 (16) -> gzipped data
    // bit 4 (32) -> autodetect gzip/deflate
    if ((opt.windowBits & 15) === 0) {
      opt.windowBits |= 15;
    }
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm   = new zstream();
  this.strm.avail_out = 0;

  var status  = zlib_inflate.inflateInit2(
    this.strm,
    opt.windowBits
  );

  if (status !== c.Z_OK) {
    throw new Error(msg[status]);
  }

  this.header = new gzheader();

  zlib_inflate.inflateGetHeader(this.strm, this.header);
};

/**
 * Inflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.
 *
 * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
 * new output chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Inflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the decompression context.
 *
 * On fail call [[Inflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Inflate.prototype.push = function(data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var status, _mode;
  var next_out_utf8, tail, utf8str;

  // Flag to properly process Z_BUF_ERROR on testing inflate call
  // when we check that all output data was flushed.
  var allowBufError = false;

  if (this.ended) { return false; }
  _mode = (mode === ~~mode) ? mode : ((mode === true) ? c.Z_FINISH : c.Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // Only binary strings can be decompressed on practice
    strm.input = strings.binstring2buf(data);
  } else if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }

    status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);    /* no bad return value */

    if (status === c.Z_BUF_ERROR && allowBufError === true) {
      status = c.Z_OK;
      allowBufError = false;
    }

    if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }

    if (strm.next_out) {
      if (strm.avail_out === 0 || status === c.Z_STREAM_END || (strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH))) {

        if (this.options.to === 'string') {

          next_out_utf8 = strings.utf8border(strm.output, strm.next_out);

          tail = strm.next_out - next_out_utf8;
          utf8str = strings.buf2string(strm.output, next_out_utf8);

          // move tail
          strm.next_out = tail;
          strm.avail_out = chunkSize - tail;
          if (tail) { utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0); }

          this.onData(utf8str);

        } else {
          this.onData(utils.shrinkBuf(strm.output, strm.next_out));
        }
      }
    }

    // When no more input data, we should check that internal inflate buffers
    // are flushed. The only way to do it when avail_out = 0 - run one more
    // inflate pass. But if output data not exists, inflate return Z_BUF_ERROR.
    // Here we set flag to process this error properly.
    //
    // NOTE. Deflate does not return error in this case and does not needs such
    // logic.
    if (strm.avail_in === 0 && strm.avail_out === 0) {
      allowBufError = true;
    }

  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);

  if (status === c.Z_STREAM_END) {
    _mode = c.Z_FINISH;
  }

  // Finalize on the last chunk.
  if (_mode === c.Z_FINISH) {
    status = zlib_inflate.inflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === c.Z_OK;
  }

  // callback interim results if Z_SYNC_FLUSH.
  if (_mode === c.Z_SYNC_FLUSH) {
    this.onEnd(c.Z_OK);
    strm.avail_out = 0;
    return true;
  }

  return true;
};


/**
 * Inflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): ouput data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Inflate.prototype.onData = function(chunk) {
  this.chunks.push(chunk);
};


/**
 * Inflate#onEnd(status) -> Void
 * - status (Number): inflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called either after you tell inflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Inflate.prototype.onEnd = function(status) {
  // On success - join
  if (status === c.Z_OK) {
    if (this.options.to === 'string') {
      // Glue & convert here, until we teach pako to send
      // utf8 alligned strings to onData
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * inflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Decompress `data` with inflate/ungzip and `options`. Autodetect
 * format via wrapper header by default. That's why we don't provide
 * separate `ungzip` method.
 *
 * Supported options are:
 *
 * - windowBits
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , input = pako.deflate([1,2,3,4,5,6,7,8,9])
 *   , output;
 *
 * try {
 *   output = pako.inflate(input);
 * } catch (err)
 *   console.log(err);
 * }
 * ```
 **/
function inflate(input, options) {
  var inflator = new Inflate(options);

  inflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (inflator.err) { throw inflator.msg; }

  return inflator.result;
}


/**
 * inflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * The same as [[inflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function inflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return inflate(input, options);
}


/**
 * ungzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Just shortcut to [[inflate]], because it autodetects format
 * by header.content. Done for convenience.
 **/


exports.Inflate = Inflate;
exports.inflate = inflate;
exports.inflateRaw = inflateRaw;
exports.ungzip  = inflate;

},{"./utils/common":213,"./utils/strings":214,"./zlib/constants":216,"./zlib/gzheader":219,"./zlib/inflate.js":221,"./zlib/messages":223,"./zlib/zstream":225}],213:[function(require,module,exports){
'use strict';


var TYPED_OK =  (typeof Uint8Array !== 'undefined') &&
                (typeof Uint16Array !== 'undefined') &&
                (typeof Int32Array !== 'undefined');


exports.assign = function (obj /*from1, from2, from3, ...*/) {
  var sources = Array.prototype.slice.call(arguments, 1);
  while (sources.length) {
    var source = sources.shift();
    if (!source) { continue; }

    if (typeof source !== 'object') {
      throw new TypeError(source + 'must be non-object');
    }

    for (var p in source) {
      if (source.hasOwnProperty(p)) {
        obj[p] = source[p];
      }
    }
  }

  return obj;
};


// reduce buffer size, avoiding mem copy
exports.shrinkBuf = function (buf, size) {
  if (buf.length === size) { return buf; }
  if (buf.subarray) { return buf.subarray(0, size); }
  buf.length = size;
  return buf;
};


var fnTyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    if (src.subarray && dest.subarray) {
      dest.set(src.subarray(src_offs, src_offs+len), dest_offs);
      return;
    }
    // Fallback to ordinary array
    for (var i=0; i<len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function(chunks) {
    var i, l, len, pos, chunk, result;

    // calculate data length
    len = 0;
    for (i=0, l=chunks.length; i<l; i++) {
      len += chunks[i].length;
    }

    // join chunks
    result = new Uint8Array(len);
    pos = 0;
    for (i=0, l=chunks.length; i<l; i++) {
      chunk = chunks[i];
      result.set(chunk, pos);
      pos += chunk.length;
    }

    return result;
  }
};

var fnUntyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    for (var i=0; i<len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function(chunks) {
    return [].concat.apply([], chunks);
  }
};


// Enable/Disable typed arrays use, for testing
//
exports.setTyped = function (on) {
  if (on) {
    exports.Buf8  = Uint8Array;
    exports.Buf16 = Uint16Array;
    exports.Buf32 = Int32Array;
    exports.assign(exports, fnTyped);
  } else {
    exports.Buf8  = Array;
    exports.Buf16 = Array;
    exports.Buf32 = Array;
    exports.assign(exports, fnUntyped);
  }
};

exports.setTyped(TYPED_OK);

},{}],214:[function(require,module,exports){
// String encode/decode helpers
'use strict';


var utils = require('./common');


// Quick check if we can use fast array to bin string conversion
//
// - apply(Array) can fail on Android 2.2
// - apply(Uint8Array) can fail on iOS 5.1 Safary
//
var STR_APPLY_OK = true;
var STR_APPLY_UIA_OK = true;

try { String.fromCharCode.apply(null, [0]); } catch(__) { STR_APPLY_OK = false; }
try { String.fromCharCode.apply(null, new Uint8Array(1)); } catch(__) { STR_APPLY_UIA_OK = false; }


// Table with utf8 lengths (calculated by first byte of sequence)
// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
// because max possible codepoint is 0x10ffff
var _utf8len = new utils.Buf8(256);
for (var q=0; q<256; q++) {
  _utf8len[q] = (q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1);
}
_utf8len[254]=_utf8len[254]=1; // Invalid sequence start


// convert string to array (typed, when possible)
exports.string2buf = function (str) {
  var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

  // count binary size
  for (m_pos = 0; m_pos < str_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos+1 < str_len)) {
      c2 = str.charCodeAt(m_pos+1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }

  // allocate buffer
  buf = new utils.Buf8(buf_len);

  // convert
  for (i=0, m_pos = 0; i < buf_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos+1 < str_len)) {
      c2 = str.charCodeAt(m_pos+1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    if (c < 0x80) {
      /* one byte */
      buf[i++] = c;
    } else if (c < 0x800) {
      /* two bytes */
      buf[i++] = 0xC0 | (c >>> 6);
      buf[i++] = 0x80 | (c & 0x3f);
    } else if (c < 0x10000) {
      /* three bytes */
      buf[i++] = 0xE0 | (c >>> 12);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    } else {
      /* four bytes */
      buf[i++] = 0xf0 | (c >>> 18);
      buf[i++] = 0x80 | (c >>> 12 & 0x3f);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    }
  }

  return buf;
};

// Helper (used in 2 places)
function buf2binstring(buf, len) {
  // use fallback for big arrays to avoid stack overflow
  if (len < 65537) {
    if ((buf.subarray && STR_APPLY_UIA_OK) || (!buf.subarray && STR_APPLY_OK)) {
      return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
    }
  }

  var result = '';
  for (var i=0; i < len; i++) {
    result += String.fromCharCode(buf[i]);
  }
  return result;
}


// Convert byte array to binary string
exports.buf2binstring = function(buf) {
  return buf2binstring(buf, buf.length);
};


// Convert binary string (typed, when possible)
exports.binstring2buf = function(str) {
  var buf = new utils.Buf8(str.length);
  for (var i=0, len=buf.length; i < len; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
};


// convert array to string
exports.buf2string = function (buf, max) {
  var i, out, c, c_len;
  var len = max || buf.length;

  // Reserve max possible length (2 words per char)
  // NB: by unknown reasons, Array is significantly faster for
  //     String.fromCharCode.apply than Uint16Array.
  var utf16buf = new Array(len*2);

  for (out=0, i=0; i<len;) {
    c = buf[i++];
    // quick process ascii
    if (c < 0x80) { utf16buf[out++] = c; continue; }

    c_len = _utf8len[c];
    // skip 5 & 6 byte codes
    if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len-1; continue; }

    // apply mask on first byte
    c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
    // join the rest
    while (c_len > 1 && i < len) {
      c = (c << 6) | (buf[i++] & 0x3f);
      c_len--;
    }

    // terminated by end of string?
    if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

    if (c < 0x10000) {
      utf16buf[out++] = c;
    } else {
      c -= 0x10000;
      utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
      utf16buf[out++] = 0xdc00 | (c & 0x3ff);
    }
  }

  return buf2binstring(utf16buf, out);
};


// Calculate max possible position in utf8 buffer,
// that will not break sequence. If that's not possible
// - (very small limits) return max size as is.
//
// buf[] - utf8 bytes array
// max   - length limit (mandatory);
exports.utf8border = function(buf, max) {
  var pos;

  max = max || buf.length;
  if (max > buf.length) { max = buf.length; }

  // go back from last position, until start of sequence found
  pos = max-1;
  while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

  // Fuckup - very small and broken sequence,
  // return max, because we should return something anyway.
  if (pos < 0) { return max; }

  // If we came to start of buffer - that means vuffer is too small,
  // return max too.
  if (pos === 0) { return max; }

  return (pos + _utf8len[buf[pos]] > max) ? pos : max;
};

},{"./common":213}],215:[function(require,module,exports){
'use strict';

// Note: adler32 takes 12% for level 0 and 2% for level 6.
// It doesn't worth to make additional optimizationa as in original.
// Small size is preferable.

function adler32(adler, buf, len, pos) {
  var s1 = (adler & 0xffff) |0,
      s2 = ((adler >>> 16) & 0xffff) |0,
      n = 0;

  while (len !== 0) {
    // Set limit ~ twice less than 5552, to keep
    // s2 in 31-bits, because we force signed ints.
    // in other case %= will fail.
    n = len > 2000 ? 2000 : len;
    len -= n;

    do {
      s1 = (s1 + buf[pos++]) |0;
      s2 = (s2 + s1) |0;
    } while (--n);

    s1 %= 65521;
    s2 %= 65521;
  }

  return (s1 | (s2 << 16)) |0;
}


module.exports = adler32;

},{}],216:[function(require,module,exports){
module.exports = {

  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH:         0,
  Z_PARTIAL_FLUSH:    1,
  Z_SYNC_FLUSH:       2,
  Z_FULL_FLUSH:       3,
  Z_FINISH:           4,
  Z_BLOCK:            5,
  Z_TREES:            6,

  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK:               0,
  Z_STREAM_END:       1,
  Z_NEED_DICT:        2,
  Z_ERRNO:           -1,
  Z_STREAM_ERROR:    -2,
  Z_DATA_ERROR:      -3,
  //Z_MEM_ERROR:     -4,
  Z_BUF_ERROR:       -5,
  //Z_VERSION_ERROR: -6,

  /* compression levels */
  Z_NO_COMPRESSION:         0,
  Z_BEST_SPEED:             1,
  Z_BEST_COMPRESSION:       9,
  Z_DEFAULT_COMPRESSION:   -1,


  Z_FILTERED:               1,
  Z_HUFFMAN_ONLY:           2,
  Z_RLE:                    3,
  Z_FIXED:                  4,
  Z_DEFAULT_STRATEGY:       0,

  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY:                 0,
  Z_TEXT:                   1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN:                2,

  /* The deflate compression method */
  Z_DEFLATED:               8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};

},{}],217:[function(require,module,exports){
'use strict';

// Note: we can't get significant speed boost here.
// So write code to minimize size - no pregenerated tables
// and array tools dependencies.


// Use ordinary array, since untyped makes no boost here
function makeTable() {
  var c, table = [];

  for (var n =0; n < 256; n++) {
    c = n;
    for (var k =0; k < 8; k++) {
      c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    table[n] = c;
  }

  return table;
}

// Create table on load. Just 255 signed longs. Not a problem.
var crcTable = makeTable();


function crc32(crc, buf, len, pos) {
  var t = crcTable,
      end = pos + len;

  crc = crc ^ (-1);

  for (var i = pos; i < end; i++) {
    crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
  }

  return (crc ^ (-1)); // >>> 0;
}


module.exports = crc32;

},{}],218:[function(require,module,exports){
'use strict';

var utils   = require('../utils/common');
var trees   = require('./trees');
var adler32 = require('./adler32');
var crc32   = require('./crc32');
var msg   = require('./messages');

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
var Z_NO_FLUSH      = 0;
var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
//var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
//var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
//var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;


/* compression levels */
//var Z_NO_COMPRESSION      = 0;
//var Z_BEST_SPEED          = 1;
//var Z_BEST_COMPRESSION    = 9;
var Z_DEFAULT_COMPRESSION = -1;


var Z_FILTERED            = 1;
var Z_HUFFMAN_ONLY        = 2;
var Z_RLE                 = 3;
var Z_FIXED               = 4;
var Z_DEFAULT_STRATEGY    = 0;

/* Possible values of the data_type field (though see inflate()) */
//var Z_BINARY              = 0;
//var Z_TEXT                = 1;
//var Z_ASCII               = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;


/* The deflate compression method */
var Z_DEFLATED  = 8;

/*============================================================================*/


var MAX_MEM_LEVEL = 9;
/* Maximum value for memLevel in deflateInit2 */
var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_MEM_LEVEL = 8;


var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */
var LITERALS      = 256;
/* number of literal bytes 0..255 */
var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */
var D_CODES       = 30;
/* number of distance codes */
var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */
var HEAP_SIZE     = 2*L_CODES + 1;
/* maximum heap size */
var MAX_BITS  = 15;
/* All codes must not exceed MAX_BITS bits */

var MIN_MATCH = 3;
var MAX_MATCH = 258;
var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);

var PRESET_DICT = 0x20;

var INIT_STATE = 42;
var EXTRA_STATE = 69;
var NAME_STATE = 73;
var COMMENT_STATE = 91;
var HCRC_STATE = 103;
var BUSY_STATE = 113;
var FINISH_STATE = 666;

var BS_NEED_MORE      = 1; /* block not completed, need more input or more output */
var BS_BLOCK_DONE     = 2; /* block flush performed */
var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
var BS_FINISH_DONE    = 4; /* finish done, accept no more input or output */

var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

function err(strm, errorCode) {
  strm.msg = msg[errorCode];
  return errorCode;
}

function rank(f) {
  return ((f) << 1) - ((f) > 4 ? 9 : 0);
}

function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }


/* =========================================================================
 * Flush as much pending output as possible. All deflate() output goes
 * through this function so some applications may wish to modify it
 * to avoid allocating a large strm->output buffer and copying into it.
 * (See also read_buf()).
 */
function flush_pending(strm) {
  var s = strm.state;

  //_tr_flush_bits(s);
  var len = s.pending;
  if (len > strm.avail_out) {
    len = strm.avail_out;
  }
  if (len === 0) { return; }

  utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
  strm.next_out += len;
  s.pending_out += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s.pending -= len;
  if (s.pending === 0) {
    s.pending_out = 0;
  }
}


function flush_block_only (s, last) {
  trees._tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
  s.block_start = s.strstart;
  flush_pending(s.strm);
}


function put_byte(s, b) {
  s.pending_buf[s.pending++] = b;
}


/* =========================================================================
 * Put a short in the pending buffer. The 16-bit value is put in MSB order.
 * IN assertion: the stream state is correct and there is enough room in
 * pending_buf.
 */
function putShortMSB(s, b) {
//  put_byte(s, (Byte)(b >> 8));
//  put_byte(s, (Byte)(b & 0xff));
  s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
  s.pending_buf[s.pending++] = b & 0xff;
}


/* ===========================================================================
 * Read a new buffer from the current input stream, update the adler32
 * and total number of bytes read.  All deflate() input goes through
 * this function so some applications may wish to modify it to avoid
 * allocating a large strm->input buffer and copying from it.
 * (See also flush_pending()).
 */
function read_buf(strm, buf, start, size) {
  var len = strm.avail_in;

  if (len > size) { len = size; }
  if (len === 0) { return 0; }

  strm.avail_in -= len;

  utils.arraySet(buf, strm.input, strm.next_in, len, start);
  if (strm.state.wrap === 1) {
    strm.adler = adler32(strm.adler, buf, len, start);
  }

  else if (strm.state.wrap === 2) {
    strm.adler = crc32(strm.adler, buf, len, start);
  }

  strm.next_in += len;
  strm.total_in += len;

  return len;
}


/* ===========================================================================
 * Set match_start to the longest match starting at the given string and
 * return its length. Matches shorter or equal to prev_length are discarded,
 * in which case the result is equal to prev_length and match_start is
 * garbage.
 * IN assertions: cur_match is the head of the hash chain for the current
 *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
 * OUT assertion: the match length is not greater than s->lookahead.
 */
function longest_match(s, cur_match) {
  var chain_length = s.max_chain_length;      /* max hash chain length */
  var scan = s.strstart; /* current string */
  var match;                       /* matched string */
  var len;                           /* length of current match */
  var best_len = s.prev_length;              /* best match length so far */
  var nice_match = s.nice_match;             /* stop if match long enough */
  var limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
      s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0/*NIL*/;

  var _win = s.window; // shortcut

  var wmask = s.w_mask;
  var prev  = s.prev;

  /* Stop when cur_match becomes <= limit. To simplify the code,
   * we prevent matches with the string of window index 0.
   */

  var strend = s.strstart + MAX_MATCH;
  var scan_end1  = _win[scan + best_len - 1];
  var scan_end   = _win[scan + best_len];

  /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
   * It is easy to get rid of this optimization if necessary.
   */
  // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

  /* Do not waste too much time if we already have a good match: */
  if (s.prev_length >= s.good_match) {
    chain_length >>= 2;
  }
  /* Do not look for matches beyond the end of the input. This is necessary
   * to make deflate deterministic.
   */
  if (nice_match > s.lookahead) { nice_match = s.lookahead; }

  // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

  do {
    // Assert(cur_match < s->strstart, "no future");
    match = cur_match;

    /* Skip to next match if the match length cannot increase
     * or if the match length is less than 2.  Note that the checks below
     * for insufficient lookahead only occur occasionally for performance
     * reasons.  Therefore uninitialized memory will be accessed, and
     * conditional jumps will be made that depend on those values.
     * However the length of the match is limited to the lookahead, so
     * the output of deflate is not affected by the uninitialized values.
     */

    if (_win[match + best_len]     !== scan_end  ||
        _win[match + best_len - 1] !== scan_end1 ||
        _win[match]                !== _win[scan] ||
        _win[++match]              !== _win[scan + 1]) {
      continue;
    }

    /* The check at best_len-1 can be removed because it will be made
     * again later. (This heuristic is not always a win.)
     * It is not necessary to compare scan[2] and match[2] since they
     * are always equal when the other bytes match, given that
     * the hash keys are equal and that HASH_BITS >= 8.
     */
    scan += 2;
    match++;
    // Assert(*scan == *match, "match[2]?");

    /* We check for insufficient lookahead only every 8th comparison;
     * the 256th check will be made at strstart+258.
     */
    do {
      /*jshint noempty:false*/
    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             scan < strend);

    // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

    len = MAX_MATCH - (strend - scan);
    scan = strend - MAX_MATCH;

    if (len > best_len) {
      s.match_start = cur_match;
      best_len = len;
      if (len >= nice_match) {
        break;
      }
      scan_end1  = _win[scan + best_len - 1];
      scan_end   = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

  if (best_len <= s.lookahead) {
    return best_len;
  }
  return s.lookahead;
}


/* ===========================================================================
 * Fill the window when the lookahead becomes insufficient.
 * Updates strstart and lookahead.
 *
 * IN assertion: lookahead < MIN_LOOKAHEAD
 * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
 *    At least one byte has been read, or avail_in == 0; reads are
 *    performed for at least two bytes (required for the zip translate_eol
 *    option -- not supported here).
 */
function fill_window(s) {
  var _w_size = s.w_size;
  var p, n, m, more, str;

  //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

  do {
    more = s.window_size - s.lookahead - s.strstart;

    // JS ints have 32 bit, block below not needed
    /* Deal with !@#$% 64K limit: */
    //if (sizeof(int) <= 2) {
    //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
    //        more = wsize;
    //
    //  } else if (more == (unsigned)(-1)) {
    //        /* Very unlikely, but possible on 16 bit machine if
    //         * strstart == 0 && lookahead == 1 (input done a byte at time)
    //         */
    //        more--;
    //    }
    //}


    /* If the window is almost full and there is insufficient lookahead,
     * move the upper half to the lower one to make room in the upper half.
     */
    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {

      utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
      s.match_start -= _w_size;
      s.strstart -= _w_size;
      /* we now have strstart >= MAX_DIST */
      s.block_start -= _w_size;

      /* Slide the hash table (could be avoided with 32 bit values
       at the expense of memory usage). We slide even when level == 0
       to keep the hash table consistent if we switch back to level > 0
       later. (Using level 0 permanently is not an optimal usage of
       zlib, so we don't care about this pathological case.)
       */

      n = s.hash_size;
      p = n;
      do {
        m = s.head[--p];
        s.head[p] = (m >= _w_size ? m - _w_size : 0);
      } while (--n);

      n = _w_size;
      p = n;
      do {
        m = s.prev[--p];
        s.prev[p] = (m >= _w_size ? m - _w_size : 0);
        /* If n is not on any hash chain, prev[n] is garbage but
         * its value will never be used.
         */
      } while (--n);

      more += _w_size;
    }
    if (s.strm.avail_in === 0) {
      break;
    }

    /* If there was no sliding:
     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
     *    more == window_size - lookahead - strstart
     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
     * => more >= window_size - 2*WSIZE + 2
     * In the BIG_MEM or MMAP case (not yet supported),
     *   window_size == input_size + MIN_LOOKAHEAD  &&
     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
     * Otherwise, window_size == 2*WSIZE so more >= 2.
     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
     */
    //Assert(more >= 2, "more < 2");
    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
    s.lookahead += n;

    /* Initialize the hash value now that we have some input: */
    if (s.lookahead + s.insert >= MIN_MATCH) {
      str = s.strstart - s.insert;
      s.ins_h = s.window[str];

      /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;
//#if MIN_MATCH != 3
//        Call update_hash() MIN_MATCH-3 more times
//#endif
      while (s.insert) {
        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH-1]) & s.hash_mask;

        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
        s.insert--;
        if (s.lookahead + s.insert < MIN_MATCH) {
          break;
        }
      }
    }
    /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
     * but this is not important since only literal bytes will be emitted.
     */

  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

  /* If the WIN_INIT bytes after the end of the current data have never been
   * written, then zero those bytes in order to avoid memory check reports of
   * the use of uninitialized (or uninitialised as Julian writes) bytes by
   * the longest match routines.  Update the high water mark for the next
   * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
   * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
   */
//  if (s.high_water < s.window_size) {
//    var curr = s.strstart + s.lookahead;
//    var init = 0;
//
//    if (s.high_water < curr) {
//      /* Previous high water mark below current data -- zero WIN_INIT
//       * bytes or up to end of window, whichever is less.
//       */
//      init = s.window_size - curr;
//      if (init > WIN_INIT)
//        init = WIN_INIT;
//      zmemzero(s->window + curr, (unsigned)init);
//      s->high_water = curr + init;
//    }
//    else if (s->high_water < (ulg)curr + WIN_INIT) {
//      /* High water mark at or above current data, but below current data
//       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
//       * to end of window, whichever is less.
//       */
//      init = (ulg)curr + WIN_INIT - s->high_water;
//      if (init > s->window_size - s->high_water)
//        init = s->window_size - s->high_water;
//      zmemzero(s->window + s->high_water, (unsigned)init);
//      s->high_water += init;
//    }
//  }
//
//  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
//    "not enough room for search");
}

/* ===========================================================================
 * Copy without compression as much as possible from the input stream, return
 * the current block state.
 * This function does not insert new strings in the dictionary since
 * uncompressible data is probably not useful. This function is used
 * only for the level=0 compression option.
 * NOTE: this function should be optimized to avoid extra copying from
 * window to pending_buf.
 */
function deflate_stored(s, flush) {
  /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
   * to pending_buf_size, and each stored block has a 5 byte header:
   */
  var max_block_size = 0xffff;

  if (max_block_size > s.pending_buf_size - 5) {
    max_block_size = s.pending_buf_size - 5;
  }

  /* Copy as much as possible from input to output: */
  for (;;) {
    /* Fill the window as much as possible: */
    if (s.lookahead <= 1) {

      //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
      //  s->block_start >= (long)s->w_size, "slide too late");
//      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
//        s.block_start >= s.w_size)) {
//        throw  new Error("slide too late");
//      }

      fill_window(s);
      if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }

      if (s.lookahead === 0) {
        break;
      }
      /* flush the current block */
    }
    //Assert(s->block_start >= 0L, "block gone");
//    if (s.block_start < 0) throw new Error("block gone");

    s.strstart += s.lookahead;
    s.lookahead = 0;

    /* Emit a stored block if pending_buf will be full: */
    var max_start = s.block_start + max_block_size;

    if (s.strstart === 0 || s.strstart >= max_start) {
      /* strstart == 0 is possible when wraparound on 16-bit machine */
      s.lookahead = s.strstart - max_start;
      s.strstart = max_start;
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/


    }
    /* Flush if we may have to slide, otherwise block_start may become
     * negative and the data will be gone:
     */
    if (s.strstart - s.block_start >= (s.w_size - MIN_LOOKAHEAD)) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }

  s.insert = 0;

  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }

  if (s.strstart > s.block_start) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_NEED_MORE;
}

/* ===========================================================================
 * Compress as much as possible from the input stream, return the current
 * block state.
 * This function does not perform lazy evaluation of matches and inserts
 * new strings in the dictionary only for unmatched strings or for short
 * matches. It is used only for the fast compression options.
 */
function deflate_fast(s, flush) {
  var hash_head;        /* head of the hash chain */
  var bflush;           /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break; /* flush the current block */
      }
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     * At this point we have always match_length < MIN_MATCH
     */
    if (hash_head !== 0/*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */
    }
    if (s.match_length >= MIN_MATCH) {
      // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

      /*** _tr_tally_dist(s, s.strstart - s.match_start,
                     s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;

      /* Insert new strings in the hash table only if the match length
       * is not too large. This saves time but degrades compression.
       */
      if (s.match_length <= s.max_lazy_match/*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
        s.match_length--; /* string at strstart already in table */
        do {
          s.strstart++;
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
          /* strstart never exceeds WSIZE-MAX_MATCH, so there are
           * always MIN_MATCH bytes ahead.
           */
        } while (--s.match_length !== 0);
        s.strstart++;
      } else
      {
        s.strstart += s.match_length;
        s.match_length = 0;
        s.ins_h = s.window[s.strstart];
        /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) & s.hash_mask;

//#if MIN_MATCH != 3
//                Call UPDATE_HASH() MIN_MATCH-3 more times
//#endif
        /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
         * matter since it will be recomputed at next deflate call.
         */
      }
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s.window[s.strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = ((s.strstart < (MIN_MATCH-1)) ? s.strstart : MIN_MATCH-1);
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * Same as above, but achieves better compression. We use a lazy
 * evaluation for matches: a match is finally adopted only if there is
 * no better match at the next window position.
 */
function deflate_slow(s, flush) {
  var hash_head;          /* head of hash chain */
  var bflush;              /* set if current block must be flushed */

  var max_insert;

  /* Process the input block. */
  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     */
    s.prev_length = s.match_length;
    s.prev_match = s.match_start;
    s.match_length = MIN_MATCH-1;

    if (hash_head !== 0/*NIL*/ && s.prev_length < s.max_lazy_match &&
        s.strstart - hash_head <= (s.w_size-MIN_LOOKAHEAD)/*MAX_DIST(s)*/) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */

      if (s.match_length <= 5 &&
         (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096/*TOO_FAR*/))) {

        /* If prev_match is also MIN_MATCH, match_start is garbage
         * but we will ignore the current match anyway.
         */
        s.match_length = MIN_MATCH-1;
      }
    }
    /* If there was a match at the previous step and the current
     * match is not better, output the previous match:
     */
    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
      max_insert = s.strstart + s.lookahead - MIN_MATCH;
      /* Do not insert strings in hash table beyond this. */

      //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

      /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
                     s.prev_length - MIN_MATCH, bflush);***/
      bflush = trees._tr_tally(s, s.strstart - 1- s.prev_match, s.prev_length - MIN_MATCH);
      /* Insert in hash table all strings up to the end of the match.
       * strstart-1 and strstart are already inserted. If there is not
       * enough lookahead, the last two strings are not inserted in
       * the hash table.
       */
      s.lookahead -= s.prev_length-1;
      s.prev_length -= 2;
      do {
        if (++s.strstart <= max_insert) {
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
        }
      } while (--s.prev_length !== 0);
      s.match_available = 0;
      s.match_length = MIN_MATCH-1;
      s.strstart++;

      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }

    } else if (s.match_available) {
      /* If there was no match at the previous position, output a
       * single literal. If there was a match but the current match
       * is longer, truncate the previous match to a single literal.
       */
      //Tracevv((stderr,"%c", s->window[s->strstart-1]));
      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart-1]);

      if (bflush) {
        /*** FLUSH_BLOCK_ONLY(s, 0) ***/
        flush_block_only(s, false);
        /***/
      }
      s.strstart++;
      s.lookahead--;
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      /* There is no previous match to compare with, wait for
       * the next step to decide.
       */
      s.match_available = 1;
      s.strstart++;
      s.lookahead--;
    }
  }
  //Assert (flush != Z_NO_FLUSH, "no flush?");
  if (s.match_available) {
    //Tracevv((stderr,"%c", s->window[s->strstart-1]));
    /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart-1]);

    s.match_available = 0;
  }
  s.insert = s.strstart < MIN_MATCH-1 ? s.strstart : MIN_MATCH-1;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_BLOCK_DONE;
}


/* ===========================================================================
 * For Z_RLE, simply look for runs of bytes, generate matches only of distance
 * one.  Do not maintain a hash table.  (It will be regenerated if this run of
 * deflate switches away from Z_RLE.)
 */
function deflate_rle(s, flush) {
  var bflush;            /* set if current block must be flushed */
  var prev;              /* byte at distance one to match */
  var scan, strend;      /* scan goes up to strend for length of run */

  var _win = s.window;

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the longest run, plus one for the unrolled loop.
     */
    if (s.lookahead <= MAX_MATCH) {
      fill_window(s);
      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* See how many times the previous byte repeats */
    s.match_length = 0;
    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
      scan = s.strstart - 1;
      prev = _win[scan];
      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s.strstart + MAX_MATCH;
        do {
          /*jshint noempty:false*/
        } while (prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 scan < strend);
        s.match_length = MAX_MATCH - (strend - scan);
        if (s.match_length > s.lookahead) {
          s.match_length = s.lookahead;
        }
      }
      //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
    }

    /* Emit match if have run of MIN_MATCH or longer, else emit literal */
    if (s.match_length >= MIN_MATCH) {
      //check_match(s, s.strstart, s.strstart - 1, s.match_length);

      /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;
      s.strstart += s.match_length;
      s.match_length = 0;
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s->window[s->strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
 * (It will be regenerated if this run of deflate switches away from Huffman.)
 */
function deflate_huff(s, flush) {
  var bflush;             /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we have a literal to write. */
    if (s.lookahead === 0) {
      fill_window(s);
      if (s.lookahead === 0) {
        if (flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        break;      /* flush the current block */
      }
    }

    /* Output a literal byte */
    s.match_length = 0;
    //Tracevv((stderr,"%c", s->window[s->strstart]));
    /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
    s.lookahead--;
    s.strstart++;
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* Values for max_lazy_match, good_match and max_chain_length, depending on
 * the desired pack level (0..9). The values given below have been tuned to
 * exclude worst case performance for pathological files. Better values may be
 * found for specific files.
 */
var Config = function (good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
};

var configuration_table;

configuration_table = [
  /*      good lazy nice chain */
  new Config(0, 0, 0, 0, deflate_stored),          /* 0 store only */
  new Config(4, 4, 8, 4, deflate_fast),            /* 1 max speed, no lazy matches */
  new Config(4, 5, 16, 8, deflate_fast),           /* 2 */
  new Config(4, 6, 32, 32, deflate_fast),          /* 3 */

  new Config(4, 4, 16, 16, deflate_slow),          /* 4 lazy matches */
  new Config(8, 16, 32, 32, deflate_slow),         /* 5 */
  new Config(8, 16, 128, 128, deflate_slow),       /* 6 */
  new Config(8, 32, 128, 256, deflate_slow),       /* 7 */
  new Config(32, 128, 258, 1024, deflate_slow),    /* 8 */
  new Config(32, 258, 258, 4096, deflate_slow)     /* 9 max compression */
];


/* ===========================================================================
 * Initialize the "longest match" routines for a new zlib stream
 */
function lm_init(s) {
  s.window_size = 2 * s.w_size;

  /*** CLEAR_HASH(s); ***/
  zero(s.head); // Fill with NIL (= 0);

  /* Set the default configuration parameters:
   */
  s.max_lazy_match = configuration_table[s.level].max_lazy;
  s.good_match = configuration_table[s.level].good_length;
  s.nice_match = configuration_table[s.level].nice_length;
  s.max_chain_length = configuration_table[s.level].max_chain;

  s.strstart = 0;
  s.block_start = 0;
  s.lookahead = 0;
  s.insert = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  s.ins_h = 0;
}


function DeflateState() {
  this.strm = null;            /* pointer back to this zlib stream */
  this.status = 0;            /* as the name implies */
  this.pending_buf = null;      /* output still pending */
  this.pending_buf_size = 0;  /* size of pending_buf */
  this.pending_out = 0;       /* next pending byte to output to the stream */
  this.pending = 0;           /* nb of bytes in the pending buffer */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.gzhead = null;         /* gzip header information to write */
  this.gzindex = 0;           /* where in extra, name, or comment */
  this.method = Z_DEFLATED; /* can only be DEFLATED */
  this.last_flush = -1;   /* value of flush param for previous deflate call */

  this.w_size = 0;  /* LZ77 window size (32K by default) */
  this.w_bits = 0;  /* log2(w_size)  (8..16) */
  this.w_mask = 0;  /* w_size - 1 */

  this.window = null;
  /* Sliding window. Input bytes are read into the second half of the window,
   * and move to the first half later to keep a dictionary of at least wSize
   * bytes. With this organization, matches are limited to a distance of
   * wSize-MAX_MATCH bytes, but this ensures that IO is always
   * performed with a length multiple of the block size.
   */

  this.window_size = 0;
  /* Actual size of window: 2*wSize, except when the user input buffer
   * is directly used as sliding window.
   */

  this.prev = null;
  /* Link to older string with same hash index. To limit the size of this
   * array to 64K, this link is maintained only for the last 32K strings.
   * An index in this array is thus a window index modulo 32K.
   */

  this.head = null;   /* Heads of the hash chains or NIL. */

  this.ins_h = 0;       /* hash index of string to be inserted */
  this.hash_size = 0;   /* number of elements in hash table */
  this.hash_bits = 0;   /* log2(hash_size) */
  this.hash_mask = 0;   /* hash_size-1 */

  this.hash_shift = 0;
  /* Number of bits by which ins_h must be shifted at each input
   * step. It must be such that after MIN_MATCH steps, the oldest
   * byte no longer takes part in the hash key, that is:
   *   hash_shift * MIN_MATCH >= hash_bits
   */

  this.block_start = 0;
  /* Window position at the beginning of the current output block. Gets
   * negative when the window is moved backwards.
   */

  this.match_length = 0;      /* length of best match */
  this.prev_match = 0;        /* previous match */
  this.match_available = 0;   /* set if previous match exists */
  this.strstart = 0;          /* start of string to insert */
  this.match_start = 0;       /* start of matching string */
  this.lookahead = 0;         /* number of valid bytes ahead in window */

  this.prev_length = 0;
  /* Length of the best match at previous step. Matches not greater than this
   * are discarded. This is used in the lazy match evaluation.
   */

  this.max_chain_length = 0;
  /* To speed up deflation, hash chains are never searched beyond this
   * length.  A higher limit improves compression ratio but degrades the
   * speed.
   */

  this.max_lazy_match = 0;
  /* Attempt to find a better match only when the current match is strictly
   * smaller than this value. This mechanism is used only for compression
   * levels >= 4.
   */
  // That's alias to max_lazy_match, don't use directly
  //this.max_insert_length = 0;
  /* Insert new strings in the hash table only if the match length is not
   * greater than this length. This saves time but degrades compression.
   * max_insert_length is used only for compression levels <= 3.
   */

  this.level = 0;     /* compression level (1..9) */
  this.strategy = 0;  /* favor or force Huffman coding*/

  this.good_match = 0;
  /* Use a faster search when the previous match is longer than this */

  this.nice_match = 0; /* Stop searching when current match exceeds this */

              /* used by trees.c: */

  /* Didn't use ct_data typedef below to suppress compiler warning */

  // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
  // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
  // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

  // Use flat array of DOUBLE size, with interleaved fata,
  // because JS does not support effective
  this.dyn_ltree  = new utils.Buf16(HEAP_SIZE * 2);
  this.dyn_dtree  = new utils.Buf16((2*D_CODES+1) * 2);
  this.bl_tree    = new utils.Buf16((2*BL_CODES+1) * 2);
  zero(this.dyn_ltree);
  zero(this.dyn_dtree);
  zero(this.bl_tree);

  this.l_desc   = null;         /* desc. for literal tree */
  this.d_desc   = null;         /* desc. for distance tree */
  this.bl_desc  = null;         /* desc. for bit length tree */

  //ush bl_count[MAX_BITS+1];
  this.bl_count = new utils.Buf16(MAX_BITS+1);
  /* number of codes at each bit length for an optimal tree */

  //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
  this.heap = new utils.Buf16(2*L_CODES+1);  /* heap used to build the Huffman trees */
  zero(this.heap);

  this.heap_len = 0;               /* number of elements in the heap */
  this.heap_max = 0;               /* element of largest frequency */
  /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
   * The same heap array is used to build all trees.
   */

  this.depth = new utils.Buf16(2*L_CODES+1); //uch depth[2*L_CODES+1];
  zero(this.depth);
  /* Depth of each subtree used as tie breaker for trees of equal frequency
   */

  this.l_buf = 0;          /* buffer index for literals or lengths */

  this.lit_bufsize = 0;
  /* Size of match buffer for literals/lengths.  There are 4 reasons for
   * limiting lit_bufsize to 64K:
   *   - frequencies can be kept in 16 bit counters
   *   - if compression is not successful for the first block, all input
   *     data is still in the window so we can still emit a stored block even
   *     when input comes from standard input.  (This can also be done for
   *     all blocks if lit_bufsize is not greater than 32K.)
   *   - if compression is not successful for a file smaller than 64K, we can
   *     even emit a stored file instead of a stored block (saving 5 bytes).
   *     This is applicable only for zip (not gzip or zlib).
   *   - creating new Huffman trees less frequently may not provide fast
   *     adaptation to changes in the input data statistics. (Take for
   *     example a binary file with poorly compressible code followed by
   *     a highly compressible string table.) Smaller buffer sizes give
   *     fast adaptation but have of course the overhead of transmitting
   *     trees more frequently.
   *   - I can't count above 4
   */

  this.last_lit = 0;      /* running index in l_buf */

  this.d_buf = 0;
  /* Buffer index for distances. To simplify the code, d_buf and l_buf have
   * the same number of elements. To use different lengths, an extra flag
   * array would be necessary.
   */

  this.opt_len = 0;       /* bit length of current block with optimal trees */
  this.static_len = 0;    /* bit length of current block with static trees */
  this.matches = 0;       /* number of string matches in current block */
  this.insert = 0;        /* bytes at end of window left to insert */


  this.bi_buf = 0;
  /* Output buffer. bits are inserted starting at the bottom (least
   * significant bits).
   */
  this.bi_valid = 0;
  /* Number of valid bits in bi_buf.  All bits above the last valid bit
   * are always zero.
   */

  // Used for window memory init. We safely ignore it for JS. That makes
  // sense only for pointers and memory check tools.
  //this.high_water = 0;
  /* High water mark offset in window for initialized bytes -- bytes above
   * this are set to zero in order to avoid memory check warnings when
   * longest match routines access bytes past the input.  This is then
   * updated to the new high water mark.
   */
}


function deflateResetKeep(strm) {
  var s;

  if (!strm || !strm.state) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN;

  s = strm.state;
  s.pending = 0;
  s.pending_out = 0;

  if (s.wrap < 0) {
    s.wrap = -s.wrap;
    /* was made negative by deflate(..., Z_FINISH); */
  }
  s.status = (s.wrap ? INIT_STATE : BUSY_STATE);
  strm.adler = (s.wrap === 2) ?
    0  // crc32(0, Z_NULL, 0)
  :
    1; // adler32(0, Z_NULL, 0)
  s.last_flush = Z_NO_FLUSH;
  trees._tr_init(s);
  return Z_OK;
}


function deflateReset(strm) {
  var ret = deflateResetKeep(strm);
  if (ret === Z_OK) {
    lm_init(strm.state);
  }
  return ret;
}


function deflateSetHeader(strm, head) {
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  if (strm.state.wrap !== 2) { return Z_STREAM_ERROR; }
  strm.state.gzhead = head;
  return Z_OK;
}


function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
  if (!strm) { // === Z_NULL
    return Z_STREAM_ERROR;
  }
  var wrap = 1;

  if (level === Z_DEFAULT_COMPRESSION) {
    level = 6;
  }

  if (windowBits < 0) { /* suppress zlib wrapper */
    wrap = 0;
    windowBits = -windowBits;
  }

  else if (windowBits > 15) {
    wrap = 2;           /* write gzip wrapper instead */
    windowBits -= 16;
  }


  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED ||
    windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
    strategy < 0 || strategy > Z_FIXED) {
    return err(strm, Z_STREAM_ERROR);
  }


  if (windowBits === 8) {
    windowBits = 9;
  }
  /* until 256-byte window bug fixed */

  var s = new DeflateState();

  strm.state = s;
  s.strm = strm;

  s.wrap = wrap;
  s.gzhead = null;
  s.w_bits = windowBits;
  s.w_size = 1 << s.w_bits;
  s.w_mask = s.w_size - 1;

  s.hash_bits = memLevel + 7;
  s.hash_size = 1 << s.hash_bits;
  s.hash_mask = s.hash_size - 1;
  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);

  s.window = new utils.Buf8(s.w_size * 2);
  s.head = new utils.Buf16(s.hash_size);
  s.prev = new utils.Buf16(s.w_size);

  // Don't need mem init magic for JS.
  //s.high_water = 0;  /* nothing written to s->window yet */

  s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */

  s.pending_buf_size = s.lit_bufsize * 4;
  s.pending_buf = new utils.Buf8(s.pending_buf_size);

  s.d_buf = s.lit_bufsize >> 1;
  s.l_buf = (1 + 2) * s.lit_bufsize;

  s.level = level;
  s.strategy = strategy;
  s.method = method;

  return deflateReset(strm);
}

function deflateInit(strm, level) {
  return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
}


function deflate(strm, flush) {
  var old_flush, s;
  var beg, val; // for gzip header write only

  if (!strm || !strm.state ||
    flush > Z_BLOCK || flush < 0) {
    return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
  }

  s = strm.state;

  if (!strm.output ||
      (!strm.input && strm.avail_in !== 0) ||
      (s.status === FINISH_STATE && flush !== Z_FINISH)) {
    return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR : Z_STREAM_ERROR);
  }

  s.strm = strm; /* just in case */
  old_flush = s.last_flush;
  s.last_flush = flush;

  /* Write the header */
  if (s.status === INIT_STATE) {

    if (s.wrap === 2) { // GZIP header
      strm.adler = 0;  //crc32(0L, Z_NULL, 0);
      put_byte(s, 31);
      put_byte(s, 139);
      put_byte(s, 8);
      if (!s.gzhead) { // s->gzhead == Z_NULL
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, OS_CODE);
        s.status = BUSY_STATE;
      }
      else {
        put_byte(s, (s.gzhead.text ? 1 : 0) +
                    (s.gzhead.hcrc ? 2 : 0) +
                    (!s.gzhead.extra ? 0 : 4) +
                    (!s.gzhead.name ? 0 : 8) +
                    (!s.gzhead.comment ? 0 : 16)
                );
        put_byte(s, s.gzhead.time & 0xff);
        put_byte(s, (s.gzhead.time >> 8) & 0xff);
        put_byte(s, (s.gzhead.time >> 16) & 0xff);
        put_byte(s, (s.gzhead.time >> 24) & 0xff);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, s.gzhead.os & 0xff);
        if (s.gzhead.extra && s.gzhead.extra.length) {
          put_byte(s, s.gzhead.extra.length & 0xff);
          put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
        }
        if (s.gzhead.hcrc) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
        }
        s.gzindex = 0;
        s.status = EXTRA_STATE;
      }
    }
    else // DEFLATE header
    {
      var header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8;
      var level_flags = -1;

      if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
        level_flags = 0;
      } else if (s.level < 6) {
        level_flags = 1;
      } else if (s.level === 6) {
        level_flags = 2;
      } else {
        level_flags = 3;
      }
      header |= (level_flags << 6);
      if (s.strstart !== 0) { header |= PRESET_DICT; }
      header += 31 - (header % 31);

      s.status = BUSY_STATE;
      putShortMSB(s, header);

      /* Save the adler32 of the preset dictionary: */
      if (s.strstart !== 0) {
        putShortMSB(s, strm.adler >>> 16);
        putShortMSB(s, strm.adler & 0xffff);
      }
      strm.adler = 1; // adler32(0L, Z_NULL, 0);
    }
  }

//#ifdef GZIP
  if (s.status === EXTRA_STATE) {
    if (s.gzhead.extra/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */

      while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            break;
          }
        }
        put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
        s.gzindex++;
      }
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (s.gzindex === s.gzhead.extra.length) {
        s.gzindex = 0;
        s.status = NAME_STATE;
      }
    }
    else {
      s.status = NAME_STATE;
    }
  }
  if (s.status === NAME_STATE) {
    if (s.gzhead.name/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.name.length) {
          val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.gzindex = 0;
        s.status = COMMENT_STATE;
      }
    }
    else {
      s.status = COMMENT_STATE;
    }
  }
  if (s.status === COMMENT_STATE) {
    if (s.gzhead.comment/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.comment.length) {
          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.status = HCRC_STATE;
      }
    }
    else {
      s.status = HCRC_STATE;
    }
  }
  if (s.status === HCRC_STATE) {
    if (s.gzhead.hcrc) {
      if (s.pending + 2 > s.pending_buf_size) {
        flush_pending(strm);
      }
      if (s.pending + 2 <= s.pending_buf_size) {
        put_byte(s, strm.adler & 0xff);
        put_byte(s, (strm.adler >> 8) & 0xff);
        strm.adler = 0; //crc32(0L, Z_NULL, 0);
        s.status = BUSY_STATE;
      }
    }
    else {
      s.status = BUSY_STATE;
    }
  }
//#endif

  /* Flush as much pending output as possible */
  if (s.pending !== 0) {
    flush_pending(strm);
    if (strm.avail_out === 0) {
      /* Since avail_out is 0, deflate will be called again with
       * more output space, but possibly with both pending and
       * avail_in equal to zero. There won't be anything to do,
       * but this is not an error situation so make sure we
       * return OK instead of BUF_ERROR at next call of deflate:
       */
      s.last_flush = -1;
      return Z_OK;
    }

    /* Make sure there is something to do and avoid duplicate consecutive
     * flushes. For repeated and useless calls with Z_FINISH, we keep
     * returning Z_STREAM_END instead of Z_BUF_ERROR.
     */
  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
    flush !== Z_FINISH) {
    return err(strm, Z_BUF_ERROR);
  }

  /* User must not provide more input after the first FINISH: */
  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
    return err(strm, Z_BUF_ERROR);
  }

  /* Start a new block or continue the current one.
   */
  if (strm.avail_in !== 0 || s.lookahead !== 0 ||
    (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)) {
    var bstate = (s.strategy === Z_HUFFMAN_ONLY) ? deflate_huff(s, flush) :
      (s.strategy === Z_RLE ? deflate_rle(s, flush) :
        configuration_table[s.level].func(s, flush));

    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s.status = FINISH_STATE;
    }
    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        /* avoid BUF_ERROR next call, see above */
      }
      return Z_OK;
      /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
       * of deflate should use the same flush parameter to make sure
       * that the flush is complete. So we don't have to output an
       * empty block here, this will be done at next call. This also
       * ensures that for a very small output buffer, we emit at most
       * one empty block.
       */
    }
    if (bstate === BS_BLOCK_DONE) {
      if (flush === Z_PARTIAL_FLUSH) {
        trees._tr_align(s);
      }
      else if (flush !== Z_BLOCK) { /* FULL_FLUSH or SYNC_FLUSH */

        trees._tr_stored_block(s, 0, 0, false);
        /* For a full flush, this empty block will be recognized
         * as a special marker by inflate_sync().
         */
        if (flush === Z_FULL_FLUSH) {
          /*** CLEAR_HASH(s); ***/             /* forget history */
          zero(s.head); // Fill with NIL (= 0);

          if (s.lookahead === 0) {
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
        }
      }
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
        return Z_OK;
      }
    }
  }
  //Assert(strm->avail_out > 0, "bug2");
  //if (strm.avail_out <= 0) { throw new Error("bug2");}

  if (flush !== Z_FINISH) { return Z_OK; }
  if (s.wrap <= 0) { return Z_STREAM_END; }

  /* Write the trailer */
  if (s.wrap === 2) {
    put_byte(s, strm.adler & 0xff);
    put_byte(s, (strm.adler >> 8) & 0xff);
    put_byte(s, (strm.adler >> 16) & 0xff);
    put_byte(s, (strm.adler >> 24) & 0xff);
    put_byte(s, strm.total_in & 0xff);
    put_byte(s, (strm.total_in >> 8) & 0xff);
    put_byte(s, (strm.total_in >> 16) & 0xff);
    put_byte(s, (strm.total_in >> 24) & 0xff);
  }
  else
  {
    putShortMSB(s, strm.adler >>> 16);
    putShortMSB(s, strm.adler & 0xffff);
  }

  flush_pending(strm);
  /* If avail_out is zero, the application will call deflate again
   * to flush the rest.
   */
  if (s.wrap > 0) { s.wrap = -s.wrap; }
  /* write the trailer only once! */
  return s.pending !== 0 ? Z_OK : Z_STREAM_END;
}

function deflateEnd(strm) {
  var status;

  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
    return Z_STREAM_ERROR;
  }

  status = strm.state.status;
  if (status !== INIT_STATE &&
    status !== EXTRA_STATE &&
    status !== NAME_STATE &&
    status !== COMMENT_STATE &&
    status !== HCRC_STATE &&
    status !== BUSY_STATE &&
    status !== FINISH_STATE
  ) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.state = null;

  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
}

/* =========================================================================
 * Copy the source state to the destination state
 */
//function deflateCopy(dest, source) {
//
//}

exports.deflateInit = deflateInit;
exports.deflateInit2 = deflateInit2;
exports.deflateReset = deflateReset;
exports.deflateResetKeep = deflateResetKeep;
exports.deflateSetHeader = deflateSetHeader;
exports.deflate = deflate;
exports.deflateEnd = deflateEnd;
exports.deflateInfo = 'pako deflate (from Nodeca project)';

/* Not implemented
exports.deflateBound = deflateBound;
exports.deflateCopy = deflateCopy;
exports.deflateSetDictionary = deflateSetDictionary;
exports.deflateParams = deflateParams;
exports.deflatePending = deflatePending;
exports.deflatePrime = deflatePrime;
exports.deflateTune = deflateTune;
*/

},{"../utils/common":213,"./adler32":215,"./crc32":217,"./messages":223,"./trees":224}],219:[function(require,module,exports){
'use strict';


function GZheader() {
  /* true if compressed data believed to be text */
  this.text       = 0;
  /* modification time */
  this.time       = 0;
  /* extra flags (not used when writing a gzip file) */
  this.xflags     = 0;
  /* operating system */
  this.os         = 0;
  /* pointer to extra field or Z_NULL if none */
  this.extra      = null;
  /* extra field length (valid if extra != Z_NULL) */
  this.extra_len  = 0; // Actually, we don't need it in JS,
                       // but leave for few code modifications

  //
  // Setup limits is not necessary because in js we should not preallocate memory
  // for inflate use constant limit in 65536 bytes
  //

  /* space at extra (only when reading header) */
  // this.extra_max  = 0;
  /* pointer to zero-terminated file name or Z_NULL */
  this.name       = '';
  /* space at name (only when reading header) */
  // this.name_max   = 0;
  /* pointer to zero-terminated comment or Z_NULL */
  this.comment    = '';
  /* space at comment (only when reading header) */
  // this.comm_max   = 0;
  /* true if there was or will be a header crc */
  this.hcrc       = 0;
  /* true when done reading gzip header (not used when writing a gzip file) */
  this.done       = false;
}

module.exports = GZheader;

},{}],220:[function(require,module,exports){
'use strict';

// See state defs from inflate.js
var BAD = 30;       /* got a data error -- remain here until reset */
var TYPE = 12;      /* i: waiting for type bits, including last-flag bit */

/*
   Decode literal, length, and distance codes and write out the resulting
   literal and match bytes until either not enough input or output is
   available, an end-of-block is encountered, or a data error is encountered.
   When large enough input and output buffers are supplied to inflate(), for
   example, a 16K input buffer and a 64K output buffer, more than 95% of the
   inflate execution time is spent in this routine.

   Entry assumptions:

        state.mode === LEN
        strm.avail_in >= 6
        strm.avail_out >= 258
        start >= strm.avail_out
        state.bits < 8

   On return, state.mode is one of:

        LEN -- ran out of enough output space or enough available input
        TYPE -- reached end of block code, inflate() to interpret next block
        BAD -- error in block data

   Notes:

    - The maximum input bits used by a length/distance pair is 15 bits for the
      length code, 5 bits for the length extra, 15 bits for the distance code,
      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
      Therefore if strm.avail_in >= 6, then there is enough input to avoid
      checking for available input while decoding.

    - The maximum bytes that a single length/distance pair can output is 258
      bytes, which is the maximum length that can be coded.  inflate_fast()
      requires strm.avail_out >= 258 for each loop to avoid checking for
      output space.
 */
module.exports = function inflate_fast(strm, start) {
  var state;
  var _in;                    /* local strm.input */
  var last;                   /* have enough input while in < last */
  var _out;                   /* local strm.output */
  var beg;                    /* inflate()'s initial strm.output */
  var end;                    /* while out < end, enough space available */
//#ifdef INFLATE_STRICT
  var dmax;                   /* maximum distance from zlib header */
//#endif
  var wsize;                  /* window size or zero if not using window */
  var whave;                  /* valid bytes in the window */
  var wnext;                  /* window write index */
  // Use `s_window` instead `window`, avoid conflict with instrumentation tools
  var s_window;               /* allocated sliding window, if wsize != 0 */
  var hold;                   /* local strm.hold */
  var bits;                   /* local strm.bits */
  var lcode;                  /* local strm.lencode */
  var dcode;                  /* local strm.distcode */
  var lmask;                  /* mask for first level of length codes */
  var dmask;                  /* mask for first level of distance codes */
  var here;                   /* retrieved table entry */
  var op;                     /* code bits, operation, extra bits, or */
                              /*  window position, window bytes to copy */
  var len;                    /* match length, unused bytes */
  var dist;                   /* match distance */
  var from;                   /* where to copy match from */
  var from_source;


  var input, output; // JS specific, because we have no pointers

  /* copy state to local variables */
  state = strm.state;
  //here = state.here;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257);
//#ifdef INFLATE_STRICT
  dmax = state.dmax;
//#endif
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  s_window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;


  /* decode literals and length/distances until end-of-block or not enough
     input data or output space */

  top:
  do {
    if (bits < 15) {
      hold += input[_in++] << bits;
      bits += 8;
      hold += input[_in++] << bits;
      bits += 8;
    }

    here = lcode[hold & lmask];

    dolen:
    for (;;) { // Goto emulation
      op = here >>> 24/*here.bits*/;
      hold >>>= op;
      bits -= op;
      op = (here >>> 16) & 0xff/*here.op*/;
      if (op === 0) {                          /* literal */
        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
        //        "inflate:         literal '%c'\n" :
        //        "inflate:         literal 0x%02x\n", here.val));
        output[_out++] = here & 0xffff/*here.val*/;
      }
      else if (op & 16) {                     /* length base */
        len = here & 0xffff/*here.val*/;
        op &= 15;                           /* number of extra bits */
        if (op) {
          if (bits < op) {
            hold += input[_in++] << bits;
            bits += 8;
          }
          len += hold & ((1 << op) - 1);
          hold >>>= op;
          bits -= op;
        }
        //Tracevv((stderr, "inflate:         length %u\n", len));
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }
        here = dcode[hold & dmask];

        dodist:
        for (;;) { // goto emulation
          op = here >>> 24/*here.bits*/;
          hold >>>= op;
          bits -= op;
          op = (here >>> 16) & 0xff/*here.op*/;

          if (op & 16) {                      /* distance base */
            dist = here & 0xffff/*here.val*/;
            op &= 15;                       /* number of extra bits */
            if (bits < op) {
              hold += input[_in++] << bits;
              bits += 8;
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
            }
            dist += hold & ((1 << op) - 1);
//#ifdef INFLATE_STRICT
            if (dist > dmax) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break top;
            }
//#endif
            hold >>>= op;
            bits -= op;
            //Tracevv((stderr, "inflate:         distance %u\n", dist));
            op = _out - beg;                /* max distance in output */
            if (dist > op) {                /* see if copy from window */
              op = dist - op;               /* distance back in window */
              if (op > whave) {
                if (state.sane) {
                  strm.msg = 'invalid distance too far back';
                  state.mode = BAD;
                  break top;
                }

// (!) This block is disabled in zlib defailts,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//                if (len <= op - whave) {
//                  do {
//                    output[_out++] = 0;
//                  } while (--len);
//                  continue top;
//                }
//                len -= op - whave;
//                do {
//                  output[_out++] = 0;
//                } while (--op > whave);
//                if (op === 0) {
//                  from = _out - dist;
//                  do {
//                    output[_out++] = output[from++];
//                  } while (--len);
//                  continue top;
//                }
//#endif
              }
              from = 0; // window index
              from_source = s_window;
              if (wnext === 0) {           /* very common case */
                from += wsize - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              else if (wnext < op) {      /* wrap around window */
                from += wsize + wnext - op;
                op -= wnext;
                if (op < len) {         /* some from end of window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = 0;
                  if (wnext < len) {  /* some from start of window */
                    op = wnext;
                    len -= op;
                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);
                    from = _out - dist;      /* rest from output */
                    from_source = output;
                  }
                }
              }
              else {                      /* contiguous in window */
                from += wnext - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              while (len > 2) {
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                len -= 3;
              }
              if (len) {
                output[_out++] = from_source[from++];
                if (len > 1) {
                  output[_out++] = from_source[from++];
                }
              }
            }
            else {
              from = _out - dist;          /* copy direct from output */
              do {                        /* minimum length is three */
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                len -= 3;
              } while (len > 2);
              if (len) {
                output[_out++] = output[from++];
                if (len > 1) {
                  output[_out++] = output[from++];
                }
              }
            }
          }
          else if ((op & 64) === 0) {          /* 2nd level distance code */
            here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
            continue dodist;
          }
          else {
            strm.msg = 'invalid distance code';
            state.mode = BAD;
            break top;
          }

          break; // need to emulate goto via "continue"
        }
      }
      else if ((op & 64) === 0) {              /* 2nd level length code */
        here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
        continue dolen;
      }
      else if (op & 32) {                     /* end-of-block */
        //Tracevv((stderr, "inflate:         end of block\n"));
        state.mode = TYPE;
        break top;
      }
      else {
        strm.msg = 'invalid literal/length code';
        state.mode = BAD;
        break top;
      }

      break; // need to emulate goto via "continue"
    }
  } while (_in < last && _out < end);

  /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;

  /* update state and return */
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
  strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
  state.hold = hold;
  state.bits = bits;
  return;
};

},{}],221:[function(require,module,exports){
'use strict';


var utils = require('../utils/common');
var adler32 = require('./adler32');
var crc32   = require('./crc32');
var inflate_fast = require('./inffast');
var inflate_table = require('./inftrees');

var CODES = 0;
var LENS = 1;
var DISTS = 2;

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
//var Z_NO_FLUSH      = 0;
//var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
//var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;

/* The deflate compression method */
var Z_DEFLATED  = 8;


/* STATES ====================================================================*/
/* ===========================================================================*/


var    HEAD = 1;       /* i: waiting for magic header */
var    FLAGS = 2;      /* i: waiting for method and flags (gzip) */
var    TIME = 3;       /* i: waiting for modification time (gzip) */
var    OS = 4;         /* i: waiting for extra flags and operating system (gzip) */
var    EXLEN = 5;      /* i: waiting for extra length (gzip) */
var    EXTRA = 6;      /* i: waiting for extra bytes (gzip) */
var    NAME = 7;       /* i: waiting for end of file name (gzip) */
var    COMMENT = 8;    /* i: waiting for end of comment (gzip) */
var    HCRC = 9;       /* i: waiting for header crc (gzip) */
var    DICTID = 10;    /* i: waiting for dictionary check value */
var    DICT = 11;      /* waiting for inflateSetDictionary() call */
var        TYPE = 12;      /* i: waiting for type bits, including last-flag bit */
var        TYPEDO = 13;    /* i: same, but skip check to exit inflate on new block */
var        STORED = 14;    /* i: waiting for stored size (length and complement) */
var        COPY_ = 15;     /* i/o: same as COPY below, but only first time in */
var        COPY = 16;      /* i/o: waiting for input or output to copy stored block */
var        TABLE = 17;     /* i: waiting for dynamic block table lengths */
var        LENLENS = 18;   /* i: waiting for code length code lengths */
var        CODELENS = 19;  /* i: waiting for length/lit and distance code lengths */
var            LEN_ = 20;      /* i: same as LEN below, but only first time in */
var            LEN = 21;       /* i: waiting for length/lit/eob code */
var            LENEXT = 22;    /* i: waiting for length extra bits */
var            DIST = 23;      /* i: waiting for distance code */
var            DISTEXT = 24;   /* i: waiting for distance extra bits */
var            MATCH = 25;     /* o: waiting for output space to copy string */
var            LIT = 26;       /* o: waiting for output space to write literal */
var    CHECK = 27;     /* i: waiting for 32-bit check value */
var    LENGTH = 28;    /* i: waiting for 32-bit length (gzip) */
var    DONE = 29;      /* finished check, done -- remain here until reset */
var    BAD = 30;       /* got a data error -- remain here until reset */
var    MEM = 31;       /* got an inflate() memory error -- remain here until reset */
var    SYNC = 32;      /* looking for synchronization bytes to restart inflate() */

/* ===========================================================================*/



var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_WBITS = MAX_WBITS;


function ZSWAP32(q) {
  return  (((q >>> 24) & 0xff) +
          ((q >>> 8) & 0xff00) +
          ((q & 0xff00) << 8) +
          ((q & 0xff) << 24));
}


function InflateState() {
  this.mode = 0;             /* current inflate mode */
  this.last = false;          /* true if processing last block */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.havedict = false;      /* true if dictionary provided */
  this.flags = 0;             /* gzip header method and flags (0 if zlib) */
  this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */
  this.check = 0;             /* protected copy of check value */
  this.total = 0;             /* protected copy of output count */
  // TODO: may be {}
  this.head = null;           /* where to save gzip header information */

  /* sliding window */
  this.wbits = 0;             /* log base 2 of requested window size */
  this.wsize = 0;             /* window size or zero if not using window */
  this.whave = 0;             /* valid bytes in the window */
  this.wnext = 0;             /* window write index */
  this.window = null;         /* allocated sliding window, if needed */

  /* bit accumulator */
  this.hold = 0;              /* input bit accumulator */
  this.bits = 0;              /* number of bits in "in" */

  /* for string and stored block copying */
  this.length = 0;            /* literal or length of data to copy */
  this.offset = 0;            /* distance back to copy string from */

  /* for table and code decoding */
  this.extra = 0;             /* extra bits needed */

  /* fixed and dynamic code tables */
  this.lencode = null;          /* starting table for length/literal codes */
  this.distcode = null;         /* starting table for distance codes */
  this.lenbits = 0;           /* index bits for lencode */
  this.distbits = 0;          /* index bits for distcode */

  /* dynamic table building */
  this.ncode = 0;             /* number of code length code lengths */
  this.nlen = 0;              /* number of length code lengths */
  this.ndist = 0;             /* number of distance code lengths */
  this.have = 0;              /* number of code lengths in lens[] */
  this.next = null;              /* next available space in codes[] */

  this.lens = new utils.Buf16(320); /* temporary storage for code lengths */
  this.work = new utils.Buf16(288); /* work area for code table building */

  /*
   because we don't have pointers in js, we use lencode and distcode directly
   as buffers so we don't need codes
  */
  //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */
  this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */
  this.distdyn = null;             /* dynamic table for distance codes (JS specific) */
  this.sane = 0;                   /* if false, allow invalid distance too far */
  this.back = 0;                   /* bits back of last unprocessed length/lit */
  this.was = 0;                    /* initial length of match */
}

function inflateResetKeep(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = ''; /*Z_NULL*/
  if (state.wrap) {       /* to support ill-conceived Java test suite */
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.dmax = 32768;
  state.head = null/*Z_NULL*/;
  state.hold = 0;
  state.bits = 0;
  //state.lencode = state.distcode = state.next = state.codes;
  state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
  state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);

  state.sane = 1;
  state.back = -1;
  //Tracev((stderr, "inflate: reset\n"));
  return Z_OK;
}

function inflateReset(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);

}

function inflateReset2(strm, windowBits) {
  var wrap;
  var state;

  /* get the state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;

  /* extract wrap request from windowBits parameter */
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  }
  else {
    wrap = (windowBits >> 4) + 1;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }

  /* set number of window bits, free window if different */
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }

  /* update state and reset the rest of it */
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
}

function inflateInit2(strm, windowBits) {
  var ret;
  var state;

  if (!strm) { return Z_STREAM_ERROR; }
  //strm.msg = Z_NULL;                 /* in case we return an error */

  state = new InflateState();

  //if (state === Z_NULL) return Z_MEM_ERROR;
  //Tracev((stderr, "inflate: allocated\n"));
  strm.state = state;
  state.window = null/*Z_NULL*/;
  ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK) {
    strm.state = null/*Z_NULL*/;
  }
  return ret;
}

function inflateInit(strm) {
  return inflateInit2(strm, DEF_WBITS);
}


/*
 Return state with length and distance decoding tables and index sizes set to
 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
 If BUILDFIXED is defined, then instead this routine builds the tables the
 first time it's called, and returns those tables the first time and
 thereafter.  This reduces the size of the code by about 2K bytes, in
 exchange for a little execution time.  However, BUILDFIXED should not be
 used for threaded applications, since the rewriting of the tables and virgin
 may not be thread-safe.
 */
var virgin = true;

var lenfix, distfix; // We have no pointers in JS, so keep tables separate

function fixedtables(state) {
  /* build fixed huffman tables if first call (may not be thread safe) */
  if (virgin) {
    var sym;

    lenfix = new utils.Buf32(512);
    distfix = new utils.Buf32(32);

    /* literal/length table */
    sym = 0;
    while (sym < 144) { state.lens[sym++] = 8; }
    while (sym < 256) { state.lens[sym++] = 9; }
    while (sym < 280) { state.lens[sym++] = 7; }
    while (sym < 288) { state.lens[sym++] = 8; }

    inflate_table(LENS,  state.lens, 0, 288, lenfix,   0, state.work, {bits: 9});

    /* distance table */
    sym = 0;
    while (sym < 32) { state.lens[sym++] = 5; }

    inflate_table(DISTS, state.lens, 0, 32,   distfix, 0, state.work, {bits: 5});

    /* do this just once */
    virgin = false;
  }

  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
}


/*
 Update the window with the last wsize (normally 32K) bytes written before
 returning.  If window does not exist yet, create it.  This is only called
 when a window is already in use, or when output has been written during this
 inflate call, but the end of the deflate stream has not been reached yet.
 It is also called to create a window for dictionary data when a dictionary
 is loaded.

 Providing output buffers larger than 32K to inflate() should provide a speed
 advantage, since only the last 32K of output is copied to the sliding window
 upon return from inflate(), and since all distances after the first 32K of
 output will fall in the output data, making match copies simpler and faster.
 The advantage may be dependent on the size of the processor's data caches.
 */
function updatewindow(strm, src, end, copy) {
  var dist;
  var state = strm.state;

  /* if it hasn't been done already, allocate space for the window */
  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;

    state.window = new utils.Buf8(state.wsize);
  }

  /* copy state->wsize or less output bytes into the circular window */
  if (copy >= state.wsize) {
    utils.arraySet(state.window,src, end - state.wsize, state.wsize, 0);
    state.wnext = 0;
    state.whave = state.wsize;
  }
  else {
    dist = state.wsize - state.wnext;
    if (dist > copy) {
      dist = copy;
    }
    //zmemcpy(state->window + state->wnext, end - copy, dist);
    utils.arraySet(state.window,src, end - copy, dist, state.wnext);
    copy -= dist;
    if (copy) {
      //zmemcpy(state->window, end - copy, copy);
      utils.arraySet(state.window,src, end - copy, copy, 0);
      state.wnext = copy;
      state.whave = state.wsize;
    }
    else {
      state.wnext += dist;
      if (state.wnext === state.wsize) { state.wnext = 0; }
      if (state.whave < state.wsize) { state.whave += dist; }
    }
  }
  return 0;
}

function inflate(strm, flush) {
  var state;
  var input, output;          // input/output buffers
  var next;                   /* next input INDEX */
  var put;                    /* next output INDEX */
  var have, left;             /* available input and output */
  var hold;                   /* bit buffer */
  var bits;                   /* bits in bit buffer */
  var _in, _out;              /* save starting available input and output */
  var copy;                   /* number of stored or match bytes to copy */
  var from;                   /* where to copy match bytes from */
  var from_source;
  var here = 0;               /* current decoding table entry */
  var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
  //var last;                   /* parent table entry */
  var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
  var len;                    /* length to copy for repeats, bits to drop */
  var ret;                    /* return code */
  var hbuf = new utils.Buf8(4);    /* buffer for gzip header crc calculation */
  var opts;

  var n; // temporary var for NEED_BITS

  var order = /* permutation of code lengths */
    [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];


  if (!strm || !strm.state || !strm.output ||
      (!strm.input && strm.avail_in !== 0)) {
    return Z_STREAM_ERROR;
  }

  state = strm.state;
  if (state.mode === TYPE) { state.mode = TYPEDO; }    /* skip check */


  //--- LOAD() ---
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  //---

  _in = have;
  _out = left;
  ret = Z_OK;

  inf_leave: // goto emulation
  for (;;) {
    switch (state.mode) {
    case HEAD:
      if (state.wrap === 0) {
        state.mode = TYPEDO;
        break;
      }
      //=== NEEDBITS(16);
      while (bits < 16) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */
        state.check = 0/*crc32(0L, Z_NULL, 0)*/;
        //=== CRC2(state.check, hold);
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        state.check = crc32(state.check, hbuf, 2, 0);
        //===//

        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = FLAGS;
        break;
      }
      state.flags = 0;           /* expect zlib header */
      if (state.head) {
        state.head.done = false;
      }
      if (!(state.wrap & 1) ||   /* check if zlib header allowed */
        (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
        strm.msg = 'incorrect header check';
        state.mode = BAD;
        break;
      }
      if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED) {
        strm.msg = 'unknown compression method';
        state.mode = BAD;
        break;
      }
      //--- DROPBITS(4) ---//
      hold >>>= 4;
      bits -= 4;
      //---//
      len = (hold & 0x0f)/*BITS(4)*/ + 8;
      if (state.wbits === 0) {
        state.wbits = len;
      }
      else if (len > state.wbits) {
        strm.msg = 'invalid window size';
        state.mode = BAD;
        break;
      }
      state.dmax = 1 << len;
      //Tracev((stderr, "inflate:   zlib header ok\n"));
      strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
      state.mode = hold & 0x200 ? DICTID : TYPE;
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      break;
    case FLAGS:
      //=== NEEDBITS(16); */
      while (bits < 16) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      state.flags = hold;
      if ((state.flags & 0xff) !== Z_DEFLATED) {
        strm.msg = 'unknown compression method';
        state.mode = BAD;
        break;
      }
      if (state.flags & 0xe000) {
        strm.msg = 'unknown header flags set';
        state.mode = BAD;
        break;
      }
      if (state.head) {
        state.head.text = ((hold >> 8) & 1);
      }
      if (state.flags & 0x0200) {
        //=== CRC2(state.check, hold);
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        state.check = crc32(state.check, hbuf, 2, 0);
        //===//
      }
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = TIME;
      /* falls through */
    case TIME:
      //=== NEEDBITS(32); */
      while (bits < 32) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if (state.head) {
        state.head.time = hold;
      }
      if (state.flags & 0x0200) {
        //=== CRC4(state.check, hold)
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        hbuf[2] = (hold >>> 16) & 0xff;
        hbuf[3] = (hold >>> 24) & 0xff;
        state.check = crc32(state.check, hbuf, 4, 0);
        //===
      }
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = OS;
      /* falls through */
    case OS:
      //=== NEEDBITS(16); */
      while (bits < 16) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if (state.head) {
        state.head.xflags = (hold & 0xff);
        state.head.os = (hold >> 8);
      }
      if (state.flags & 0x0200) {
        //=== CRC2(state.check, hold);
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        state.check = crc32(state.check, hbuf, 2, 0);
        //===//
      }
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = EXLEN;
      /* falls through */
    case EXLEN:
      if (state.flags & 0x0400) {
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.length = hold;
        if (state.head) {
          state.head.extra_len = hold;
        }
        if (state.flags & 0x0200) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
      }
      else if (state.head) {
        state.head.extra = null/*Z_NULL*/;
      }
      state.mode = EXTRA;
      /* falls through */
    case EXTRA:
      if (state.flags & 0x0400) {
        copy = state.length;
        if (copy > have) { copy = have; }
        if (copy) {
          if (state.head) {
            len = state.head.extra_len - state.length;
            if (!state.head.extra) {
              // Use untyped array for more conveniend processing later
              state.head.extra = new Array(state.head.extra_len);
            }
            utils.arraySet(
              state.head.extra,
              input,
              next,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              copy,
              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
              len
            );
            //zmemcpy(state.head.extra + len, next,
            //        len + copy > state.head.extra_max ?
            //        state.head.extra_max - len : copy);
          }
          if (state.flags & 0x0200) {
            state.check = crc32(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          state.length -= copy;
        }
        if (state.length) { break inf_leave; }
      }
      state.length = 0;
      state.mode = NAME;
      /* falls through */
    case NAME:
      if (state.flags & 0x0800) {
        if (have === 0) { break inf_leave; }
        copy = 0;
        do {
          // TODO: 2 or 1 bytes?
          len = input[next + copy++];
          /* use constant limit because in js we should not preallocate memory */
          if (state.head && len &&
              (state.length < 65536 /*state.head.name_max*/)) {
            state.head.name += String.fromCharCode(len);
          }
        } while (len && copy < have);

        if (state.flags & 0x0200) {
          state.check = crc32(state.check, input, copy, next);
        }
        have -= copy;
        next += copy;
        if (len) { break inf_leave; }
      }
      else if (state.head) {
        state.head.name = null;
      }
      state.length = 0;
      state.mode = COMMENT;
      /* falls through */
    case COMMENT:
      if (state.flags & 0x1000) {
        if (have === 0) { break inf_leave; }
        copy = 0;
        do {
          len = input[next + copy++];
          /* use constant limit because in js we should not preallocate memory */
          if (state.head && len &&
              (state.length < 65536 /*state.head.comm_max*/)) {
            state.head.comment += String.fromCharCode(len);
          }
        } while (len && copy < have);
        if (state.flags & 0x0200) {
          state.check = crc32(state.check, input, copy, next);
        }
        have -= copy;
        next += copy;
        if (len) { break inf_leave; }
      }
      else if (state.head) {
        state.head.comment = null;
      }
      state.mode = HCRC;
      /* falls through */
    case HCRC:
      if (state.flags & 0x0200) {
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (hold !== (state.check & 0xffff)) {
          strm.msg = 'header crc mismatch';
          state.mode = BAD;
          break;
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
      }
      if (state.head) {
        state.head.hcrc = ((state.flags >> 9) & 1);
        state.head.done = true;
      }
      strm.adler = state.check = 0 /*crc32(0L, Z_NULL, 0)*/;
      state.mode = TYPE;
      break;
    case DICTID:
      //=== NEEDBITS(32); */
      while (bits < 32) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      strm.adler = state.check = ZSWAP32(hold);
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = DICT;
      /* falls through */
    case DICT:
      if (state.havedict === 0) {
        //--- RESTORE() ---
        strm.next_out = put;
        strm.avail_out = left;
        strm.next_in = next;
        strm.avail_in = have;
        state.hold = hold;
        state.bits = bits;
        //---
        return Z_NEED_DICT;
      }
      strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
      state.mode = TYPE;
      /* falls through */
    case TYPE:
      if (flush === Z_BLOCK || flush === Z_TREES) { break inf_leave; }
      /* falls through */
    case TYPEDO:
      if (state.last) {
        //--- BYTEBITS() ---//
        hold >>>= bits & 7;
        bits -= bits & 7;
        //---//
        state.mode = CHECK;
        break;
      }
      //=== NEEDBITS(3); */
      while (bits < 3) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      state.last = (hold & 0x01)/*BITS(1)*/;
      //--- DROPBITS(1) ---//
      hold >>>= 1;
      bits -= 1;
      //---//

      switch ((hold & 0x03)/*BITS(2)*/) {
      case 0:                             /* stored block */
        //Tracev((stderr, "inflate:     stored block%s\n",
        //        state.last ? " (last)" : ""));
        state.mode = STORED;
        break;
      case 1:                             /* fixed block */
        fixedtables(state);
        //Tracev((stderr, "inflate:     fixed codes block%s\n",
        //        state.last ? " (last)" : ""));
        state.mode = LEN_;             /* decode codes */
        if (flush === Z_TREES) {
          //--- DROPBITS(2) ---//
          hold >>>= 2;
          bits -= 2;
          //---//
          break inf_leave;
        }
        break;
      case 2:                             /* dynamic block */
        //Tracev((stderr, "inflate:     dynamic codes block%s\n",
        //        state.last ? " (last)" : ""));
        state.mode = TABLE;
        break;
      case 3:
        strm.msg = 'invalid block type';
        state.mode = BAD;
      }
      //--- DROPBITS(2) ---//
      hold >>>= 2;
      bits -= 2;
      //---//
      break;
    case STORED:
      //--- BYTEBITS() ---// /* go to byte boundary */
      hold >>>= bits & 7;
      bits -= bits & 7;
      //---//
      //=== NEEDBITS(32); */
      while (bits < 32) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
        strm.msg = 'invalid stored block lengths';
        state.mode = BAD;
        break;
      }
      state.length = hold & 0xffff;
      //Tracev((stderr, "inflate:       stored length %u\n",
      //        state.length));
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = COPY_;
      if (flush === Z_TREES) { break inf_leave; }
      /* falls through */
    case COPY_:
      state.mode = COPY;
      /* falls through */
    case COPY:
      copy = state.length;
      if (copy) {
        if (copy > have) { copy = have; }
        if (copy > left) { copy = left; }
        if (copy === 0) { break inf_leave; }
        //--- zmemcpy(put, next, copy); ---
        utils.arraySet(output, input, next, copy, put);
        //---//
        have -= copy;
        next += copy;
        left -= copy;
        put += copy;
        state.length -= copy;
        break;
      }
      //Tracev((stderr, "inflate:       stored end\n"));
      state.mode = TYPE;
      break;
    case TABLE:
      //=== NEEDBITS(14); */
      while (bits < 14) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;
      //--- DROPBITS(5) ---//
      hold >>>= 5;
      bits -= 5;
      //---//
      state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;
      //--- DROPBITS(5) ---//
      hold >>>= 5;
      bits -= 5;
      //---//
      state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;
      //--- DROPBITS(4) ---//
      hold >>>= 4;
      bits -= 4;
      //---//
//#ifndef PKZIP_BUG_WORKAROUND
      if (state.nlen > 286 || state.ndist > 30) {
        strm.msg = 'too many length or distance symbols';
        state.mode = BAD;
        break;
      }
//#endif
      //Tracev((stderr, "inflate:       table sizes ok\n"));
      state.have = 0;
      state.mode = LENLENS;
      /* falls through */
    case LENLENS:
      while (state.have < state.ncode) {
        //=== NEEDBITS(3);
        while (bits < 3) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);
        //--- DROPBITS(3) ---//
        hold >>>= 3;
        bits -= 3;
        //---//
      }
      while (state.have < 19) {
        state.lens[order[state.have++]] = 0;
      }
      // We have separate tables & no pointers. 2 commented lines below not needed.
      //state.next = state.codes;
      //state.lencode = state.next;
      // Switch to use dynamic table
      state.lencode = state.lendyn;
      state.lenbits = 7;

      opts = {bits: state.lenbits};
      ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
      state.lenbits = opts.bits;

      if (ret) {
        strm.msg = 'invalid code lengths set';
        state.mode = BAD;
        break;
      }
      //Tracev((stderr, "inflate:       code lengths ok\n"));
      state.have = 0;
      state.mode = CODELENS;
      /* falls through */
    case CODELENS:
      while (state.have < state.nlen + state.ndist) {
        for (;;) {
          here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if (here_val < 16) {
          //--- DROPBITS(here.bits) ---//
          hold >>>= here_bits;
          bits -= here_bits;
          //---//
          state.lens[state.have++] = here_val;
        }
        else {
          if (here_val === 16) {
            //=== NEEDBITS(here.bits + 2);
            n = here_bits + 2;
            while (bits < n) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            if (state.have === 0) {
              strm.msg = 'invalid bit length repeat';
              state.mode = BAD;
              break;
            }
            len = state.lens[state.have - 1];
            copy = 3 + (hold & 0x03);//BITS(2);
            //--- DROPBITS(2) ---//
            hold >>>= 2;
            bits -= 2;
            //---//
          }
          else if (here_val === 17) {
            //=== NEEDBITS(here.bits + 3);
            n = here_bits + 3;
            while (bits < n) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            len = 0;
            copy = 3 + (hold & 0x07);//BITS(3);
            //--- DROPBITS(3) ---//
            hold >>>= 3;
            bits -= 3;
            //---//
          }
          else {
            //=== NEEDBITS(here.bits + 7);
            n = here_bits + 7;
            while (bits < n) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            len = 0;
            copy = 11 + (hold & 0x7f);//BITS(7);
            //--- DROPBITS(7) ---//
            hold >>>= 7;
            bits -= 7;
            //---//
          }
          if (state.have + copy > state.nlen + state.ndist) {
            strm.msg = 'invalid bit length repeat';
            state.mode = BAD;
            break;
          }
          while (copy--) {
            state.lens[state.have++] = len;
          }
        }
      }

      /* handle error breaks in while */
      if (state.mode === BAD) { break; }

      /* check for end-of-block code (better have one) */
      if (state.lens[256] === 0) {
        strm.msg = 'invalid code -- missing end-of-block';
        state.mode = BAD;
        break;
      }

      /* build code tables -- note: do not change the lenbits or distbits
         values here (9 and 6) without reading the comments in inftrees.h
         concerning the ENOUGH constants, which depend on those values */
      state.lenbits = 9;

      opts = {bits: state.lenbits};
      ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
      // We have separate tables & no pointers. 2 commented lines below not needed.
      // state.next_index = opts.table_index;
      state.lenbits = opts.bits;
      // state.lencode = state.next;

      if (ret) {
        strm.msg = 'invalid literal/lengths set';
        state.mode = BAD;
        break;
      }

      state.distbits = 6;
      //state.distcode.copy(state.codes);
      // Switch to use dynamic table
      state.distcode = state.distdyn;
      opts = {bits: state.distbits};
      ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
      // We have separate tables & no pointers. 2 commented lines below not needed.
      // state.next_index = opts.table_index;
      state.distbits = opts.bits;
      // state.distcode = state.next;

      if (ret) {
        strm.msg = 'invalid distances set';
        state.mode = BAD;
        break;
      }
      //Tracev((stderr, 'inflate:       codes ok\n'));
      state.mode = LEN_;
      if (flush === Z_TREES) { break inf_leave; }
      /* falls through */
    case LEN_:
      state.mode = LEN;
      /* falls through */
    case LEN:
      if (have >= 6 && left >= 258) {
        //--- RESTORE() ---
        strm.next_out = put;
        strm.avail_out = left;
        strm.next_in = next;
        strm.avail_in = have;
        state.hold = hold;
        state.bits = bits;
        //---
        inflate_fast(strm, _out);
        //--- LOAD() ---
        put = strm.next_out;
        output = strm.output;
        left = strm.avail_out;
        next = strm.next_in;
        input = strm.input;
        have = strm.avail_in;
        hold = state.hold;
        bits = state.bits;
        //---

        if (state.mode === TYPE) {
          state.back = -1;
        }
        break;
      }
      state.back = 0;
      for (;;) {
        here = state.lencode[hold & ((1 << state.lenbits) -1)];  /*BITS(state.lenbits)*/
        here_bits = here >>> 24;
        here_op = (here >>> 16) & 0xff;
        here_val = here & 0xffff;

        if (here_bits <= bits) { break; }
        //--- PULLBYTE() ---//
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
        //---//
      }
      if (here_op && (here_op & 0xf0) === 0) {
        last_bits = here_bits;
        last_op = here_op;
        last_val = here_val;
        for (;;) {
          here = state.lencode[last_val +
                  ((hold & ((1 << (last_bits + last_op)) -1))/*BITS(last.bits + last.op)*/ >> last_bits)];
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((last_bits + here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        //--- DROPBITS(last.bits) ---//
        hold >>>= last_bits;
        bits -= last_bits;
        //---//
        state.back += last_bits;
      }
      //--- DROPBITS(here.bits) ---//
      hold >>>= here_bits;
      bits -= here_bits;
      //---//
      state.back += here_bits;
      state.length = here_val;
      if (here_op === 0) {
        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
        //        "inflate:         literal '%c'\n" :
        //        "inflate:         literal 0x%02x\n", here.val));
        state.mode = LIT;
        break;
      }
      if (here_op & 32) {
        //Tracevv((stderr, "inflate:         end of block\n"));
        state.back = -1;
        state.mode = TYPE;
        break;
      }
      if (here_op & 64) {
        strm.msg = 'invalid literal/length code';
        state.mode = BAD;
        break;
      }
      state.extra = here_op & 15;
      state.mode = LENEXT;
      /* falls through */
    case LENEXT:
      if (state.extra) {
        //=== NEEDBITS(state.extra);
        n = state.extra;
        while (bits < n) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.length += hold & ((1 << state.extra) -1)/*BITS(state.extra)*/;
        //--- DROPBITS(state.extra) ---//
        hold >>>= state.extra;
        bits -= state.extra;
        //---//
        state.back += state.extra;
      }
      //Tracevv((stderr, "inflate:         length %u\n", state.length));
      state.was = state.length;
      state.mode = DIST;
      /* falls through */
    case DIST:
      for (;;) {
        here = state.distcode[hold & ((1 << state.distbits) -1)];/*BITS(state.distbits)*/
        here_bits = here >>> 24;
        here_op = (here >>> 16) & 0xff;
        here_val = here & 0xffff;

        if ((here_bits) <= bits) { break; }
        //--- PULLBYTE() ---//
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
        //---//
      }
      if ((here_op & 0xf0) === 0) {
        last_bits = here_bits;
        last_op = here_op;
        last_val = here_val;
        for (;;) {
          here = state.distcode[last_val +
                  ((hold & ((1 << (last_bits + last_op)) -1))/*BITS(last.bits + last.op)*/ >> last_bits)];
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((last_bits + here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        //--- DROPBITS(last.bits) ---//
        hold >>>= last_bits;
        bits -= last_bits;
        //---//
        state.back += last_bits;
      }
      //--- DROPBITS(here.bits) ---//
      hold >>>= here_bits;
      bits -= here_bits;
      //---//
      state.back += here_bits;
      if (here_op & 64) {
        strm.msg = 'invalid distance code';
        state.mode = BAD;
        break;
      }
      state.offset = here_val;
      state.extra = (here_op) & 15;
      state.mode = DISTEXT;
      /* falls through */
    case DISTEXT:
      if (state.extra) {
        //=== NEEDBITS(state.extra);
        n = state.extra;
        while (bits < n) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.offset += hold & ((1 << state.extra) -1)/*BITS(state.extra)*/;
        //--- DROPBITS(state.extra) ---//
        hold >>>= state.extra;
        bits -= state.extra;
        //---//
        state.back += state.extra;
      }
//#ifdef INFLATE_STRICT
      if (state.offset > state.dmax) {
        strm.msg = 'invalid distance too far back';
        state.mode = BAD;
        break;
      }
//#endif
      //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
      state.mode = MATCH;
      /* falls through */
    case MATCH:
      if (left === 0) { break inf_leave; }
      copy = _out - left;
      if (state.offset > copy) {         /* copy from window */
        copy = state.offset - copy;
        if (copy > state.whave) {
          if (state.sane) {
            strm.msg = 'invalid distance too far back';
            state.mode = BAD;
            break;
          }
// (!) This block is disabled in zlib defailts,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//          Trace((stderr, "inflate.c too far\n"));
//          copy -= state.whave;
//          if (copy > state.length) { copy = state.length; }
//          if (copy > left) { copy = left; }
//          left -= copy;
//          state.length -= copy;
//          do {
//            output[put++] = 0;
//          } while (--copy);
//          if (state.length === 0) { state.mode = LEN; }
//          break;
//#endif
        }
        if (copy > state.wnext) {
          copy -= state.wnext;
          from = state.wsize - copy;
        }
        else {
          from = state.wnext - copy;
        }
        if (copy > state.length) { copy = state.length; }
        from_source = state.window;
      }
      else {                              /* copy from output */
        from_source = output;
        from = put - state.offset;
        copy = state.length;
      }
      if (copy > left) { copy = left; }
      left -= copy;
      state.length -= copy;
      do {
        output[put++] = from_source[from++];
      } while (--copy);
      if (state.length === 0) { state.mode = LEN; }
      break;
    case LIT:
      if (left === 0) { break inf_leave; }
      output[put++] = state.length;
      left--;
      state.mode = LEN;
      break;
    case CHECK:
      if (state.wrap) {
        //=== NEEDBITS(32);
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          // Use '|' insdead of '+' to make sure that result is signed
          hold |= input[next++] << bits;
          bits += 8;
        }
        //===//
        _out -= left;
        strm.total_out += _out;
        state.total += _out;
        if (_out) {
          strm.adler = state.check =
              /*UPDATE(state.check, put - _out, _out);*/
              (state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));

        }
        _out = left;
        // NB: crc32 stored as signed 32-bit int, ZSWAP32 returns signed too
        if ((state.flags ? hold : ZSWAP32(hold)) !== state.check) {
          strm.msg = 'incorrect data check';
          state.mode = BAD;
          break;
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        //Tracev((stderr, "inflate:   check matches trailer\n"));
      }
      state.mode = LENGTH;
      /* falls through */
    case LENGTH:
      if (state.wrap && state.flags) {
        //=== NEEDBITS(32);
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (hold !== (state.total & 0xffffffff)) {
          strm.msg = 'incorrect length check';
          state.mode = BAD;
          break;
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        //Tracev((stderr, "inflate:   length matches trailer\n"));
      }
      state.mode = DONE;
      /* falls through */
    case DONE:
      ret = Z_STREAM_END;
      break inf_leave;
    case BAD:
      ret = Z_DATA_ERROR;
      break inf_leave;
    case MEM:
      return Z_MEM_ERROR;
    case SYNC:
      /* falls through */
    default:
      return Z_STREAM_ERROR;
    }
  }

  // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

  /*
     Return from inflate(), updating the total counts and the check value.
     If there was no progress during the inflate() call, return a buffer
     error.  Call updatewindow() to create and/or update the window state.
     Note: a memory error from inflate() is non-recoverable.
   */

  //--- RESTORE() ---
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  //---

  if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&
                      (state.mode < CHECK || flush !== Z_FINISH))) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
      state.mode = MEM;
      return Z_MEM_ERROR;
    }
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if (state.wrap && _out) {
    strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
      (state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) +
                    (state.mode === TYPE ? 128 : 0) +
                    (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if (((_in === 0 && _out === 0) || flush === Z_FINISH) && ret === Z_OK) {
    ret = Z_BUF_ERROR;
  }
  return ret;
}

function inflateEnd(strm) {

  if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
    return Z_STREAM_ERROR;
  }

  var state = strm.state;
  if (state.window) {
    state.window = null;
  }
  strm.state = null;
  return Z_OK;
}

function inflateGetHeader(strm, head) {
  var state;

  /* check state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR; }

  /* save header structure */
  state.head = head;
  head.done = false;
  return Z_OK;
}


exports.inflateReset = inflateReset;
exports.inflateReset2 = inflateReset2;
exports.inflateResetKeep = inflateResetKeep;
exports.inflateInit = inflateInit;
exports.inflateInit2 = inflateInit2;
exports.inflate = inflate;
exports.inflateEnd = inflateEnd;
exports.inflateGetHeader = inflateGetHeader;
exports.inflateInfo = 'pako inflate (from Nodeca project)';

/* Not implemented
exports.inflateCopy = inflateCopy;
exports.inflateGetDictionary = inflateGetDictionary;
exports.inflateMark = inflateMark;
exports.inflatePrime = inflatePrime;
exports.inflateSetDictionary = inflateSetDictionary;
exports.inflateSync = inflateSync;
exports.inflateSyncPoint = inflateSyncPoint;
exports.inflateUndermine = inflateUndermine;
*/

},{"../utils/common":213,"./adler32":215,"./crc32":217,"./inffast":220,"./inftrees":222}],222:[function(require,module,exports){
'use strict';


var utils = require('../utils/common');

var MAXBITS = 15;
var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

var CODES = 0;
var LENS = 1;
var DISTS = 2;

var lbase = [ /* Length codes 257..285 base */
  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
  35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
];

var lext = [ /* Length codes 257..285 extra */
  16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
  19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
];

var dbase = [ /* Distance codes 0..29 base */
  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
  257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
  8193, 12289, 16385, 24577, 0, 0
];

var dext = [ /* Distance codes 0..29 extra */
  16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
  23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
  28, 28, 29, 29, 64, 64
];

module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts)
{
  var bits = opts.bits;
      //here = opts.here; /* table entry for duplication */

  var len = 0;               /* a code's length in bits */
  var sym = 0;               /* index of code symbols */
  var min = 0, max = 0;          /* minimum and maximum code lengths */
  var root = 0;              /* number of index bits for root table */
  var curr = 0;              /* number of index bits for current table */
  var drop = 0;              /* code bits to drop for sub-table */
  var left = 0;                   /* number of prefix codes available */
  var used = 0;              /* code entries in table used */
  var huff = 0;              /* Huffman code */
  var incr;              /* for incrementing code, index */
  var fill;              /* index for replicating entries */
  var low;               /* low bits for current root entry */
  var mask;              /* mask for low root bits */
  var next;             /* next available space in table */
  var base = null;     /* base value table to use */
  var base_index = 0;
//  var shoextra;    /* extra bits table to use */
  var end;                    /* use base and extra for symbol > end */
  var count = new utils.Buf16(MAXBITS+1); //[MAXBITS+1];    /* number of codes of each length */
  var offs = new utils.Buf16(MAXBITS+1); //[MAXBITS+1];     /* offsets in table for each length */
  var extra = null;
  var extra_index = 0;

  var here_bits, here_op, here_val;

  /*
   Process a set of code lengths to create a canonical Huffman code.  The
   code lengths are lens[0..codes-1].  Each length corresponds to the
   symbols 0..codes-1.  The Huffman code is generated by first sorting the
   symbols by length from short to long, and retaining the symbol order
   for codes with equal lengths.  Then the code starts with all zero bits
   for the first code of the shortest length, and the codes are integer
   increments for the same length, and zeros are appended as the length
   increases.  For the deflate format, these bits are stored backwards
   from their more natural integer increment ordering, and so when the
   decoding tables are built in the large loop below, the integer codes
   are incremented backwards.

   This routine assumes, but does not check, that all of the entries in
   lens[] are in the range 0..MAXBITS.  The caller must assure this.
   1..MAXBITS is interpreted as that code length.  zero means that that
   symbol does not occur in this code.

   The codes are sorted by computing a count of codes for each length,
   creating from that a table of starting indices for each length in the
   sorted table, and then entering the symbols in order in the sorted
   table.  The sorted table is work[], with that space being provided by
   the caller.

   The length counts are used for other purposes as well, i.e. finding
   the minimum and maximum length codes, determining if there are any
   codes at all, checking for a valid set of lengths, and looking ahead
   at length counts to determine sub-table sizes when building the
   decoding tables.
   */

  /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
  for (len = 0; len <= MAXBITS; len++) {
    count[len] = 0;
  }
  for (sym = 0; sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }

  /* bound code lengths, force root to be within code lengths */
  root = bits;
  for (max = MAXBITS; max >= 1; max--) {
    if (count[max] !== 0) { break; }
  }
  if (root > max) {
    root = max;
  }
  if (max === 0) {                     /* no symbols to code at all */
    //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
    //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
    //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;


    //table.op[opts.table_index] = 64;
    //table.bits[opts.table_index] = 1;
    //table.val[opts.table_index++] = 0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;

    opts.bits = 1;
    return 0;     /* no symbols, but wait for decoding to report error */
  }
  for (min = 1; min < max; min++) {
    if (count[min] !== 0) { break; }
  }
  if (root < min) {
    root = min;
  }

  /* check for an over-subscribed or incomplete set of lengths */
  left = 1;
  for (len = 1; len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];
    if (left < 0) {
      return -1;
    }        /* over-subscribed */
  }
  if (left > 0 && (type === CODES || max !== 1)) {
    return -1;                      /* incomplete set */
  }

  /* generate offsets into symbol table for each length for sorting */
  offs[1] = 0;
  for (len = 1; len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }

  /* sort symbols by length, by symbol order within each length */
  for (sym = 0; sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }

  /*
   Create and fill in decoding tables.  In this loop, the table being
   filled is at next and has curr index bits.  The code being used is huff
   with length len.  That code is converted to an index by dropping drop
   bits off of the bottom.  For codes where len is less than drop + curr,
   those top drop + curr - len bits are incremented through all values to
   fill the table with replicated entries.

   root is the number of index bits for the root table.  When len exceeds
   root, sub-tables are created pointed to by the root entry with an index
   of the low root bits of huff.  This is saved in low to check for when a
   new sub-table should be started.  drop is zero when the root table is
   being filled, and drop is root when sub-tables are being filled.

   When a new sub-table is needed, it is necessary to look ahead in the
   code lengths to determine what size sub-table is needed.  The length
   counts are used for this, and so count[] is decremented as codes are
   entered in the tables.

   used keeps track of how many table entries have been allocated from the
   provided *table space.  It is checked for LENS and DIST tables against
   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
   the initial root table size constants.  See the comments in inftrees.h
   for more information.

   sym increments through all symbols, and the loop terminates when
   all codes of length max, i.e. all codes, have been processed.  This
   routine permits incomplete codes, so another loop after this one fills
   in the rest of the decoding tables with invalid code markers.
   */

  /* set up for code type */
  // poor man optimization - use if-else instead of switch,
  // to avoid deopts in old v8
  if (type === CODES) {
    base = extra = work;    /* dummy value--not used */
    end = 19;

  } else if (type === LENS) {
    base = lbase;
    base_index -= 257;
    extra = lext;
    extra_index -= 257;
    end = 256;

  } else {                    /* DISTS */
    base = dbase;
    extra = dext;
    end = -1;
  }

  /* initialize opts for loop */
  huff = 0;                   /* starting code */
  sym = 0;                    /* starting code symbol */
  len = min;                  /* starting code length */
  next = table_index;              /* current table to fill in */
  curr = root;                /* current table index bits */
  drop = 0;                   /* current bits to drop from code for index */
  low = -1;                   /* trigger new sub-table when len > root */
  used = 1 << root;          /* use root table entries */
  mask = used - 1;            /* mask for comparing low */

  /* check available table space */
  if ((type === LENS && used > ENOUGH_LENS) ||
    (type === DISTS && used > ENOUGH_DISTS)) {
    return 1;
  }

  var i=0;
  /* process all codes and make table entries */
  for (;;) {
    i++;
    /* create table entry */
    here_bits = len - drop;
    if (work[sym] < end) {
      here_op = 0;
      here_val = work[sym];
    }
    else if (work[sym] > end) {
      here_op = extra[extra_index + work[sym]];
      here_val = base[base_index + work[sym]];
    }
    else {
      here_op = 32 + 64;         /* end of block */
      here_val = 0;
    }

    /* replicate for those indices with low len bits equal to huff */
    incr = 1 << (len - drop);
    fill = 1 << curr;
    min = fill;                 /* save offset to next table */
    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val |0;
    } while (fill !== 0);

    /* backwards increment the len-bit code huff */
    incr = 1 << (len - 1);
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }

    /* go to next symbol, update count, len */
    sym++;
    if (--count[len] === 0) {
      if (len === max) { break; }
      len = lens[lens_index + work[sym]];
    }

    /* create new sub-table if needed */
    if (len > root && (huff & mask) !== low) {
      /* if first time, transition to sub-tables */
      if (drop === 0) {
        drop = root;
      }

      /* increment past last table */
      next += min;            /* here min is 1 << curr */

      /* determine length of next table */
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count[curr + drop];
        if (left <= 0) { break; }
        curr++;
        left <<= 1;
      }

      /* check for enough space */
      used += 1 << curr;
      if ((type === LENS && used > ENOUGH_LENS) ||
        (type === DISTS && used > ENOUGH_DISTS)) {
        return 1;
      }

      /* point entry in root table to sub-table */
      low = huff & mask;
      /*table.op[low] = curr;
      table.bits[low] = root;
      table.val[low] = next - opts.table_index;*/
      table[low] = (root << 24) | (curr << 16) | (next - table_index) |0;
    }
  }

  /* fill in remaining table entry if code is incomplete (guaranteed to have
   at most one remaining entry, since if the code is incomplete, the
   maximum code length that was allowed to get this far is one bit) */
  if (huff !== 0) {
    //table.op[next + huff] = 64;            /* invalid code marker */
    //table.bits[next + huff] = len - drop;
    //table.val[next + huff] = 0;
    table[next + huff] = ((len - drop) << 24) | (64 << 16) |0;
  }

  /* set return parameters */
  //opts.table_index += used;
  opts.bits = root;
  return 0;
};

},{"../utils/common":213}],223:[function(require,module,exports){
'use strict';

module.exports = {
  '2':    'need dictionary',     /* Z_NEED_DICT       2  */
  '1':    'stream end',          /* Z_STREAM_END      1  */
  '0':    '',                    /* Z_OK              0  */
  '-1':   'file error',          /* Z_ERRNO         (-1) */
  '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
  '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
  '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
  '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
  '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
};

},{}],224:[function(require,module,exports){
'use strict';


var utils = require('../utils/common');

/* Public constants ==========================================================*/
/* ===========================================================================*/


//var Z_FILTERED          = 1;
//var Z_HUFFMAN_ONLY      = 2;
//var Z_RLE               = 3;
var Z_FIXED               = 4;
//var Z_DEFAULT_STRATEGY  = 0;

/* Possible values of the data_type field (though see inflate()) */
var Z_BINARY              = 0;
var Z_TEXT                = 1;
//var Z_ASCII             = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;

/*============================================================================*/


function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }

// From zutil.h

var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES    = 2;
/* The three kinds of block type */

var MIN_MATCH    = 3;
var MAX_MATCH    = 258;
/* The minimum and maximum match lengths */

// From deflate.h
/* ===========================================================================
 * Internal compression state.
 */

var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */

var LITERALS      = 256;
/* number of literal bytes 0..255 */

var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */

var D_CODES       = 30;
/* number of distance codes */

var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */

var HEAP_SIZE     = 2*L_CODES + 1;
/* maximum heap size */

var MAX_BITS      = 15;
/* All codes must not exceed MAX_BITS bits */

var Buf_size      = 16;
/* size of bit buffer in bi_buf */


/* ===========================================================================
 * Constants
 */

var MAX_BL_BITS = 7;
/* Bit length codes must not exceed MAX_BL_BITS bits */

var END_BLOCK   = 256;
/* end of block literal code */

var REP_3_6     = 16;
/* repeat previous bit length 3-6 times (2 bits of repeat count) */

var REPZ_3_10   = 17;
/* repeat a zero length 3-10 times  (3 bits of repeat count) */

var REPZ_11_138 = 18;
/* repeat a zero length 11-138 times  (7 bits of repeat count) */

var extra_lbits =   /* extra bits for each length code */
  [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];

var extra_dbits =   /* extra bits for each distance code */
  [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];

var extra_blbits =  /* extra bits for each bit length code */
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];

var bl_order =
  [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
/* The lengths of the bit length codes are sent in order of decreasing
 * probability, to avoid transmitting the lengths for unused bit length codes.
 */

/* ===========================================================================
 * Local data. These are initialized only once.
 */

// We pre-fill arrays with 0 to avoid uninitialized gaps

var DIST_CODE_LEN = 512; /* see definition of array dist_code below */

// !!!! Use flat array insdead of structure, Freq = i*2, Len = i*2+1
var static_ltree  = new Array((L_CODES+2) * 2);
zero(static_ltree);
/* The static literal tree. Since the bit lengths are imposed, there is no
 * need for the L_CODES extra codes used during heap construction. However
 * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
 * below).
 */

var static_dtree  = new Array(D_CODES * 2);
zero(static_dtree);
/* The static distance tree. (Actually a trivial tree since all codes use
 * 5 bits.)
 */

var _dist_code    = new Array(DIST_CODE_LEN);
zero(_dist_code);
/* Distance codes. The first 256 values correspond to the distances
 * 3 .. 258, the last 256 values correspond to the top 8 bits of
 * the 15 bit distances.
 */

var _length_code  = new Array(MAX_MATCH-MIN_MATCH+1);
zero(_length_code);
/* length code for each normalized match length (0 == MIN_MATCH) */

var base_length   = new Array(LENGTH_CODES);
zero(base_length);
/* First normalized length for each code (0 = MIN_MATCH) */

var base_dist     = new Array(D_CODES);
zero(base_dist);
/* First normalized distance for each code (0 = distance of 1) */


var StaticTreeDesc = function (static_tree, extra_bits, extra_base, elems, max_length) {

  this.static_tree  = static_tree;  /* static tree or NULL */
  this.extra_bits   = extra_bits;   /* extra bits for each code or NULL */
  this.extra_base   = extra_base;   /* base index for extra_bits */
  this.elems        = elems;        /* max number of elements in the tree */
  this.max_length   = max_length;   /* max bit length for the codes */

  // show if `static_tree` has data or dummy - needed for monomorphic objects
  this.has_stree    = static_tree && static_tree.length;
};


var static_l_desc;
var static_d_desc;
var static_bl_desc;


var TreeDesc = function(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;     /* the dynamic tree */
  this.max_code = 0;            /* largest code with non zero frequency */
  this.stat_desc = stat_desc;   /* the corresponding static tree */
};



function d_code(dist) {
  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
}


/* ===========================================================================
 * Output a short LSB first on the stream.
 * IN assertion: there is enough room in pendingBuf.
 */
function put_short (s, w) {
//    put_byte(s, (uch)((w) & 0xff));
//    put_byte(s, (uch)((ush)(w) >> 8));
  s.pending_buf[s.pending++] = (w) & 0xff;
  s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
}


/* ===========================================================================
 * Send a value on a given number of bits.
 * IN assertion: length <= 16 and value fits in length bits.
 */
function send_bits(s, value, length) {
  if (s.bi_valid > (Buf_size - length)) {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    put_short(s, s.bi_buf);
    s.bi_buf = value >> (Buf_size - s.bi_valid);
    s.bi_valid += length - Buf_size;
  } else {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    s.bi_valid += length;
  }
}


function send_code(s, c, tree) {
  send_bits(s, tree[c*2]/*.Code*/, tree[c*2 + 1]/*.Len*/);
}


/* ===========================================================================
 * Reverse the first len bits of a code, using straightforward code (a faster
 * method would use a table)
 * IN assertion: 1 <= len <= 15
 */
function bi_reverse(code, len) {
  var res = 0;
  do {
    res |= code & 1;
    code >>>= 1;
    res <<= 1;
  } while (--len > 0);
  return res >>> 1;
}


/* ===========================================================================
 * Flush the bit buffer, keeping at most 7 bits in it.
 */
function bi_flush(s) {
  if (s.bi_valid === 16) {
    put_short(s, s.bi_buf);
    s.bi_buf = 0;
    s.bi_valid = 0;

  } else if (s.bi_valid >= 8) {
    s.pending_buf[s.pending++] = s.bi_buf & 0xff;
    s.bi_buf >>= 8;
    s.bi_valid -= 8;
  }
}


/* ===========================================================================
 * Compute the optimal bit lengths for a tree and update the total bit length
 * for the current block.
 * IN assertion: the fields freq and dad are set, heap[heap_max] and
 *    above are the tree nodes sorted by increasing frequency.
 * OUT assertions: the field len is set to the optimal bit length, the
 *     array bl_count contains the frequencies for each bit length.
 *     The length opt_len is updated; static_len is also updated if stree is
 *     not null.
 */
function gen_bitlen(s, desc)
//    deflate_state *s;
//    tree_desc *desc;    /* the tree descriptor */
{
  var tree            = desc.dyn_tree;
  var max_code        = desc.max_code;
  var stree           = desc.stat_desc.static_tree;
  var has_stree       = desc.stat_desc.has_stree;
  var extra           = desc.stat_desc.extra_bits;
  var base            = desc.stat_desc.extra_base;
  var max_length      = desc.stat_desc.max_length;
  var h;              /* heap index */
  var n, m;           /* iterate over the tree elements */
  var bits;           /* bit length */
  var xbits;          /* extra bits */
  var f;              /* frequency */
  var overflow = 0;   /* number of elements with bit length too large */

  for (bits = 0; bits <= MAX_BITS; bits++) {
    s.bl_count[bits] = 0;
  }

  /* In a first pass, compute the optimal bit lengths (which may
   * overflow in the case of the bit length tree).
   */
  tree[s.heap[s.heap_max]*2 + 1]/*.Len*/ = 0; /* root of the heap */

  for (h = s.heap_max+1; h < HEAP_SIZE; h++) {
    n = s.heap[h];
    bits = tree[tree[n*2 +1]/*.Dad*/ * 2 + 1]/*.Len*/ + 1;
    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }
    tree[n*2 + 1]/*.Len*/ = bits;
    /* We overwrite tree[n].Dad which is no longer needed */

    if (n > max_code) { continue; } /* not a leaf node */

    s.bl_count[bits]++;
    xbits = 0;
    if (n >= base) {
      xbits = extra[n-base];
    }
    f = tree[n * 2]/*.Freq*/;
    s.opt_len += f * (bits + xbits);
    if (has_stree) {
      s.static_len += f * (stree[n*2 + 1]/*.Len*/ + xbits);
    }
  }
  if (overflow === 0) { return; }

  // Trace((stderr,"\nbit length overflow\n"));
  /* This happens for example on obj2 and pic of the Calgary corpus */

  /* Find the first bit length which could increase: */
  do {
    bits = max_length-1;
    while (s.bl_count[bits] === 0) { bits--; }
    s.bl_count[bits]--;      /* move one leaf down the tree */
    s.bl_count[bits+1] += 2; /* move one overflow item as its brother */
    s.bl_count[max_length]--;
    /* The brother of the overflow item also moves one step up,
     * but this does not affect bl_count[max_length]
     */
    overflow -= 2;
  } while (overflow > 0);

  /* Now recompute all bit lengths, scanning in increasing frequency.
   * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
   * lengths instead of fixing only the wrong ones. This idea is taken
   * from 'ar' written by Haruhiko Okumura.)
   */
  for (bits = max_length; bits !== 0; bits--) {
    n = s.bl_count[bits];
    while (n !== 0) {
      m = s.heap[--h];
      if (m > max_code) { continue; }
      if (tree[m*2 + 1]/*.Len*/ !== bits) {
        // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
        s.opt_len += (bits - tree[m*2 + 1]/*.Len*/)*tree[m*2]/*.Freq*/;
        tree[m*2 + 1]/*.Len*/ = bits;
      }
      n--;
    }
  }
}


/* ===========================================================================
 * Generate the codes for a given tree and bit counts (which need not be
 * optimal).
 * IN assertion: the array bl_count contains the bit length statistics for
 * the given tree and the field len is set for all tree elements.
 * OUT assertion: the field code is set for all tree elements of non
 *     zero code length.
 */
function gen_codes(tree, max_code, bl_count)
//    ct_data *tree;             /* the tree to decorate */
//    int max_code;              /* largest code with non zero frequency */
//    ushf *bl_count;            /* number of codes at each bit length */
{
  var next_code = new Array(MAX_BITS+1); /* next code value for each bit length */
  var code = 0;              /* running code value */
  var bits;                  /* bit index */
  var n;                     /* code index */

  /* The distribution counts are first used to generate the code values
   * without bit reversal.
   */
  for (bits = 1; bits <= MAX_BITS; bits++) {
    next_code[bits] = code = (code + bl_count[bits-1]) << 1;
  }
  /* Check that the bit counts in bl_count are consistent. The last code
   * must be all ones.
   */
  //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
  //        "inconsistent bit counts");
  //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

  for (n = 0;  n <= max_code; n++) {
    var len = tree[n*2 + 1]/*.Len*/;
    if (len === 0) { continue; }
    /* Now reverse the bits */
    tree[n*2]/*.Code*/ = bi_reverse(next_code[len]++, len);

    //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
    //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
  }
}


/* ===========================================================================
 * Initialize the various 'constant' tables.
 */
function tr_static_init() {
  var n;        /* iterates over tree elements */
  var bits;     /* bit counter */
  var length;   /* length value */
  var code;     /* code value */
  var dist;     /* distance index */
  var bl_count = new Array(MAX_BITS+1);
  /* number of codes at each bit length for an optimal tree */

  // do check in _tr_init()
  //if (static_init_done) return;

  /* For some embedded targets, global variables are not initialized: */
/*#ifdef NO_INIT_GLOBAL_POINTERS
  static_l_desc.static_tree = static_ltree;
  static_l_desc.extra_bits = extra_lbits;
  static_d_desc.static_tree = static_dtree;
  static_d_desc.extra_bits = extra_dbits;
  static_bl_desc.extra_bits = extra_blbits;
#endif*/

  /* Initialize the mapping length (0..255) -> length code (0..28) */
  length = 0;
  for (code = 0; code < LENGTH_CODES-1; code++) {
    base_length[code] = length;
    for (n = 0; n < (1<<extra_lbits[code]); n++) {
      _length_code[length++] = code;
    }
  }
  //Assert (length == 256, "tr_static_init: length != 256");
  /* Note that the length 255 (match length 258) can be represented
   * in two different ways: code 284 + 5 bits or code 285, so we
   * overwrite length_code[255] to use the best encoding:
   */
  _length_code[length-1] = code;

  /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
  dist = 0;
  for (code = 0 ; code < 16; code++) {
    base_dist[code] = dist;
    for (n = 0; n < (1<<extra_dbits[code]); n++) {
      _dist_code[dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: dist != 256");
  dist >>= 7; /* from now on, all distances are divided by 128 */
  for (; code < D_CODES; code++) {
    base_dist[code] = dist << 7;
    for (n = 0; n < (1<<(extra_dbits[code]-7)); n++) {
      _dist_code[256 + dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: 256+dist != 512");

  /* Construct the codes of the static literal tree */
  for (bits = 0; bits <= MAX_BITS; bits++) {
    bl_count[bits] = 0;
  }

  n = 0;
  while (n <= 143) {
    static_ltree[n*2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  while (n <= 255) {
    static_ltree[n*2 + 1]/*.Len*/ = 9;
    n++;
    bl_count[9]++;
  }
  while (n <= 279) {
    static_ltree[n*2 + 1]/*.Len*/ = 7;
    n++;
    bl_count[7]++;
  }
  while (n <= 287) {
    static_ltree[n*2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  /* Codes 286 and 287 do not exist, but we must include them in the
   * tree construction to get a canonical Huffman tree (longest code
   * all ones)
   */
  gen_codes(static_ltree, L_CODES+1, bl_count);

  /* The static distance tree is trivial: */
  for (n = 0; n < D_CODES; n++) {
    static_dtree[n*2 + 1]/*.Len*/ = 5;
    static_dtree[n*2]/*.Code*/ = bi_reverse(n, 5);
  }

  // Now data ready and we can init static trees
  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS+1, L_CODES, MAX_BITS);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0,          D_CODES, MAX_BITS);
  static_bl_desc =new StaticTreeDesc(new Array(0), extra_blbits, 0,         BL_CODES, MAX_BL_BITS);

  //static_init_done = true;
}


/* ===========================================================================
 * Initialize a new block.
 */
function init_block(s) {
  var n; /* iterates over tree elements */

  /* Initialize the trees. */
  for (n = 0; n < L_CODES;  n++) { s.dyn_ltree[n*2]/*.Freq*/ = 0; }
  for (n = 0; n < D_CODES;  n++) { s.dyn_dtree[n*2]/*.Freq*/ = 0; }
  for (n = 0; n < BL_CODES; n++) { s.bl_tree[n*2]/*.Freq*/ = 0; }

  s.dyn_ltree[END_BLOCK*2]/*.Freq*/ = 1;
  s.opt_len = s.static_len = 0;
  s.last_lit = s.matches = 0;
}


/* ===========================================================================
 * Flush the bit buffer and align the output on a byte boundary
 */
function bi_windup(s)
{
  if (s.bi_valid > 8) {
    put_short(s, s.bi_buf);
  } else if (s.bi_valid > 0) {
    //put_byte(s, (Byte)s->bi_buf);
    s.pending_buf[s.pending++] = s.bi_buf;
  }
  s.bi_buf = 0;
  s.bi_valid = 0;
}

/* ===========================================================================
 * Copy a stored block, storing first the length and its
 * one's complement if requested.
 */
function copy_block(s, buf, len, header)
//DeflateState *s;
//charf    *buf;    /* the input data */
//unsigned len;     /* its length */
//int      header;  /* true if block header must be written */
{
  bi_windup(s);        /* align on byte boundary */

  if (header) {
    put_short(s, len);
    put_short(s, ~len);
  }
//  while (len--) {
//    put_byte(s, *buf++);
//  }
  utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
  s.pending += len;
}

/* ===========================================================================
 * Compares to subtrees, using the tree depth as tie breaker when
 * the subtrees have equal frequency. This minimizes the worst case length.
 */
function smaller(tree, n, m, depth) {
  var _n2 = n*2;
  var _m2 = m*2;
  return (tree[_n2]/*.Freq*/ < tree[_m2]/*.Freq*/ ||
         (tree[_n2]/*.Freq*/ === tree[_m2]/*.Freq*/ && depth[n] <= depth[m]));
}

/* ===========================================================================
 * Restore the heap property by moving down the tree starting at node k,
 * exchanging a node with the smallest of its two sons if necessary, stopping
 * when the heap property is re-established (each father smaller than its
 * two sons).
 */
function pqdownheap(s, tree, k)
//    deflate_state *s;
//    ct_data *tree;  /* the tree to restore */
//    int k;               /* node to move down */
{
  var v = s.heap[k];
  var j = k << 1;  /* left son of k */
  while (j <= s.heap_len) {
    /* Set j to the smallest of the two sons: */
    if (j < s.heap_len &&
      smaller(tree, s.heap[j+1], s.heap[j], s.depth)) {
      j++;
    }
    /* Exit if v is smaller than both sons */
    if (smaller(tree, v, s.heap[j], s.depth)) { break; }

    /* Exchange v with the smallest son */
    s.heap[k] = s.heap[j];
    k = j;

    /* And continue down the tree, setting j to the left son of k */
    j <<= 1;
  }
  s.heap[k] = v;
}


// inlined manually
// var SMALLEST = 1;

/* ===========================================================================
 * Send the block data compressed using the given Huffman trees
 */
function compress_block(s, ltree, dtree)
//    deflate_state *s;
//    const ct_data *ltree; /* literal tree */
//    const ct_data *dtree; /* distance tree */
{
  var dist;           /* distance of matched string */
  var lc;             /* match length or unmatched char (if dist == 0) */
  var lx = 0;         /* running index in l_buf */
  var code;           /* the code to send */
  var extra;          /* number of extra bits to send */

  if (s.last_lit !== 0) {
    do {
      dist = (s.pending_buf[s.d_buf + lx*2] << 8) | (s.pending_buf[s.d_buf + lx*2 + 1]);
      lc = s.pending_buf[s.l_buf + lx];
      lx++;

      if (dist === 0) {
        send_code(s, lc, ltree); /* send a literal byte */
        //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
      } else {
        /* Here, lc is the match length - MIN_MATCH */
        code = _length_code[lc];
        send_code(s, code+LITERALS+1, ltree); /* send the length code */
        extra = extra_lbits[code];
        if (extra !== 0) {
          lc -= base_length[code];
          send_bits(s, lc, extra);       /* send the extra length bits */
        }
        dist--; /* dist is now the match distance - 1 */
        code = d_code(dist);
        //Assert (code < D_CODES, "bad d_code");

        send_code(s, code, dtree);       /* send the distance code */
        extra = extra_dbits[code];
        if (extra !== 0) {
          dist -= base_dist[code];
          send_bits(s, dist, extra);   /* send the extra distance bits */
        }
      } /* literal or match pair ? */

      /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
      //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
      //       "pendingBuf overflow");

    } while (lx < s.last_lit);
  }

  send_code(s, END_BLOCK, ltree);
}


/* ===========================================================================
 * Construct one Huffman tree and assigns the code bit strings and lengths.
 * Update the total bit length for the current block.
 * IN assertion: the field freq is set for all tree elements.
 * OUT assertions: the fields len and code are set to the optimal bit length
 *     and corresponding code. The length opt_len is updated; static_len is
 *     also updated if stree is not null. The field max_code is set.
 */
function build_tree(s, desc)
//    deflate_state *s;
//    tree_desc *desc; /* the tree descriptor */
{
  var tree     = desc.dyn_tree;
  var stree    = desc.stat_desc.static_tree;
  var has_stree = desc.stat_desc.has_stree;
  var elems    = desc.stat_desc.elems;
  var n, m;          /* iterate over heap elements */
  var max_code = -1; /* largest code with non zero frequency */
  var node;          /* new node being created */

  /* Construct the initial heap, with least frequent element in
   * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
   * heap[0] is not used.
   */
  s.heap_len = 0;
  s.heap_max = HEAP_SIZE;

  for (n = 0; n < elems; n++) {
    if (tree[n * 2]/*.Freq*/ !== 0) {
      s.heap[++s.heap_len] = max_code = n;
      s.depth[n] = 0;

    } else {
      tree[n*2 + 1]/*.Len*/ = 0;
    }
  }

  /* The pkzip format requires that at least one distance code exists,
   * and that at least one bit should be sent even if there is only one
   * possible code. So to avoid special checks later on we force at least
   * two codes of non zero frequency.
   */
  while (s.heap_len < 2) {
    node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
    tree[node * 2]/*.Freq*/ = 1;
    s.depth[node] = 0;
    s.opt_len--;

    if (has_stree) {
      s.static_len -= stree[node*2 + 1]/*.Len*/;
    }
    /* node is 0 or 1 so it does not have extra bits */
  }
  desc.max_code = max_code;

  /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
   * establish sub-heaps of increasing lengths:
   */
  for (n = (s.heap_len >> 1/*int /2*/); n >= 1; n--) { pqdownheap(s, tree, n); }

  /* Construct the Huffman tree by repeatedly combining the least two
   * frequent nodes.
   */
  node = elems;              /* next internal node of the tree */
  do {
    //pqremove(s, tree, n);  /* n = node of least frequency */
    /*** pqremove ***/
    n = s.heap[1/*SMALLEST*/];
    s.heap[1/*SMALLEST*/] = s.heap[s.heap_len--];
    pqdownheap(s, tree, 1/*SMALLEST*/);
    /***/

    m = s.heap[1/*SMALLEST*/]; /* m = node of next least frequency */

    s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
    s.heap[--s.heap_max] = m;

    /* Create a new node father of n and m */
    tree[node * 2]/*.Freq*/ = tree[n * 2]/*.Freq*/ + tree[m * 2]/*.Freq*/;
    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
    tree[n*2 + 1]/*.Dad*/ = tree[m*2 + 1]/*.Dad*/ = node;

    /* and insert the new node in the heap */
    s.heap[1/*SMALLEST*/] = node++;
    pqdownheap(s, tree, 1/*SMALLEST*/);

  } while (s.heap_len >= 2);

  s.heap[--s.heap_max] = s.heap[1/*SMALLEST*/];

  /* At this point, the fields freq and dad are set. We can now
   * generate the bit lengths.
   */
  gen_bitlen(s, desc);

  /* The field len is now set, we can generate the bit codes */
  gen_codes(tree, max_code, s.bl_count);
}


/* ===========================================================================
 * Scan a literal or distance tree to determine the frequencies of the codes
 * in the bit length tree.
 */
function scan_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree;   /* the tree to be scanned */
//    int max_code;    /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0*2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  tree[(max_code+1)*2 + 1]/*.Len*/ = 0xffff; /* guard */

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n+1)*2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      s.bl_tree[curlen * 2]/*.Freq*/ += count;

    } else if (curlen !== 0) {

      if (curlen !== prevlen) { s.bl_tree[curlen * 2]/*.Freq*/++; }
      s.bl_tree[REP_3_6*2]/*.Freq*/++;

    } else if (count <= 10) {
      s.bl_tree[REPZ_3_10*2]/*.Freq*/++;

    } else {
      s.bl_tree[REPZ_11_138*2]/*.Freq*/++;
    }

    count = 0;
    prevlen = curlen;

    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Send a literal or distance tree in compressed form, using the codes in
 * bl_tree.
 */
function send_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree; /* the tree to be scanned */
//    int max_code;       /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0*2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  /* tree[max_code+1].Len = -1; */  /* guard already set */
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n+1)*2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      do { send_code(s, curlen, s.bl_tree); } while (--count !== 0);

    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s, curlen, s.bl_tree);
        count--;
      }
      //Assert(count >= 3 && count <= 6, " 3_6?");
      send_code(s, REP_3_6, s.bl_tree);
      send_bits(s, count-3, 2);

    } else if (count <= 10) {
      send_code(s, REPZ_3_10, s.bl_tree);
      send_bits(s, count-3, 3);

    } else {
      send_code(s, REPZ_11_138, s.bl_tree);
      send_bits(s, count-11, 7);
    }

    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Construct the Huffman tree for the bit lengths and return the index in
 * bl_order of the last bit length code to send.
 */
function build_bl_tree(s) {
  var max_blindex;  /* index of last bit length code of non zero freq */

  /* Determine the bit length frequencies for literal and distance trees */
  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

  /* Build the bit length tree: */
  build_tree(s, s.bl_desc);
  /* opt_len now includes the length of the tree representations, except
   * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
   */

  /* Determine the number of bit length codes to send. The pkzip format
   * requires that at least 4 bit length codes be sent. (appnote.txt says
   * 3 but the actual value used is 4.)
   */
  for (max_blindex = BL_CODES-1; max_blindex >= 3; max_blindex--) {
    if (s.bl_tree[bl_order[max_blindex]*2 + 1]/*.Len*/ !== 0) {
      break;
    }
  }
  /* Update opt_len to include the bit length tree and counts */
  s.opt_len += 3*(max_blindex+1) + 5+5+4;
  //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
  //        s->opt_len, s->static_len));

  return max_blindex;
}


/* ===========================================================================
 * Send the header for a block using dynamic Huffman trees: the counts, the
 * lengths of the bit length codes, the literal tree and the distance tree.
 * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
 */
function send_all_trees(s, lcodes, dcodes, blcodes)
//    deflate_state *s;
//    int lcodes, dcodes, blcodes; /* number of codes for each tree */
{
  var rank;                    /* index in bl_order */

  //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
  //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
  //        "too many codes");
  //Tracev((stderr, "\nbl counts: "));
  send_bits(s, lcodes-257, 5); /* not +255 as stated in appnote.txt */
  send_bits(s, dcodes-1,   5);
  send_bits(s, blcodes-4,  4); /* not -3 as stated in appnote.txt */
  for (rank = 0; rank < blcodes; rank++) {
    //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
    send_bits(s, s.bl_tree[bl_order[rank]*2 + 1]/*.Len*/, 3);
  }
  //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_ltree, lcodes-1); /* literal tree */
  //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_dtree, dcodes-1); /* distance tree */
  //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
}


/* ===========================================================================
 * Check if the data type is TEXT or BINARY, using the following algorithm:
 * - TEXT if the two conditions below are satisfied:
 *    a) There are no non-portable control characters belonging to the
 *       "black list" (0..6, 14..25, 28..31).
 *    b) There is at least one printable character belonging to the
 *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
 * - BINARY otherwise.
 * - The following partially-portable control characters form a
 *   "gray list" that is ignored in this detection algorithm:
 *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
 * IN assertion: the fields Freq of dyn_ltree are set.
 */
function detect_data_type(s) {
  /* black_mask is the bit mask of black-listed bytes
   * set bits 0..6, 14..25, and 28..31
   * 0xf3ffc07f = binary 11110011111111111100000001111111
   */
  var black_mask = 0xf3ffc07f;
  var n;

  /* Check for non-textual ("black-listed") bytes. */
  for (n = 0; n <= 31; n++, black_mask >>>= 1) {
    if ((black_mask & 1) && (s.dyn_ltree[n*2]/*.Freq*/ !== 0)) {
      return Z_BINARY;
    }
  }

  /* Check for textual ("white-listed") bytes. */
  if (s.dyn_ltree[9 * 2]/*.Freq*/ !== 0 || s.dyn_ltree[10 * 2]/*.Freq*/ !== 0 ||
      s.dyn_ltree[13 * 2]/*.Freq*/ !== 0) {
    return Z_TEXT;
  }
  for (n = 32; n < LITERALS; n++) {
    if (s.dyn_ltree[n * 2]/*.Freq*/ !== 0) {
      return Z_TEXT;
    }
  }

  /* There are no "black-listed" or "white-listed" bytes:
   * this stream either is empty or has tolerated ("gray-listed") bytes only.
   */
  return Z_BINARY;
}


var static_init_done = false;

/* ===========================================================================
 * Initialize the tree data structures for a new zlib stream.
 */
function _tr_init(s)
{

  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }

  s.l_desc  = new TreeDesc(s.dyn_ltree, static_l_desc);
  s.d_desc  = new TreeDesc(s.dyn_dtree, static_d_desc);
  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

  s.bi_buf = 0;
  s.bi_valid = 0;

  /* Initialize the first block of the first file: */
  init_block(s);
}


/* ===========================================================================
 * Send a stored block
 */
function _tr_stored_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  send_bits(s, (STORED_BLOCK<<1)+(last ? 1 : 0), 3);    /* send block type */
  copy_block(s, buf, stored_len, true); /* with header */
}


/* ===========================================================================
 * Send one empty static block to give enough lookahead for inflate.
 * This takes 10 bits, of which 7 may remain in the bit buffer.
 */
function _tr_align(s) {
  send_bits(s, STATIC_TREES<<1, 3);
  send_code(s, END_BLOCK, static_ltree);
  bi_flush(s);
}


/* ===========================================================================
 * Determine the best encoding for the current block: dynamic trees, static
 * trees or store, and output the encoded block to the zip file.
 */
function _tr_flush_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block, or NULL if too old */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  var opt_lenb, static_lenb;  /* opt_len and static_len in bytes */
  var max_blindex = 0;        /* index of last bit length code of non zero freq */

  /* Build the Huffman trees unless a stored block is forced */
  if (s.level > 0) {

    /* Check if the file is binary or text */
    if (s.strm.data_type === Z_UNKNOWN) {
      s.strm.data_type = detect_data_type(s);
    }

    /* Construct the literal and distance trees */
    build_tree(s, s.l_desc);
    // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));

    build_tree(s, s.d_desc);
    // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));
    /* At this point, opt_len and static_len are the total bit lengths of
     * the compressed block data, excluding the tree representations.
     */

    /* Build the bit length tree for the above two trees, and get the index
     * in bl_order of the last bit length code to send.
     */
    max_blindex = build_bl_tree(s);

    /* Determine the best encoding. Compute the block lengths in bytes. */
    opt_lenb = (s.opt_len+3+7) >>> 3;
    static_lenb = (s.static_len+3+7) >>> 3;

    // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
    //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
    //        s->last_lit));

    if (static_lenb <= opt_lenb) { opt_lenb = static_lenb; }

  } else {
    // Assert(buf != (char*)0, "lost buf");
    opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
  }

  if ((stored_len+4 <= opt_lenb) && (buf !== -1)) {
    /* 4: two words for the lengths */

    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
     * Otherwise we can't have processed more than WSIZE input bytes since
     * the last block flush, because compression would have been
     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
     * transform a block into a stored block.
     */
    _tr_stored_block(s, buf, stored_len, last);

  } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {

    send_bits(s, (STATIC_TREES<<1) + (last ? 1 : 0), 3);
    compress_block(s, static_ltree, static_dtree);

  } else {
    send_bits(s, (DYN_TREES<<1) + (last ? 1 : 0), 3);
    send_all_trees(s, s.l_desc.max_code+1, s.d_desc.max_code+1, max_blindex+1);
    compress_block(s, s.dyn_ltree, s.dyn_dtree);
  }
  // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
  /* The above check is made mod 2^32, for files larger than 512 MB
   * and uLong implemented on 32 bits.
   */
  init_block(s);

  if (last) {
    bi_windup(s);
  }
  // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
  //       s->compressed_len-7*last));
}

/* ===========================================================================
 * Save the match info and tally the frequency counts. Return true if
 * the current block must be flushed.
 */
function _tr_tally(s, dist, lc)
//    deflate_state *s;
//    unsigned dist;  /* distance of matched string */
//    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
{
  //var out_length, in_length, dcode;

  s.pending_buf[s.d_buf + s.last_lit * 2]     = (dist >>> 8) & 0xff;
  s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;

  s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
  s.last_lit++;

  if (dist === 0) {
    /* lc is the unmatched char */
    s.dyn_ltree[lc*2]/*.Freq*/++;
  } else {
    s.matches++;
    /* Here, lc is the match length - MIN_MATCH */
    dist--;             /* dist = match distance - 1 */
    //Assert((ush)dist < (ush)MAX_DIST(s) &&
    //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
    //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

    s.dyn_ltree[(_length_code[lc]+LITERALS+1) * 2]/*.Freq*/++;
    s.dyn_dtree[d_code(dist) * 2]/*.Freq*/++;
  }

// (!) This block is disabled in zlib defailts,
// don't enable it for binary compatibility

//#ifdef TRUNCATE_BLOCK
//  /* Try to guess if it is profitable to stop the current block here */
//  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
//    /* Compute an upper bound for the compressed length */
//    out_length = s.last_lit*8;
//    in_length = s.strstart - s.block_start;
//
//    for (dcode = 0; dcode < D_CODES; dcode++) {
//      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
//    }
//    out_length >>>= 3;
//    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
//    //       s->last_lit, in_length, out_length,
//    //       100L - out_length*100L/in_length));
//    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
//      return true;
//    }
//  }
//#endif

  return (s.last_lit === s.lit_bufsize-1);
  /* We avoid equality with lit_bufsize because of wraparound at 64K
   * on 16 bit machines and because stored blocks are restricted to
   * 64K-1 bytes.
   */
}

exports._tr_init  = _tr_init;
exports._tr_stored_block = _tr_stored_block;
exports._tr_flush_block  = _tr_flush_block;
exports._tr_tally = _tr_tally;
exports._tr_align = _tr_align;

},{"../utils/common":213}],225:[function(require,module,exports){
'use strict';


function ZStream() {
  /* next input byte */
  this.input = null; // JS specific, because we have no pointers
  this.next_in = 0;
  /* number of bytes available at input */
  this.avail_in = 0;
  /* total number of input bytes read so far */
  this.total_in = 0;
  /* next output byte should be put there */
  this.output = null; // JS specific, because we have no pointers
  this.next_out = 0;
  /* remaining free space at output */
  this.avail_out = 0;
  /* total number of bytes output so far */
  this.total_out = 0;
  /* last error message, NULL if no error */
  this.msg = ''/*Z_NULL*/;
  /* not visible by applications */
  this.state = null;
  /* best guess about the data type: binary or text */
  this.data_type = 2/*Z_UNKNOWN*/;
  /* adler32 value of the uncompressed data */
  this.adler = 0;
}

module.exports = ZStream;

},{}]},{},[161])

