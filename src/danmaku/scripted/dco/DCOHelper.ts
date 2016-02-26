/**
 * Created by MIC on 2015/12/29.
 */

import {IGeneralCreateParams} from "../../../bilibili/danmaku_api/data_types/IGeneralCreateParams";
import {IDanmakuCreatedObject} from "./IDanmakuCreatedObject";
import {ICommentButtonCreateParams} from "../../../bilibili/danmaku_api/data_types/ICommentButtonCreateParams";
import {Bulletproof} from "../../../Bulletproof";
import {IMotionPropertyAnimation} from "../../../bilibili/danmaku_api/data_types/IMotionPropertyAnimation";
import {IMotion} from "../../../bilibili/danmaku_api/data_types/IMotion";
import {DisplayObject} from "../../../../lib/glantern/src/flash/display/DisplayObject";
import {GLUtil} from "../../../../lib/glantern/lib/glantern-utils/src/GLUtil";

export abstract class DCOHelper {

    static fillInCreateParams(bulletproof:Bulletproof, requestingObject:DisplayObject&IDanmakuCreatedObject, createParams:IGeneralCreateParams):IGeneralCreateParams {
        var r:IGeneralCreateParams = <any>Object.create(null);

        r.color = createParams.color;
        r.alpha = createParams.alpha;
        r.fontsize = createParams.fontsize;
        r.lifeTime = createParams.lifeTime !== undefined ? createParams.lifeTime : Number.MAX_VALUE;
        r.parent = createParams.parent;
        r.x = createParams.x;
        r.y = createParams.y;

        function __getMaximumLifeTime(motion:IMotion):{maxLife:number, literalMaxLife:number} {
            var motionAnimation:IMotionPropertyAnimation;
            var propertyNames:string[] = ["x", "y", "alpha", "rotationZ", "rotationY"];
            var maxLife:number = 0;
            var literalMaxLife:number = 0;
            for (var j = 0; j < propertyNames.length; ++j) {
                motionAnimation = <IMotionPropertyAnimation>(<any>motion)[propertyNames[j]];
                if (!GLUtil.isUndefinedOrNull(motionAnimation)) {
                    if (GLUtil.isUndefinedOrNull(motionAnimation.lifeTime)) {
                        motionAnimation.lifeTime = requestingObject.extraCreateParams.creator.lifeTime;
                    }
                    if (!GLUtil.isUndefinedOrNull(motionAnimation.startDelay)) {
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

        if (!GLUtil.isUndefinedOrNull(createParams.motion) && !GLUtil.isUndefinedOrNull(createParams.motionGroup)) {
            console.warn("'motion' and 'motionGroup' are both set!");
        }
        var now = bulletproof.timeElapsed;
        var life:{maxLife: number, literalMaxLife: number};
        var motion:IMotion;
        if (!GLUtil.isUndefinedOrNull(createParams.motion)) {
            motion = createParams.motion;
            motion.sourceObject = requestingObject;
            motion.createdTime = now;
            life = __getMaximumLifeTime(motion);
            motion.maximumLifeTime = life.maxLife;
        }
        if (!GLUtil.isUndefinedOrNull(createParams.motionGroup)) {
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

    static applyGeneralCreateParams(displayObject:DisplayObject&IDanmakuCreatedObject, createParams:IGeneralCreateParams):void {
        if (!GLUtil.isUndefinedOrNull(createParams.alpha)) {
            displayObject.alpha = createParams.alpha;
        }
        if (!GLUtil.isUndefinedOrNull(createParams.x)) {
            displayObject.x = createParams.x;
        }
        if (!GLUtil.isUndefinedOrNull(createParams.y)) {
            displayObject.y = createParams.y;
        }
    }

    static applyButtonCreateParams(displayObject:DisplayObject&IDanmakuCreatedObject, createParams:ICommentButtonCreateParams):void {
        DCOHelper.applyGeneralCreateParams(displayObject, createParams);
    }

}
