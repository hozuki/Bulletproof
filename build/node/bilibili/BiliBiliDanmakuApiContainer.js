/**
 * Created by MIC on 2015/12/29.
 */
var Display_1 = require("./danmaku_api/Display");
var Global_1 = require("./danmaku_api/Global");
var Functions_1 = require("./danmaku_api/Functions");
var Utils_1 = require("./danmaku_api/Utils");
var Bitmap_1 = require("./danmaku_api/Bitmap");
var Player_1 = require("./danmaku_api/Player");
var ScriptManager_1 = require("./danmaku_api/ScriptManager");
var Storage_1 = require("./danmaku_api/Storage");
var Tween_1 = require("./danmaku_api/Tween");
var BiliBiliDanmakuApiContainer = (function () {
    function BiliBiliDanmakuApiContainer(codeDanmaku) {
        this._codeDanmaku = null;
        this._bulletproof = null;
        this._api = null;
        this._codeDanmaku = codeDanmaku;
        this._bulletproof = codeDanmaku.layoutManager.danmakuProvider.danmakuCoordinator.bulletproof;
        this.__initializeApi();
    }
    Object.defineProperty(BiliBiliDanmakuApiContainer.prototype, "bulletproof", {
        get: function () {
            return this._bulletproof;
        },
        enumerable: true,
        configurable: true
    });
    BiliBiliDanmakuApiContainer.prototype.__initializeApi = function () {
        var api = Object.create(null);
        api.$ = api.Display = new Display_1.Display(this);
        api.$G = api.Global = new Global_1.Global(this);
        api.Bitmap = new Bitmap_1.Bitmap(this);
        api.Player = new Player_1.Player(this);
        api.ScriptManager = new ScriptManager_1.ScriptManager(this);
        api.Storage = new Storage_1.Storage(this);
        api.Tween = new Tween_1.Tween(this);
        api.Utils = new Utils_1.Utils(this);
        var f = new Functions_1.Functions(this);
        api.trace = f.trace.bind(f);
        api.clear = f.clear.bind(f);
        api.getTimer = f.getTimer.bind(f);
        api.timer = f.timer.bind(f);
        api.interval = f.interval.bind(f);
        api.foreach = f.foreach.bind(f);
        api.clone = f.clone.bind(f);
        api.load = f.load.bind(f);
        this._api = api;
    };
    Object.defineProperty(BiliBiliDanmakuApiContainer.prototype, "api", {
        get: function () {
            return this._api;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BiliBiliDanmakuApiContainer.prototype, "danmaku", {
        get: function () {
            return this._codeDanmaku;
        },
        enumerable: true,
        configurable: true
    });
    return BiliBiliDanmakuApiContainer;
})();
exports.BiliBiliDanmakuApiContainer = BiliBiliDanmakuApiContainer;

//# sourceMappingURL=BiliBiliDanmakuApiContainer.js.map
