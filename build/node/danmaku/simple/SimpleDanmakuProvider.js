/**
 * Created by MIC on 2015/12/28.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DanmakuProviderBase_1 = require("../DanmakuProviderBase");
var DanmakuKind_1 = require("../DanmakuKind");
var SimpleDanmakuLayoutManager_1 = require("./SimpleDanmakuLayoutManager");
var SimpleDanmaku_1 = require("./SimpleDanmaku");
var DanmakuProviderFlag_1 = require("../DanmakuProviderFlag");
var SimpleDanmakuLayer_1 = require("./SimpleDanmakuLayer");
var SimpleDanmakuHelper_1 = require("./SimpleDanmakuHelper");
var StageResizedEventArgs_1 = require("../StageResizedEventArgs");
var GLUtil_1 = require("../../../lib/glantern/lib/glantern-utils/src/GLUtil");
/**
 * An implementation of {@link DanmakuProviderBase}, for managing code damakus.
 */
var SimpleDanmakuProvider = (function (_super) {
    __extends(SimpleDanmakuProvider, _super);
    function SimpleDanmakuProvider(coordinator) {
        _super.call(this, coordinator);
        this._shouldSortDanmakuList = false;
        this._fullDanmakuList = null;
        this._partialDanmakuCounts = null;
        this._partialDisplayingDanmakuCounts = null;
        this._layoutManager = new SimpleDanmakuLayoutManager_1.SimpleDanmakuLayoutManager(this);
        // Mode: 0, 1, 2, 3, 4, 5, 6
        this._partialDanmakuCounts = [0, 0, 0, 0, 0, 0, 0];
        this._partialDisplayingDanmakuCounts = [0, 0, 0, 0, 0, 0, 0];
        this._fullDanmakuList = [];
    }
    Object.defineProperty(SimpleDanmakuProvider.prototype, "danmakuKind", {
        get: function () {
            return DanmakuKind_1.DanmakuKind.Simple;
        },
        enumerable: true,
        configurable: true
    });
    SimpleDanmakuProvider.prototype.initialize = function () {
        var stage = this.bulletproof.stage;
        this._danmakuLayer = new SimpleDanmakuLayer_1.SimpleDanmakuLayer(stage, stage, this);
        stage.addChild(this.danmakuLayer);
        this.layoutManager.onStageResize(this, new StageResizedEventArgs_1.StageResizedEventArgs(stage.stageWidth, stage.stageHeight));
    };
    SimpleDanmakuProvider.prototype.dispose = function () {
        this._danmakuLayer.parent.removeChild(this._danmakuLayer);
        this._danmakuLayer.dispose();
        this._danmakuLayer = null;
        this._layoutManager.dispose();
        this._layoutManager = null;
        for (var i = 0; i < this.fullDanmakuList.length; ++i) {
            for (var i = 0; i < this.fullDanmakuList.length; ++i) {
                this.fullDanmakuList[i].dispose();
            }
        }
        while (this.fullDanmakuList.length > 0) {
            this.fullDanmakuList.pop();
        }
        while (this.displayingDanmakuList.length > 0) {
            this.displayingDanmakuList.pop();
        }
        this._fullDanmakuList = null;
        this._displayingDanmakuList = null;
    };
    SimpleDanmakuProvider.prototype.canCreateDanmaku = function (args) {
        var config = this.bulletproof.config;
        var type = GLUtil_1.GLUtil.isUndefinedOrNull(args) ? config.defaultSimpleDanmakuCreateParams.type : args.type;
        var count = this.partialDanmakuCounts[type];
        return GLUtil_1.GLUtil.isUndefined(count) ? false : count < config.simpleDanmakuPartCountThreshold;
    };
    SimpleDanmakuProvider.prototype.addDanmaku = function (content, args) {
        return _super.prototype.addDanmaku.call(this, content, args);
    };
    SimpleDanmakuProvider.prototype.removeDanmaku = function (danmaku) {
        var index;
        var b = false;
        index = this.fullDanmakuList.indexOf(danmaku);
        if (index >= 0) {
            this.fullDanmakuList.splice(index, 1);
            --this.partialDanmakuCounts[danmaku.createParams.type];
            b = true;
        }
        index = this.displayingDanmakuList.indexOf(danmaku);
        if (index >= 0) {
            this.displayingDanmakuList.splice(index, 1);
            --this.partialDisplayingDanmakuCounts[danmaku.createParams.type];
        }
        return b;
    };
    SimpleDanmakuProvider.prototype.updateDisplayDanmakuList = function () {
        var partialDisplayingCounts = this.partialDisplayingDanmakuCounts;
        var fullList = this.fullDanmakuList;
        var displayingList = this.displayingDanmakuList;
        // TODO: The algorithm can be optimized!
        var timeElapsed = this.bulletproof.timeElapsed;
        var config = this.bulletproof.config;
        var danmaku;
        // We don't handle the situation where cursor is at 00:20, and a danmaku born at 00:15 with life 10s is added.
        // In this situation, the new danmaku is just ignored.
        if (displayingList.length > 0) {
            // Fortunately we have the displaying list for reference.
            // *Assume* that we only play in normal order and don't seek through the track. So we just need to:
            // 1) remove old danmakus in the front of the displaying list;
            // 2) search the danmakus just next to the last in the displaying list.
            var lastDisplayingDanmaku = null;
            for (var i = 0; i < displayingList.length; ++i) {
                danmaku = displayingList[i];
                if (this.isDanmakuDead(danmaku)) {
                    lastDisplayingDanmaku = danmaku;
                    var type = danmaku.createParams.type;
                    --partialDisplayingCounts[type];
                    displayingList.splice(i, 1);
                    --i;
                }
                else {
                    break;
                }
            }
            // If we removed the last available danmaku in displaying list, we have to use the last removed one as reference.
            var referenceDanmaku = displayingList.length > 0 ? displayingList[displayingList.length - 1] : lastDisplayingDanmaku;
            // Skip danmakus in the front. Beware that the whole list may be skipped.
            i = fullList.indexOf(referenceDanmaku) + 1;
            if (i < fullList.length) {
                for (; i < fullList.length; ++i) {
                    danmaku = fullList[i];
                    if (danmaku.bornTime > timeElapsed) {
                        break;
                    }
                    else {
                        var type = danmaku.createParams.type;
                        if (partialDisplayingCounts[type] < config.simpleDanmakuPartCountThreshold) {
                            displayingList.push(danmaku);
                            ++partialDisplayingCounts[type];
                        }
                    }
                }
            }
        }
        else {
            // If there is no displaying danmakus, we have to search a little more...
            for (var i = 0; i < fullList.length; ++i) {
                danmaku = fullList[i];
                if (danmaku.bornTime > timeElapsed) {
                    break;
                }
                if (!this.isDanmakuDead(danmaku)) {
                    var type = danmaku.createParams.type;
                    if (partialDisplayingCounts[type] < config.simpleDanmakuPartCountThreshold) {
                        displayingList.push(fullList[i]);
                        ++partialDisplayingCounts[type];
                    }
                }
            }
        }
    };
    SimpleDanmakuProvider.prototype.isDanmakuDead = function (danmaku) {
        var timeElapsed = this.bulletproof.timeElapsed;
        return timeElapsed < danmaku.bornTime || danmaku.bornTime + danmaku.lifeTime * 1000 < timeElapsed;
    };
    Object.defineProperty(SimpleDanmakuProvider.prototype, "layoutManager", {
        get: function () {
            return this._layoutManager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleDanmakuProvider.prototype, "partialDanmakuCounts", {
        get: function () {
            return this._partialDanmakuCounts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleDanmakuProvider.prototype, "displayingDanmakuList", {
        get: function () {
            return this._displayingDanmakuList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleDanmakuProvider.prototype, "fullDanmakuList", {
        get: function () {
            return this._fullDanmakuList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleDanmakuProvider.prototype, "partialDisplayingDanmakuCounts", {
        get: function () {
            return this._partialDisplayingDanmakuCounts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleDanmakuProvider.prototype, "flags", {
        get: function () {
            return DanmakuProviderFlag_1.DanmakuProviderFlag.None;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleDanmakuProvider.prototype, "danmakuLayer", {
        get: function () {
            return this._danmakuLayer;
        },
        enumerable: true,
        configurable: true
    });
    SimpleDanmakuProvider.prototype.update = function () {
        if (this._shouldSortDanmakuList) {
            this.fullDanmakuList.sort(function (d1, d2) {
                return d1.bornTime - d2.bornTime;
            });
            this._shouldSortDanmakuList = false;
        }
        _super.prototype.update.call(this);
    };
    SimpleDanmakuProvider.prototype.__addDanmaku = function (content, args) {
        var config = this.bulletproof.config;
        if (GLUtil_1.GLUtil.isUndefinedOrNull(args)) {
            args = SimpleDanmakuHelper_1.SimpleDanmakuHelper.getDefaultParams(config);
        }
        else {
            SimpleDanmakuHelper_1.SimpleDanmakuHelper.fillInCreateParams(config, args);
        }
        var danmaku = new SimpleDanmaku_1.SimpleDanmaku(this.layoutManager, args);
        danmaku.initialize(content, this.bulletproof.timeElapsed);
        this.fullDanmakuList.push(danmaku);
        ++this.partialDanmakuCounts[args.type];
        this._shouldSortDanmakuList = true;
        return danmaku;
    };
    return SimpleDanmakuProvider;
})(DanmakuProviderBase_1.DanmakuProviderBase);
exports.SimpleDanmakuProvider = SimpleDanmakuProvider;

//# sourceMappingURL=SimpleDanmakuProvider.js.map
