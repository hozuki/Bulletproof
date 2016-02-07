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
        var displayList = this.danmakuProvider.displayingDanmakuList;
        var currentStates = {
            bulletproof: this.bulletproof,
            flying: {
                nextYPosition: 0
            }
        };
        function isInPlayingRange(danmaku) {
            return danmaku.bornTime <= currentTime && currentTime <= danmaku.bornTime + danmaku.lifeTime * 1000;
        }
        if (displayList.length > 0) {
            for (var i = 0; i < displayList.length; ++i) {
                var danmaku = displayList[i];
                if (isInPlayingRange(danmaku)) {
                    if (!danmaku.visible) {
                        danmaku.visible = true;
                    }
                    switch (danmaku.createParams.type) {
                        case SimpleDanamkuType_1.SimpleDanmakuType.Flying:
                            handleFlying(danmaku);
                            break;
                        case SimpleDanamkuType_1.SimpleDanmakuType.Top:
                            handleTop(danmaku);
                            break;
                        case SimpleDanamkuType_1.SimpleDanmakuType.Bottom:
                            handleBottom(danmaku);
                            break;
                        case SimpleDanamkuType_1.SimpleDanmakuType.TopLeft:
                            handleTopLeft(danmaku);
                            break;
                        case SimpleDanamkuType_1.SimpleDanmakuType.TopRight:
                            handleTopRight(danmaku);
                            break;
                        case SimpleDanamkuType_1.SimpleDanmakuType.BottomLeft:
                            handleBottomLeft(danmaku);
                            break;
                        case SimpleDanamkuType_1.SimpleDanmakuType.BottomRight:
                            handleBottomRight(danmaku);
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
        function handleFlying(danmaku) {
            var state = currentStates.flying;
            // FIXME: HACK!
            var isStageSizeUsable = false;
            var width = isStageSizeUsable ? stage.width : currentStates.bulletproof.view.width;
            var height = isStageSizeUsable ? stage.height : currentStates.bulletproof.view.height;
            if (danmaku.isYPositionSet) {
                if (danmaku.x < width - danmaku.textWidth && danmaku.y < state.nextYPosition) {
                    state.nextYPosition = danmaku.y;
                }
            }
            else {
                danmaku.y = state.nextYPosition;
                state.nextYPosition += danmaku.textHeight;
                if (state.nextYPosition > height) {
                    state.nextYPosition = 0;
                }
                danmaku.isYPositionSet = true;
            }
            // T-0: At position (STAGE_WIDTH, Y)
            // T-final: At position (-DANMAKU_WIDTH, Y)
            // Add 5 extra pixels to ensure the danmaku is entirely out of the stage when its life should end.
            var elapsedLifeRatio = (currentTime - danmaku.bornTime) / (danmaku.lifeTime * 1000);
            danmaku.x = width - elapsedLifeRatio * (width + danmaku.textWidth + 5);
        }
        function handleTop(danmaku) {
        }
        function handleBottom(danmaku) {
        }
        function handleTopLeft(danmaku) {
        }
        function handleTopRight(danmaku) {
        }
        function handleBottomLeft(danmaku) {
        }
        function handleBottomRight(danmaku) {
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
