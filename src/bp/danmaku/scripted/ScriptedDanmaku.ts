/**
 * Created by MIC on 2015/12/28.
 */

import DanmakuKind from "../DanmakuKind";
import ScriptedDanmakuLayoutManager from "./ScriptedDanmakuLayoutManager";
import Engine from "../../mic/Engine";
import IDanmakuCreatedObject from "./dco/IDanmakuCreatedObject";
import DanmakuApiContainer from "../../bilibili/DanmakuApiContainer";
import IMotion from "../../bilibili/danmaku_api/data_types/IMotion";
import IMotionPropertyAnimation from "../../bilibili/danmaku_api/data_types/IMotionPropertyAnimation";
import ScriptedDanmakuProvider from "./ScriptedDanmakuProvider";
import IDanmaku from "../IDanmaku";
import ScriptedDanmakuCreateParams from "./ScriptedDanmakuCreateParams";
import CommentData from "../../bilibili/danmaku_api/CommentData";
import DisplayObjectContainer from "../../../../lib/glantern/src/gl/flash/display/DisplayObjectContainer";
import Stage from "../../../../lib/glantern/src/gl/flash/display/Stage";
import WebGLRenderer from "../../../../lib/glantern/src/gl/webgl/WebGLRenderer";
import DisplayObject from "../../../../lib/glantern/src/gl/flash/display/DisplayObject";
import ScriptedDanmakuLayer from "./ScriptedDanmakuLayer";
import TimeInfo from "../../../../lib/glantern/src/gl/mic/TimeInfo";
import CommonUtil from "../../../../lib/glantern/src/gl/mic/CommonUtil";

export default class ScriptedDanmaku extends DisplayObjectContainer implements IDanmaku {

    constructor(root: Stage, parent: DisplayObjectContainer, layoutManager: ScriptedDanmakuLayoutManager, createParams: ScriptedDanmakuCreateParams) {
        super(root, parent);
        this._layoutManager = layoutManager;
        this._danmakuProvider = layoutManager.danmakuProvider;
        this._engine = layoutManager.engine;
        this._createParams = createParams;
        this._layer = this.danmakuProvider.layer;
    }

    clearElements(): void {
        while (this.numChildren > 0) {
            this.removeChildAt(0);
        }
    }

    dispose(): void {
        var scriptManager = this.apiContainer.api.ScriptManager;
        scriptManager.clearEl();
        scriptManager.clearTimer();
        scriptManager.clearTrigger();
        this.clearElements();
        this.parent.removeChild(this);
        super.dispose();
    }

    get danmakuKind(): DanmakuKind {
        return DanmakuKind.Scripted;
    }

    get layoutManager(): ScriptedDanmakuLayoutManager {
        return this._layoutManager;
    }

    get danmakuProvider(): ScriptedDanmakuProvider {
        return this._danmakuProvider;
    }

    getContent(): string {
        return this._content;
    }

    getText(): string {
        // No readable text.
        return "";
    }

    get layer(): ScriptedDanmakuLayer {
        return this._layer;
    }

    initialize(content: string, time: number): void {
        this._content = content;
        this._bornTime = typeof this.createParams.bornTime === "number" ? this.createParams.bornTime : time;
        this._apiContainer = new DanmakuApiContainer(this);
    }

    get executed(): boolean {
        return this._executed;
    }

    execute(): void {
        if (!this._executed) {
            if (this.__censor()) {
                this._lambda = this.__buildFunction();
                this.__applyFunction();
                this._executed = true;
            }
        }
    }

    get apiContainer(): DanmakuApiContainer {
        return this._apiContainer;
    }

    get createParams(): ScriptedDanmakuCreateParams {
        return this._createParams;
    }

    get engine(): Engine {
        return this._engine;
    }

    get bornTime(): number {
        return this._bornTime;
    }

    get lifeTime(): number {
        return this.engine.options.codeDanmakuLifeTimeSecs;
    }

    getCommentData(): CommentData {
        return {
            txt: this.getContent(),
            time: this.bornTime.toString(),
            color: 0x000000,
            pool: this.danmakuProvider.pool,
            mode: 8,
            fontSize: 0
        };
    }

    get right(): number {
        return this.x + this.width;
    }

    get bottom(): number {
        return this.y + this.height;
    }

    protected _$update(timeInfo: TimeInfo): void {
        this.__removeDeadDCObjects();
        this.__applyMotionGroups();
    }

    protected _$render(renderer: WebGLRenderer): void {
        // Do nothing, let children render themselves.
    }

    private __applyMotionGroups(): void {
        var child: DisplayObject&IDanmakuCreatedObject;
        var now = this.engine.videoMillis;
        for (var i = 0; i < this._children.length; ++i) {
            child = <DisplayObject&IDanmakuCreatedObject><any>this._children[i];
            if (child.isCreatedByDanmaku) {
                if (CommonUtil.ptr(child.createParams.motion)) {
                    ScriptedDanmaku.__applyMotion(child.createParams.motion, now);
                } else if (CommonUtil.ptr(child.createParams.motionGroup)) {
                    ScriptedDanmaku.__applyMotionGroup(child.createParams.motionGroup, now);
                }
            }
        }
    }

    private static __applyMotionGroup(motionGroup: IMotion[], now: number): void {
        var motion: IMotion;
        if (CommonUtil.ptr(motionGroup)) {
            //console.log("Calculating: ", obj, " on ", now);
            for (var i = 0; i < motionGroup.length; ++i) {
                motion = motionGroup[i];
                ScriptedDanmaku.__applyMotion(motion, now);
            }
        }
    }

    private static __applyMotion(motion: IMotion, now: number): void {
        var propertyNames: string[] = ["x", "y", "alpha", "rotationZ", "rotationY"];
        var motionAnimation: IMotionPropertyAnimation;
        var relativeTime: number;
        var value: number;
        if (motion.createdTime <= now && now <= motion.createdTime + motion.maximumLifeTime) {
            for (var j = 0; j < propertyNames.length; ++j) {
                motionAnimation = <IMotionPropertyAnimation>(<any>motion)[propertyNames[j]];
                if (CommonUtil.ptr(motionAnimation)) {
                    relativeTime = now - motion.createdTime;
                    if (!CommonUtil.isUndefined(motionAnimation.startDelay)) {
                        relativeTime -= motionAnimation.startDelay;
                    }
                    if (relativeTime <= motionAnimation.lifeTime * 1000) {
                        // TODO: property 'repeat' is ignored here.
                        // TODO: easing usage is always interpreted as linear here.
                        value = motionAnimation.fromValue +
                            (motionAnimation.toValue - motionAnimation.fromValue) / (motionAnimation.lifeTime * 1000) * relativeTime;
                        (<any>motion.sourceObject)[propertyNames[j]] = value;
                    }
                }
            }
        }
    }

    private __removeDeadDCObjects(): void {
        var bulletproof = this._engine;
        var child: DisplayObject&IDanmakuCreatedObject;
        for (var i = 0; i < this._children.length; ++i) {
            child = <DisplayObject&IDanmakuCreatedObject><any>this._children[i];
            if (child.isCreatedByDanmaku) {
                if (child.extraCreateParams.bornTime + child.createParams.lifeTime * 1000 < bulletproof.videoMillis) {
                    this.removeChild(child);
                    child.dispose();
                    --i;
                }
            }
        }
    }

    private __buildFunction(): Function {
        // Weak defense is better than none.
        // TODO: Use WebWorker to create a safety sandbox.
        var api = this._apiContainer.api;
        var thisApiNames: string[] = this._apiNames = [];
        var apiNames = Object.keys(api);
        for (var i = 0; i < apiNames.length; ++i) {
            thisApiNames.push(apiNames[i]);
        }
        var funcArgs = thisApiNames.concat(this._content);
        return Function.prototype.constructor.apply(Object.create(null), funcArgs);
    }

    private __applyFunction(): void {
        var ac = this._apiContainer;
        var apiValues: any[] = [];
        for (var i = 0; i < this._apiNames.length; ++i) {
            apiValues.push((<any>ac.api)[this._apiNames[i]]);
        }
        this._lambda.apply(null, apiValues);
    }

    private __censor(): boolean {
        return true;
    }

    private _apiNames: string[] = null;
    private _apiContainer: DanmakuApiContainer = null;
    private _lambda: Function = null;
    private _content: string = null;
    private _bornTime: number = 0;
    private _engine: Engine = null;
    private _layoutManager: ScriptedDanmakuLayoutManager = null;
    private _danmakuProvider: ScriptedDanmakuProvider = null;
    private _layer: ScriptedDanmakuLayer = null;
    private _createParams: ScriptedDanmakuCreateParams = null;
    private _executed: boolean = false;

}
