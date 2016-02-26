/**
 * Created by MIC on 2015/12/28.
 */

import {DanmakuKind} from "./DanmakuKind";
import {DanmakuLayoutManagerBase} from "./DanmakuLayoutManagerBase";
import {DanmakuCoordinator} from "./DanmakuCoordinator";
import {DanmakuProviderFlag} from "./DanmakuProviderFlag";
import {IDanmaku} from "./IDanmaku";
import {Bulletproof} from "../Bulletproof";
import {IDisposable} from "../../lib/glantern/src/IDisposable";
import {NotImplementedError} from "../../lib/glantern/lib/glantern-utils/src/NotImplementedError";
import {DisplayObject} from "../../lib/glantern/src/flash/display/DisplayObject";

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
        this._displayingDanmakuList = [];
        this._bulletproof = coordinator.bulletproof;
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
     * Perform extra initialization after created.
     * This method must be overridden.
     */
    abstract initialize():void;

    /**
     * Updates the state of this instance.
     */
    update():void {
        this.updateDisplayDanmakuList();
        this.layoutManager.performLayout();
    }

    /**
     * Adds a danmaku with the given content and adds it into internal danmaku list.
     * A solid {@link IDanmaku} implementations determines how to interpret the given content.
     * This method must be overridden.
     * @param content {String} The content used to create a new danmaku.
     * @param [args] {*} Extra arguments used to create the danmaku. For example, the exact type must
     *                   be specified when creating a {@link SimpleDanmaku}.
     * @returns {IDanmaku} The created danmaku.
     */
    addDanmaku(content:string, args?:any):IDanmaku {
        if ((true || this.canCreateDanmaku(args)) && this.danmakuCoordinator.shouldCreateDanmaku(this)) {
            return this.__addDanmaku(content, args);
        } else {
            return null;
        }
    }

    /**
     * Removes a danmaku from internal danmaku list. If the provided danmaku is not in the list, nothing will be done.
     * This method must be overridden.
     * @param danmaku {IDanmaku} The danmaku that will be removed.
     * @returns {Boolean} Whether the removal was all-OK.
     */
    abstract removeDanmaku(danmaku:IDanmaku):boolean;

    /**
     * Determines whether a new danmaku can be created with specified arguments, in current
     * {@link DanmakuProviderBase}'s view.
     * @param args {*} Arguments used to create a new danmaku.
     * @returns {Boolean} Whether a danmaku can be created with specified arguments.
     */
    abstract canCreateDanmaku(args?:any):boolean;

    /**
     * Removes "dead" danmakus from the internal danmaku list and release the resources they occupy.
     * A danmaku being existed longer than its life time is regarded as "dead".
     * This method must be overridden.
     */
    abstract updateDisplayDanmakuList():void;

    /**
     * Determines if a danmaku is "dead". A "dead" danmaku will be removed from the danmaku list to grant space
     * for new danmakus.
     * This method must be overridden.
     * @param danmaku {IDanmaku} The danmaku to test.
     * @returns {Boolean} True if the danmaku is "dead", and false otherwise.
     */
    abstract isDanmakuDead(danmaku:IDanmaku):boolean;

    /**
     * Gets the layout manager associated with this instance.
     * @returns {DanmakuLayoutManagerBase}
     */
    get layoutManager():DanmakuLayoutManagerBase {
        return this._layoutManager;
    }

    /**
     * Gets the list including all displaying danmakus created and managed by this danmaku provider.
     * @returns {IDanmaku[]}
     */
    get displayingDanmakuList():IDanmaku[] {
        return this._displayingDanmakuList;
    }

    /**
     * Gets the list including all danmakus created and managed by this danmaku provider.
     * @returns {IDanmaku[]}
     */
    get fullDanmakuList():IDanmaku[] {
        throw new NotImplementedError();
    }

    /**
     * Gets the {@link DisplayObject} that contains danmakus of this {@link DanmakuProviderBase} as a layer.
     * @returns {DisplayObject}
     */
    get danmakuLayer():DisplayObject {
        return this._danmakuLayer;
    }

    /**
     * Gets the danmaku coordinator specified at the time of creation.
     * @returns {DanmakuCoordinator}
     */
    get danmakuCoordinator():DanmakuCoordinator {
        return this._coordinator;
    }

    /**
     * Gets the {@link Bulletproof} instance that controls this {@link DanmakuProviderBase}.
     * @returns {Bulletproof}
     */
    get bulletproof():Bulletproof {
        return this._bulletproof;
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

    /**
     * Adds a danmaku with the given content and adds it into internal danmaku list.
     * A solid {@link IDanmaku} implementations determines how to interpret the given content.
     * This method must be overridden.
     * @param content {String} The content used to create a new danmaku.
     * @param [args] {*} Extra arguments used to create the danmaku. For example, the exact type must
     *                   be specified when creating a {@link SimpleDanmaku}.
     * @returns {IDanmaku} The created danmaku.
     */
    protected abstract __addDanmaku(content:string, args?:any):IDanmaku;

    protected _displayingDanmakuList:IDanmaku[] = null;
    protected _coordinator:DanmakuCoordinator = null;
    protected _layoutManager:DanmakuLayoutManagerBase = null;
    protected _danmakuLayer:DisplayObject = null;
    private _bulletproof:Bulletproof = null;

}
