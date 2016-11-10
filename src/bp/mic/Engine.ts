/**
 * Created by MIC on 2015/12/28.
 */

import DanmakuController from "../danmaku/DanmakuController";
import ScriptedDanmakuProvider from "../danmaku/scripted/ScriptedDanmakuProvider";
import DanmakuProviderBase from "../danmaku/DanmakuProviderBase";
import DefaultEngineOptions from "./DefaultEngineOptions";
import VideoPlayerBase from "../interactive/video/VideoPlayerBase";
import Html5VideoPlayer from "../interactive/video/html5/Html5VideoPlayer";
import EngineOptions from "./EngineOptions";
import EngineBase from "../../../lib/glantern/src/gl/mic/EngineBase";
import VideoPlayerEvent from "../interactive/video/VideoPlayerEvent";
import VideoPlayerState from "../interactive/video/VideoPlayerState";
import TimeInfoEx from "./TimeInfoEx";
import CommonUtil from "../../../lib/glantern/src/gl/mic/CommonUtil";
import VirtualDom from "../../../lib/glantern/src/gl/mic/VirtualDom";
import CommentKeyEventArgs from "./bulletproof/events/CommentKeyEventArgs";
import EventBase from "../../../lib/glantern/src/gl/mic/EventBase";
import BPEvents from "./bulletproof/events/BPEvents";
import CommentData from "../bilibili/danmaku_api/CommentData";

/**
 * The root controller for Bulletproof.
 */
export default class Engine extends EngineBase {

    /**
     * Creates a new {@link Engine} instance.
     */
    constructor() {
        super();
        this._options = CommonUtil.deepClone(DefaultEngineOptions);
    }

    /**
     * Initialize the {@link Engine} instance with default parameters.
     * @param canvas {HTMLCanvasElement}
     * @param width {Number} Width of stage requested, in pixels.
     * @param height {Number} Height of stage requested, in pixels.
     * @param parent {HTMLElement} Parent of views.
     */
    initialize(canvas: HTMLCanvasElement, width: number, height: number, parent: HTMLElement): void {
        if (this.isInitialized) {
            return;
        }

        super.initialize(canvas, width, height);
        var options = this.options;
        var controller = new DanmakuController(this);
        this._danmakuController = controller;

        this._blackCurtainView = VirtualDom.createElement<HTMLDivElement>("div");

        if (options.videoPlayerEnabled) {
            var videoPlayer: VideoPlayerBase = null;
            if (options.useWebChimeraForVideoPlayback) {
                console.warn("WebChimera integration is not implemented yet.");
            } else {
                videoPlayer = new Html5VideoPlayer();
            }
            this._videoPlayer = videoPlayer;
            if (videoPlayer !== null) {
                videoPlayer.initialize(width, height);
                videoPlayer.addEventListener(VideoPlayerEvent.VIDEO_TIME_UPDATE, this.__onVideoTimeUpdate.bind(this));
                videoPlayer.addEventListener(VideoPlayerEvent.VIDEO_PLAY, this.__onVideoPlay.bind(this));
                this.attachUpdateFunction(this.__updateVideoTime.bind(this));
            }
        }

        this.__initHtmlElements(width, height, parent);

        // The earlier a provider is added in, the deeper it is in Z axis.
        var provider: DanmakuProviderBase;
        if (options.scriptedDanmakuEnabled) {
            provider = new ScriptedDanmakuProvider(controller);
            controller.addProvider(provider);
        }

        this.attachUpdateFunction(this.__updateDanmakus.bind(this));
    }

    /**
     * Disposes the {@link Engine} instance and release all resources occupied.
     */
    dispose(): void {
        this.danmakuController.dispose();
        this._danmakuController = null;
        super.dispose();
    }

    /**
     * Use this method to activate Players' key triggers.
     * @param keyCode {Number} The key code.
     * @param keyUp {Boolean} Whether this is a KeyUp event.
     */
    raiseKeyEvent(keyCode: number, keyUp: boolean): void {
        var e = new CommentKeyEventArgs(keyCode, keyUp);
        this.dispatchEvent(EventBase.create(BPEvents.COMMENT_KEY), e);
    }

    /**
     * Use this method to activate Players' comment triggers.
     * @param data {CommentData} The CommentData of newly added danmaku.
     */
    raiseCommentEvent(data: CommentData): void {
        this.dispatchEvent(EventBase.create(BPEvents.COMMENT_ADDED), data);
    }

    /**
     * Gets the {@link DanmakuController} instance associated with current {@link Engine} instance.
     * @returns {DanmakuController}
     */
    get danmakuController(): DanmakuController {
        return this._danmakuController;
    }

    /**
     * Gets current video playback time, in milliseconds.
     * @returns {Number}
     */
    get videoMillis(): number {
        return this.options.videoPlayerEnabled ? this._videoMillis : this.elapsedMillis;
    }

    get videoPlayer(): VideoPlayerBase {
        return this._videoPlayer;
    }

    get videoView(): HTMLElement {
        return CommonUtil.ptr(this.videoPlayer) ? this.videoPlayer.view : null;
    }

    get options(): EngineOptions {
        return this._options;
    }

    get blackCurtainView(): HTMLDivElement {
        return this._blackCurtainView;
    }

    private __updateVideoTime(timeInfo: TimeInfoEx): void {
        // If the video player is disabled, then follow our own timer.
        if (!this.options.videoPlayerEnabled || this.videoPlayer.state === VideoPlayerState.Playing) {
            this._videoMillis += this.elapsedMillis - this._lastTimeVideoUpdated;
            this._lastTimeVideoUpdated = this.elapsedMillis;
        }
        timeInfo.millisOfVideo = this._videoMillis;
    }

    private __updateDanmakus(timeInfo: TimeInfoEx): void {
        this.danmakuController.update(timeInfo);
    }

    private __onVideoTimeUpdate(): void {
        this._playerReportedVideoMillis = this.videoPlayer.currentTime * 1000;
    }

    private __onVideoPlay(): void {
        this._lastTimeVideoUpdated = this.elapsedMillis;
    }

    private __initHtmlElements(width: number, height: number, parent: HTMLElement): void {
        var blackCurtainView = this.blackCurtainView;
        var blackCurtainStyle = blackCurtainView.style;
        blackCurtainStyle.width = `${width}px`;
        blackCurtainStyle.height = `${height}px`;
        blackCurtainStyle.backgroundColor = "black";
        blackCurtainStyle.position = "absolute";
        blackCurtainStyle.zIndex = "0";
        var videoView = this.videoView;
        if (CommonUtil.ptr(videoView)) {
            var videoStyle = videoView.style;
            videoStyle.position = "absolute";
            videoStyle.zIndex = "1";
        }
        var view = this.view;
        view.style.position = "absolute";
        view.style.zIndex = "9999";

        parent.appendChild(blackCurtainView);
        parent.appendChild(videoView);
        parent.appendChild(view);
    }

    private _videoMillis: number = 0;
    private _playerReportedVideoMillis: number = 0;
    private _lastTimeVideoUpdated: number = -1;
    private _danmakuController: DanmakuController = null;
    private _videoPlayer: VideoPlayerBase = null;
    private _options: EngineOptions = null;
    private _blackCurtainView: HTMLDivElement = null;

}
