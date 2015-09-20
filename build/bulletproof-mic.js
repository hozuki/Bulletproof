/**
 * Created by MIC on 2015/8/27.
 */
var bulletproof_org = require("./bulletproof-org");
var bulletproof;
(function (bulletproof) {
    var mic;
    (function (mic) {
        var Color = (function () {
            function Color(r, g, b, a) {
                if (r === void 0) { r = 0; }
                if (g === void 0) { g = 0; }
                if (b === void 0) { b = 0; }
                if (a === void 0) { a = 255; }
                this.r = r;
                this.g = g;
                this.b = b;
                this.a = a;
            }
            Object.defineProperty(Color.prototype, "r", {
                get: function () {
                    return this._r;
                },
                set: function (v) {
                    this._r = mic.util.limit(v, 0, 255);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color.prototype, "g", {
                get: function () {
                    return this._g;
                },
                set: function (v) {
                    this._g = mic.util.limit(v, 0, 255);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color.prototype, "b", {
                get: function () {
                    return this._b;
                },
                set: function (v) {
                    this._b = mic.util.limit(v, 0, 255);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color.prototype, "a", {
                get: function () {
                    return this._a;
                },
                set: function (v) {
                    this._a = mic.util.limit(v, 0, 255);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color.prototype, "argb", {
                get: function () {
                    return (this.a << 24) | (this.r << 16) | (this.g << 8) | this.b;
                },
                enumerable: true,
                configurable: true
            });
            Color.fromArgb = function (r, g, b, a) {
                if (a === void 0) { a = 255; }
                return new Color(r, g, b, a);
            };
            Color.fromNumber = function (value, format) {
                if (format === void 0) { format = ColorFormat.ARGB; }
                value = Math.floor(value);
                var t3, t2, t1, t0;
                var a = 0, r = 0, g = 0, b = 0;
                t3 = (value & 0xff000000) >>> 24;
                t2 = (value & 0x00ff0000) >> 16;
                t1 = (value & 0x0000ff00) >> 8;
                t0 = (value & 0x000000ff);
                switch (format) {
                    case ColorFormat.ARGB:
                        a = t3;
                        r = t2;
                        g = t1;
                        b = t0;
                        break;
                    case ColorFormat.ABGR:
                        a = t3;
                        b = t2;
                        g = t1;
                        r = t0;
                        break;
                    case ColorFormat.BGRA:
                        b = t3;
                        g = t2;
                        r = t1;
                        a = t0;
                        break;
                    case ColorFormat.RGBA:
                        r = t3;
                        g = t2;
                        b = t1;
                        a = t0;
                        break;
                    case ColorFormat.RGB:
                        r = t2;
                        g = t1;
                        b = t0;
                        break;
                    case ColorFormat.BGR:
                        b = t2;
                        g = t1;
                        r = t0;
                        break;
                    default:
                        break;
                }
                return new Color(r, g, b, a);
            };
            Color.prototype.toNumber = function (format) {
                if (format === void 0) { format = ColorFormat.ARGB; }
                var s = 0;
                switch (format) {
                    case ColorFormat.ARGB:
                        s = (this.a << 24) | (this.r << 16) | (this.g << 8) | this.b;
                        break;
                    case ColorFormat.ABGR:
                        s = (this.a << 24) | (this.b << 16) | (this.g << 8) | this.r;
                        break;
                    case ColorFormat.BGRA:
                        s = (this.b << 24) | (this.g << 16) | (this.r << 8) | this.a;
                        break;
                    case ColorFormat.RGBA:
                        s = (this.r << 24) | (this.g << 16) | (this.b << 8) | this.a;
                        break;
                    case ColorFormat.RGB:
                        s = (this.r << 16) | (this.g << 8) | this.b;
                        break;
                    case ColorFormat.BGR:
                        s = (this.b << 16) | (this.g << 8) | this.r;
                        break;
                    default:
                        break;
                }
                return s;
            };
            Color.prototype.toNumberString = function (format) {
                if (format === void 0) { format = ColorFormat.ARGB; }
                var number = this.toNumber(format);
                return mic.util.padLeft(number.toString(16), 8, '0');
            };
            Color.argbToCss = function (r, g, b, a) {
                if (a === void 0) { a = 255; }
                r = mic.util.limit(r, 0, 255);
                g = mic.util.limit(g, 0, 255);
                b = mic.util.limit(b, 0, 255);
                a = mic.util.limit(a, 0, 1);
                return 'rgba(' + r.toString() + ', ' + g.toString() + ', ' + b.toString() + ', ' + a.toString() + ')';
            };
            Color.argbNumberToCss = function (argb, alpha) {
                if (alpha === void 0) { alpha = null; }
                var a = alpha == null ? ((argb & 0xff000000) >>> 24 / 255) : mic.util.limit(alpha, 0, 1);
                var r = (argb & 0x00ff0000) >> 16;
                var g = (argb & 0x0000ff00) >> 8;
                var b = (argb & 0x000000ff);
                return 'rgba(' + r.toString() + ', ' + g.toString() + ', ' + b.toString() + ', ' + a.toString() + ')';
            };
            Color.rgbToCss = function (r, g, b) {
                r = mic.util.limit(r, 0, 255);
                g = mic.util.limit(g, 0, 255);
                b = mic.util.limit(b, 0, 255);
                return 'rgb(' + r.toString() + ', ' + g.toString() + ', ' + b.toString() + ')';
            };
            Color.rgbNumberToCss = function (rgb) {
                var r = (rgb & 0x00ff0000) >> 16;
                var g = (rgb & 0x0000ff00) >> 8;
                var b = (rgb & 0x000000ff);
                return 'rgb(' + r.toString() + ', ' + g.toString() + ', ' + b.toString() + ')';
            };
            Color.rgbNumberToCssSharp = function (rgb) {
                var r = (rgb & 0x00ff0000) >> 16;
                var g = (rgb & 0x0000ff00) >> 8;
                var b = (rgb & 0x000000ff);
                var sr = r < 16 ? '0' + r.toString(16) : r.toString(16);
                var sg = g < 16 ? '0' + g.toString(16) : g.toString(16);
                var sb = b < 16 ? '0' + b.toString(16) : b.toString(16);
                return '#' + sr + sg + sb;
            };
            /**
             *
             * @param rgb
             * @param alpha 0 to 1
             * @returns {number}
             */
            Color.colorCombine = function (rgb, alpha) {
                rgb = rgb & 0x00ffffff;
                alpha = mic.util.limit(Math.round(mic.util.limit(alpha, 0, 1) * 255), 0, 255);
                return rgb | (alpha << 24);
            };
            Object.defineProperty(Color, "TRANSPARENT", {
                get: function () {
                    return new Color(0, 0, 0, 0);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color, "RED", {
                get: function () {
                    return new Color(255, 0, 0);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color, "GREEN", {
                get: function () {
                    return new Color(0, 255, 0);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color, "BLUE", {
                get: function () {
                    return new Color(0, 0, 255);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color, "BLACK", {
                get: function () {
                    return new Color(0, 0, 0);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color, "WHITE", {
                get: function () {
                    return new Color(255, 255, 255);
                },
                enumerable: true,
                configurable: true
            });
            return Color;
        })();
        mic.Color = Color;
        var ColorFormat = (function () {
            function ColorFormat() {
            }
            Object.defineProperty(ColorFormat, "ARGB", {
                get: function () {
                    return 'argb';
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ColorFormat, "ABGR", {
                get: function () {
                    return 'abgr';
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ColorFormat, "RGBA", {
                get: function () {
                    return 'rgba';
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ColorFormat, "BGRA", {
                get: function () {
                    return 'bgra';
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ColorFormat, "RGB", {
                get: function () {
                    return 'rgb';
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ColorFormat, "BGR", {
                get: function () {
                    return 'bgr';
                },
                enumerable: true,
                configurable: true
            });
            return ColorFormat;
        })();
        mic.ColorFormat = ColorFormat;
        function trace(message, title) {
            if (title === void 0) { title = null; }
            if (typeof message == 'string') {
                if (title && title.length > 0) {
                    console.debug(title + '\r\n' + message);
                }
                else {
                    console.debug(message);
                }
            }
            else {
                console.log(message);
            }
        }
        mic.trace = trace;
    })(mic = bulletproof.mic || (bulletproof.mic = {}));
})(bulletproof = exports.bulletproof || (exports.bulletproof = {}));
var bulletproof;
(function (bulletproof) {
    var mic;
    (function (mic) {
        var util;
        (function (util) {
            var EventClass = bulletproof_org.bulletproof.EventClass;
            function limit(v, min, max) {
                (v < min) && (v = min);
                (v > max) && (v = max);
                return v;
            }
            util.limit = limit;
            var __stringFormattingParams = null;
            function __stringFormatter(matched) {
                var index = matched.substring(1, matched.length - 1);
                if (__stringFormattingParams != null && __stringFormattingParams.hasOwnProperty(index)) {
                    var indexValue = parseInt(index);
                    return __stringFormattingParams[indexValue].toString();
                }
                else {
                    return matched;
                }
            }
            function format(s) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                var regex = /{[\d]+}/g;
                __stringFormattingParams = args;
                var r = s.replace(regex, __stringFormatter);
                __stringFormattingParams = null;
                return r;
            }
            util.format = format;
            /**
             * min < v < max
             * @param v
             * @param min
             * @param max
             * @returns {boolean}
             */
            function valueBetweenNE(v, min, max) {
                return min < v && v < max;
            }
            util.valueBetweenNE = valueBetweenNE;
            function matrixInvert(v, rank) {
                if (rank === void 0) { rank = 3; }
                function vget(v, row, col) {
                    return v[row + col * rank];
                }
                function vset(v, row, col, s) {
                    v[row + col * rank] = s;
                }
                function swap(v, row1, col1, row2, col2) {
                    var k = v[row1 + col1 * rank];
                    v[row1 + col1 * rank] = v[row2 + col2 * rank];
                    v[row2 + col2 * rank] = k;
                }
                var r;
                r.canInvert = false;
                r.determinant = 0;
                r.result = null;
                v = v.slice();
                var p;
                var i, j;
                // http://dev.gameres.com/Program/Visual/3D/Mnquick.htm
                var is = Array(rank);
                for (p = 0; p < rank; p++) {
                    is[p] = 0;
                }
                var js = is.slice();
                var det = 1;
                var f = 1;
                for (var k = 0; k < rank; k++) {
                    // 第一步，全选主元
                    var max = 0;
                    for (i = k; i < rank; i++) {
                        for (j = k; j < rank; j++) {
                            f = Math.abs(vget(v, i, j));
                            if (f > max) {
                                max = f;
                                is[k] = i;
                                js[k] = j;
                            }
                        }
                    }
                    if (Math.abs(max) < 0.0001) {
                        return r;
                    }
                    if (is[k] != k) {
                        f = -f;
                        for (p = 0; k < rank; p++) {
                            swap(v, k, p, is[k], p);
                        }
                    }
                    if (js[k] != k) {
                        f = -f;
                        for (p = 0; k < rank; p++) {
                            swap(v, k, p, p, js[k]);
                        }
                    }
                    // 计算行列式
                    det *= vget(v, k, k);
                    // 计算逆矩阵
                    // 第二步
                    vset(v, k, k, 1 / vget(v, k, k));
                    for (j = 0; j < rank; j++) {
                        if (j != k) {
                            vset(v, k, j, vget(v, k, j) * vget(v, k, k));
                        }
                    }
                    for (i = 0; i < rank; i++) {
                        if (i != k) {
                            for (j = 0; j < rank; j++) {
                                if (j != k) {
                                    vset(v, i, j, vget(v, i, j) - vget(v, i, k) * vget(v, k, j));
                                }
                            }
                        }
                    }
                    for (i = 0; i < rank; i++) {
                        if (i != k) {
                            vset(v, i, k, vget(v, i, k) * (-vget(v, k, k)));
                        }
                    }
                }
                if (js[k] != k) {
                    f = -f;
                    for (p = 0; k < rank; p++) {
                        swap(v, k, p, p, js[k]);
                    }
                }
                if (is[k] != k) {
                    f = -f;
                    for (p = 0; k < rank; p++) {
                        swap(v, k, p, is[k], p);
                    }
                }
                r.canInvert = true;
                r.determinant = det * f;
                r.result = v;
                return r;
            }
            util.matrixInvert = matrixInvert;
            function loadFile(url, headers) {
                if (headers === void 0) { headers = null; }
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, false);
                if (headers != null && headers.size > 0) {
                    headers.forEach(function (v, k, map) {
                        xhr.setRequestHeader(k, v);
                    });
                }
                xhr.send();
                var r;
                r.statusCode = xhr.status;
                r.statusText = xhr.statusText;
                r.responseText = xhr.responseText;
                return r;
            }
            util.loadFile = loadFile;
            function loadFileAsync(url, onFinished, headers) {
                if (headers === void 0) { headers = null; }
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, false);
                if (headers != null && headers.size > 0) {
                    headers.forEach(function (v, k, map) {
                        xhr.setRequestHeader(k, v);
                    });
                }
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == XMLHttpRequest.DONE) {
                        var r;
                        r.statusCode = xhr.status;
                        r.statusText = xhr.statusText;
                        r.responseText = xhr.responseText;
                        onFinished(r);
                    }
                };
                xhr.send();
            }
            util.loadFileAsync = loadFileAsync;
            function createTestEvent(type) {
                return new EventClass(type);
            }
            util.createTestEvent = createTestEvent;
            function padLeft(s, targetLength, padChar) {
                if (s.length >= targetLength) {
                    return s;
                }
                else {
                    var t = padChar;
                    targetLength--;
                    while (targetLength > s.length) {
                        t += padChar;
                        targetLength--;
                    }
                    return t + s;
                }
            }
            util.padLeft = padLeft;
            function padRight(s, targetLength, padChar) {
                if (s.length >= targetLength) {
                    return s;
                }
                else {
                    var t = padChar;
                    targetLength--;
                    while (targetLength > s.length) {
                        t += padChar;
                        targetLength--;
                    }
                    return s + t;
                }
            }
            util.padRight = padRight;
            function alphaBlend(sR, sG, sB, sA, tR, tG, tB, tA, sourceConstantAlpha) {
                if (sourceConstantAlpha === void 0) { sourceConstantAlpha = 0xff; }
                var r, g, b, a;
                sourceConstantAlpha = limit(sourceConstantAlpha, 0, 0xff);
                if (sourceConstantAlpha == 0xff) {
                    r = sR + tR * (1 - sA / 0xff);
                    g = sG + tG * (1 - sA / 0xff);
                    b = sB + tB * (1 - sA / 0xff);
                    a = sA + tA * (1 - sA / 0xff);
                }
                else {
                    r = sR + tR * (1 - sourceConstantAlpha / 0xff);
                    g = sG + tG * (1 - sourceConstantAlpha / 0xff);
                    b = sB + tB * (1 - sourceConstantAlpha / 0xff);
                    a = sA + tA * (1 - sourceConstantAlpha / 0xff);
                }
                return new mic.Color(r, g, b, a);
            }
            util.alphaBlend = alphaBlend;
        })(util = mic.util || (mic.util = {}));
    })(mic = bulletproof.mic || (bulletproof.mic = {}));
})(bulletproof = exports.bulletproof || (exports.bulletproof = {}));
//# sourceMappingURL=bulletproof-mic.js.map