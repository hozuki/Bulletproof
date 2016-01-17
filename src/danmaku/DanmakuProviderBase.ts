/**
 * Created by MIC on 2015/12/28.
 */

import {IDisposable} from "../../lib/glantern/src/IDisposable";
import {DanmakuKind} from "./DanmakuKind";
import {DanmakuLayoutManagerBase} from "./DanmakuLayoutManagerBase";
import {NotImplementedError} from "../../lib/glantern/src/_util/NotImplementedError";
import {DanmakuCoordinator} from "./DanmakuCoordinator";
import {DanmakuBase} from "./DanmakuBase";
import {DanmakuProviderFlag} from "./DanmakuProviderFlag";

/**
 * Base class exposing common service of a danmaku provider.
 * This class must be inherited.
 */
export abstract class DanmakuProviderBase implements IDisposable {

    /**
     * Creates a new danmaku provider.
     * @param coordinator {DanmakuCoordinator} The {@link DanmakuCoordinator} that will be used for reversed queries.
     */
    constructor(coordinator:DanmakuCoordinator) {
        this._coordinator = coordinator;
        this._danmakuList = [];
    }

    /**
     * The kind of this danmaku provider. Override this property and return a unique number to identify from other
     * danmaku providers.
     * This property must be overridden.
     */
    get danmakuKind():DanmakuKind {
        throw new NotImplementedError();
    }

    /**
     * Disposes the danmaku provider and release all resources occupied.
     * This method must be overridden.
     */
    abstract dispose():void;

    /**
     * Updates the state of this instance.
     */
    update():void {
        this.removeDeadDanmakus();
        this.layoutManager.performLayout();
    }

    /**
     * Adds a danmaku with the given content and adds it into internal danmaku list.
     * A solid {@link DanmakuBase} implementations determines how to interpret the given content.
     * This method must be overridden.
     * @param content {String} The content used to create a new danmaku.
     */
    abstract addDanmaku(content:string):DanmakuBase;

    /**
     * Removes a danmaku from internal danmaku list. If the provided danmaku is not in the list, nothing will be done.
     * This method must be overridden.
     * @param danmaku {DanmakuBase} The danmaku that will be removed.
     */
    abstract removeDanmaku(danmaku:DanmakuBase):boolean;

    /**
     * Removes "dead" danmakus from the internal danmaku list and release the resources they occupy.
     * A danmaku being existed longer than its life time is regarded as "dead".
     */
    removeDeadDanmakus():void {
        var danmaku:DanmakuBase;
        var bulletproof = this.danmakuCoordinator.bulletproof;
        for (var i = 0; i < this.danmakuList.length; ++i) {
            danmaku = this.danmakuList[i];
            if (danmaku.bornTime + danmaku.lifeTime * 1000 < bulletproof.timeElapsed) {
                this.removeDanmaku(danmaku);
                --i;
            }
        }
    }

    /**
     * Gets the layout manager associated with this instance.
     * @returns {DanmakuLayoutManagerBase}
     */
    get layoutManager():DanmakuLayoutManagerBase {
        return this._layoutManager;
    }

    /**
     * Gets the list including all danmakus created and managed by this danmaku provider.
     * @returns {DanmakuBase[]}
     */
    get danmakuList():DanmakuBase[] {
        return this._danmakuList;
    }

    /**
     * Gets the danmaku coordinator specified at the time of creation.
     * @returns {DanmakuCoordinator}
     */
    get danmakuCoordinator():DanmakuCoordinator {
        return this._coordinator;
    }

    /**
     * Gets the flags of this danmaku provider. The flags may influence how this danmaku provider is treated,
     * for example, in {@link DanmakuCoordinator.shouldCreateDanmaku}.
     * The default value is {@link DanmakuProviderFlag.None}, indicating no special flag is set.
     * @returns {DanmakuProviderFlag}
     */
    get flags():DanmakuProviderFlag {
        return DanmakuProviderFlag.None;
    }

    protected _danmakuList:DanmakuBase[] = null;
    protected _coordinator:DanmakuCoordinator = null;
    protected _layoutManager:DanmakuLayoutManagerBase = null;

}
