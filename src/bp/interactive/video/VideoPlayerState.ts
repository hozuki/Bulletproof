/**
 * Created by MIC on 2016/2/8.
 */

enum VideoPlayerState {

    Invalid = -1,
    Created = 0,
    Initialized = 1,
    Loaded = 2,
    Playing = 3,
    Paused = 4,
    Stopped = 5,
    Seeking = 6

}

export default VideoPlayerState;
