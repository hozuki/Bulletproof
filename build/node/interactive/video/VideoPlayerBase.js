/**
 * Created by MIC on 2016/2/8.
 */
var VideoPlayerState_1 = require("./VideoPlayerState");
var NotImplementedError_1 = require("../../../lib/glantern/lib/glantern-utils/src/NotImplementedError");
var VideoPlayerBase = (function () {
    function VideoPlayerBase() {
    }
    Object.defineProperty(VideoPlayerBase.prototype, "currentTime", {
        /**
         * Gets current playing timestamp, in seconds.
         * @returns {Number}
         */
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        set: function (v) {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(VideoPlayerBase.prototype, "currentRatio", {
        /**
         * Gets current playing ratio. The ratio is a value between 0 and 1 from start to end.
         * @returns {Number}
         */
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        set: function (v) {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "duration", {
        /**
         * Gets the duration of current video, in seconds.
         */
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "autoPlay", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        set: function (v) {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "loop", {
        /**
         * Gets whether the video should be looped.
         */
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        set: function (v) {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "muted", {
        /**
         * Gets whether the video should be muted.
         */
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        set: function (v) {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "defaultMuted", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        set: function (v) {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "playbackRate", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        set: function (v) {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "defaultPlaybackRate", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        set: function (v) {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "volume", {
        /**
         * Gets current volume. The value is between 0 and 1 from silence to maximum volume.
         */
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        set: function (v) {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "state", {
        /**
         * Gets the state enum of the player.
         */
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "stateText", {
        get: function () {
            return VideoPlayerState_1.VideoPlayerState[this.state];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "playing", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "paused", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "seeking", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "videoWidth", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "videoHeight", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "fileURL", {
        /**
         * Gets the URL of current video.
         */
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "hasVideo", {
        /**
         * Gets whether there is a video prepared.
         */
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoPlayerBase.prototype, "view", {
        /**
         * Gets the element created by the player.
         */
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    return VideoPlayerBase;
})();
exports.VideoPlayerBase = VideoPlayerBase;

//# sourceMappingURL=VideoPlayerBase.js.map
