/**
 * Created by MIC on 2015/12/29.
 */
var _util_1 = require("../../../../lib/glantern/src/_util/_util");
var Bulletproof_1 = require("../../../Bulletproof");
var DCOHelper = (function () {
    function DCOHelper() {
    }
    DCOHelper.fillInCreateParams = function (bulletproof, requestingObject, createParams) {
        var r = Object.create(null);
        r.color = createParams.color;
        r.alpha = createParams.alpha;
        r.fontsize = createParams.fontsize;
        r.lifeTime = createParams.lifeTime !== undefined ? createParams.lifeTime : Number.MAX_VALUE;
        r.parent = createParams.parent;
        r.x = createParams.x;
        r.y = createParams.y;
        function __getMaximumLifeTime(motion) {
            var motionAnimation;
            var propertyNames = ["x", "y", "alpha", "rotationZ", "rotationY"];
            var maxLife = 0;
            var literalMaxLife = 0;
            for (var j = 0; j < propertyNames.length; ++j) {
                motionAnimation = motion[propertyNames[j]];
                if (!_util_1._util.isUndefinedOrNull(motionAnimation)) {
                    if (_util_1._util.isUndefinedOrNull(motionAnimation.lifeTime)) {
                        motionAnimation.lifeTime = Bulletproof_1.Bulletproof.CODE_DANMAKU_LIFE_TIME;
                    }
                    if (!_util_1._util.isUndefinedOrNull(motionAnimation.startDelay)) {
                        maxLife = Math.max(maxLife, motionAnimation.lifeTime * 1000 + motionAnimation.startDelay);
                    }
                    else {
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
        if (!_util_1._util.isUndefinedOrNull(createParams.motion) && !_util_1._util.isUndefinedOrNull(createParams.motionGroup)) {
            console.warn("'motion' and 'motionGroup' are both set!");
        }
        var now = bulletproof.timeElapsed;
        var life;
        var motion;
        if (!_util_1._util.isUndefinedOrNull(createParams.motion)) {
            motion = createParams.motion;
            motion.sourceObject = requestingObject;
            motion.createdTime = now;
            life = __getMaximumLifeTime(motion);
            motion.maximumLifeTime = life.maxLife;
        }
        if (!_util_1._util.isUndefinedOrNull(createParams.motionGroup)) {
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
    };
    DCOHelper.applyGeneralCreateParams = function (displayObject, createParams) {
        if (!_util_1._util.isUndefinedOrNull(createParams.alpha)) {
            displayObject.alpha = createParams.alpha;
        }
        if (!_util_1._util.isUndefinedOrNull(createParams.x)) {
            displayObject.x = createParams.x;
        }
        if (!_util_1._util.isUndefinedOrNull(createParams.y)) {
            displayObject.y = createParams.y;
        }
    };
    DCOHelper.applyButtonCreateParams = function (displayObject, createParams) {
        DCOHelper.applyGeneralCreateParams(displayObject, createParams);
    };
    return DCOHelper;
})();
exports.DCOHelper = DCOHelper;

//# sourceMappingURL=DCOHelper.js.map
