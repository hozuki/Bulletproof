/**
 * Created by MIC on 2015/12/28.
 */

import {DanmakuKind} from "../DanmakuKind";
import {SimpleDanmakuLayoutManager} from "./SimpleDanmakuLayoutManager";
import {Stage} from "../../../lib/glantern/src/flash/display/Stage";
import {DisplayObjectContainer} from "../../../lib/glantern/src/flash/display/DisplayObjectContainer";
import {SimpleDanmakuProvider} from "./SimpleDanmakuProvider";
import {Bulletproof} from "../../Bulletproof";
import {WebGLRenderer} from "../../../lib/glantern/src/webgl/WebGLRenderer";
import {SimpleDanmakuType} from "./SimpleDanamkuType";
import {IDanmaku} from "../IDanmaku";
import {Point} from "../../../lib/glantern/src/flash/geom/Point";
import {ISimpleDanmakuCreateParams} from "./ISimpleDanmakuCreateParams";
import {BulletproofConfig} from "../../BulletproofConfig";

export class SimpleDanmaku implements IDanmaku {

    constructor(layoutManager:SimpleDanmakuLayoutManager, createParams:ISimpleDanmakuCreateParams) {
        this._layoutManager = layoutManager;
        this._danmakuProvider = layoutManager.danmakuProvider;
        this._bulletproof = layoutManager.bulletproof;
        this._createParams = createParams;
    }

    dispose():void {
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

    initialize(content:string, time:number):void {
        this._content = content;
        this._bornTime = typeof this.createParams.bornTime === "number" ? this.createParams.bornTime : time;
    }

    get bulletproof():Bulletproof {
        return this._bulletproof;
    }

    get bornTime():number {
        return this._bornTime;
    }

    get lifeTime():number {
        return BulletproofConfig.simpleDanmakuLifeTimeSecs;
    }

    get createParams():ISimpleDanmakuCreateParams {
        return this._createParams;
    }

    get textHeight():number {
        if (this._textHeight < 0) {
            this._textHeight = this.createParams.fontSize * 1.5;
        }
        return this._textHeight;
    }

    get textWidth():number {
        if (this._textWidth < 0) {
            var context2D = this.danmakuProvider.danmakuLayer.context2D;
            context2D.font = this.createParams.fontSize.toString() + "pt \"" + this.createParams.fontName + "\"";
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
    isYPositionSet:boolean = false;

    /**
     * X coordinate of the top left point of this {@link SimpleDanmaku}.
     * @type {Number}
     */
    x:number = 0;

    /**
     * Y coordinate of the top left point of this {@link SimpleDanmaku}.
     * @type {Number}
     */
    y:number = 0;

    visible:boolean = false;

    displaying:boolean = false;

    private _content:string = null;
    private _bornTime:number = 0;
    private _bulletproof:Bulletproof = null;
    private _layoutManager:SimpleDanmakuLayoutManager;
    private _danmakuProvider:SimpleDanmakuProvider;
    private _createParams:ISimpleDanmakuCreateParams = null;
    private _textWidth:number = -1;
    private _textHeight:number = -1;

}
