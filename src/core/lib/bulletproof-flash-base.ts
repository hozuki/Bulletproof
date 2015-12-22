/**
 * Created by MIC on 2015/8/27.
 */

import bulletproof_org = require("./bulletproof-org");
import bulletproof_mic = require("./bulletproof-mic");
import bulletproof_thirdparty = require("./bulletproof-thirdparty");

export module bulletproof.flash {

    import mic = bulletproof_mic.bulletproof.mic;
    import thirdparty = bulletproof_thirdparty.bulletproof.thirdparty;

    import ICloneable = bulletproof_org.bulletproof.ICloneable;
    import ICopyable = bulletproof_org.bulletproof.ICopyable;
    import NotImplementedError = bulletproof_org.bulletproof.NotImplementedError;
    import ArgumentError = bulletproof_org.bulletproof.ArgumentError;
    import OMap = bulletproof_org.bulletproof.OMap;

    export module events {

        import EventClass = bulletproof_org.bulletproof.EventClass;

        interface IEventDispatcher extends EventTarget {

            hasEventListener(type:string):boolean;
            willTrigger(type:string):boolean;

        }

        export class EventDispatcher implements IEventDispatcher {

            private _listeners:OMap<string, Array<EventListener>>;

            public constructor() {
                this._listeners = new OMap<string, Array<EventListener>>();
            }

            public addEventListener(type:string, listener:EventListener, useCapture?:boolean):void {
                // jabbany
                if (!this._listeners.has(type)) {
                    this._listeners.set(type, []);
                }
                this._listeners.get(type).push(listener);
            }

            public dispatchEvent(event:Event, data?:any):boolean {
                // jabbany
                if (this._listeners.has(event.type) && this._listeners.get(event.type) != null) {
                    var arr = this._listeners.get(event.type);
                    for (var i = 0; i < arr.length; i++) {
                        try {
                            arr[i](data);
                        } catch (ex) {
                            if (ex.hasOwnProperty('stack')) {
                                mic.trace(ex.stack.toString(), 'dispatchEvent: error');
                            } else {
                                mic.trace(ex.toString(), 'dispatchEvent: error');
                            }
                        }
                    }
                    return true;
                } else {
                    return false;
                }
            }

            public hasEventListener(type:string):boolean {
                return this._listeners.has(type);
            }

            public removeEventListener(type:string, listener:EventListener, useCapture?:boolean):void {
                // jabbany
                if (!this._listeners.has(type) || this._listeners.get(type).length == 0) {
                    return;
                }
                var index = this._listeners.get(type).indexOf(listener);
                if (index >= 0) {
                    this._listeners.get(type).splice(index, 1);
                }
            }

            public willTrigger(type:string):boolean {
                return this._listeners.has(type) && this._listeners.get(type).length > 0;
            }

        }

        export class UncaughtErrorEvents extends EventDispatcher {

            public constructor() {
                super();
            }

        }

        export class FlashEvent extends EventClass {

            public static get ACTIVATE():string {
                return 'activate';
            }

            public static get ADDED():string {
                return 'added';
            }

            public static get ADDED_TO_STAGE():string {
                return 'addedToStage';
            }

            public static get BROWSER_ZOOM_CHANGE():string {
                return 'browserZoomChange';
            }

            public static get CANCEL():string {
                return 'cancel';
            }

            public static get CHANGE():string {
                return 'change';
            }

            public static get CLEAR():string {
                return 'clear';
            }

            public static get CLOSE():string {
                return 'close';
            }

            public static get CLOSING():string {
                return 'closing';
            }

            public static get COMPLETE():string {
                return 'complete';
            }

            public static get CONNECT():string {
                return 'connect';
            }

            public static get COPY():string {
                return 'copy';
            }

            public static get CUT():string {
                return 'cut';
            }

            public static get DEACTIVATE():string {
                return 'deactivate';
            }

            public static get DISPLAYING():string {
                return 'displaying';
            }

            public static get ENTER_FRAME():string {
                return 'enterFrame';
            }

            public static get EXIT_FRAME():string {
                return 'exitFrame';
            }

            public static get EXITING():string {
                return 'exiting';
            }

            public static get FRAME_CONSTRUCTED():string {
                return 'frameConstructed';
            }

            public static get FULLSCREEN():string {
                return 'fullScreen';
            }

            public static get HTML_BOUNDS_CHANGE():string {
                return 'htmlBoundsChange';
            }

            public static get HTML_DOM_INITIALIZE():string {
                return 'htmlDOMInitialize';
            }

            public static get HTML_RENDER():string {
                return 'htmlRender';
            }

            public static get ID3():string {
                return 'id3';
            }

            public static get INIT():string {
                return 'init';
            }

            public static get LOCATION_CHANGE():string {
                return 'locationChange';
            }

            public static get MOUSE_LEAVE():string {
                return 'mouseLeave';
            }

            public static get NETWORK_CHANGE():string {
                return 'networkChange';
            }

            public static get OPEN():string {
                return 'open';
            }

            public static get PASTE():string {
                return 'paste';
            }

            public static get REMOVED():string {
                return 'removed';
            }

            public static get REMOVED_FROM_STAGE():string {
                return 'removedFromStage';
            }

            public static get RENDER():string {
                return 'render';
            }

            public static get RESIZE():string {
                return 'resize';
            }

            public static get SCROLL():string {
                return 'scroll';
            }

            public static get SELECT():string {
                return 'select';
            }

            public static get SELECT_ALL():string {
                return 'selectAll';
            }

            public static get SOUND_COMPLETE():string {
                return 'soundComplete';
            }

            public static get STANDARD_ERROR_CLOSE():string {
                return 'standardErrorClose';
            }

            public static get STANDARD_INPUT_CLOSE():string {
                return 'standardInputClose';
            }

            public static get STANDARD_OUTPUT_CLOSE():string {
                return 'standardOutputClose';
            }

            public static get TAB_CHILDREN_CHANGE():string {
                return 'tabChildrenChange';
            }

            public static get TAB_ENABLED_CHANGE():string {
                return 'tabEnabledChange';
            }

            public static get TAB_INDEX_CHANGE():string {
                return 'tabIndexChange';
            }

            public static get TEXT_INTERACTION_MODE_CHANGE():string {
                return 'textInteractionModeChange';
            }

            public static get UNLOAD():string {
                return 'unload';
            }

            public static get USER_IDLE():string {
                return 'userIdle';
            }

            public static get USER_PRESENT():string {
                return 'userPresent';
            }

        }

        export class TimerEvent extends FlashEvent implements ICloneable<TimerEvent> {

            public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false) {
                super(type, bubbles, cancelable);
            }

            public static get TIMER():string {
                return 'timer';
            }

            public static get TIMER_COMPLETE():string {
                return 'timerComplete';
            }

            public updateAfterEvent():void {
                throw new NotImplementedError();
            }

            public clone():TimerEvent {
                throw new NotImplementedError();
            }

        }

        export class UncaughtErrorEvent extends FlashEvent implements ICloneable<UncaughtErrorEvent> {

            public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false) {
                super(type, bubbles, cancelable);
            }

            public static get UNCAUGHT_ERROR():string {
                return 'uncaughtError';
            }

            public clone():UncaughtErrorEvent {
                throw new NotImplementedError();
            }

        }

        export class ActivityEvent extends FlashEvent implements ICloneable<ActivityEvent> {

            private _activating:boolean;

            public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, activating:boolean = false) {
                super(type, bubbles, cancelable);
                this._activating = activating;
            }

            public clone():ActivityEvent {
                throw new NotImplementedError();
            }

            public static get ACTIVITY():string {
                return 'activity';
            }

        }

        export class FullScreenEvent extends ActivityEvent implements ICloneable<FullScreenEvent> {

            private _fullScreen:boolean;
            private _interactive:boolean;

            public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, fullScreen:boolean = false, interactive:boolean = false) {
                super(type, bubbles, cancelable, true);
                this._fullScreen = fullScreen;
                this._interactive = interactive;
                throw new NotImplementedError();
            }

            public clone():FullScreenEvent {
                throw new NotImplementedError();
            }

            public static get FULL_SCREEN():string {
                return 'fullScreen';
            }

            public static get FULL_SCREEN_INTERACTIVE_ACCEPTED():string {
                return 'fullScreenInteractiveAccepted';
            }

        }

        export class StageVideoEvent extends FlashEvent implements ICloneable<StageVideoEvent> {

            private _colorSpace:string;
            private _status:string;

            public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, status:string = null, colorSpace:string = null) {
                super(type, bubbles, cancelable);
                this._colorSpace = colorSpace;
                this._status = status;
            }

            public get colorSpace():string {
                return this._colorSpace;
            }

            public get status():string {
                return this._status;
            }

            public static get codecInfo():string {
                // Is doc wrong here?
                throw new NotImplementedError();
            }

            public clone():StageVideoEvent {
                throw new NotImplementedError();
            }

        }

    }

    export module geom {

        export class Point implements ICloneable<Point>, ICopyable<Point> {

            public x:number;
            public y:number;

            public get length():number {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            }

            public constructor(x:number = 0, y:number = 0) {
                this.x = x;
                this.y = y;
            }

            public add(v:Point):Point {
                return new Point(this.x + v.x, this.y + v.y);
            }

            public clone():Point {
                return new Point(this.x, this.y);
            }

            public copyFrom(sourcePoint:Point):void {
                this.x = sourcePoint.x;
                this.y = sourcePoint.y;
            }

            public static distance(pt1:Point, pt2:Point):number {
                return Math.sqrt((pt1.x - pt2.x) * (pt1.x - pt2.x) + (pt1.y - pt2.y) * (pt1.y - pt2.y));
            }

            public equals(toCompare:Point):boolean {
                return this.x == toCompare.x && this.y == toCompare.y;
            }

            public static interpolate(pt1:Point, pt2:Point, f:number):Point {
                f = mic.util.limit(f, 0, 1);
                return new Point(pt1.x * f + pt2.x * (1 - f), pt1.y * f + pt2.y * (1 - f));
            }

            public normalize(thickness:number):void {
                var len = this.length;
                if (len > 0) {
                    this.x *= thickness / len;
                    this.y *= thickness / len;
                }
            }

            public offset(dx:number, dy:number):void {
                this.x += dx;
                this.y += dy;
            }

            public static polar(len:number, angle:number):Point {
                return new Point(len * Math.cos(angle), len * Math.sin(angle));
            }

            public setTo(xa:number, ya:number):void {
                this.x = xa;
                this.y = ya;
            }

            public subtract(v:Point):Point {
                return new Point(this.x - v.x, this.y - v.y);
            }

            public toString():string {
                return mic.util.format('(x={0}, y={1})', this.x, this.y);
            }

        }

        export class Rectangle implements ICloneable<Rectangle>, ICopyable<Rectangle> {

            private _x:number;
            private _y:number;
            private _w:number;
            private _h:number;

            public constructor(x:number = 0, y:number = 0, width:number = 0, height:number = 0) {
                this._x = x >= 0 ? x : 0;
                this._y = y >= 0 ? y : 0;
                this._w = width >= 0 ? width : 0;
                this._h = height >= 0 ? height : 0;
            }

            public get bottom():number {
                return this._y + this._h;
            }

            public set bottom(v:number) {
                if (v < this._y) {
                    v = this._y;
                }
                this._h = v - this._y;
            }

            public get bottomRight():Point {
                return new Point(this._x + this._w, this._y + this._h);
            }

            public set bottomRight(v:Point) {
                this.right = v.x;
                this.bottom = v.y;
            }

            public get height():number {
                return this._h;
            }

            public set height(v:number) {
                this._h = v >= 0 ? v : 0;
            }

            public get left():number {
                return this._x;
            }

            public set left(v:number) {
                if (v > this._x + this._w) {
                    v = this._x + this._w;
                }
                this._w = this._x + this._w - v;
                this._x = v;
            }

            public get right():number {
                return this._x + this._w;
            }

            public set right(v:number) {
                if (v < this._x) {
                    v = this._x;
                }
                this._w = v - this._x;
            }

            public get size():Point {
                return new Point(this._w, this._h);
            }

            public set size(v:Point) {
                this._w = v.x;
                this._h = v.y;
            }

            public get top():number {
                return this._y;
            }

            public set top(v:number) {
                if (v > this._y + this._h) {
                    v = this._y + this._h;
                }
                this._h = this._y + this._h - v;
                this._y = v;
            }

            public get topLeft():Point {
                return new Point(this._x, this._y);
            }

            public set topLeft(v:Point) {
                this.left = v.x;
                this.top = v.y;
            }

            public get width():number {
                return this._w;
            }

            public set width(v:number) {
                this._w = v >= 0 ? v : 0;
            }

            public get x():number {
                return this._x;
            }

            public set x(v:number) {
                this._x = v;
            }

            public get y():number {
                return this._y;
            }

            public set y(v:number) {
                this._y = v;
            }

            public clone():Rectangle {
                return new Rectangle(this._x, this._y, this._w, this._h);
            }

            public contains(x:number, y:number):boolean {
                return this.left <= x && x <= this.right && this.top <= y && y <= this.bottom;
            }

            public containsPoint(point:Point):boolean {
                return this.contains(point.x, point.y);
            }

            public containsRect(rect:Rectangle):boolean {
                return this.containsPoint(rect.topLeft) && this.containsPoint(rect.bottomRight);
            }

            public copyFrom(sourceRect:Rectangle):void {
                this._x = sourceRect._x;
                this._y = sourceRect._y;
                this._w = sourceRect._w;
                this._h = sourceRect._h;
            }

            public equals(toCompare:Rectangle):boolean {
                return this._x == toCompare._x && this._y == toCompare._y && this._w == toCompare._w && this._h == toCompare._h;
            }

            public inflate(dx:number, dy:number):void {
                // TODO: bug when dx or dy is less than 0
                this.x -= dx;
                this.width += dx + dx;
                this.y -= dy;
                this.height += dy + dy;
            }

            public inflatePoint(point:Point):void {
                this.inflate(point.x, point.y);
            }

            public intersection(toIntersect:Rectangle):Rectangle {
                var x:number, y:number, w:number, h:number;
                var rect1:Rectangle, rect2:Rectangle;
                if (this.left < toIntersect.left) {
                    rect1 = this;
                    rect2 = toIntersect;
                } else {
                    rect1 = toIntersect;
                    rect2 = this;
                }
                if (rect1.right < rect2.left) {
                    return new Rectangle(); // 不相交
                } else {
                    x = rect2.left;
                    w = Math.min(rect1.right, rect2.right) - x;
                }
                if (this.top < toIntersect.top) {
                    rect1 = this;
                    rect2 = toIntersect;
                } else {
                    rect1 = toIntersect;
                    rect2 = this;
                }
                if (rect1.bottom < rect2.top) {
                    return new Rectangle(); // 不相交
                } else {
                    y = rect2.top;
                    h = Math.min(rect1.bottom, rect2.bottom) - y;
                }
                return new Rectangle(x, y, w, h);
            }

            public intersects(toIntersect:Rectangle):boolean {
                var rect1:Rectangle, rect2:Rectangle;
                if (this.left < toIntersect.left) {
                    rect1 = this;
                    rect2 = toIntersect;
                } else {
                    rect1 = toIntersect;
                    rect2 = this;
                }
                if (rect1.right < rect2.left) {
                    return false;
                }
                if (this.top < toIntersect.top) {
                    rect1 = this;
                    rect2 = toIntersect;
                } else {
                    rect1 = toIntersect;
                    rect2 = this;
                }
                if (rect1.bottom < rect2.top) {
                    return false;
                }
                return true;
            }

            public isEmpty():boolean {
                return this._w <= 0 || this._h <= 0;
            }

            public offset(dx:number, dy:number):void {
                this.x += dx;
                this.y += dy;
            }

            public offsetPoint(point:Point):void {
                this.offset(point.x, point.y);
            }

            public setEmpty():void {
                this._x = this._y = this._w = this._h = 0;
            }

            public setTo(xa:number, ya:number, widtha:number, heighta:number):void {
                this.x = xa;
                this.y = ya;
                this.width = widtha;
                this.height = heighta;
            }

            public toString():string {
                return mic.util.format('{X={0}, Y={1}, Width={2}, Height={3}}', this.x, this.y, this.width, this.height);
            }

            public union(toUnion:Rectangle):Rectangle {
                var x = Math.min(this.x, toUnion.x);
                var y = Math.min(this.y, toUnion.y);
                var r = Math.max(this.right, toUnion.right);
                var b = Math.max(this.bottom, toUnion.bottom);
                return new Rectangle(x, y, r - x, b - y);
            }

        }

        export class Vector3D implements ICloneable<Vector3D>, ICopyable<Vector3D> {

            public static get X_AXIS():Vector3D {
                return new Vector3D(1, 0, 0);
            }

            public static get Y_AXIS():Vector3D {
                return new Vector3D(0, 1, 0);
            }

            public static get Z_AXIS():Vector3D {
                return new Vector3D(0, 0, 1);
            }

            public static get ORIGIN():Vector3D {
                return new Vector3D(0, 0, 0);
            }

            public w:number;
            public x:number;
            public y:number;
            public z:number;

            public get length():number {
                return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
            }

            public get lengthSquared():number {
                return this.x * this.x + this.y * this.y + this.z * this.z;
            }

            public constructor(x:number = 0, y:number = 0, z:number = 0, w:number = 0) {
                this.x = x;
                this.y = y;
                this.z = z;
                this.w = w;
            }

            public add(a:Vector3D):Vector3D {
                return new Vector3D(this.x + a.x, this.y + a.y, this.z + a.z, this.w);
            }

            public static angleBetween(a:Vector3D, b:Vector3D):number {
                var vnom = a.x * b.x + a.y * b.y + a.z * b.z;
                var denom = a.length * b.length;
                var val = Math.sqrt(vnom * vnom / denom);
                return Math.acos(val);
            }

            public clone():Vector3D {
                return new Vector3D(this.x, this.y, this.z, this.w);
            }

            public copyFrom(a:Vector3D):void {
                this.x = a.x;
                this.y = a.y;
                this.z = a.z;
                this.w = a.w;
            }

            public crossProduct(a:Vector3D):Vector3D {
                var i = this.y * a.z - this.z * a.y;
                var j = this.z * a.x - this.x * a.z;
                var k = this.x * a.y - this.y * a.x;
                return new Vector3D(i, j, k, this.w);
            }

            public decrementBy(a:Vector3D):void {
                this.x -= a.x;
                this.y -= a.y;
                this.z -= a.z;
            }

            public static distance(pt1:Vector3D, pt2:Vector3D):number {
                return Math.sqrt((pt1.x - pt2.x) * (pt1.x - pt2.x) + (pt1.y - pt2.y) * (pt1.y - pt2.y) + (pt1.z - pt2.z) * (pt1.z - pt2.z));
            }

            public dotProduct(a:Vector3D):number {
                return this.x * a.x + this.y * a.y + this.z * a.z;
            }

            public equals(toCompare:Vector3D, allFour:boolean = false):boolean {
                return this.x == toCompare.x && this.y == toCompare.y && this.z == toCompare.y && !(allFour && this.w != toCompare.w);
            }

            public incrementBy(a:Vector3D):void {
                this.x += a.x;
                this.y += a.y;
                this.z += a.z;
            }

            public nearEquals(toCompare:Vector3D, tolerance:number, allFour:boolean = false):boolean {
                return mic.util.valueBetweenNE(this.x, toCompare.x - tolerance, toCompare.x + tolerance) && mic.util.valueBetweenNE(this.y, toCompare.y - tolerance, toCompare.y + tolerance) &&
                    mic.util.valueBetweenNE(this.z, toCompare.z - tolerance, toCompare.z + tolerance) && !(allFour && !mic.util.valueBetweenNE(this.w, toCompare.w - tolerance, toCompare.w + tolerance));
            }

            public negate():void {
                this.x = -this.x;
                this.y = -this.y;
                this.z = -this.z;
            }

            public normalize():number {
                var len = this.length;
                if (len > 0) {
                    this.x /= len;
                    this.y /= len;
                    this.z /= len;
                }
                return len;
            }

            public project():void {
                if (this.w != null && this.w != 0) {
                    this.x /= this.w;
                    this.y /= this.w;
                    this.z /= this.w;
                }
            }

            public scaleBy(s:number):void {
                this.x *= s;
                this.y *= s;
                this.z *= s;
            }

            public setTo(xa:number, ya:number, za:number):void {
                this.x = xa;
                this.y = ya;
                this.z = za;
            }

            public subtract(a:Vector3D):Vector3D {
                return new Vector3D(this.x - a.x, this.y - a.y, this.z - a.z, this.w);
            }

            public toString():string {
                return mic.util.format('[x={0}, y={1}, z={2}]', this.x, this.y, this.z);
            }

        }

        export class Matrix implements ICloneable<Matrix>, ICopyable<Matrix> {

            private _data:Array<number>;

            public get a():number {
                return this._data[0];
            }

            public set a(v:number) {
                this._data[0] = v;
            }

            public get b():number {
                return this._data[3];
            }

            public set b(v:number) {
                this._data[3] = v;
            }

            public get c():number {
                return this._data[1];
            }

            public set c(v:number) {
                this._data[1] = v;
            }

            public get d():number {
                return this._data[4];
            }

            public set d(v:number) {
                this._data[4] = v;
            }

            public get tx():number {
                return this._data[2];
            }

            public set tx(v:number) {
                this._data[2] = v;
            }

            public get ty():number {
                return this._data[5];
            }

            public set ty(v:number) {
                this._data[5] = v;
            }

            public constructor(a:number = 1, b:number = 0, c:number = 1, d:number = 1, tx:number = 0, ty:number = 0) {
                this._data = [a, c, tx, b, d, ty, 0, 0, 1];
            }

            public clone():Matrix {
                return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
            }

            public concat(m:Matrix):void {
                this._data = Matrix.dotProduct(this._data, m._data);
            }

            public copyColumnFrom(column:number, vector3D:Vector3D):void {
                if (column < 0 || column > 2) {
                    throw new RangeError('Column must be 0, 1, or 2.');
                }
                this._data[column * 3] = vector3D.x;
                this._data[1 + column * 3] = vector3D.y;
                this._data[2 + column * 3] = vector3D.z;
            }

            public copyColumnTo(column:number, vector3D:Vector3D):void {
                if (column < 0 || column > 2) {
                    throw new RangeError('Column must be 0, 1, or 2.');
                }
                vector3D.x = this._data[column * 3];
                vector3D.y = this._data[1 + column * 3];
                vector3D.z = this._data[2 + column * 3];
            }

            public copyFrom(sourceMatrix:Matrix):void {
                this._data = sourceMatrix._data.slice();
            }

            public copyRowFrom(row:number, vector3D:Vector3D):void {
                if (row < 0 || row > 2) {
                    throw new RangeError('Row must be 0, 1, or 2.');
                }
                this._data[row] = vector3D.x;
                this._data[row + 3] = vector3D.y;
                this._data[row + 6] = vector3D.z;
            }

            public copyRowTo(row:number, vector3D:Vector3D):void {
                if (row < 0 || row > 2) {
                    throw new RangeError('Column must be 0, 1, or 2.');
                }
                vector3D.x = this._data[row];
                vector3D.y = this._data[3 + row];
                vector3D.z = this._data[6 + row];
            }

            public createBox(scaleX:number, scaleY:number, rotation:number = 0, tx:number = 0, ty:number = 0):void {
                this.identity();
                this.rotate(rotation);
                this.scale(scaleX, scaleY);
                this.translate(tx, ty);
            }

            public createGradientBox(width:number, height:number, rotation:number = 0, tx:number = 0, ty:number = 0):void {
                this.createBox(width, height, rotation, tx, ty);
            }

            public deltaTransformPoint(point:Point):Point {
                throw new NotImplementedError();
            }

            public identity():void {
                this._data = [1, 0, 0, 0, 1, 0, 0, 0, 1];
            }

            public invert():boolean {
                var invResult = mic.util.matrixInvert(this._data);
                if (invResult.canInvert) {
                    this._data = invResult.result;
                }
                return invResult.canInvert;
            }

            public rotate(angle:number):void {
                this._data = Matrix.dotProduct(this._data, [
                    Math.cos(angle), -Math.sin(angle), 0,
                    Math.sin(angle), Math.cos(angle), 0,
                    0, 0, 1
                ]);
            }

            public scale(sx:number, sy:number):void {
                this._data = Matrix.dotProduct(this._data, [
                    sx, 0, 0,
                    0, sy, 0,
                    0, 0, 1
                ]);
            }

            /**
             * Bulletproof
             * @param skewX
             * @param skewY
             */
            public skew(skewX:number, skewY:number):void {
                this._data = Matrix.dotProduct(this._data, [
                    0, Math.tan(skewX), 0,
                    Math.tan(skewY), 0, 0,
                    0, 0, 1
                ]);
            }

            public setTo(aa:number, ba:number, ca:number, da:number, txa:number, tya:number) {
                this._data = [aa, ca, txa, ba, da, tya, 0, 0, 1];
            }

            public toString():string {
                return mic.util.format('[{0} {1} 0\r\n{2} {3} 0\r\n{4} {5} 1]', this.a, this.b, this.c, this.d, this.tx, this.ty);
            }

            public transformPoint(point:Point):Point {
                // 由于 Flash 所用的矩阵是转置过的，所以这里变成了行×行
                //var pointVector = [point.x, point.y, 1];
                //var x = pointVector[0] * this._data[0] + pointVector[1] * this._data[1] + pointVector[2] * this._data[2];
                //var y = pointVector[0] * this._data[3] + pointVector[1] * this._data[4] + pointVector[2] * this._data[5];
                //return new Point(x, y);
                return new Point(point.x * this._data[0] + point.y * this._data[1] + this._data[2],
                    point.x * this._data[3] + point.y * this._data[4] + this._data[5]);
            }

            public translate(dx:number, dy:number):void {
                this.tx += dx;
                this.ty += dy;
            }

            private static dotProduct(a:Array<number>, b:Array<number>):Array<number> {
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
            }

        }

        export class Matrix3D implements ICloneable<Matrix3D>, ICopyable<Matrix3D> {

            public constructor(v:Array<number> = null) {
                if (v == null || v.length <= 0) {
                    v = [
                        1, 0, 0, 0,
                        0, 1, 0, 0,
                        0, 0, 1, 0,
                        0, 0, 0, 1
                    ];
                }
                this.rawData = v.slice();
            }

            public get determinant():number {
                // TODO: simplify this
                var invResult = mic.util.matrixInvert(this.rawData, 4);
                return invResult.determinant;
            }

            public position:Vector3D;

            public get rawData():Array<number> {
                return this._data;
            }

            public set rawData(v:Array<number>) {
                if (v.length < 16) {
                    throw new Error('Data length of Matrix3D must be no less than 16.');
                }
                this._data = v.slice();
            }

            public append(lhs:Matrix3D):void {
                this._data = Matrix3D.dotProduct(lhs._data, this._data);
            }

            public appendRotation(degrees:number, axis:Vector3D, pivotPoint:Vector3D = null):void {
                if (pivotPoint !== null) {
                    this.appendTranslation(pivotPoint.x, pivotPoint.y, pivotPoint.z);
                }
                this._data = Matrix3D.dotProduct(Matrix3D.getRotationMatrix(degrees * Math.PI / 180, axis), this._data);
                if (pivotPoint !== null) {
                    this.appendTranslation(-pivotPoint.x, -pivotPoint.y, -pivotPoint.z);
                }
            }

            public appendScale(xScale:number, yScale:number, zScale:number):void {
                this._data = Matrix3D.dotProduct([
                    xScale, 0, 0, 0,
                    0, yScale, 0, 0,
                    0, 0, zScale, 0,
                    0, 0, 0, 1
                ], this._data);
            }

            public appendTranslation(x:number, y:number, z:number):void {
                this._data = Matrix3D.dotProduct([
                    1, 0, 0, x,
                    0, 1, 0, y,
                    0, 0, 1, z,
                    0, 0, 0, 1
                ], this._data);
            }

            public clone():Matrix3D {
                return new Matrix3D(this.rawData);
            }

            public copyColumnFrom(column:number, vector3D:Vector3D):void {
                if (column < 0 || column > 3) {
                    throw new RangeError('Column must be 0, 1, 2 or 3.');
                }
                this._data[column * 4] = vector3D.x;
                this._data[column * 4 + 1] = vector3D.y;
                this._data[column * 4 + 2] = vector3D.z;
                this._data[column * 4 + 3] = vector3D.w;
            }

            public copyColumnTo(column:number, vector3D:Vector3D):void {
                if (column < 0 || column > 3) {
                    throw new RangeError('Column must be 0, 1, 2 or 3.');
                }
                vector3D.x = this._data[column * 4];
                vector3D.y = this._data[column * 4 + 1];
                vector3D.z = this._data[column * 4 + 2];
                vector3D.w = this._data[column * 4 + 3];
            }

            public copyFrom(sourceMatrix3D:Matrix3D):void {
                this.position = sourceMatrix3D.position.clone();
                this.rawData = sourceMatrix3D.rawData.slice();
            }

            public copyRawDataFrom(vector:Array<number>, index:number = 0, transpose:boolean = false):void {
                throw new NotImplementedError();
            }

            public copyRawDataTo(vector:Array<number>, index:number = 0, transpose:boolean = false):void {
                throw new NotImplementedError();
            }

            public copyRowFrom(row:number, vector3D:Vector3D):void {
                if (row < 0 || row > 3) {
                    throw new RangeError('Row must be 0, 1, 2 or 3.');
                }
                this._data[row] = vector3D.x;
                this._data[row + 4] = vector3D.y;
                this._data[row + 8] = vector3D.z;
                this._data[row + 12] = vector3D.w;
            }

            public copyRowTo(row:number, vector3D:Vector3D):void {
                if (row < 0 || row > 3) {
                    throw new RangeError('Row must be 0, 1, 2 or 3.');
                }
                vector3D.x = this._data[row];
                vector3D.y = this._data[row + 4];
                vector3D.z = this._data[row + 8];
                vector3D.w = this._data[row + 12];
            }

            public copyToMatrix3D(dest:Matrix3D):void {
                dest.position = this.position.clone();
                dest.rawData = this._data.slice();
            }

            public decompose(orientationStyle:string = Orientation3D.EULER_ANGLES):Array<Vector3D> {
                throw new NotImplementedError();
            }

            public deltaTransformVector(v:Vector3D):Vector3D {
                throw new NotImplementedError();
            }

            public identity():void {
                this._data = [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1
                ];
            }

            public static interpolate(thisMat:Matrix3D, toMat:Matrix3D, percent:number):Matrix3D {
                percent = mic.util.limit(percent, 0, 1);
                var data = [];
                for (var i = 0; i < 16; i++) {
                    data.push(thisMat._data[i] * (1 - percent) + toMat._data[i] * percent);
                }
                return new Matrix3D(data);
            }

            public interpolateTo(toMat:Matrix3D, percent:number):Matrix3D {
                return Matrix3D.interpolate(this, toMat, percent);
            }

            public invert():boolean {
                // TODO: simplify this
                var invResult = mic.util.matrixInvert(this.rawData, 4);
                if (invResult.canInvert) {
                    this._data = invResult.result;
                }
                return invResult.canInvert;
            }

            public pointAt(pos:Vector3D, at:Vector3D = Vector3D.ORIGIN, up:Vector3D = Vector3D.Z_AXIS):void {
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
            }

            public prepend(rhs:Matrix3D):void {
                this._data = Matrix3D.dotProduct(this._data, rhs._data);
            }

            public prependRotation(degrees:number, axis:Vector3D, pivotPoint:Vector3D = null):void {
                if (pivotPoint !== null) {
                    this.prependTranslation(pivotPoint.x, pivotPoint.y, pivotPoint.z);
                }
                this._data = Matrix3D.dotProduct(this._data, Matrix3D.getRotationMatrix(degrees * Math.PI / 180, axis));
                if (pivotPoint !== null) {
                    this.prependTranslation(-pivotPoint.x, -pivotPoint.y, -pivotPoint.z);
                }
            }

            public prependScale(xScale:number, yScale:number, zScale:number):void {
                this._data = Matrix3D.dotProduct(this._data, [
                    xScale, 0, 0, 0,
                    0, yScale, 0, 0,
                    0, 0, zScale, 0,
                    0, 0, 0, 1
                ]);
            }

            public prependTranslation(x:number, y:number, z:number):void {
                this._data = Matrix3D.dotProduct(this._data, [
                    1, 0, 0, x,
                    0, 1, 0, y,
                    0, 0, 1, z,
                    0, 0, 0, 1
                ]);
            }

            public recompose(components:Array<Vector3D>, orientationStyle:string = Orientation3D.EULER_ANGLES):boolean {
                throw new NotImplementedError();
            }

            public transformVector(v:Vector3D):Vector3D {
                var x = this._data[0] * v.x + this._data[1] * v.y + this._data[2] * v.z + this._data[3] * v.w;
                var y = this._data[4] * v.x + this._data[5] * v.y + this._data[6] * v.z + this._data[7] * v.w;
                var z = this._data[8] * v.x + this._data[9] * v.y + this._data[10] * v.z + this._data[11] * v.w;
                var w = this._data[12] * v.x + this._data[13] * v.y + this._data[14] * v.z + this._data[15] * v.w;
                return new Vector3D(x, y, z, w);
            }

            public transformVectors(vin:Array<number>, vout:Array<number>):void {
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
            }

            public transpose():void {
                var d = this._data;
                this._data = [
                    d[0], d[4], d[8], d[12],
                    d[1], d[5], d[9], d[13],
                    d[2], d[6], d[10], d[14],
                    d[3], d[7], d[11], d[15]
                ];
            }

            // Bulletproof
            public setTransformTo(x:number, y:number, z:number):void {
                var d = this._data;
                d[3] = x;
                d[7] = y;
                d[11] = z;
            }

            // Bulletproof
            public toArray():Float32Array {
                var d = this._data;
                // Matrix3D 存储方式是行主序，WebGL 的存储方式是列主序
                return new Float32Array([
                    d[0], d[4], d[8], d[12],
                    d[1], d[5], d[9], d[13],
                    d[2], d[6], d[10], d[14],
                    d[3], d[7], d[11], d[15]
                ]);
            }

            // Bulletproof
            public setOrthographicProjection(left:number, right:number, top:number, bottom:number, near:number, far:number):void {
                if (left == right || top == bottom || near == far) {
                    throw new ArgumentError("Null frustum");
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
            }

            // Bulletproof
            public setPerspectiveProjection(fov:number, aspect:number, near:number, far:number):void {
                if (near === far || aspect === 0) {
                    throw new ArgumentError("Null frustum");
                }
                if (near <= 0) {
                    throw new ArgumentError("near <= 0");
                }
                if (far <= 0) {
                    throw new ArgumentError("far <= 0");
                }
                fov = Math.PI / 2 * fov / 180;
                var s = Math.sin(fov);
                if (s == 0) {
                    throw new ArgumentError("Null frustum");
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
            }

            private static dotProduct(a:Array<number>, b:Array<number>):Array<number> {
                if (a.length !== 16 || b.length !== 16) {
                    throw new Error("Matrix3D dot product needs a array of 16 elements.");
                }
                var res:Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                for (var i = 0; i < 4; i++) {
                    for (var j = 0; j < 4; j++) {
                        for (var k = 0; k < 4; k++) {
                            res[i * 4 + j] += a[i * 4 + k] * b[k * 4 + j];
                        }
                    }
                }
                return res;
            }

            private static getRotationMatrix(angle:number, axis:Vector3D):Array<number> {
                // jabbany
                var sT:number = Math.sin(angle), cT:number = Math.cos(angle);
                return [
                    cT + axis.x * axis.x * (1 - cT), axis.x * axis.y * (1 - cT) - axis.z * sT, axis.x * axis.z * (1 - cT) + axis.y * sT, 0,
                    axis.x * axis.y * (1 - cT) + axis.z * sT, cT + axis.y * axis.y * (1 - cT), axis.y * axis.z * (1 - cT) - axis.x * sT, 0,
                    axis.z * axis.x * (1 - cT) - axis.y * sT, axis.z * axis.y * (1 - cT) + axis.x * sT, cT + axis.z * axis.z * (1 - cT), 0,
                    0, 0, 0, 1
                ];
            }

            private _data:Array<number>;

        }

        export class ColorTransform {

            public constructor(redMultiplier:number = 1, greenMultiplier:number = 1, blueMultiplier:number = 1, alphaMultiplier:number = 1,
                               redOffset:number = 0, greenOffset:number = 0, blueOffset:number = 0, alphaOffset:number = 0) {
                this.redMultiplier = redMultiplier;
                this.greenMultiplier = greenMultiplier;
                this.blueMultiplier = blueMultiplier;
                this.alphaMultiplier = alphaMultiplier;
                this.redOffset = redOffset;
                this.greenOffset = greenOffset;
                this.blueOffset = blueOffset;
                this.alphaOffset = alphaOffset;
            }

            public color:number;

            public get alphaMultiplier() {
                return this._alphaMultiplier;
            }

            public set alphaMultiplier(v:number) {
                this._alphaMultiplier = v;
            }

            public get alphaOffset() {
                return this._alphaOffset;
            }

            public set alphaOffset(v:number) {
                this._alphaOffset = mic.util.limit(v, -1, 1);
            }

            public get redMultiplier() {
                return this._redMultiplier;
            }

            public set redMultiplier(v:number) {
                this._redMultiplier = v;
            }

            public get redOffset() {
                return this._redOffset;
            }

            public set redOffset(v:number) {
                this._redOffset = mic.util.limit(v, -255, 255);
            }

            public get greenMultiplier() {
                return this._greenMultiplier;
            }

            public set greenMultiplier(v:number) {
                this._greenMultiplier = v;
            }

            public get greenOffset() {
                return this._greenOffset;
            }

            public set greenOffset(v:number) {
                this._greenOffset = mic.util.limit(v, -255, 255);
            }

            public get blueMultiplier() {
                return this._blueMultiplier;
            }

            public set blueMultiplier(v:number) {
                this._blueMultiplier = v;
            }

            public get blueOffset() {
                return this._blueOffset;
            }

            public set blueOffset(v:number) {
                this._blueOffset = mic.util.limit(v, -255, 255);
            }

            public concat(second:ColorTransform):void {
                throw new NotImplementedError();
            }

            private _alphaMultiplier:number;
            private _alphaOffset:number;
            private _redMultiplier:number;
            private _redOffset:number;
            private _greenMultiplier:number;
            private _greenOffset:number;
            private _blueMultiplier:number;
            private _blueOffset:number;

        }

        export class PerspectiveProjection {

            private _fieldOfView:number;

            public get fieldOfView():number {
                return this._fieldOfView;
            }

            public set fieldOfView(v:number) {
                this._fieldOfView = mic.util.limit(v, 0, 180);
            }

            public focalLength:number;
            public projectionCenter:Point;

            public constructor() {
                this.fieldOfView = 90;
                this.focalLength = 10;
                this.projectionCenter = new Point();
            }

            public toMatrix3D():Matrix3D {
                throw new NotImplementedError();
            }

        }

        export class Transform {

            public constructor() {
                this.matrix3D = new Matrix3D();
            }

            private _pixelBounds:Rectangle;

            public colorTransform:ColorTransform;

            public get concatenatedColorTransform():ColorTransform {
                throw new NotImplementedError();
            }

            public get concatenatedMatrix():Matrix {
                throw new NotImplementedError();
            }

            public matrix:Matrix;
            public matrix3D:Matrix3D;
            public perspectiveProjection:PerspectiveProjection;

            public get pixelBounds():Rectangle {
                return this._pixelBounds;
            }

            /*
             public getRelativeMatrix3D(relativeTo:display.DisplayObject):Matrix3D {
             throw new NotImplementedError();
             }
             */

        }

        export class Orientation3D {

            public static get AXIS_ANGLE():string {
                return 'axisAngle';
            }

            public static get EULER_ANGLES():string {
                return 'eulerAngles';
            }

            public static get QUATERNION():string {
                return 'quaternion';
            }

        }

    }

    export module text {

        export class TextFormat {

            public align:string;
            public blockIndent:number;
            public bold:boolean;
            public bullet:boolean;
            public color:number;
            public font:string;
            public indent:number;
            public italic:boolean;
            public kerning:boolean;
            public leading:number;
            public leftMargin:number;
            public letterSpacing:number;
            public rightMargin:number;
            public size:number;
            public tabStops:Array<number>;
            public target:string;
            public underline:boolean;
            public url:string;

            public constructor(font:string = null, size:number = null, color:number = null, bold:boolean = null,
                               italic:boolean = null, underline:boolean = null, url:string = null, target:string = null,
                               align:string = null, leftMargin:number = null, rightMargin:number = null,
                               indent:number = null, leading:number = null) {
                this.__init();
                (font != null) && (this.font = font);
                (size != null) && (this.size = size);
                (color != null) && (this.color = color);
                (bold != null) && (this.bold = bold);
                (italic != null) && ( this.italic = italic);
                (underline != null) && (this.underline = underline);
                (url != null) && ( this.url = url);
                (target != null) && ( this.target = target);
                (align != null) && ( this.align = align);
                (leading != null) && (this.leading = leftMargin);
                (rightMargin != null) && (this.rightMargin = rightMargin);
                (indent != null) && (this.indent = indent);
                (leading != null) && (this.leading = leading);
            }

            private __init():void {
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
            }

        }

        export class TextFormatAlign {

            public static get CENTER():string {
                return 'center';
            }

            public static get END():string {
                return 'end';
            }

            public static get JUSTIFY():string {
                return 'justify';
            }

            public static get LEFT():string {
                return 'left';
            }

            public static get RIGHT():string {
                return 'right';
            }

            public static get START():string {
                return 'start';
            }

        }

    }

    export module utils {

        import events = bulletproof.flash.events;

        /**
         * 这个类的实现和 ActionScript 内的很不一样。考虑到我们选用的环境，我们应该使用 JavaScript 的方式实现此类。
         * 所以我们不支持事件回调之类的东西，用 JavaScript 自带的 setInterval() 解决。
         */
        export class Timer extends events.EventDispatcher {

            private _currentCount:number = 0;
            private _delay:number = 1000;
            private _repeatCount:number = 0;
            private _running:boolean = false;
            private _handle = 0;

            public get currentCount():number {
                return this._currentCount;
            }

            public get delay():number {
                return this._delay;
            }

            public set delay(v:number) {
                v = Math.floor(v);
                this._delay = v >= 0 ? v : 0;
            }

            public enabled:boolean = true;

            public get repeatCount():number {
                return this._repeatCount;
            }

            public set repeatCount(v:number) {
                v = Math.floor(v);
                this._repeatCount = v >= 0 ? v : 0;
            }

            public get running():boolean {
                return this._running;
            }

            protected _bp_timerCallbackInternal():void {
            }

            private _bp_timerCallback():void {
                if (this.enabled) {
                    this._currentCount++;
                    if (this.repeatCount > 0 && this.currentCount > this.repeatCount) {
                        this.stop();
                    } else {
                        this._bp_timerCallbackInternal();
                    }
                }
            }

            public constructor(delay:number, repeatCount:number = 0) {
                super();
                this.delay = delay;
                this.repeatCount = repeatCount;
                this._handle = 0;
                this.start();
            }

            public reset():void {
                if (this.running) {
                    clearInterval(this._handle);
                    this._handle = 0;
                    this._running = false;
                    this._currentCount = 0;
                }
            }

            public start():void {
                if (!this.running && (this.currentCount < this.repeatCount || this.repeatCount == 0)) {
                    // this 参数很关键
                    // 因为在 setInterval() 执行的函数中，this 指向了全局对象（window/Node上下文）
                    // 因此应该重设 this
                    // 可以通过 bind()，也可以通过 setInterval() 的附加参数
                    // 这里为了效率，使用 bind()（... 会导致循环展开 arguments）
                    this._handle = setInterval(this._bp_timerCallback.bind(this), this.delay);
                    this._running = true;
                }
            }

            public stop():void {
                if (this.running) {
                    clearInterval(this._handle);
                    this._handle = 0;
                    this._running = false;
                }
            }

        }

    }

}
