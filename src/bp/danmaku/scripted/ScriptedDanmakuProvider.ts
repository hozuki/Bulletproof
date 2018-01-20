/**
 * Created by MIC on 2015/12/28.
 */
// Damn you TypeScript
import * as vm from "vm";
import DanmakuProviderBase from "../DanmakuProviderBase";
import DanmakuKind from "../DanmakuKind";
import ScriptedDanmakuLayoutManager from "./ScriptedDanmakuLayoutManager";
import DanmakuController from "../DanmakuController";
import ScriptedDanmaku from "./ScriptedDanmaku";
import DanmakuProviderFlag from "../DanmakuProviderFlag";
import ScriptedDanmakuLayer from "./ScriptedDanmakuLayer";
import ScriptedDanmakuCreateParams from "./ScriptedDanmakuCreateParams";
import IDanmaku from "../IDanmaku";
import TimeInfoEx from "../../mic/TimeInfoEx";
import CommonUtil from "../../../../lib/glantern/src/gl/mic/CommonUtil";
import BiliApiContract from "../../bilibili/BiliApiContract";
import DisplayObject from "../../../../lib/glantern/src/gl/flash/display/DisplayObject";
import IDanmakuCreatedObject from "./dco/IDanmakuCreatedObject";
import IMotion from "../../bilibili/danmaku_api/data_types/IMotion";
import IMotionPropertyAnimation from "../../bilibili/danmaku_api/data_types/IMotionPropertyAnimation";
import ApplicationError from "../../../../lib/glantern/src/gl/flash/errors/ApplicationError";
import ScriptManager from "../../bilibili/danmaku_api/ScriptManager";
import Player from "../../bilibili/danmaku_api/Player";

/**
 * An implementation of {@link DanmakuProviderBase}, for managing code damakus.
 */
export default class ScriptedDanmakuProvider extends DanmakuProviderBase {

    constructor(controller: DanmakuController) {
        super(controller);
        if (ScriptedDanmakuProvider.instance) {
            throw new ApplicationError("A ScriptedDanamkuProvider is already created.");
        }
        this._layoutManager = new ScriptedDanmakuLayoutManager(this);
        this._createdElements = [];
        this._scriptContext = vm.createContext(BiliApiContract);
        ScriptedDanmakuProvider._instance = this;
        // TODO: SO UGLY!
        ScriptManager.$init();
        Player.$init();
    }

    eval(code: string): void {
        vm.runInContext(code, this._scriptContext);
    }

    get danmakuKind(): DanmakuKind {
        return DanmakuKind.Scripted;
    }

    addDanmaku(content: string, args?: ScriptedDanmakuCreateParams): IDanmaku {
        return super.addDanmaku(content, args);
    }

    dispose(): void {
        const layer = this.layer;
        while (layer.numChildren > 0) {
            const child = layer.getChildAt(0);
            layer.removeChildAt(0);
            child.dispose();
        }
        layer.parent.removeChild(this.layer);
        layer.dispose();
        this.layoutManager.dispose();
        this._layoutManager = null;
        const displayingDanmakuList = this.displayingDanmakuList;
        for (let i = 0; i < displayingDanmakuList.length; ++i) {
            displayingDanmakuList[i].dispose();
        }
        while (displayingDanmakuList.length > 0) {
            displayingDanmakuList.pop();
        }
        this._layer = null;
        this._displayingDanmakuList = null;
    }

    initialize(): void {
        super.initialize();
        const stage = this.engine.stage;
        this._layer = new ScriptedDanmakuLayer(stage, stage);
        stage.addChild(this.layer);
    }

    canCreateDanmaku(args?: any): boolean {
        return true;
    }

    removeDanmaku(danmaku: ScriptedDanmaku): boolean {
        const index = this.displayingDanmakuList.indexOf(danmaku);
        if (index < 0) {
            return false;
        } else {
            CommonUtil.removeAt(this.displayingDanmakuList, index);
            danmaku.dispose();
            return true;
        }
    }

    isDanmakuDead(timeInfo: TimeInfoEx, danmaku: ScriptedDanmaku): boolean {
        const now = timeInfo.millisOfVideo;
        if (now < danmaku.bornTime) {
            return danmaku.isExecuted;
        } else {
            return danmaku.bornTime + danmaku.lifeTime * 1000 < now;
        }
    }

    update(timeInfo: TimeInfoEx): void {
        super.update(timeInfo);
        const now = timeInfo.millisOfVideo;
        for (let i = 0; i < this.displayingDanmakuList.length; ++i) {
            const danmaku = this.displayingDanmakuList[i];
            if (!danmaku.isExecuted && now >= danmaku.bornTime) {
                danmaku.execute();
            }
        }
        this.__removeDeadDCObjects();
        this.__applyMotionGroups();
    }

    updateDisplayingDanmakuList(timeInfo: TimeInfoEx): void {
        for (let i = 0; i < this.displayingDanmakuList.length; ++i) {
            const danmaku = this.displayingDanmakuList[i];
            if (this.isDanmakuDead(timeInfo, danmaku)) {
                this.removeDanmaku(danmaku);
                --i;
            }
        }
    }

    get layoutManager(): ScriptedDanmakuLayoutManager {
        return this._layoutManager;
    }

    get displayingDanmakuList(): ScriptedDanmaku[] {
        return this._displayingDanmakuList;
    }

    get fullDanmakuList(): ScriptedDanmaku[] {
        return this._displayingDanmakuList;
    }

    get layer(): ScriptedDanmakuLayer {
        return this._layer;
    }

    get flags(): DanmakuProviderFlag {
        return DanmakuProviderFlag.UnlimitedCreation;
    }

    get scriptContext(): vm.Context {
        return this._scriptContext;
    }

    static get instance(): ScriptedDanmakuProvider {
        return ScriptedDanmakuProvider._instance;
    }

    registerElement(element: DisplayObject&IDanmakuCreatedObject): void {
        if (this._createdElements.indexOf(element) < 0) {
            this._createdElements.push(element);
        }
    }

    protected _$addDanmaku(content: string, args?: ScriptedDanmakuCreateParams): ScriptedDanmaku {
        if (!args) {
            args = CommonUtil.deepClone(this.engine.options) as ScriptedDanmakuCreateParams;
        }
        const danmaku = new ScriptedDanmaku(this.layoutManager, args);
        danmaku.initialize(content, this.engine.videoMillis);
        this.displayingDanmakuList.push(danmaku);
        return danmaku;
    }

    private __applyMotionGroups(): void {
        const now = this.engine.videoMillis;
        const elements = this._createdElements;
        for (let i = 0; i < elements.length; ++i) {
            const child = <DisplayObject&IDanmakuCreatedObject>elements[i];
            if (child.isCreatedByDanmaku) {
                if (child.createParams.motion) {
                    ScriptedDanmakuProvider.__applyMotion(child.createParams.motion, now);
                } else if (child.createParams.motionGroup) {
                    ScriptedDanmakuProvider.__applyMotionGroup(child.createParams.motionGroup, now);
                }
            }
        }
    }

    private static __applyMotionGroup(motionGroup: IMotion[], now: number): void {
        if (motionGroup) {
            //console.log("Calculating: ", obj, " on ", now);
            for (let i = 0; i < motionGroup.length; ++i) {
                const motion = motionGroup[i];
                ScriptedDanmakuProvider.__applyMotion(motion, now);
            }
        }
    }

    private static __applyMotion(motion: IMotion, now: number): void {
        const propertyNames = ["x", "y", "alpha", "rotationZ", "rotationY"];
        if (motion.createdTime <= now && now <= motion.createdTime + motion.maximumLifeTime) {
            for (let j = 0; j < propertyNames.length; ++j) {
                const motionAnimation = <IMotionPropertyAnimation>(<any>motion)[propertyNames[j]];
                if (motionAnimation) {
                    let relativeTime = now - motion.createdTime;
                    if (!CommonUtil.isUndefined(motionAnimation.startDelay)) {
                        relativeTime -= motionAnimation.startDelay;
                    }
                    if (relativeTime <= motionAnimation.lifeTime * 1000) {
                        // TODO: property 'repeat' is ignored here.
                        // TODO: easing usage is always interpreted as linear here.
                        const value = motionAnimation.fromValue +
                            (motionAnimation.toValue - motionAnimation.fromValue) / (motionAnimation.lifeTime * 1000) * relativeTime;
                        (<any>motion.sourceObject)[propertyNames[j]] = value;
                    }
                }
            }
        }
    }

    private __removeDeadDCObjects(): void {
        const engine = this.engine;
        const elements = this._createdElements;
        for (let i = 0; i < elements.length; ++i) {
            const child = <DisplayObject&IDanmakuCreatedObject>elements[i];
            if (!child.isCreatedByDanmaku) {
                continue;
            }
            if (child.extraCreateParams.bornTime + child.createParams.lifeTime * 1000 < engine.videoMillis) {
                CommonUtil.removeAt(this._createdElements, i);
                child.parent.removeChild(child);
                child.dispose();
                --i;
            }
        }
    }

    protected _displayingDanmakuList: ScriptedDanmaku[];
    protected _layoutManager: ScriptedDanmakuLayoutManager;
    protected _layer: ScriptedDanmakuLayer;
    private _scriptContext: vm.Context = null;
    private _createdElements: (DisplayObject&IDanmakuCreatedObject)[] = null;
    private static _instance: ScriptedDanmakuProvider = null;

}
