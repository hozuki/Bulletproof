/**
 * Created by MIC on 2015/12/28.
 */

import {DanmakuKind} from "./DanmakuKind";
import {DanmakuLayoutManagerBase} from "./DanmakuLayoutManagerBase";
import {DanmakuController} from "./DanmakuController";
import {DanmakuProviderFlag} from "./DanmakuProviderFlag";
import {IDanmaku} from "./IDanmaku";
import {Engine} from "../mic/Engine";
import {DisplayObject} from "../../../lib/glantern/src/gl/flash/display/DisplayObject";
import {IDisposable} from "../../../lib/glantern/src/gl/mic/IDisposable";
import {NotImplementedError} from "../../../lib/glantern/src/gl/flash/errors/NotImplementedError";
import {TimeInfoEx} from "../mic/TimeInfoEx";

/**
 * Base class exposing common service of a danmaku provider.
 * This class must be inherited.
 */
export abstract class DanmakuProviderBase implements IDisposable {

    /**
     * Creates a new danmaku provider.
     * @param controller {DanmakuController} The {@link DanmakuController} that will be used for reversed queries.
     */
    constructor(controller: DanmakuController) {
        this._controller = controller;
        this._displayingDanmakuList = [];
        this._engine = controller.engine;
        this._pool = controller.getNextAvailablePool();
    }

    /**
     * The kind of this danmaku provider. Override this property and return a unique number to identify from other
     * danmaku providers.
     * This property must be overridden.
     */
    get danmakuKind(): DanmakuKind {
        throw new NotImplementedError();
    }

    /**
     * Disposes the danmaku provider and release all resources occupied.
     * This method must be overridden.
     */
    abstract dispose(): void;

    /**
     * Perform extra initialization after created.
     */
    initialize(): void {
        this.layoutManager.initialize();
    }

    /**
     * Updates the state of this instance.
     */
    update(timeInfo: TimeInfoEx): void {
        this.updateDisplayingDanmakuList(timeInfo);
        this.layoutManager.performLayout(timeInfo);
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
    addDanmaku(content: string, args?: any): IDanmaku {
        if ((true || this.canCreateDanmaku(args)) && this.controller.shouldCreateDanmaku(this)) {
            var danmaku = this._$addDanmaku(content, args);
            this.engine.raiseCommentEvent(danmaku.getCommentData());
            return danmaku;
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
    abstract removeDanmaku(danmaku: IDanmaku): boolean;

    /**
     * Determines whether a new danmaku can be created with specified arguments, in current
     * {@link DanmakuProviderBase}'s view.
     * @param args {*} Arguments used to create a new danmaku.
     * @returns {Boolean} Whether a danmaku can be created with specified arguments.
     */
    abstract canCreateDanmaku(args?: any): boolean;

    /**
     * Removes "dead" danmakus from the internal danmaku list and release the resources they occupy.
     * A danmaku being existed longer than its life time is regarded as "dead".
     * This method must be overridden.
     * @param timeInfo {TimeInfoEx}
     */
    abstract updateDisplayingDanmakuList(timeInfo: TimeInfoEx): void;

    /**
     * Determines if a danmaku is "dead". A "dead" danmaku will be removed from the danmaku list to grant space
     * for new danmakus.
     * This method must be overridden.
     * @param timeInfo {TimeInfoEx}
     * @param danmaku {IDanmaku} The danmaku to test.
     * @returns {Boolean} True if the danmaku is "dead", and false otherwise.
     */
    abstract isDanmakuDead(timeInfo: TimeInfoEx, danmaku: IDanmaku): boolean;

    /**
     * Gets the layout manager associated with this instance.
     * @returns {DanmakuLayoutManagerBase}
     */
    get layoutManager(): DanmakuLayoutManagerBase {
        return this._layoutManager;
    }

    /**
     * Gets the list including all displaying danmakus created and managed by this danmaku provider.
     * @returns {IDanmaku[]}
     */
    get displayingDanmakuList(): IDanmaku[] {
        return this._displayingDanmakuList;
    }

    /**
     * Gets the list including all danmakus created and managed by this danmaku provider.
     * @returns {IDanmaku[]}
     */
    get fullDanmakuList(): IDanmaku[] {
        throw new NotImplementedError();
    }

    /**
     * Gets the {@link DisplayObject} that contains danmakus of this {@link DanmakuProviderBase} as a layer.
     * @returns {DisplayObject}
     */
    get layer(): DisplayObject {
        return this._layer;
    }

    /**
     * Gets the danmaku controller specified at the time of creation.
     * @returns {DanmakuController}
     */
    get controller(): DanmakuController {
        return this._controller;
    }

    /**
     * Gets the {@link Engine} instance that controls this {@link DanmakuProviderBase}.
     * @returns {Engine}
     */
    get engine(): Engine {
        return this._engine;
    }

    /**
     * Gets the flags of this danmaku provider. The flags may influence how this danmaku provider is treated,
     * for example, in {@link DanmakuController#shouldCreateDanmaku}.
     * The default value is {@link DanmakuProviderFlag.None}, indicating no special flag is set.
     * @returns {DanmakuProviderFlag}
     */
    get flags(): DanmakuProviderFlag {
        return DanmakuProviderFlag.None;
    }

    /**
     * Pool number of this danmaku provider.
     * @returns {Number}
     */
    get pool(): number {
        return this._pool;
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
    protected abstract _$addDanmaku(content: string, args?: any): IDanmaku;

    protected _displayingDanmakuList: IDanmaku[] = null;
    protected _controller: DanmakuController = null;
    protected _layoutManager: DanmakuLayoutManagerBase = null;
    protected _layer: DisplayObject = null;
    private _engine: Engine = null;
    private _pool: number = -1;

}
