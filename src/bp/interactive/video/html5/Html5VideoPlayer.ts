/**
 * Created by MIC on 2016/2/8.
 */
import VideoPlayerBase from "../VideoPlayerBase";
import VideoPlayerState from "../VideoPlayerState";
import MathUtil from "../../../../../lib/glantern/src/gl/mic/MathUtil";
import VideoPlayerEvent from "../VideoPlayerEvent";
import EventBase from "../../../../../lib/glantern/src/gl/mic/EventBase";
import VirtualDom from "../../../../../lib/glantern/src/gl/mic/VirtualDom";

type EventHandler<T extends Event> = (ev: T) => void;

export default class Html5VideoPlayer extends VideoPlayerBase {

    constructor(videoElement: HTMLVideoElement = null) {
        super();
        if (!videoElement || !(videoElement instanceof HTMLVideoElement)) {
            videoElement = VirtualDom.createElement<HTMLVideoElement>("video");
        }
        this._videoElement = videoElement;
        this._eventHandlers = [];
        this._state = VideoPlayerState.Created;
    }

    initialize(width: number, height: number): void {
        const vid = this._videoElement;
        const handlers = this._eventHandlers;
        vid.width = width;
        vid.height = height;

        const $this = this;

        function addListener(name: string, listener: EventHandler<Event>): void {
            const f = listener.bind($this);
            handlers.push({name: name, handler: f});
            vid.addEventListener(name, f);
        }

        addListener("ended", this.__onEnded);
        addListener("play", this.__onPlay);
        addListener("playing", this.__onPlaying);
        addListener("pause", this.__onPause);
        addListener("loadeddata", this.__onLoadedData);
        // This is not a spelling mistake.
        addListener("seeked", this.__onSeeked);
        addListener("seeking", this.__onSeeking);
        addListener("timeupdate", this.__onTimeUpdate);
    }

    dispose(): void {
        const video = this.view;
        const videoParent = video.parentElement;
        const handlers = this._eventHandlers;
        for (let i = 0; i < handlers.length; ++i) {
            video.removeEventListener(handlers[i].name, handlers[i].handler);
        }
        if (videoParent) {
            videoParent.removeChild(video);
        }
        handlers.splice(0, handlers.length);
        this._state = VideoPlayerState.Invalid;
        this._videoElement = null;
        this._eventHandlers = null;
        super.dispose();
    }

    load(url: string): boolean {
        if (this._state === VideoPlayerState.Invalid) {
            return;
        }
        this.unload();
        try {
            this.view.src = url;
            this._state = VideoPlayerState.Loaded;
            return true;
        } catch (ex) {
            return false;
        }
    }

    unload(): void {
        if (!this.hasVideo) {
            return;
        }
        this.stop();
        this.view.src = null;
        this._state = VideoPlayerState.Initialized;
    }

    play(): void {
        if (!this.hasVideo) {
            return;
        }
        this.view.play();
        this._state = VideoPlayerState.Playing;
    }

    pause(): void {
        if (!this.hasVideo) {
            return;
        }
        this.view.pause();
        this._state = VideoPlayerState.Paused;
    }

    resume(): void {
        if (!this.hasVideo) {
            return;
        }
        if (this._state === VideoPlayerState.Paused) {
            this.play();
        }
    }

    stop(): void {
        if (!this.hasVideo) {
            return;
        }
        this.view.pause();
        this.view.currentTime = 0;
        this._state = VideoPlayerState.Stopped;
    }

    get currentTime(): number {
        return this.hasVideo ? this.view.currentTime : 0;
    }

    set currentTime(v: number) {
        if (this.hasVideo) {
            this.view.currentTime = v;
        }
    }

    get currentRatio(): number {
        return this.hasVideo ? this.currentTime / this.duration : 0;
    }

    set currentRatio(v: number) {
        if (this.hasVideo) {
            v = MathUtil.clamp(v, 0, 1);
            this.currentTime = v * this.duration;
        }
    }

    get duration(): number {
        return this.hasVideo ? this.view.duration : 0;
    }

    get autoPlay(): boolean {
        const vid = this.view;
        return vid ? vid.autoplay : false;
    }

    set autoPlay(v: boolean) {
        const vid = this.view;
        if (vid) {
            vid.autoplay = v;
        }
    }

    get loop(): boolean {
        const vid = this.view;
        return vid ? vid.loop : false;
    }

    set loop(v: boolean) {
        const vid = this.view;
        if (vid) {
            vid.loop = v;
        }
    }

    get muted(): boolean {
        const vid = this.view;
        return vid ? vid.muted : false;
    }

    set muted(v: boolean) {
        const vid = this.view;
        if (vid) {
            vid.muted = v;
        }
    }

    get defaultMuted(): boolean {
        const vid = this.view;
        return vid ? vid.defaultMuted : false;
    }

    set defaultMuted(v: boolean) {
        const vid = this.view;
        if (vid) {
            vid.defaultMuted = v;
        }
    }

    get playbackRate(): number {
        const vid = this.view;
        return vid ? vid.playbackRate : 0;
    }

    set playbackRate(v: number) {
        const vid = this.view;
        if (vid) {
            vid.playbackRate = v;
        }
    }

    get defaultPlaybackRate(): number {
        const vid = this.view;
        return vid ? vid.defaultPlaybackRate : 0;
    }

    set defaultPlaybackRate(v: number) {
        const vid = this.view;
        if (vid) {
            vid.defaultPlaybackRate = v;
        }
    }

    get volume(): number {
        const vid = this.view;
        return vid ? vid.volume / 200 : 0;
    }

    set volume(v: number) {
        const vid = this.view;
        if (vid) {
            v = MathUtil.clamp(v, 0, 1);
            vid.volume = v * 200;
        }
    }

    get state(): VideoPlayerState {
        return this._state;
    }

    get playing(): boolean {
        return this.state === VideoPlayerState.Playing;
    }

    get paused(): boolean {
        return this.state === VideoPlayerState.Paused;
    }

    get seeking(): boolean {
        const vid = this.view;
        return vid ? vid.seeking : false;
    }

    get videoWidth(): number {
        const vid = this.view;
        return vid ? vid.videoWidth : 0;
    }

    get videoHeight(): number {
        const vid = this.view;
        return vid ? vid.videoHeight : 0;
    }

    get fileURL(): string {
        const vid = this.view;
        return vid ? vid.currentSrc : null;
    }

    get hasVideo(): boolean {
        return this.state > VideoPlayerState.Initialized;
    }

    get view(): HTMLVideoElement {
        return this._videoElement;
    }

    private __onEnded(ev: Event): void {
        this._state = VideoPlayerState.Stopped;
        this.dispatchEvent(EventBase.create(VideoPlayerEvent.VIDEO_ENDED));
    }

    private __onPlay(ev: Event): void {
        this._state = VideoPlayerState.Playing;
        this.dispatchEvent(EventBase.create(VideoPlayerEvent.VIDEO_PLAY));
    }

    private __onPause(ev: Event): void {
        this._state = VideoPlayerState.Paused;
        this.dispatchEvent(EventBase.create(VideoPlayerEvent.VIDEO_PAUSE));
    }

    private __onPlaying(ev: Event): void {
        this._state = VideoPlayerState.Playing;
        this.dispatchEvent(EventBase.create(VideoPlayerEvent.VIDEO_PLAYING));
    }

    private __onSeeked(ev: Event): void {
        this._state = this._originalStateBeforeSeeking;
        this.dispatchEvent(EventBase.create(VideoPlayerEvent.VIDEO_SEEKED));
    }

    private __onSeeking(ev: Event): void {
        this._originalStateBeforeSeeking = this._state;
        this._state = VideoPlayerState.Seeking;
        this.dispatchEvent(EventBase.create(VideoPlayerEvent.VIDEO_SEEKING));
    }

    private __onLoadedData(ev: Event): void {
        if (this._state === VideoPlayerState.Initialized) {
            this._state = VideoPlayerState.Loaded;
        }
        this.dispatchEvent(EventBase.create(VideoPlayerEvent.VIDEO_LOADED_DATA));
    }

    private __onTimeUpdate(ev: Event): void {
        this.dispatchEvent(new VideoPlayerEvent(VideoPlayerEvent.VIDEO_TIME_UPDATE));
    }

    private _videoElement: HTMLVideoElement = null;
    private _state: VideoPlayerState = VideoPlayerState.Invalid;
    private _originalStateBeforeSeeking: VideoPlayerState = VideoPlayerState.Invalid;
    private _eventHandlers: {name: string, handler: EventHandler<Event>}[] = null;

}
