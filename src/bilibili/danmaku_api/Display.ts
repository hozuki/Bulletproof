/**
 * Created by MIC on 2015/12/29.
 */

import {BiliBiliDanmakuApiContainer} from "../BiliBiliDanmakuApiContainer";
import {BiliBiliDamakuApiObject} from "./BiliBiliDamakuApiObject";
import {DCShape} from "../../danmaku/scripted/dco/DCShape";
import {IGeneralCreateParams} from "./data_types/IGeneralCreateParams";
import {ICommentButtonCreateParams} from "./data_types/ICommentButtonCreateParams";
import {CommentField} from "./CommentField";
import {Matrix} from "../../../lib/glantern/src/flash/geom/Matrix";
import {Point} from "../../../lib/glantern/src/flash/geom/Point";
import {TextField} from "../../../lib/glantern/src/flash/text/TextField";
import {NotImplementedError} from "../../../lib/glantern/lib/glantern-utils/src/NotImplementedError";
import {BitmapFilterQuality} from "../../../lib/glantern/src/flash/filters/BitmapFilterQuality";
import {GlowFilter} from "../../../lib/glantern/src/flash/filters/GlowFilter";
import {BlurFilter} from "../../../lib/glantern/src/flash/filters/BlurFilter";
import {Vector3D} from "../../../lib/glantern/src/flash/geom/Vector3D";
import {Matrix3D} from "../../../lib/glantern/src/flash/geom/Matrix3D";
import {ColorTransform} from "../../../lib/glantern/src/flash/geom/ColorTransform";
import {TextFormat} from "../../../lib/glantern/src/flash/text/TextFormat";
import {Graphics} from "../../../lib/glantern/src/flash/display/Graphics";
import {GLUtil} from "../../../lib/glantern/lib/glantern-utils/src/GLUtil";

export class Display extends BiliBiliDamakuApiObject {

    constructor(apiContainer:BiliBiliDanmakuApiContainer) {
        super(apiContainer);
    }

    get fullScreenWidth():number {
        return window.screen.width;
    }

    get fullScreenHeight():number {
        return window.screen.height;
    }

    get width():number {
        return this.apiContainer.bulletproof.view.width;
    }

    get height():number {
        return this.apiContainer.bulletproof.view.height;
    }

    createMatrix(a:number = 1, b:number = 0, c:number = 1, d:number = 1, tx:number = 0, ty:number = 0):Matrix {
        return new Matrix(a, b, c, d, tx, ty);
    }

    createPoint(x:number = 0, y:number = 0):Point {
        return new Point(x, y);
    }

    createComment(text:string, params:IGeneralCreateParams):TextField {
        var danmaku = this.apiContainer.danmaku;
        var textField = new CommentField(danmaku.stage, danmaku, params, this.__getExtraCreateParams());
        textField.text = text;
        textField.textColor = 0xffffff;
        // Use "Arial" as default font for users outside China.
        textField.defaultTextFormat.font = "SimHei";
        danmaku.addChild(textField);
        return textField;
    }

    createShape(params:IGeneralCreateParams):DCShape {
        var danmaku = this.apiContainer.danmaku;
        var shape = new DCShape(danmaku.stage, danmaku, params, this.__getExtraCreateParams());
        danmaku.addChild(shape);
        return shape;
    }

    createCanvas(params:IGeneralCreateParams):any {
        throw new NotImplementedError();
    }

    createButton(text:string, params:ICommentButtonCreateParams):any {
        throw new NotImplementedError();
    }

    createGlowFilter(color:number = 0xff0000, alpha:number = 1.0, blurX:number = 6.0,
                     blurY:number = 6.0, strength:number = 2, quality:number = BitmapFilterQuality.LOW,
                     inner:boolean = false, knockout:boolean = false):GlowFilter {
        var renderer = this.apiContainer.danmaku.stage.worldRenderer;
        return new GlowFilter(renderer.filterManager, color, alpha, blurX, blurY, strength, quality, inner, knockout);
    }

    createBlurFilter(blurX:number = 4.0, blurY:number = 4.0, quality:number = BitmapFilterQuality.LOW):BlurFilter {
        var renderer = this.apiContainer.danmaku.stage.worldRenderer;
        return new BlurFilter(renderer.filterManager, blurX, blurY, quality);
    }

    toIntVector(array:number[]):number[] {
        // jabbany
        Object.defineProperty(array, "as3Type", {
            get: function () {
                return "Vector.<int>";
            }
        });
        return array;
    }

    toUIntVector(array:number[]):number[] {
        // jabbany
        Object.defineProperty(array, "as3Type", {
            get: function () {
                return "Vector.<uint>";
            }
        });
        return array;
    }

    toNumberVector(array:number[]):number[] {
        // jabbany
        Object.defineProperty(array, "as3Type", {
            get: function () {
                return "Vector.<number>";
            }
        });
        return array;
    }

    createVector3D(x:number = 0, y:number = 0, z:number = 0, w:number = 0):Vector3D {
        return new Vector3D(x, y, z, w);
    }

    createMatrix3D(a:number[] = null):Matrix3D {
        return new Matrix3D(a);
    }

    createColorTransform():ColorTransform {
        return new ColorTransform();
    }

    createTextFormat():TextFormat {
        return new TextFormat();
    }

    createGraphic():Graphics {
        throw new NotImplementedError();
    }

    projectVector(matrix:Matrix3D, vector:Vector3D):Vector3D {
        return matrix.transformVector(vector);
    }

    projectVectors(matrix:Matrix3D, vertices:number[], projectedVertices:number[], uvts:number[]):void {
        while (projectedVertices.length > 0) {
            projectedVertices.pop();
        }
        if (vertices.length % 3 != 0) {
            GLUtil.trace("Display.projectVectors input vertex Vector must be a multiple of 3.");
            return;
        }
        var transformed:number[] = [];
        matrix.transformVectors(vertices, transformed);
        for (var i = 0; i < transformed.length / 3; i++) {
            var x = transformed[i * 3], y = transformed[i * 3 + 1];
            projectedVertices.push(x, y);
        }
    }

}
