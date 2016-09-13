/**
 * Created by MIC on 2016/6/13.
 */

import {EventBase} from "../../../../lib/glantern/src/gl/mic/EventBase";

export class VideoPlayerEvent extends EventBase {

    static get VIDEO_ENDED(): string {
        return "videoEnded";
    }

    static get VIDEO_PLAY(): string {
        return "videoPlay";
    }

    static get VIDEO_PAUSE(): string {
        return "videoPause";
    }

    static get VIDEO_PLAYING(): string {
        return "videoPlaying";
    }

    static get VIDEO_SEEKED(): string {
        return "videoSeeked";
    }

    static get VIDEO_SEEKING(): string {
        return "videoSeeking";
    }

    static get VIDEO_LOADED_DATA(): string {
        return "videoLoadedData";
    }

    static get VIDEO_TIME_UPDATE(): string {
        return "videoTimeUpdate";
    }

}
