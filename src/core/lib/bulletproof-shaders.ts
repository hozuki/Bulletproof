/**
 * Created by MIC on 2015/10/7.
 */

/// <reference path="../../../include/ext/node/node.d.ts"/>

import fs = require("fs");

export module bulletproof {

    export module webgl {

        export module shaders {

            export class VertexShaders {

                private static __init():void {
                    VertexShaders._default = new LazyStringReader('./src/shaders/vert-default.glsl');
                    VertexShaders._blurX = new LazyStringReader('./src/shaders/vert-blur-x.glsl');
                    VertexShaders._blurY = new LazyStringReader('./src/shaders/vert-blur-y.glsl');
                    VertexShaders._primitive = new LazyStringReader('./src/shaders/vert-primitive.glsl');
                    VertexShaders._replicate = new LazyStringReader('./src/shaders/vert-replicate.glsl');
                    VertexShaders._fxaa = new LazyStringReader('./src/shaders/vert-fxaa.glsl');
                }

                public static get def():string {
                    return VertexShaders._default.content;
                }

                public static get blurX():string {
                    return VertexShaders._blurX.content;
                }

                public static get blurY():string {
                    return VertexShaders._blurY.content;
                }

                public static get primitive():string {
                    return VertexShaders._primitive.content;
                }

                public static get replicate():string {
                    return VertexShaders._replicate.content;
                }

                public static get fxaa():string {
                    return VertexShaders._fxaa.content;
                }

                private static _default:LazyStringReader;
                private static _blurX:LazyStringReader;
                private static _blurY:LazyStringReader;
                private static _primitive:LazyStringReader;
                private static _replicate:LazyStringReader;
                private static _fxaa:LazyStringReader;

            }

            export class FragmentShaders {

                private static __init():void {
                    FragmentShaders._default = new LazyStringReader('./src/shaders/frag-default.glsl');
                    FragmentShaders._blur = new LazyStringReader('./src/shaders/frag-blur.glsl');
                    FragmentShaders._primitive = new LazyStringReader('./src/shaders/frag-primitive.glsl');
                    FragmentShaders._colorTransform = new LazyStringReader('./src/shaders/frag-color-transform.glsl');
                    FragmentShaders._fxaa = new LazyStringReader('./src/shaders/frag-fxaa.glsl');
                }

                public static get def():string {
                    return FragmentShaders._default.content;
                }

                public static get blur():string {
                    return FragmentShaders._blur.content;
                }

                public static get primitive():string {
                    return FragmentShaders._primitive.content;
                }

                public static get colorTransform():string {
                    return FragmentShaders._colorTransform.content;
                }

                public static get fxaa():string {
                    return FragmentShaders._fxaa.content;
                }

                private static _default:LazyStringReader;
                private static _blur:LazyStringReader;
                private static _primitive:LazyStringReader;
                private static _colorTransform:LazyStringReader;
                private static _fxaa:LazyStringReader;

            }

            class LazyStringReader {

                public constructor(fileName:string, encoding:string = 'utf-8') {
                    this._fileName = fileName;
                    this._encoding = encoding;
                    this._content = null;
                }

                public get content():string {
                    if (this._content == null) {
                        this._content = fs.readFileSync(this._fileName, this._encoding);
                    }
                    return this._content;
                }

                private _encoding:string;
                private _content:string;
                private _fileName:string;

            }

            // TODO: Encapsulation is broken
            (<any>VertexShaders).__init();
            (<any>FragmentShaders).__init();

        }

    }

}
