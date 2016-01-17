/**
 * Created by MIC on 2015/12/28.
 */

import {DisplayObjectContainer} from "../../lib/glantern/src/flash/display/DisplayObjectContainer";
import {DanmakuKind} from "./DanmakuKind";
import {DanmakuLayoutManagerBase} from "./DanmakuLayoutManagerBase";
import {Stage} from "../../lib/glantern/src/flash/display/Stage";
import {NotImplementedError} from "../../lib/glantern/src/_util/NotImplementedError";
import {Bulletproof} from "../Bulletproof";
import {DanmakuProviderBase} from "./DanmakuProviderBase";

/**
 * Base class exposing common service of a danmaku.
 * This class must be inherited.
 */
export abstract class DanmakuBase extends DisplayObjectContainer {

    /**
     * Creates a new danmaku.
     * @param root {Stage}
     * @param parent {DisplayObjectContainer}
     * @param layoutManager {DanmakuLayoutManagerBase} The layout manager that will be used for reversed queries.
     */
    constructor(root:Stage, parent:DisplayObjectContainer, layoutManager:DanmakuLayoutManagerBase) {
        super(root, parent);
        this._layoutManager = layoutManager;
        this._danmakuProvider = layoutManager.danmakuProvider;
        this._bornTime = layoutManager.danmakuProvider.danmakuCoordinator.bulletproof.timeElapsed;
    }

    /**
     * Returns the content used to create this danmaku.
     * This method must be overridden.
     */
    abstract getContent():string;

    /**
     * Returns the displaying text of this danmaku. Could be empty.
     * This method must be overridden.
     */
    abstract getText():string;

    /**
     * Initialize this instance.
     * This method must be overridden.
     * @param content {String} The content used to create this danmaku.
     * @param time {Number} Current elapsed time, in milliseconds.
     */
    abstract initialize(content:string, time:number):void;

    /**
     * Gets the kind of this instance.
     * This property must be overridden.
     */
    get danmakuKind():DanmakuKind {
        throw new NotImplementedError();
    }

    /**
     * Gets the born time of this instance, in milliseconds.
     * @returns {Number}
     */
    get bornTime():number {
        return this._bornTime;
    }

    /**
     * Gets the life time of this instance, in seconds. The default value is
     * {@link Bulletproof.SIMPLE_DANMAKU_LIFE_TIME}. This property can be overridden to apply different life time
     * life time management strategies.
     * @returns {Number}
     */
    get lifeTime():number {
        return Bulletproof.SIMPLE_DANMAKU_LIFE_TIME;
    }

    /**
     * Gets the danmaku layout manager specified at the time of creation.
     * @returns {DanmakuLayoutManagerBase}
     */
    get layoutManager():DanmakuLayoutManagerBase {
        return this._layoutManager;
    }

    /**
     * Gets the danmaku provider of the danmaku layout manager specified at the time of creation.
     * @returns {DanmakuProviderBase}
     */
    get danmakuProvider():DanmakuProviderBase {
        return this._danmakuProvider;
    }

    protected _bornTime:number = 0;
    protected _layoutManager:DanmakuLayoutManagerBase = null;
    protected _danmakuProvider:DanmakuProviderBase = null;

}
