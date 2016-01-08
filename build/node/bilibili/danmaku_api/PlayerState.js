/**
 * Created by MIC on 2016/1/7.
 */
var PlayerState = (function () {
    function PlayerState() {
    }
    Object.defineProperty(PlayerState, "PLAYING", {
        get: function () {
            return 'playing';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerState, "STOP", {
        get: function () {
            return 'stop';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerState, "PAUSE", {
        get: function () {
            return 'pause';
        },
        enumerable: true,
        configurable: true
    });
    return PlayerState;
})();
exports.PlayerState = PlayerState;

//# sourceMappingURL=PlayerState.js.map
