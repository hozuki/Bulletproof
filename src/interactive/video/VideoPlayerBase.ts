/**
 * Created by MIC on 2016/2/8.
 */

import {VideoPlayerState} from "./VideoPlayerState";
import {IDisposable} from "../../../lib/glantern/src/IDisposable";
import {NotImplementedError} from "../../../lib/glantern/lib/glantern-utils/src/NotImplementedError";

export abstract class VideoPlayerBase implements IDisposable {

    constructor() {
    }

    /**
     * Initializes the {@link VideoPlayerBase}.
     */
    abstract initialize(width:number, height:number):void;

    /**
     * Disposes the instance, and releases all allocated resources.
     */
    abstract dispose():void;

    /**
     * Load a video from URL.
     * @param url {String} The source URL.
     * @returns {Boolean} Whether the loading procedure was successful.
     */
    abstract load(url:string):boolean;

    /**
     * Unloads the loaded video (if any) and releases allocated resources.
     */
    abstract unload():void;

    /**
     * Starts or resumes current video.
     */
    abstract play():void;

    /**
     * Pauses current video.
     */
    abstract pause():void;

    /**
     * Resumes current video. If the video is not paused, no operation will be done.
     */
    abstract resume():void;

    /**
     * Stops current video.
     */
    abstract stop():void;

    /**
     * Gets current playing timestamp, in seconds.
     * @returns {Number}
     */
    get currentTime():number {
        throw new NotImplementedError();
    };

    set currentTime(v:number) {
        throw new NotImplementedError();
    }

    /**
     * Gets current playing ratio. The ratio is a value between 0 and 1 from start to end.
     * @returns {Number}
     */
    get currentRatio():number {
        throw new NotImplementedError();
    }

    set currentRatio(v:number) {
        throw new NotImplementedError();
    }

    /**
     * Gets the duration of current video, in seconds.
     */
    get duration():number {
        throw new NotImplementedError();
    }

    get autoPlay():boolean {
        throw new NotImplementedError();
    }

    set autoPlay(v:boolean) {
        throw new NotImplementedError();
    }

    /**
     * Gets whether the video should be looped.
     */
    get loop():boolean {
        throw new NotImplementedError();
    }

    set loop(v:boolean) {
        throw new NotImplementedError();
    }

    /**
     * Gets whether the video should be muted.
     */
    get muted():boolean {
        throw new NotImplementedError();
    }

    set muted(v:boolean) {
        throw new NotImplementedError();
    }

    get defaultMuted():boolean {
        throw new NotImplementedError();
    }

    set defaultMuted(v:boolean) {
        throw new NotImplementedError();
    }

    get playbackRate():number {
        throw new NotImplementedError();
    }

    set playbackRate(v:number) {
        throw new NotImplementedError();
    }

    get defaultPlaybackRate():number {
        throw new NotImplementedError();
    }

    set defaultPlaybackRate(v:number) {
        throw new NotImplementedError();
    }

    /**
     * Gets current volume. The value is between 0 and 1 from silence to maximum volume.
     */
    get volume():number {
        throw new NotImplementedError();
    }

    set volume(v:number) {
        throw new NotImplementedError();
    }

    /**
     * Gets the state enum of the player.
     */
    get state():VideoPlayerState {
        throw new NotImplementedError();
    }

    get stateText():string {
        return VideoPlayerState[this.state];
    }

    get playing():boolean {
        throw new NotImplementedError();
    }

    get paused():boolean {
        throw new NotImplementedError();
    }

    get seeking():boolean {
        throw new NotImplementedError();
    }

    get videoWidth():number {
        throw new NotImplementedError();
    }

    get videoHeight():number {
        throw new NotImplementedError();
    }

    /**
     * Gets the URL of current video.
     */
    get fileURL():string {
        throw new NotImplementedError();
    }

    /**
     * Gets whether there is a video prepared.
     */
    get hasVideo():boolean {
        throw new NotImplementedError();
    }

    /**
     * Gets the element created by the player.
     */
    get view():HTMLElement {
        throw new NotImplementedError();
    }

}
