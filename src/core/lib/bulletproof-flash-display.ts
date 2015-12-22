/**
 * Created by MIC on 2015/10/8.
 */

import bulletproof_org = require("./bulletproof-org");
import bulletproof_mic = require("./bulletproof-mic");
import bulletproof_webgl = require("./bulletproof-webgl");
import bulletproof_flash_base = require("./bulletproof-flash-base");

export module bulletproof {

    export module flash {

        import events = bulletproof_flash_base.bulletproof.flash.events;
        import geom = bulletproof_flash_base.bulletproof.flash.geom;
        import webgl = bulletproof_webgl.bulletproof.webgl;
        import mic = bulletproof_mic.bulletproof.mic;
        import ICloneable = bulletproof_org.bulletproof.ICloneable;
        import NotImplementedError = bulletproof_org.bulletproof.NotImplementedError;

        export module filters {

            export interface BitmapFilter {
                filterType:string;
            }

            var BitmapFilter = {
                FILTER_GLOW: 'glow',
                FILTER_BLUR: 'blur'
            };

            export class BitmapFilterQuality {

                public static get HIGH():number {
                    return 3;
                }

                public static get LOW():number {
                    return 1;
                }

                public static get MEDIUM():number {
                    return 2;
                }

            }

            export class GlowFilter extends webgl.GlowFilter implements BitmapFilter {

                public constructor(filterManager:webgl.FilterManager, color:number = 0xff0000, alpha:number = 1.0, blurX:number = 6.0, blurY:number = 6.0,
                                   strength:number = 2, quality:number = BitmapFilterQuality.LOW, inner:boolean = false, knockout:boolean = false) {
                    super(filterManager);
                    this.color = color;
                    this.alpha = mic.util.limit(alpha, 0, 1);
                    this.blurX = blurX;
                    this.blurY = blurY;
                    this.strength = strength;
                    this.quality = quality;
                    this.inner = inner;
                    this.knockout = knockout;
                }

                public get alpha():number {
                    return this._alpha;
                }

                public set alpha(v:number) {
                    var b = v != this.alpha;
                    this._alpha = v;
                    if (b) {
                        this.updateColorMatrix();
                    }
                }

                public get blurX():number {
                    return this.strengthX;
                }

                public set blurX(v:number) {
                    this.strengthX = v;
                }

                public get blurY():number {
                    return this.strengthY;
                }

                public set blurY(v:number) {
                    this.strengthY = v;
                }

                public get color():number {
                    return this._color;
                }

                public set color(v:number) {
                    v |= 0;
                    var b = v != this._color;
                    this._color = v;
                    if (b) {
                        this.updateColorMatrix();
                    }
                }

                public inner:boolean;
                public knockout:boolean;

                public get quality():number {
                    return this.pass;
                }

                public set quality(v:number) {
                    this.pass = v;
                }

                public strength:number;

                public clone():GlowFilter {
                    return new GlowFilter(this._filterManager, this.color, this.alpha, this.blurX, this.blurY,
                        this.strength, this.quality, this.inner, this.knockout);
                }

                public get filterType():string {
                    return BitmapFilter.FILTER_GLOW;
                }

                private updateColorMatrix():void {
                    var r = ((this._color >>> 16) & 0xff) / 0xff;
                    var g = ((this._color >>> 8) & 0xff) / 0xff;
                    var b = (this.color & 0xff) / 0xff;
                    var a = this._alpha;
                    var cm = [
                        0, 0, 0, r, 0,
                        0, 0, 0, g, 0,
                        0, 0, 0, b, 0,
                        0, 0, 0, a, 0
                    ];
                    this.setColorTransform(cm);
                }

                private _color:number;
                private _alpha:number;


                // Bulletproof, PIXI
                // See PIXI.filters.BlurFilter
                /*
                 public applyFilter(renderer:PIXI.WebGLRenderer, input:PIXI.RenderTarget, output:PIXI.RenderTarget, clear?:boolean):void {
                 var renderTarget = renderer.filterManager.getRenderTarget(true);
                 this._f1.applyFilter(renderer, input, renderTarget);
                 this._f2.applyFilter(renderer, renderTarget, output);
                 this._f3.applyFilter(renderer, input, output);
                 // type casting: trick
                 (<any>renderer.filterManager).returnRenderTarget(renderTarget);
                 }

                 private _updateColorMatrix(r:number, g:number, b:number, a:number):void {
                 this._f1.matrix = [
                 0, 0, 0, r, 0,
                 0, 0, 0, g, 0,
                 0, 0, 0, b, 0,
                 0, 0, 0, a, 0
                 ];
                 }
                 */

            }

            export class BlurFilter extends webgl.BlurFilter implements BitmapFilter {

                public constructor(filterManager:webgl.FilterManager, blurX:number = 4.0, blurY:number = 4.0, quality:number = BitmapFilterQuality.LOW) {
                    super(filterManager);
                    this.blurX = blurX;
                    this.blurY = blurY;
                    this.quality = quality;
                }

                public get blurX():number {
                    return this.strengthX;
                }

                public set blurX(v:number) {
                    this.strengthX = v;
                }

                public get blurY():number {
                    return this.strengthY;
                }

                public set blurY(v:number) {
                    this.strengthY = v;
                }

                public get quality():number {
                    return this.pass;
                }

                public set quality(v:number) {
                    this.pass = v;
                }

                public clone():BlurFilter {
                    return new BlurFilter(this._filterManager, this.blurX, this.blurY, this.quality);
                }

                public get filterType():string {
                    return BitmapFilter.FILTER_BLUR;
                }

            }

        }

        export module display {

            export interface IBitmapDrawable {
            }

            export class DisplayObject extends events.EventDispatcher implements IBitmapDrawable, webgl.IWebGLElement {

                public constructor(root:Stage, parent:DisplayObjectContainer) {
                    super();
                    this._root = root;
                    this._parent = parent;
                    var w = 0, h = 0;
                    // TODO: Flash does not add the child during creation, it must be done by programmers.
                    if (parent != null) {
                        w = parent.width;
                        h = parent.height;
                        this._childIndex = parent.numChildren;
                        parent.addChild(this);
                    }
                    this.visible = true;
                    this.enabled = true;
                    this.alpha = 1;
                    this.x = this.y = this.z = 0;
                    this._filters = [];
                    this._transform = new geom.Transform();
                }

                public get alpha():number {
                    return this._alpha;
                }

                public set alpha(v:number) {
                    this._alpha = mic.util.limit(v, 0, 1);
                }

                public blendMode:string;

                public get cacheAsBitmap():boolean {
                    throw new NotImplementedError();
                }

                public set cacheAsBitmap(v:boolean) {
                    throw new NotImplementedError();
                }

                // Bulletproof
                public get childIndex():number {
                    return this._childIndex;
                }

                // Bulletproof
                // DO NOT call manually
                public set childIndex(v:number) {
                    this._childIndex = v;
                }

                // Bulletproof
                public enabled:boolean;

                // Bulletproof (mod)
                public get filters():Array<webgl.AbstractFilter> {
                    //return <Array<filters.BitmapFilter>>this._pixiObject.filters;
                    return this._filters.slice();
                }

                // Bulletproof (mod)
                public set filters(v:Array<webgl.AbstractFilter>) {
                    //this._pixiObject.filters = v;
                    var i:number;
                    if (this._filters != null && this._filters.length > 0) {
                        for (i = 0; i < this._filters.length; i++) {
                            this._filters[i].notifyRemoved();
                        }
                    }
                    this._filters = v;
                    if (this._filters != null && this._filters.length > 0) {
                        for (i = 0; i < this._filters.length; i++) {
                            this._filters[i].notifyAdded();
                        }
                    }
                }

                public get height():number {
                    return this._height;
                }

                public set height(v:number) {
                    this._height = v;
                }

                public mask:DisplayObject;

                public get mouseX():number {
                    throw new NotImplementedError();
                }

                public get mouseY():number {
                    throw new NotImplementedError();
                }

                public get name():string {
                    return this._name;
                }

                public set name(v:string) {
                    this._name = v;
                }

                public get parent():DisplayObjectContainer {
                    return this._parent;
                }

                public get root():DisplayObject {
                    return this._root;
                }

                public get rotation():number {
                    return this._rotation;
                }

                public set rotation(v:number) {
                    while (v < -180) {
                        v += 360;
                    }
                    while (v > 180) {
                        v -= 360;
                    }
                    this._rotation = v;
                }

                public get rotationX():number {
                    return this._rotationX;
                }

                public set rotationX(v:number) {
                    while (v < -180) {
                        v += 360;
                    }
                    while (v > 180) {
                        v -= 360;
                    }
                    this._rotationX = v;
                }

                public get rotationY():number {
                    return this._rotationY;
                }

                public set rotationY(v:number) {
                    while (v < -180) {
                        v += 360;
                    }
                    while (v > 180) {
                        v -= 360;
                    }
                    this._rotationY = v;
                }

                public get rotationZ():number {
                    return this._rotationZ;
                }

                public set rotationZ(v:number) {
                    while (v < -180) {
                        v += 360;
                    }
                    while (v > 180) {
                        v -= 360;
                    }
                    this._rotationZ = v;
                }

                private get scaleX():number {
                    throw new NotImplementedError();
                }

                private set scaleX(v:number) {
                    throw new NotImplementedError();
                }

                private get scaleY():number {
                    throw new NotImplementedError();
                }

                private set scaleY(v:number) {
                    throw new NotImplementedError();
                }

                private get scaleZ():number {
                    throw new NotImplementedError();
                }

                private set scaleZ(v:number) {
                    throw new NotImplementedError();
                }

                public get stage():Stage {
                    return this._stage;
                }

                public get transform():geom.Transform {
                    return this._transform;
                }

                public visible:boolean;

                public get width():number {
                    return this._width;
                }

                public set width(v:number) {
                    this._width = v;
                }

                public get x():number {
                    return this._x;
                }

                public set x(v:number) {
                    this._x = v;
                }

                public get y():number {
                    return this._y;
                }

                public set y(v:number) {
                    this._y = v;
                }

                public get z():number {
                    return this._z;
                }

                public set z(v:number) {
                    this._z = v;
                }

                public getBounds(targetCoordinateSpace:DisplayObject):geom.Rectangle {
                    throw new NotImplementedError();
                }

                public getRect(targetCoordinateSpace:DisplayObject):geom.Rectangle {
                    throw new NotImplementedError();
                }

                protected updateInternal():void {
                }

                // Bulletproof
                public update():void {
                    if (this.enabled) {
                        this.updateInternal();
                    }
                }

                // Bulletproof
                protected renderInternal(renderer:webgl.WebGLRenderer, primitiveTarget:webgl.WebGLPrimitiveRenderTarget):void {
                    // 1. Override this method;
                    // 2. Use code modal as below
                    // primitiveTarget.renderPrimitives(vertices, colors, indices, clear);
                }

                protected renderInternalWrapper(renderer:webgl.WebGLRenderer, primitiveTarget:webgl.WebGLPrimitiveRenderTarget):void {
                    var shader = renderer.shaderManager.primitiveShader;
                    shader.use();
                    shader.setAlpha(this.alpha);
                    this.transform.matrix3D.setTransformTo(this.x, this.y, this.z);
                    shader.setTransform(this.transform.matrix3D);
                    this.renderInternal(renderer, primitiveTarget);
                }

                // Bulletproof
                public render(renderer:webgl.WebGLRenderer, outputTarget:webgl.WebGLReplicateRenderTarget):void {
                    if (this.visible && this.alpha > 0) {
                        var shouldProcessFilters = this.filters != null && this.filters.length > 0;
                        if (shouldProcessFilters) {
                            renderer.filterManager.pushFilterPack(this.filters);
                        }
                        var primitiveTarget = renderer.createPrimitiveRenderTarget();
                        this.renderInternalWrapper(renderer, primitiveTarget);
                        //if (renderer.filterManager.hasFilters) {
                        //    renderer.filterManager.processFilters(renderer, primitiveTarget, outputTarget);
                        //} else {
                        //    outputTarget.renderRenderTarget(primitiveTarget, false);
                        //}
                        outputTarget.renderRenderTarget(primitiveTarget, false);
                        renderer.releasePrimitiveRenderTarget(primitiveTarget);
                        if (shouldProcessFilters) {
                            renderer.filterManager.popFilterPack();
                        }
                    }
                }

                protected _parent:DisplayObjectContainer;
                protected _root:Stage;
                protected _name:string;
                protected _rotation:number;
                protected _rotationX:number;
                protected _rotationY:number;
                protected _rotationZ:number;
                protected _scaleX:number;
                protected _scaleY:number;
                protected _scaleZ:number;
                protected _stage:Stage;
                protected _height:number;
                protected _width:number;
                protected _x:number = 0;
                protected _y:number = 0;
                protected _z:number = 0;
                protected _childIndex:number;
                protected _alpha:number;
                protected _filters:Array<webgl.AbstractFilter>;
                protected _transform:geom.Transform;

            }

            export class InteractiveObject extends DisplayObject {

                public doubleClickEnabled:boolean;
                public focusRect:boolean;
                public mouseEnabled:boolean;
                public needsSoftKeyboard:boolean;
                public tabEnabled:boolean;
                public tabIndex:number;

                public constructor(root:Stage, parent:DisplayObjectContainer) {
                    super(root, parent);
                }

            }

            export class DisplayObjectContainer extends InteractiveObject {

                public constructor(root:Stage, parent:DisplayObjectContainer) {
                    super(root, parent);
                    this._children = [];
                }

                public dispatchEvent(event:Event, data?:any):boolean {
                    var r = super.dispatchEvent(event, data);
                    var len = this.numChildren;
                    for (var i = 0; i < len; i++) {
                        this._children[i].dispatchEvent(event, data);
                    }
                    return r;
                }

                // Bulletproof
                public update():void {
                    if (this.enabled) {
                        super.update();
                        var len = this.numChildren;
                        for (var i = 0; i < len; i++) {
                            this._children[i].update();
                        }
                    }
                }

                // Bulletproof
                public render(renderer:webgl.WebGLRenderer, outputTarget:webgl.WebGLReplicateRenderTarget):void {
                    if (this.visible && this.alpha > 0) {
                        //var shouldProcessFilters = this.filters != null && this.filters.length > 0;
                        //if (shouldProcessFilters) {
                        //    renderer.filterManager.pushFilterPack(this.filters);
                        //}
                        //var tempCopyTarget = renderer.createReplicateRenderTarget();
                        //var primitiveTarget = renderer.createPrimitiveRenderTarget();
                        //this.renderInternalWrapper(renderer, primitiveTarget);
                        //tempCopyTarget.renderRenderTarget(primitiveTarget, true);
                        //for (var i = 0; i < this.numChildren; i++) {
                        //    this._children[i].render(renderer, tempCopyTarget);
                        //}
                        //if (renderer.filterManager.hasFilters) {
                        //    renderer.filterManager.processFilters(renderer, tempCopyTarget, outputTarget);
                        //} else {
                        //    outputTarget.renderRenderTarget(tempCopyTarget, false);
                        //}
                        //renderer.releaseReplicateRenderTarget(tempCopyTarget);
                        //renderer.releasePrimitiveRenderTarget(primitiveTarget);
                        //if (shouldProcessFilters) {
                        //    renderer.filterManager.popFilterPack();
                        //}
                        for (var i = 0; i < this.numChildren; i++) {
                            this._children[i].render(renderer, outputTarget);
                        }
                    }
                }

                public mouseChildren:boolean;

                public get numChildren():number {
                    return this._children.length;
                }

                public tabChildren:boolean;

                public addChild(child:DisplayObject):DisplayObject {
                    if (this._children.indexOf(child) < 0) {
                        this._children.push(child);
                    }
                    return child;
                }

                public addChildAt(child:DisplayObject, index:number):DisplayObject {
                    if (this._children.indexOf(child) < 0) {
                        this._children = this._children.slice(0, index - 1).concat(child).concat(this._children.slice(index, this._children.length - 1));
                    }
                    return child;
                }

                public areInaccessibleObjectsUnderPoint(point:geom.Point):boolean {
                    throw new NotImplementedError();
                }

                public contains(child:DisplayObject):boolean {
                    throw new NotImplementedError();
                }

                public getChildAt(index:number):DisplayObject {
                    throw new NotImplementedError();
                }

                public getChildByName(name:string):DisplayObject {
                    throw new NotImplementedError();
                }

                public getChildIndex(child:DisplayObject):number {
                    throw new NotImplementedError();
                }

                public getObjectsUnderPoint(point:geom.Point):Array<DisplayObject> {
                    throw new NotImplementedError();
                }

                public removeChild(child:DisplayObject):DisplayObject {
                    if (this._children.indexOf(child) >= 0) {
                        var childIndex = child.childIndex;
                        return this.removeChildAt(childIndex);
                    } else {
                        return null;
                    }
                }

                public removeChildAt(index:number):DisplayObject {
                    if (index < 0 || index >= this.numChildren) {
                        return null;
                    }
                    var child = this._children[index];
                    for (var i = index + 1; i < this._children.length; i++) {
                        this._children[i].childIndex++;
                    }
                    this._children.splice(index, 1);
                    return child;
                }

                public setChildIndex(child:DisplayObject, index:number):void {
                    throw new NotImplementedError();
                }

                public swapChildren(child1:DisplayObject, child2:DisplayObject):void {
                    throw new NotImplementedError();
                }

                public swapChildrenAt(index1:number, index2:number):void {
                    throw new NotImplementedError();
                }

                public get width():number {
                    // TODO: Finish this
                    return this._root.worldRenderer.context.canvas.width;
                }

                public set width(v:number) {
                    // TODO: Finish this
                    throw new NotImplementedError();
                }

                public get height():number {
                    // TODO: Finish this
                    return this._root.worldRenderer.context.canvas.height;
                }

                public set height(v:number) {
                    // TODO: Finish this
                    throw new NotImplementedError();
                }

                protected _children:Array<DisplayObject>;

            }

            export class Stage extends DisplayObjectContainer {

                public constructor(renderer:webgl.WebGLRenderer) {
                    super(null, null);
                    this._root = this;
                    this._worldRenderer = renderer;
                    this.resize(renderer.view.width, renderer.view.height);
                }

                // Bulletproof
                public raiseEnterFrame() {
                    var event = mic.util.createTestEvent(events.FlashEvent.ENTER_FRAME);
                    this.dispatchEvent(event);
                }

                // Bulletproof
                public redraw() {
                    //this.render(this._worldRenderer, this._worldRenderer.screen);
                    this._worldRenderer.renderTo(this.render.bind(this));
                }

                public align:string;

                public get allowFullScreen():boolean {
                    return this._allowFullScreen;
                }

                public get allowFullScreenInteractive():boolean {
                    return this._allowFullScreenInteractive;
                }

                public color:number;
                public colorCorrection:string;

                public get colorCorrectionSupport():string {
                    return this._colorCorrectionSupport;
                }

                public displayState:string;
                public focus:InteractiveObject;
                public frameRate:number;

                public get fullScreenHeight():number {
                    return screen.height;
                }

                public fullScreenSourceRect:geom.Rectangle;

                public get fullScreenWidth():number {
                    return screen.width;
                }

                public mouseChildren:boolean;

                public quality:string;
                public scaleMode:string;
                public showDefaultContextMenu:boolean;

                public get softKeyboardRect():geom.Rectangle {
                    throw new NotImplementedError();
                }

                public get stageHeight():number {
                    throw new NotImplementedError();
                }

                public set stageHeight(v:number) {
                    throw new NotImplementedError();
                }

                public get stageWidth():number {
                    throw new NotImplementedError();
                }

                public set stageWidth(v:number) {
                    throw new NotImplementedError();
                }

                public tabChildren:boolean;

                public get x():number {
                    return 0;
                }

                public set x(v:number) {
                    console.warn('Stage.x cannot be set manually.');
                }

                public get y():number {
                    return 0;
                }

                public set y(v:number) {
                    console.warn('Stage.y cannot be set manually.');
                }

                public invalidate():void {
                    throw new NotImplementedError();
                }

                public isFocusInaccessible():boolean {
                    throw new NotImplementedError();
                }

                // Bulletproof
                public get worldRenderer():webgl.WebGLRenderer {
                    return this._worldRenderer;
                }

                // Bulletproof
                public resize(width:number, height:number):void {
                    this._width = width;
                    this._height = height;
                    // TODO: Fully implement this
                }

                // Bulletproof
                public render(renderer:webgl.WebGLRenderer, outputTarget:webgl.WebGLReplicateRenderTarget):void {
                    outputTarget.clear();
                    super.render(renderer, outputTarget);
                }

                private _allowFullScreen:boolean;
                private _allowFullScreenInteractive:boolean;
                private _colorCorrectionSupport:string;
                private _stageHeight:number;
                private _stageWidth:number;
                private _worldRenderer:webgl.WebGLRenderer;

            }

            export class StageAlign {

                public static get BOTTOM():string {
                    return 'B';
                }

                public static get BOTTOM_LEFT():string {
                    return 'BL';
                }

                public static get BOTTOM_RIGHT():string {
                    return 'BR';
                }

                public static get LEFT():string {
                    return 'L';
                }

                public static get RIGHT():string {
                    return 'R';
                }

                public static get TOP():string {
                    return 'T';
                }

                public static get TOP_LEFT():string {
                    return 'TL';
                }

                public static get TOP_RIGHT():string {
                    return 'TR';
                }

            }

            export class ColorCorrection {

                public static get DEFAULT():string {
                    return 'default';
                }

                public static get OFF():string {
                    return 'off';
                }

                public static get ON():string {
                    return 'on';
                }

            }

            export class ColorCorrectionSupport {

                public static get DEFAULT_OFF():string {
                    return 'defaultOff';
                }

                public static get DEFAULT_ON():string {
                    return 'defaultOn';
                }

                public static get UNSUPPORTED():string {
                    return 'unsupported';
                }

            }

            export class StageDisplayState {

                public static get FULL_SCREEN():string {
                    return 'fullScreen';
                }

                public static get FULL_SCREEN_INTERACTIVE():string {
                    return 'fullScreenInteractive';
                }

                public static get NORMAL():string {
                    return 'normal';
                }

            }

            export class StageQuality {

                public static get BEST():string {
                    return 'best';
                }

                public static get HIGH():string {
                    return 'high';
                }

                public static get LOW():string {
                    return 'low';
                }

                public static get MEDIUM():string {
                    return 'medium';
                }

            }

            export class StageScaleMode {

                public static get EXACT_FIT():string {
                    return 'exactFit';
                }

                public static get NO_BORDER():string {
                    return 'noBorder';
                }

                public static get NO_SCALE():string {
                    return 'noScale';
                }

                public static get SHOW_ALL():string {
                    return 'showAll';
                }

            }

            export class BlendMode {

                public static get ADD():string {
                    return 'add';
                }

                public static get ALPHA():string {
                    return 'alpha';
                }

                public static get DARKEN():string {
                    return 'darken';
                }

                public static get DIFFERENCE():string {
                    return 'difference';
                }

                public static get ERASE():string {
                    return 'erase';
                }

                public static get HARDLIGHT():string {
                    return 'hardlight';
                }

                public static get INVERT():string {
                    return 'invert';
                }

                public static get LAYER():string {
                    return 'layer';
                }

                public static get LIGHTEN():string {
                    return 'lighten';
                }

                public static get MULTIPLY():string {
                    return 'multiply';
                }

                public static get NORMAL():string {
                    return 'normal';
                }

                public static get OVERLAY():string {
                    return 'overlay';
                }

                public static get SCREEN():string {
                    return 'screen';
                }

                public static get SHADER():string {
                    return 'shader';
                }

                public static get SUBTRACT():string {
                    return 'subtract';
                }

            }

            export class BitmapData implements IBitmapDrawable {
            }

            export class Bitmap extends DisplayObject {
            }

        }

    }

}
