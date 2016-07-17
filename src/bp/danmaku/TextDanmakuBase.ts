/**
 * Created by MIC on 2016/6/11.
 */

import {IDanmaku} from "./IDanmaku";
import {Engine} from "../bulletproof/Engine";
import {DanmakuKind} from "./DanmakuKind";
import {CommentData} from "../bilibili/danmaku_api/CommentData";
import {DanmakuProviderBase} from "./DanmakuProviderBase";
import {DanmakuLayoutManagerBase} from "./DanmakuLayoutManagerBase";
import {NotImplementedError} from "../../../lib/glantern/src/gl/flash/errors/NotImplementedError";
import {DisplayObject} from "../../../lib/glantern/src/gl/flash/display/DisplayObject";

export abstract class TextDanmakuBase implements IDanmaku {

    constructor(layoutManager:DanmakuLayoutManagerBase) {
        this._layoutManager = layoutManager;
        this._danmakuProvider = layoutManager.danmakuProvider;
        this._engine = layoutManager.engine;
    }

    abstract getContent():string;

    abstract getText():string;

    abstract initialize(content:string, time?:number):void;

    dispose():void {
    }

    get engine():Engine {
        return this._engine;
    }

    get danmakuKind():DanmakuKind {
        throw new NotImplementedError();
    }

    get bornTime():number {
        throw new NotImplementedError();
    }

    get lifeTime():number {
        throw new NotImplementedError();
    }

    get layoutManager():DanmakuLayoutManagerBase {
        return this._layoutManager;
    }

    get danmakuProvider():DanmakuProviderBase {
        return this._danmakuProvider;
    }

    get visible():boolean {
        return this._visible;
    }

    set visible(v:boolean) {
        this._visible = v;
    }

    get layer():DisplayObject {
        return this._layer;
    }

    abstract getCommentData():CommentData;

    get x():number {
        return this._x;
    }

    set x(v:number) {
        this._x = v;
    }

    get y():number {
        return this._y;
    }

    set y(v:number) {
        this._y = v;
    }

    get width():number{
        throw new NotImplementedError();
    }

    get height():number{
        throw new NotImplementedError();
    }

    get right():number{
        throw new NotImplementedError();
    }

    get bottom():number{
        throw new NotImplementedError();
    }

    protected _engine:Engine = null;
    protected _layoutManager:DanmakuLayoutManagerBase = null;
    protected _danmakuProvider:DanmakuProviderBase = null;
    protected _visible:boolean = true;
    protected _x:number = 0;
    protected _y:number = 0;
    protected _layer:DisplayObject = null;

}
