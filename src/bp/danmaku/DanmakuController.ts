/**
 * Created by MIC on 2015/12/29.
 */

import {DanmakuKind} from "./DanmakuKind";
import {DanmakuProviderBase} from "./DanmakuProviderBase";
import {Engine} from "../mic/Engine";
import {DanmakuProviderFlag} from "./DanmakuProviderFlag";
import {WebGLRenderer} from "../../../lib/glantern/src/gl/webgl/WebGLRenderer";
import {TimeInfoEx} from "../mic/TimeInfoEx";
import {CommonUtil} from "../../../lib/glantern/src/gl/mic/CommonUtil";
import {IUpdateable} from "../../../lib/glantern/src/gl/mic/IUpdateable";
import {IDrawable} from "../../../lib/glantern/src/gl/mic/IDrawable";
import {IWebGLElement} from "../../../lib/glantern/src/gl/webgl/IWebGLElement";

/**
 * The controller of all danmakus.
 * This class is a factory and manager of danmaku providers.
 */
export class DanmakuController implements IWebGLElement, IUpdateable, IDrawable {

    /**
     * Creates a new {@Link DanmakuController} instance.
     * @param bulletproof {Engine} The {@link Engine} instance that will be attached to.
     */
    constructor(bulletproof: Engine) {
        this._engine = bulletproof;
        this._danmakuProviders = new Map<DanmakuKind, DanmakuProviderBase>();
    }

    /**
     * Disposes the {@link DanmakuController} instance and release all resources occupied.
     */
    dispose(): void {
        this._danmakuProviders.forEach((provider: DanmakuProviderBase): void => {
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
    shouldCreateDanmaku(requestingProvider: DanmakuProviderBase): boolean {
        var canCreate = true;
        var totalDanmakuCount = 0;
        var globalThreshold = this.engine.options.globalDanmakuCountThreshold;
        this._danmakuProviders.forEach((provider: DanmakuProviderBase): void => {
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
    addProvider(provider: DanmakuProviderBase): void {
        if (CommonUtil.ptr(provider) && !this._danmakuProviders.has(provider.danmakuKind)) {
            this._danmakuProviders.set(provider.danmakuKind, provider);
            provider.initialize();
        }
    }

    /**
     * Removes a new kind of danmaku provider from provider instance list.
     * @param provider {DanmakuProviderBase} The danmaku provider preparing to be removed.
     */
    removeProvider(provider: DanmakuProviderBase): void {
        if (CommonUtil.ptr(provider) && this._danmakuProviders.has(provider.danmakuKind)) {
            this._danmakuProviders.delete(provider.danmakuKind);
        }
    }

    /**
     * Gets the instance of danmaku provider whose kind is as specified. If the kind is not registered,
     * a null value will be returned.
     * @param kind {DanmakuKind} The danmaku kind of requested danmaku provider.
     * @returns {DanmakuProviderBase}
     */
    getProvider(kind: DanmakuKind): DanmakuProviderBase {
        var provider = this._danmakuProviders.get(kind);
        return CommonUtil.ptr(provider) ? provider : null;
    }

    getProviders(): DanmakuProviderBase[] {
        var providers: DanmakuProviderBase[] = [];
        this._danmakuProviders.forEach((provider: DanmakuProviderBase): void => {
            providers.push(provider);
        });
        return providers;
    }

    /**
     * Updates the status of all danmaku providers.
     */
    update(timeInfo: TimeInfoEx): void {
        if (!this.enabled) {
            return;
        }
        this._danmakuProviders.forEach((provider: DanmakuProviderBase): void => {
            provider.update(timeInfo);
        });
    }

    /**
     * Perform extra rendering if needed.
     * @param renderer {WebGLRenderer} The renderer used.
     */
    render(renderer: WebGLRenderer): void {
        // Do nothing.
        if (!this.visible) {
            return;
        }
    }

    $update(timeInfo: TimeInfoEx): void {
        this.update(timeInfo);
    }

    $render(renderer: WebGLRenderer): void {
        this.render(renderer);
    }

    /**
     * Gets the {@link Engine} instance that controls this {@link DanmakuController}.
     * @returns {Engine}
     */
    get engine(): Engine {
        return this._engine;
    }

    getNextAvailablePool(): number {
        return this._danmakuProviders.size;
    }

    enabled: boolean = true;

    visible: boolean = true;

    private _danmakuProviders: Map<DanmakuKind, DanmakuProviderBase> = null;
    private _engine: Engine = null;

}
