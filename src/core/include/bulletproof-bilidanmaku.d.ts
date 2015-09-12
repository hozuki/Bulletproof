/**
 * Created by MIC on 2015/9/10.
 */

/// <reference path="bulletproof.d.ts"/>
/// <reference path="bulletproof-data-interface.d.ts"/>
/// <reference path="bulletproof-flash.d.ts"/>
/// <reference path="bulletproof-fl.d.ts"/>
/// <reference path="bulletproof-mx.d.ts"/>

import bulletproof_main = require("bulletproof.d")
import bulletproof_data_interface = require("bulletproof-data-interface.d");
import bulletproof_flash = require("bulletproof-flash.d");
import bulletproof_fl = require("bulletproof-fl.d");
import bulletproof_mx = require("bulletproof-mx.d");

export declare module bulletproof {

    import flash = bulletproof_flash.bulletproof.flash;
    import fl = bulletproof_fl.bulletproof.fl;
    import mx = bulletproof_mx.bulletproof.mx;

    import Bulletproof = bulletproof_main.bulletproof.Bulletproof;
    import IGeneralCreateParams = bulletproof_data_interface.bulletproof.bilidanmaku.IGeneralCreateParams
    import ICommentButtonCreateParams = bulletproof_data_interface.bulletproof.bilidanmaku.ICommentButtonCreateParams;
    import ICommentBitmapCreateParams = bulletproof_data_interface.bulletproof.bilidanmaku.ICommentBitmapCreateParams;

    export class ProofObject {
        static version:string;
    }

    /*
    export class AdvAdapter {
        static instance:AdvAdapter;
        startParams:IProofStartParams;

        static initialize(div:HTMLDivElement, video:HTMLVideoElement, bp:Bulletproof):AdvAdapter;

        getTimer():number;

        getModule():any;
    }
    */

    export interface IProofDanmakuObject {
        createParams:IGeneralCreateParams;
        lifeTime:number;
    }

    export interface IProofStartParams {
        startDate:Date;
        root:HTMLDivElement;
        video:HTMLVideoElement;
        bp:Bulletproof;
        stage:flash.display.Stage;
    }

    export module bilidanmaku {

        export interface Display {
            fullScreenWidth:number;
            fullScreenHeight:number;
            width:number;
            height:number;
            createMatrix(a?:number, b?:number, c?:number, d?:number, tx?:number, ty?:number):flash.geom.Matrix;
            createPoint(x?:number, y?:number):flash.geom.Point;
            createComment(text:string, params:IGeneralCreateParams):CommentField;
            createShape(params:IGeneralCreateParams):flashimpl.Shape;
            createCanvas(params:IGeneralCreateParams):flashimpl.Canvas;
            createButton(text:string, params:ICommentButtonCreateParams):any;
            createGlowFilter(color?:number, alpha?:number, blurX?:number, blurY?:number, strength?:number,
                             quality?:number, inner?:boolean, knockout?:boolean):flash.filters.GlowFilter;
            createBlurFilter(blurX?:number, blurY?:number, quality?:number):flash.filters.BlurFilter;
            toIntVector(array:Array<number>):Array<number>;
            toUIntVector(array:Array<number>):Array<number>;
            toNumberVector(array:Array<number>):Array<number>;
            createVector3D(x?:number, y?:number, z?:number, w?:number):flash.geom.Vector3D;
            createMatrix3D(a?:Array<number>):flash.geom.Matrix3D;
            createColorTransform():flash.geom.ColorTransform;
            createTextFormat():flash.text.TextFormat;
            createGraphic():flash.display.Graphics;
            projectVector(matrix:flash.geom.Matrix3D, vector:flash.geom.Vector3D):flash.geom.Vector3D;
            projectVectors(matrix:flash.geom.Matrix3D, vertices:Array<number>, projectedVertices:Array<number>, uvts:Array<number>):void;
            root:flash.display.Stage;
        }

        var Display:Display;

        export interface Player {
            play():void;
            pause():void;
            seek(offset:number):void;
            jump(av:string, page?:number, newWindow?:boolean):void;
            state:string;
            time:number;
            commentTrigger(f:(cd:CommentData)=>void, timeout?:number):number;
            keyTrigger(f:(key:number)=>void, timeout?:number, up?:boolean):number;
            setMask(obj:flash.display.DisplayObject):void;
            createSound(t:string, onLoad?:Function):flash.media.Sound;
            commentList:Array<CommentData>;
            refreshRate:number;
            width:number;
            height:number;
            videoWidth:number;
            videoHeight:number;
        }

        export var Player:Player;

        export interface PlayerState {
            PLAYING:string;
            STOP:string;
            PAUSE:string;
        }

        export var PlayerState:PlayerState;

        export interface MotionEasing {
            NONE:string;
            BACK:string;
            BOUNCE:string;
            CIRCULAR:string;
            CUBIC:string;
            ELASTIC:string;
            EXPONENTIAL:string;
            SINE:string;
            QUINTIC:string;
            LINEAR:string;
        }

        export var MotionEasing:MotionEasing;

        export class CommentField extends flash.display.DisplayObject implements IProofDanmakuObject {
            constructor(root:flash.display.DisplayObject, parent:flash.display.DisplayObjectContainer,
                        createParams:IGeneralCreateParams);

            alwaysShowSelection:boolean;
            background:boolean;
            backgroundColor:number;
            border:boolean;
            borderColor:boolean;
            bottomScrollV:number;
            condenseWhite:boolean;
            defaultTextFormat:flash.text.TextFormat;
            gridFitType:string;
            htmlText:string;
            length:number;
            multiline:boolean;
            numLines:string;
            restrict:string;
            sharpness:number;
            text:string;
            textColor:number;
            textHeight:number;
            textWidth:number;
            thickness:number;
            wordWrap:boolean;
            fontsize:number;
            bold:boolean;
            x:number;
            y:number;

            appendText(newText:string):void;

            autoSize:boolean;
            italic:boolean;
            createParams:IGeneralCreateParams;
            lifeTime:number;
        }

        export interface CommentData {
            txt:string;
            time:string;
            color:number;
            pool:number;
            mode:number;
            fontSize:number;
        }

        export class CommentBitmap extends flash.display.Bitmap {
        }

        export interface Global {
            _set(key:string, val:any):void;
            _get(key:string):any;
        }

        export var Global:Global;

        export interface ScriptManager {
            clearTimer():void;
            clearEl():void;
            clearTrigger():void;
        }

        export var ScriptManager:ScriptManager;

        export interface ITween {
            play():void;
            gotoAndPlay(time:number):void;
            stop():void;
            gotoAndStop(time:number):void;
            togglePause():void;
            stopOnComplete:boolean;
        }

        export class Tween extends fl.transitions.Tween implements ITween {
            constructor(obj:Object, prop:string, func:Function, begin:number, finish:number, duration:number, useSeconds?:boolean);

            play():void;

            gotoAndPlay(time:number):void;

            stop():void;

            gotoAndStop(time:number):void;

            togglePause():void;

            stopOnComplete:boolean;

            static tween(object:Object, dest:Object, src:Object, duration:number, easing:Function):Tween;

            static to(object:Object, dest:Object, duration:number, easing:Function):Tween;

            static bezier(object:Object, dest:Object, src:Object, control:Object):Tween;

            static scale(src:ITween, scale:number):ITween;

            static delay(src:ITween, delay:number):ITween;

            static reverse(src:ITween):ITween;

            static repeat(src:ITween, times:number):ITween;

            static slice(src:ITween, from:number, to:number):ITween;

            static serial(src1:ITween, ...other:Array<ITween>):ITween;

            static parallel(src1:ITween, ...other:Array<ITween>):ITween;
        }

        export interface Bitmap {
            createBitmapData(width:number, height:number, transparent?:boolean, fillColor?:number):flash.display.BitmapData;
            createRectangle(x?:number, y?:number, width?:number, height?:number):flash.geom.Rectangle;
            createBitmap(params:ICommentBitmapCreateParams):CommentBitmap;
        }

        export var Bitmap:Bitmap;

        export interface Storage {
            loadRank(complete:Function, err?:Function):void;
            uploadScore(score:number, name?:string, complete?:Function, err?:Function):void;
            saveData(userData:any, complete?:Function, err?:Function):void;
            loadData(complete?:Function, err?:Function):void;
        }

        export var Storage:Storage;

        export class Utils {

            static hue(v:number):number;

            static rgb(r:number, g:number, b:number):number;

            static formatTimes(time:number):string;

            static delay(closure:Function|string, delay:number):number;

            static interval(closure:Function|string, delay:number, times:number):flashimpl.Timer;

            static distance(x1:number, y1:number, x2:number, y2:number):number;

            static rand(min:number, max:number):number;
        }

        export function trace(message:string):void;

        export function clear():void;

        function getTimer():number;

        export function timer(closure:Function|string, delay:number):number;

        export function interval(closure:Function|string, delay:number, times?:number):flashimpl.Timer;

        export function foreach(loop:Object, f:(key:string, value:any)=>any):void;

        export function clone(object:Object):Object;

        export function load(libraryName:string, onComplete:()=>any):void;

        export var $:Display;
        export var $G:Global;

        export interface GridFitType {
            NONE:string;
            PIXEL:string;
            SUBPIXEL:string;
        }

        export var GridFitType:GridFitType;

        export interface RestrictEncoding {
            NULL:string;
            UTF8:string;
            GBK:string;
        }

        export var RestrictEncoding:RestrictEncoding;

        export module flashimpl {

            export class Timer extends flash.utils.Timer {
                constructor(closure:Function|string, delay:number, repeatCount?:number);
            }

            export class Shape extends flash.display.Shape implements IProofDanmakuObject {
                constructor(root:flash.display.DisplayObject, parent:flash.display.DisplayObjectContainer,
                            createParams:IGeneralCreateParams);

                createParams:IGeneralCreateParams;
                lifeTime:number;
            }

            export class Canvas extends mx.containers.Canvas implements IProofDanmakuObject {
                constructor(root:flash.display.DisplayObject, parent:flash.display.DisplayObjectContainer,
                            createParams:IGeneralCreateParams);

                createParams:IGeneralCreateParams;
                lifeTime:number;

                remove():void;
            }

        }
    }

}
