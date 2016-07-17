/**
 * Created by MIC on 2015/12/28.
 */

import {DanmakuKind} from "./DanmakuKind";
import {DanmakuProviderBase} from "./DanmakuProviderBase";
import {Engine} from "../bulletproof/Engine";
import {StageResizedEventArgs} from "../bulletproof/events/StageResizedEventArgs";
import {IDisposable} from "../../../lib/glantern/src/gl/glantern/IDisposable";
import {NotImplementedError} from "../../../lib/glantern/src/gl/flash/errors/NotImplementedError";
import {TimeInfoEx} from "../bulletproof/TimeInfoEx";

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
        this._engine = provider.engine;
    }

    /**
     * Initialize the layout manager.
     */
    initialize():void {
    }

    /**
     * Disposes the danmaku layout manager and release all resources occupied.
     */
    dispose():void {
    }

    /**
     * Calculates the best layout and sets the danmakus to their new locations.
     * This method must be overridden.
     * @param timeInfo {TimeInfoEx}
     */
    abstract performLayout(timeInfo:TimeInfoEx):void;

    /**
     * Gets the kind of danmaku that this danmaku layout manager handles.
     * @returns {DanmakuKind}
     */
    get danmakuKind():DanmakuKind {
        throw new NotImplementedError();
    }

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
     * Gets the {@link Engine} instance that controls this {@link DanmakuLayoutManagerBase}.
     * @returns {Engine}
     */
    get engine():Engine {
        return this._engine;
    }

    protected _danmakuProvider:DanmakuProviderBase = null;
    private _engine:Engine = null;

}
