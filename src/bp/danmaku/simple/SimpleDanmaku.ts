/**
 * Created by MIC on 2015/12/28.
 */

import {DanmakuKind} from "../DanmakuKind";
import {SimpleDanmakuLayoutManager} from "./SimpleDanmakuLayoutManager";
import {SimpleDanmakuProvider} from "./SimpleDanmakuProvider";
import {SimpleDanmakuType} from "./SimpleDanamkuType";
import {ISimpleDanmakuCreateParams} from "./ISimpleDanmakuCreateParams";
import {CommentData} from "../../bilibili/danmaku_api/CommentData";
import {TextDanmakuBase} from "../TextDanmakuBase";
import {SimpleDanmakuLayer} from "./SimpleDanmakuLayer";
import {ISimpleDanmakuMetrics} from "./ISimpleDanmakuMetrics";
import {GLUtil} from "../../../../lib/glantern/src/gl/glantern/GLUtil";

export class SimpleDanmaku extends TextDanmakuBase {

    constructor(layoutManager:SimpleDanmakuLayoutManager, createParams:ISimpleDanmakuCreateParams) {
        super(layoutManager);
        this._createParams = createParams;
        this._layer = this.danmakuProvider.layer;
    }

    get danmakuKind():DanmakuKind {
        return DanmakuKind.Simple;
    }

    get layoutManager():SimpleDanmakuLayoutManager {
        return this._layoutManager;
    }

    get danmakuProvider():SimpleDanmakuProvider {
        return this._danmakuProvider;
    }

    getContent():string {
        return this._content;
    }

    getText():string {
        return this._content;
    }

    initialize(content:string, time?:number):void {
        this._content = content;
        this._bornTime = typeof this.createParams.bornTime === "number" ? this.createParams.bornTime : time;
    }

    get bornTime():number {
        return this._bornTime;
    }

    get lifeTime():number {
        return this.engine.options.simpleDanmakuLifeTimeSecs;
    }

    get layer():SimpleDanmakuLayer {
        return this._layer;
    }

    get createParams():ISimpleDanmakuCreateParams {
        return this._createParams;
    }

    getTextHeight():number {
        if (this._textHeight < 0) {
            this._textHeight = this.createParams.fontSize * 1.5;
        }
        return this._textHeight;
    }

    getTextWidth():number {
        if (this._textWidth < 0) {
            var context2D = this.layer.context2D;
            context2D.font = `${this.createParams.fontSize}pt "${this.createParams.fontName}"`;
            this._textWidth = context2D.measureText(this.getText()).width;
        }
        return this._textWidth;
    }

    /**
     * Gets/sets whether the Y position of this {@link SimpleDanmaku} is set. If the it is set, the {@link SimpleDanmakuLayoutManager}
     * should only change the value of X position since sudden modification to Y position will confuse audiences.
     * However, considering that size of the stage may change, simple danmakus fixed at bottom (bottom, bottom left,
     * bottom right) should recalculate their Y positions to fit in the change.
     * @type {Boolean}
     */
    isYSet:boolean = false;

    /**
     * Gets/sets whether the X position of this {@link SimpleDanmaku} is set. Common languages are horizontally displayed,
     * that means the X position changes much less frequently than the Y position.
     * @type {Boolean}
     */
    isXSet:boolean = false;

    get width():number {
        return this.metrics.borderWidth;
    }

    get height():number {
        return this.metrics.borderHeight;
    }

    get right():number {
        return this.x + this.width;
    }

    get bottom():number {
        return this.y + this.height;
    }

    displaying:boolean = false;

    getCommentData():CommentData {
        return {
            txt: this.getContent(),
            time: this.bornTime.toString(),
            color: this.createParams.textColor,
            pool: this.danmakuProvider.pool,
            mode: this.createParams.type,
            fontSize: this.createParams.fontSize
        };
    }

    isType(type:SimpleDanmakuType):boolean {
        return this.createParams.type === type;
    }

    get metrics():ISimpleDanmakuMetrics {
        if (!GLUtil.ptr(this._metrics)) {
            this._metrics = this.__calcMetrics();
        }
        return this._metrics;
    }

    private __calcMetrics():ISimpleDanmakuMetrics {
        var cp = this.createParams;
        var outlineThickness = cp.outline && cp.outlineThickness > 0 ? cp.outlineThickness : 0;
        var borderThickness = cp.border && cp.borderThickness > 0 ? cp.borderThickness : 0;
        var textWidth = this.getTextWidth(), textHeight = this.getTextHeight();
        var metrics:ISimpleDanmakuMetrics = Object.create(null);
        /* Background */
        metrics.bgBaseX = metrics.bgBaseY = 0;
        metrics.bgWidth = textWidth + borderThickness * 2 + outlineThickness * 2 + 2;
        metrics.bgHeight = textHeight + borderThickness * 2 + outlineThickness * 2;
        /* Text */
        metrics.textWidth = textWidth;
        metrics.textHeight = textHeight;
        // textBase is the bottom left point.
        metrics.textBaseX = outlineThickness + borderThickness;
        metrics.textBaseY = textHeight * 0.75 + borderThickness;
        /* Outline */
        metrics.outlineBaseX = outlineThickness + borderThickness;
        metrics.outlineBaseY = textHeight * 0.75 + borderThickness;
        metrics.outlineWidth = textWidth + 2 * outlineThickness;
        metrics.outlineHeight = textHeight + 2 * outlineThickness;
        /* Border */
        metrics.borderWidth = textWidth + borderThickness * 2 + outlineThickness * 2 + 2;
        metrics.borderHeight = textHeight + borderThickness * 2 + outlineThickness * 2;
        metrics.borderBaseX = metrics.borderBaseY = 0;
        return metrics;
    }

    private _content:string = null;
    private _bornTime:number = 0;
    protected _layoutManager:SimpleDanmakuLayoutManager;
    protected _danmakuProvider:SimpleDanmakuProvider;
    protected _layer:SimpleDanmakuLayer;
    private _createParams:ISimpleDanmakuCreateParams;
    private _textWidth:number = -1;
    private _textHeight:number = -1;
    private _metrics:ISimpleDanmakuMetrics = null;

}
