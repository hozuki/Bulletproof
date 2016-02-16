/**
 * Created by MIC on 2016/1/7.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Timer_1 = require("../../../../lib/glantern/src/flash/utils/Timer");
var TimerEvent_1 = require("../../../../lib/glantern/src/flash/events/TimerEvent");
var FiniteTimer = (function (_super) {
    __extends(FiniteTimer, _super);
    function FiniteTimer(obj, delay, repeatCount) {
        if (repeatCount === void 0) { repeatCount = 1; }
        _super.call(this, delay, repeatCount);
        this._closure = null;
        this._funcSource = null;
        this._closureIsFunction = false;
        if (typeof obj === "string") {
            this._funcSource = obj;
            this._closure = new Function(this._funcSource);
            this._closureIsFunction = false;
        }
        else {
            this._closure = obj;
            this._closureIsFunction = true;
        }
        this.addEventListener(TimerEvent_1.TimerEvent.TIMER, this.__closureTimerHandler.bind(this));
        this.addEventListener(TimerEvent_1.TimerEvent.TIMER_COMPLETE, this.__closureTimerCompleteHandler.bind(this));
    }
    FiniteTimer.prototype.__closureTimerHandler = function () {
        this._closure.call(null);
    };
    FiniteTimer.prototype.__closureTimerCompleteHandler = function () {
    };
    return FiniteTimer;
})(Timer_1.Timer);
exports.FiniteTimer = FiniteTimer;

//# sourceMappingURL=FiniteTimer.js.map
