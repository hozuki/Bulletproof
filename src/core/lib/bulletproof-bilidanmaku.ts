/**
 * Created by MIC on 2015/8/27.
 */

import bulletproof_main = require("./bulletproof");
import bulletproof_data_interface = require("./bulletproof-data-interface");
import bulletproof_flash_base = require("./bulletproof-flash-base");
import bulletproof_flash_display = require("./bulletproof-flash-display");
import bulletproof_flash_graphics = require("./bulletproof-flash-graphics");
import bulletproof_org = require("./bulletproof-org");
import bulletproof_mic = require("./bulletproof-mic");
import bulletproof_fl = require("./bulletproof-fl");
import bulletproof_mx = require("./bulletproof-mx");
import bulletproof_webgl = require("./bulletproof-webgl");

export module bulletproof {

    import mic = bulletproof_mic.bulletproof.mic;
    import fl = bulletproof_fl.bulletproof.fl;
    import mx = bulletproof_mx.bulletproof.mx;
    import webgl = bulletproof_webgl.bulletproof.webgl;
    import flash = bulletproof_flash_base.bulletproof.flash;

    import IGeneralCreateParams = bulletproof_data_interface.bulletproof.bilidanmaku.IGeneralCreateParams;
    import ICommentBitmapCreateParams = bulletproof_data_interface.bulletproof.bilidanmaku.ICommentBitmapCreateParams;
    import IMotion = bulletproof_data_interface.bulletproof.bilidanmaku.IMotion;
    import IMotionPropertyAnimation = bulletproof_data_interface.bulletproof.bilidanmaku.IMotionPropertyAnimation;
    import NotImplementedError = bulletproof_org.bulletproof.NotImplementedError;
    import Bulletproof = bulletproof_main.bulletproof.Bulletproof;
    import OMap = bulletproof_org.bulletproof.OMap;

    import DisplayObject = bulletproof_flash_display.bulletproof.flash.display.DisplayObject;
    import DisplayObjectContainer = bulletproof_flash_display.bulletproof.flash.display.DisplayObjectContainer;
    import Stage = bulletproof_flash_display.bulletproof.flash.display.Stage;
    import FlashShape = bulletproof_flash_graphics.bulletproof.flash.display.Shape;
    import BitmapFilter = bulletproof_flash_display.bulletproof.flash.filters.BitmapFilter;
    import BitmapFilterQuality = bulletproof_flash_display.bulletproof.flash.filters.BitmapFilterQuality;
    import GlowFilter = bulletproof_flash_display.bulletproof.flash.filters.GlowFilter;
    import BlurFilter = bulletproof_flash_display.bulletproof.flash.filters.BlurFilter;
    import Graphics = bulletproof_flash_graphics.bulletproof.flash.display.Graphics;
    import FlashBitmap = bulletproof_flash_display.bulletproof.flash.display.Bitmap;
    import FlashBitmapData = bulletproof_flash_display.bulletproof.flash.display.BitmapData;

    export interface IProofDanmakuObject {
        createParams:IGeneralCreateParams;
        lifeTime:number;
    }

    export interface IProofStartParams {
        startDate:Date;
        root:HTMLDivElement;
        video:HTMLVideoElement;
        bp:Bulletproof;
        stage:Stage;
    }

    export class AdvancedDanmaku {

        public static DEFAULT_WIDTH:number = 682;
        public static DEFAULT_HEIGHT:number = 438;

        private _startParams:bulletproof.IProofStartParams;
        private _objectMotions:Array<IMotion> = [];
        // TODO: Potential security issues.
        private _api:any;
        private _renderer:webgl.WebGLRenderer;

        public get startParams():IProofStartParams {
            return this._startParams;
        }

        public static createInstance(root:HTMLDivElement, video:HTMLVideoElement):AdvancedDanmaku {
            var ad = new AdvancedDanmaku();
            ad._renderer = new webgl.WebGLRenderer(AdvancedDanmaku.DEFAULT_WIDTH, AdvancedDanmaku.DEFAULT_HEIGHT, {
                antialias: false,
                autoResize: true,
                transparent: true,
                depth: false
            });
            var stage:Stage = new Stage(ad._renderer);
            ad._startParams = {
                root: root,
                startDate: new Date(),
                video: video,
                bp: Bulletproof.instance,
                stage: stage
            };
            root.appendChild(ad._renderer.view);

            return ad;
        }

        public animate():void {
            var stage = this._startParams.stage;
            stage.raiseEnterFrame();
            this.calculateMotionGroups();
            stage.update();
            stage.redraw();
            window.requestAnimationFrame(this.animate.bind(this));
        }

        public start():void {
            //this._startParams.bp.enterMainLoop();
            window.requestAnimationFrame(this.animate.bind(this));
        }

        public registerMotion(motion:IMotion):void {
            if (this._objectMotions.indexOf(motion) < 0) {
                this._objectMotions.push(motion);
            }
        }

        public clearMotions():void {
            while (this._objectMotions.length > 0) {
                this._objectMotions.pop();
            }
        }

        private calculateMotionGroups():void {
            var propertyNames = ['x', 'y', 'alpha', 'rotationZ', 'rotationY'];
            var motionCount = this._objectMotions.length;
            //var now = this._bdg.getTimer();
            var now = (<BiliBiliDanmakuApi>this.api).getTimer();
            var relativeTime:number;
            var motion:IMotion;
            var motionAnimation:IMotionPropertyAnimation;
            var value:number;
            for (var i = 0; i < motionCount; i++) {
                motion = this._objectMotions[i];
                if (motion.createdTime <= now && now <= motion.createdTime + motion.maximumLifeTime) {
                    for (var j = 0; j < 5; j++) {
                        motionAnimation = motion[propertyNames[j]];
                        if (motionAnimation) {
                            relativeTime = now - motion.createdTime;
                            if (motionAnimation.startDelay) {
                                relativeTime -= motionAnimation.startDelay;
                            }
                            if (relativeTime <= motionAnimation.lifeTime * 1000) {
                                // TODO: 这里忽略了 repeat 属性
                                // TODO: 应该使用指定的 easing 方法，没有则假设线性；这里假设线性
                                value = motionAnimation.fromValue +
                                    (motionAnimation.toValue - motionAnimation.fromValue) / (motionAnimation.lifeTime * 1000) * relativeTime;
                                motion.sourceObject[propertyNames[j]] = value;
                            }
                        }
                    }
                }
            }
        }

        private debugLogMotions():void {
            console.log(this._objectMotions);
        }

        public set api(v:any) {
            this._api = v;
        }

        public get api():any {
            return this._api;
        }

    }

    export module bilidanmaku {

        import AdvancedDanmaku = bulletproof.AdvancedDanmaku;

        export interface CommentData {
            txt:string;
            time:string;
            color:number;
            pool:number;
            mode:number;
            fontSize:number;
        }

        export interface ITween {
            play():void;
            gotoAndPlay(time:number):void;
            stop():void;
            gotoAndStop(time:number):void;
            togglePause():void;
            stopOnComplete:boolean;
        }

        export class ProofObject {

            public get version():string {
                return 'Bulletproof/0.1.0 (BiliBili, like BSE, like CCL, like Flash) HTML5/*';
            }

        }

        export module flashimpl {

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

                protected _bp_timerCallbackInternal():void {
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

            export class Shape extends FlashShape implements IProofDanmakuObject {

                private _ad:AdvancedDanmaku;
                private _createParams:IGeneralCreateParams;
                private _lifeTime:number;

                public constructor(root:Stage, parent:DisplayObjectContainer,
                                   createParams:IGeneralCreateParams, ad:AdvancedDanmaku) {
                    super(root, parent);
                    this._lifeTime = ad.startParams.bp.options.commentLifeTime;
                    this._createParams = createParams;
                    this._ad = ad;
                }

                public get createParams():IGeneralCreateParams {
                    return this._createParams;
                }

                public get lifeTime():number {
                    return this._lifeTime;
                }

            }

            export class Canvas extends mx.containers.Canvas implements IProofDanmakuObject {

                private _ad:AdvancedDanmaku;
                private _createParams:IGeneralCreateParams;
                private _lifeTime:number;

                public constructor(root:Stage, parent:DisplayObjectContainer,
                                   createParams:IGeneralCreateParams, ad:AdvancedDanmaku) {
                    super(root, parent);
                    this._lifeTime = ad.startParams.bp.options.commentLifeTime;
                    this._createParams = createParams;
                    this._ad = ad;
                }

                public get createParams():IGeneralCreateParams {
                    return this._createParams;
                }

                public remove():void {
                    if (this._parent) {
                        this._parent.removeChild(this);
                    }
                }

                public get lifeTime():number {
                    return this._lifeTime;
                }

            }

        }

        export class Display extends ProofObject {

            public constructor(ad:AdvancedDanmaku) {
                super();
                this._ad = ad;
            }

            public get fullScreenWidth():number {
                return screen.width;
            }

            public get fullScreenHeight():number {
                return screen.height;
            }

            public get width():number {
                return this._ad.startParams.root.clientWidth;
            }

            public get height():number {
                return this._ad.startParams.root.clientHeight;
            }

            public createMatrix(a:number = 1, b:number = 0, c:number = 1, d:number = 1, tx:number = 0, ty:number = 0):flash.geom.Matrix {
                return new flash.geom.Matrix(a, b, c, d, tx, ty);
            }

            public createPoint(x:number = 0, y:number = 0):flash.geom.Point {
                return new flash.geom.Point(x, y);
            }

            public createComment(text:string, params:IGeneralCreateParams):CommentField {
                var comment = new CommentField(this.root, this.root, params, this._ad);
                comment.text = text;
                return comment;
            }

            public createShape(params:IGeneralCreateParams):flashimpl.Shape {
                var shape = new flashimpl.Shape(this.root, this.root, params, this._ad);
                if (params) {
                    if (params.alpha) {
                        shape.alpha = params.alpha;
                    }
                    if (params.x) {
                        shape.x = params.x;
                    }
                    if (params.y) {
                        shape.y = params.y;
                    }
                }

                function getMotionMaximumLifeTime(motion:IMotion, ad:AdvancedDanmaku):any {
                    var motionAnimation:IMotionPropertyAnimation;
                    var propertyNames = ['x', 'y', 'alpha', 'rotationZ', 'rotationY'];
                    var maxLife:number = 0;
                    var literalMaxLife:number = 0;
                    for (var j = 0; j < 5; j++) {
                        motionAnimation = motion[propertyNames[j]];
                        if (motionAnimation) {
                            if (!motionAnimation.lifeTime) {
                                motionAnimation.lifeTime = ad.startParams.bp.options.commentLifeTime / 1000;
                            }
                            if (motionAnimation.startDelay) {
                                maxLife = Math.max(maxLife, motionAnimation.lifeTime * 1000 + motionAnimation.startDelay);
                            } else {
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

                var motion:IMotion;
                var life:any;
                var now = (<BiliBiliDanmakuApi>this._ad.api).getTimer();
                if (params) {
                    if (params.motion) {
                        motion = params.motion;
                        motion.sourceObject = shape;
                        motion.createdTime = now;
                        life = getMotionMaximumLifeTime(motion, this._ad);
                        motion.maximumLifeTime = life.maxLife;
                        // 不需要更新 now
                        this._ad.registerMotion(motion);
                    }
                    if (params.motionGroup) {
                        for (var i = 0; i < params.motionGroup.length; i++) {
                            motion = params.motionGroup[i];
                            motion.sourceObject = shape;
                            motion.createdTime = now;
                            life = getMotionMaximumLifeTime(motion, this._ad);
                            motion.maximumLifeTime = life.maxLife;
                            this._ad.registerMotion(motion);
                            now += life.literalMaxLife;
                        }
                    }
                    if (params.motion && params.motionGroup) {
                        console.warn("'motion' and 'motionGroup' are both set!");
                    }
                }
                return shape;
            }

            public createCanvas(params:IGeneralCreateParams):flashimpl.Canvas {
                return new flashimpl.Canvas(this.root, this.root, params, this._ad);
            }

            public createButton(text:string, params:IGeneralCreateParams):any {
                throw new NotImplementedError();
            }

            public createGlowFilter(color:number = 0xff0000, alpha:number = 1.0, blurX:number = 6.0,
                                    blurY:number = 6.0, strength:number = 2, quality:number = BitmapFilterQuality.LOW,
                                    inner:boolean = false, knockout:boolean = false):GlowFilter {
                return new GlowFilter(this._ad.startParams.stage.worldRenderer.filterManager,
                    color, alpha, blurX, blurY, strength, quality, inner, knockout);
            }

            public createBlurFilter(blurX:number = 4.0, blurY:number = 4.0, quality:number = 1):BlurFilter {
                return new BlurFilter(this._ad.startParams.stage.worldRenderer.filterManager, blurX, blurY, quality);
            }

            public toIntVector(array:Array<number>):Array<number> {
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

            public toUIntVector(array:Array<number>):Array<number> {
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

            public toNumberVector(array:Array<number>):Array<number> {
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

            public createVector3D(x:number = 0, y:number = 0, z:number = 0, w:number = 0):flash.geom.Vector3D {
                return new flash.geom.Vector3D(x, y, z, w);
            }

            public createMatrix3D(a:Array<number> = null):flash.geom.Matrix3D {
                return new flash.geom.Matrix3D(a);
            }

            public createColorTransform():flash.geom.ColorTransform {
                return new flash.geom.ColorTransform();
            }

            public createTextFormat():flash.text.TextFormat {
                return new flash.text.TextFormat();
            }

            public createGraphic():Graphics {
                throw new NotImplementedError();
            }

            // CCL compatible
            // jabbany
            public projectVector(matrix:flash.geom.Matrix3D, vector:flash.geom.Vector3D):flash.geom.Vector3D {
                return matrix.transformVector(vector);
            }

            // CCL compatible
            // jabbany
            public projectVectors(matrix:flash.geom.Matrix3D, vertices:Array<number>, projectedVertices:Array<number>, uvts:Array<number>):void {
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

            public get root():Stage {
                // TODO: Remove force type cast when flash.d.ts is fully synced with implementations.
                return this._ad.startParams.stage;
            }

            private _ad:AdvancedDanmaku;

        }

        export class Player extends ProofObject {

            private _ad:AdvancedDanmaku;

            public constructor(ad:AdvancedDanmaku) {
                super();
                this._ad = ad;
            }

            public play():void {
                throw new NotImplementedError();
            }

            public pause():void {
                throw new NotImplementedError();
            }

            public seek(offset:number):void {
                throw new NotImplementedError();
            }

            public jump(av:string, page:number = 1, newWindow:boolean = false):void {
                throw new NotImplementedError();
            }

            public get state():string {
                throw new NotImplementedError();
            }

            public get time():number {
                throw new NotImplementedError();
            }

            public commentTrigger(f:(cd:CommentData)=>void, timeout:number = 1000):number {
                throw new NotImplementedError();
            }

            public keyTrigger(f:(key:number)=>void, timeout:number = 1000, up:boolean = false):number {
                throw new NotImplementedError();
            }

            public setMask(obj:DisplayObject):void {
                throw new NotImplementedError();
            }

            public createSound(t:string, onLoad:Function = null):any {
                throw new NotImplementedError();
            }

            public get commentList():Array<CommentData> {
                throw new NotImplementedError();
            }

            public refreshRate:number;

            public get width():number {
                throw new NotImplementedError();
            }

            public get height():number {
                throw new NotImplementedError();
            }

            public get videoWidth():number {
                throw new NotImplementedError();
            }

            public get videoHeight():number {
                throw new NotImplementedError();
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

        export class CommentField extends DisplayObject implements IProofDanmakuObject {

            private _ad:AdvancedDanmaku;

            public constructor(root:Stage, parent:DisplayObjectContainer,
                               createParams:IGeneralCreateParams, ad:AdvancedDanmaku) {
                super(root, parent);
                this._createParams = createParams;
                this._lifeTime = ad.startParams.bp.options.commentLifeTime;
                this._ad = ad;
            }

            public alwaysShowSelection:boolean = false;

            public get background():boolean {
                return this._background;
            }

            public set background(v:boolean) {
                var b = this._background != v;
                this._background = v;
            }

            public get backgroundColor():number {
                return this._backgroundColor;
            }

            public set backgroundColor(v:number) {
                v |= 0;
                var b = this._backgroundColor != v;
                this._backgroundColor = v;
            }

            public get border():boolean {
                return this._border;
            }

            public set border(v:boolean) {
                var b = this._border != v;
                this._border = v;
            }

            public get borderColor():number {
                return this._borderColor;
            }

            public set borderColor(v:number) {
                v |= 0;
                var b = this._borderColor != v;
                this._borderColor = v;
            }

            public get bottomScrollV():number {
                throw new NotImplementedError();
            }

            public condenseWhite:boolean = true;
            public defaultTextFormat:flash.text.TextFormat = null;
            public gridFitType:string = GridFitType.NONE;

            public get htmlText():string {
                throw new NotImplementedError();
            }

            public set htmlText(v:string) {
                throw new NotImplementedError();
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
                return this._numLines;
            }

            public restrict:string = RestrictEncoding.NULL;
            public sharpness:number = 0;
            public autoSize:boolean = true;

            public get text():string {
                return this._text;
            }

            public set text(v:string) {
                var b = this._text != v;
                this._text = v;
            }

            public get textColor():number {
                return this._textColor;
            }

            public set textColor(v:number) {
                v |= 0;
                var b = this._textColor != v;
                this._textColor = v;
            }

            public get textHeight():number {
                return this.fontsize;
            }

            public get textWidth():number {
                return this._textWidth;
            }

            public get thickness():number {
                return this._thickness;
            }

            public set thickness(v:number) {
                if (v < 0) {
                    v = 0;
                }
                var b = this._thickness != v;
                this._thickness = v;
            }

            public wordWrap:boolean = false;

            public get fontsize():number {
                return this._fontsize;
            }

            public set fontsize(v:number) {
                if (v < 1) {
                    v = 1;
                }
                var b = this._fontsize != v;
                this._fontsize = v;
            }

            public get bold():boolean {
                return this._bold;
            }

            public set bold(v:boolean) {
                var b = this._bold != v;
                this._bold = v;
            }

            public get italic():boolean {
                return this._italic;
            }

            public set italic(v:boolean) {
                var b = this._italic != v;
                this._italic = v;
            }

            public appendText(newText:string):void {
                this.text += newText;
            }

            public get createParams():IGeneralCreateParams {
                return this._createParams;
            }

            // Bulletproof
            public get lifeTime():number {
                return this._lifeTime;
            }

            private _background:boolean = false;
            private _backgroundColor:number = 0xffffff;
            private _border:boolean = false;
            private _borderColor:number = 0x000000;
            private _textColor:number = 0xffffff;
            private _thickness:number = 0;
            private _bold:boolean = false;
            private _italic:boolean = false;
            private _fontsize:number = 12;
            private _htmlText:string;
            private _text:string;
            private _textFillStyle:string;
            private _textStrokeStyle:string;
            private _backgroundFillStyle:string;
            private _borderStrokeStyle:string;
            private _needRecalcNumLines:boolean = true;
            private _numLines:number;
            private _fontString:string;
            private _textWidth:number;
            private static _defaultTextHeight:number = 12;
            private static _defaultTextFontFamily:string = 'SimHei';
            private static _defaultBorderWidth:number = 1;
            private _createParams:IGeneralCreateParams;
            private _lifeTime:number;

        }

        export class CommentBitmap extends FlashBitmap {
        }

        export class Global {

            private _map:OMap<string, any> = new OMap<string, any>();
            private _ad:AdvancedDanmaku;

            public constructor(ad:AdvancedDanmaku) {
                this._ad = ad;
            }

            public _set(key:string, val:any):void {
                this._map.set(key, val);
            }

            public _get(key:string):any {
                return this._map.get(key);
            }

        }

        export class ScriptManager {

            private _ad:AdvancedDanmaku;

            public constructor(ad:AdvancedDanmaku) {
                this._ad = ad;
            }

            public clearTimer():void {
                throw new NotImplementedError();
            }

            public clearEl():void {
                throw new NotImplementedError();
            }

            public clearTrigger():void {
                throw new NotImplementedError();
            }

        }

        export class Tween {

            private _ad:AdvancedDanmaku;

            public constructor(ad:AdvancedDanmaku) {
                this._ad = ad;
            }

            public tween(object:Object, dest:Object, src:Object, duration:number, easing:Function):Tween {
                throw new NotImplementedError();
            }

            public to(object:Object, dest:Object, duration:number, easing:Function):Tween {
                throw new NotImplementedError();
            }

            public bezier(object:Object, dest:Object, src:Object, control:Object):Tween {
                throw new NotImplementedError();
            }

            public scale(src:ITween, scale:number):ITween {
                throw new NotImplementedError();
            }

            public delay(src:ITween, delay:number):ITween {
                throw new NotImplementedError();
            }

            public reverse(src:ITween):ITween {
                throw new NotImplementedError();
            }

            public repeat(src:ITween, times:number):ITween {
                throw new NotImplementedError();
            }

            public slice(src:ITween, from:number, to:number):ITween {
                throw new NotImplementedError();
            }

            public serial(src1:ITween, ...other:Array<ITween>):ITween {
                throw new NotImplementedError();
            }

            public parallel(src1:ITween, ...other:Array<ITween>):ITween {
                throw new NotImplementedError();
            }

        }

        export class TweenImpl extends fl.transitions.Tween implements ITween {

            public constructor(obj:Object, prop:string, func:Function, begin:number, finish:number, duration:number, useSeconds:boolean = false) {
                super(obj, prop, func, begin, finish, duration, useSeconds);
            }

            public stopOnComplete:boolean;

            public play():void {
                throw new NotImplementedError();
            }

            public stop():void {
            }

            public gotoAndPlay(time:number):void {
                throw new NotImplementedError();
            }

            public gotoAndStop(time:number):void {
                throw new NotImplementedError();
            }

            public togglePause():void {
                throw new NotImplementedError();
            }

        }

        export class Bitmap {

            private _ad:AdvancedDanmaku;

            public __canUse:boolean = false;

            public constructor(ad:AdvancedDanmaku) {
                this._ad = ad;
            }

            public createBitmapData(width:number, height:number, transparent:boolean = true, fillColor:number = 0xffffffff):FlashBitmapData {
                throw new NotImplementedError();
            }

            public createRectangle(x:number = 0, y:number = 0, width:number = 0, height:number = 0):flash.geom.Rectangle {
                return new flash.geom.Rectangle(x, y, width, height);
            }

            public createBitmap(params:ICommentBitmapCreateParams):CommentBitmap {
                throw new NotImplementedError();
            }

        }

        export class Storage {

            private _ad:AdvancedDanmaku;

            public constructor(ad:AdvancedDanmaku) {
                this._ad = ad;
            }

            public __canUse:boolean = false;

            public loadRank(complete:Function, err:Function = null):void {
                throw new NotImplementedError();
            }

            public uploadScore(score:number, name:string = null, complete:Function = null, err:Function = null):void {
                throw new NotImplementedError();
            }

            public saveData(userData:any, complete:Function = null, err:Function = null):void {
                throw new NotImplementedError();
            }

            public loadData(complete:Function = null, err:Function = null):void {
                throw new NotImplementedError();
            }

        }

        export class Utils {

            private _ad:AdvancedDanmaku;

            public constructor(ad:AdvancedDanmaku) {
                this._ad = ad;
            }

            public hue(v:number):number {
                v = v % 360;
                // http://blog.sina.com.cn/s/blog_5de73d0b0101baxq.html
                var lambda = v / 60 * 255;
                var r = mic.util.limit(510 - lambda, 0, 255);
                var g = mic.util.limit(v < 180 ? lambda : lambda - 510, 0, 255);
                var b = mic.util.limit(v < 180 ? lambda - 510 : lambda, 0, 255);
                return (0xff << 24) | (r << 16) | (g << 8) | b;
            }

            public rgb(r:number, g:number, b:number):number {
                r = mic.util.limit(r, 0, 255);
                g = mic.util.limit(g, 0, 255);
                b = mic.util.limit(b, 0, 255);
                return (0xff << 24) | (r << 16) | (g << 8) | b;
            }

            public formatTimes(time:number):string {
                throw new NotImplementedError();
            }

            public delay(closure:Function|string, delay:number):number {
                if (typeof closure == 'string') {
                    closure += '();';
                }
                return setTimeout(closure, delay);
            }

            public interval(closure:Function|string, delay:number, times:number):flashimpl.Timer {
                return new flashimpl.Timer(closure, delay, times);
            }

            public distance(x1:number, y1:number, x2:number, y2:number):number {
                return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
            }

            public rand(min:number, max:number):number {
                console.assert(min < max, 'max must be bigger than min.');
                return Math.random() * (max - min) + min;
            }

        }

        export class _Global {

            private _ad:AdvancedDanmaku;
            private _utils:Utils;
            private _display:Display;
            private _global:Global;

            public constructor(ad:AdvancedDanmaku, utils:Utils, display:Display, global:Global) {
                this._ad = ad;
                this._utils = utils;
                this._display = display;
                this._global = global;
            }

            public trace(message:string):void {
                console.debug(message);
            }

            public clear():void {
                console.clear();
            }

            public getTimer():number {
                return Date.now() - this._ad.startParams.startDate.getTime();
            }

            public timer(closure:Function|string, delay:number):number {
                return this._utils.delay(closure, delay);
            }

            public interval(closure:Function|string, delay:number, times:number = 1):flashimpl.Timer {
                return this._utils.interval(closure, delay, times);
            }

            public foreach(loop:Object, f:(key:string, value:any)=>any):void {
                for (var key in loop
                    ) {
                    if (loop.hasOwnProperty(key)) {
                        f(key, loop[key]);
                    }
                }
            }

            public clone(object:Object):Object {
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
                                        o[key] = cloneInternal(object[key]);
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


            public load(libraryName:string, onComplete:()=>any):void {
                var availableLibraries = [
                    'libBitmap',
                    'libStorage'
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
            }

            public get $():Display {
                return this._display;
            }

            public get $G():Global {
                return this._global;
            }

        }

        export class GridFitType {

            public static get NONE():string {
                return 'none';
            }

            public static get PIXEL():string {
                return 'pixel';
            }

            public static get SUBPIXEL():string {
                return 'subpixel';
            }

        }

        export class RestrictEncoding {

            public static get NULL():string {
                return null;
            }

            public static get UTF8():string {
                return 'utf8';
            }

            public static get GBK():string {
                return 'gbk';
            }

        }

    }

    export class BiliBiliDanmakuApi {

        public Display:bilidanmaku.Display;
        public Bitmap:bilidanmaku.Bitmap;
        public Storage:bilidanmaku.Storage;
        public Global:bilidanmaku.Global;
        public Player:bilidanmaku.Player;
        public ScriptManager:bilidanmaku.ScriptManager;
        public Tween:bilidanmaku.Tween;
        public Utils:bilidanmaku.Utils;
        public $:bilidanmaku.Display;
        public $G:bilidanmaku.Global;

        public static attachApi(ad:AdvancedDanmaku):void {
            var api = new BiliBiliDanmakuApi();
            api.Display = new bilidanmaku.Display(ad);
            api.Bitmap = new bilidanmaku.Bitmap(ad);
            api.Storage = new bilidanmaku.Storage(ad);
            api.Global = new bilidanmaku.Global(ad);
            api.Player = new bilidanmaku.Player(ad);
            api.ScriptManager = new bilidanmaku.ScriptManager(ad);
            api.Tween = new bilidanmaku.Tween(ad);
            api.Utils = new bilidanmaku.Utils(ad);
            api.$ = api.Display;
            api.$G = api.Global;
            var g = new bilidanmaku._Global(ad, api.Utils, api.Display, api.Global);
            api.trace = g.trace.bind(g);
            api.clear = g.clear.bind(g);
            api.getTimer = g.getTimer.bind(g);
            api.timer = g.timer.bind(g);
            api.interval = g.interval.bind(g);
            api.foreach = g.foreach.bind(g);
            api.clone = g.clone.bind(g);
            api.load = g.load.bind(g);
            ad.api = api;
        }

        public trace:(str:string)=>void;
        public clear:()=>void;
        public getTimer:()=>number;
        public timer:(closure:string|Function, delay:number)=>number;
        public interval:(closure:string|Function, delay:number, repeat:number)=>bilidanmaku.flashimpl.Timer;
        public foreach:(loop:Object, f:(key:string, value:any)=>void)=>void;
        public clone:(obj:Object)=>Object;
        public load:(libraryName:string, complete:(arg:any)=>void)=>void;

    }

}
