/**
 * Created by MIC on 2015/12/28.
 */

import {DanmakuKind} from "./DanmakuKind";
import {IDisposable} from "../../lib/glantern/src/IDisposable";
import {Point} from "../../lib/glantern/src/flash/geom/Point";
import {DanmakuBase} from "./DanmakuBase";
import {DanmakuProviderBase} from "./DanmakuProviderBase";
import {NotImplementedError} from "../../lib/glantern/src/_util/NotImplementedError";
import {_util} from "../../lib/glantern/src/_util/_util";

/**
 * Base class exposing common service of a danmaku layout manager.
 * A danmaku layout manager does layout calculation and performs optimized layout for danmakus of its kind.
 * In special situations, it can also do nothing and let the danmakus themselves to determine the best
 * layout, as in {@link CodeDanmakuLayoutManager}.
 * This class must be inherited.
 */
export abstract class DanmakuLayoutManagerBase implements IDisposable {

    /**
     * Creates a new danmaku layout manager.
     * @param provider {DanmakuProviderBase} The danmaku provider that will be attached to.
     */
    constructor(provider:DanmakuProviderBase) {
        this._danmakuProvider = provider;
        this._locationList = [];
    }

    /**
     * Calculates and returns the advised location of a danmaku, considering current situation. Return null if
     * the danmakus should decide their locations by themselves.
     * This method must be overridden.
     * @param danmaku
     */
    abstract getAdvisedLocation(danmaku:DanmakuBase):Point;

    /**
     * Calculates the best layout and sets the danmakus to their new locations.
     */
    performLayout():void {
        var danmakuList = this.danmakuProvider.danmakuList;
        while (this._locationList.length > 0) {
            this._locationList.pop();
        }
        var location:Point;

        // First pass: calculates the locations based on the snapshot of current situation.
        // Second pass: applies the layout.
        for (var i = 0; i < danmakuList.length; ++i) {
            location = this.getAdvisedLocation(danmakuList[i]);
            this._locationList.push(location);
        }
        for (var i = 0; i < danmakuList.length; ++i) {
            location = this._locationList[i];
            if (!_util.isUndefinedOrNull(location)) {
                danmakuList[i].x = location.x;
                danmakuList[i].y = location.y;
            }
        }
    }

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
     * Gets the danmaku provider specified at the time of creation.
     * @returns {DanmakuProviderBase}
     */
    get danmakuProvider():DanmakuProviderBase {
        return this._danmakuProvider;
    }

    protected _locationList:Point[] = null;
    protected _danmakuProvider:DanmakuProviderBase = null;

}
