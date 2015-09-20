/**
 * Created by MIC on 2015/8/29.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var bulletproof_org = require("./bulletproof-org");
var bulletproof_flash = require("./bulletproof-flash");
var bulletproof;
(function (bulletproof) {
    var fl;
    (function (fl) {
        var flash = bulletproof_flash.bulletproof.flash;
        var NotImplementedError = bulletproof_org.bulletproof.NotImplementedError;
        var transitions;
        (function (transitions) {
            var Tween = (function (_super) {
                __extends(Tween, _super);
                function Tween(obj, prop, func, begin, finish, duration, useSeconds) {
                    if (useSeconds === void 0) { useSeconds = false; }
                    _super.call(this);
                    this.begin = NaN;
                    this.isPlaying = false;
                    this.looping = false;
                    this.obj = null;
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
                    throw new NotImplementedError();
                };
                Tween.prototype.fforward = function () {
                    throw new NotImplementedError();
                };
                Tween.prototype.nextFrame = function () {
                    throw new NotImplementedError();
                };
                Tween.prototype.prevFrame = function () {
                    throw new NotImplementedError();
                };
                Tween.prototype.resume = function () {
                    throw new NotImplementedError();
                };
                Tween.prototype.rewind = function (t) {
                    if (t === void 0) { t = 0; }
                    throw new NotImplementedError();
                };
                Tween.prototype.start = function () {
                    throw new NotImplementedError();
                };
                Tween.prototype.stop = function () {
                    throw new NotImplementedError();
                };
                Tween.prototype.yoyo = function () {
                    throw new NotImplementedError();
                };
                return Tween;
            })(flash.events.EventDispatcher);
            transitions.Tween = Tween;
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
                    throw new NotImplementedError();
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
            })(flash.events.FlashEvent);
            transitions.TweenEvent = TweenEvent;
            // http://www.zhangxinxu.com/GitHub/Tween/tween.js
            var easing;
            (function (easing) {
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
                })();
                easing.Back = Back;
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
                })();
                easing.Bounce = Bounce;
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
                })();
                easing.Elastic = Elastic;
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
                })();
                easing.None = None;
                var Regular = (function () {
                    function Regular() {
                    }
                    Regular.easeIn = function (t, b, c, d) {
                        throw new NotImplementedError();
                    };
                    Regular.easeInOut = function (t, b, c, d) {
                        throw new NotImplementedError();
                    };
                    Regular.easeOut = function (t, b, c, d) {
                        throw new NotImplementedError();
                    };
                    return Regular;
                })();
                easing.Regular = Regular;
                var Strong = (function () {
                    function Strong() {
                    }
                    Strong.easeIn = function (t, b, c, d) {
                        throw new NotImplementedError();
                    };
                    Strong.easeInOut = function (t, b, c, d) {
                        throw new NotImplementedError();
                    };
                    Strong.easeOut = function (t, b, c, d) {
                        throw new NotImplementedError();
                    };
                    return Strong;
                })();
                easing.Strong = Strong;
                // Bulletproof
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
                })();
                easing.Quadratic = Quadratic;
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
                })();
                easing.Cubic = Cubic;
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
                })();
                easing.Quartic = Quartic;
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
                })();
                easing.Quintic = Quintic;
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
                })();
                easing.Sine = Sine;
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
                })();
                easing.Exponential = Exponential;
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
                })();
                easing.Circular = Circular;
            })(easing = transitions.easing || (transitions.easing = {}));
        })(transitions = fl.transitions || (fl.transitions = {}));
    })(fl = bulletproof.fl || (bulletproof.fl = {}));
})(bulletproof = exports.bulletproof || (exports.bulletproof = {}));
//# sourceMappingURL=bulletproof-fl.js.map