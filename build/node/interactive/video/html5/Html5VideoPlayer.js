/**
 * Created by MIC on 2016/2/8.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var VideoPlayerBase_1 = require("../VideoPlayerBase");
var VideoPlayerState_1 = require("../VideoPlayerState");
var _util_1 = require("../../../../lib/glantern/src/_util/_util");
var Html5VideoPlayer = (function (_super) {
    __extends(Html5VideoPlayer, _super);
    function Html5VideoPlayer() {
        _super.call(this);
        this._videoElement = null;
        this._state = VideoPlayerState_1.VideoPlayerState.Invalid;
        this._originalStateBeforeSeeking = VideoPlayerState_1.VideoPlayerState.Invalid;
        this._eventHandlers = null;
        this._videoElement = window.document.createElement("video");
        this._eventHandlers = [];
        this._state = VideoPlayerState_1.VideoPlayerState.Created;
    }
    Html5VideoPlayer.prototype.initialize = function (width, height) {
        var vid = this._videoElement;
        var handlers = this._eventHandlers;
        vid.width = width;
        vid.height = height;
        function addListener(name, listener) {
            var f = listener.bind(this);
            handlers.push({ name: name, handler: f });
            vid.addEventListener(name, f);
        }
        addListener("ended", this.__onEnded);
        addListener("play", this.__onPlay);
        addListener("playing", this.__onPlaying);
        addListener("pause", this.__onPause);
        addListener("loadeddata", this.__onLoadedData);
        addListener("seeked", this.__onSeeked);
        addListener("seeking", this.__onSeeking);
    };
    Html5VideoPlayer.prototype.dispose = function () {
        var video = this._videoElement;
        var videoParent = video.parentElement;
        var handlers = this._eventHandlers;
        for (var i = 0; i < handlers.length; ++i) {
            video.removeEventListener(handlers[i].name, handlers[i].handler);
        }
        if (!_util_1._util.isUndefinedOrNull(videoParent)) {
            videoParent.removeChild(video);
        }
        while (handlers.length > 0) {
            handlers.pop();
        }
        this._state = VideoPlayerState_1.VideoPlayerState.Invalid;
        this._videoElement = null;
        this._eventHandlers = null;
    };
    Html5VideoPlayer.prototype.load = function (url) {
        if (this._state !== VideoPlayerState_1.VideoPlayerState.Invalid) {
            this.unload();
            try {
                this._videoElement.src = url;
                this._state = VideoPlayerState_1.VideoPlayerState.Loaded;
                return true;
            }
            catch (ex) {
                return false;
            }
        }
    };
    Html5VideoPlayer.prototype.unload = function () {
        if (this.hasVideo) {
            this.stop();
            this._videoElement.src = null;
            this._state = VideoPlayerState_1.VideoPlayerState.Initialized;
        }
    };
    Html5VideoPlayer.prototype.play = function () {
        if (this.hasVideo) {
            this._videoElement.play();
            this._state = VideoPlayerState_1.VideoPlayerState.Playing;
        }
    };
    Html5VideoPlayer.prototype.pause = function () {
        if (this.hasVideo) {
            this._videoElement.pause();
            this._state = VideoPlayerState_1.VideoPlayerState.Paused;
        }
    };
    Html5VideoPlayer.prototype.resume = function () {
        if (this.hasVideo) {
            if (this._state === VideoPlayerState_1.VideoPlayerState.Paused) {
                this.play();
            }
        }
    };
    Html5VideoPlayer.prototype.stop = function () {
        if (this.hasVideo) {
            this._videoElement.pause();
            this._videoElement.currentTime = 0;
            this._state = VideoPlayerState_1.VideoPlayerState.Stopped;
        }
    };
    Object.defineProperty(Html5VideoPlayer.prototype, "currentTime", {
        get: function () {
            return this.hasVideo ? this._videoElement.currentTime : 0;
        },
        set: function (v) {
            if (this.hasVideo) {
                this._videoElement.currentTime = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "currentRatio", {
        get: function () {
            return this.hasVideo ? this.currentTime / this.duration : 0;
        },
        set: function (v) {
            if (this.hasVideo) {
                v = _util_1._util.limitInto(v, 0, 1);
                this.currentTime = v * this.duration;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "duration", {
        get: function () {
            return this.hasVideo ? this._videoElement.duration : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "autoPlay", {
        get: function () {
            return this._videoElement !== null ? this._videoElement.autoplay : false;
        },
        set: function (v) {
            if (this._videoElement !== null) {
                this._videoElement.autoplay = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "loop", {
        get: function () {
            return this._videoElement !== null ? this._videoElement.loop : false;
        },
        set: function (v) {
            if (this._videoElement !== null) {
                this._videoElement.loop = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "muted", {
        get: function () {
            return this._videoElement !== null ? this._videoElement.muted : false;
        },
        set: function (v) {
            if (this._videoElement !== null) {
                this._videoElement.muted = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "defaultMuted", {
        get: function () {
            return this._videoElement !== null ? this._videoElement.defaultMuted : false;
        },
        set: function (v) {
            if (this._videoElement !== null) {
                this._videoElement.defaultMuted = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "playbackRate", {
        get: function () {
            return this._videoElement !== null ? this._videoElement.playbackRate : 0;
        },
        set: function (v) {
            if (this._videoElement !== null) {
                this._videoElement.playbackRate = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "defaultPlaybackRate", {
        get: function () {
            return this._videoElement !== null ? this._videoElement.defaultPlaybackRate : 0;
        },
        set: function (v) {
            if (this._videoElement !== null) {
                this._videoElement.defaultPlaybackRate = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "volume", {
        get: function () {
            return this._videoElement !== null ? this._videoElement.volume / 200 : 0;
        },
        set: function (v) {
            if (this._videoElement !== null) {
                v = _util_1._util.limitInto(v, 0, 1);
                this._videoElement.volume = v * 200;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "playing", {
        get: function () {
            return this.state === VideoPlayerState_1.VideoPlayerState.Playing;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "paused", {
        get: function () {
            return this.state === VideoPlayerState_1.VideoPlayerState.Paused;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "seeking", {
        get: function () {
            return this._videoElement !== null ? this._videoElement.seeking : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "videoWidth", {
        get: function () {
            return this._videoElement !== null ? this._videoElement.videoWidth : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "videoHeight", {
        get: function () {
            return this._videoElement !== null ? this._videoElement.videoHeight : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "fileURL", {
        get: function () {
            return this._videoElement !== null ? this._videoElement.currentSrc : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "hasVideo", {
        get: function () {
            return this.state > VideoPlayerState_1.VideoPlayerState.Initialized;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Html5VideoPlayer.prototype, "view", {
        get: function () {
            return this._videoElement;
        },
        enumerable: true,
        configurable: true
    });
    Html5VideoPlayer.prototype.__onEnded = function (ev) {
        this._state = VideoPlayerState_1.VideoPlayerState.Stopped;
    };
    Html5VideoPlayer.prototype.__onPlay = function (ev) {
        this._state = VideoPlayerState_1.VideoPlayerState.Playing;
    };
    Html5VideoPlayer.prototype.__onPause = function (ev) {
        this._state = VideoPlayerState_1.VideoPlayerState.Paused;
    };
    Html5VideoPlayer.prototype.__onPlaying = function (ev) {
        this._state = VideoPlayerState_1.VideoPlayerState.Playing;
    };
    Html5VideoPlayer.prototype.__onSeeked = function (ev) {
        this._state = this._originalStateBeforeSeeking;
    };
    Html5VideoPlayer.prototype.__onSeeking = function (ev) {
        this._originalStateBeforeSeeking = this._state;
        this._state = VideoPlayerState_1.VideoPlayerState.Seeking;
    };
    Html5VideoPlayer.prototype.__onLoadedData = function (ev) {
        if (this._state === VideoPlayerState_1.VideoPlayerState.Initialized) {
            this._state = VideoPlayerState_1.VideoPlayerState.Loaded;
        }
    };
    return Html5VideoPlayer;
})(VideoPlayerBase_1.VideoPlayerBase);
exports.Html5VideoPlayer = Html5VideoPlayer;

//# sourceMappingURL=Html5VideoPlayer.js.map
