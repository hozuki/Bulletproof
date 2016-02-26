/**
 * Created by MIC on 2015/12/28.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DanmakuKind_1 = require("../DanmakuKind");
var BiliBiliDanmakuApiContainer_1 = require("../../bilibili/BiliBiliDanmakuApiContainer");
var DisplayObjectContainer_1 = require("../../../lib/glantern/src/flash/display/DisplayObjectContainer");
var GLUtil_1 = require("../../../lib/glantern/lib/glantern-utils/src/GLUtil");
var ScriptedDanmaku = (function (_super) {
    __extends(ScriptedDanmaku, _super);
    function ScriptedDanmaku(root, parent, layoutManager, createParams) {
        _super.call(this, root, parent);
        this._apiNames = null;
        this._apiContainer = null;
        this._lambda = null;
        this._content = null;
        this._bornTime = 0;
        this._bulletproof = null;
        this._layoutManager = null;
        this._danmakuProvider = null;
        this._createParams = null;
        this._executed = false;
        this._layoutManager = layoutManager;
        this._danmakuProvider = layoutManager.danmakuProvider;
        this._bulletproof = layoutManager.bulletproof;
        this._createParams = createParams;
    }
    ScriptedDanmaku.prototype.dispose = function () {
        this.parent.removeChild(this);
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(ScriptedDanmaku.prototype, "danmakuKind", {
        get: function () {
            return DanmakuKind_1.DanmakuKind.Scripted;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScriptedDanmaku.prototype, "layoutManager", {
        get: function () {
            return this._layoutManager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScriptedDanmaku.prototype, "danmakuProvider", {
        get: function () {
            return this._danmakuProvider;
        },
        enumerable: true,
        configurable: true
    });
    ScriptedDanmaku.prototype.getContent = function () {
        return this._content;
    };
    ScriptedDanmaku.prototype.getText = function () {
        // No readable text.
        return "";
    };
    ScriptedDanmaku.prototype.initialize = function (content, time) {
        this._content = content;
        this._bornTime = typeof this.createParams.bornTime === "number" ? this.createParams.bornTime : time;
        this._apiContainer = new BiliBiliDanmakuApiContainer_1.BiliBiliDanmakuApiContainer(this);
    };
    Object.defineProperty(ScriptedDanmaku.prototype, "executed", {
        get: function () {
            return this._executed;
        },
        enumerable: true,
        configurable: true
    });
    ScriptedDanmaku.prototype.execute = function () {
        if (!this._executed) {
            if (this.__censor()) {
                this._lambda = this.__buildFunction();
                this.__applyFunction();
                this._executed = true;
            }
        }
    };
    Object.defineProperty(ScriptedDanmaku.prototype, "createParams", {
        get: function () {
            return this._createParams;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScriptedDanmaku.prototype, "bulletproof", {
        get: function () {
            return this._bulletproof;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScriptedDanmaku.prototype, "bornTime", {
        get: function () {
            return this._bornTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScriptedDanmaku.prototype, "lifeTime", {
        get: function () {
            return this.bulletproof.config.codeDanmakuLifeTimeSecs;
        },
        enumerable: true,
        configurable: true
    });
    ScriptedDanmaku.prototype.getCommentData = function () {
        return {
            txt: this.getContent(),
            time: this.bornTime.toString(),
            color: 0x000000,
            pool: 0,
            mode: 8,
            fontSize: 0
        };
    };
    ScriptedDanmaku.prototype.__censor = function () {
        return true;
    };
    ScriptedDanmaku.prototype.__update = function () {
        this.__removeDeadDCObjects();
        this.__applyMotionGroups();
    };
    ScriptedDanmaku.prototype.__render = function (renderer) {
        // Do nothing, let children render themselves.
    };
    ScriptedDanmaku.prototype.__buildFunction = function () {
        // Weak defense is better than none.
        // TODO: Use WebWorker to create a safety sandbox.
        var api = this._apiContainer.api;
        this._apiNames = [];
        for (var apiName in api) {
            this._apiNames.push(apiName);
        }
        var funcArgs = this._apiNames.concat(this._content);
        return Function.prototype.constructor.apply(Object.create(null), funcArgs);
    };
    ScriptedDanmaku.prototype.__applyFunction = function () {
        var ac = this._apiContainer;
        var apiValues = [];
        for (var i = 0; i < this._apiNames.length; ++i) {
            apiValues.push(ac.api[this._apiNames[i]]);
        }
        this._lambda.apply(null, apiValues);
    };
    ScriptedDanmaku.prototype.__applyMotionGroups = function () {
        var child;
        var time = this.bulletproof.timeElapsed;
        for (var i = 0; i < this._children.length; ++i) {
            child = this._children[i];
            if (child.isCreatedByDanmaku) {
                if (!GLUtil_1.GLUtil.isUndefinedOrNull(child.createParams.motion)) {
                    ScriptedDanmaku.__applyMotion(child.createParams.motion, time);
                }
                else if (!GLUtil_1.GLUtil.isUndefinedOrNull(child.createParams.motionGroup)) {
                    ScriptedDanmaku.__applyMotionGroup(child.createParams.motionGroup, time);
                }
            }
        }
    };
    ScriptedDanmaku.__applyMotionGroup = function (motionGroup, now) {
        var motion;
        if (!GLUtil_1.GLUtil.isUndefinedOrNull(motionGroup)) {
            //console.log("Calculating: ", obj, " on ", now);
            for (var i = 0; i < motionGroup.length; ++i) {
                motion = motionGroup[i];
                ScriptedDanmaku.__applyMotion(motion, now);
            }
        }
    };
    ScriptedDanmaku.__applyMotion = function (motion, now) {
        var propertyNames = ["x", "y", "alpha", "rotationZ", "rotationY"];
        var motionAnimation;
        var relativeTime;
        var value;
        if (motion.createdTime <= now && now <= motion.createdTime + motion.maximumLifeTime) {
            for (var j = 0; j < propertyNames.length; ++j) {
                motionAnimation = motion[propertyNames[j]];
                if (!GLUtil_1.GLUtil.isUndefinedOrNull(motionAnimation)) {
                    relativeTime = now - motion.createdTime;
                    if (!GLUtil_1.GLUtil.isUndefinedOrNull(motionAnimation.startDelay)) {
                        relativeTime -= motionAnimation.startDelay;
                    }
                    if (relativeTime <= motionAnimation.lifeTime * 1000) {
                        // TODO: property 'repeat' is ignored here.
                        // TODO: easing usage is always interpreted as linear here.
                        value = motionAnimation.fromValue +
                            (motionAnimation.toValue - motionAnimation.fromValue) / (motionAnimation.lifeTime * 1000) * relativeTime;
                        motion.sourceObject[propertyNames[j]] = value;
                    }
                }
            }
        }
    };
    ScriptedDanmaku.prototype.__removeDeadDCObjects = function () {
        var bulletproof = this._bulletproof;
        var child;
        for (var i = 0; i < this._children.length; ++i) {
            child = this._children[i];
            if (child.isCreatedByDanmaku) {
                if (child.extraCreateParams.bornTime + child.createParams.lifeTime * 1000 < bulletproof.timeElapsed) {
                    this.removeChild(child);
                    child.dispose();
                    --i;
                }
            }
        }
    };
    return ScriptedDanmaku;
})(DisplayObjectContainer_1.DisplayObjectContainer);
exports.ScriptedDanmaku = ScriptedDanmaku;

//# sourceMappingURL=ScriptedDanmaku.js.map
