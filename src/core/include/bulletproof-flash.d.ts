/**
 * Created by MIC on 2015/9/10.
 */

/// <reference path="bulletproof-org.d.ts"/>
/// <reference path="bulletproof-data-interface.d.ts"/>

import bulletproof_org = require("bulletproof-org.d");
import bulletproof_data_interface = require("bulletproof-data-interface.d");

export declare module bulletproof.flash {

    import EventClass = bulletproof_org.bulletproof.EventClass;
    import ICloneable = bulletproof_org.bulletproof.ICloneable;
    import ICopyable = bulletproof_org.bulletproof.ICopyable;

    export module events {

        export class EventDispatcher implements EventTarget {
            constructor();

            removeEventListener(type:string, listener:EventListener, useCapture?:boolean):void;

            addEventListener(type:string, listener:EventListener, useCapture?:boolean):void;

            dispatchEvent(event:Event, data?:any):boolean;

            // --- Flash ---
            hasEventListener(type:string):boolean;

            willTrigger(type:string):boolean;
        }

        export class UncaughtErrorEvents extends EventDispatcher {
            constructor();
        }

        export class FlashEvent extends EventClass {
            constructor(type:string, bubbles?:boolean, cancelable?:boolean);

            static ACTIVATE:string;
            static ADDED:string;
            static ADDED_TO_STAGE:string;
            static BROWSER_ZOOM_CHANGE:string;
            static CANCEL:string;
            static CHANGE:string;
            static CLEAR:string;
            static CLOSE:string;
            static CLOSING:string;
            static COMPLETE:string;
            static CONNECT:string;
            static COPY:string;
            static CUT:string;
            static DEACTIVATE:string;
            static DISPLAYING:string;
            static ENTER_FRAME:string;
            static EXIT_FRAME:string;
            static EXITING:string;
            static FRAME_CONSTRUCTED:string;
            static FULLSCREEN:string;
            static HTML_BOUNDS_CHANGE:string;
            static HTML_DOM_INITIALIZE:string;
            static HTML_RENDER:string;
            static ID3:string;
            static INIT:string;
            static LOCATION_CHANGE:string;
            static MOUSE_LEAVE:string;
            static NETWORK_CHANGE:string;
            static OPEN:string;
            static PASTE:string;
            static REMOVED:string;
            static REMOVED_FROM_STAGE:string;
            static RENDER:string;
            static RESIZE:string;
            static SCROLL:string;
            static SELECT:string;
            static SOUND_COMPLETE:string;
            static STANDARD_ERROR_CLOSE:string;
            static STANDARD_INPUT_CLOSE:string;
            static STANDARD_OUTPUT_CLOSE:string;
            static TAB_CHILDREN_CHANGE:string;
            static TAB_ENABLED_CHANGE:string;
            static TAB_INDEX_CHANGE:string;
            static TEXT_INTERACTION_MODE_CHANGE:string;
            static UNLOAD:string;
            static USER_IDLE:string;
            static USER_PRESENT:string;
        }

        export class TimerEvent extends FlashEvent implements ICloneable<TimerEvent> {
            constructor(type:string, bubbles?:boolean, cancelable?:boolean);

            static TIMER:string;
            static TIMER_COMPLETE:string;

            updateAfterEvent():void;

            clone():TimerEvent;
        }

        export class UncaughtErrorEvent extends FlashEvent implements ICloneable<UncaughtErrorEvent> {
            constructor(type:string, bubbles?:boolean, cancelable?:boolean);

            static UNCAUGHT_ERROR:string;

            clone():UncaughtErrorEvent;
        }

        export class ActivityEvent extends FlashEvent implements ICloneable<ActivityEvent> {
            constructor(type:string, bubbles?:boolean, cancelable?:boolean, activating?:boolean);

            clone():ActivityEvent;

            static ACTIVITY:string;
        }

        export class FullScreenEvent extends FlashEvent implements ICloneable<FullScreenEvent> {
            constructor(type:string, bubbles?:boolean, cancelable?:boolean, fullScreen?:boolean, interactive?:boolean);

            clone():FullScreenEvent;

            static FULL_SCREEN:string;
            static FULL_SCREEN_INTERACTIVE_ACCEPTED:string;
        }

        export class StageVideoEvent extends FlashEvent implements ICloneable<StageVideoEvent> {
            constructor(type:string, bubbles?:boolean, cancelable?:boolean, status?:string, colorSpace?:string);

            colorSpace:string;
            status:string;
            // Is doc wrong here?
            static codecInfo:string;

            clone():StageVideoEvent;
        }

    }

    export module geom {

        export class Point implements ICloneable<Point>,ICopyable<Point> {
            constructor(x?:number, y?:number);

            x:number;
            y:number;
            length:number;

            add(v:Point):Point;

            clone():Point;

            copyFrom(sourcePoint:Point):void;

            static distance(pt1:Point, pt2:Point):number;

            equals(toCompare:Point):boolean;

            static interpolate(pt1:Point, pt2:Point, f:number):Point;

            normalize():number;

            offset(dx:number, dy:number):void;

            static polar(len:number, angle:number):Point;

            setTo(xa:number, ya:number):void;

            subtract(v:Point):Point;

            toString():string;
        }

        export class Rectangle implements ICloneable<Rectangle>, ICopyable<Rectangle> {
            constructor(x?:number, y?:number, width?:number, height?:number);

            bottom:number;
            bottomRight:Point;
            height:number;
            left:number;
            right:number;
            size:Point;
            top:number;
            topLeft:Point;
            width:number;
            x:number;
            y:number;

            clone():Rectangle;

            contains(x:number, y:number):boolean;

            containsPoint(point:Point):boolean;

            containsRect(rect:Rectangle):boolean;

            copyFrom(sourceRect:Rectangle):void;

            equals(toCompare:Rectangle):boolean;

            inflate(dx:number, dy:number):void;

            inflatePoint(point:Point):void;

            intersection(toIntersect:Rectangle):Rectangle;

            intersects(toIntersect:Rectangle):boolean;

            isEmpty():boolean;

            offset(dx:number, dy:number):void;

            offsetPoint(point:Point):void;

            setEmpty():void;

            setTo(xa:number, ya:number, widtha:number, heighta:number):void;

            toString():string;

            union(toUnion:Rectangle):Rectangle;
        }

        export class Vector3D implements ICloneable<Vector3D>,ICopyable<Vector3D> {
            constructor(x?:number, y?:number, z?:number, w?:number);

            w:number;
            x:number;
            y:number;
            z:number;
            length:number;
            lengthSquared:number;

            add(a:Vector3D):Vector3D;

            static angleBetween(a:Vector3D, b:Vector3D):number;

            clone():Vector3D;

            copyFrom(a:Vector3D):void;

            crossProduct(a:Vector3D):Vector3D;

            decrementBy(a:Vector3D):void;

            static distance(pt1:Vector3D, pt2:Vector3D):number;

            dotProduct(a:Vector3D):number;

            equals(toCompare:Vector3D, allFour?:boolean):boolean;

            incrementBy(a:Vector3D):void;

            nearEquals(toCompare:Vector3D, tolerance:number, allFour?:boolean):boolean;

            negate():void;

            normalize():number;

            project():void;

            scaleBy(s:number):void;

            setTo(xa:number, ya:number, za:number):void;

            subtract(a:Vector3D):Vector3D;

            toString():string;

            static X_AXIS:Vector3D;
            static Y_AXIS:Vector3D;
            static Z_AXIS:Vector3D;
        }

        export class Matrix implements ICloneable<Matrix>,ICopyable<Matrix> {
            constructor(a?:number, b?:number, c?:number, d?:number, tx?:number, ty?:number);

            a:number;
            b:number;
            c:number;
            d:number;
            tx:number;
            ty:number;

            clone():Matrix;

            concat(m:Matrix):void;

            copyColumnFrom(column:number, vector3D:Vector3D):void;

            copyColumnTo(column:number, vector3D:Vector3D):void;

            copyFrom(sourceMatrix:Matrix):void;

            copyRowFrom(row:number, vector3D:Vector3D):void;

            copyRowTo(row:number, vector3D:Vector3D):void;

            createBox(scaleX:number, scaleY:number, rotation:number, tx:number, ty:number):void;

            createGradientBox(width:number, height:number, rotation:number, tx:number, ty:number):void;

            deltaTransformPoint(point:Point):Point;

            identity():void;

            invert():boolean;

            rotate(angle:number):void;

            scale(sx:number, sy:number):void;

            skew(skewX:number, skewY:number):void;

            setTo(aa:number, ba:number, ca:number, da:number, txa:number, tya:number):void;

            toString():string;

            transformPoint(point:Point):Point;

            translate(dx:number, dy:number):void;
        }

        export class Matrix3D implements ICloneable<Matrix3D>, ICopyable<Matrix3D> {
            constructor(v?:Array<number>);

            determinant:number;
            position:Vector3D;
            rawData:Array<number>;

            append(lhs:Matrix3D):void;

            appendRotation(degrees:number, axis:Vector3D, pivotPoint?:Vector3D):void;

            appendScale(xScale:number, yScale:number, zScale:number):void;

            appendTranslation(x:number, y:number, z:number):void;

            clone():Matrix3D;

            copyColumnFrom(column:number, vector3D:Vector3D):void;

            copyColumnTo(column:number, vector3D:Vector3D):void;

            copyFrom(sourceMatrix3D:Matrix3D):void;

            copyRawDataFrom(vector:Array<number>, index?:number, transpose?:boolean):void;

            copyRawDataTo(vector:Array<number>, index?:number, transpose?:boolean):void;

            copyRowFrom(row:number, vector3D:Vector3D):void;

            copyRowTo(row:number, vector3D:Vector3D):void;

            copyToMatrix3D(dest:Matrix3D):void;

            decompose(orientationStyle?:string):Array<Vector3D>;

            deltaTransfromVector(v:Vector3D):Vector3D;

            identity():void;

            static interpolate(thisMat:Matrix3D, toMat:Matrix3D, percent:number):Matrix3D;

            interpolateTo(toMat:Matrix3D, percent:number):Matrix3D;

            invert():boolean;

            pointAt(pos:Vector3D, at?:Vector3D, up?:Vector3D):void;

            prepend(rhs:Matrix3D):void;

            prependRotation(degrees:number, axis:Vector3D, pivotPoint?:Vector3D):void;

            prependScale(xScale:number, yScale:number, zScale:number):void;

            prependTranslation(x:number, y:number, z:number):void;

            recompose(components:Array<Vector3D>, orientationStyle?:string):boolean;

            transformVector(v:Vector3D):Vector3D;

            transformVectors(vin:Array<number>, vout:Array<number>):void;

            transpose():void;
        }

        export class ColorTransform {
            constructor(redMultiplier?:number, greenMultiplier?:number, blueMultiplier?:number, alphaMultiplier?:number,
                        redOffset?:number, greenOffset?:number, blueOffset?:number, alphaOffset?:number);

            color:number;
            alphaMultiplier:number;
            alphaOffset:number;
            blueMultiplier:number;
            blueOffset:number;
            greenMultiplier:number;
            greenOffset:number;
            redMultiplier:number;
            redOffset:number;
        }

        export class PerspectiveProjection {
            constructor();

            fieldOfView:number;
            focalLength:number;
            projectionCenter:Point;

            toMatrix3D():Matrix3D;
        }

        export class Transform {
            colorTransform:ColorTransform;
            concatenatedColorTransform:ColorTransform;
            concatenatedMatrix:Matrix;
            matrix:Matrix;
            matrix3D:Matrix3D;
            perspectiveProjection:PerspectiveProjection;
            pixelBounds:Rectangle;

            getRelativeMatrix3D(relativeTo:display.DisplayObject):Matrix3D;
        }

        export interface Orientation3D {
            AXIS_ANGLE:string;
            EULER_ANGLES:string;
            QUATERNION:string;
        }

        export var Orientation3D:Orientation3D;

    }

    export module filters {

        export interface IBitmapFilter extends ICloneable<IBitmapFilter> {

            filterType:string;
            apply(canvas:HTMLCanvasElement):void;

        }

        export class BitmapFilter implements IBitmapFilter {
            filterType:string;

            clone():BitmapFilter;

            apply(canvas:HTMLCanvasElement):void;

            static FILTER_BLUR:string;
            static FILTER_GLOW:string;
        }

        export interface BitmapFilterQuality {
            HIGH:number;
            LOW:number;
            MEDIUM:number;
        }

        export var BitmapFilterQuality:BitmapFilterQuality;

        export class GlowFilter extends BitmapFilter {
            constructor(color?:number, alpha?:number, blurX?:number, blurY?:number,
                        strength?:number, quality?:number, inner?:boolean, knockout?:boolean);

            alpha:number;
            blurX:number;
            blurY:number;
            color:number;
            inner:boolean;
            knockout:boolean;
            quality:number;
            strength:number;

            clone():GlowFilter;

            filterType:string;

            apply(canvas:HTMLCanvasElement):void;
        }

        export class BlurFilter extends BitmapFilter {
            constructor(blurX?:number, blurY?:number, quality?:number);

            blurX:number;
            blurY:number;
            quality:number;

            clone():BlurFilter;

            filterType:string;

            apply(canvas:HTMLCanvasElement):void;
        }

    }

    export module text {

        export class TextFormat {
            constructor(font?:string, size?:number, color?:number, bold?:boolean,
                        italic?:boolean, underline?:boolean, url?:string, target?:string,
                        align?:string, leftMargin?:number, rightMargin?:number,
                        indent?:number, leading?:number);

            align:string;
            blockIndent:number;
            bold:boolean;
            bullet:boolean;
            color:number;
            font:string;
            indent:number;
            italic:boolean;
            kerning:boolean;
            leading:number;
            leftMargin:number;
            letterSpacing:number;
            rightMargin:number;
            size:number;
            tabStops:Array<number>;
            target:string;
            underline:boolean;
            url:string;
        }

        export interface TextFormatAlign {
            CENTER:string;
            END:string;
            JUSTIFY:string;
            LEFT:string;
            RIGHT:string;
            START:string;
        }

        export var TextFormatAlign:TextFormatAlign;

        export class TextSnapshot {
            charCount:number;

            findText(beginIndex:number, textToFind:string, caseSensitive:boolean):number;

            getSelected(beginIndex:number, endIndex:number):boolean;

            getSelectedText(includeLineEndings?:boolean):string;

            getTextRunInfo(beginIndex:number, endIndex:number):Array<Object>;

            hitTestTextNearPos(x:number, y:number, maxDistance?:number):number;

            setSelectColor(hexColor?:number):void;

            setSelected(beginIndex:number, endIndex:number, selected:boolean):void;
        }

    }

    export module display {

        export interface IBitmapDrawable {
        }

        export interface IGraphicsData {
            // http://help.adobe.com/zh_CN/FlashPlatform/reference/actionscript/3/flash/display/IGraphicsData.html
            // 空的，仅作为类型约束
        }

        export interface IGraphicsPath {
            // http://help.adobe.com/zh_CN/FlashPlatform/reference/actionscript/3/flash/display/IGraphicsPath.html
            // 空的，仅作为类型约束
        }

        export class DisplayObject extends events.EventDispatcher implements IBitmapDrawable {
            constructor(root:DisplayObject, parent?:DisplayObjectContainer, createBuffer?:boolean);

            accessibilityProperties:accessibility.AccessibilityProperties;
            alpha:number;
            blendMode:string;
            cacheAsBitmap:boolean;
            filters:Array<filters.BitmapFilter>;
            height:number;
            loaderInfo:LoaderInfo;
            mask:DisplayObject;
            metaData:Object;
            mouseX:number;
            mouseY:number;
            name:string;
            opaqueBackground:Object;
            parent:DisplayObjectContainer;
            root:DisplayObject;
            rotation:number;
            rotationX:number;
            rotationY:number;
            rotationZ:number;
            scale9Grid:geom.Rectangle;
            scaleX:number;
            scaleY:number;
            scaleZ:number;
            scrollRect:geom.Rectangle;
            stage:Stage;
            transform:geom.Transform;
            visible:boolean;
            width:number;
            x:number;
            y:number;
            z:number;

            getBounds(targetCoordinateSpace:DisplayObject):geom.Rectangle;

            getRect(targetCoordinateSpace:DisplayObject):geom.Rectangle;

            globalToLocal(point:geom.Point):geom.Point;

            globalToLocal3D(point:geom.Point):geom.Vector3D;

            hitTestObject(obj:DisplayObject):boolean;

            hitTestPoint(x:number, y:number, shapeFlag?:boolean):boolean;

            local3DToGlobal(point3d:geom.Vector3D):geom.Point;

            localToGlobal(point:geom.Point):geom.Point;

            protected _bp_invalidate():void;

            protected _bp_draw_core():void;

            protected _bp_context():CanvasRenderingContext2D;

            protected _bp_displayBuffer:HTMLCanvasElement;
            protected _x:number;
            protected _y:number;
            protected _parent:DisplayObjectContainer;
        }

        export class InteractiveObject extends DisplayObject {
            constructor(root:DisplayObject, parent?:DisplayObjectContainer, createBuffer?:boolean);

            accessibilityImplementation:accessibility.AccessibilityImplementation;
            contextMenu:NativeMenu;
            doubleClickEnabled:boolean;
            focusRect:boolean;
            mouseEnabled:boolean;
            needsSoftKeyboard:boolean;
            tabEnabled:boolean;
            tabIndex:number;

            requestSoftKeyboard():boolean;
        }

        export class DisplayObjectContainer extends InteractiveObject {
            constructor(root:DisplayObject, parent?:DisplayObjectContainer, createBuffer?:boolean);

            dispatchEvent(event:Event, data?:any):boolean;

            mouseChildren:boolean;
            numChildren:number;
            tabChildren:boolean;
            textSnapshot:text.TextSnapshot;

            addChild(child:DisplayObject):DisplayObject;

            addChildAt(child:DisplayObject, index:number):DisplayObject;

            areInaccessibleObjectsUnderPoint(point:geom.Point):boolean;

            contains(child:DisplayObject):boolean;

            getChildAt(index:number):DisplayObject;

            getChildByName(name:string):DisplayObject;

            getChildIndex(child:DisplayObject):number;

            getObjectsUnderPoint(point:geom.Point):Array<DisplayObject>;

            removeChild(child:DisplayObject):DisplayObject;

            removeChildAt(index:number):DisplayObject;

            setChildIndex(child:DisplayObject, index:number):void;

            swapChildren(child1:DisplayObject, child2:DisplayObject):void;

            swapChildrenAt(index1:number, index2:number):void;
        }

        export class Stage extends DisplayObjectContainer {
            constructor(container:HTMLDivElement);

            raiseEnterFrame():void;

            redraw():void;

            align:string;
            allowFullScreen:boolean;
            allowFullScreenInteractive:boolean;
            color:number;
            colorCorrection:string;
            colorCorrectionSupport:string;
            displayState:string;
            focus:InteractiveObject;
            frameRate:number;
            fullScreenHeight:number;
            fullScreenSourceRect:geom.Rectangle;
            fullScreenWidth:number;
            height:number;
            mouseChildren:boolean;
            nativeWindow:NativeWindow;
            quality:string;
            scaleMode:string;
            showDefaultContextMenu:boolean;

            softKeyboardRect():geom.Rectangle;

            stageHeight:number;
            stageVideos:Array<media.StageVideo>;
            stageWidth:number;
            tabChildren:boolean;
            textSnapshot:text.TextSnapshot;
            width:number;
            x:number;
            y:number;
            z:number;

            invalidate():void;

            isFocusAccessible():boolean;
        }

        export class BitmapData implements IBitmapDrawable {
        }

        export class Bitmap extends DisplayObject {
        }

        export class Shape extends DisplayObject {
            constructor(root:DisplayObject, parent:DisplayObjectContainer);

            graphics:Graphics;
        }

        export class GraphicsTrianglePath implements IGraphicsPath, IGraphicsData {
            constructor(vertices?:Array<number>, indices?:Array<number>, uvtData?:Array<number>, culling?:string);

            culling:string;
            indices:Array<number>;
            uvtData:Array<number>;
            vertices:Array<number>;
        }

        class Graphics implements ICopyable<Graphics> {
            constructor(attachedDisplayObject:DisplayObject);

            beginBitmapFill(bitmap:BitmapData, matrix?:geom.Matrix, repeat?:boolean, smooth?:boolean):void;

            beginFill(color:number, alpha?:number):void;

            beginGradientFill(type:string, colors:Array<number>, alphas:Array<number>, ratios:Array<number>,
                              matrix?:geom.Matrix, spreadMethod?:string, interpolationMethod?:string,
                              focalPointRatio?:number):void;

            beginShaderFill(shader:Shader, matrix?:geom.Matrix):void;

            clear():void;

            copyFrom(sourceGraphics:Graphics):void;

            curveTo(controlX:number, controlY:number, anchorX:number, anchorY:number):void;

            drawCircle(x:number, y:number, radius:number):void;

            drawEllipse(x:number, y:number, width:number, height:number):void;

            drawGraphicsData(graphicsData:Array<IGraphicsData>):void;

            drawPath(commands:Array<number>, data:Array<number>, winding?:string, checkCommands?:boolean):void;

            drawRect(x:number, y:number, width:number, height:number):void;

            drawRoundRect(x:number, y:number, width:number, height:number, ellipseWidth:number, ellipseHeight?:number):void;

            drawTriangles(vectors:Array<number>, indices?:Array<number>, uvtData?:Array<number>, culling?:string):void;

            endFill():void;

            lineBitmapStyle(bitmap:BitmapData, matrix?:geom.Matrix, repeat?:boolean, smooth?:boolean):void;

            lineGradientStyle(type:string, colors:Array<number>, alphas:Array<number>, ratios:Array<number>,
                              matrix?:geom.Matrix, spreadMethod?:string, interpolationMethod?:string,
                              focalPointRatio?:number):void;

            lineShaderStyle(shader:Shader, matrix?:geom.Matrix):void;

            lineStyle(thickness?:number, color?:number, alpha?:number, pixelHinting?:boolean, scaleMode?:string,
                      caps?:string, joints?:string, miterLimit?:number):void;

            lineTo(x:number, y:number):void;

            moveTo(x:number, y:number):void;

            redraw():void;
        }

        export interface NativeMenu {
        }

        export interface NativeWindow extends Window {
        }

        export class LoaderInfo {
            actionScriptVersion:number;
            applicationDomain:system.ApplicationDomain;
            bytes:utils.ByteArray;
            bytesLoaded:number;
            bytesTotal:number;
            childAllowsParent:boolean;
            childSandboxBridge:Object;
            content:DisplayObject;
            contentType:string;
            frameRate:number;
            height:number;
            isURLInaccessible:boolean;
            loader:Object;
            loaderURL:string;
            parameters:Object;
            parentAllowsChild:boolean;
            parentSandboxBridge:Object;
            sameDomain:boolean;
            sharedEvents:events.EventDispatcher;
            swfVersion:number;
            uncaughtErrorEvents:events.UncaughtErrorEvents;
            url:string;
            width:number;

            getLoaderInfoByDefinition(object:Object):LoaderInfo;
        }

        export class Shader {
            constructor(code?:utils.ByteArray);

            byteCode:utils.ByteArray;
            data:ShaderData;
            precisionHint:string;
        }

        export class ShaderData {
            constructor(byteCode?:utils.ByteArray);
        }

        export interface ShaderPrecision {
            FAST:string;
            FULL:string;
        }

        export var ShaderPrecision:ShaderPrecision;

        export interface BlendMode {
            ADD:string;
            ALPHA:string;
            DARKEN:string;
            DIFFERENCE:string;
            ERASE:string;
            HARDLIGHT:string;
            INVERT:string;
            LAYER:string;
            LIGHTEN:string;
            MULTIPLY:string;
            NORMAL:string;
            OVERLAY:string;
            SCREEN:string;
            SHADER:string;
            SUBTRACT:string;
        }

        export var BlendMode:BlendMode;

        export interface StageAlign {
            BOTTOM:string;
            BOTTOM_LEFT:string;
            BOTTOM_RIGHT:string;
            LEFT:string;
            RIGHT:string;
            TOP:string;
            TOP_LEFT:string;
            TOP_RIGHT:string;
        }

        export var StageAlign:StageAlign;

        export interface ColorCorrection {
            DEFAULT:string;
            OFF:string;
            ON:string;
        }

        export var ColorCorrection:ColorCorrection;

        export interface ColorCorrectionSupport {
            DEFAULT_OFF:string;
            DEFAULT_ON:string;
            UNSUPPORTED:string;
        }

        export var ColorCorrectionSupport:ColorCorrectionSupport;

        export interface StageDisplayState {
            FULL_SCREEN:string;
            FULL_SCREEN_INTERACTIVE:string;
            NORMAL:string;
        }

        export var StageDisplayState:StageDisplayState;

        export interface StageQuality {
            BEST:string;
            HIGH:string;
            LOW:string;
            MEDIUM:string;
        }

        export var StageQuality:StageQuality;

        export interface StageScaleMode {
            EXACT_FIT:string;
            NO_BORDER:string;
            NO_SCALE:string;
            SHOW_ALL:string;
        }

        export var StageScaleMode:StageScaleMode;

        export interface GradientType {
            LINEAR:string;
            RADIAL:string;
        }

        export var GradientType:GradientType;

        export interface InterpolationMethod {
            LINEAR_RGB:string;
            RGB:string;
        }

        export interface SpreadMethod {
            PAD:string;
            REFLECT:string;
            REPEAT:string;
        }

        export var SpreadMethod:SpreadMethod;

        export interface GraphicsPathWinding {
            EVEN_ODD:string;
            NON_ZERO:string;
        }

        export var GraphicsPathWinding:GraphicsPathWinding;

        export interface GraphicsPathCommand {
            CUBIC_CURVE_TO:number;
            CURVE_TO:number;
            LINE_TO:number;
            MOVE_TO:number;
            NO_OP:number;
            WIDE_LINE_TO:number;
            WIDE_MOVE_TO:number;
        }

        export var GraphicsPathCommand:GraphicsPathCommand;

        export interface TriangleCulling {
            NEGATIVE:string;
            NONE:string;
            POSITIVE:string;
        }

        export var TriangleCulling:TriangleCulling;

        export interface LineScaleMode {
            HORIZONTAL:string;
            NONE:string;
            NORMAL:string;
            VERTICAL:string;
        }

        export var LineScaleMode:LineScaleMode;

        export interface CapsStyle {
            NONE:string;
            ROUND:string;
            SQUARE:string;
        }

        export var CapsStyle:CapsStyle;

        export interface JointStyle {
            BEVEL:string;
            MITER:string;
            ROUND:string;
        }

        export var JointStyle:JointStyle;

    }

    export module utils {

        export class Timer extends events.EventDispatcher {
            constructor(delay:number, repeatCount?:number);

            currentCount:number;
            delay:number;
            repeatCount:number;
            running:boolean;

            reset():void;

            start():void;

            stop():void;

            enabled:boolean;
        }

        export class ByteArray {
        }

    }

    export module accessibility {

        export class AccessibilityProperties {
            constructor();

            description:string;
            forceSimple:boolean;
            name:string;
            noAutoLabeling:boolean;
            shortcut:string;
            silent:boolean;
        }

        export class AccessibilityImplementation {
        }

    }

    export module media {

        export class StageVideo {
            colorSpaces:Array<string>;
            depth:number;
            pan:geom.Point;
            videoHeight:number;
            videoWidth:number;
            viewPort:geom.Rectangle;
            zoom:geom.Point;

            attachStream(netStream:net.NetStream):void;
        }

        export class Sound extends events.EventDispatcher {
        }

    }

    export module net {

        export class NetStream {
        }

    }

    export module system {

        export class ApplicationDomain {
            currentDomain:ApplicationDomain;
            domainMemory:utils.ByteArray;
            static MIN_DOMAIN_MEMORY_LENGTH:number;
            parentDomain:ApplicationDomain;
        }

    }

}
