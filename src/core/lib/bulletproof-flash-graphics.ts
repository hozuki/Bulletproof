/**
 * Created by MIC on 2015/10/6.
 */

/// <reference path="../../../include/ext/libtess.js/libtess.d.ts"/>

import bulletproof_org = require("./bulletproof-org");
import bulletproof_mic = require("./bulletproof-mic");
import bulletproof_flash_base = require("./bulletproof-flash-base");
import bulletproof_flash_display = require("./bulletproof-flash-display");
import bulletproof_webgl = require("./bulletproof-webgl");
import libtess = require("libtess");

export module bulletproof {

    export module flash {

        export module display {

            import mic = bulletproof_mic.bulletproof.mic;
            import webgl = bulletproof_webgl.bulletproof.webgl;
            import gl = bulletproof_webgl.bulletproof.webgl.gl;
            import geom = bulletproof_flash_base.bulletproof.flash.geom;

            import NotImplementedError = bulletproof_org.bulletproof.NotImplementedError;
            import IDisposable = bulletproof_org.bulletproof.IDisposable;
            import ICopyable = bulletproof_org.bulletproof.ICopyable;
            import DisplayObject = bulletproof_flash_display.bulletproof.flash.display.DisplayObject;
            import DisplayObjectContainer = bulletproof_flash_display.bulletproof.flash.display.DisplayObjectContainer;
            import Stage = bulletproof_flash_display.bulletproof.flash.display.Stage;
            import BitmapData = bulletproof_flash_display.bulletproof.flash.display.BitmapData;

            var STD_Z:number = 0;
            // How many segments are there in curves. Larger values provide a better quality,
            // but decrease drawing speed.
            var CURVE_ACCURACY:number = 20;

            // Bulletproof: Non-standard inheritance
            export class Shape extends DisplayObject {

                public constructor(root:Stage, parent:DisplayObjectContainer) {
                    super(root, parent);
                    this._graphics = new Graphics(this, root.worldRenderer);
                }

                public get graphics():Graphics {
                    return this._graphics;
                }

                protected updateInternal():void {
                    this._graphics.update();
                }

                protected renderInternal(renderer:webgl.WebGLRenderer, primitiveTarget:webgl.WebGLPrimitiveRenderTarget):void {
                    // 此处渲染到的是 DisplayObject 自己开辟的一个 render target，所以不用额外计算什么
                    this._graphics.render(renderer, primitiveTarget);
                }

                private _graphics:Graphics;

            }

            interface IGraphicsDataRenderer extends IDisposable {

                bezierCurveTo(cx1:number, cy1:number, cx2:number, cy2:number, x:number, y:number):void;
                closePath():void;
                curveTo(cx:number, cy:number, x:number, y:number):void;
                drawCircle(x:number, y:number, radius:number):void;
                drawEllipse(x:number, y:number, width:number, height:number):void;
                drawRect(x:number, y:number, width:number, height:number):void;
                drawRoundRect(x:number, y:number, width:number, height:number, ellipseWidth:number, ellipseHeight?:number):void;
                lineTo(x:number, y:number):void;
                moveTo(x:number, y:number):void;
                update():void;
                render(renderer:webgl.WebGLRenderer, primitiveTarget:webgl.WebGLPrimitiveRenderTarget):void;

            }

            interface IStrokeGraphicsDataRenderer extends IGraphicsDataRenderer {
            }

            interface IFillGraphicsDataRenderer extends IGraphicsDataRenderer {
                beginIndex:number;
                endIndex:number;
            }

            class GraphicsDataRendererBase implements IGraphicsDataRenderer {

                public constructor(graphics:Graphics, lastPathStartX:number, lastPathStartY:number, currentX:number, currentY:number) {
                    this._graphics = graphics;
                    this._glc = graphics.renderer.context;
                    this.initializeBuffers();
                    this._hasDrawnAnything = false;
                    this._lastPathStartX = lastPathStartX;
                    this._lastPathStartY = lastPathStartY;
                    this.moveTo(currentX, currentY);
                    this._isDirty = true;
                }

                public bezierCurveTo(cx1:number, cy1:number, cx2:number, cy2:number, x:number, y:number):void {
                    throw new NotImplementedError();
                }

                public closePath():void {
                    // TODO: Consider the sample
                    // g.beginFill(0xff0000); g.drawRect(100, 100, 100, 100); g.lineStyle(0xff0000, 1);
                    // g.lineTo(400, 100); g.lineTo(200, 300); g.endFill();
                    if (this._hasDrawnAnything && (this._currentX != this._lastPathStartX || this._currentY != this._lastPathStartY)) {
                        this.lineTo(this._lastPathStartX, this._lastPathStartY);
                    }
                }

                public curveTo(cx:number, cy:number, x:number, y:number):void {
                    throw new NotImplementedError();
                }

                public drawCircle(x:number, y:number, radius:number):void {
                    throw new NotImplementedError();
                }

                public drawEllipse(x:number, y:number, width:number, height:number):void {
                    throw new NotImplementedError();
                }

                public drawRect(x:number, y:number, width:number, height:number):void {
                    throw new NotImplementedError();
                }

                public drawRoundRect(x:number, y:number, width:number, height:number, ellipseWidth:number, ellipseHeight:number = NaN):void {
                    throw new NotImplementedError();
                }

                public lineTo(x:number, y:number):void {
                    throw new NotImplementedError();
                }

                public moveTo(x:number, y:number):void {
                    // Multiple movements are combined into one, which will be flushed at each
                    // IGraphicsDataRenderer call that draws concrete elements
                    throw new NotImplementedError();
                }

                public update():void {
                    // check whether to update the typed buffer
                    this.syncBuffers();
                }

                public render(renderer:webgl.WebGLRenderer, primitiveTarget:webgl.WebGLPrimitiveRenderTarget):void {
                    throw new NotImplementedError();
                }

                public dispose():void {
                    this._vertexBuffer.dispose();
                    this._colorBuffer.dispose();
                    this._indexBuffer.dispose();
                    this._vertexBuffer = this._colorBuffer = this._indexBuffer = null;
                    this._vertices = this._colors = this._indices = null;
                    this._glc = null;
                }

                public set isDirty(v:boolean) {
                    this._isDirty = v;
                }

                private initializeBuffers():void {
                    this._vertices = [];
                    this._colors = [];
                    this._indices = [];
                    this._vertexBuffer = webgl.WebGLArrayBuffer.create(this._glc, this._vertices, gl.FLOAT, gl.ARRAY_BUFFER);
                    this._colorBuffer = webgl.WebGLArrayBuffer.create(this._glc, this._colors, gl.FLOAT, gl.ARRAY_BUFFER);
                    this._indexBuffer = webgl.WebGLArrayBuffer.create(this._glc, this._indices, gl.UNSIGNED_SHORT, gl.ELEMENT_ARRAY_BUFFER);
                }

                protected syncBuffers():void {
                    if (this._isDirty) {
                        // When the array buffers become dirty, their values will be updated automatically
                        // at next draw call.
                        this._vertexBuffer.setNewData(this._vertices);
                        this._vertexBuffer.becomeDirty();
                        this._colorBuffer.setNewData(this._colors);
                        this._colorBuffer.becomeDirty();
                        this._indexBuffer.setNewData(this._indices);
                        this._indexBuffer.becomeDirty();
                        this._isDirty = false;
                    }
                }

                protected _graphics:Graphics;
                protected _glc:WebGLRenderingContext;
                protected _isDirty:boolean;
                // Local points buffer, format: X, Y, Z(=STD_Z)
                protected _vertices:Array<number>;
                // Colors of points, format: R, G, B, A
                protected _colors:Array<number>;
                // Local indices (for points) buffer
                protected _indices:Array<number>;
                protected _vertexBuffer:webgl.WebGLArrayBuffer;
                protected _colorBuffer:webgl.WebGLArrayBuffer;
                protected _indexBuffer:webgl.WebGLArrayBuffer;
                protected _currentX:number;
                protected _currentY:number;
                protected _hasDrawnAnything:boolean;
                protected _lastPathStartX:number;
                protected _lastPathStartY:number;

            }

            class StrokeRendererBase extends GraphicsDataRendererBase implements IStrokeGraphicsDataRenderer {

                public constructor(graphics:Graphics, lastPathStartX:number, lastPathStartY:number, currentX:number, currentY:number) {
                    super(graphics, lastPathStartX, lastPathStartY, currentX, currentY);
                    this._lineVerticesStorage = [[0, 0], [0, 0], [0, 0], [0, 0]];
                }

                public moveTo(x:number, y:number):void {
                    // This action seems weird...
                    if (this._graphics.isInFill) {
                        this.closePath();
                    }
                    this._currentX = x;
                    this._currentY = y;
                    this._lastPathStartX = x;
                    this._lastPathStartY = y;
                }

                protected getSimLineVertices(x1:number, y1:number, x2:number, y2:number, z:number, width:number):Array<number> {
                    if (width < 0) {
                        return [];
                    }
                    var halfWidth = width / 2;
                    var vert1 = this._lineVerticesStorage[0],
                        vert2 = this._lineVerticesStorage[1],
                        vert3 = this._lineVerticesStorage[2],
                        vert4 = this._lineVerticesStorage[3];
                    if (x1 === x2) {
                        vert1[0] = x1 - halfWidth;
                        vert1[1] = y1 > y2 ? y1 + halfWidth : y1 - halfWidth;
                        vert2[0] = x1 + halfWidth;
                        vert2[1] = y1 > y2 ? y1 + halfWidth : y1 - halfWidth;
                        vert3[0] = x2 - halfWidth;
                        vert3[1] = y1 > y2 ? y2 - halfWidth : y2 + halfWidth;
                        vert4[0] = x2 + halfWidth;
                        vert4[1] = y1 > y2 ? y2 - halfWidth : y2 + halfWidth;
                    } else {
                        var slope = (y2 - y1) / (x2 - x1);
                        var ct = 1 / Math.sqrt(1 + slope * slope);
                        var st = Math.sqrt(1 - ct * ct);
                        // dx/dy: additional length considering the line width perpendicular to the line itself
                        var dx = halfWidth * st;
                        var dy = halfWidth * ct;
                        // dtx/dty: additional length considering the line width at end points
                        var dtx = dy;
                        var dty = dx;
                        // move the line to their new end points
                        if (x1 > x2) {
                            x1 += dtx;
                            x2 -= dtx;
                        } else {
                            x1 -= dtx;
                            x2 += dtx;
                        }
                        if (y1 > y2) {
                            y1 += dty;
                            y2 -= dty;
                        } else {
                            y1 -= dty;
                            y2 += dty;
                        }
                        // and calculate simulating rectangle
                        vert1[0] = x1 - dx;
                        vert2[0] = x1 + dx;
                        vert3[0] = x2 - dx;
                        vert4[0] = x2 + dx;
                        if (slope >= 0) {
                            vert1[1] = y1 + dy;
                            vert2[1] = y1 - dy;
                            vert3[1] = y2 + dy;
                            vert4[1] = y2 - dy;
                        } else {
                            vert1[1] = y1 - dy;
                            vert2[1] = y1 + dy;
                            vert3[1] = y2 - dy;
                            vert4[1] = y2 + dy;
                        }
                    }
                    return [
                        vert1[0], vert1[1], z, vert2[0], vert2[1], z,
                        vert3[0], vert3[1], z, vert4[0], vert4[1], z
                    ];
                }

                private _lineVerticesStorage:Array<Array<number>>;

            }

            class SolidStrokeRenderer extends StrokeRendererBase {

                public constructor(graphics:Graphics, lastPathStartX:number, lastPathStartY:number, currentX:number, currentY:number, lineWidth:number, color:number, alpha:number = 1.0) {
                    super(graphics, lastPathStartX, lastPathStartY, currentX, currentY);
                    this._a = mic.util.limit(alpha, 0, 1);
                    this._r = ((color >>> 16) & 0xff) / 0xff;
                    this._g = ((color >>> 8 ) & 0xff) / 0xff;
                    this._b = (color & 0xff) / 0xff;
                    this._w = lineWidth;
                    //this._r *= this._a;
                    //this._g *= this._a;
                    //this._b *= this._a;

                }

                public lineTo(x:number, y:number):void {
                    if (this._w > 0) {
                        this._isDirty = true;
                        var vertices = this.getSimLineVertices(this._currentX, this._currentY, x, y, STD_Z, this._w);
                        if (vertices.length > 0) {
                            // Generated 4 vertices, matching with 6 indices (2 triangles)
                            var cur = this._vertices.length / 3;
                            for (var i = 0; i < 12; i++) {
                                this._vertices.push(vertices[i]);
                            }
                            for (var i = 0; i < 4; i++) {
                                this._colors.push(this._r, this._g, this._b, this._a);
                            }
                            this._indices.push(cur, cur + 1, cur + 2, cur + 1, cur + 2, cur + 3);
                            this._hasDrawnAnything = true;
                        }
                    }
                    this._currentX = x;
                    this._currentY = y;
                }

                public bezierCurveTo(cx1:number, cy1:number, cx2:number, cy2:number, x:number, y:number):void {
                    if (this._w > 0) {
                        this._isDirty = true;
                        var dt1:number, dt2:number, dt3:number;
                        var t2:number, t3:number;
                        var fromX = this._currentX, fromY = this._currentY;
                        var xa:number, ya:number;
                        var j:number;
                        for (var i = 1; i <= CURVE_ACCURACY; i++) {
                            j = i / CURVE_ACCURACY;
                            dt1 = 1 - j;
                            dt2 = dt1 * dt1;
                            dt3 = dt2 * dt1;
                            t2 = j * j;
                            t3 = t2 * j;
                            xa = dt3 * fromX + 3 * dt2 * j * cx1 + 3 * dt1 * t2 * cx2 + t3 * x;
                            ya = dt3 * fromY + 3 * dt2 * j * cy1 + 3 * dt1 * t2 * cy2 + t3 * y;
                            this.lineTo(xa, ya);
                        }
                    }
                    this._currentX = x;
                    this._currentY = y;
                }

                public curveTo(cx:number, cy:number, x:number, y:number):void {
                    if (this._w > 0) {
                        this._isDirty = true;
                        var j:number;
                        var fromX = this._currentX, fromY = this._currentY;
                        var xa:number, ya:number;
                        for (var i = 1; i <= CURVE_ACCURACY; i++) {
                            j = i / CURVE_ACCURACY;
                            xa = fromX + (cx - fromX) * j;
                            ya = fromY + (cy - fromY) * j;
                            xa = xa + (cx + (x - cx) * j - xa) * j;
                            ya = ya + (cy + (y - cy) * j - ya) * j;
                            this.lineTo(xa, ya);
                        }
                    }
                    this._currentX = x;
                    this._currentY = y;
                }

                public drawCircle(x:number, y:number, radius:number):void {
                    this.moveTo(x - radius, y);
                    if (this._w > 0) {
                        this._isDirty = true;
                        var thetaNext:number;
                        var thetaBegin:number;
                        var x2:number, y2:number;
                        var halfPi = Math.PI / 2;
                        thetaBegin = Math.PI;
                        // Draw 4 segments of arcs, [-PI, -PI/2] [-PI/2, 0] [0, PI/2] [PI/2 PI]
                        for (var k = 0; k < 4; k++) {
                            for (var i = 1; i <= CURVE_ACCURACY; i++) {
                                thetaNext = thetaBegin - i / CURVE_ACCURACY * halfPi;
                                x2 = x + radius * Math.cos(thetaNext);
                                y2 = y + radius * Math.sin(thetaNext);
                                this.lineTo(x2, y2);
                            }
                            thetaBegin -= halfPi;
                        }
                    }
                    this._currentX = x + radius;
                    this._currentY = y;
                    this._lastPathStartX = x + radius;
                    this._lastPathStartY = y;
                }

                public drawEllipse(x:number, y:number, width:number, height:number):void {
                    this.moveTo(x - width, y);
                    if (this._w > 0) {
                        this._isDirty = true;
                        var thetaNext:number;
                        var thetaBegin:number;
                        var x2:number, y2:number;
                        var halfPi = Math.PI / 2;
                        thetaBegin = Math.PI;
                        // Draw 4 segments of arcs, [-PI, -PI/2] [-PI/2, 0] [0, PI/2] [PI/2 PI]
                        // Brute, huh? Luckily there are 20 segments per PI/2...
                        for (var k = 0; k < 4; k++) {
                            for (var i = 1; i <= CURVE_ACCURACY; i++) {
                                thetaNext = thetaBegin - i / CURVE_ACCURACY * halfPi;
                                x2 = x + width * Math.cos(thetaNext);
                                y2 = y + height * Math.sin(thetaNext);
                                this.lineTo(x2, y2);
                            }
                            thetaBegin -= halfPi;
                        }
                    }
                    this._currentX = x + width;
                    this._currentY = y;
                    this._lastPathStartX = x + width;
                    this._lastPathStartY = y;
                }

                public drawRect(x:number, y:number, width:number, height:number):void {
                    this._isDirty = true;
                    this.moveTo(x, y);
                    this.lineTo(x, y + height);
                    this.lineTo(x + width, y + height);
                    this.lineTo(x + width, y);
                    this.lineTo(x, y);
                }

                public drawRoundRect(x:number, y:number, width:number, height:number, ellipseWidth:number, ellipseHeight:number = NaN):void {
                    throw new NotImplementedError();
                }

                public render(renderer:webgl.WebGLRenderer, primitiveTarget:webgl.WebGLPrimitiveRenderTarget):void {
                    if (this._vertices.length > 0) {
                        primitiveTarget.renderPrimitives(this._vertexBuffer, this._colorBuffer, this._indexBuffer, false);
                    }
                }

                private _r:number;
                private _g:number;
                private _b:number;
                private _a:number;
                private _w:number;

            }

            class FillRendererBase extends GraphicsDataRendererBase implements IFillGraphicsDataRenderer {

                public constructor(graphics:Graphics, currentX:number, currentY:number) {
                    super(graphics, currentX, currentY, currentX, currentY);
                    this._contours = [[]];
                    this.beginIndex = -1;
                    this.endIndex = -1;
                    this._hasDrawnAnything = false;
                    this._startingNewContour = true;
                }

                public moveTo(x:number, y:number):void {
                    // Consider the code sample:
                    // g.beginFill(0xff0000, 1);
                    // g.lineStyle(1, 0xffffff);
                    // g.moveTo(100, 100);

                    // Flash closes the path before each moveTo() call
                    this.closePath();
                    if (this._hasDrawnAnything) {
                        if (this._currentX != x || this._currentY != y) {
                            this._startingNewContour = true;
                        }
                    } else {
                        this._startingNewContour = true;
                    }
                    this._currentX = x;
                    this._currentY = y;
                    this._lastPathStartX = x;
                    this._lastPathStartY = y;
                }

                // Use to track the relative rendering order, based on stroke renderers' orders
                public beginIndex:number;
                public endIndex:number;

                protected getContourForClosedShapes():Array<number> {
                    var currentContour:Array<number>;
                    if (this._hasDrawnAnything) {
                        currentContour = [];
                        this._contours.push(currentContour);
                        this._startingNewContour = false;
                    } else {
                        currentContour = this._contours[0];
                    }
                    return currentContour;
                }

                protected getContourForLines():Array<number> {
                    var currentContour:Array<number>;
                    if (this._hasDrawnAnything) {
                        if (this._startingNewContour) {
                            currentContour = [];
                            this._contours.push(currentContour);
                            this._startingNewContour = false;
                        } else {
                            currentContour = this._contours[this._contours.length - 1];
                        }
                    } else {
                        currentContour = this._contours[0];
                    }
                    return currentContour;
                }

                // See libtess.js Degenerate Hourglass test.
                protected _contours:Array<Array<number>>;
                protected _startingNewContour:boolean;

            }

            class SolidFillRenderer extends FillRendererBase {

                public constructor(graphics:Graphics, startX:number, startY:number, color:number, alpha:number) {
                    super(graphics, startX, startY);
                    this._a = mic.util.limit(alpha, 0, 1);
                    this._r = ((color >>> 16) & 0xff) / 0xff;
                    this._g = ((color >>> 8 ) & 0xff) / 0xff;
                    this._b = (color & 0xff) / 0xff;
                    //this._r *= this._a;
                    //this._g *= this._a;
                    //this._b *= this._a;
                }

                public bezierCurveTo(cx1:number, cy1:number, cx2:number, cy2:number, x:number, y:number):void {
                    this._isDirty = true;
                    var currentContour = this.getContourForLines();
                    if (!this._hasDrawnAnything || this._startingNewContour) {
                        currentContour.push(this._currentX, this._currentY, STD_Z);
                    }
                    var dt1:number, dt2:number, dt3:number;
                    var t2:number, t3:number;
                    var fromX = this._currentX, fromY = this._currentY;
                    var xa:number, ya:number;
                    var j:number;
                    for (var i = 1; i <= CURVE_ACCURACY; i++) {
                        j = i / CURVE_ACCURACY;
                        dt1 = 1 - j;
                        dt2 = dt1 * dt1;
                        dt3 = dt2 * dt1;
                        t2 = j * j;
                        t3 = t2 * j;
                        xa = dt3 * fromX + 3 * dt2 * j * cx1 + 3 * dt1 * t2 * cx2 + t3 * x;
                        ya = dt3 * fromY + 3 * dt2 * j * cy1 + 3 * dt1 * t2 * cy2 + t3 * y;
                        currentContour.push(xa, ya, STD_Z);
                    }
                    this._currentX = x;
                    this._currentY = y;
                    this._hasDrawnAnything = true;
                    this._startingNewContour = false;
                }

                public curveTo(cx:number, cy:number, x:number, y:number):void {
                    this._isDirty = true;
                    var currentContour = this.getContourForLines();
                    if (!this._hasDrawnAnything || this._startingNewContour) {
                        currentContour.push(this._currentX, this._currentY, STD_Z);
                    }
                    var j:number;
                    var fromX = this._currentX, fromY = this._currentY;
                    var xa:number, ya:number;
                    for (var i = 1; i <= CURVE_ACCURACY; i++) {
                        j = i / CURVE_ACCURACY;
                        xa = fromX + (cx - fromX) * j;
                        ya = fromY + (cy - fromY) * j;
                        xa = xa + (cx + (x - cx) * j - xa) * j;
                        ya = ya + (cy + (y - cy) * j - ya) * j;
                        currentContour.push(xa, ya, STD_Z);
                    }
                    this._currentX = x;
                    this._currentY = y;
                    this._hasDrawnAnything = true;
                    this._startingNewContour = false;
                }

                public drawCircle(x:number, y:number, radius:number):void {
                    this._isDirty = true;
                    this.moveTo(x, y);
                    var currentContour = this.getContourForClosedShapes();
                    var thetaNext:number;
                    var thetaBegin:number;
                    var x2:number, y2:number;
                    var halfPi = Math.PI / 2;
                    currentContour.push(this._currentX + radius, this._currentY, STD_Z);
                    thetaBegin = 0;
                    // Draw 4 segments of arcs, [-PI, -PI/2] [-PI/2, 0] [0, PI/2] [PI/2 PI]
                    for (var k = 0; k < 4; k++) {
                        for (var i = 1; i <= CURVE_ACCURACY; i++) {
                            thetaNext = thetaBegin - i / CURVE_ACCURACY * halfPi;
                            x2 = x + radius * Math.cos(thetaNext);
                            y2 = y + radius * Math.sin(thetaNext);
                            currentContour.push(x2, y2, STD_Z);
                        }
                        thetaBegin -= halfPi;
                    }
                    this._currentX = x + radius;
                    this._currentY = y;
                    this._lastPathStartX = x + radius;
                    this._lastPathStartY = y;
                    this._hasDrawnAnything = true;
                    this._startingNewContour = false;
                }

                public drawEllipse(x:number, y:number, width:number, height:number):void {
                    this._isDirty = true;
                    this.moveTo(x, y);
                    var currentContour = this.getContourForClosedShapes();
                    var thetaNext:number;
                    var thetaBegin:number;
                    var x2:number, y2:number;
                    var halfPi = Math.PI / 2;
                    currentContour.push(this._currentX + width, this._currentY, STD_Z);
                    thetaBegin = 0;
                    // Draw 4 segments of arcs, [-PI, -PI/2] [-PI/2, 0] [0, PI/2] [PI/2 PI]
                    // Brute, huh? Luckily there are 20 segments per PI/2...
                    for (var k = 0; k < 4; k++) {
                        for (var i = 1; i <= CURVE_ACCURACY; i++) {
                            thetaNext = thetaBegin - i / CURVE_ACCURACY * halfPi;
                            x2 = x + width * Math.cos(thetaNext);
                            y2 = y + height * Math.sin(thetaNext);
                            currentContour.push(x2, y2, STD_Z);
                        }
                        thetaBegin -= halfPi;
                    }
                    this._currentX = x + width;
                    this._currentY = y;
                    this._lastPathStartX = x + width;
                    this._lastPathStartY = y;
                    this._hasDrawnAnything = true;
                    this._startingNewContour = false;
                }

                public drawRect(x:number, y:number, width:number, height:number):void {
                    this._isDirty = true;
                    this.moveTo(x, y);
                    // Create a new contour and draw a independent rectangle, should not use lineTo().
                    var currentContour = this.getContourForClosedShapes();
                    currentContour.push(x, y, STD_Z);
                    currentContour.push(x + width, y, STD_Z);
                    currentContour.push(x + width, y + height, STD_Z);
                    currentContour.push(x, y + height, STD_Z);
                    this._currentX = x;
                    this._currentY = y;
                    this._hasDrawnAnything = true;
                    this._startingNewContour = false;
                }

                public drawRoundRect(x:number, y:number, width:number, height:number, ellipseWidth:number, ellipseHeight:number = NaN):void {
                    throw new NotImplementedError();
                }

                public lineTo(x:number, y:number):void {
                    this._isDirty = true;
                    var currentContour = this.getContourForLines();
                    if (!this._hasDrawnAnything || this._startingNewContour) {
                        currentContour.push(this._currentX, this._currentY, STD_Z);
                    }
                    currentContour.push(x, y, STD_Z);
                    this._currentX = x;
                    this._currentY = y;
                    this._hasDrawnAnything = true;
                    this._startingNewContour = false;
                }

                public update():void {
                    if (this._isDirty) {
                        // Triangulate first
                        var tess = this._graphics.renderer.tessellator;
                        tess.gluTessProperty(libtess.gluEnum.GLU_TESS_WINDING_RULE, libtess.windingRule.GLU_TESS_WINDING_ODD);
                        tess.gluTessNormal(0, 0, 1);
                        var resultArray:Array<Array<number>> = [];
                        tess.gluTessBeginPolygon(resultArray);
                        var contour:Array<number>;
                        for (var i = 0; i < this._contours.length; i++) {
                            contour = this._contours[i];
                            if (contour.length > 0) {
                                tess.gluTessBeginContour();
                                for (var j = 0; j < contour.length; j += 3) {
                                    var coords = [contour[j], contour[j + 1], contour[j + 2]];
                                    tess.gluTessVertex(coords, coords);
                                }
                                tess.gluTessEndContour();
                            }
                        }
                        tess.gluTessEndPolygon();

                        this._vertices = [];
                        this._colors = [];
                        this._indices = [];
                        var colors = this._colors;
                        var indices = this._indices;
                        var vertices = this._vertices;
                        j = 0;
                        var tempArray:Array<number>;
                        for (var i = 0; i < resultArray.length; i++) {
                            tempArray = resultArray[i];
                            for (var j = 0; j < tempArray.length; j++) {
                                vertices.push(tempArray[j]);
                            }
                        }
                        j = 0;
                        for (var i = 0; i < vertices.length; i += 3) {
                            colors.push(this._r, this._g, this._b, this._a);
                            indices.push(j);
                            j++;
                        }
                    }

                    // Then update buffers
                    super.update();
                }

                public render(renderer:webgl.WebGLRenderer, primitiveTarget:webgl.WebGLPrimitiveRenderTarget):void {
                    if (this._vertices.length > 0) {
                        primitiveTarget.renderPrimitives(this._vertexBuffer, this._colorBuffer, this._indexBuffer, false);
                    }
                }

                private _r:number;
                private _g:number;
                private _b:number;
                private _a:number;

            }

            class GraphicsTrianglePath implements IGraphicsPath, IGraphicsData {

                public culling:string;
                public indices:Array<number>;
                public uvtData:Array<number>;
                public vertices:Array<number>;

                public constructor(vertices:Array<number> = null, indices:Array<number> = null, uvtData:Array<number> = null, culling:string = TriangleCulling.NONE) {
                    this.vertices = vertices;
                    this.indices = indices;
                    this.uvtData = uvtData;
                    this.culling = culling;
                }

            }

            enum BrushType {
                SOLID,
                GRADIENT,
                BITMAP,
                SHADER
            }

            export class Graphics implements ICopyable<Graphics> {

                public constructor(attachTo:DisplayObject, renderer:webgl.WebGLRenderer) {
                    this._displayObject = attachTo;
                    this._renderer = renderer;
                    this._isDirty = true;
                    this._strokeRenderers = [];
                    this._fillRenderers = [];
                    this.updateCurrentPoint(0, 0);
                    this.resetStyles();
                    this.clear();
                }

                public beginBitmapFill(bitmap:BitmapData, matrix:geom.Matrix = null, repeat:boolean = false, smooth:boolean = false):void {
                    throw new NotImplementedError();
                }

                public beginFill(color:number, alpha:number = 1.0):void {
                    if (this._isInFill) {
                        this.endFill();
                    }
                    if (!this._isInFill) {
                        this._isInFill = true;
                        this._currentStrokeRenderer = this.createStrokeRendererWithCurrentSettings();
                        this._strokeRenderers.push(this._currentStrokeRenderer);
                        this._currentFillRenderer = new SolidFillRenderer(this, this._currentX, this._currentY, color, alpha);
                        this._currentFillRenderer.beginIndex = this._strokeRenderers.length - 1;
                    }
                }

                public beginGradientFill(type:string, colors:Array<number>, alphas:Array<number>, ratios:Array<number>,
                                         matrix:geom.Matrix = null, spreadMethod:string = SpreadMethod.PAD,
                                         interpolationMethod:string = InterpolationMethod.RGB, focalPointRatio:number = 0):void {
                    // Gradient fill is not supported in PIXI
                    throw new NotImplementedError();
                }

                /*
                 public beginShaderFill(shader:Shader, matrix:geom.Matrix = null):void {
                 throw new NotImplementedError();
                 }
                 */

                public clear():void {
                    var i:number;
                    if (this._strokeRenderers != null) {
                        for (i = 0; i < this._strokeRenderers.length; i++) {
                            this._strokeRenderers[i].dispose();
                        }
                    }
                    if (this._fillRenderers != null) {
                        for (i = 0; i < this._fillRenderers.length; i++) {
                            this._fillRenderers[i].dispose();
                        }
                    }
                    if (this._currentFillRenderer != null) {
                        this._currentFillRenderer.dispose();
                    }
                    while (this._strokeRenderers.length > 0) {
                        this._strokeRenderers.pop();
                    }
                    while (this._fillRenderers.length > 0) {
                        this._fillRenderers.pop();
                    }
                    // create stroke and fill renderers according to current state
                    // and push them into the stack
                    this._currentFillRenderer = null;
                    this._currentStrokeRenderer = this.createStrokeRendererWithCurrentSettings();
                    this._strokeRenderers.push(this._currentStrokeRenderer);
                    this._isInFill = false;
                }

                public copyFrom(sourceGraphics:Graphics) {
                    throw new NotImplementedError();
                }

                public curveTo(controlX:number, controlY:number, anchorX:number, anchorY:number):void {
                    if (this._isInFill) {
                        this._currentFillRenderer.curveTo(controlX, controlY, anchorX, anchorY);
                    }
                    this._currentStrokeRenderer.curveTo(controlX, controlY, anchorX, anchorY);
                    this.updateCurrentPoint(anchorX, anchorY);
                    this._isDirty = true;
                }

                public drawCircle(x:number, y:number, radius:number):void {
                    if (this._isInFill) {
                        this._currentFillRenderer.drawCircle(x, y, radius);
                    }
                    this._currentStrokeRenderer.drawCircle(x, y, radius);
                    this.updateCurrentPoint(x, y);
                    this.updateLastPathStartPoint(x + radius, y);
                    this._isDirty = true;
                }

                public drawEllipse(x:number, y:number, width:number, height:number):void {
                    if (this._isInFill) {
                        this._currentFillRenderer.drawEllipse(x, y, width, height);
                    }
                    this._currentStrokeRenderer.drawEllipse(x, y, width, height);
                    this.updateCurrentPoint(x, y);
                    this.updateLastPathStartPoint(x + width, y);
                    this._isDirty = true;
                }

                public drawGraphicsData(graphicsData:Array<IGraphicsData>):void {
                    throw new NotImplementedError();
                }

                /**
                 *
                 * @param commands
                 * @param data
                 * @param winding
                 * @param checkCommands Bulletproof
                 */
                public drawPath(commands:Array<number>, data:Array<number>, winding:string = GraphicsPathWinding.EVEN_ODD, checkCommands:boolean = true):void {
                    if (checkCommands && !Graphics.__checkPathCommands(commands, data)) {
                        return;
                    }
                    var commandLength = commands.length;
                    var j = 0;
                    var isInFill = this._isInFill;
                    var sr = this._currentStrokeRenderer;
                    var fr = this._currentFillRenderer;
                    var newX:number, newY:number;
                    for (var i = 0; i < commandLength; i++) {
                        switch (commands[i]) {
                            case GraphicsPathCommand.CUBIC_CURVE_TO:
                                if (isInFill) {
                                    fr.bezierCurveTo(data[j], data[j + 1], data[j + 2], data[j + 3], data[j + 4], data[j + 5]);
                                }
                                sr.bezierCurveTo(data[j], data[j + 1], data[j + 2], data[j + 3], data[j + 4], data[j + 5]);
                                newX = data[j + 4];
                                newY = data[j + 5];
                                j += 6;
                                break;
                            case GraphicsPathCommand.CURVE_TO:
                                if (isInFill) {
                                    fr.curveTo(data[j], data[j + 1], data[j + 2], data[j + 3]);
                                }
                                sr.curveTo(data[j], data[j + 1], data[j + 2], data[j + 3]);
                                newX = data[j + 2];
                                newY = data[j + 3];
                                j += 4;
                                break;
                            case GraphicsPathCommand.LINE_TO:
                                if (isInFill) {
                                    fr.lineTo(data[j], data[j + 1]);
                                }
                                sr.lineTo(data[j], data[j + 1]);
                                newX = data[j];
                                newY = data[j + 1];
                                j += 2;
                                break;
                            case GraphicsPathCommand.MOVE_TO:
                                if (isInFill) {
                                    fr.moveTo(data[j], data[j + 1]);
                                }
                                sr.moveTo(data[j], data[j + 1]);
                                newX = data[j];
                                newY = data[j + 1];
                                j += 2;
                                break;
                            case GraphicsPathCommand.NO_OP:
                                break;
                            case GraphicsPathCommand.WIDE_LINE_TO:
                                if (isInFill) {
                                    fr.lineTo(data[j + 2], data[j + 3]);
                                }
                                sr.lineTo(data[j + 2], data[j + 3]);
                                newX = data[j + 2];
                                newY = data[j + 3];
                                j += 4;
                                break;
                            case GraphicsPathCommand.WIDE_MOVE_TO:
                                if (isInFill) {
                                    fr.moveTo(data[j + 2], data[j + 3]);
                                }
                                sr.moveTo(data[j + 2], data[j + 3]);
                                newX = data[j + 2];
                                newY = data[j + 3];
                                j += 4;
                                break;
                            default:
                                break;
                        }
                    }
                    if (commandLength > 0) {
                        this.updateCurrentPoint(newX, newY);
                    }
                    this._isDirty = true;
                }

                public drawRect(x:number, y:number, width:number, height:number):void {
                    if (this._isInFill) {
                        this._currentFillRenderer.drawRect(x, y, width, height);
                    }
                    this._currentStrokeRenderer.drawRect(x, y, width, height);
                    this.updateCurrentPoint(x, y);
                    this.updateLastPathStartPoint(x, y);
                    this._isDirty = true;
                }

                public drawRoundRect(x:number, y:number, width:number, height:number, ellipseWidth:number, ellipseHeight:number = NaN):void {
                    if (isNaN(ellipseHeight)) {
                        ellipseHeight = ellipseWidth;
                    }
                    throw new NotImplementedError();
                }

                public drawTriangles(vectors:Array<number>, indices:Array<number> = null, uvtData:Array<number> = null, culling:string = TriangleCulling.NONE):void {
                    // jabbany, mostly
                    if (indices === null) {
                        indices = [];
                        for (var i = 0; i < vectors.length; i += 2) {
                            indices.push(i / 2);
                        }
                    } else {
                        indices = indices.slice(0);
                    }
                    if (indices.length % 3 !== 0) {
                        mic.trace("Graphics.drawTriangles malformed indices count. Must be multiple of 3.", "err");
                        return;
                    }
                    /** Do culling of triangles here to lessen work later **/
                    if (culling !== TriangleCulling.NONE) {
                        for (var i = 0; i < indices.length / 3; i++) {
                            var ux = vectors[2 * indices[i * 3 + 1]] - vectors[2 * indices[i * 3]],
                                uy = vectors[2 * indices[i * 3 + 1] + 1] - vectors[2 * indices[i * 3] + 1],
                                vx = vectors[2 * indices[i * 3 + 2]] - vectors[2 * indices[i * 3 + 1]],
                                vy = vectors[2 * indices[i * 3 + 2] + 1] - vectors[2 * indices[i * 3 + 1] + 1];
                            var zcomp = ux * vy - vx * uy;
                            if (zcomp < 0 && culling === TriangleCulling.POSITIVE ||
                                zcomp > 0 && culling === TriangleCulling.NEGATIVE) {
                                /** Remove the indices. Leave the vertices. **/
                                indices.splice(i * 3, 3);
                                i--;
                            }
                        }
                    }
                    var commands = [], data = [];
                    for (var i = 0; i < indices.length / 3; i++) {
                        var a = indices[3 * i],
                            b = indices[3 * i + 1],
                            c = indices[3 * i + 2];
                        var ax = vectors[2 * a], ay = vectors[2 * a + 1];
                        var bx = vectors[2 * b], by = vectors[2 * b + 1];
                        var cx = vectors[2 * c], cy = vectors[2 * c + 1];
                        commands.push(1, 2, 2, 2);
                        data.push(ax, ay, bx, by, cx, cy, ax, ay);
                    }
                    // TODO: Can be optimized by using native WebGL
                    this.drawPath(commands, data, void(0), false);
                }

                public endFill():void {
                    if (this._isInFill) {
                        this._isInFill = false;
                        this._currentFillRenderer.endIndex = this._strokeRenderers.length - 1;
                        this._currentFillRenderer.closePath();
                        this._currentStrokeRenderer.closePath();
                        this._fillRenderers.push(this._currentFillRenderer);
                        this._currentFillRenderer = null;
                    }
                }

                public lineBitmapStyle(bitmap:BitmapData, matrix:geom.Matrix = null, repeat:boolean = true, smooth:boolean = false):void {
                    throw new NotImplementedError();
                }

                public lineGradientStyle(type:string, colors:Array<number>, alphas:Array<number>, ratios:Array<number>,
                                         matrix:geom.Matrix = null, spreadMethod:string = SpreadMethod.PAD,
                                         interpolationMethod:string = InterpolationMethod.RGB, focalPointRatio:number = 0):void {
                    // Gradient is not supported in PIXI
                    throw new NotImplementedError();
                }

                /*
                 public lineShaderStyle(shader:Shader, matrix:geom.Matrix = null):void {
                 throw new NotImplementedError();
                 }
                 */

                public lineStyle(thickness:number = NaN, color:number = 0, alpha:number = 1.0, pixelHinting:boolean = false,
                                 scaleMode:string = LineScaleMode.NORMAL, caps:string = null, joints:string = null, miterLimit:number = 3):void {
                    if (this._lineType != BrushType.SOLID || this._lineWidth != thickness || this._lineColor != color || this._lineAlpha != alpha) {
                        this._lineType = BrushType.SOLID;
                        if (!isNaN(thickness)) {
                            this._lineWidth = thickness;
                        }
                        this._lineColor = color;
                        this._lineAlpha = alpha;
                        this._currentStrokeRenderer = new SolidStrokeRenderer(this, this._lastPathStartX, this._lastPathStartY, this._currentX, this._currentY, thickness, color, alpha);
                        this._strokeRenderers.push(this._currentStrokeRenderer);
                    }
                }

                public lineTo(x:number, y:number):void {
                    if (this._isInFill) {
                        this._currentFillRenderer.lineTo(x, y);
                    }
                    this._currentStrokeRenderer.lineTo(x, y);
                    this.updateCurrentPoint(x, y);
                    this._isDirty = true;
                }

                public moveTo(x:number, y:number):void {
                    if (this._isInFill) {
                        this._currentFillRenderer.moveTo(x, y);
                    }
                    this._currentStrokeRenderer.moveTo(x, y);
                    this.updateCurrentPoint(x, y);
                    this.updateLastPathStartPoint(x, y);
                    this._isDirty = true;
                }

                // Bulletproof
                public update():void {
                    if (this._isDirty) {
                        var i:number;
                        for (i = 0; i < this._strokeRenderers.length; i++) {
                            this._strokeRenderers[i].update();
                        }
                        for (i = 0; i < this._fillRenderers.length; i++) {
                            this._fillRenderers[i].update();
                        }
                    }
                    this._isDirty = false;
                }

                // Bulletproof
                public render(renderer:webgl.WebGLRenderer, primitiveTarget:webgl.WebGLPrimitiveRenderTarget):void {
                    var i:number;
                    var j = 0, fillLen = this._fillRenderers.length;
                    for (i = 0; i < this._strokeRenderers.length; i++) {
                        if (j < fillLen && i == this._fillRenderers[j].beginIndex) {
                            this._fillRenderers[j].render(renderer, primitiveTarget);
                            j++;
                        }
                        this._strokeRenderers[i].render(renderer, primitiveTarget);
                    }
                }

                // Bulletproof
                public get renderer():webgl.WebGLRenderer {
                    return this._renderer;
                }

                public get isInFill():boolean {
                    return this._isInFill;
                }

                private createStrokeRendererWithCurrentSettings():StrokeRendererBase {
                    switch (this._lineType) {
                        case BrushType.SOLID:
                            return new SolidStrokeRenderer(this, this._lastPathStartX, this._lastPathStartY, this._currentX, this._currentY, this._lineWidth, this._lineColor, this._lineAlpha);
                            break;
                        default:
                            throw new NotImplementedError();
                    }
                }

                private static __checkPathCommands(commands:Array<number>, data:Array<number>):boolean {
                    if (commands == null || data == null || data.length % 2 != 0) {
                        return false;
                    }
                    var commandLength = commands.length;
                    var dataLength = data.length;
                    for (var i = 0; i < commandLength; i++) {
                        switch (commands[i]) {
                            case GraphicsPathCommand.CUBIC_CURVE_TO:
                                dataLength -= 2 * 3;
                                if (dataLength < 0) {
                                    return false;
                                }
                                break;
                            case GraphicsPathCommand.CURVE_TO:
                                dataLength -= 2 * 2;
                                if (dataLength < 0) {
                                    return false;
                                }
                                break;
                            case GraphicsPathCommand.LINE_TO:
                                dataLength -= 2 * 1;
                                if (dataLength < 0) {
                                    return false;
                                }
                                break;
                            case GraphicsPathCommand.MOVE_TO:
                                dataLength -= 2 * 1;
                                if (dataLength < 0) {
                                    return false;
                                }
                                break;
                            case GraphicsPathCommand.NO_OP:
                                break;
                            case GraphicsPathCommand.WIDE_LINE_TO:
                                dataLength -= 2 * 2;
                                if (dataLength < 0) {
                                    return false;
                                }
                                break;
                            case GraphicsPathCommand.WIDE_MOVE_TO:
                                dataLength -= 2 * 2;
                                if (dataLength < 0) {
                                    return false;
                                }
                                break;
                            default:
                                return false;
                        }
                    }
                    return true;
                }

                private updateCurrentPoint(x:number, y:number):void {
                    this._currentX = x;
                    this._currentY = y;
                }

                private updateLastPathStartPoint(x:number, y:number):void {
                    this._lastPathStartX = x;
                    this._lastPathStartY = y;
                }

                private resetStyles():void {
                    this._lineType = BrushType.SOLID;
                    this._lineWidth = 1;
                    this._lineColor = 0x000000;
                    this._lineAlpha = 1;
                }

                private _displayObject:DisplayObject;
                private _isInFill:boolean;
                private _renderer:webgl.WebGLRenderer;
                private _isDirty:boolean;

                private _lineType:BrushType;
                private _lineWidth:number;
                private _lineAlpha:number;
                private _lineColor:number;
                private _currentX:number;
                private _currentY:number;
                private _lastPathStartX:number;
                private _lastPathStartY:number;

                private _currentStrokeRenderer:IGraphicsDataRenderer;
                private _currentFillRenderer:IFillGraphicsDataRenderer;
                private _strokeRenderers:Array<IGraphicsDataRenderer>;
                private _fillRenderers:Array<IFillGraphicsDataRenderer>;

            }

            export interface IGraphicsData {
                // http://help.adobe.com/zh_CN/FlashPlatform/reference/actionscript/3/flash/display/IGraphicsData.html
                // 空的，仅作为类型约束
            }

            export interface IGraphicsPath {
                // http://help.adobe.com/zh_CN/FlashPlatform/reference/actionscript/3/flash/display/IGraphicsPath.html
                // 空的，仅作为类型约束
            }

            export class GradientType {

                public static get LINEAR():string {
                    return 'linear';
                }

                public static get RADIAL():string {
                    return 'radial';
                }

            }

            export class InterpolationMethod {

                public static get LINEAR_RGB():string {
                    return 'linearRGB';
                }

                public static get RGB():string {
                    return 'rgb';
                }

            }

            export class SpreadMethod {

                public static get PAD():string {
                    return 'pad';
                }

                public static get REFLECT():string {
                    return 'reflect';
                }

                public static get REPEAT():string {
                    return 'repeat';
                }

            }

            export class GraphicsPathWinding {

                public static get EVEN_ODD():string {
                    return 'evenOdd';
                }

                public static get NON_ZERO():string {
                    return 'nonZero';
                }

            }

            export class GraphicsPathCommand {

                public static get CUBIC_CURVE_TO():number {
                    return 6;
                }

                public static get CURVE_TO():number {
                    return 3;
                }

                public static get LINE_TO():number {
                    return 2;
                }

                public static get MOVE_TO():number {
                    return 1;
                }

                public static get NO_OP():number {
                    return 0;
                }

                public static get WIDE_LINE_TO():number {
                    return 5;
                }

                public static get WIDE_MOVE_TO():number {
                    return 4;
                }

            }

            export class TriangleCulling {

                public static get NEGATIVE():string {
                    return 'negative';
                }

                public static get NONE():string {
                    return 'none';
                }

                public static get POSITIVE():string {
                    return 'positive';
                }

            }

            export class LineScaleMode {

                public static get HORIZONTAL():string {
                    return 'horizontal';
                }

                public static get NONE():string {
                    return 'none';
                }

                public static get NORMAL():string {
                    return 'normal';
                }

                public static get VERTICAL():string {
                    return 'vertical';
                }

            }

            export class CapsStyle {

                public static get NONE():string {
                    return 'none';
                }

                public static get ROUND():string {
                    return 'round';
                }

                public static get SQUARE():string {
                    return 'square';
                }

            }

            export class JointStyle {

                public static get BEVEL():string {
                    return 'bevel';
                }

                public static get MITER():string {
                    return 'miter';
                }

                public static get ROUND():string {
                    return 'round';
                }

            }

        }

    }

}
