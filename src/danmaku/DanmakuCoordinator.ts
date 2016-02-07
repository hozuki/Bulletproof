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
import {DanmakuProviderFlag} from "./DanmakuProviderFlag";
import {BulletproofConfig} from "../BulletproofConfig";

/**
 * The coordinator of all danmakus.
 * This class is a factory and manager of danmaku providers.
 */
export class DanmakuCoordinator implements IWebGLElement {

    /**
     * Creates a new {@Link DanmakuCoordinator} instance.
     * @param bulletproof {Bulletproof} The {@link Bulletproof} instance that will be attached to.
     */
    constructor(bulletproof:Bulletproof) {
        this._bulletproof = bulletproof;
        this._danmakuProviders = new Map<DanmakuKind, DanmakuProviderBase>();
    }

    /**
     * Disposes the {@link DanmakuCoordinator} instance and release all resources occupied.
     */
    dispose():void {
        this._danmakuProviders.forEach((provider:DanmakuProviderBase):void => {
            provider.dispose();
        });
        this._danmakuProviders.clear();
        this._danmakuProviders = null;
    }

    /**
     * Determines whether a danmaku should be created, in a global view.
     * For example, if the density of danmakus are too high, this function should returns false when a
     * {@link SimpleDanmakuProvider} is requesting creation of a new danmaku, to avoid performance drop.
     * Danmaku providers should check via this function before actually creating a danmaku.
     * @param requestingProvider {DanmakuProviderBase} The danmaku provider requesting the check.
     */
    shouldCreateDanmaku(requestingProvider:DanmakuProviderBase):boolean {
        var canCreate = true;
        var totalDanmakuCount = 0;
        var globalThreshold = BulletproofConfig.globalDanmakuCountThreshold;
        this._danmakuProviders.forEach((provider:DanmakuProviderBase):void => {
            // If a danmaku provider has no number limit, it contributes 0 to the total count.
            if (!canCreate || (requestingProvider.flags & DanmakuProviderFlag.UnlimitedCreation) !== 0) {
                return;
            }
            totalDanmakuCount += provider.displayingDanmakuList.length;
            if (totalDanmakuCount > globalThreshold) {
                canCreate = false;
            }
        });
        return canCreate;
    }

    /**
     * Adds a new kind of danmaku provider to provider instance list. If the a provider of that kind
     * already exists, the new one will not be added.
     * @param provider {DanmakuProviderBase} The danmaku provider preparing to be added.
     */
    addDanmakuProvider(provider:DanmakuProviderBase):void {
        if (!_util.isUndefinedOrNull(provider) && !this._danmakuProviders.has(provider.danmakuKind)) {
            this._danmakuProviders.set(provider.danmakuKind, provider);
            provider.initialize();
        }
    }

    /**
     * Removes a new kind of danmaku provider from provider instance list.
     * @param provider {DanmakuProviderBase} The danmaku provider preparing to be removed.
     */
    removeDanmakuProvider(provider:DanmakuProviderBase):void {
        if (!_util.isUndefinedOrNull(provider) && this._danmakuProviders.has(provider.danmakuKind)) {
            this._danmakuProviders.delete(provider.danmakuKind);
        }
    }

    /**
     * Gets the instance of danmaku provider whose kind is as specified. If the kind is not registered,
     * a null value will be returned.
     * @param kind {DanmakuKind} The danmaku kind of requested danmaku provider.
     * @returns {DanmakuProviderBase}
     */
    getDanmakuProvider(kind:DanmakuKind):DanmakuProviderBase {
        var provider = this._danmakuProviders.get(kind);
        if (_util.isUndefinedOrNull(provider)) {
            return null;
        } else {
            return provider;
        }
    }

    /**
     * Updates the status of all danmaku providers.
     */
    update():void {
        this._danmakuProviders.forEach((provider:DanmakuProviderBase):void => {
            provider.update();
        });
    }

    /**
     * Perform extra rendering if needed.
     * @param renderer {WebGLRenderer} The renderer used.
     */
    render(renderer:WebGLRenderer):void {
        // Do nothing.
    }

    /**
     * Gets the {@link Bulletproof} instance that controls this {@link DanmakuCoordinator}.
     * @returns {Bulletproof}
     */
    get bulletproof():Bulletproof {
        return this._bulletproof;
    }

    private _danmakuProviders:Map<DanmakuKind, DanmakuProviderBase> = null;
    private _bulletproof:Bulletproof = null;

}
