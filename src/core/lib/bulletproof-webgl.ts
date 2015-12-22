/**
 * Created by MIC on 2015/10/5.
 */

/// <reference path="../../../include/ext/libtess.js/libtess.d.ts"/>

import bulletproof_org = require("./bulletproof-org");
import bulletproof_mic = require("./bulletproof-mic");
import bulletproof_shaders = require("./bulletproof-shaders");
import bulletproof_flash_base = require("./bulletproof-flash-base");
import libtess = require("libtess");

export module bulletproof {

    export module webgl {

        import mic = bulletproof_mic.bulletproof.mic;
        import OMap = bulletproof_org.bulletproof.OMap;
        import IDisposable = bulletproof_org.bulletproof.IDisposable;
        import shaders = bulletproof_shaders.bulletproof.webgl.shaders;
        import NotImplementedError = bulletproof_org.bulletproof.NotImplementedError;
        import Matrix3D = bulletproof_flash_base.bulletproof.flash.geom.Matrix3D;

        export var gl = (<any>window).WebGLRenderingContext;

        export interface IWebGLElement {
            update():void;
            render(renderer:webgl.WebGLRenderer, target:webgl.WebGLRenderTarget):void;
        }

        // From webgl-utils.js
        class WebGLUtils {

            public static setupWebGL(canvas:HTMLCanvasElement, optionalAttributes?:any):WebGLRenderingContext {
                function showLink(str) {
                    var container = <HTMLElement>canvas.parentNode;
                    if (container) {
                        container.innerHTML = WebGLUtils.makeFailHtml(str);
                    }
                }

                if ((<any>window).WebGLRenderingContext === undefined) {
                    showLink(WebGLUtils.GET_A_WEBGL_BROWSER);
                    return null;
                }
                var context = WebGLUtils.create3DContext(canvas, optionalAttributes);
                if (context == null) {
                    showLink(WebGLUtils.OTHER_PROBLEM);
                }
                return context;
            }

            private static makeFailHtml(message:string):string {
                return '' +
                    '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' +
                    '<td align="center">' +
                    '<div style="display: table-cell; vertical-align: middle;">' +
                    '<div style="">' + message + '</div>' +
                    '</div>' +
                    '</td></tr></table>';
            }

            private static create3DContext(canvas:HTMLCanvasElement, optAttributes:any):WebGLRenderingContext {
                var names = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
                var context = null;
                for (var ii = 0; ii < names.length; ++ii) {
                    try {
                        context = <WebGLRenderingContext>canvas.getContext(names[ii], optAttributes);
                    } catch (e) {
                    }
                    if (context) {
                        break;
                    }
                }
                return context;
            }

            private static OTHER_PROBLEM = '' +
                "It doesn't appear your computer can support WebGL.<br/>" +
                '<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>';

            private static GET_A_WEBGL_BROWSER = '' +
                'This page requires a browser that supports WebGL.<br/>' +
                '<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';

        }

        // T must be a type array class, e.g. Float32Array
        export class WebGLArrayBuffer implements IDisposable {

            public static create(context:WebGLRenderingContext, data:Array<number>, elementGLType:number, bufferType:number):WebGLArrayBuffer {
                var T:any = WebGLArrayBuffer.getTypedArrayType(elementGLType);
                if (T == null) {
                    console.warn('Failed to create typed array whose elements are WebGL type 0x' + elementGLType.toString(16));
                    return null;
                }
                var wab = new WebGLArrayBuffer();
                wab._glc = context;
                wab._elementGLType = elementGLType;
                wab._webglBuffer = context.createBuffer();
                if (wab._webglBuffer == null) {
                    console.warn('Failed to create WebGL buffer.');
                    return null;
                }
                wab._arrayType = T;
                wab._bufferType = bufferType;
                wab.setNewData(data);
                wab.becomeDirty();
                wab.syncBufferData();
                return wab;
            }

            public get webglBuffer():WebGLBuffer {
                return this._webglBuffer;
            }

            public get elementSize():number {
                return this._typedArray.BYTES_PER_ELEMENT;
            }

            public get elementCount():number {
                return this._typedArray.length;
            }

            public get elementGLType():number {
                return this._elementGLType;
            }

            public setNewData(data:Array<number>):void {
                this._array = data.slice();
            }

            public becomeDirty():void {
                this._isDirty = true;
            }

            public syncBufferData():void {
                if (this._isDirty) {
                    this._typedArray = new this._arrayType(this._array);
                    this._isDirty = false;
                }
                this._glc.bindBuffer(this._bufferType, this._webglBuffer);
                this._glc.bufferData(this._bufferType, this._typedArray, gl.STATIC_DRAW);
            }

            public dispose():void {
                this._glc.deleteBuffer(this._webglBuffer);
                this._array = null;
                this._typedArray = null;
                this._webglBuffer = null;
                this._glc = null;
            }

            private static getTypedArrayType(glType:number):Function {
                switch (glType) {
                    case gl.FLOAT:
                        return Float32Array;
                    case gl.UNSIGNED_SHORT:
                        return Uint16Array;
                    case gl.UNSIGNED_INT:
                        return Uint32Array;
                    case gl.UNSIGNED_BYTE:
                        return Uint8Array;
                    case gl.INT:
                        return Int32Array;
                    case gl.SHORT:
                        return Int16Array;
                    case gl.BYTE:
                        return Int8Array;
                    default:
                        return null;
                }
            }

            private _glc:WebGLRenderingContext;
            private _isDirty:boolean;
            private _bufferType:number;
            private _elementGLType:number;
            private _webglBuffer:WebGLBuffer;
            private _array:Array<number>;
            private _arrayType:any;
            private _typedArray:Int8Array|Uint8Array|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array;

        }

        export class WebGLRenderTarget implements IDisposable {

            public constructor(renderer:WebGLRenderer, shader:ShaderBase,
                               image:ImageData|HTMLCanvasElement|HTMLImageElement|HTMLVideoElement, isRoot) {
                var context = renderer.context;
                if (!WebGLRenderTarget._isInitializedStatically) {
                    WebGLRenderTarget.__initializeStaticFields(context);
                }
                this._renderer = renderer;
                this.__init(context, context.canvas.width, context.canvas.height, image, isRoot);
                this._shader = shader;
            }

            public dispose():void {
                var glc = this._glc;
                glc.deleteTexture(this._texture);
                glc.deleteFramebuffer(this._frameBuffer);
                glc.deleteRenderbuffer(this._depthBuffer);
                this._texture = null;
                this._frameBuffer = null;
                this._depthBuffer = null;
            }

            public use():void {
                var glc = this._glc;
                glc.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);
            }

            public clear():void {
                this.use();
                var glc = this._glc;
                glc.viewport(0, 0, this._fitWidth, this._fitHeight);
                glc.clearColor(0, 0, 0, 0);
                glc.clearDepth(0);
                glc.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            }

            // TODO: Warning: Not tested
            public resize(newWidth:number, newHeight:number):void {
                this.resizeInternal(newWidth, newHeight, true);
            }

            public get texture():WebGLTexture {
                return this._texture;
            }

            public get fitWidth():number {
                return this._fitWidth;
            }

            public get fitHeight():number {
                return this._fitHeight;
            }

            public get originalWidth():number {
                return this._originalWidth;
            }

            public get originalHeight():number {
                return this._originalHeight;
            }

            public get shader():ShaderBase {
                return this._shader;
            }

            public get isRoot():boolean {
                return this._isRoot;
            }

            private resizeInternal(newWidth:number, newHeight:number, unbind:boolean):void {
                var glc = this._glc;
                var image = this._image;
                var isRoot = this._isRoot;
                if (image == null) {
                    newWidth |= 0;
                    newHeight |= 0;
                    this._originalWidth = newWidth;
                    this._originalHeight = newHeight;
                    if (!mic.util.isPowerOfTwo(newWidth)) {
                        newWidth = mic.util.power2Roundup(newWidth);
                    }
                    if (!mic.util.isPowerOfTwo(newHeight)) {
                        newHeight = mic.util.power2Roundup(newHeight);
                    }
                    this._fitWidth = newWidth;
                    this._fitHeight = newHeight;
                } else {
                    // TODO: WARNING: Not tested, may also need to round-up to power of 2.
                    newWidth = this._originalWidth = this._fitWidth = image.width;
                    newHeight = this._originalHeight = this._fitHeight = image.height;
                }

                glc.bindTexture(gl.TEXTURE_2D, this._texture);
                glc.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                glc.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                glc.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                glc.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                if (image != null) {
                    glc.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
                    glc.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, <any>image);
                } else {
                    glc.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
                    glc.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, newWidth, newHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
                }
                if (!isRoot) {
                    glc.bindRenderbuffer(gl.RENDERBUFFER, this._depthBuffer);
                    glc.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, newWidth, newHeight);
                }
                if (unbind) {
                    glc.bindRenderbuffer(gl.RENDERBUFFER, null);
                    glc.bindTexture(gl.TEXTURE_2D, null);
                }
            }

            private __init(glc:WebGLRenderingContext, width:number, height:number,
                           image:ImageData|HTMLCanvasElement|HTMLImageElement|HTMLVideoElement, isRoot:boolean):void {
                this._glc = glc;
                this._frameBuffer = null;
                this._depthBuffer = null;
                this._texture = null;
                this._isRoot = isRoot;
                this._image = image;

                function error(message:string):void {
                    glc.deleteFramebuffer(this._frameBuffer);
                    glc.deleteRenderbuffer(this._depthBuffer);
                    glc.deleteTexture(this._texture);
                    console.warn(message);
                }

                if (!isRoot) {
                    this._frameBuffer = glc.createFramebuffer();
                    if (this._frameBuffer == null) {
                        return error('Failed to create the frame buffer.');
                    }
                    this._depthBuffer = glc.createRenderbuffer();
                    if (this._depthBuffer == null) {
                        return error('Failed to create the depth buffer.');
                    }
                }
                this._texture = glc.createTexture();
                if (!this._texture) {
                    return error('Failed to create the underlying texture.');
                }
                this.resizeInternal(width, height, false);
                if (!isRoot) {
                    glc.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);
                    glc.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._texture, 0);
                    glc.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this._depthBuffer);
                    var status = glc.checkFramebufferStatus(gl.FRAMEBUFFER);
                    if (status != gl.FRAMEBUFFER_COMPLETE) {
                        return error('Frame buffer is not complete: code 0x' + status.toString(16));
                    }
                }
                glc.bindRenderbuffer(gl.RENDERBUFFER, null);
                glc.bindTexture(gl.TEXTURE_2D, null);
                glc.bindFramebuffer(gl.FRAMEBUFFER, null);
            }

            private static __initializeStaticFields(glc:WebGLRenderingContext):void {
                if (WebGLRenderTarget._isInitializedStatically) {
                    return;
                }
                var textureCoords = [
                    0, 1,
                    1, 1,
                    0, 0,
                    1, 0
                ];
                var textureIndices = [
                    0, 1, 2,
                    1, 2, 3
                ];
                // TODO: Warning: These buffers do not dispose automatically because they are static
                WebGLRenderTarget._textureCoords = WebGLArrayBuffer.create(glc, textureCoords, gl.FLOAT, gl.ARRAY_BUFFER);
                WebGLRenderTarget._textureIndices = WebGLArrayBuffer.create(glc, textureIndices, gl.UNSIGNED_SHORT, gl.ELEMENT_ARRAY_BUFFER);
                WebGLRenderTarget._isInitializedStatically = true;
            }

            protected _glc:WebGLRenderingContext;
            protected _renderer:WebGLRenderer;
            protected _frameBuffer:WebGLFramebuffer;
            protected _depthBuffer:WebGLRenderbuffer;
            protected _texture:WebGLTexture;
            protected _originalWidth:number;
            protected _originalHeight:number;
            protected _fitWidth:number;
            protected _fitHeight:number;
            protected _shader:ShaderBase;
            protected static _textureCoords:WebGLArrayBuffer;
            protected static _textureIndices:WebGLArrayBuffer;
            private static _isInitializedStatically:boolean = false;
            private _image:ImageData|HTMLCanvasElement|HTMLImageElement|HTMLVideoElement;
            private _isRoot:boolean;

        }

        class WebGLBufferedRenderTarget extends WebGLRenderTarget {

            public constructor(renderer:WebGLRenderer, shader:BufferedShader, autoDisposeShader:boolean, isRoot:boolean = false) {
                super(renderer, shader, null, isRoot);
                this._autoDisposeShader = autoDisposeShader;
            }

            public dispose():void {
                super.dispose();
                if (this._autoDisposeShader && this._shader != null) {
                    this._shader.dispose();
                    this._shader = null;
                }
            }

            public renderRenderTarget(source:WebGLRenderTarget, clear:boolean):void {
                if (!WebGLBufferedRenderTarget.checkRenderTarget(source)) {
                    return;
                }
                var glc = this._glc;
                var shader = <BufferedShader>this._shader;
                var vertexPositions = [
                    0, source.fitHeight, 0,
                    source.fitWidth, source.fitHeight, 0,
                    0, 0, 0,
                    source.fitWidth, 0, 0
                ];
                var glVertexPositionBuffer = WebGLArrayBuffer.create(this._glc, vertexPositions, gl.FLOAT, gl.ARRAY_BUFFER);
                var attributeLocation:number;

                this.use();
                shader.use();
                // Target must have a 'uSampler' sample2D uniform
                shader.setTexture(source.texture);
                shader.syncUniforms();

                glVertexPositionBuffer.syncBufferData();
                attributeLocation = shader.getAttributeLocation('aVertexPosition');
                glc.vertexAttribPointer(attributeLocation, 3, glVertexPositionBuffer.elementGLType, false, glVertexPositionBuffer.elementSize * 3, 0);
                glc.enableVertexAttribArray(attributeLocation);
                var textureCoords = WebGLRenderTarget._textureCoords;
                textureCoords.syncBufferData();
                attributeLocation = shader.getAttributeLocation('aTextureCoord');
                glc.vertexAttribPointer(attributeLocation, 2, textureCoords.elementGLType, false, textureCoords.elementSize * 2, 0);
                glc.enableVertexAttribArray(attributeLocation);

                var textureIndices = WebGLRenderTarget._textureIndices;
                textureIndices.syncBufferData();

                if (clear) {
                    this.clear();
                }
                glc.viewport(0, 0, this._originalWidth, this._originalHeight);
                glc.drawElements(gl.TRIANGLES, textureIndices.elementCount, textureIndices.elementGLType, 0);

                glVertexPositionBuffer.dispose();
            }

            protected static checkRenderTarget(source:WebGLRenderTarget):boolean {
                if (source == null) {
                    console.warn('Cannot render a null WebGLRenderTarget onto WebGLBufferedRenderTarget.');
                    return false;
                }
                if (source.texture == null) {
                    console.warn('Cannot use a WebGLRenderTarget without texture based frame buffer to render onto WebGLBufferedRenderTarget.');
                    return false;
                }
                return true;
            }

            private _autoDisposeShader:boolean;

        }

        export class WebGLReplicateRenderTarget extends WebGLBufferedRenderTarget {

            public constructor(renderer:WebGLRenderer, flipY:boolean = false, isRoot:boolean = false) {
                super(renderer, renderer.shaderManager.replicateShader, false, isRoot);
                this.flipY = flipY;
            }

            public flipY:boolean;

            // TODO: Don't Repeat Yourself
            public renderRenderTarget(source:WebGLRenderTarget, clear:boolean):void {
                if (!WebGLBufferedRenderTarget.checkRenderTarget(source)) {
                    return;
                }
                var glc = this._glc;
                var shader = <ReplicateShader>this._shader;
                var vertexPositions = [
                    0, source.fitHeight, 0,
                    source.fitWidth, source.fitHeight, 0,
                    0, 0, 0,
                    source.fitWidth, 0, 0
                ];
                var glVertexPositionBuffer = WebGLArrayBuffer.create(this._glc, vertexPositions, gl.FLOAT, gl.ARRAY_BUFFER);
                var attributeLocation:number;

                this.use();
                shader.use();
                // Target must have a 'uSampler' sample2D uniform
                shader.setTexture(source.texture);
                shader.setFlipY(this.flipY);
                if (this.flipY) {
                    shader.setOriginalSize([this._originalWidth, this._originalHeight]);
                    shader.setFitSize([this._fitWidth, this._fitHeight]);
                }
                shader.syncUniforms();

                glVertexPositionBuffer.syncBufferData();
                attributeLocation = shader.getAttributeLocation('aVertexPosition');
                glc.vertexAttribPointer(attributeLocation, 3, glVertexPositionBuffer.elementGLType, false, glVertexPositionBuffer.elementSize * 3, 0);
                glc.enableVertexAttribArray(attributeLocation);
                var textureCoords = WebGLRenderTarget._textureCoords;
                textureCoords.syncBufferData();
                attributeLocation = shader.getAttributeLocation('aTextureCoord');
                glc.vertexAttribPointer(attributeLocation, 2, textureCoords.elementGLType, false, textureCoords.elementSize * 2, 0);
                glc.enableVertexAttribArray(attributeLocation);

                var textureIndices = WebGLRenderTarget._textureIndices;
                textureIndices.syncBufferData();

                if (clear) {
                    this.clear();
                }
                glc.viewport(0, 0, this._originalWidth, this._originalHeight);
                glc.enable(gl.SCISSOR_TEST);
                glc.scissor(0, 0, source.originalWidth, source.originalHeight);
                glc.drawElements(gl.TRIANGLES, textureIndices.elementCount, textureIndices.elementGLType, 0);

                glc.disable(gl.SCISSOR_TEST);
                glVertexPositionBuffer.dispose();
            }

        }

        class WebGLFxaaRenderTarget extends WebGLBufferedRenderTarget {

            public constructor(renderer:WebGLRenderer, isRoot:boolean = false) {
                super(renderer, new FxaaShader(renderer.shaderManager), true, isRoot);
            }

            // TODO: Don't Repeat Yourself
            public renderRenderTarget(source:WebGLRenderTarget, clear:boolean):void {
                if (!WebGLBufferedRenderTarget.checkRenderTarget(source)) {
                    return;
                }
                var glc = this._glc;
                var shader = <FxaaShader>this._shader;
                var vertexPositions = [
                    0, source.fitHeight, 0,
                    source.fitWidth, source.fitHeight, 0,
                    0, 0, 0,
                    source.fitWidth, 0, 0
                ];
                var glVertexPositionBuffer = WebGLArrayBuffer.create(this._glc, vertexPositions, gl.FLOAT, gl.ARRAY_BUFFER);
                var attributeLocation:number;

                this.use();
                shader.use();
                // Target must have a 'uSampler' sample2D uniform
                shader.setTexture(source.texture);
                shader.setResolutionXY([this._originalWidth, this._originalHeight]);
                shader.syncUniforms();

                glVertexPositionBuffer.syncBufferData();
                attributeLocation = shader.getAttributeLocation('aVertexPosition');
                glc.vertexAttribPointer(attributeLocation, 3, glVertexPositionBuffer.elementGLType, false, glVertexPositionBuffer.elementSize * 3, 0);
                glc.enableVertexAttribArray(attributeLocation);
                var textureCoords = WebGLRenderTarget._textureCoords;
                textureCoords.syncBufferData();
                attributeLocation = shader.getAttributeLocation('aTextureCoord');
                glc.vertexAttribPointer(attributeLocation, 2, textureCoords.elementGLType, false, textureCoords.elementSize * 2, 0);
                glc.enableVertexAttribArray(attributeLocation);

                var textureIndices = WebGLRenderTarget._textureIndices;
                textureIndices.syncBufferData();

                if (clear) {
                    this.clear();
                }
                glc.viewport(0, 0, this._originalWidth, this._originalHeight);
                glc.enable(gl.SCISSOR_TEST);
                glc.scissor(0, 0, source.originalWidth, source.originalHeight);
                glc.drawElements(gl.TRIANGLES, textureIndices.elementCount, textureIndices.elementGLType, 0);

                glc.disable(gl.SCISSOR_TEST);
                glVertexPositionBuffer.dispose();
            }

        }

        export class WebGLPrimitiveRenderTarget extends WebGLRenderTarget {

            public constructor(renderer:WebGLRenderer, directToScreen:boolean = false) {
                super(renderer, renderer.shaderManager.primitiveShader, null, directToScreen);
            }

            public renderPrimitives(vertices:WebGLArrayBuffer, colors:WebGLArrayBuffer, indices:WebGLArrayBuffer, clear:boolean):void {
                var glc = this._glc;
                var shader = this._shader;
                var attributeLocation:number;
                this.use();
                shader.use();
                shader.syncUniforms();

                vertices.syncBufferData();
                attributeLocation = shader.getAttributeLocation('aVertexPosition');
                glc.vertexAttribPointer(attributeLocation, 3, vertices.elementGLType, false, vertices.elementSize * 3, 0);
                glc.enableVertexAttribArray(attributeLocation);
                colors.syncBufferData();
                attributeLocation = shader.getAttributeLocation('aVertexColor');
                glc.vertexAttribPointer(attributeLocation, 4, colors.elementGLType, false, colors.elementSize * 4, 0);
                glc.enableVertexAttribArray(attributeLocation);
                indices.syncBufferData();

                if (clear) {
                    this.clear();
                }
                glc.viewport(0, 0, this._originalWidth, this._originalHeight);
                glc.drawElements(gl.TRIANGLES, indices.elementCount, indices.elementGLType, 0);
                //var vp = this._renderer.standardViewport;
                //glc.viewport(vp.x, vp.y, vp.width, vp.height);
            }

        }

        export interface WebGLRendererOptions {
            // enable anti-alias?
            antialias?:boolean;
            // enable depth buffer?
            depth?:boolean;
            // auto resize when canvas size changed?
            autoResize?:boolean;
            // fills with solid color or transparent black? (not implemented, always considered true)
            transparent?:boolean;
        }

        interface WebGLViewport {
            x:number;
            y:number;
            width:number;
            height:number;
        }

        export class WebGLRenderer implements IDisposable {

            public constructor(width:number, height:number, options:WebGLRendererOptions = WebGLRenderer.DEFAULT_OPTIONS) {
                this._isInitialized = false;
                this.initialize(width, height, options);
                this._options = options;
                //this.clear();
            }

            /*
             public clear():void {
             var glc = this._context;
             var bits = gl.COLOR_BUFFER_BIT;
             if (this._options.depth) {
             bits |= gl.DEPTH_BUFFER_BIT;
             }
             glc.clearColor(0, 0, 0, this._options.transparent ? 0 : 1);
             glc.clear(bits);
             }
             */

            public dispose():void {
                this._screenTarget.dispose();
                this._fxaaTarget.dispose();
                this._filterManager.dispose();
                this._shaderManager.dispose();
                this._filterManager = null;
                this._shaderManager = null;
                this._screenTarget = null;
                this._fxaaTarget = null;
            }

            public get context():WebGLRenderingContext {
                return this._context;
            }

            public get view():HTMLCanvasElement {
                return this._view;
            }

            public setRenderTarget(target:WebGLRenderTarget):void {
                this._currentTarget = target;
            }

            public resetRenderTarget():void {
                this._currentTarget = this._screenTarget;
            }

            public resize(width:number, height:number):void {
                this._standardViewport.width = width;
                this._standardViewport.height = height;
                if (this._screenTarget != null) {
                    this._screenTarget.resize(width, height);
                }
                // TODO: resize all contexts
            }

            public renderTo(renderFunc:(renderer:WebGLRenderer, outputTarget:WebGLReplicateRenderTarget)=>void):void {
                renderFunc(this, this._screenTarget);
                if (this._options.antialias) {
                    // If anti-alias is on, we need to go through the FXAA render target
                    this._fxaaTarget.renderRenderTarget(this._screenTarget, true);
                }
            }

            public get screen():WebGLReplicateRenderTarget {
                return this._screenTarget;
            }

            public get shaderManager():ShaderManager {
                return this._shaderManager;
            }

            public get filterManager():FilterManager {
                return this._filterManager;
            }

            public get tessellator():libtess.GluTesselator {
                return this._tessellator;
            }

            public get standardViewport():WebGLViewport {
                return this._standardViewport;
            }

            public createReplicateRenderTarget(flipY:boolean = false, isRoot:boolean = false):WebGLReplicateRenderTarget {
                return new WebGLReplicateRenderTarget(this, flipY, isRoot);
            }

            public releaseReplicateRenderTarget(target:WebGLReplicateRenderTarget):void {
                target.dispose();
            }

            public createBufferedRenderTarget(shader:BufferedShader, autoDisposeShader:boolean):WebGLBufferedRenderTarget {
                return new WebGLBufferedRenderTarget(this, shader, autoDisposeShader);
            }

            public releaseBufferedRenderTarget(target:WebGLBufferedRenderTarget):void {
                target.dispose();
            }

            public createPrimitiveRenderTarget(directToScreen:boolean = false):WebGLPrimitiveRenderTarget {
                return new WebGLPrimitiveRenderTarget(this, directToScreen);
            }

            public releasePrimitiveRenderTarget(target:WebGLPrimitiveRenderTarget):void {
                target.dispose();
            }

            private initialize(width:number, height:number, options:WebGLRendererOptions):void {
                if (this._isInitialized) {
                    return;
                }

                var canvas:HTMLCanvasElement = window.document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                var attributes:WebGLContextAttributes = {};
                attributes.alpha = options.transparent;
                attributes.antialias = options.antialias;
                attributes.premultipliedAlpha = false;
                //attributes.stencil = false;
                attributes.depth = options.depth;
                this._context = WebGLUtils.setupWebGL(canvas, attributes);
                this._view = canvas;

                // TODO: implement a generic clone() function, perform a deep copy
                this._options = options;

                this._standardViewport = {
                    x: 0, y: 0,
                    width: canvas.width, height: canvas.height
                };

                this.resize(canvas.width, canvas.height);
                if (options.autoResize) {
                    window.document.addEventListener('resize', this.onResize.bind(this));
                }

                var glc = this._context;
                glc.disable(gl.DEPTH_TEST);
                glc.disable(gl.CULL_FACE);
                glc.enable(gl.BLEND);
                glc.blendEquation(gl.FUNC_ADD);
                //glc.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

                canvas.addEventListener('webglcontextlost', this.onContextLost.bind(this));
                canvas.addEventListener('webglcontextrestored', this.onContextRestored.bind(this));
                this._tessellator = new libtess.GluTesselator();
                this._shaderManager = new ShaderManager(this);
                this._filterManager = new FilterManager(this);
                var antiAlias = options.antialias;
                if (antiAlias) {
                    // If anti-alias is on, then we need to draw the "screen" to a FXAA buffer
                    this._screenTarget = new WebGLReplicateRenderTarget(this, true, false); // MSAA zoomFactor = 2
                    this._fxaaTarget = new WebGLFxaaRenderTarget(this, true); // MSAA zoomFactor = 1
                } else {
                    // If anti-alias is off, then we will output to the screen, directly.
                    this._screenTarget = new WebGLReplicateRenderTarget(this, true, true);
                    this._fxaaTarget = null;
                }
                this.initTessellator();
                this._isInitialized = true;
            }

            private initTessellator():void {
                var tess = this._tessellator;
                tess.gluTessCallback(libtess.gluEnum.GLU_TESS_VERTEX_DATA, function (data:Array<number>, polyVertArray:Array<Array<number>>) {
                    polyVertArray[polyVertArray.length - 1].push(data[0], data[1], data[2]);
                });
                tess.gluTessCallback(libtess.gluEnum.GLU_TESS_BEGIN_DATA, function (type:number, vertexArrays:Array<Array<number>>) {
                    if (type != libtess.primitiveType.GL_TRIANGLES) {
                        console.warn('{TESS} expected TRIANGLES but got type: ' + type);
                    }
                    vertexArrays.push([]);
                });
                tess.gluTessCallback(libtess.gluEnum.GLU_TESS_ERROR, function (errorCode:number) {
                    console.warn('{TESS} error number: ', errorCode);
                });
                tess.gluTessCallback(libtess.gluEnum.GLU_TESS_COMBINE, function (coords:Array<number>, data:any, weight:number) {
                    return [coords[0], coords[1], coords[2]];
                });
                tess.gluTessCallback(libtess.gluEnum.GLU_TESS_EDGE_FLAG, function (flag:any) {
                    // Do nothing
                });
            }

            private onResize():void {
                //this.resize(this._view.width, this._view.height);
            }

            private onContextLost():void {
                throw new NotImplementedError();
            }

            private onContextRestored():void {
                throw new NotImplementedError();
            }

            private _view:HTMLCanvasElement;
            private _context:WebGLRenderingContext;
            private _isInitialized:boolean;
            private _options:WebGLRendererOptions;
            private _currentTarget:WebGLRenderTarget;
            private _screenTarget:WebGLReplicateRenderTarget;
            private _fxaaTarget:WebGLBufferedRenderTarget;
            private _filterManager:FilterManager;
            private _shaderManager:ShaderManager;
            private _tessellator:libtess.GluTesselator;
            private _standardViewport:WebGLViewport;

            private static DEFAULT_OPTIONS:WebGLRendererOptions = {
                antialias: true,
                depth: true,
                transparent: true,
                autoResize: true
            };

        }

        enum WebGLDataType {

            UBool,
            U1I,
            U1F, U2F, U3F, U4F,
            UV2, UV3, UV4,
            U1IV, U2IV, U3IV, U4IV,
            U1FV, U2FV, U3FV, U4FV,
            UMat2, UMat3, UMat4,
            UColor,
            UIV,
            UFV,
            UV2V, UV3V, UV4V,
            USampler2D

        }

        interface WebGLUniform {
            name:string;
            type:WebGLDataType;
            location?:WebGLUniformLocation;
            value:any;
            transpose?:boolean;
            array?:Float32Array;
            texture?:WebGLTexture;
        }

        interface WebGLAttribute {
            name:string;
            value:any;
            location?:number;
        }

        class ShaderManager implements IDisposable {

            public constructor(renderer:WebGLRenderer) {
                this._renderer = renderer;
                this._glc = renderer.context;
                this._primitiveShader = new PrimitiveShader(this);
                this._replicateShader = new ReplicateShader(this);
            }

            public dispose():void {
            }

            public get renderer():WebGLRenderer {
                return this._renderer;
            }

            public get context():WebGLRenderingContext {
                return this._glc;
            }

            public get primitiveShader():PrimitiveShader {
                return this._primitiveShader;
            }

            public get replicateShader():ReplicateShader {
                return this._replicateShader;
            }

            private _renderer:WebGLRenderer;
            private _glc:WebGLRenderingContext;
            private _primitiveShader:PrimitiveShader;
            private _replicateShader:ReplicateShader;

        }

        // 在 display object 内传递给 shader 绘制，filter 内传递给 shader 绘制
        // graphics 内先自己绘制
        // 因此 graphics 和 shader 行为类似

        class ShaderBase implements IDisposable {

            public constructor(manager:ShaderManager, vertexSource:string, fragmentSource:string,
                               uniforms:OMap<string, WebGLUniform>, attributes:OMap<string, WebGLAttribute>) {
                this._glc = manager.context;
                this._program = null;
                this._vertexSource = vertexSource;
                this._fragmentSource = fragmentSource;
                this._vertexShader = null;
                this._fragmentShader = null;
                this.initialize(this._glc, vertexSource, fragmentSource);
                this.use();
                this._uniforms = uniforms;
                this._attributes = attributes;
                this.cacheUniformLocations();
                this.cacheAttributeLocations();
                this.syncUniforms();
            }

            public syncUniforms():void {
                var keys = this._uniforms.keys();
                for (var i = 0; i < keys.length; i++) {
                    this.syncUniform(this._uniforms.get(keys[i]));
                }
            }

            public useBy(context:WebGLRenderingContext):void {
                context.useProgram(this._program);
            }

            public use():void {
                this.useBy(this._glc);
            }

            public dispose():void {
                var glc = this._glc;
                glc.deleteProgram(this._program);
                glc.deleteShader(this._vertexShader);
                glc.deleteShader(this._fragmentShader);
                this._glc = null;
                this._uniforms = null;
                this._attributes = null;
                this._vertexSource = null;
                this._fragmentSource = null;
            }

            public getUniformLocation(name:string):WebGLUniformLocation {
                return this._program != null ? this._glc.getUniformLocation(this._program, name) : null;
            }

            public getUniformLocationFromCache(name:string):WebGLUniformLocation {
                var v = this._uniforms.get(name);
                if (v != undefined && v != null) {
                    return v.location;
                } else {
                    return null;
                }
            }

            public getAttributeLocation(name:string):number {
                return this._program != null ? this._glc.getAttribLocation(this._program, name) : -1;
            }

            public getAttributeLocationFromCache(name:string):number {
                var v = this._attributes.get(name);
                if (v != undefined && v != null) {
                    return v.location;
                } else {
                    return -1;
                }
            }

            public get vertexSource():string {
                return this._vertexSource;
            }

            public get fragmentSource():string {
                return this._fragmentSource;
            }

            protected cacheUniformLocations() {
                var keys = this._uniforms.keys();
                var glc = this._glc;
                var location:WebGLUniformLocation;
                for (var i = 0; i < keys.length; i++) {
                    location = glc.getUniformLocation(this._program, keys[i]);
                    this._uniforms.get(keys[i]).location = location;
                }
            }

            // What the hell does it do?
            protected cacheAttributeLocations() {
                var keys = this._attributes.keys();
                var glc = this._glc;
                for (var i = 0; i < keys.length; i++) {
                    this._attributes.get(keys[i]).location = glc.getAttribLocation(this._program, keys[i]);
                }
            }

            protected syncUniform(uniform:WebGLUniform):void {
                var location = uniform.location;
                var value = uniform.value;
                var glc = this._glc;
                var i:number, il:number;
                switch (uniform.type) {
                    case WebGLDataType.UBool:
                        glc.uniform1i(location, value ? 1 : 0);
                        break;
                    case WebGLDataType.U1I:
                        glc.uniform1i(location, value);
                        break;
                    case WebGLDataType.U1F:
                        glc.uniform1f(location, value);
                        break;
                    case WebGLDataType.U2F:
                        glc.uniform2f(location, value[0], value[1]);
                        break;
                    case WebGLDataType.U3F:
                        glc.uniform3f(location, value[0], value[1], value[2]);
                        break;
                    case WebGLDataType.U4F:
                        glc.uniform4f(location, value[0], value[1], value[2], value[3]);
                        break;
                    case WebGLDataType.UV2:
                        glc.uniform2f(location, value.x, value.y);
                        break;
                    case WebGLDataType.UV3:
                        glc.uniform3f(location, value.x, value.y, value.z);
                        break;
                    case WebGLDataType.UV4:
                        glc.uniform4f(location, value.x, value.y, value.z, value.w);
                        break;
                    case WebGLDataType.U1IV:
                        glc.uniform1iv(location, value);
                        break;
                    case WebGLDataType.U2IV:
                        glc.uniform2iv(location, value);
                        break;
                    case WebGLDataType.U3IV:
                        glc.uniform3iv(location, value);
                        break;
                    case WebGLDataType.U4IV:
                        glc.uniform4iv(location, value);
                        break;
                    case WebGLDataType.U1FV:
                        glc.uniform1fv(location, value);
                        break;
                    case WebGLDataType.U2FV:
                        glc.uniform2fv(location, value);
                        break;
                    case WebGLDataType.U3FV:
                        glc.uniform3fv(location, value);
                        break;
                    case WebGLDataType.U4FV:
                        glc.uniform4fv(location, value);
                        break;
                    case WebGLDataType.UMat2:
                        glc.uniformMatrix2fv(location, uniform.transpose, value);
                        break;
                    case WebGLDataType.UMat3:
                        glc.uniformMatrix3fv(location, uniform.transpose, value);
                        break;
                    case WebGLDataType.UMat4:
                        glc.uniformMatrix4fv(location, uniform.transpose, value);
                        break;
                    case WebGLDataType.UColor:
                        if (typeof value === 'number') {
                            value = mic.Color.fromNumber(value);
                        }
                        glc.uniform3f(location, value.r, value.g, value.b);
                        break;
                    case WebGLDataType.UIV:
                        glc.uniform3iv(location, value);
                        break;
                    case WebGLDataType.UFV:
                        glc.uniform3fv(location, value);
                        break;
                    case WebGLDataType.UV2V:
                        if (!uniform.array) {
                            uniform.array = new Float32Array(2 * value.length);
                        }
                        for (i = 0, il = value.length; i < il; i++) {
                            uniform.array[i * 2] = value[i].x;
                            uniform.array[i * 2 + 1] = value[i].y;
                        }
                        glc.uniform2fv(location, uniform.array);
                        break;
                    case WebGLDataType.UV3V:
                        if (!uniform.array) {
                            uniform.array = new Float32Array(3 * value.length);
                        }
                        for (i = 0, il = value.length; i < il; i++) {
                            uniform.array[i * 3] = value[i].x;
                            uniform.array[i * 3 + 1] = value[i].y;
                            uniform.array[i * 3 + 2] = value[i].z;
                        }
                        glc.uniform2fv(location, uniform.array);
                        break;
                    case WebGLDataType.UV4V:
                        if (!uniform.array) {
                            uniform.array = new Float32Array(4 * value.length);
                        }
                        for (i = 0, il = value.length; i < il; i++) {
                            uniform.array[i * 4] = value[i].x;
                            uniform.array[i * 4 + 1] = value[i].y;
                            uniform.array[i * 4 + 2] = value[i].z;
                            uniform.array[i * 4 + 3] = value[i].w;
                        }
                        glc.uniform2fv(location, uniform.array);
                        break;
                    case WebGLDataType.USampler2D:
                        glc.activeTexture(gl['TEXTURE' + value.toString()]);
                        glc.bindTexture(gl.TEXTURE_2D, uniform.texture);
                        glc.uniform1i(location, value);
                        break;
                    default:
                        console.warn("[" + uniform.name + "] Unknown format: " + uniform.type);
                        break;
                }
            }

            protected initialize(glc:WebGLRenderingContext, vertexSource:string, fragmentSource:string):void {
                function error(message?:string):void {
                    if (this._vertexShader != null) {
                        glc.deleteShader(this._vertexShader);
                    }
                    if (this._fragmentShader != null) {
                        glc.deleteShader(this._fragmentShader);
                    }
                    if (this._program != null) {
                        glc.deleteProgram(this._program);
                    }
                    this._vertexShader = this._fragmentShader = this._program = null;
                    if (message != undefined && message != null) {
                        console.warn(message);
                    }
                }

                this._vertexShader = ShaderBase.loadShader(glc, vertexSource, gl.VERTEX_SHADER);
                this._fragmentShader = ShaderBase.loadShader(glc, fragmentSource, gl.FRAGMENT_SHADER);
                if (this._vertexShader == null || this._fragmentShader == null) {
                    return error();
                }
                this._program = glc.createProgram();
                if (this._program == null) {
                    return error('Failed to create program.');
                }
                glc.attachShader(this._program, this._vertexShader);
                glc.attachShader(this._program, this._fragmentShader);
                glc.linkProgram(this._program);
                var isLinked = glc.getProgramParameter(this._program, gl.LINK_STATUS);
                if (!isLinked) {
                    var errorLog = glc.getProgramInfoLog(this._program);
                    return error('Failed to link program: ' + errorLog);
                }
            }

            protected static loadShader(glc:WebGLRenderingContext, source:string, type:number):WebGLShader {
                var shader = glc.createShader(type);
                if (shader == null) {
                    console.warn('Cannot create shader.');
                    return null;
                }
                glc.shaderSource(shader, source);
                glc.compileShader(shader);
                var isCompiled = glc.getShaderParameter(shader, gl.COMPILE_STATUS);
                if (!isCompiled) {
                    var error = glc.getShaderInfoLog(shader);
                    console.warn('Failed to load shader: ' + error);
                    glc.deleteShader(shader);
                    return null;
                }
                return shader;
            }

            protected _glc:WebGLRenderingContext;
            protected _vertexSource:string;
            protected _fragmentSource:string;
            protected _program:WebGLProgram;
            protected _vertexShader:WebGLShader;
            protected _fragmentShader:WebGLShader;
            protected _uniforms:OMap<string, WebGLUniform>;
            protected _attributes:OMap<string, WebGLAttribute>;

        }

        // usage:
        // shader.setTransform(...); shader.setProjection(...); shader.setAlpha(...); shader.syncUniforms();
        class PrimitiveShader extends ShaderBase {

            public constructor(manager:ShaderManager) {
                var uniforms = new OMap<string, WebGLUniform>();
                var attributes = new OMap<string, WebGLAttribute>();
                this.localInit(manager, uniforms, attributes);
                super(manager, shaders.VertexShaders.primitive, shaders.FragmentShaders.primitive, uniforms, attributes);
            }

            public setTransform(m:Matrix3D):void {
                this._uniforms.get('uTransformMatrix').value = m.toArray();
            }

            public setProjection(m:Matrix3D):void {
                this._uniforms.get('uProjectionMatrix').value = m.toArray();
            }

            public setAlpha(alpha:number):void {
                this._uniforms.get('uAlpha').value = alpha;
            }

            private localInit(manager:ShaderManager, uniforms:OMap<string, WebGLUniform>, attributes:OMap<string, WebGLAttribute>):void {
                var u:WebGLUniform;
                var transformMatrix = new Matrix3D();
                var projectionMatrix = new Matrix3D();
                var w = manager.renderer.view.width;
                var h = manager.renderer.view.height;
                projectionMatrix.setOrthographicProjection(0, w, h, 0, -1000, 1000);
                u = {
                    name: 'uProjectionMatrix',
                    type: WebGLDataType.UMat4,
                    value: projectionMatrix.toArray(),
                    transpose: false
                };
                uniforms.set('uProjectionMatrix', u);
                u = {
                    name: 'uTransformMatrix',
                    type: WebGLDataType.UMat4,
                    value: transformMatrix.toArray(),
                    transpose: false
                };
                uniforms.set('uTransformMatrix', u);
                u = {name: 'uAlpha', type: WebGLDataType.U1F, value: 1};
                uniforms.set('uAlpha', u);
            }

        }

        class BufferedShader extends ShaderBase {

            public constructor(manager:ShaderManager, vertexSource:string, fragmentSource:string,
                               uniforms:OMap<string, WebGLUniform>, attributes:OMap<string, WebGLAttribute>) {
                super(manager, vertexSource, fragmentSource, uniforms, attributes);
            }

            public setTexture(texture:WebGLTexture):void {
                this._uniforms.get('uSampler').texture = texture;
            }

            protected localInit(manager:ShaderManager, uniforms:OMap<string, WebGLUniform>, attributes:OMap<string, WebGLAttribute>):void {
                var u:WebGLUniform;
                var projectionMatrix = new Matrix3D();
                var w = manager.renderer.view.width;
                var h = manager.renderer.view.height;
                projectionMatrix.setOrthographicProjection(0, w, h, 0, -1000, 1000);
                u = {name: 'uSampler', type: WebGLDataType.USampler2D, value: 0, texture: null};
                uniforms.set('uSampler', u);
                u = {
                    name: 'uProjectionMatrix',
                    type: WebGLDataType.UMat4,
                    value: projectionMatrix.toArray(),
                    transpose: false
                };
                uniforms.set('uProjectionMatrix', u);
            }

        }

        // As its name implies, it copies all the data drawn on it without any changes.
        export class ReplicateShader extends BufferedShader {

            public constructor(manager:ShaderManager) {
                var uniforms = new OMap<string, WebGLUniform>();
                var attributes = new OMap<string, WebGLAttribute>();
                this.localInit(manager, uniforms, attributes);
                super(manager, shaders.VertexShaders.replicate, shaders.FragmentShaders.def, uniforms, attributes);
            }

            public setFlipY(flip:boolean):void {
                this._uniforms.get('uFlipY').value = flip;
            }

            public setFlipX(flip:boolean):void {
                this._uniforms.get('uFlipX').value = flip;
            }

            public setOriginalSize(xy:Array<number>):void {
                this._uniforms.get('uOriginalSize').value = xy.slice();
            }

            public setFitSize(xy:Array<number>):void {
                this._uniforms.get('uFitSize').value = xy.slice();
            }

            protected localInit(manager:ShaderManager, uniforms:OMap<string, WebGLUniform>, attributes:OMap<string, WebGLAttribute>):void {
                super.localInit(manager, uniforms, attributes);
                var u:WebGLUniform;
                u = {name: 'uFlipY', type: WebGLDataType.UBool, value: false};
                uniforms.set('uFlipY', u);
                u = {name: 'uFlipX', type: WebGLDataType.UBool, value: false};
                uniforms.set('uFlipX', u);
                u = {name: 'uOriginalSize', type: WebGLDataType.U2F, value: [0, 0]};
                uniforms.set('uOriginalSize', u);
                u = {name: 'uFitSize', type: WebGLDataType.U2F, value: [0, 0]};
                uniforms.set('uFitSize', u);
            }

        }

        export class FxaaShader extends BufferedShader {

            public constructor(manager:ShaderManager) {
                var uniforms = new OMap<string, WebGLUniform>();
                var attributes = new OMap<string, WebGLAttribute>();
                this.localInit(manager, uniforms, attributes);
                super(manager, shaders.VertexShaders.fxaa, shaders.FragmentShaders.fxaa, uniforms, attributes);
            }

            public setResolutionXY(v2:Array<number>):void {
                this._uniforms.get('uResolution').value = v2;
            }

            protected localInit(manager:ShaderManager, uniforms:OMap<string, WebGLUniform>, attributes:OMap<string, WebGLAttribute>):void {
                super.localInit(manager, uniforms, attributes);
                var u:WebGLUniform;
                u = {name: 'uResolution', type: WebGLDataType.U2F, value: [1, 1]};
                uniforms.set('uResolution', u);
            }

        }

        class BlurXShader extends BufferedShader {

            public constructor(manager:ShaderManager) {
                var uniforms = new OMap<string, WebGLUniform>();
                var attributes = new OMap<string, WebGLAttribute>();
                this.localInit(manager, uniforms, attributes);
                super(manager, shaders.VertexShaders.blurX, shaders.FragmentShaders.blur, uniforms, attributes);
            }

            public setStrength(strength:number):void {
                if (strength < 0) {
                    strength = 1;
                }
                this._uniforms.get('uStrength').value = strength;
            }

            public getStrength():number {
                return this._uniforms.get('uStrength').value;
            }

            protected localInit(manager:ShaderManager, uniforms:OMap<string, WebGLUniform>, attributes:OMap<string, WebGLAttribute>):void {
                super.localInit(manager, uniforms, attributes);
                var u:WebGLUniform;
                u = {name: 'uStrength', type: WebGLDataType.U1F, value: 5};
                uniforms.set('uStrength', u);
            }

        }

        class BlurYShader extends BufferedShader {

            public constructor(manager:ShaderManager) {
                var uniforms = new OMap<string, WebGLUniform>();
                var attributes = new OMap<string, WebGLAttribute>();
                this.localInit(manager, uniforms, attributes);
                super(manager, shaders.VertexShaders.blurY, shaders.FragmentShaders.blur, uniforms, attributes);
            }

            public setStrength(strength:number):void {
                if (strength < 0) {
                    strength = 1;
                }
                this._uniforms.get('uStrength').value = strength;
            }

            public getStrength():number {
                return this._uniforms.get('uStrength').value;
            }

            protected localInit(manager:ShaderManager, uniforms:OMap<string, WebGLUniform>, attributes:OMap<string, WebGLAttribute>):void {
                super.localInit(manager, uniforms, attributes);
                var u:WebGLUniform;
                u = {name: 'uStrength', type: WebGLDataType.U1F, value: 5};
                uniforms.set('uStrength', u);
            }

        }

        class ColorTransformShader extends BufferedShader {

            public constructor(manager:ShaderManager) {
                var uniforms = new OMap<string, WebGLUniform>();
                var attributes = new OMap<string, WebGLAttribute>();
                this.localInit(manager, uniforms, attributes);
                super(manager, shaders.VertexShaders.def, shaders.FragmentShaders.colorTransform, uniforms, attributes);
            }

            public setColorMatrix(r4c5:Array<number>):void {
                this._uniforms.get('uColorMatrix').value = r4c5.slice();
            }

            protected localInit(manager:ShaderManager, uniforms:OMap<string, WebGLUniform>, attributes:OMap<string, WebGLAttribute>):void {
                super.localInit(manager, uniforms, attributes);
                var u:WebGLUniform;
                var defaultColorMatrix = [
                    1, 0, 0, 0, 0,
                    0, 1, 0, 0, 0,
                    0, 0, 1, 0, 0,
                    0, 0, 0, 1, 0
                ];
                u = {name: 'uColorMatrix', type: WebGLDataType.U1FV, value: defaultColorMatrix};
                uniforms.set('uColorMatrix', u);
            }

        }

        export class FilterManager implements IDisposable {

            public constructor(renderer:WebGLRenderer) {
                this._renderer = renderer;
                this._filters = [];
            }

            public dispose():void {
            }

            public pushFilterPack(filters:Array<AbstractFilter>):void {
                var f = filters.slice();
                this._filters.push(f);
            }

            public popFilterPack():Array<AbstractFilter> {
                return this.hasFilters ? this._filters.pop() : null;
            }

            public get hasFilters():boolean {
                return this._filters.length > 0;
            }

            public processFilters(renderer:WebGLRenderer, input:WebGLRenderTarget, output:WebGLReplicateRenderTarget):void {
                // 处理时仅最后一层有效，因为都是渲染到缓冲区上的，这一层渲染完后会作为源传给下一层
                if (this.hasFilters) {
                    var filters = this._filters[this._filters.length - 1];
                    var filter:AbstractFilter;
                    var currentInput = input;
                    for (var i = 0; i < filters.length; i++) {
                        filter = filters[i];
                        if (filter != null) {
                            filter.process(renderer, currentInput);
                            currentInput = filter.result;
                        }
                    }
                    output.renderRenderTarget(currentInput, false);
                }
                /*
                 if (this._filters.length > 0) {
                 if (this._filters.length == 1) {
                 this._filters[0].process(renderer, input, output, false);
                 } else {
                 var t1 = renderer.createCopyRenderTarget(), t2 = renderer.createCopyRenderTarget();
                 this._filters[0].process(renderer, input, t1, true);
                 for (var i = 1; i < this._filters.length - 1; i++) {
                 if (i % 2 == 0) {
                 this._filters[i].process(renderer, t2, t1, true);
                 } else {
                 this._filters[i].process(renderer, t1, t2, true);
                 }
                 }
                 if (this._filters.length == 2) {
                 this._filters[1].process(renderer, t1, output, false);
                 } else {
                 var t = (this._filters.length - 1) % 2 == 0 ? t2 : t1;
                 this._filters[this._filters.length - 1].process(renderer, t, output, false);
                 }
                 renderer.recycleCopyRenderTarget(t1);
                 renderer.recycleCopyRenderTarget(t2);
                 }
                 }
                 */
            }

            public get renderer():WebGLRenderer {
                return this._renderer;
            }

            private _renderer:WebGLRenderer;
            private _filters:Array<Array<AbstractFilter>>;

        }

        export class AbstractFilter implements IDisposable {

            public constructor(filterManager:FilterManager) {
                this._filterManager = filterManager;
                this._referenceCount = 0;
            }

            /**
             * Override this method.
             * @param renderer
             * @param input
             */
            public process(renderer:WebGLRenderer, input:WebGLRenderTarget):void {
                throw new NotImplementedError();
            }

            public syncShaderTransforms():void {
            }

            public get result():WebGLBufferedRenderTarget {
                return this._result;
            }

            /**
             * Called when it is added to a {@see DisplayObject#filters} array.
             * Notice that it may be called multiple times, but a filter should only be initialized once
             * if its output buffer is null.
             */
            public notifyAdded():void {
                if (this._referenceCount <= 0) {
                    this.__init();
                }
                this._referenceCount++;
            }

            /**
             * Called when it is removed from a {@see DisplayObject#filters} array.
             * Notice that it may be called multiple times, but should do nothing if its output is already null.
             */
            public notifyRemoved():void {
                this._referenceCount--;
                if (this._referenceCount <= 0) {
                    this.dispose();
                }
            }

            public init():void {
                this.__init();
            }

            public dispose():void {
                if (this._result != null) {
                    this.__cleanup();
                    this._result = null;
                }
            }

            protected __init():void {
                throw new NotImplementedError();
            }

            protected __cleanup():void {
                throw new NotImplementedError();
            }

            private _referenceCount:number;
            protected _result:WebGLBufferedRenderTarget;
            protected _filterManager:FilterManager;

        }

        class BlurXFilter extends AbstractFilter {

            public constructor(filterManager:FilterManager) {
                super(filterManager);
                this._blurXShader = null;
                this.strength = 5;
                this.pass = 1;
            }

            public process(renderer:WebGLRenderer, input:WebGLRenderTarget):void {
                if (this._pass == 1) {
                    this._result.renderRenderTarget(input, true);
                } else {
                    var tempTarget = renderer.createBufferedRenderTarget(this._blurXShader, false);
                    if (this._pass == 2) {
                        tempTarget.renderRenderTarget(input, true);
                        this._result.renderRenderTarget(tempTarget, true);
                    } else {
                        this._result.renderRenderTarget(input, true);
                        tempTarget.renderRenderTarget(this._result, true);
                        this._result.renderRenderTarget(tempTarget, true);
                    }
                    renderer.releaseBufferedRenderTarget(tempTarget);
                }
            }

            protected __init():void {
                this._blurXShader = new BlurXShader(this._filterManager.renderer.shaderManager);
                this._result = new WebGLBufferedRenderTarget(this._filterManager.renderer, this._blurXShader, true);
                this._blurXShader.setStrength(this._strength);
            }

            protected __cleanup():void {
                this._result.dispose();
                this._blurXShader = null;
            }

            public get strength():number {
                return this._strength;
            }

            public set strength(v:number) {
                if (v < 0) {
                    v = 1;
                }
                this._strength = v;
                if (this._blurXShader != null) {
                    this._blurXShader.setStrength(v);
                }
            }

            public get pass():number {
                return this._pass;
            }

            public set pass(v:number) {
                v = mic.util.limit(v, 1, 3) | 0;
                this._pass = v;
            }

            private _strength:number;
            private _pass:number;
            private _blurXShader:BlurXShader;

        }

        class BlurYFilter extends AbstractFilter {

            public constructor(filterManager:FilterManager) {
                super(filterManager);
                this._blurYShader = null;
                this.strength = 5;
                this.pass = 1;
            }

            public process(renderer:WebGLRenderer, input:WebGLRenderTarget):void {
                if (this._pass == 1) {
                    this._result.renderRenderTarget(input, true);
                } else {
                    var tempTarget = renderer.createBufferedRenderTarget(this._blurYShader, false);
                    if (this._pass == 2) {
                        tempTarget.renderRenderTarget(input, true);
                        this._result.renderRenderTarget(tempTarget, true);
                    } else {
                        this._result.renderRenderTarget(input, true);
                        tempTarget.renderRenderTarget(this._result, true);
                        this._result.renderRenderTarget(tempTarget, true);
                    }
                    renderer.releaseBufferedRenderTarget(tempTarget);
                }
            }

            protected __init():void {
                this._blurYShader = new BlurYShader(this._filterManager.renderer.shaderManager);
                this._result = new WebGLBufferedRenderTarget(this._filterManager.renderer, this._blurYShader, true);
                this._blurYShader.setStrength(this._strength);
            }

            protected __cleanup():void {
                this._result.dispose();
                this._blurYShader = null;
            }

            public get strength():number {
                return this._strength;
            }

            public set strength(v:number) {
                if (v < 0) {
                    v = 1;
                }
                this._strength = v;
                if (this._blurYShader != null) {
                    this._blurYShader.setStrength(v);
                }
            }

            public get pass():number {
                return this._pass;
            }

            public set pass(v:number) {
                v = mic.util.limit(v, 1, 3) | 0;
                this._pass = v;
            }

            private _strength:number;
            private _pass:number;
            private _blurYShader:BlurYShader;

        }

        export class BlurFilter extends AbstractFilter {

            public constructor(filterManager:FilterManager) {
                super(filterManager);
                this._blurXFilter = this._blurYFilter = null;
                this.pass = 1;
                this.strengthX = this.strengthY = 5;
            }

            public process(renderer:WebGLRenderer, input:WebGLRenderTarget):void {
                this._blurXFilter.process(renderer, input);
                this._blurYFilter.process(renderer, this._blurXFilter.result);
            }

            protected __init():void {
                this._blurXFilter = new BlurXFilter(this._filterManager);
                this._blurYFilter = new BlurYFilter(this._filterManager);
                this._blurXFilter.init();
                this._blurYFilter.init();
                this._result = new WebGLReplicateRenderTarget(this._filterManager.renderer);
            }

            protected __cleanup():void {
                this._blurXFilter.dispose();
                this._blurYFilter.dispose();
                this._result.dispose();
                this._blurXFilter = this._blurYFilter = null;
            }

            public get strengthX():number {
                return this._strengthX;
            }

            public set strengthX(v:number) {
                if (v < 0) {
                    v = 1;
                }
                this._strengthX = v;
                if (this._blurXFilter != null) {
                    this._blurXFilter.strength = v;
                }
            }

            public get strengthY():number {
                return this._strengthY;
            }

            public set strengthY(v:number) {
                if (v < 0) {
                    v = 1;
                }
                this._strengthY = v;
                if (this._blurYFilter != null) {
                    this._blurYFilter.strength = v;
                }
            }

            public get pass():number {
                return this._pass;
            }

            public set pass(v:number) {
                v = mic.util.limit(v, 1, 3) | 0;
                this._pass = v;
                if (this._blurXFilter != null) {
                    this._blurXFilter.pass = v;
                }
                if (this._blurYFilter != null) {
                    this._blurYFilter.pass = v;
                }
            }

            private _blurXFilter:BlurXFilter;
            private _blurYFilter:BlurYFilter;
            private _strengthX:number;
            private _strengthY:number;
            private _pass:number;

        }

        class ColorTransformFilter extends AbstractFilter {

            public constructor(filterManager:FilterManager) {
                super(filterManager);
                this._colorTransformShader = null;
            }

            public process(renderer:WebGLRenderer, input:WebGLRenderTarget):void {
                this._result.renderRenderTarget(input, true);
            }

            protected __init():void {
                this._colorTransformShader = new ColorTransformShader(this._filterManager.renderer.shaderManager);
                this._result = new WebGLBufferedRenderTarget(this._filterManager.renderer, this._colorTransformShader, true);
            }

            protected __cleanup():void {
                this._result.dispose();
                this._colorTransformShader = null;
            }

            public setColorMatrix(r4c5:Array<number>):void {
                if (this._colorTransformShader != null) {
                    this._colorTransformShader.setColorMatrix(r4c5);
                }
            }

            private _colorTransformShader:ColorTransformShader;

        }

        export class GlowFilter extends AbstractFilter {

            public constructor(filterManager:FilterManager) {
                super(filterManager);
                this._blurFilter = this._colorTransformFilter = null;
                this.strengthX = 5;
                this.strengthY = 5;
                this.pass = 1;
            }

            public process(renderer:WebGLRenderer, input:WebGLRenderTarget):void {
                this._colorTransformFilter.process(renderer, input);
                this._blurFilter.process(renderer, this._colorTransformFilter.result);
                this._result.renderRenderTarget(this._blurFilter.result, true);
                this._result.renderRenderTarget(input, false);
            }

            protected __init():void {
                this._blurFilter = new BlurFilter(this._filterManager);
                this._colorTransformFilter = new ColorTransformFilter(this._filterManager);
                this._blurFilter.init();
                this._colorTransformFilter.init();
                this._result = new WebGLReplicateRenderTarget(this._filterManager.renderer);
            }

            protected __cleanup():void {
                this._blurFilter.dispose();
                this._colorTransformFilter.dispose();
                this._result.dispose();
                this._blurFilter = this._colorTransformFilter = null;
            }

            public get strengthX():number {
                return this._strengthX;
            }

            public set strengthX(v:number) {
                if (v < 0) {
                    v = 1;
                }
                this._strengthX = v;
                if (this._blurFilter != null) {
                    this._blurFilter.strengthX = v;
                }
            }

            public get strengthY():number {
                return this._strengthY;
            }

            public set strengthY(v:number) {
                if (v < 0) {
                    v = 1;
                }
                this._strengthY = v;
                if (this._blurFilter != null) {
                    this._blurFilter.strengthY = v;
                }
            }

            public get pass():number {
                return this._pass;
            }

            public set pass(v:number) {
                v = mic.util.limit(v, 1, 3) | 0;
                this._pass = v;
                if (this._blurFilter != null) {
                    this._blurFilter.pass = v;
                }
            }

            public setColorTransform(r4c5:Array<number>):void {
                if (this._colorTransformFilter != null) {
                    this._colorTransformFilter.setColorMatrix(r4c5);
                }
            }

            private _blurFilter:BlurFilter;
            private _colorTransformFilter:ColorTransformFilter;
            private _strengthX:number;
            private _strengthY:number;
            private _pass:number;

        }

    }

}
