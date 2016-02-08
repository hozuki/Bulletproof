/**
 * Created by MIC on 2016/2/8.
 */
(function (VideoPlayerState) {
    VideoPlayerState[VideoPlayerState["Invalid"] = -1] = "Invalid";
    VideoPlayerState[VideoPlayerState["Created"] = 0] = "Created";
    VideoPlayerState[VideoPlayerState["Initialized"] = 1] = "Initialized";
    VideoPlayerState[VideoPlayerState["Loaded"] = 2] = "Loaded";
    VideoPlayerState[VideoPlayerState["Playing"] = 3] = "Playing";
    VideoPlayerState[VideoPlayerState["Paused"] = 4] = "Paused";
    VideoPlayerState[VideoPlayerState["Stopped"] = 5] = "Stopped";
    VideoPlayerState[VideoPlayerState["Seeking"] = 6] = "Seeking";
})(exports.VideoPlayerState || (exports.VideoPlayerState = {}));
var VideoPlayerState = exports.VideoPlayerState;

//# sourceMappingURL=VideoPlayerState.js.map
