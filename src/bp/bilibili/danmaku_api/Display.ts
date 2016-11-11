/**
 * Created by MIC on 2015/12/29.
 */

import DCShape from "../../danmaku/scripted/dco/DCShape";
import IGeneralCreateParams from "./data_types/IGeneralCreateParams";
import ICommentButtonCreateParams from "./data_types/ICommentButtonCreateParams";
import CommentField from "./CommentField";
import Matrix from "../../../../lib/glantern/src/gl/flash/geom/Matrix";
import Point from "../../../../lib/glantern/src/gl/flash/geom/Point";
import BitmapFilterQuality from "../../../../lib/glantern/src/gl/flash/filters/BitmapFilterQuality";
import GlowFilter from "../../../../lib/glantern/src/gl/flash/filters/GlowFilter";
import BlurFilter from "../../../../lib/glantern/src/gl/flash/filters/BlurFilter";
import Vector3D from "../../../../lib/glantern/src/gl/flash/geom/Vector3D";
import Matrix3D from "../../../../lib/glantern/src/gl/flash/geom/Matrix3D";
import ColorTransform from "../../../../lib/glantern/src/gl/flash/geom/ColorTransform";
import TextFormat from "../../../../lib/glantern/src/gl/flash/text/TextFormat";
import Graphics from "../../../../lib/glantern/src/gl/flash/display/Graphics";
import CommonUtil from "../../../../lib/glantern/src/gl/mic/CommonUtil";
import VirtualDom from "../../../../lib/glantern/src/gl/mic/VirtualDom";
import NotSupportedError from "../../../../lib/glantern/src/gl/flash/errors/NotSupportedError";
import DCCanvas from "../../danmaku/scripted/dco/DCCanvas";
import DCButton from "../../danmaku/scripted/dco/DCButton";
import Engine from "../../mic/Engine";
import ScriptedDanmakuProvider from "../../danmaku/scripted/ScriptedDanmakuProvider";
import DCOHelper from "../../danmaku/scripted/dco/DCOHelper";

export default class Display {

    static get fullScreenWidth(): number {
        return VirtualDom.screenWidth;
    }

    static get fullScreenHeight(): number {
        return VirtualDom.screenHeight;
    }

    static get width(): number {
        return Engine.instance.view.width;
    }

    static get height(): number {
        return Engine.instance.view.height;
    }

    static createMatrix(a: number = 1, b: number = 0, c: number = 1, d: number = 1, tx: number = 0, ty: number = 0): Matrix {
        return new Matrix(a, b, c, d, tx, ty);
    }

    static createPoint(x: number = 0, y: number = 0): Point {
        return new Point(x, y);
    }

    static createComment(text: string, params: IGeneralCreateParams): CommentField {
        var provider = ScriptedDanmakuProvider.instance;
        var layer = provider.layer;
        var textField = new CommentField(layer.stage, layer, params, DCOHelper.getExtraCreateParams());
        textField.text = text;
        textField.textColor = 0xffffff;
        // Use "Arial" as default font for users outside China.
        textField.defaultTextFormat.font = "SimHei";
        layer.addChild(textField);
        provider.registerElement(textField);
        return textField;
    }

    static createShape(params: IGeneralCreateParams): DCShape {
        var provider = ScriptedDanmakuProvider.instance;
        var layer = provider.layer;
        var shape = new DCShape(layer.stage, layer, params, DCOHelper.getExtraCreateParams());
        layer.addChild(shape);
        provider.registerElement(shape);
        return shape;
    }

    static createCanvas(params: IGeneralCreateParams): DCCanvas {
        var provider = ScriptedDanmakuProvider.instance;
        var layer = provider.layer;
        var canvas = new DCCanvas(layer.stage, layer, params, DCOHelper.getExtraCreateParams());
        layer.addChild(canvas);
        provider.registerElement(canvas);
        return canvas;
    }

    static createButton(params: ICommentButtonCreateParams): DCButton;
    static createButton(text: string, params: ICommentButtonCreateParams): DCButton;
    static createButton(p1: any, p2?: any): DCButton {
        var params: ICommentButtonCreateParams = typeof p1 !== "string" ? p1 : p2;
        params = params || <ICommentButtonCreateParams>Object.create(null);
        var text = typeof p1 === "string" ? p1 : (params.text || "");
        var provider = ScriptedDanmakuProvider.instance;
        var layer = provider.layer;
        var button = new DCButton(layer.stage, layer, params, DCOHelper.getExtraCreateParams());
        layer.addChild(button);
        provider.registerElement(button);
        return button;
    }

    static createGlowFilter(color: number = 0xff0000, alpha: number = 1.0, blurX: number = 6.0,
                            blurY: number = 6.0, strength: number = 2, quality: number = BitmapFilterQuality.LOW,
                            inner: boolean = false, knockout: boolean = false): GlowFilter {
        var renderer = ScriptedDanmakuProvider.instance.layer.stage.$worldRenderer;
        return new GlowFilter(renderer.filterManager, color, alpha, blurX, blurY, strength, quality, inner, knockout);
    }

    static createBlurFilter(blurX: number = 4.0, blurY: number = 4.0, quality: number = BitmapFilterQuality.LOW): BlurFilter {
        var renderer = ScriptedDanmakuProvider.instance.layer.stage.$worldRenderer;
        return new BlurFilter(renderer.filterManager, blurX, blurY, quality);
    }

    static toIntVector(array: number[]): number[] {
        // jabbany
        Object.defineProperty(array, "as3Type", {
            get: function (): string {
                return "Vector.<int>";
            }
        });
        return array;
    }

    static toUIntVector(array: number[]): number[] {
        // jabbany
        Object.defineProperty(array, "as3Type", {
            get: function (): string {
                return "Vector.<uint>";
            }
        });
        return array;
    }

    static toNumberVector(array: number[]): number[] {
        // jabbany
        Object.defineProperty(array, "as3Type", {
            get: function (): string {
                return "Vector.<number>";
            }
        });
        return array;
    }

    static createVector3D(x: number = 0, y: number = 0, z: number = 0, w: number = 0): Vector3D {
        return new Vector3D(x, y, z, w);
    }

    static createMatrix3D(a: number[] = null): Matrix3D {
        return new Matrix3D(a);
    }

    static createColorTransform(): ColorTransform {
        return new ColorTransform();
    }

    static createTextFormat(): TextFormat {
        return new TextFormat();
    }

    static createGraphic(): Graphics {
        throw new NotSupportedError();
    }

    static projectVector(matrix: Matrix3D, vector: Vector3D): Vector3D {
        return matrix.transformVector(vector);
    }

    static projectVectors(matrix: Matrix3D, vertices: number[], projectedVertices: number[], uvts: number[] = null): void {
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
