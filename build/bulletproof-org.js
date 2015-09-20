/**
 * Created by MIC on 2015/8/28.
 */
var bulletproof;
(function (bulletproof) {
    var NotImplementedError = (function () {
        function NotImplementedError(message) {
            if (message === void 0) { message = 'Not implemented'; }
            this._message = message;
        }
        Object.defineProperty(NotImplementedError.prototype, "name", {
            get: function () {
                return 'NotImplementedError';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NotImplementedError.prototype, "message", {
            get: function () {
                return this._message;
            },
            enumerable: true,
            configurable: true
        });
        return NotImplementedError;
    })();
    bulletproof.NotImplementedError = NotImplementedError;
    var ArgumentError = (function () {
        function ArgumentError(message, argumentName) {
            if (message === void 0) { message = 'Argument assertion failed'; }
            if (argumentName === void 0) { argumentName = null; }
            this._message = message;
            this._argumentName = argumentName;
        }
        Object.defineProperty(ArgumentError.prototype, "name", {
            get: function () {
                return 'ArgumentError';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ArgumentError.prototype, "message", {
            get: function () {
                return this._message;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ArgumentError.prototype, "argumentName", {
            get: function () {
                return this._argumentName;
            },
            enumerable: true,
            configurable: true
        });
        return ArgumentError;
    })();
    bulletproof.ArgumentError = ArgumentError;
    var EventClass = (function () {
        function EventClass(type, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            this.type = type;
            this.bubbles = bubbles;
            this.cancelable = cancelable;
            this.timeStamp = Date.now();
        }
        EventClass.prototype.initEvent = function (eventTypeArg, canBubbleArg, cancelableArg) {
        };
        EventClass.prototype.stopPropagation = function () {
        };
        EventClass.prototype.stopImmediatePropagation = function () {
        };
        EventClass.prototype.preventDefault = function () {
        };
        EventClass.prototype.clone = function () {
            throw new NotImplementedError();
        };
        return EventClass;
    })();
    bulletproof.EventClass = EventClass;
})(bulletproof = exports.bulletproof || (exports.bulletproof = {}));
//# sourceMappingURL=bulletproof-org.js.map