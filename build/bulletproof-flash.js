/**
 * Created by MIC on 2015/8/27.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../include/ext/pixi.js/pixi.js.d.ts"/>
var bulletproof_org = require("./bulletproof-org");
var bulletproof_mic = require("./bulletproof-mic");
var bulletproof_thirdparty = require("./bulletproof-thirdparty");
var bulletproof;
(function (bulletproof) {
    var flash;
    (function (flash) {
        var mic = bulletproof_mic.bulletproof.mic;
        var NotImplementedError = bulletproof_org.bulletproof.NotImplementedError;
        var events;
        (function (events) {
            var EventClass = bulletproof_org.bulletproof.EventClass;
            var EventDispatcher = (function () {
                function EventDispatcher() {
                    this._listeners = new Map();
                }
                EventDispatcher.prototype.addEventListener = function (type, listener, useCapture) {
                    // jabbany
                    if (!this._listeners.has(type)) {
                        this._listeners.set(type, []);
                    }
                    this._listeners.get(type).push(listener);
                };
                EventDispatcher.prototype.dispatchEvent = function (event, data) {
                    // jabbany
                    if (this._listeners.has(event.type) && this._listeners.get(event.type) != null) {
                        var arr = this._listeners.get(event.type);
                        for (var i = 0; i < arr.length; i++) {
                            try {
                                arr[i](data);
                            }
                            catch (ex) {
                                if (ex.hasOwnProperty('stack')) {
                                    mic.trace(ex.stack.toString(), 'dispatchEvent: error');
                                }
                                else {
                                    mic.trace(ex.toString(), 'dispatchEvent: error');
                                }
                            }
                        }
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                EventDispatcher.prototype.hasEventListener = function (type) {
                    return this._listeners.has(type);
                };
                EventDispatcher.prototype.removeEventListener = function (type, listener, useCapture) {
                    // jabbany
                    if (!this._listeners.has(type) || this._listeners.get(type).length == 0) {
                        return;
                    }
                    var index = this._listeners.get(type).indexOf(listener);
                    if (index >= 0) {
                        this._listeners.get(type).splice(index, 1);
                    }
                };
                EventDispatcher.prototype.willTrigger = function (type) {
                    return this._listeners.has(type) && this._listeners.get(type).length > 0;
                };
                return EventDispatcher;
            })();
            events.EventDispatcher = EventDispatcher;
            var UncaughtErrorEvents = (function (_super) {
                __extends(UncaughtErrorEvents, _super);
                function UncaughtErrorEvents() {
                    _super.call(this);
                }
                return UncaughtErrorEvents;
            })(EventDispatcher);
            events.UncaughtErrorEvents = UncaughtErrorEvents;
            var FlashEvent = (function (_super) {
                __extends(FlashEvent, _super);
                function FlashEvent() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(FlashEvent, "ACTIVATE", {
                    get: function () {
                        return 'activate';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "ADDED", {
                    get: function () {
                        return 'added';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "ADDED_TO_STAGE", {
                    get: function () {
                        return 'addedToStage';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "BROWSER_ZOOM_CHANGE", {
                    get: function () {
                        return 'browserZoomChange';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "CANCEL", {
                    get: function () {
                        return 'cancel';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "CHANGE", {
                    get: function () {
                        return 'change';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "CLEAR", {
                    get: function () {
                        return 'clear';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "CLOSE", {
                    get: function () {
                        return 'close';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "CLOSING", {
                    get: function () {
                        return 'closing';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "COMPLETE", {
                    get: function () {
                        return 'complete';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "CONNECT", {
                    get: function () {
                        return 'connect';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "COPY", {
                    get: function () {
                        return 'copy';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "CUT", {
                    get: function () {
                        return 'cut';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "DEACTIVATE", {
                    get: function () {
                        return 'deactivate';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "DISPLAYING", {
                    get: function () {
                        return 'displaying';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "ENTER_FRAME", {
                    get: function () {
                        return 'enterFrame';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "EXIT_FRAME", {
                    get: function () {
                        return 'exitFrame';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "EXITING", {
                    get: function () {
                        return 'exiting';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "FRAME_CONSTRUCTED", {
                    get: function () {
                        return 'frameConstructed';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "FULLSCREEN", {
                    get: function () {
                        return 'fullScreen';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "HTML_BOUNDS_CHANGE", {
                    get: function () {
                        return 'htmlBoundsChange';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "HTML_DOM_INITIALIZE", {
                    get: function () {
                        return 'htmlDOMInitialize';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "HTML_RENDER", {
                    get: function () {
                        return 'htmlRender';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "ID3", {
                    get: function () {
                        return 'id3';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "INIT", {
                    get: function () {
                        return 'init';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "LOCATION_CHANGE", {
                    get: function () {
                        return 'locationChange';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "MOUSE_LEAVE", {
                    get: function () {
                        return 'mouseLeave';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "NETWORK_CHANGE", {
                    get: function () {
                        return 'networkChange';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "OPEN", {
                    get: function () {
                        return 'open';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "PASTE", {
                    get: function () {
                        return 'paste';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "REMOVED", {
                    get: function () {
                        return 'removed';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "REMOVED_FROM_STAGE", {
                    get: function () {
                        return 'removedFromStage';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "RENDER", {
                    get: function () {
                        return 'render';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "RESIZE", {
                    get: function () {
                        return 'resize';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "SCROLL", {
                    get: function () {
                        return 'scroll';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "SELECT", {
                    get: function () {
                        return 'select';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "SELECT_ALL", {
                    get: function () {
                        return 'selectAll';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "SOUND_COMPLETE", {
                    get: function () {
                        return 'soundComplete';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "STANDARD_ERROR_CLOSE", {
                    get: function () {
                        return 'standardErrorClose';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "STANDARD_INPUT_CLOSE", {
                    get: function () {
                        return 'standardInputClose';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "STANDARD_OUTPUT_CLOSE", {
                    get: function () {
                        return 'standardOutputClose';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "TAB_CHILDREN_CHANGE", {
                    get: function () {
                        return 'tabChildrenChange';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "TAB_ENABLED_CHANGE", {
                    get: function () {
                        return 'tabEnabledChange';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "TAB_INDEX_CHANGE", {
                    get: function () {
                        return 'tabIndexChange';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "TEXT_INTERACTION_MODE_CHANGE", {
                    get: function () {
                        return 'textInteractionModeChange';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "UNLOAD", {
                    get: function () {
                        return 'unload';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "USER_IDLE", {
                    get: function () {
                        return 'userIdle';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FlashEvent, "USER_PRESENT", {
                    get: function () {
                        return 'userPresent';
                    },
                    enumerable: true,
                    configurable: true
                });
                return FlashEvent;
            })(EventClass);
            events.FlashEvent = FlashEvent;
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
                    throw new NotImplementedError();
                };
                TimerEvent.prototype.clone = function () {
                    throw new NotImplementedError();
                };
                return TimerEvent;
            })(FlashEvent);
            events.TimerEvent = TimerEvent;
            var UncaughtErrorEvent = (function (_super) {
                __extends(UncaughtErrorEvent, _super);
                function UncaughtErrorEvent(type, bubbles, cancelable) {
                    if (bubbles === void 0) { bubbles = false; }
                    if (cancelable === void 0) { cancelable = false; }
                    _super.call(this, type, bubbles, cancelable);
                }
                Object.defineProperty(UncaughtErrorEvent, "UNCAUGHT_ERROR", {
                    get: function () {
                        return 'uncaughtError';
                    },
                    enumerable: true,
                    configurable: true
                });
                UncaughtErrorEvent.prototype.clone = function () {
                    throw new NotImplementedError();
                };
                return UncaughtErrorEvent;
            })(FlashEvent);
            events.UncaughtErrorEvent = UncaughtErrorEvent;
            var ActivityEvent = (function (_super) {
                __extends(ActivityEvent, _super);
                function ActivityEvent(type, bubbles, cancelable, activating) {
                    if (bubbles === void 0) { bubbles = false; }
                    if (cancelable === void 0) { cancelable = false; }
                    if (activating === void 0) { activating = false; }
                    _super.call(this, type, bubbles, cancelable);
                    this._activating = activating;
                }
                ActivityEvent.prototype.clone = function () {
                    throw new NotImplementedError();
                };
                Object.defineProperty(ActivityEvent, "ACTIVITY", {
                    get: function () {
                        return 'activity';
                    },
                    enumerable: true,
                    configurable: true
                });
                return ActivityEvent;
            })(FlashEvent);
            events.ActivityEvent = ActivityEvent;
            var FullScreenEvent = (function (_super) {
                __extends(FullScreenEvent, _super);
                function FullScreenEvent(type, bubbles, cancelable, fullScreen, interactive) {
                    if (bubbles === void 0) { bubbles = false; }
                    if (cancelable === void 0) { cancelable = false; }
                    if (fullScreen === void 0) { fullScreen = false; }
                    if (interactive === void 0) { interactive = false; }
                    _super.call(this, type, bubbles, cancelable, true);
                    this._fullScreen = fullScreen;
                    this._interactive = interactive;
                    throw new NotImplementedError();
                }
                FullScreenEvent.prototype.clone = function () {
                    throw new NotImplementedError();
                };
                Object.defineProperty(FullScreenEvent, "FULL_SCREEN", {
                    get: function () {
                        return 'fullScreen';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FullScreenEvent, "FULL_SCREEN_INTERACTIVE_ACCEPTED", {
                    get: function () {
                        return 'fullScreenInteractiveAccepted';
                    },
                    enumerable: true,
                    configurable: true
                });
                return FullScreenEvent;
            })(ActivityEvent);
            events.FullScreenEvent = FullScreenEvent;
            var StageVideoEvent = (function (_super) {
                __extends(StageVideoEvent, _super);
                function StageVideoEvent(type, bubbles, cancelable, status, colorSpace) {
                    if (bubbles === void 0) { bubbles = false; }
                    if (cancelable === void 0) { cancelable = false; }
                    if (status === void 0) { status = null; }
                    if (colorSpace === void 0) { colorSpace = null; }
                    _super.call(this, type, bubbles, cancelable);
                    this._colorSpace = colorSpace;
                    this._status = status;
                }
                Object.defineProperty(StageVideoEvent.prototype, "colorSpace", {
                    get: function () {
                        return this._colorSpace;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StageVideoEvent.prototype, "status", {
                    get: function () {
                        return this._status;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StageVideoEvent, "codecInfo", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                StageVideoEvent.prototype.clone = function () {
                    throw new NotImplementedError();
                };
                return StageVideoEvent;
            })(FlashEvent);
            events.StageVideoEvent = StageVideoEvent;
        })(events = flash.events || (flash.events = {}));
        var geom;
        (function (geom) {
            var Point = (function () {
                function Point(x, y) {
                    if (x === void 0) { x = 0; }
                    if (y === void 0) { y = 0; }
                    this.x = x;
                    this.y = y;
                }
                Object.defineProperty(Point.prototype, "length", {
                    get: function () {
                        return Math.sqrt(this.x * this.x + this.y * this.y);
                    },
                    enumerable: true,
                    configurable: true
                });
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
                    return this.x == toCompare.x && this.y == toCompare.y;
                };
                Point.interpolate = function (pt1, pt2, f) {
                    f = mic.util.limit(f, 0, 1);
                    return new Point(pt1.x * f + pt2.x * (1 - f), pt1.y * f + pt2.y * (1 - f));
                };
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
                    return mic.util.format('(x={0}, y={1})', this.x, this.y);
                };
                return Point;
            })();
            geom.Point = Point;
            var Rectangle = (function () {
                function Rectangle(x, y, width, height) {
                    if (x === void 0) { x = 0; }
                    if (y === void 0) { y = 0; }
                    if (width === void 0) { width = 0; }
                    if (height === void 0) { height = 0; }
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
                        return new Point(this._x + this._w, this._y + this._h);
                    },
                    set: function (v) {
                        this.right = v.x;
                        this.bottom = v.y;
                    },
                    enumerable: true,
                    configurable: true
                });
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
                Object.defineProperty(Rectangle.prototype, "left", {
                    get: function () {
                        return this._x;
                    },
                    set: function (v) {
                        if (v > this._x + this._w) {
                            v = this._x + this._w;
                        }
                        this._w = this._x + this._w - v;
                        this._x = v;
                    },
                    enumerable: true,
                    configurable: true
                });
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
                Object.defineProperty(Rectangle.prototype, "size", {
                    get: function () {
                        return new Point(this._w, this._h);
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
                        return new Point(this._x, this._y);
                    },
                    set: function (v) {
                        this.left = v.x;
                        this.top = v.y;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Rectangle.prototype, "width", {
                    get: function () {
                        return this._w;
                    },
                    set: function (v) {
                        this._w = v;
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
                    var x, y, w, h;
                    var rect1, rect2;
                    if (this.left < toIntersect.left) {
                        rect1 = this;
                        rect2 = toIntersect;
                    }
                    else {
                        rect1 = toIntersect;
                        rect2 = this;
                    }
                    if (rect1.right < rect2.left) {
                        return new Rectangle(); // 不相交
                    }
                    else {
                        x = rect2.left;
                        w = Math.min(rect1.right, rect2.right) - x;
                    }
                    if (this.top < toIntersect.top) {
                        rect1 = this;
                        rect2 = toIntersect;
                    }
                    else {
                        rect1 = toIntersect;
                        rect2 = this;
                    }
                    if (rect1.bottom < rect2.top) {
                        return new Rectangle(); // 不相交
                    }
                    else {
                        y = rect2.top;
                        h = Math.min(rect1.bottom, rect2.bottom) - y;
                    }
                    return new Rectangle(x, y, w, h);
                };
                Rectangle.prototype.intersects = function (toIntersect) {
                    var rect1, rect2;
                    if (this.left < toIntersect.left) {
                        rect1 = this;
                        rect2 = toIntersect;
                    }
                    else {
                        rect1 = toIntersect;
                        rect2 = this;
                    }
                    if (rect1.right < rect2.left) {
                        return false;
                    }
                    if (this.top < toIntersect.top) {
                        rect1 = this;
                        rect2 = toIntersect;
                    }
                    else {
                        rect1 = toIntersect;
                        rect2 = this;
                    }
                    if (rect1.bottom < rect2.top) {
                        return false;
                    }
                    return true;
                };
                Rectangle.prototype.isEmpty = function () {
                    return this._w <= 0 || this._h <= 0;
                };
                Rectangle.prototype.offset = function (dx, dy) {
                    this.x += dx;
                    this.y += dy;
                };
                Rectangle.prototype.offsetPoint = function (point) {
                    this.offset(point.x, point.y);
                };
                Rectangle.prototype.setEmpty = function () {
                    this._x = this._y = this._w = this._h = 0;
                };
                Rectangle.prototype.setTo = function (xa, ya, widtha, heighta) {
                    this.x = xa;
                    this.y = ya;
                    this.width = widtha;
                    this.height = heighta;
                };
                Rectangle.prototype.toString = function () {
                    return mic.util.format('{X={0}, Y={1}, Width={2}, Height={3}}', this.x, this.y, this.width, this.height);
                };
                Rectangle.prototype.union = function (toUnion) {
                    var x = Math.min(this.x, toUnion.x);
                    var y = Math.min(this.y, toUnion.y);
                    var r = Math.max(this.right, toUnion.right);
                    var b = Math.max(this.bottom, toUnion.bottom);
                    return new Rectangle(x, y, r - x, b - y);
                };
                return Rectangle;
            })();
            geom.Rectangle = Rectangle;
            var Vector3D = (function () {
                function Vector3D(x, y, z, w) {
                    if (x === void 0) { x = 0; }
                    if (y === void 0) { y = 0; }
                    if (z === void 0) { z = 0; }
                    if (w === void 0) { w = 0; }
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
                    var vnom = a.x * b.x + a.y * b.y + a.z * b.z;
                    var denom = a.length * b.length;
                    var val = Math.sqrt(vnom * vnom / denom);
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
                    return mic.util.valueBetweenNE(this.x, toCompare.x - tolerance, toCompare.x + tolerance) && mic.util.valueBetweenNE(this.y, toCompare.y - tolerance, toCompare.y + tolerance) && mic.util.valueBetweenNE(this.z, toCompare.z - tolerance, toCompare.z + tolerance) && !(allFour && !mic.util.valueBetweenNE(this.w, toCompare.w - tolerance, toCompare.w + tolerance));
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
                    return mic.util.format('[x={0}, y={1}, z={2}]', this.x, this.y, this.z);
                };
                return Vector3D;
            })();
            geom.Vector3D = Vector3D;
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
                    this._data = Matrix.dotProduct(this._data, m._data);
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
                    throw new NotImplementedError();
                };
                Matrix.prototype.identity = function () {
                    this._data = [1, 0, 0, 0, 1, 0, 0, 0, 1];
                };
                Matrix.prototype.invert = function () {
                    var invResult = mic.util.matrixInvert(this._data);
                    if (invResult.canInvert) {
                        this._data = invResult.result;
                    }
                    return invResult.canInvert;
                };
                Matrix.prototype.rotate = function (angle) {
                    this._data = Matrix.dotProduct(this._data, [
                        Math.cos(angle),
                        -Math.sin(angle),
                        0,
                        Math.sin(angle),
                        Math.cos(angle),
                        0,
                        0,
                        0,
                        1
                    ]);
                };
                Matrix.prototype.scale = function (sx, sy) {
                    this._data = Matrix.dotProduct(this._data, [
                        sx,
                        0,
                        0,
                        0,
                        sy,
                        0,
                        0,
                        0,
                        1
                    ]);
                };
                /**
                 * Bulletproof
                 * @param skewX
                 * @param skewY
                 */
                Matrix.prototype.skew = function (skewX, skewY) {
                    this._data = Matrix.dotProduct(this._data, [
                        0,
                        Math.tan(skewX),
                        0,
                        Math.tan(skewY),
                        0,
                        0,
                        0,
                        0,
                        1
                    ]);
                };
                Matrix.prototype.setTo = function (aa, ba, ca, da, txa, tya) {
                    this._data = [aa, ca, txa, ba, da, tya, 0, 0, 1];
                };
                Matrix.prototype.toString = function () {
                    return mic.util.format('[{0} {1} 0\r\n{2} {3} 0\r\n{4} {5} 1]', this.a, this.b, this.c, this.d, this.tx, this.ty);
                };
                Matrix.prototype.transformPoint = function (point) {
                    // 由于 Flash 所用的矩阵是转置过的，所以这里变成了行×行
                    //var pointVector = [point.x, point.y, 1];
                    //var x = pointVector[0] * this._data[0] + pointVector[1] * this._data[1] + pointVector[2] * this._data[2];
                    //var y = pointVector[0] * this._data[3] + pointVector[1] * this._data[4] + pointVector[2] * this._data[5];
                    //return new Point(x, y);
                    return new Point(point.x * this._data[0] + point.y * this._data[1] + this._data[2], point.x * this._data[3] + point.y * this._data[4] + this._data[5]);
                };
                Matrix.prototype.translate = function (dx, dy) {
                    this.tx += dx;
                    this.ty += dy;
                };
                Matrix.dotProduct = function (a, b) {
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
            })();
            geom.Matrix = Matrix;
            var Matrix3D = (function () {
                function Matrix3D(v) {
                    if (v === void 0) { v = null; }
                    if (v == null || v.length <= 0) {
                        v = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
                    }
                    this.rawData = v;
                }
                Object.defineProperty(Matrix3D.prototype, "determinant", {
                    get: function () {
                        var invResult = mic.util.matrixInvert(this.rawData, 4);
                        return invResult.determinant;
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
                            throw new Error('Data length of Matrix3D must be no less than 16.');
                        }
                        this._data = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Matrix3D.prototype.append = function (lhs) {
                    this._data = Matrix3D.dotProduct(lhs._data, this._data);
                };
                Matrix3D.prototype.appendRotation = function (degrees, axis, pivotPoint) {
                    if (pivotPoint === void 0) { pivotPoint = null; }
                    if (pivotPoint !== null) {
                        this.appendTranslation(pivotPoint.x, pivotPoint.y, pivotPoint.z);
                    }
                    this._data = Matrix3D.dotProduct(Matrix3D.rotationMatrix(degrees * Math.PI / 180, axis), this._data);
                    if (pivotPoint !== null) {
                        this.appendTranslation(-pivotPoint.x, -pivotPoint.y, -pivotPoint.z);
                    }
                };
                Matrix3D.prototype.appendScale = function (xScale, yScale, zScale) {
                    this._data = Matrix3D.dotProduct([
                        xScale,
                        0,
                        0,
                        0,
                        0,
                        yScale,
                        0,
                        0,
                        0,
                        0,
                        zScale,
                        0,
                        0,
                        0,
                        0,
                        1
                    ], this._data);
                };
                Matrix3D.prototype.appendTranslation = function (x, y, z) {
                    this._data = Matrix3D.dotProduct([
                        1,
                        0,
                        0,
                        x,
                        0,
                        1,
                        0,
                        y,
                        0,
                        0,
                        1,
                        z,
                        0,
                        0,
                        0,
                        1
                    ], this._data);
                };
                Matrix3D.prototype.clone = function () {
                    return new Matrix3D(this.rawData);
                };
                Matrix3D.prototype.copyColumnFrom = function (column, vector3D) {
                    if (column < 0 || column > 3) {
                        throw new RangeError('Column must be 0, 1, 2 or 3.');
                    }
                    this._data[column * 4] = vector3D.x;
                    this._data[column * 4 + 1] = vector3D.y;
                    this._data[column * 4 + 2] = vector3D.z;
                    this._data[column * 4 + 3] = vector3D.w;
                };
                Matrix3D.prototype.copyColumnTo = function (column, vector3D) {
                    if (column < 0 || column > 3) {
                        throw new RangeError('Column must be 0, 1, 2 or 3.');
                    }
                    vector3D.x = this._data[column * 4];
                    vector3D.y = this._data[column * 4 + 1];
                    vector3D.z = this._data[column * 4 + 2];
                    vector3D.w = this._data[column * 4 + 3];
                };
                Matrix3D.prototype.copyFrom = function (sourceMatrix3D) {
                    this.position = sourceMatrix3D.position.clone();
                    this.rawData = sourceMatrix3D.rawData.slice();
                };
                Matrix3D.prototype.copyRawDataFrom = function (vector, index, transpose) {
                    if (index === void 0) { index = 0; }
                    if (transpose === void 0) { transpose = false; }
                    throw new NotImplementedError();
                };
                Matrix3D.prototype.copyRawDataTo = function (vector, index, transpose) {
                    if (index === void 0) { index = 0; }
                    if (transpose === void 0) { transpose = false; }
                    throw new NotImplementedError();
                };
                Matrix3D.prototype.copyRowFrom = function (row, vector3D) {
                    if (row < 0 || row > 3) {
                        throw new RangeError('Row must be 0, 1, 2 or 3.');
                    }
                    this._data[row] = vector3D.x;
                    this._data[row + 4] = vector3D.y;
                    this._data[row + 8] = vector3D.z;
                    this._data[row + 12] = vector3D.w;
                };
                Matrix3D.prototype.copyRowTo = function (row, vector3D) {
                    if (row < 0 || row > 3) {
                        throw new RangeError('Row must be 0, 1, 2 or 3.');
                    }
                    vector3D.x = this._data[row];
                    vector3D.y = this._data[row + 4];
                    vector3D.z = this._data[row + 8];
                    vector3D.w = this._data[row + 12];
                };
                Matrix3D.prototype.copyToMatrix3D = function (dest) {
                    dest.position = this.position.clone();
                    dest.rawData = this._data.slice();
                };
                Matrix3D.prototype.decompose = function (orientationStyle) {
                    if (orientationStyle === void 0) { orientationStyle = Orientation3D.EULER_ANGLES; }
                    throw new NotImplementedError();
                };
                Matrix3D.prototype.deltaTransformVector = function (v) {
                    throw new NotImplementedError();
                };
                Matrix3D.prototype.identity = function () {
                    this._data = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
                };
                Matrix3D.interpolate = function (thisMat, toMat, percent) {
                    percent = mic.util.limit(percent, 0, 1);
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
                    var invResult = mic.util.matrixInvert(this.rawData, 4);
                    if (invResult.canInvert) {
                        this._data = invResult.result;
                    }
                    return invResult.canInvert;
                };
                Matrix3D.prototype.pointAt = function (pos, at, up) {
                    if (at === void 0) { at = null; }
                    if (up === void 0) { up = null; }
                    throw new NotImplementedError();
                };
                Matrix3D.prototype.prepend = function (rhs) {
                    this._data = Matrix3D.dotProduct(this._data, rhs._data);
                };
                Matrix3D.prototype.prependRotation = function (degrees, axis, pivotPoint) {
                    if (pivotPoint === void 0) { pivotPoint = null; }
                    if (pivotPoint !== null) {
                        this.prependTranslation(pivotPoint.x, pivotPoint.y, pivotPoint.z);
                    }
                    this._data = Matrix3D.dotProduct(this._data, Matrix3D.rotationMatrix(degrees * Math.PI / 180, axis));
                    if (pivotPoint !== null) {
                        this.prependTranslation(-pivotPoint.x, -pivotPoint.y, -pivotPoint.z);
                    }
                };
                Matrix3D.prototype.prependScale = function (xScale, yScale, zScale) {
                    this._data = Matrix3D.dotProduct(this._data, [
                        xScale,
                        0,
                        0,
                        0,
                        0,
                        yScale,
                        0,
                        0,
                        0,
                        0,
                        zScale,
                        0,
                        0,
                        0,
                        0,
                        1
                    ]);
                };
                Matrix3D.prototype.prependTranslation = function (x, y, z) {
                    this._data = Matrix3D.dotProduct(this._data, [
                        1,
                        0,
                        0,
                        x,
                        0,
                        1,
                        0,
                        y,
                        0,
                        0,
                        1,
                        z,
                        0,
                        0,
                        0,
                        1
                    ]);
                };
                Matrix3D.prototype.recompose = function (components, orientationStyle) {
                    if (orientationStyle === void 0) { orientationStyle = Orientation3D.EULER_ANGLES; }
                    throw new NotImplementedError();
                };
                Matrix3D.prototype.transformVector = function (v) {
                    var x = this._data[0] * v.x + this._data[1] * v.y + this._data[2] * v.z + this._data[3] * v.w;
                    var y = this._data[4] * v.x + this._data[5] * v.y + this._data[6] * v.z + this._data[7] * v.w;
                    var z = this._data[8] * v.x + this._data[9] * v.y + this._data[10] * v.z + this._data[11] * v.w;
                    var w = this._data[12] * v.x + this._data[13] * v.y + this._data[14] * v.z + this._data[15] * v.w;
                    return new Vector3D(x, y, z, w);
                };
                Matrix3D.prototype.transformVectors = function (vin, vout) {
                    if (vin.length % 3 !== 0) {
                        throw new Error('transformVectors needs 2 arrays, size of the input array must be multiple of 3.');
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
                    this._data = [
                        this._data[0],
                        this._data[4],
                        this._data[8],
                        this._data[12],
                        this._data[1],
                        this._data[5],
                        this._data[9],
                        this._data[13],
                        this._data[2],
                        this._data[6],
                        this._data[10],
                        this._data[14],
                        this._data[3],
                        this._data[7],
                        this._data[11],
                        this._data[15]
                    ];
                };
                Matrix3D.dotProduct = function (a, b) {
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
                Matrix3D.rotationMatrix = function (angle, axis) {
                    // jabbany
                    var sT = Math.sin(angle), cT = Math.cos(angle);
                    return [
                        cT + axis.x * axis.x * (1 - cT),
                        axis.x * axis.y * (1 - cT) - axis.z * sT,
                        axis.x * axis.z * (1 - cT) + axis.y * sT,
                        0,
                        axis.x * axis.y * (1 - cT) + axis.z * sT,
                        cT + axis.y * axis.y * (1 - cT),
                        axis.y * axis.z * (1 - cT) - axis.x * sT,
                        0,
                        axis.z * axis.x * (1 - cT) - axis.y * sT,
                        axis.z * axis.y * (1 - cT) + axis.x * sT,
                        cT + axis.z * axis.z * (1 - cT),
                        0,
                        0,
                        0,
                        0,
                        1
                    ];
                };
                return Matrix3D;
            })();
            geom.Matrix3D = Matrix3D;
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
                        this._alphaOffset = mic.util.limit(v, -255, 255);
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
                        this._redOffset = mic.util.limit(v, -255, 255);
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
                        this._greenOffset = mic.util.limit(v, -255, 255);
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
                        this._blueOffset = mic.util.limit(v, -255, 255);
                    },
                    enumerable: true,
                    configurable: true
                });
                ColorTransform.prototype.concat = function (second) {
                    throw new NotImplementedError();
                };
                return ColorTransform;
            })();
            geom.ColorTransform = ColorTransform;
            var PerspectiveProjection = (function () {
                function PerspectiveProjection() {
                    this.fieldOfView = 90;
                    this.focalLength = 10;
                    this.projectionCenter = new Point();
                }
                Object.defineProperty(PerspectiveProjection.prototype, "fieldOfView", {
                    get: function () {
                        return this._fieldOfView;
                    },
                    set: function (v) {
                        this._fieldOfView = mic.util.limit(v, 0, 180);
                    },
                    enumerable: true,
                    configurable: true
                });
                PerspectiveProjection.prototype.toMatrix3D = function () {
                    throw new NotImplementedError();
                };
                return PerspectiveProjection;
            })();
            geom.PerspectiveProjection = PerspectiveProjection;
            var Transform = (function () {
                function Transform() {
                }
                Object.defineProperty(Transform.prototype, "concatenatedColorTransform", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Transform.prototype, "concatenatedMatrix", {
                    get: function () {
                        throw new NotImplementedError();
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
                    throw new NotImplementedError();
                };
                return Transform;
            })();
            geom.Transform = Transform;
            var Orientation3D = (function () {
                function Orientation3D() {
                }
                Object.defineProperty(Orientation3D, "AXIS_ANGLE", {
                    get: function () {
                        return 'axisAngle';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Orientation3D, "EULER_ANGLES", {
                    get: function () {
                        return 'eulerAngles';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Orientation3D, "QUATERNION", {
                    get: function () {
                        return 'quaternion';
                    },
                    enumerable: true,
                    configurable: true
                });
                return Orientation3D;
            })();
            geom.Orientation3D = Orientation3D;
        })(geom = flash.geom || (flash.geom = {}));
        var filters;
        (function (filters) {
            var BitmapFilter = (function (_super) {
                __extends(BitmapFilter, _super);
                function BitmapFilter() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(BitmapFilter.prototype, "filterType", {
                    get: function () {
                        return 'filter';
                    },
                    enumerable: true,
                    configurable: true
                });
                BitmapFilter.prototype.clone = function () {
                    return null;
                };
                Object.defineProperty(BitmapFilter, "FILTER_BLUR", {
                    get: function () {
                        return 'blur';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BitmapFilter, "FILTER_GLOW", {
                    get: function () {
                        return 'glow';
                    },
                    enumerable: true,
                    configurable: true
                });
                return BitmapFilter;
            })(PIXI.AbstractFilter);
            filters.BitmapFilter = BitmapFilter;
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
            })();
            filters.BitmapFilterQuality = BitmapFilterQuality;
            var GlowFilter = (function (_super) {
                __extends(GlowFilter, _super);
                function GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout) {
                    if (color === void 0) { color = 0xff0000; }
                    if (alpha === void 0) { alpha = 1.0; }
                    if (blurX === void 0) { blurX = 6.0; }
                    if (blurY === void 0) { blurY = 6.0; }
                    if (strength === void 0) { strength = 2; }
                    if (quality === void 0) { quality = BitmapFilterQuality.LOW; }
                    if (inner === void 0) { inner = false; }
                    if (knockout === void 0) { knockout = false; }
                    _super.call(this);
                    this._f1 = new PIXI.filters.ColorMatrixFilter();
                    this._f2 = new PIXI.filters.BlurFilter();
                    this._f3 = new PIXI.filters.ColorMatrixFilter();
                    this.color = color;
                    this.alpha = mic.util.limit(alpha, 0, 1);
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
                        this._alpha = v;
                        var clr = mic.Color.fromNumber(this.color);
                        this._updateColorMatrix(clr.r, clr.g, clr.b, v);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GlowFilter.prototype, "blurX", {
                    get: function () {
                        return this._f2.blurX;
                    },
                    set: function (v) {
                        this._f2.blurX = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GlowFilter.prototype, "blurY", {
                    get: function () {
                        return this._f2.blurY;
                    },
                    set: function (v) {
                        this._f2.blurY = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GlowFilter.prototype, "color", {
                    get: function () {
                        return this._color;
                    },
                    set: function (v) {
                        this._color = v;
                        var clr = mic.Color.fromNumber(v);
                        this._updateColorMatrix(clr.r, clr.g, clr.b, this.alpha);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GlowFilter.prototype, "quality", {
                    get: function () {
                        return this._f2.passes;
                    },
                    set: function (v) {
                        this._f2.passes = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                GlowFilter.prototype.clone = function () {
                    return new GlowFilter(this.color, this.alpha, this.blurX, this.blurY, this.strength, this.quality, this.inner, this.knockout);
                };
                Object.defineProperty(GlowFilter.prototype, "filterType", {
                    get: function () {
                        return BitmapFilter.FILTER_GLOW;
                    },
                    enumerable: true,
                    configurable: true
                });
                // Bulletproof, PIXI
                // See PIXI.filters.BlurFilter
                GlowFilter.prototype.applyFilter = function (renderer, input, output, clear) {
                    var renderTarget = renderer.filterManager.getRenderTarget(true);
                    this._f1.applyFilter(renderer, input, renderTarget);
                    this._f2.applyFilter(renderer, renderTarget, output);
                    this._f3.applyFilter(renderer, input, output);
                    // type casting: trick
                    renderer.filterManager.returnRenderTarget(renderTarget);
                };
                GlowFilter.prototype._updateColorMatrix = function (r, g, b, a) {
                    this._f1.matrix = [
                        0,
                        0,
                        0,
                        r,
                        0,
                        0,
                        0,
                        0,
                        g,
                        0,
                        0,
                        0,
                        0,
                        b,
                        0,
                        0,
                        0,
                        0,
                        a,
                        0
                    ];
                };
                return GlowFilter;
            })(BitmapFilter);
            filters.GlowFilter = GlowFilter;
            var BlurFilter = (function (_super) {
                __extends(BlurFilter, _super);
                function BlurFilter(blurX, blurY, quality) {
                    if (blurX === void 0) { blurX = 4.0; }
                    if (blurY === void 0) { blurY = 4.0; }
                    if (quality === void 0) { quality = BitmapFilterQuality.LOW; }
                    _super.call(this);
                    this._f1 = new PIXI.filters.BlurFilter();
                    this.blurX = blurX;
                    this.blurY = blurY;
                    this.quality = quality;
                }
                Object.defineProperty(BlurFilter.prototype, "blurX", {
                    get: function () {
                        return this._f1.blurX;
                    },
                    set: function (v) {
                        this._f1.blurX = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BlurFilter.prototype, "blurY", {
                    get: function () {
                        return this._f1.blurY;
                    },
                    set: function (v) {
                        this._f1.blurY = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BlurFilter.prototype, "quality", {
                    get: function () {
                        return this._f1.passes;
                    },
                    set: function (v) {
                        this._f1.passes = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                BlurFilter.prototype.clone = function () {
                    return new BlurFilter(this.blurX, this.blurY, this.quality);
                };
                Object.defineProperty(BlurFilter.prototype, "filterType", {
                    get: function () {
                        return BitmapFilter.FILTER_BLUR;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BlurFilter.prototype, "pixiFilters", {
                    // Bulletproof
                    get: function () {
                        return [this._f1];
                    },
                    enumerable: true,
                    configurable: true
                });
                // Bulletproof, PIXI
                BlurFilter.prototype.applyFilter = function (renderer, input, output, clear) {
                    return this._f1.applyFilter(renderer, input, output, clear);
                };
                return BlurFilter;
            })(BitmapFilter);
            filters.BlurFilter = BlurFilter;
        })(filters = flash.filters || (flash.filters = {}));
        var text;
        (function (text) {
            var TextFormat = (function () {
                function TextFormat(font, size, color, bold, italic, underline, url, target, align, leftMargin, rightMargin, indent, leading) {
                    if (font === void 0) { font = null; }
                    if (size === void 0) { size = null; }
                    if (color === void 0) { color = null; }
                    if (bold === void 0) { bold = null; }
                    if (italic === void 0) { italic = null; }
                    if (underline === void 0) { underline = null; }
                    if (url === void 0) { url = null; }
                    if (target === void 0) { target = null; }
                    if (align === void 0) { align = null; }
                    if (leftMargin === void 0) { leftMargin = null; }
                    if (rightMargin === void 0) { rightMargin = null; }
                    if (indent === void 0) { indent = null; }
                    if (leading === void 0) { leading = null; }
                    this.__init();
                    (font != null) && (this.font = font);
                    (size != null) && (this.size = size);
                    (color != null) && (this.color = color);
                    (bold != null) && (this.bold = bold);
                    (italic != null) && (this.italic = italic);
                    (underline != null) && (this.underline = underline);
                    (url != null) && (this.url = url);
                    (target != null) && (this.target = target);
                    (align != null) && (this.align = align);
                    (leading != null) && (this.leading = leftMargin);
                    (rightMargin != null) && (this.rightMargin = rightMargin);
                    (indent != null) && (this.indent = indent);
                    (leading != null) && (this.leading = leading);
                }
                TextFormat.prototype.__init = function () {
                    this.align = TextFormatAlign.LEFT;
                    this.blockIndent = 0;
                    this.bold = false;
                    this.bullet = false;
                    this.color = 0x000000;
                    this.font = 'Times New Roman'; // 'Times' on Mac
                    this.indent = 0;
                    this.italic = false;
                    this.kerning = false;
                    this.leading = 0;
                    this.leftMargin = 0;
                    this.letterSpacing = 0;
                    this.rightMargin = 0;
                    this.size = 12;
                    this.tabStops = [];
                    this.target = '';
                    this.underline = false;
                    this.url = '';
                };
                return TextFormat;
            })();
            text.TextFormat = TextFormat;
            var TextFormatAlign = (function () {
                function TextFormatAlign() {
                }
                Object.defineProperty(TextFormatAlign, "CENTER", {
                    get: function () {
                        return 'center';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextFormatAlign, "END", {
                    get: function () {
                        return 'end';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextFormatAlign, "JUSTIFY", {
                    get: function () {
                        return 'justify';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextFormatAlign, "LEFT", {
                    get: function () {
                        return 'left';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextFormatAlign, "RIGHT", {
                    get: function () {
                        return 'right';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextFormatAlign, "START", {
                    get: function () {
                        return 'start';
                    },
                    enumerable: true,
                    configurable: true
                });
                return TextFormatAlign;
            })();
            text.TextFormatAlign = TextFormatAlign;
            var TextSnapshot = (function () {
                function TextSnapshot() {
                }
                Object.defineProperty(TextSnapshot.prototype, "charCount", {
                    get: function () {
                        return this._text != null ? this._text.length : 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                TextSnapshot.prototype.findText = function (beginIndex, textToFind, caseSensitive) {
                    throw new NotImplementedError();
                };
                TextSnapshot.prototype.getSelected = function (beginIndex, endIndex) {
                    throw new NotImplementedError();
                };
                TextSnapshot.prototype.getSelectedText = function (includeLineEndings) {
                    if (includeLineEndings === void 0) { includeLineEndings = false; }
                    throw new NotImplementedError();
                };
                TextSnapshot.prototype.getTextRunInfo = function (beginIndex, endIndex) {
                    throw new NotImplementedError();
                };
                TextSnapshot.prototype.hitTestTextNearPos = function (x, y, maxDistance) {
                    if (maxDistance === void 0) { maxDistance = 0; }
                    throw new NotImplementedError();
                };
                TextSnapshot.prototype.setSelectColor = function (hexColor) {
                    if (hexColor === void 0) { hexColor = 0xffff00; }
                    throw new NotImplementedError();
                };
                TextSnapshot.prototype.setSelected = function (beginIndex, endIndex, selected) {
                    throw new NotImplementedError();
                };
                return TextSnapshot;
            })();
            text.TextSnapshot = TextSnapshot;
        })(text = flash.text || (flash.text = {}));
        var display;
        (function (display) {
            var DisplayObject = (function (_super) {
                __extends(DisplayObject, _super);
                function DisplayObject(root, parent) {
                    _super.call(this);
                    this._x = 0;
                    this._y = 0;
                    this._z = 0;
                    this._pixiObject = this._getNewPixiObject();
                    this._root = root;
                    this._parent = parent;
                    if (parent != null) {
                        this._childIndex = parent.numChildren;
                        parent.addChild(this);
                    }
                }
                // Bulletproof
                DisplayObject.prototype._getNewPixiObject = function () {
                    return new PIXI.DisplayObject();
                };
                // Bulletproof
                DisplayObject.prototype.draw = function () {
                };
                // Bulletproof
                DisplayObject.prototype.drawInternal = function () {
                };
                Object.defineProperty(DisplayObject.prototype, "alpha", {
                    get: function () {
                        return this._pixiObject.alpha;
                    },
                    set: function (v) {
                        this._pixiObject.alpha = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DisplayObject.prototype, "blendShader", {
                    set: function (v) {
                        this._blendShader = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DisplayObject.prototype, "cacheAsBitmap", {
                    get: function () {
                        return this._pixiObject.cacheAsBitmap;
                    },
                    set: function (v) {
                        this._pixiObject.cacheAsBitmap = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DisplayObject.prototype, "childIndex", {
                    // Bulletproof
                    get: function () {
                        return this._childIndex;
                    },
                    // Bulletproof
                    // DO NOT call manually
                    set: function (v) {
                        this._childIndex = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DisplayObject.prototype, "filters", {
                    get: function () {
                        return this._pixiObject.filters;
                    },
                    set: function (v) {
                        this._pixiObject.filters = v;
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
                Object.defineProperty(DisplayObject.prototype, "loaderInfo", {
                    get: function () {
                        return this._loaderInfo;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DisplayObject.prototype, "mouseX", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DisplayObject.prototype, "mouseY", {
                    get: function () {
                        throw new NotImplementedError();
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
                Object.defineProperty(DisplayObject.prototype, "scaleX", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    set: function (v) {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DisplayObject.prototype, "scaleY", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    set: function (v) {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DisplayObject.prototype, "scaleZ", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    set: function (v) {
                        throw new NotImplementedError();
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
                        return this._pixiObject.x;
                    },
                    set: function (v) {
                        this._pixiObject.x = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DisplayObject.prototype, "y", {
                    get: function () {
                        return this._pixiObject.y;
                    },
                    set: function (v) {
                        this._pixiObject.y = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DisplayObject.prototype, "z", {
                    get: function () {
                        return this._z;
                    },
                    set: function (v) {
                        this._z = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                DisplayObject.prototype.getBounds = function (targetCoordinateSpace) {
                    throw new NotImplementedError();
                };
                DisplayObject.prototype.getRect = function (targetCoordinateSpace) {
                    throw new NotImplementedError();
                };
                DisplayObject.prototype.globalToLocal = function (point) {
                    throw new NotImplementedError();
                };
                DisplayObject.prototype.globalToLocal3D = function (point) {
                    throw new NotImplementedError();
                };
                DisplayObject.prototype.hitTestObject = function (obj) {
                    throw new NotImplementedError();
                };
                DisplayObject.prototype.hitTestPoint = function (x, y, shapeFlag) {
                    if (shapeFlag === void 0) { shapeFlag = false; }
                    throw new NotImplementedError();
                };
                DisplayObject.prototype.local3DToGlobal = function (point3d) {
                    throw new NotImplementedError();
                };
                DisplayObject.prototype.localToGlobal = function (point) {
                    throw new NotImplementedError();
                };
                Object.defineProperty(DisplayObject.prototype, "pixiObject", {
                    // Bulletproof
                    get: function () {
                        return this._pixiObject;
                    },
                    enumerable: true,
                    configurable: true
                });
                return DisplayObject;
            })(events.EventDispatcher);
            display.DisplayObject = DisplayObject;
            var InteractiveObject = (function (_super) {
                __extends(InteractiveObject, _super);
                function InteractiveObject(root, parent) {
                    _super.call(this, root, parent);
                }
                InteractiveObject.prototype.requestSoftKeyboard = function () {
                    return false;
                };
                return InteractiveObject;
            })(DisplayObject);
            display.InteractiveObject = InteractiveObject;
            var DisplayObjectContainer = (function (_super) {
                __extends(DisplayObjectContainer, _super);
                function DisplayObjectContainer(root, parent) {
                    _super.call(this, root, parent);
                    this._children = [];
                }
                DisplayObjectContainer.prototype._getNewPixiObject = function () {
                    return new PIXI.Container();
                };
                DisplayObjectContainer.prototype.dispatchEvent = function (event, data) {
                    var r = _super.prototype.dispatchEvent.call(this, event, data);
                    var len = this.numChildren;
                    for (var i = 0; i < len; i++) {
                        this._children[i].dispatchEvent(event, data);
                    }
                    return r;
                };
                // Bulletproof
                DisplayObjectContainer.prototype.draw = function () {
                    this.drawInternal();
                    var l = this.numChildren;
                    for (var i = 0; i < l; i++) {
                        this._children[i].draw();
                    }
                };
                Object.defineProperty(DisplayObjectContainer.prototype, "numChildren", {
                    get: function () {
                        return this._children.length;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DisplayObjectContainer.prototype, "textSnapshot", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                DisplayObjectContainer.prototype.addChild = function (child) {
                    if (this._children.indexOf(child) < 0) {
                        this._children.push(child);
                        this._pixiObject.addChild(child.pixiObject);
                    }
                    return child;
                };
                DisplayObjectContainer.prototype.addChildAt = function (child, index) {
                    if (this._children.indexOf(child) < 0) {
                        this._children = this._children.slice(0, index - 1).concat(child).concat(this._children.slice(index, this._children.length - 1));
                        this._pixiObject.addChildAt(child.pixiObject, index);
                    }
                    return child;
                };
                DisplayObjectContainer.prototype.areInaccessibleObjectsUnderPoint = function (point) {
                    throw new NotImplementedError();
                };
                DisplayObjectContainer.prototype.contains = function (child) {
                    throw new NotImplementedError();
                };
                DisplayObjectContainer.prototype.getChildAt = function (index) {
                    throw new NotImplementedError();
                };
                DisplayObjectContainer.prototype.getChildByName = function (name) {
                    throw new NotImplementedError();
                };
                DisplayObjectContainer.prototype.getChildIndex = function (child) {
                    throw new NotImplementedError();
                };
                DisplayObjectContainer.prototype.getObjectsUnderPoint = function (point) {
                    throw new NotImplementedError();
                };
                DisplayObjectContainer.prototype.removeChild = function (child) {
                    if (this._children.indexOf(child) >= 0) {
                        var childIndex = child.childIndex;
                        for (var i = child.childIndex + 1; i < this._children.length; i++) {
                            this._children[i].childIndex++;
                        }
                        this._children.splice(childIndex, 1);
                        this._pixiObject.removeChild(child.pixiObject);
                        return child;
                    }
                    else {
                        return null;
                    }
                };
                DisplayObjectContainer.prototype.removeChildAt = function (index) {
                    throw new NotImplementedError();
                };
                DisplayObjectContainer.prototype.setChildIndex = function (child, index) {
                    throw new NotImplementedError();
                };
                DisplayObjectContainer.prototype.swapChildren = function (child1, child2) {
                    throw new NotImplementedError();
                };
                DisplayObjectContainer.prototype.swapChildrenAt = function (index1, index2) {
                    throw new NotImplementedError();
                };
                Object.defineProperty(DisplayObjectContainer.prototype, "width", {
                    get: function () {
                        return this._pixiObject.width;
                    },
                    set: function (v) {
                        this._pixiObject.width = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DisplayObjectContainer.prototype, "height", {
                    get: function () {
                        return this._pixiObject.height;
                    },
                    set: function (v) {
                        this._pixiObject.height = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DisplayObjectContainer.prototype, "pixiObject", {
                    // Bulletproof
                    get: function () {
                        return this._pixiObject;
                    },
                    enumerable: true,
                    configurable: true
                });
                return DisplayObjectContainer;
            })(InteractiveObject);
            display.DisplayObjectContainer = DisplayObjectContainer;
            var Stage = (function (_super) {
                __extends(Stage, _super);
                function Stage(renderer) {
                    // 注意这里可能引起了循环引用，请手工释放
                    _super.call(this, null, null);
                    this._root = this; // forced (= =)#
                    this._renderer = renderer;
                }
                // Bulletproof
                Stage.prototype.raiseEnterFrame = function () {
                    var event = mic.util.createTestEvent(events.FlashEvent.ENTER_FRAME);
                    this.dispatchEvent(event);
                };
                // Bulletproof
                Stage.prototype.redraw = function () {
                    this._renderer.render(this._pixiObject);
                };
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
                Object.defineProperty(Stage.prototype, "nativeWindow", {
                    get: function () {
                        return window;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Stage.prototype, "softKeyboardRect", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Stage.prototype, "stageHeight", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    set: function (v) {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Stage.prototype, "stageVideos", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Stage.prototype, "stageWidth", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    set: function (v) {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Stage.prototype, "textSnapshot", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Stage.prototype, "x", {
                    get: function () {
                        console.warn('Stage.x is always 0.');
                        return 0;
                    },
                    set: function (v) {
                        console.warn('Stage.x cannot be set manually.');
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Stage.prototype, "y", {
                    get: function () {
                        console.warn('Stage.y is always 0.');
                        return 0;
                    },
                    set: function (v) {
                        console.warn('Stage.y cannot be set manually.');
                    },
                    enumerable: true,
                    configurable: true
                });
                Stage.prototype.invalidate = function () {
                    throw new NotImplementedError();
                };
                Stage.prototype.isFocusInaccessible = function () {
                    throw new NotImplementedError();
                };
                return Stage;
            })(DisplayObjectContainer);
            display.Stage = Stage;
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
            })();
            display.StageAlign = StageAlign;
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
            })();
            display.ColorCorrection = ColorCorrection;
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
            })();
            display.ColorCorrectionSupport = ColorCorrectionSupport;
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
            })();
            display.StageDisplayState = StageDisplayState;
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
            })();
            display.StageQuality = StageQuality;
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
            })();
            display.StageScaleMode = StageScaleMode;
            var GradientType = (function () {
                function GradientType() {
                }
                Object.defineProperty(GradientType, "LINEAR", {
                    get: function () {
                        return 'linear';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GradientType, "RADIAL", {
                    get: function () {
                        return 'radial';
                    },
                    enumerable: true,
                    configurable: true
                });
                return GradientType;
            })();
            display.GradientType = GradientType;
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
            })();
            display.InterpolationMethod = InterpolationMethod;
            var SpreadMethod = (function () {
                function SpreadMethod() {
                }
                Object.defineProperty(SpreadMethod, "PAD", {
                    get: function () {
                        return 'pad';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SpreadMethod, "REFLECT", {
                    get: function () {
                        return 'reflect';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SpreadMethod, "REPEAT", {
                    get: function () {
                        return 'repeat';
                    },
                    enumerable: true,
                    configurable: true
                });
                return SpreadMethod;
            })();
            display.SpreadMethod = SpreadMethod;
            var GraphicsPathWinding = (function () {
                function GraphicsPathWinding() {
                }
                Object.defineProperty(GraphicsPathWinding, "EVEN_ODD", {
                    get: function () {
                        return 'evenOdd';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GraphicsPathWinding, "NON_ZERO", {
                    get: function () {
                        return 'nonZero';
                    },
                    enumerable: true,
                    configurable: true
                });
                return GraphicsPathWinding;
            })();
            display.GraphicsPathWinding = GraphicsPathWinding;
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
            })();
            display.GraphicsPathCommand = GraphicsPathCommand;
            var TriangleCulling = (function () {
                function TriangleCulling() {
                }
                Object.defineProperty(TriangleCulling, "NEGATIVE", {
                    get: function () {
                        return 'negative';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TriangleCulling, "NONE", {
                    get: function () {
                        return 'none';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TriangleCulling, "POSITIVE", {
                    get: function () {
                        return 'positive';
                    },
                    enumerable: true,
                    configurable: true
                });
                return TriangleCulling;
            })();
            display.TriangleCulling = TriangleCulling;
            var LineScaleMode = (function () {
                function LineScaleMode() {
                }
                Object.defineProperty(LineScaleMode, "HORIZONTAL", {
                    get: function () {
                        return 'horizontal';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LineScaleMode, "NONE", {
                    get: function () {
                        return 'none';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LineScaleMode, "NORMAL", {
                    get: function () {
                        return 'normal';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LineScaleMode, "VERTICAL", {
                    get: function () {
                        return 'vertical';
                    },
                    enumerable: true,
                    configurable: true
                });
                return LineScaleMode;
            })();
            display.LineScaleMode = LineScaleMode;
            var CapsStyle = (function () {
                function CapsStyle() {
                }
                Object.defineProperty(CapsStyle, "NONE", {
                    get: function () {
                        return 'none';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CapsStyle, "ROUND", {
                    get: function () {
                        return 'round';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CapsStyle, "SQUARE", {
                    get: function () {
                        return 'square';
                    },
                    enumerable: true,
                    configurable: true
                });
                return CapsStyle;
            })();
            display.CapsStyle = CapsStyle;
            var JointStyle = (function () {
                function JointStyle() {
                }
                Object.defineProperty(JointStyle, "BEVEL", {
                    get: function () {
                        return 'bevel';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(JointStyle, "MITER", {
                    get: function () {
                        return 'miter';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(JointStyle, "ROUND", {
                    get: function () {
                        return 'round';
                    },
                    enumerable: true,
                    configurable: true
                });
                return JointStyle;
            })();
            display.JointStyle = JointStyle;
            var BitmapData = (function () {
                function BitmapData() {
                }
                return BitmapData;
            })();
            display.BitmapData = BitmapData;
            var Bitmap = (function (_super) {
                __extends(Bitmap, _super);
                function Bitmap() {
                    _super.apply(this, arguments);
                }
                return Bitmap;
            })(DisplayObject);
            display.Bitmap = Bitmap;
            // Bulletproof: Non-standard inheritance
            var Shape = (function (_super) {
                __extends(Shape, _super);
                function Shape(root, parent) {
                    _super.call(this, root, parent);
                    this._graphics = new Graphics(this);
                }
                Object.defineProperty(Shape.prototype, "graphics", {
                    get: function () {
                        return this._graphics;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Shape;
            })(DisplayObjectContainer);
            display.Shape = Shape;
            var GraphicsTrianglePath = (function () {
                function GraphicsTrianglePath(vertices, indices, uvtData, culling) {
                    if (vertices === void 0) { vertices = null; }
                    if (indices === void 0) { indices = null; }
                    if (uvtData === void 0) { uvtData = null; }
                    if (culling === void 0) { culling = TriangleCulling.NONE; }
                    this.vertices = vertices;
                    this.indices = indices;
                    this.uvtData = uvtData;
                    this.culling = culling;
                }
                return GraphicsTrianglePath;
            })();
            display.GraphicsTrianglePath = GraphicsTrianglePath;
            var Graphics = (function () {
                function Graphics(attachedDisplayObjectContainer) {
                    this._displayObjectContainer = attachedDisplayObjectContainer;
                    this._pixiGraphics = new PIXI.Graphics();
                    attachedDisplayObjectContainer.pixiObject.addChild(this._pixiGraphics);
                }
                Graphics._bp_getSettings = function (context) {
                    return {
                        fillStyle: context.fillStyle,
                        strokeStyle: context.strokeStyle,
                        lineWidth: context.lineWidth,
                        lineJoin: context.lineJoin,
                        miterLimit: context.miterLimit,
                        font: context.font
                    };
                };
                Graphics._bp_setSettings = function (context, settings) {
                    context.fillStyle = settings.fillStyle;
                    context.strokeStyle = settings.strokeStyle;
                    context.lineWidth = settings.lineWidth;
                    context.lineJoin = settings.lineJoin;
                    context.miterLimit = settings.miterLimit;
                    context.font = settings.font;
                };
                Graphics.prototype.beginBitmapFill = function (bitmap, matrix, repeat, smooth) {
                    if (matrix === void 0) { matrix = null; }
                    if (repeat === void 0) { repeat = false; }
                    if (smooth === void 0) { smooth = false; }
                    throw new NotImplementedError();
                };
                Graphics.prototype.beginFill = function (color, alpha) {
                    if (alpha === void 0) { alpha = 1.0; }
                    this._pixiGraphics.beginFill(color, alpha);
                };
                Graphics.prototype.beginGradientFill = function (type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio) {
                    if (matrix === void 0) { matrix = null; }
                    if (spreadMethod === void 0) { spreadMethod = SpreadMethod.PAD; }
                    if (interpolationMethod === void 0) { interpolationMethod = InterpolationMethod.RGB; }
                    if (focalPointRatio === void 0) { focalPointRatio = 0; }
                    throw new NotImplementedError();
                };
                Graphics.prototype.beginShaderFill = function (shader, matrix) {
                    if (matrix === void 0) { matrix = null; }
                    throw new NotImplementedError();
                };
                Graphics.prototype.clear = function () {
                    this._pixiGraphics.clear();
                };
                Graphics.prototype.copyFrom = function (sourceGraphics) {
                    throw new NotImplementedError();
                };
                Graphics.prototype.curveTo = function (controlX, controlY, anchorX, anchorY) {
                    this._pixiGraphics.quadraticCurveTo(controlX, controlY, anchorX, anchorY);
                };
                Graphics.prototype.drawCircle = function (x, y, radius) {
                    this._pixiGraphics.drawCircle(x, y, radius);
                };
                Graphics.prototype.drawEllipse = function (x, y, width, height) {
                    this._pixiGraphics.drawEllipse(x, y, width, height);
                };
                Graphics.prototype.drawGraphicsData = function (graphicsData) {
                    throw new NotImplementedError();
                };
                /**
                 *
                 * @param commands
                 * @param data
                 * @param winding
                 * @param checkCommands Bulletproof
                 */
                Graphics.prototype.drawPath = function (commands, data, winding, checkCommands) {
                    if (winding === void 0) { winding = GraphicsPathWinding.EVEN_ODD; }
                    if (checkCommands === void 0) { checkCommands = true; }
                    if (checkCommands && !Graphics._bp_checkPathCommands(commands, data)) {
                        return;
                    }
                    var commandLength = commands.length;
                    var j = 0;
                    for (var i = 0; i < commandLength; i++) {
                        switch (commands[i]) {
                            case GraphicsPathCommand.CUBIC_CURVE_TO:
                                this._pixiGraphics.bezierCurveTo(data[j], data[j + 1], data[j + 2], data[j + 3], data[j + 4], data[j + 5]);
                                j += 6;
                                break;
                            case GraphicsPathCommand.CURVE_TO:
                                this._pixiGraphics.quadraticCurveTo(data[j], data[j + 1], data[j + 2], data[j + 3]);
                                j += 4;
                                break;
                            case GraphicsPathCommand.LINE_TO:
                                // HACK: please update the x and y properties
                                //context.lineTo(data[j] + this._displayObject.x, data[j + 1] + this._displayObject.y);
                                this._pixiGraphics.lineTo(data[j], data[j + 1]);
                                j += 2;
                                break;
                            case GraphicsPathCommand.MOVE_TO:
                                // HACK: please update the x and y properties
                                //context.moveTo(data[j] + this._displayObject.x, data[j + 1] + this._displayObject.y);
                                this._pixiGraphics.moveTo(data[j], data[j + 1]);
                                j += 2;
                                break;
                            case GraphicsPathCommand.NO_OP:
                                break;
                            case GraphicsPathCommand.WIDE_LINE_TO:
                                this._pixiGraphics.lineTo(data[j + 2], data[j + 3]);
                                j += 4;
                                break;
                            case GraphicsPathCommand.WIDE_MOVE_TO:
                                this._pixiGraphics.moveTo(data[j + 2], data[j + 3]);
                                j += 4;
                                break;
                            default:
                                break;
                        }
                    }
                };
                Graphics._bp_checkPathCommands = function (commands, data) {
                    if (commands == null || data == null || data.length % 2 != 0) {
                        return false;
                    }
                    var commandLength = commands.length;
                    var dataLength = data.length;
                    for (var i = 0; i < commandLength; i++) {
                        switch (commands[i]) {
                            case GraphicsPathCommand.CUBIC_CURVE_TO:
                                dataLength -= 2 * 3;
                                if (dataLength < 0) {
                                    return false;
                                }
                                break;
                            case GraphicsPathCommand.CURVE_TO:
                                dataLength -= 2 * 2;
                                if (dataLength < 0) {
                                    return false;
                                }
                                break;
                            case GraphicsPathCommand.LINE_TO:
                                dataLength -= 2 * 1;
                                if (dataLength < 0) {
                                    return false;
                                }
                                break;
                            case GraphicsPathCommand.MOVE_TO:
                                dataLength -= 2 * 1;
                                if (dataLength < 0) {
                                    return false;
                                }
                                break;
                            case GraphicsPathCommand.NO_OP:
                                break;
                            case GraphicsPathCommand.WIDE_LINE_TO:
                                dataLength -= 2 * 2;
                                if (dataLength < 0) {
                                    return false;
                                }
                                break;
                            case GraphicsPathCommand.WIDE_MOVE_TO:
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
                };
                Graphics.prototype.drawRect = function (x, y, width, height) {
                    this._pixiGraphics.drawRect(x, y, width, height);
                };
                Graphics.prototype.drawRoundRect = function (x, y, width, height, ellipseWidth, ellipseHeight) {
                    if (ellipseHeight === void 0) { ellipseHeight = NaN; }
                    if (ellipseHeight === NaN) {
                        ellipseHeight = ellipseWidth;
                    }
                    this._pixiGraphics.drawRoundedRect(x, y, width, height, (ellipseWidth + ellipseHeight) / 2);
                };
                Graphics.prototype.drawTriangles = function (vectors, indices, uvtData, culling) {
                    if (indices === void 0) { indices = null; }
                    if (uvtData === void 0) { uvtData = null; }
                    if (culling === void 0) { culling = TriangleCulling.NONE; }
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
                        mic.trace("Graphics.drawTriangles malformed indices count. Must be multiple of 3.", "err");
                        return;
                    }
                    /** Do culling of triangles here to lessen work later **/
                    if (culling !== TriangleCulling.NONE) {
                        for (var i = 0; i < indices.length / 3; i++) {
                            var ux = vectors[2 * indices[i * 3 + 1]] - vectors[2 * indices[i * 3]], uy = vectors[2 * indices[i * 3 + 1] + 1] - vectors[2 * indices[i * 3] + 1], vx = vectors[2 * indices[i * 3 + 2]] - vectors[2 * indices[i * 3 + 1]], vy = vectors[2 * indices[i * 3 + 2] + 1] - vectors[2 * indices[i * 3 + 1] + 1];
                            var zcomp = ux * vy - vx * uy;
                            if (zcomp < 0 && culling === TriangleCulling.POSITIVE || zcomp > 0 && culling === TriangleCulling.NEGATIVE) {
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
                    // 已经有 this._displayObject._bp_invalidate(); 了
                    // 历史记录由 drawPath() 代为完成
                    this.drawPath(commands, data, void (0), false);
                };
                Graphics.prototype.endFill = function () {
                    this._pixiGraphics.endFill();
                };
                Graphics.prototype.lineBitmapStyle = function (bitmap, matrix, repeat, smooth) {
                    if (matrix === void 0) { matrix = null; }
                    if (repeat === void 0) { repeat = true; }
                    if (smooth === void 0) { smooth = false; }
                    throw new NotImplementedError();
                };
                Graphics.prototype.lineGradientStyle = function (type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio) {
                    if (matrix === void 0) { matrix = null; }
                    if (spreadMethod === void 0) { spreadMethod = SpreadMethod.PAD; }
                    if (interpolationMethod === void 0) { interpolationMethod = InterpolationMethod.RGB; }
                    if (focalPointRatio === void 0) { focalPointRatio = 0; }
                    throw new NotImplementedError();
                };
                Graphics.prototype.lineShaderStyle = function (shader, matrix) {
                    if (matrix === void 0) { matrix = null; }
                    throw new NotImplementedError();
                };
                Graphics.prototype.lineStyle = function (thickness, color, alpha, pixelHinting, scaleMode, caps, joints, miterLimit) {
                    if (thickness === void 0) { thickness = NaN; }
                    if (color === void 0) { color = 0; }
                    if (alpha === void 0) { alpha = 1.0; }
                    if (pixelHinting === void 0) { pixelHinting = false; }
                    if (scaleMode === void 0) { scaleMode = LineScaleMode.NORMAL; }
                    if (caps === void 0) { caps = null; }
                    if (joints === void 0) { joints = null; }
                    if (miterLimit === void 0) { miterLimit = 3; }
                    this._pixiGraphics.lineStyle(thickness, color, alpha);
                };
                Graphics.prototype.lineTo = function (x, y) {
                    this._pixiGraphics.lineTo(x, y);
                };
                Graphics.prototype.moveTo = function (x, y) {
                    this._pixiGraphics.moveTo(x, y);
                };
                Graphics._bp_defaultGraphicsSettings = {
                    fillStyle: "#000000",
                    strokeStyle: "#000000",
                    lineWidth: 1,
                    lineJoin: JointStyle.MITER,
                    miterLimit: 10,
                    font: "10px sans-serif"
                };
                return Graphics;
            })();
            display.Graphics = Graphics;
            var LoaderInfo = (function () {
                function LoaderInfo() {
                }
                Object.defineProperty(LoaderInfo.prototype, "actionScriptVersion", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LoaderInfo.prototype, "applicationDomain", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LoaderInfo.prototype, "bytes", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LoaderInfo.prototype, "bytesLoaded", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LoaderInfo.prototype, "bytesTotal", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LoaderInfo.prototype, "childAllowsParent", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LoaderInfo.prototype, "content", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LoaderInfo.prototype, "contentType", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LoaderInfo.prototype, "frameRate", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LoaderInfo.prototype, "height", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LoaderInfo.prototype, "isURLInaccessible", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LoaderInfo.prototype, "loader", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LoaderInfo.prototype, "loaderURL", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LoaderInfo.prototype, "parameters", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LoaderInfo.prototype, "parentAllowsChild", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LoaderInfo.prototype, "sameDomain", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LoaderInfo.prototype, "sharedEvents", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LoaderInfo.prototype, "swfVersion", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LoaderInfo.prototype, "uncaughtErrorEvents", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LoaderInfo.prototype, "url", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LoaderInfo.prototype, "width", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                LoaderInfo.getLoaderInfoByDefinition = function (object) {
                    throw new NotImplementedError();
                };
                return LoaderInfo;
            })();
            display.LoaderInfo = LoaderInfo;
            var Shader = (function () {
                function Shader(code) {
                    if (code === void 0) { code = null; }
                    this.byteCode = code;
                }
                Object.defineProperty(Shader.prototype, "byteCode", {
                    set: function (v) {
                        this._byteCode = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Shader;
            })();
            display.Shader = Shader;
            var ShaderData = (function () {
                function ShaderData(byteCode) {
                    throw new NotImplementedError();
                }
                return ShaderData;
            })();
            display.ShaderData = ShaderData;
            var ShaderPrecision = (function () {
                function ShaderPrecision() {
                }
                Object.defineProperty(ShaderPrecision, "FAST", {
                    get: function () {
                        return 'fast';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ShaderPrecision, "FULL", {
                    get: function () {
                        return 'full';
                    },
                    enumerable: true,
                    configurable: true
                });
                return ShaderPrecision;
            })();
            display.ShaderPrecision = ShaderPrecision;
            var BlendMode = (function () {
                function BlendMode() {
                }
                Object.defineProperty(BlendMode, "ADD", {
                    get: function () {
                        return 'add';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BlendMode, "ALPHA", {
                    get: function () {
                        return 'alpha';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BlendMode, "DARKEN", {
                    get: function () {
                        return 'darken';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BlendMode, "DIFFERENCE", {
                    get: function () {
                        return 'difference';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BlendMode, "ERASE", {
                    get: function () {
                        return 'erase';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BlendMode, "HARDLIGHT", {
                    get: function () {
                        return 'hardlight';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BlendMode, "INVERT", {
                    get: function () {
                        return 'invert';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BlendMode, "LAYER", {
                    get: function () {
                        return 'layer';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BlendMode, "LIGHTEN", {
                    get: function () {
                        return 'lighten';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BlendMode, "MULTIPLY", {
                    get: function () {
                        return 'multiply';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BlendMode, "NORMAL", {
                    get: function () {
                        return 'normal';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BlendMode, "OVERLAY", {
                    get: function () {
                        return 'overlay';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BlendMode, "SCREEN", {
                    get: function () {
                        return 'screen';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BlendMode, "SHADER", {
                    get: function () {
                        return 'shader';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BlendMode, "SUBTRACT", {
                    get: function () {
                        return 'subtract';
                    },
                    enumerable: true,
                    configurable: true
                });
                return BlendMode;
            })();
            display.BlendMode = BlendMode;
        })(display = flash.display || (flash.display = {}));
        var utils;
        (function (utils) {
            var events = bulletproof.flash.events;
            /**
             * 这个类的实现和 ActionScript 内的很不一样。考虑到我们选用的环境，我们应该使用 JavaScript 的方式实现此类。
             * 所以我们不支持事件回调之类的东西，用 JavaScript 自带的 setInterval() 解决。
             */
            var Timer = (function (_super) {
                __extends(Timer, _super);
                function Timer(delay, repeatCount) {
                    if (repeatCount === void 0) { repeatCount = 0; }
                    _super.call(this);
                    this._currentCount = 0;
                    this._delay = 1000;
                    this._repeatCount = 0;
                    this._running = false;
                    this._handle = 0;
                    this.enabled = true;
                    this.delay = delay;
                    this.repeatCount = repeatCount;
                    this._handle = 0;
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
                Timer.prototype._bp_timerCallbackInternal = function () {
                };
                Timer.prototype._bp_timerCallback = function () {
                    if (this.enabled) {
                        this._currentCount++;
                        if (this.repeatCount > 0 && this.currentCount > this.repeatCount) {
                            this.stop();
                        }
                        else {
                            this._bp_timerCallbackInternal();
                        }
                    }
                };
                Timer.prototype.reset = function () {
                    if (this.running) {
                        clearInterval(this._handle);
                        this._handle = 0;
                        this._running = false;
                        this._currentCount = 0;
                    }
                };
                Timer.prototype.start = function () {
                    if (!this.running && (this.currentCount < this.repeatCount || this.repeatCount == 0)) {
                        // this 参数很关键
                        // 因为在 setInterval() 执行的函数中，this 指向了全局对象（window/Node上下文）
                        // 因此应该重设 this
                        // 可以通过 bind()，也可以通过 setInterval() 的附加参数
                        // 这里为了效率，使用 bind()（... 会导致循环展开 arguments）
                        this._handle = setInterval(this._bp_timerCallback.bind(this), this.delay);
                        this._running = true;
                    }
                };
                Timer.prototype.stop = function () {
                    if (this.running) {
                        clearInterval(this._handle);
                        this._handle = 0;
                        this._running = false;
                    }
                };
                return Timer;
            })(events.EventDispatcher);
            utils.Timer = Timer;
            var ByteArray = (function () {
                function ByteArray() {
                }
                return ByteArray;
            })();
            utils.ByteArray = ByteArray;
        })(utils = flash.utils || (flash.utils = {}));
        var accessibility;
        (function (accessibility) {
            var AccessibilityProperties = (function () {
                function AccessibilityProperties() {
                    this.description = '';
                    this.forceSimple = false;
                    this.name = '';
                    this.noAutoLabeling = false;
                    this.shortcut = '';
                    this.silent = false;
                }
                return AccessibilityProperties;
            })();
            accessibility.AccessibilityProperties = AccessibilityProperties;
            var AccessibilityImplementation = (function () {
                function AccessibilityImplementation() {
                }
                return AccessibilityImplementation;
            })();
            accessibility.AccessibilityImplementation = AccessibilityImplementation;
        })(accessibility = flash.accessibility || (flash.accessibility = {}));
        var media;
        (function (media) {
            var events = bulletproof.flash.events;
            var StageVideo = (function () {
                function StageVideo() {
                }
                Object.defineProperty(StageVideo.prototype, "colorSpaces", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StageVideo.prototype, "videoHeight", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StageVideo.prototype, "videoWidth", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                StageVideo.prototype.attachNetStream = function (netStream) {
                    throw new NotImplementedError();
                };
                return StageVideo;
            })();
            media.StageVideo = StageVideo;
            var Sound = (function (_super) {
                __extends(Sound, _super);
                function Sound() {
                    _super.apply(this, arguments);
                }
                return Sound;
            })(events.EventDispatcher);
            media.Sound = Sound;
        })(media = flash.media || (flash.media = {}));
        var net;
        (function (net) {
            var NetStream = (function () {
                function NetStream() {
                }
                return NetStream;
            })();
            net.NetStream = NetStream;
        })(net = flash.net || (flash.net = {}));
        var system;
        (function (system) {
            var ApplicationDomain = (function () {
                function ApplicationDomain() {
                }
                Object.defineProperty(ApplicationDomain, "currentDomain", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ApplicationDomain, "MIN_DOMAIN_MEMORY_LENGTH", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ApplicationDomain.prototype, "parentDomain", {
                    get: function () {
                        throw new NotImplementedError();
                    },
                    enumerable: true,
                    configurable: true
                });
                return ApplicationDomain;
            })();
            system.ApplicationDomain = ApplicationDomain;
        })(system = flash.system || (flash.system = {}));
    })(flash = bulletproof.flash || (bulletproof.flash = {}));
})(bulletproof = exports.bulletproof || (exports.bulletproof = {}));
//# sourceMappingURL=bulletproof-flash.js.map