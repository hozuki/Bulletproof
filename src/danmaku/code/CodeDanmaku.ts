/**
 * Created by MIC on 2015/12/28.
 */

import {DanmakuKind} from "../DanmakuKind";
import {CodeDanmakuLayoutManager} from "./CodeDanmakuLayoutManager";
import {WebGLRenderer} from "../../../lib/glantern/src/webgl/WebGLRenderer";
import {NotImplementedError} from "../../../lib/glantern/src/_util/NotImplementedError";
import {Stage} from "../../../lib/glantern/src/flash/display/Stage";
import {DisplayObjectContainer} from "../../../lib/glantern/src/flash/display/DisplayObjectContainer";
import {Bulletproof} from "../../Bulletproof";
import {DisplayObject} from "../../../lib/glantern/src/flash/display/DisplayObject";
import {IDanmakuCreatedObject} from "./dco/IDanmakuCreatedObject";
import {BiliBiliDanmakuApiContainer} from "../../bilibili/BiliBiliDanmakuApiContainer";
import {IMotion} from "../../bilibili/danmaku_api/data_types/IMotion";
import {IMotionPropertyAnimation} from "../../bilibili/danmaku_api/data_types/IMotionPropertyAnimation";
import {_util} from "../../../lib/glantern/src/_util/_util";
import {CodeDanmakuProvider} from "./CodeDanmakuProvider";
import {IDanmaku} from "../IDanmaku";
import {Point} from "../../../lib/glantern/src/flash/geom/Point";
import {ICodeDanmakuCreateParams} from "./ICodeDanmakuCreateParams";
import {CommentData} from "../../bilibili/danmaku_api/CommentData";

export class CodeDanmaku extends DisplayObjectContainer implements IDanmaku {

    constructor(root:Stage, parent:DisplayObjectContainer, layoutManager:CodeDanmakuLayoutManager, createParams:ICodeDanmakuCreateParams) {
        super(root, parent);
        this._layoutManager = layoutManager;
        this._danmakuProvider = layoutManager.danmakuProvider;
        this._bulletproof = layoutManager.bulletproof;
        this._createParams = createParams;
    }

    dispose():void {
        this.parent.removeChild(this);
        super.dispose();
    }

    get danmakuKind():DanmakuKind {
        return DanmakuKind.Code;
    }

    get layoutManager():CodeDanmakuLayoutManager {
        return this._layoutManager;
    }

    get danmakuProvider():CodeDanmakuProvider {
        return this._danmakuProvider;
    }

    getContent():string {
        return this._content;
    }

    getText():string {
        // No readable text.
        return "";
    }

    initialize(content:string, time:number):void {
        this._content = content;
        this._bornTime = typeof this.createParams.bornTime === "number" ? this.createParams.bornTime : time;
        this._apiContainer = new BiliBiliDanmakuApiContainer(this);
    }

    get executed():boolean {
        return this._executed;
    }

    execute():void {
        if (!this._executed) {
            if (this.__censor()) {
                this._lambda = this.__buildFunction();
                this.__applyFunction();
                this._executed = true;
            }
        }
    }

    get createParams():ICodeDanmakuCreateParams {
        return this._createParams;
    }

    get bulletproof():Bulletproof {
        return this._bulletproof;
    }

    get bornTime():number {
        return this._bornTime;
    }

    get lifeTime():number {
        return this.bulletproof.config.codeDanmakuLifeTimeSecs;
    }

    getCommentData():CommentData {
        return {
            txt: this.getContent(),
            time: this.bornTime.toString(),
            color: 0x000000,
            pool: 0,
            mode: 8,
            fontSize: 0
        };
    }

    private __censor():boolean {
        return true;
    }

    protected __update():void {
        this.__removeDeadDCObjects();
        this.__applyMotionGroups();
    }

    protected __render(renderer:WebGLRenderer):void {
        // Do nothing, let children render themselves.
    }

    private __buildFunction():Function {
        // Weak defense is better than none.
        // TODO: Use WebWorker to create a safety sandbox.
        var api = this._apiContainer.api;
        this._apiNames = [];
        for (var apiName in api) {
            this._apiNames.push(apiName);
        }
        var funcArgs = this._apiNames.concat(this._content);
        return Function.prototype.constructor.apply(Object.create(null), funcArgs);
    }

    private __applyFunction():void {
        var ac = this._apiContainer;
        var apiValues:any[] = [];
        for (var i = 0; i < this._apiNames.length; ++i) {
            apiValues.push((<any>ac.api)[this._apiNames[i]]);
        }
        this._lambda.apply(null, apiValues);
    }

    protected __applyMotionGroups():void {
        var child:DisplayObject&IDanmakuCreatedObject;
        var time = this.bulletproof.timeElapsed;
        for (var i = 0; i < this._children.length; ++i) {
            child = <DisplayObject&IDanmakuCreatedObject><any>this._children[i];
            if (child.isCreatedByDanmaku) {
                if (!_util.isUndefinedOrNull(child.createParams.motion)) {
                    CodeDanmaku.__applyMotion(child.createParams.motion, time);
                } else if (!_util.isUndefinedOrNull(child.createParams.motionGroup)) {
                    CodeDanmaku.__applyMotionGroup(child.createParams.motionGroup, time);
                }
            }
        }
    }

    protected static __applyMotionGroup(motionGroup:IMotion[], now:number):void {
        var motion:IMotion;
        if (!_util.isUndefinedOrNull(motionGroup)) {
            //console.log("Calculating: ", obj, " on ", now);
            for (var i = 0; i < motionGroup.length; ++i) {
                motion = motionGroup[i];
                CodeDanmaku.__applyMotion(motion, now);
            }
        }
    }

    protected static __applyMotion(motion:IMotion, now:number):void {
        var propertyNames:string[] = ["x", "y", "alpha", "rotationZ", "rotationY"];
        var motionAnimation:IMotionPropertyAnimation;
        var relativeTime:number;
        var value:number;
        if (motion.createdTime <= now && now <= motion.createdTime + motion.maximumLifeTime) {
            for (var j = 0; j < propertyNames.length; ++j) {
                motionAnimation = <IMotionPropertyAnimation>(<any>motion)[propertyNames[j]];
                if (!_util.isUndefinedOrNull(motionAnimation)) {
                    relativeTime = now - motion.createdTime;
                    if (!_util.isUndefinedOrNull(motionAnimation.startDelay)) {
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

    protected __removeDeadDCObjects():void {
        var bulletproof = this._bulletproof;
        var child:DisplayObject&IDanmakuCreatedObject;
        for (var i = 0; i < this._children.length; ++i) {
            child = <DisplayObject&IDanmakuCreatedObject><any>this._children[i];
            if (child.isCreatedByDanmaku) {
                if (child.extraCreateParams.bornTime + child.createParams.lifeTime * 1000 < bulletproof.timeElapsed) {
                    this.removeChild(child);
                    child.dispose();
                    --i;
                }
            }
        }
    }

    private _apiNames:string[] = null;
    private _apiContainer:BiliBiliDanmakuApiContainer = null;
    private _lambda:Function = null;
    private _content:string = null;
    private _bornTime:number = 0;
    private _bulletproof:Bulletproof = null;
    private _layoutManager:CodeDanmakuLayoutManager = null;
    private _danmakuProvider:CodeDanmakuProvider = null;
    private _createParams:ICodeDanmakuCreateParams = null;
    private _executed:boolean = false;

}
