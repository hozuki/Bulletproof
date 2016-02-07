/**
 * Created by MIC on 2016/2/7.
 */
var StageResizedEventArgs = (function () {
    function StageResizedEventArgs(width, height) {
        this._width = 0;
        this._height = 0;
        this._width = width;
        this._height = height;
    }
    Object.defineProperty(StageResizedEventArgs.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageResizedEventArgs.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    return StageResizedEventArgs;
})();
exports.StageResizedEventArgs = StageResizedEventArgs;

//# sourceMappingURL=StageResizedEventArgs.js.map
