/**
 * Created by MIC on 2015/12/29.
 */
import IGeneralCreateParams from "../../../bilibili/danmaku_api/data_types/IGeneralCreateParams";
import IDanmakuCreatedObject from "./IDanmakuCreatedObject";
import ICommentButtonCreateParams from "../../../bilibili/danmaku_api/data_types/ICommentButtonCreateParams";
import Engine from "../../../mic/Engine";
import IMotionPropertyAnimation from "../../../bilibili/danmaku_api/data_types/IMotionPropertyAnimation";
import IMotion from "../../../bilibili/danmaku_api/data_types/IMotion";
import DisplayObject from "../../../../../lib/glantern/src/gl/flash/display/DisplayObject";
import CommonUtil from "../../../../../lib/glantern/src/gl/mic/CommonUtil";
import IDCExtraCreateParams from "./IDCExtraCreateParams";

abstract class DCOHelper {

    static fillInCreateParams<T extends IGeneralCreateParams>(engine: Engine, requestingObject: DisplayObject&IDanmakuCreatedObject, createParams: T): T {
        const r: T = Object.create(null);

        r.color = createParams.color;
        r.alpha = createParams.alpha;
        r.fontsize = createParams.fontsize;
        r.lifeTime = createParams.lifeTime !== undefined ? createParams.lifeTime : Number.MAX_VALUE;
        r.parent = createParams.parent;
        r.x = createParams.x;
        r.y = createParams.y;

        function __getMaximumLifeTime(motion: IMotion): {maxLife: number, literalMaxLife: number} {
            const propertyNames: string[] = ["x", "y", "alpha", "rotationZ", "rotationY"];
            let maxLife: number = 0;
            let literalMaxLife: number = 0;
            for (let j = 0; j < propertyNames.length; ++j) {
                const motionAnimation = <IMotionPropertyAnimation>(<any>motion)[propertyNames[j]];
                if (motionAnimation) {
                    if (CommonUtil.isUndefined(motionAnimation.lifeTime)) {
                        motionAnimation.lifeTime = engine.options.codeDanmakuLifeTimeSecs * 1000;
                    }
                    if (typeof motionAnimation.startDelay === "number") {
                        maxLife = Math.max(maxLife, motionAnimation.lifeTime * 1000 + motionAnimation.startDelay);
                    } else {
                        maxLife = Math.max(maxLife, motionAnimation.lifeTime * 1000);
                    }
                    literalMaxLife = Math.max(literalMaxLife, motionAnimation.lifeTime * 1000);
                }
            }
            return {
                maxLife: maxLife,
                literalMaxLife: literalMaxLife
            };
        }

        if (createParams.motion && createParams.motionGroup) {
            console.warn("'motion' and 'motionGroup' are both set!");
        }
        let now = engine.videoMillis;
        if (createParams.motion) {
            const motion = createParams.motion;
            motion.sourceObject = requestingObject;
            motion.createdTime = now;
            const life = __getMaximumLifeTime(motion);
            motion.maximumLifeTime = life.maxLife;
        }
        if (createParams.motionGroup) {
            for (let i = 0; i < createParams.motionGroup.length; ++i) {
                const motion = createParams.motionGroup[i];
                motion.sourceObject = requestingObject;
                motion.createdTime = now;
                const life = __getMaximumLifeTime(motion);
                motion.maximumLifeTime = life.maxLife;
                now += life.literalMaxLife;
            }
        }
        // Warning: shallow copy
        r.motion = createParams.motion;
        r.motionGroup = createParams.motionGroup;

        const handledProperties = ["color", "alpha", "fontsize", "lifeTime", "parent", "x", "y", "motion", "motionGroup"];
        for (const k in createParams) {
            if (Object.prototype.hasOwnProperty.call(createParams, k) && handledProperties.indexOf(k) < 0) {
                (<any>r)[k] = (<any>createParams)[k];
            }
        }

        return r;
    }

    static applyGeneralCreateParams(displayObject: DisplayObject&IDanmakuCreatedObject, createParams: IGeneralCreateParams): void {
        if (!CommonUtil.isUndefined(createParams.alpha)) {
            displayObject.alpha = createParams.alpha;
        }
        if (!CommonUtil.isUndefined(createParams.x)) {
            displayObject.x = createParams.x;
        }
        if (!CommonUtil.isUndefined(createParams.y)) {
            displayObject.y = createParams.y;
        }
    }

    static applyButtonCreateParams(displayObject: DisplayObject&IDanmakuCreatedObject, createParams: ICommentButtonCreateParams): void {
        DCOHelper.applyGeneralCreateParams(displayObject, createParams);
    }

    static getExtraCreateParams(): IDCExtraCreateParams {
        return {
            bornTime: Engine.instance.elapsedMillis
        };
    }

}

export default DCOHelper;
