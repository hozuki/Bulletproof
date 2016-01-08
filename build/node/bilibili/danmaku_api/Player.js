/**
 * Created by MIC on 2016/1/7.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BiliBiliDamakuApiObject_1 = require("./BiliBiliDamakuApiObject");
var NotImplementedError_1 = require("../../../lib/glantern/src/_util/NotImplementedError");
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(apiContainer) {
        _super.call(this, apiContainer);
        this.refreshRate = 0;
    }
    Player.prototype.play = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Player.prototype.pause = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Player.prototype.seek = function (offset) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Player.prototype.jump = function (av, page, newWindow) {
        if (page === void 0) { page = 1; }
        if (newWindow === void 0) { newWindow = false; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Object.defineProperty(Player.prototype, "state", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "time", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Player.prototype.commentTrigger = function (f, timeout) {
        if (timeout === void 0) { timeout = 1000; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Player.prototype.keyTrigger = function (f, timeout, up) {
        if (timeout === void 0) { timeout = 1000; }
        if (up === void 0) { up = false; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Player.prototype.setMask = function (obj) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Player.prototype.createSound = function (t, onLoad) {
        if (onLoad === void 0) { onLoad = null; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Object.defineProperty(Player.prototype, "commentList", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "width", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "height", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "videoWidth", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "videoHeight", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    return Player;
})(BiliBiliDamakuApiObject_1.BiliBiliDamakuApiObject);
exports.Player = Player;

//# sourceMappingURL=Player.js.map
