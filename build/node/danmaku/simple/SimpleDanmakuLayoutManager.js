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
var _util_1 = require("../../../lib/glantern/src/_util/_util");
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
        var measureParams = {
            currentTime: this.bulletproof.timeElapsed,
            stage: this.bulletproof.stage,
            displayingList: this.danmakuProvider.displayingDanmakuList
        };
        function isInPlayingRange(danmaku) {
            return danmaku.bornTime <= measureParams.currentTime && measureParams.currentTime <= danmaku.bornTime + danmaku.lifeTime * 1000;
        }
        var displayingList = measureParams.displayingList;
        if (displayingList.length > 0) {
            for (var i = 0; i < displayingList.length; ++i) {
                var danmaku = displayingList[i];
                if (isInPlayingRange(danmaku)) {
                    if (!danmaku.visible) {
                        danmaku.visible = true;
                    }
                    switch (danmaku.createParams.type) {
                        case SimpleDanamkuType_1.SimpleDanmakuType.FlyingR2L:
                            positionFlying(danmaku, measureParams);
                            break;
                        case SimpleDanamkuType_1.SimpleDanmakuType.AnchoredTop:
                            positionTop(danmaku, measureParams);
                            break;
                        case SimpleDanamkuType_1.SimpleDanmakuType.AnchoredBottom:
                            positionBottom(danmaku, measureParams);
                            break;
                        case SimpleDanamkuType_1.SimpleDanmakuType.AnchoredTopLeft:
                            positionTopLeft(danmaku, measureParams);
                            break;
                        case SimpleDanamkuType_1.SimpleDanmakuType.AnchoredTopRight:
                            positionTopRight(danmaku, measureParams);
                            break;
                        case SimpleDanamkuType_1.SimpleDanmakuType.AnchoredBottomLeft:
                            positionBottomLeft(danmaku, measureParams);
                            break;
                        case SimpleDanamkuType_1.SimpleDanmakuType.AnchoredBottomRight:
                            positionBottomRight(danmaku, measureParams);
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
function positionFlying(danmaku, measureParams) {
    var stageWidth = measureParams.stage.stageWidth;
    var stageHeight = measureParams.stage.stageHeight;
    // T_0: At position (STAGE_WIDTH, Y)
    // T_final: At position (-DANMAKU_WIDTH, Y)
    // Add 5 extra pixels to ensure the danmaku is entirely out of the stage when its life should end.
    var elapsedLifeRatio = (measureParams.currentTime - danmaku.bornTime) / (danmaku.lifeTime * 1000);
    danmaku.x = stageWidth - elapsedLifeRatio * (stageWidth + danmaku.textWidth + 5);
    var displayingList = measureParams.displayingList;
    if (!danmaku.ySet) {
        if (displayingList.length > 0) {
            var currentY = 0;
            var bottommostThereIs = 0;
            for (var i = 0; i < displayingList.length; ++i) {
                if (displayingList[i].isType(SimpleDanamkuType_1.SimpleDanmakuType.FlyingR2L) && displayingList[i].ySet) {
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
                        currentY = handleOverflow(displayingList, i, SimpleDanamkuType_1.SimpleDanmakuType.FlyingR2L);
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
        danmaku.ySet = true;
    }
}
function handleOverflow(displayingList, currentIndex, type) {
    // The stage is full of flying (now all types of) danmakus. Now follow the last positioned danmaku.
    // If overflow happens again, reset Y position to the top of the stage.
    // newY will definitely be assigned.
    var newY;
    do {
        if (displayingList[currentIndex].isType(type) && displayingList[currentIndex].ySet) {
            newY = displayingList[currentIndex].y + displayingList[currentIndex].textHeight;
        }
        ++currentIndex;
    } while (currentIndex < displayingList.length);
    return newY;
}
function positionTop(danmaku, measureParams) {
    if (!danmaku.xSet) {
        danmaku.x = (measureParams.stage.stageWidth - danmaku.textWidth) / 2;
        danmaku.xSet = true;
    }
    var stageHeight = measureParams.stage.stageHeight;
    var displayingList = measureParams.displayingList;
    if (!danmaku.ySet) {
        var currentY = 0;
        if (displayingList.length > 0) {
            for (var i = 0; i < displayingList.length; ++i) {
                if (displayingList[i].isType(SimpleDanamkuType_1.SimpleDanmakuType.AnchoredTop) && displayingList[i].ySet) {
                    var currentDDBottom = displayingList[i].y + displayingList[i].textHeight;
                    var estimatedCDPBottom = currentY + danmaku.textHeight;
                    // The displaying danmaku being measured "contains" the danmaku being positioned.
                    if (_util_1._util.isValueBetweenEquals(estimatedCDPBottom, displayingList[i].y, currentDDBottom) ||
                        _util_1._util.isValueBetweenEquals(currentY, displayingList[i].y, currentDDBottom)) {
                        currentY = currentDDBottom;
                    }
                    if (currentY > stageHeight - danmaku.textHeight) {
                        currentY = handleOverflow(displayingList, i, SimpleDanamkuType_1.SimpleDanmakuType.AnchoredTop);
                        if (currentY > stageHeight - danmaku.textHeight) {
                            currentY = 0;
                        }
                        break;
                    }
                }
            }
        }
        danmaku.y = currentY;
        danmaku.ySet = true;
    }
}
function positionBottom(danmaku, measureParams) {
}
function positionTopLeft(danmaku, measureParams) {
}
function positionTopRight(danmaku, measureParams) {
}
function positionBottomLeft(danmaku, measureParams) {
}
function positionBottomRight(danmaku, measureParams) {
}

//# sourceMappingURL=SimpleDanmakuLayoutManager.js.map
