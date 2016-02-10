/**
 * Created by MIC on 2016/2/8.
 */

import {VideoPlayerBase} from "../VideoPlayerBase";
import {VideoPlayerState} from "../VideoPlayerState";
import {NotImplementedError} from "../../../../lib/glantern/src/_util/NotImplementedError";
import {_util} from "../../../../lib/glantern/src/_util/_util";

type EventHandler<T extends Event> = (ev:T) => void;

export class Html5VideoPlayer extends VideoPlayerBase {

    constructor() {
        super();
        this._videoElement = window.document.createElement("video");
        this._eventHandlers = [];
        this._state = VideoPlayerState.Created;
    }

    initialize(width:number, height:number):void {
        var vid = this._videoElement;
        var handlers = this._eventHandlers;
        vid.width = width;
        vid.height = height;

        function addListener(name:string, listener:EventHandler<Event>):void {
            var f = listener.bind(this);
            handlers.push({name: name, handler: f});
            vid.addEventListener(name, f);
        }

        addListener("ended", this.__onEnded);
        addListener("play", this.__onPlay);
        addListener("playing", this.__onPlaying);
        addListener("pause", this.__onPause);
        addListener("loadeddata", this.__onLoadedData);
        addListener("seeked", this.__onSeeked);
        addListener("seeking", this.__onSeeking);
    }

    dispose():void {
        var video = this._videoElement;
        var videoParent = video.parentElement;
        var handlers = this._eventHandlers;
        for (var i = 0; i < handlers.length; ++i) {
            video.removeEventListener(handlers[i].name, handlers[i].handler);
        }
        if (!_util.isUndefinedOrNull(videoParent)) {
            videoParent.removeChild(video);
        }
        while (handlers.length > 0) {
            handlers.pop();
        }
        this._state = VideoPlayerState.Invalid;
        this._videoElement = null;
        this._eventHandlers = null;
    }

    load(url:string):boolean {
        if (this._state !== VideoPlayerState.Invalid) {
            this.unload();
            try {
                this._videoElement.src = url;
                this._state = VideoPlayerState.Loaded;
                return true;
            } catch (ex) {
                return false;
            }
        }
    }

    unload():void {
        if (this.hasVideo) {
            this.stop();
            this._videoElement.src = null;
            this._state = VideoPlayerState.Initialized;
        }
    }

    play():void {
        if (this.hasVideo) {
            this._videoElement.play();
            this._state = VideoPlayerState.Playing;
        }
    }

    pause():void {
        if (this.hasVideo) {
            this._videoElement.pause();
            this._state = VideoPlayerState.Paused;
        }
    }

    resume():void {
        if (this.hasVideo) {
            if (this._state === VideoPlayerState.Paused) {
                this.play();
            }
        }
    }

    stop():void {
        if (this.hasVideo) {
            this._videoElement.pause();
            this._videoElement.currentTime = 0;
            this._state = VideoPlayerState.Stopped;
        }
    }

    get currentTime():number {
        return this.hasVideo ? this._videoElement.currentTime : 0;
    }

    set currentTime(v:number) {
        if (this.hasVideo) {
            this._videoElement.currentTime = v;
        }
    }

    get currentRatio():number {
        return this.hasVideo ? this.currentTime / this.duration : 0;
    }

    set currentRatio(v:number) {
        if (this.hasVideo) {
            v = _util.limitInto(v, 0, 1);
            this.currentTime = v * this.duration;
        }
    }

    get duration():number {
        return this.hasVideo ? this._videoElement.duration : 0;
    }

    get autoPlay():boolean {
        return this._videoElement !== null ? this._videoElement.autoplay : false;
    }

    set autoPlay(v:boolean) {
        if (this._videoElement !== null) {
            this._videoElement.autoplay = v;
        }
    }

    get loop():boolean {
        return this._videoElement !== null ? this._videoElement.loop : false;
    }

    set loop(v:boolean) {
        if (this._videoElement !== null) {
            this._videoElement.loop = v;
        }
    }

    get muted():boolean {
        return this._videoElement !== null ? this._videoElement.muted : false;
    }

    set muted(v:boolean) {
        if (this._videoElement !== null) {
            this._videoElement.muted = v;
        }
    }

    get defaultMuted():boolean {
        return this._videoElement !== null ? this._videoElement.defaultMuted : false;
    }

    set defaultMuted(v:boolean) {
        if (this._videoElement !== null) {
            this._videoElement.defaultMuted = v;
        }
    }

    get playbackRate():number {
        return this._videoElement !== null ? this._videoElement.playbackRate : 0;
    }

    set playbackRate(v:number) {
        if (this._videoElement !== null) {
            this._videoElement.playbackRate = v;
        }
    }

    get defaultPlaybackRate():number {
        return this._videoElement !== null ? this._videoElement.defaultPlaybackRate : 0;
    }

    set defaultPlaybackRate(v:number) {
        if (this._videoElement !== null) {
            this._videoElement.defaultPlaybackRate = v;
        }
    }

    get volume():number {
        return this._videoElement !== null ? this._videoElement.volume / 200 : 0;
    }

    set volume(v:number) {
        if (this._videoElement !== null) {
            v = _util.limitInto(v, 0, 1);
            this._videoElement.volume = v * 200;
        }
    }

    get state():VideoPlayerState {
        return this._state;
    }

    get playing():boolean {
        return this.state === VideoPlayerState.Playing;
    }

    get paused():boolean {
        return this.state === VideoPlayerState.Paused;
    }

    get seeking():boolean {
        return this._videoElement !== null ? this._videoElement.seeking : false;
    }

    get videoWidth():number {
        return this._videoElement !== null ? this._videoElement.videoWidth : 0;
    }

    get videoHeight():number {
        return this._videoElement !== null ? this._videoElement.videoHeight : 0;
    }

    get fileURL():string {
        return this._videoElement !== null ? this._videoElement.currentSrc : null;
    }

    get hasVideo():boolean {
        return this.state > VideoPlayerState.Initialized;
    }

    get view():HTMLVideoElement {
        return this._videoElement;
    }

    private __onEnded(ev:Event):void {
        this._state = VideoPlayerState.Stopped;
    }

    private __onPlay(ev:Event):void {
        this._state = VideoPlayerState.Playing;
    }

    private __onPause(ev:Event):void {
        this._state = VideoPlayerState.Paused;
    }

    private __onPlaying(ev:Event):void {
        this._state = VideoPlayerState.Playing;
    }

    private __onSeeked(ev:Event):void {
        this._state = this._originalStateBeforeSeeking;
    }

    private __onSeeking(ev:Event):void {
        this._originalStateBeforeSeeking = this._state;
        this._state = VideoPlayerState.Seeking;
    }

    private __onLoadedData(ev:Event):void {
        if (this._state === VideoPlayerState.Initialized) {
            this._state = VideoPlayerState.Loaded;
        }
    }

    private _videoElement:HTMLVideoElement = null;
    private _state:VideoPlayerState = VideoPlayerState.Invalid;
    private _originalStateBeforeSeeking:VideoPlayerState = VideoPlayerState.Invalid;
    private _eventHandlers:{name:string, handler:EventHandler<Event>}[] = null;

}
