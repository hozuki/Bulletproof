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

abstract class DCOHelper {

    static fillInCreateParams(engine: Engine, requestingObject: DisplayObject&IDanmakuCreatedObject, createParams: IGeneralCreateParams): IGeneralCreateParams {
        var r: IGeneralCreateParams = <any>Object.create(null);

        r.color = createParams.color;
        r.alpha = createParams.alpha;
        r.fontsize = createParams.fontsize;
        r.lifeTime = createParams.lifeTime !== undefined ? createParams.lifeTime : Number.MAX_VALUE;
        r.parent = createParams.parent;
        r.x = createParams.x;
        r.y = createParams.y;

        function __getMaximumLifeTime(motion: IMotion): {maxLife: number, literalMaxLife: number} {
            var motionAnimation: IMotionPropertyAnimation;
            var propertyNames: string[] = ["x", "y", "alpha", "rotationZ", "rotationY"];
            var maxLife: number = 0;
            var literalMaxLife: number = 0;
            for (var j = 0; j < propertyNames.length; ++j) {
                motionAnimation = <IMotionPropertyAnimation>(<any>motion)[propertyNames[j]];
                if (CommonUtil.ptr(motionAnimation)) {
                    if (CommonUtil.isUndefined(motionAnimation.lifeTime)) {
                        motionAnimation.lifeTime = requestingObject.extraCreateParams.creator.lifeTime;
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

        if (CommonUtil.ptr(createParams.motion) && CommonUtil.ptr(createParams.motionGroup)) {
            console.warn("'motion' and 'motionGroup' are both set!");
        }
        var now = engine.videoMillis;
        var life: {maxLife: number, literalMaxLife: number};
        var motion: IMotion;
        if (CommonUtil.ptr(createParams.motion)) {
            motion = createParams.motion;
            motion.sourceObject = requestingObject;
            motion.createdTime = now;
            life = __getMaximumLifeTime(motion);
            motion.maximumLifeTime = life.maxLife;
        }
        if (CommonUtil.ptr(createParams.motionGroup)) {
            for (var i = 0; i < createParams.motionGroup.length; ++i) {
                motion = createParams.motionGroup[i];
                motion.sourceObject = requestingObject;
                motion.createdTime = now;
                life = __getMaximumLifeTime(motion);
                motion.maximumLifeTime = life.maxLife;
                now += life.literalMaxLife;
            }
        }
        // Warning: shallow copy
        r.motion = createParams.motion;
        r.motionGroup = createParams.motionGroup;

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

}

export default DCOHelper;
