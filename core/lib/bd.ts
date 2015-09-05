/**
 * Created by MIC on 2015/8/27.
 */

/// <reference path="flash.ts"/>
/// <reference path="fl.ts"/>
/// <reference path="mic.ts"/>
/// <reference path="org.ts"/>

import flash = require('./flash');
import fl = require('./fl');
import mic = require('./mic');
import org = require('./org');
import bddata =require('./bddata');

export module bulletproof {

    export class Bulletproof {

        private static _timeout:number;
        private static _shouldUpdate:boolean = true;
        private static _isDispatching:boolean = false;
        private static _isInWatchMode:boolean = false;
        private static _canvas:HTMLCanvasElement;
        private static _stage:flash.display.Stage;
        private static _lastIntervalHandle:number = 0;

        static init(canvas:HTMLCanvasElement, div:HTMLDivElement, fpsLimit:number = 100):void {
            Bulletproof._canvas = canvas;
            Bulletproof.enterMainLoop(fpsLimit);
            Bulletproof._stage = new flash.display.Stage(canvas, div);
        }

        private static enterMainLoop(fpsLimit:number = 100):void {
            Bulletproof._timeout = 1000 / (fpsLimit < 1 ? 1 : fpsLimit);
            //Bulletproof._lastIntervalHandle = setInterval(Bulletproof.mainLoop, Bulletproof._timeout);
            window.requestAnimationFrame(Bulletproof.mainLoop);
        }

        private static mainLoop() {
            if (Bulletproof._shouldUpdate && (true || !Bulletproof._isDispatching)) {
                if (false && Bulletproof._isInWatchMode) {
                    clearInterval(Bulletproof._lastIntervalHandle);
                    Bulletproof._lastIntervalHandle = setInterval(Bulletproof.mainLoop, Bulletproof._timeout);
                    Bulletproof._isInWatchMode = false;
                }
                //var tic:number, toc:number;
                //tic = Date.now();
                //console.log('Start: ' + tic.toString());
                Bulletproof._isDispatching = true;
                Bulletproof._stage.raiseEnterFrame();
                Bulletproof._stage._bp_draw();
                Bulletproof._isDispatching = false;
                //toc = Date.now();
                //console.log('End: ' + toc.toString());
                //console.log('Passed: ' + (toc - tic).toString() +
                window.requestAnimationFrame(Bulletproof.mainLoop);
            } else {
                if (false && Bulletproof._isDispatching && !Bulletproof._isInWatchMode) {
                    clearInterval(Bulletproof._lastIntervalHandle);
                    Bulletproof._lastIntervalHandle = setInterval(Bulletproof.mainLoop, Bulletproof._timeout / 2);
                    Bulletproof._isInWatchMode = true;
                }
            }
        }

        public static get shouldUpdate():boolean {
            return Bulletproof._shouldUpdate;
        }

        public static set shouldUpdate(v:boolean) {
            Bulletproof._shouldUpdate = v;
        }

        public static get stage():flash.display.Stage {
            return Bulletproof._stage;
        }

    }

}

export module bilidanmaku {

    class ProofObject {

        public static get version():string {
            return 'Bulletproof/0.1.0 (BiliBili, like BSE, like CCL, like Flash) HTML5/*';
        }

    }

    export interface IProofStartParams {

        startDate:Date;
        root:HTMLCanvasElement;

    }

    export var _startParams:IProofStartParams = {
        root: null,
        startDate: null
    };

    export function initialize(root:HTMLCanvasElement) {
        _startParams.root = root;
        _startParams.startDate = new Date();
    }

    export class Display extends ProofObject {

        public static get fullScreenWidth():number {
            return screen.width;
        }

        public static get fullScreenHeight():number {
            return screen.height;
        }

        public static get width():number {
            return _startParams.root.clientWidth;
        }

        public static get height():number {
            return _startParams.root.clientHeight;
        }

        public static createMatrix(a:number = 1, b:number = 0, c:number = 1, d:number = 1, tx:number = 0, ty:number = 0):flash.geom.Matrix {
            return new flash.geom.Matrix(a, b, c, d, tx, ty);
        }

        public static createPoint(x:number = 0, y:number = 0):flash.geom.Point {
            return new flash.geom.Point(x, y);
        }

        public static createComment(text:string, params:bddata.IGeneralCreateParams):CommentField {
            var comment = new CommentField(bulletproof.Bulletproof.stage, bulletproof.Bulletproof.stage);
            comment.text = text;
            return comment;
        }

        public static createShape(text:string, params:bddata.IGeneralCreateParams):flash.display.Shape {
            return new flash.display.Shape(bulletproof.Bulletproof.stage, bulletproof.Bulletproof.stage);
        }

        public static createCanvas(text:string, params:bddata.IGeneralCreateParams):any {
            throw new org.NotImplementedError();
        }

        public static createButton(text:string, params:bddata.IGeneralCreateParams):any {
            throw new org.NotImplementedError();
        }

        public static createGlowFilter(color:number = 0xff0000, alpha:number = 1.0, blurX:number = 6.0,
                                       blurY:number = 6.0, strength:number = 2, quality:number = flash.filters.BitmapFilterQuality.LOW,
                                       inner:boolean = false, knockout:boolean = false):flash.filters.GlowFilter {
            return new flash.filters.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
        }

        public static createBlurFilter(blurX:number = 4.0, blurY:number = 4.0, quality:number = 1):flash.filters.GlowFilter {
            return new flash.filters.GlowFilter(blurX, blurY, quality);
        }

        public static toIntVector(array:Array<number>):Array<number> {
            // jabbany
            Object.defineProperty(array, 'as3Type', {
                get: function () {
                    return 'Vector.<int>';
                },
                set: function (v:number) {
                    mic.trace('Oh come on...');
                }
            });
            return array;
        }

        public static toUIntVector(array:Array<number>):Array<number> {
            // jabbany
            Object.defineProperty(array, 'as3Type', {
                get: function () {
                    return 'Vector.<int>';
                },
                set: function (v:number) {
                    mic.trace('Oh come on...');
                }
            });
            return array;
        }

        public static toNumberVector(array:Array<number>):Array<number> {
            // jabbany
            Object.defineProperty(array, 'as3Type', {
                get: function () {
                    return 'Vector.<int>';
                },
                set: function (v:number) {
                    mic.trace('Oh come on...');
                }
            });
            return array;
        }

        public static createVector3D(x:number = 0, y:number = 0, z:number = 0, w:number = 0):flash.geom.Vector3D {
            return new flash.geom.Vector3D(x, y, z, w);
        }

        public static createMatrix3D(a:Array<number>):flash.geom.Matrix3D {
            return new flash.geom.Matrix3D(a);
        }

        public static createColorTransform():flash.geom.ColorTransform {
            return new flash.geom.ColorTransform();
        }

        public static createTextFormat():flash.text.TextFormat {
            return new flash.text.TextFormat();
        }

        public static createGraphic():flash.display.Graphics {
            throw new org.NotImplementedError();
        }

        // CCL compatible
        // jabbany
        public static projectVector(matrix:flash.geom.Matrix3D, vector:flash.geom.Vector3D):flash.geom.Vector3D {
            return matrix.transformVector(vector);
        }

        // CCL compatible
        // jabbany
        public static projectVectors(matrix:flash.geom.Matrix3D, vertices:Array<number>, projectedVertices:Array<number>, uvts:Array<number>):void {
            while (projectedVertices.length > 0) {
                projectedVertices.pop();
            }
            if (vertices.length % 3 != 0) {
                mic.trace("Display.projectVectors input vertex Vector must be a multiple of 3.", "err");
                return;
            }
            var transformed:Array<number> = [];
            matrix.transformVectors(vertices, transformed);
            for (var i = 0; i < transformed.length / 3; i++) {
                var x = transformed[i * 3], y = transformed[i * 3 + 1];
                projectedVertices.push(x, y);
            }
        }

    }

    export class Player extends ProofObject {

        public static play():void {
            throw new org.NotImplementedError();
        }

        public static pause():void {
            throw new org.NotImplementedError();
        }

        public static seek(offset:number):void {
            throw new org.NotImplementedError();
        }

        public static jump(av:string, page:number = 1, newWindow:boolean = false):void {
            throw new org.NotImplementedError();
        }

        public static get state():string {
            throw new org.NotImplementedError();
        }

        public static get time():string {
            throw new org.NotImplementedError();
        }

        public static commentTrigger(f:(cd:CommentData)=>void, timeout:number = 1000):number {
            throw new org.NotImplementedError();
        }

        public static keyTrigger(f:(key:number)=>void, timeout:number = 1000, up:boolean = false):number {
            throw new org.NotImplementedError();
        }

        public static setMask(obj:flash.display.DisplayObject):void {
            throw new org.NotImplementedError();
        }

        public static createSound(t:string, onLoad:Function = null):flash.media.Sound {
            throw new org.NotImplementedError();
        }

        public static get commentList():Array<CommentData> {
            throw new org.NotImplementedError();
        }

        public static refreshRate:number;

        public static get width():number {
            throw new org.NotImplementedError();
        }

        public static get height():number {
            throw new org.NotImplementedError();
        }

        public static get videoWidth():number {
            throw new org.NotImplementedError();
        }

        public static get videoHeight():number {
            throw new org.NotImplementedError();
        }

    }

    export class PlayerState {

        public static get PLAYING():string {
            return 'playing';
        }

        public static get STOP():string {
            return 'stop';
        }

        public static get PAUSE():string {
            return 'pause';
        }

    }

    export class MotionEasing {

        public static get NONE():string {
            return 'None';
        }

        public static get BACK():string {
            return 'Back';
        }

        public static get BOUNCE():string {
            return 'Bounce';
        }

        public static get CIRCULAR():string {
            return 'Circular';
        }

        public static get CUBIC():string {
            return 'Cubic';
        }

        public static get ELASTIC():string {
            return 'Elastic';
        }

        public static get EXPONENTIAL():string {
            return 'Exponential';
        }

        public static get SINE():string {
            return 'Sine';
        }

        public static get QUINTIC():string {
            return 'Quintic';
        }

        public static get LINEAR():string {
            return 'Linear';
        }

    }

    export class CommentField extends flash.display.DisplayObject {

        public alwaysShowSelection:boolean;
        public background:boolean;
        public backgroundColor:number;
        public border:boolean;
        public borderColor:number;

        public get bottomScrollV():number {
            throw new org.NotImplementedError();
        }

        public condenseWhite:boolean;
        public defaultTextFormat:flash.text.TextFormat;
        public gridFitType:string;

        public _bp_draw():void {
            super._bp_draw();
            // clear the canvas
            var canvas = this._bp_displayBuffer;
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.font = this.textHeight.toString() + 'pt SimHei';
            context.fillText(this.text, 0, this.textHeight);
        }

        public get htmlText():string {
            throw new org.NotImplementedError();
        }

        public set htmlText(v:string) {
            throw new org.NotImplementedError();
        }

        public get length():number {
            return this.text.length;
        }

        public get multiline():boolean {
            return this.numLines > 1;
        }

        public get numLines():number {
            if (this._needRecalcNumLines) {
                if (this.text == null) {
                    this._numLines = 0;
                } else {
                    var t = this.text.split(/\r\n|\r|\n/g);
                    this._numLines = t.length;
                }
                this._needRecalcNumLines = false;
            }
            //throw new org.NotImplementedError();
            return this._numLines;
        }

        public restrict:string;
        public sharpness:number;

        public get text():string {
            return this._text;
        }

        public set text(v:string) {
            this._text = v;
        }

        public textColor:number;

        public get textHeight():number {
            return CommentField._defaultTextHeight;
        }

        public get textWidth():number {
            throw new org.NotImplementedError();
        }

        public thickness:number;
        public wordWrap:boolean;
        public fontsize:number;
        public bold:boolean;

        public appendText(newText:string):void {
            throw new org.NotImplementedError();
        }

        private _htmlText:string;
        private _text:string;
        private _needRecalcNumLines = true;
        private _numLines;
        private static _defaultTextHeight:number = 12;

    }

    export class CommentData extends ProofObject {

        public txt:string;
        public time:string;
        public color:number;
        public pool:number;
        public mode:number;
        public fontSize:number;

    }

    export class CommentBitmap extends flash.display.Bitmap {
    }

    export class Global {

        private static _map:Map<string, any> = new Map<string, any>();

        public static _set(key:string, val:any):void {
            Global._map.set(key, val);
        }

        public static _get(key:string):any {
            return Global._map.get(key);
        }

    }

    export class ScriptManager {

        public static clearTimer():void {
            throw new org.NotImplementedError();
        }

        public static clearEl():void {
            throw new org.NotImplementedError();
        }

        public static clearTrigger():void {
            throw new org.NotImplementedError();
        }

    }

    export interface ITween {

        play():void;
        gotoAndPlay(time:number):void;
        stop():void;
        gotoAndStop(time:number):void;
        togglePause():void;
        stopOnComplete:boolean;

    }

    export class Tween extends fl.transitions.Tween implements ITween {

        public stopOnComplete:boolean;

        public play():void {
            throw new org.NotImplementedError();
        }

        public gotoAndPlay(time:number):void {
            throw new org.NotImplementedError();
        }

        public gotoAndStop(time:number):void {
            throw new org.NotImplementedError();
        }

        public togglePause():void {
            throw new org.NotImplementedError();
        }

        public constructor(obj:Object, prop:string, func:Function, begin:number, finish:number, duration:number, useSeconds:boolean = false) {
            super(obj, prop, func, begin, finish, duration, useSeconds);
        }

        public static tween(object:Object, dest:Object, src:Object, duration:number, easing:Function):Tween {
            throw new org.NotImplementedError();
        }

        public static to(object:Object, dest:Object, duration:number, easing:Function):Tween {
            throw new org.NotImplementedError();
        }

        public static bezier(object:Object, dest:Object, src:Object, control:Object):Tween {
            throw new org.NotImplementedError();
        }

        public static scale(src:ITween, scale:number):ITween {
            throw new org.NotImplementedError();
        }

        public static delay(src:ITween, delay:number):ITween {
            throw new org.NotImplementedError();
        }

        public static reverse(src:ITween):ITween {
            throw new org.NotImplementedError();
        }

        public static repeat(src:ITween, times:number):ITween {
            throw new org.NotImplementedError();
        }

        public static slice(src:ITween, from:number, to:number):ITween {
            throw new org.NotImplementedError();
        }

        public static serial(src1:ITween, ...other:Array<ITween>):ITween {
            throw new org.NotImplementedError();
        }

        public static parallel(src1:ITween, ...other:Array<ITween>):ITween {
            throw new org.NotImplementedError();
        }

    }

    export class Timer extends flash.utils.Timer {

        private _closure:any;
        private _possibleClosure:string;

        public constructor(closure:Function|string, delay:number, repeatCount:number = 1) {
            super(delay, repeatCount);
            this._closure = closure;
            if (typeof this._closure == 'string') {
                this._possibleClosure = this._closure + '();';
            }
        }

        public _bp_timerCallbackInternal():void {
            if (this._closure != null) {
                var type = typeof this._closure;
                switch (type) {
                    case 'string':
                        eval(this._possibleClosure);
                        break;
                    case 'function':
                        this._closure.call(window);
                        break;
                    default:
                        break;
                }
            }
        }

    }

    export class Bitmap {

        public static __canUse:boolean = false;

        public static createBitmapData(width:number, height:number, transparent:boolean = true, fillColor:number = 0xffffffff):flash.display.BitmapData {
            throw new org.NotImplementedError();
        }

        public static createRectangle(x:number = 0, y:number = 0, width:number = 0, height:number = 0):flash.geom.Rectangle {
            return new flash.geom.Rectangle(x, y, width, height);
        }

        public static createBitmap(params:bddata.IBitmapCreateParams):CommentBitmap {
            throw new org.NotImplementedError();
        }

    }

    export class Storage {

        public static __canUse:boolean = false;

        public static loadRank(complete:Function, err:Function = null):void {
            throw new org.NotImplementedError();
        }

        public static uploadScore(score:number, name:string = null, complete:Function = null, err:Function = null):void {
            throw new org.NotImplementedError();
        }

        public static saveData(userData:any, complete:Function = null, err:Function = null):void {
            throw new org.NotImplementedError();
        }

        public static loadData(complete:Function = null, err:Function = null):void {
            throw new org.NotImplementedError();
        }

    }

    export class Utils {

        public static hue(v:number):number {
            v = v % 360;
            // http://blog.sina.com.cn/s/blog_5de73d0b0101baxq.html
            var lambda = v / 60 * 255;
            var r = mic.util.limit(510 - lambda, 0, 255);
            var g = mic.util.limit(v < 180 ? lambda : lambda - 510, 0, 255);
            var b = mic.util.limit(v < 180 ? lambda - 510 : lambda, 0, 255);
            return (0xff << 24) | (r << 16) | (g << 8) | b;
        }

        public static rgb(r:number, g:number, b:number):number {
            r = mic.util.limit(r, 0, 255);
            g = mic.util.limit(g, 0, 255);
            b = mic.util.limit(b, 0, 255);
            return (0xff << 24) | (r << 16) | (g << 8) | b;
        }

        public static formatTimes(time:number):string {
            throw new org.NotImplementedError();
        }

        public static delay(closure:Function|string, delay:number):number {
            if (typeof closure == 'string') {
                closure += '();';
            }
            return setTimeout(closure, delay);
        }

        public static interval(closure:Function|string, delay:number, times:number):Timer {
            return new Timer(closure, delay, times);
        }

        public static distance(x1:number, y1:number, x2:number, y2:number):number {
            return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
        }

        public static rand(min:number, max:number):number {
            console.assert(min < max, 'max must be bigger than min.');
            return Math.random() * (max - min) + min;
        }

    }

    export function trace(message:string):void {
        console.debug(message);
    }

    export function clear():void {
        console.clear();
    }

    export function getTimer():number {
        return Date.now() - _startParams.startDate.getTime();
    }

    export function timer(closure:Function|string, delay:number):number {
        return Utils.delay(closure, delay);
    }

    export function interval(closure:Function|string, delay:number, times:number = 1):Timer {
        return Utils.interval(closure, delay, times);
    }

    export function foreach(loop:Object, f:(key:string, value:any)=>any):void {
        for (var key in loop
            ) {
            if (loop.hasOwnProperty(key)) {
                f(key, loop[key]);
            }
        }
    }

    export function clone(object:Object):Object {
        function cloneInternal(object:Object):Object {
            var type = typeof object;
            switch (type) {
                case 'number':
                    return object;
                case 'string':
                    return object;
                case 'function':
                    return object;
                case 'object':
                    if (object == null) {
                        return null;
                    }
                    if (object instanceof Array) {
                        var a = [];
                        for (var i = 0; i < object.length; i++) {
                            a.push(cloneInternal(object[i]));
                        }
                        return a;
                    } else {
                        var o:Object = {};
                        for (var key in object) {
                            if (object.hasOwnProperty(key)) {
                                o[key] = clone(object[key]);
                            }
                        }
                        return o;
                    }
                case 'undefined':
                    return undefined;
                default:
                    return object;
            }
        }

        return cloneInternal(object);
    }


    export function load(libraryName:string, onComplete:()=>any):void {
        var availableLibraries = [
            'libBitmap',
            'libStorage'
        ];
        var index = availableLibraries.indexOf(libraryName);
        if (index >= 0) {
            switch (index) {
                case 0:
                    Bitmap.__canUse = true;
                    break;
                case 1:
                    Storage.__canUse = true;
                    break;
                default:
                    break;
            }
        }
    }

    export var $ = Display;
    export var $G = Global;

}
