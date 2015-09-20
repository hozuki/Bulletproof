/**
 * Created by MIC on 2015/9/10.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var bulletproof_flash = require("./bulletproof-flash");
var bulletproof_mic = require("./bulletproof-mic");
var bulletproof;
(function (bulletproof) {
    var mic = bulletproof_mic.bulletproof.mic;
    var flash = bulletproof_flash.bulletproof.flash;
    var Bulletproof = (function (_super) {
        __extends(Bulletproof, _super);
        function Bulletproof() {
            _super.call(this);
            this._shouldUpdate = true;
            this._initialized = false;
            this._enteredLoop = false;
            if (Bulletproof._instanceCreated < 3) {
                Bulletproof._instanceCreated++;
            }
        }
        Object.defineProperty(Bulletproof, "instance", {
            get: function () {
                return Bulletproof._instance;
            },
            enumerable: true,
            configurable: true
        });
        Bulletproof.prototype.initialize = function () {
            // first time: (function [class](){})()
            // second time: manual instantiation
            if (!this._initialized && Bulletproof._instanceCreated == 2) {
                this._options = Bulletproof.DEFAULT_OPTIONS;
                // TODO: Remove force type cast when bp.d.ts is fully synced with implementations.
                //this._bdg = AdvAdapter.initialize(div, video, <any>this);
                Bulletproof._instance = this;
                this._initialized = true;
            }
        };
        Bulletproof.prototype.enterMainLoop = function () {
            if (this._initialized && !this._enteredLoop) {
                this._enteredLoop = true;
                window.requestAnimationFrame(Bulletproof.mainLoop);
            }
        };
        Bulletproof.mainLoop = function () {
            var instance = Bulletproof.instance;
            if (instance) {
                var event = mic.util.createTestEvent(Bulletproof.RENDER_REQUESTED);
                instance._enteredLoop = true;
                instance.dispatchEvent(event);
                window.requestAnimationFrame(Bulletproof.mainLoop);
            }
        };
        Object.defineProperty(Bulletproof.prototype, "shouldUpdate", {
            get: function () {
                return this._shouldUpdate;
            },
            set: function (v) {
                this._shouldUpdate = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Bulletproof.prototype, "options", {
            get: function () {
                return this._options;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Bulletproof, "RENDER_REQUESTED", {
            get: function () {
                return 'renderRequested';
            },
            enumerable: true,
            configurable: true
        });
        Bulletproof._instanceCreated = 0;
        //private _bdg:AdvAdapter;
        Bulletproof._instance = new Bulletproof();
        Bulletproof.DEFAULT_OPTIONS = {
            commentLifeTime: 4000
        };
        return Bulletproof;
    })(flash.events.EventDispatcher);
    bulletproof.Bulletproof = Bulletproof;
})(bulletproof = exports.bulletproof || (exports.bulletproof = {}));
//# sourceMappingURL=bulletproof.js.map