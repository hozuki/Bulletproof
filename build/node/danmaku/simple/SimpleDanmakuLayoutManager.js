/**
 * Created by MIC on 2015/12/28.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DanmakuLayoutManagerBase_1 = require("../DanmakuLayoutManagerBase");
var DanmakuKind_1 = require("../DanmakuKind");
var SimpleDanamkuType_1 = require("./SimpleDanamkuType");
var SimpleDanmakuLayoutManager = (function (_super) {
    __extends(SimpleDanmakuLayoutManager, _super);
    function SimpleDanmakuLayoutManager(provider) {
        _super.call(this, provider);
        this._stageWidth = 0;
        this._stageHeight = 0;
        this._danmakuProvider = provider;
    }
    SimpleDanmakuLayoutManager.prototype.dispose = function () {
    };
    SimpleDanmakuLayoutManager.prototype.performLayout = function () {
        // Please notice that coordinates in this method are in <canvas> coordinate system, the same as Flash
        // coordinate system.
        var currentTime = this.bulletproof.timeElapsed;
        var stage = this.bulletproof.stage;
        var displayingList = this.danmakuProvider.displayingDanmakuList;
        function isInPlayingRange(danmaku) {
            return danmaku.bornTime <= currentTime && currentTime <= danmaku.bornTime + danmaku.lifeTime * 1000;
        }
        if (displayingList.length > 0) {
            for (var i = 0; i < displayingList.length; ++i) {
                var danmaku = displayingList[i];
                if (isInPlayingRange(danmaku)) {
                    if (!danmaku.visible) {
                        danmaku.visible = true;
                    }
                    switch (danmaku.createParams.type) {
                        case SimpleDanamkuType_1.SimpleDanmakuType.Flying:
                            positionFlying(danmaku);
                            break;
                        case SimpleDanamkuType_1.SimpleDanmakuType.Top:
                            positionTop(danmaku);
                            break;
                        case SimpleDanamkuType_1.SimpleDanmakuType.Bottom:
                            positionBottom(danmaku);
                            break;
                        case SimpleDanamkuType_1.SimpleDanmakuType.TopLeft:
                            positionTopLeft(danmaku);
                            break;
                        case SimpleDanamkuType_1.SimpleDanmakuType.TopRight:
                            positionTopRight(danmaku);
                            break;
                        case SimpleDanamkuType_1.SimpleDanmakuType.BottomLeft:
                            positionBottomLeft(danmaku);
                            break;
                        case SimpleDanamkuType_1.SimpleDanmakuType.BottomRight:
                            positionBottomRight(danmaku);
                            break;
                        default:
                            console.warn("What type is this?");
                            break;
                    }
                }
                else {
                    // Don't draw danmakus which should not appear now.
                    danmaku.visible = false;
                }
            }
        }
        function positionFlying(danmaku) {
            var stageWidth = stage.stageWidth;
            var stageHeight = stage.stageHeight;
            // T_0: At position (STAGE_WIDTH, Y)
            // T_final: At position (-DANMAKU_WIDTH, Y)
            // Add 5 extra pixels to ensure the danmaku is entirely out of the stage when its life should end.
            var elapsedLifeRatio = (currentTime - danmaku.bornTime) / (danmaku.lifeTime * 1000);
            danmaku.x = stageWidth - elapsedLifeRatio * (stageWidth + danmaku.textWidth + 5);
            if (!danmaku.yPositionSet) {
                if (displayingList.length > 0) {
                    var currentY = 0;
                    var bottommostThereIs = 0;
                    for (var i = 0; i < displayingList.length; ++i) {
                        if (displayingList[i].createParams.type === SimpleDanamkuType_1.SimpleDanmakuType.Flying && displayingList[i].yPositionSet) {
                            // Bottom of current displaying danmaku which is being scanned
                            var currentDDBottom = displayingList[i].y + displayingList[i].textHeight;
                            // Estimated value of the bottom of the danmaku being positioned
                            var estimatedCDPBottom = currentY + danmaku.textHeight;
                            // The danmaku being scanned has (just) left the right edge of the stage.
                            if (displayingList[i].x < stageWidth - displayingList[i].textWidth) {
                                // The danmaku being scanned "embraces" the danmaku being positioned.
                                if (displayingList[i].y <= currentY && estimatedCDPBottom <= currentDDBottom) {
                                    currentY = displayingList[i].y;
                                }
                            }
                            else {
                                // The danmaku being scanned "crashes" with the danmaku being positioned.
                                if (displayingList[i].y <= estimatedCDPBottom || currentDDBottom <= currentY) {
                                    currentY = currentDDBottom;
                                }
                            }
                            if (currentY > stageHeight - danmaku.textHeight) {
                                // Wrapping in a function is used for the optimizers to detect that variable 'i' is not
                                // modified in the whole array accessing procedure. Sure it can be expanded into normal
                                // form, but I think it will slightly affect performance.
                                currentY = handleFlyingOverflow(displayingList, i);
                                if (currentY > stageHeight - danmaku.textHeight) {
                                    currentY = 0;
                                }
                                break;
                            }
                            if (currentDDBottom > bottommostThereIs) {
                                bottommostThereIs = currentDDBottom;
                            }
                        }
                    }
                    // If the space in the bottom is enough, we do not have to care about the complicated layout algorithm.
                    if (bottommostThereIs <= stageHeight - danmaku.textHeight) {
                        danmaku.y = bottommostThereIs;
                    }
                    else {
                        danmaku.y = currentY;
                    }
                }
                else {
                    danmaku.y = 0;
                }
                danmaku.yPositionSet = true;
            }
        }
        function handleFlyingOverflow(displayingList, currentIndex) {
            // The stage is full of flying danmakus. Now follow the last positioned danmaku.
            // If overflow happens again, reset Y position to the top of the stage.
            // newY will definitely be assigned.
            var newY;
            do {
                if (displayingList[currentIndex].createParams.type === SimpleDanamkuType_1.SimpleDanmakuType.Flying && displayingList[currentIndex].yPositionSet) {
                    newY = displayingList[currentIndex].y + displayingList[currentIndex].textHeight;
                }
                ++currentIndex;
            } while (currentIndex < displayingList.length);
            return newY;
        }
        function positionTop(danmaku) {
        }
        function positionBottom(danmaku) {
        }
        function positionTopLeft(danmaku) {
        }
        function positionTopRight(danmaku) {
        }
        function positionBottomLeft(danmaku) {
        }
        function positionBottomRight(danmaku) {
        }
    };
    Object.defineProperty(SimpleDanmakuLayoutManager.prototype, "danmakuProvider", {
        get: function () {
            return this._danmakuProvider;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleDanmakuLayoutManager.prototype, "danmakuKind", {
        get: function () {
            return DanmakuKind_1.DanmakuKind.Simple;
        },
        enumerable: true,
        configurable: true
    });
    SimpleDanmakuLayoutManager.prototype.onStageResize = function (sender, e) {
        this._stageWidth = e.width;
        this._stageHeight = e.height;
    };
    return SimpleDanmakuLayoutManager;
})(DanmakuLayoutManagerBase_1.DanmakuLayoutManagerBase);
exports.SimpleDanmakuLayoutManager = SimpleDanmakuLayoutManager;

//# sourceMappingURL=SimpleDanmakuLayoutManager.js.map
