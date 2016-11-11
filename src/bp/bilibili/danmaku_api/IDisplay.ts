/**
 * Created by MIC on 2016-11-11.
 */

import Matrix from "../../../../lib/glantern/src/gl/flash/geom/Matrix";
import Point from "../../../../lib/glantern/src/gl/flash/geom/Point";
import IGeneralCreateParams from "./data_types/IGeneralCreateParams";
import DCShape from "../../danmaku/scripted/dco/DCShape";
import CommentField from "./CommentField";
import DCCanvas from "../../danmaku/scripted/dco/DCCanvas";
import DCButton from "../../danmaku/scripted/dco/DCButton";
import ICommentButtonCreateParams from "./data_types/ICommentButtonCreateParams";
import GlowFilter from "../../../../lib/glantern/src/gl/flash/filters/GlowFilter";
import BlurFilter from "../../../../lib/glantern/src/gl/flash/filters/BlurFilter";
import Vector3D from "../../../../lib/glantern/src/gl/flash/geom/Vector3D";
import Matrix3D from "../../../../lib/glantern/src/gl/flash/geom/Matrix3D";
import ColorTransform from "../../../../lib/glantern/src/gl/flash/geom/ColorTransform";
import TextFormat from "../../../../lib/glantern/src/gl/flash/text/TextFormat";
import Graphics from "../../../../lib/glantern/src/gl/flash/display/Graphics";

interface IDisplay {

    fullScreenWidth: number;
    fullScreenHeight: number;
    width: number;
    height: number;
    createMatrix(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number): Matrix;
    createPoint(x?: number, y?: number): Point;
    createComment(text: string, params: IGeneralCreateParams): CommentField;
    createShape(params: IGeneralCreateParams): DCShape
    createCanvas(params: IGeneralCreateParams): DCCanvas;
    createButton(params: ICommentButtonCreateParams): DCButton;
    createButton(text: string, params: ICommentButtonCreateParams): DCButton;
    createGlowFilter(color?: number, alpha?: number, blurX?: number, blurY?: number, strength?: number, quality?: number, inner?: boolean, knockout?: boolean): GlowFilter
    createBlurFilter(blurX?: number, blurY?: number, quality?: number): BlurFilter
    toIntVector(array: number[]): number[];
    toUIntVector(array: number[]): number[];
    toNumberVector(array: number[]): number[];
    createVector3D(x?: number, y?: number, z?: number, w?: number): Vector3D;
    createMatrix3D(a?: number[]): Matrix3D;
    createColorTransform(): ColorTransform;
    createTextFormat(): TextFormat;
    createGraphic(): Graphics;
    projectVector(matrix: Matrix3D, vector: Vector3D): Vector3D;
    projectVectors(matrix: Matrix3D, vertices: number[], projectedVertices: number[], uvts?: number[]): void;

}

export default IDisplay;
