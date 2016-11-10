/**
 * Created by MIC on 2015/12/29.
 */

import DanmakuApiContainer from "../DanmakuApiContainer";
import DCShape from "../../danmaku/scripted/dco/DCShape";
import IGeneralCreateParams from "./data_types/IGeneralCreateParams";
import ICommentButtonCreateParams from "./data_types/ICommentButtonCreateParams";
import CommentField from "./CommentField";
import Matrix from "../../../../lib/glantern/src/gl/flash/geom/Matrix";
import Point from "../../../../lib/glantern/src/gl/flash/geom/Point";
import TextField from "../../../../lib/glantern/src/gl/flash/text/TextField";
import BitmapFilterQuality from "../../../../lib/glantern/src/gl/flash/filters/BitmapFilterQuality";
import GlowFilter from "../../../../lib/glantern/src/gl/flash/filters/GlowFilter";
import BlurFilter from "../../../../lib/glantern/src/gl/flash/filters/BlurFilter";
import Vector3D from "../../../../lib/glantern/src/gl/flash/geom/Vector3D";
import Matrix3D from "../../../../lib/glantern/src/gl/flash/geom/Matrix3D";
import ColorTransform from "../../../../lib/glantern/src/gl/flash/geom/ColorTransform";
import TextFormat from "../../../../lib/glantern/src/gl/flash/text/TextFormat";
import Graphics from "../../../../lib/glantern/src/gl/flash/display/Graphics";
import CommonUtil from "../../../../lib/glantern/src/gl/mic/CommonUtil";
import InstanceDanmakuApiObject from "../internal/InstanceDanmakuApiObject";
import VirtualDom from "../../../../lib/glantern/src/gl/mic/VirtualDom";
import NotSupportedError from "../../../../lib/glantern/src/gl/flash/errors/NotSupportedError";
import DCCanvas from "../../danmaku/scripted/dco/DCCanvas";
import DCButton from "../../danmaku/scripted/dco/DCButton";

export default class Display extends InstanceDanmakuApiObject {

    constructor(apiContainer: DanmakuApiContainer) {
        super(apiContainer);
    }

    get fullScreenWidth(): number {
        return VirtualDom.screenWidth;
    }

    get fullScreenHeight(): number {
        return VirtualDom.screenHeight;
    }

    get width(): number {
        return this.apiContainer.engine.view.width;
    }

    get height(): number {
        return this.apiContainer.engine.view.height;
    }

    createMatrix(a: number = 1, b: number = 0, c: number = 1, d: number = 1, tx: number = 0, ty: number = 0): Matrix {
        return new Matrix(a, b, c, d, tx, ty);
    }

    createPoint(x: number = 0, y: number = 0): Point {
        return new Point(x, y);
    }

    createComment(text: string, params: IGeneralCreateParams): TextField {
        var danmaku = this.apiContainer.danmaku;
        var textField = new CommentField(danmaku.stage, danmaku, params, this._$getExtraCreateParams());
        textField.text = text;
        textField.textColor = 0xffffff;
        // Use "Arial" as default font for users outside China.
        textField.defaultTextFormat.font = "SimHei";
        danmaku.addChild(textField);
        return textField;
    }

    createShape(params: IGeneralCreateParams): DCShape {
        var danmaku = this.apiContainer.danmaku;
        var shape = new DCShape(danmaku.stage, danmaku, params, this._$getExtraCreateParams());
        danmaku.addChild(shape);
        return shape;
    }

    createCanvas(params: IGeneralCreateParams): DCCanvas {
        var danmaku = this.apiContainer.danmaku;
        var canvas = new DCCanvas(danmaku.stage, danmaku, params, this._$getExtraCreateParams());
        danmaku.addChild(canvas);
        return canvas;
    }

    createButton(params: ICommentButtonCreateParams): DCButton;
    createButton(text: string, params: ICommentButtonCreateParams): DCButton;
    createButton(p1: any, p2?: any): DCButton {
        var params: ICommentButtonCreateParams = typeof p1 !== "string" ? p1 : p2;
        params = params || <ICommentButtonCreateParams>Object.create(null);
        var text = typeof p1 === "string" ? p1 : (params.text || "");
        var danmaku = this.apiContainer.danmaku;
        var button = new DCButton(danmaku.stage, danmaku, params, this._$getExtraCreateParams());
        danmaku.addChild(button);
        return button;
    }

    createGlowFilter(color: number = 0xff0000, alpha: number = 1.0, blurX: number = 6.0,
                     blurY: number = 6.0, strength: number = 2, quality: number = BitmapFilterQuality.LOW,
                     inner: boolean = false, knockout: boolean = false): GlowFilter {
        var renderer = this.apiContainer.danmaku.stage.$worldRenderer;
        return new GlowFilter(renderer.filterManager, color, alpha, blurX, blurY, strength, quality, inner, knockout);
    }

    createBlurFilter(blurX: number = 4.0, blurY: number = 4.0, quality: number = BitmapFilterQuality.LOW): BlurFilter {
        var renderer = this.apiContainer.danmaku.stage.$worldRenderer;
        return new BlurFilter(renderer.filterManager, blurX, blurY, quality);
    }

    toIntVector(array: number[]): number[] {
        // jabbany
        Object.defineProperty(array, "as3Type", {
            get: function (): string {
                return "Vector.<int>";
            }
        });
        return array;
    }

    toUIntVector(array: number[]): number[] {
        // jabbany
        Object.defineProperty(array, "as3Type", {
            get: function (): string {
                return "Vector.<uint>";
            }
        });
        return array;
    }

    toNumberVector(array: number[]): number[] {
        // jabbany
        Object.defineProperty(array, "as3Type", {
            get: function (): string {
                return "Vector.<number>";
            }
        });
        return array;
    }

    createVector3D(x: number = 0, y: number = 0, z: number = 0, w: number = 0): Vector3D {
        return new Vector3D(x, y, z, w);
    }

    createMatrix3D(a: number[] = null): Matrix3D {
        return new Matrix3D(a);
    }

    createColorTransform(): ColorTransform {
        return new ColorTransform();
    }

    createTextFormat(): TextFormat {
        return new TextFormat();
    }

    createGraphic(): Graphics {
        throw new NotSupportedError();
    }

    projectVector(matrix: Matrix3D, vector: Vector3D): Vector3D {
        return matrix.transformVector(vector);
    }

    projectVectors(matrix: Matrix3D, vertices: number[], projectedVertices: number[], uvts: number[] = null): void {
        while (projectedVertices.length > 0) {
            projectedVertices.pop();
        }
        if (vertices.length % 3 !== 0) {
            CommonUtil.trace("Display.projectVectors input vertex Vector must be a multiple of 3.");
            return;
        }
        var transformed: number[] = [];
        matrix.transformVectors(vertices, transformed);
        for (var i = 0; i < transformed.length / 3; i++) {
            var x = transformed[i * 3], y = transformed[i * 3 + 1];
            projectedVertices.push(x, y);
        }
    }

}
