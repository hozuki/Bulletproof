/**
 * Created by MIC on 2015/12/29.
 */

import {IDisposable} from "../../lib/glantern/src/IDisposable";
import {NotImplementedError} from "../../lib/glantern/src/_util/NotImplementedError";
import {_util} from "../../lib/glantern/src/_util/_util";
import {DanmakuKind} from "./DanmakuKind";
import {DanmakuProviderBase} from "./DanmakuProviderBase";
import {Bulletproof} from "../Bulletproof";
import {IWebGLElement} from "../../lib/glantern/src/webgl/IWebGLElement";
import {WebGLRenderer} from "../../lib/glantern/src/webgl/WebGLRenderer";
import {DanmakuBase} from "./DanmakuBase";

export class DanmakuCoordinator implements IWebGLElement {

    constructor(bulletproof:Bulletproof) {
        this._bulletproof = bulletproof;
        this._danmakuProviders = new Map<DanmakuKind, DanmakuProviderBase>();
    }

    dispose():void {
        this._danmakuProviders.forEach((provider:DanmakuProviderBase):void => {
            provider.dispose();
        });
        this._danmakuProviders.clear();
    }

    shouldCreateDanmaku():boolean {
        throw new NotImplementedError();
    }

    addDanmakuProvider(provider:DanmakuProviderBase):void {
        if (!_util.isUndefinedOrNull(provider) && !this._danmakuProviders.has(provider.danmakuKind)) {
            this._danmakuProviders.set(provider.danmakuKind, provider);
        }
    }

    removeDanmakuProvider(provider:DanmakuProviderBase):void {
        if (!_util.isUndefinedOrNull(provider) && this._danmakuProviders.has(provider.danmakuKind)) {
            this._danmakuProviders.delete(provider.danmakuKind);
        }
    }

    getDanmakuProvider(kind:DanmakuKind):DanmakuProviderBase {
        return this._danmakuProviders.get(kind);
    }

    update():void {
        this._danmakuProviders.forEach((provider:DanmakuProviderBase):void => {
            provider.update();
        });
    }

    render(renderer:WebGLRenderer):void {
        // Do nothing.
    }

    get bulletproof():Bulletproof {
        return this._bulletproof;
    }

    private _danmakuProviders:Map<DanmakuKind, DanmakuProviderBase> = null;
    private _bulletproof:Bulletproof = null;

}
