/**
 * Created by MIC on 2016/2/2.
 */

import {Bulletproof} from "../Bulletproof";
import {DanmakuKind} from "./DanmakuKind";
import {DanmakuLayoutManagerBase} from "./DanmakuLayoutManagerBase";
import {DanmakuProviderBase} from "./DanmakuProviderBase";
import {Point} from "../../lib/glantern/src/flash/geom/Point";
import {IDisposable} from "../../lib/glantern/src/IDisposable";
import {CommentData} from "../bilibili/danmaku_api/CommentData";

export interface IDanmaku extends IDisposable {

    /**
     * Returns the content used to create this danmaku.
     * This method must be overridden.
     * @returns {String}
     */
    getContent():string;
    /**
     * Returns the displaying text of this danmaku. Could be empty.
     * This method must be overridden.
     * @returns {String}
     */
    getText():string;
    /**
     * Initialize this instance.
     * This method must be overridden.
     * @param content {String} The content used to create this danmaku.
     * @param time {Number} Current elapsed time, in milliseconds.
     */
    initialize(content:string, time:number):void;
    /**
     * Gets the Bulletproof instance that manages the danmaku.
     * @type {Bulletproof}
     */
    bulletproof:Bulletproof;
    /**
     * Gets the kind of this instance.
     * This property must be overridden.
     * @type {DanmakuKind}
     */
    danmakuKind:DanmakuKind;
    /**
     * Gets the born time of this instance, in milliseconds.
     * @type {Number}
     */
    bornTime:number;
    /**
     * Gets the life time of this instance, in seconds. The default value is
     * {@link BulletproofConfig.simpleDanmakuLifeTimeSecs}. This property can be overridden to apply different life time
     * management strategies.
     * @type {Number}
     */
    lifeTime:number;
    /**
     * Gets the danmaku layout manager specified at the time of creation.
     * @type {DanmakuLayoutManagerBase}
     */
    layoutManager:DanmakuLayoutManagerBase;
    /**
     * Gets the danmaku provider of the danmaku layout manager specified at the time of creation.
     * @type {DanmakuProviderBase}
     */
    danmakuProvider:DanmakuProviderBase;
    /**
     * Gets/sets whether the danmaku is visible.
     * @type {Boolean}
     */
    visible:boolean;
    /**
     * Generates and returns the information of this danmaku in {@link CommentData} format.
     * @returns {CommentData}
     */
    getCommentData():CommentData;

}
