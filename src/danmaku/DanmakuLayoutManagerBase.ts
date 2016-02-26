/**
 * Created by MIC on 2015/12/28.
 */

import {DanmakuKind} from "./DanmakuKind";
import {DanmakuProviderBase} from "./DanmakuProviderBase";
import {IDanmaku} from "./IDanmaku";
import {Bulletproof} from "../Bulletproof";
import {StageResizedEventArgs} from "./StageResizedEventArgs";
import {IDisposable} from "../../lib/glantern/src/IDisposable";
import {NotImplementedError} from "../../lib/glantern/lib/glantern-utils/src/NotImplementedError";

/**
 * Base class exposing common service of a danmaku layout manager.
 * A danmaku layout manager does layout calculation and performs optimized layout for danmakus of its kind.
 * In special situations, it can also do nothing and let the danmakus themselves to determine the best
 * layout, as in {@link ScriptedDanmakuLayoutManager}.
 * This class must be inherited.
 */
export abstract class DanmakuLayoutManagerBase implements IDisposable {

    /**
     * Creates a new danmaku layout manager.
     * @param provider {DanmakuProviderBase} The danmaku provider that will be attached to.
     */
    constructor(provider:DanmakuProviderBase) {
        this._danmakuProvider = provider;
        this._bulletproof = provider.bulletproof;
    }

    /**
     * Calculates the best layout and sets the danmakus to their new locations.
     * This method must be overridden.
     */
    abstract performLayout():void;

    /**
     * Gets the kind of danmaku that this danmaku layout manager handles.
     * @returns {DanmakuKind}
     */
    get danmakuKind():DanmakuKind {
        throw new NotImplementedError();
    }

    /**
     * Disposes the danmaku layout manager and release all resources occupied.
     * This method must be overridden.
     */
    abstract dispose():void;

    /**
     * Handles stage resize event.
     * This method must be overridden.
     * @param sender {*} The event firer.
     * @param e {StageResizedEventArgs} Event arguments.
     */
    abstract onStageResize(sender:any, e:StageResizedEventArgs):void;

    /**
     * Gets the danmaku provider specified at the time of creation.
     * @returns {DanmakuProviderBase}
     */
    get danmakuProvider():DanmakuProviderBase {
        return this._danmakuProvider;
    }

    /**
     * Gets the {@link Bulletproof} instance that controls this {@link DanmakuLayoutManagerBase}.
     * @returns {Bulletproof}
     */
    get bulletproof():Bulletproof {
        return this._bulletproof;
    }

    protected _danmakuProvider:DanmakuProviderBase = null;
    private _bulletproof:Bulletproof = null;

}
