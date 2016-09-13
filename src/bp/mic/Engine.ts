/**
 * Created by MIC on 2015/12/28.
 */

import {DanmakuController} from "../danmaku/DanmakuController";
import {ScriptedDanmakuProvider} from "../danmaku/scripted/ScriptedDanmakuProvider";
import {DanmakuProviderBase} from "../danmaku/DanmakuProviderBase";
import {SimpleDanmakuProvider} from "../danmaku/simple/SimpleDanmakuProvider";
import {DefaultEngineOptions} from "./DefaultEngineOptions";
import {VideoPlayerBase} from "../interactive/video/VideoPlayerBase";
import {Html5VideoPlayer} from "../interactive/video/html5/Html5VideoPlayer";
import {IEngineOptions} from "./IEngineOptions";
import {EngineBase} from "../../../lib/glantern/src/gl/mic/EngineBase";
import {VideoPlayerEvent} from "../interactive/video/VideoPlayerEvent";
import {VideoPlayerState} from "../interactive/video/VideoPlayerState";
import {TimeInfoEx} from "./TimeInfoEx";
import {CommonUtil} from "../../../lib/glantern/src/gl/mic/CommonUtil";
import {VirtualDom} from "../../../lib/glantern/src/gl/mic/VirtualDom";

/**
 * The root controller for Bulletproof.
 */
export class Engine extends EngineBase {

    /**
     * Creates a new {@link Engine} instance.
     */
    constructor() {
        super();
        this._options = CommonUtil.deepClone(DefaultEngineOptions);
    }

    /**
     * Initialize the {@link Engine} instance with default parameters.
     * @param width {Number} Width of stage requested, in pixels.
     * @param height {Number} Height of stage requested, in pixels.
     * @param parent {HTMLElement} Parent of views.
     */
    initialize(width: number, height: number, parent: HTMLElement): void {
        if (this.isInitialized) {
            return;
        }

        super.initialize(width, height);
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
        if (options.codeDanmakuEnabled) {
            provider = new ScriptedDanmakuProvider(controller);
            controller.addProvider(provider);
        }
        if (options.simpleDanmakuEnabled) {
            provider = new SimpleDanmakuProvider(controller);
            controller.addProvider(provider);
        }

        this.attachUpdateFunction(this.__updateDanmakus.bind(this));
    }

    /**
     * Disposes the {@link Engine} instance and release all resources occupied.
     */
    dispose(): void {
        this._danmakuController.dispose();
        this._danmakuController = null;
        super.dispose();
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
        return this._videoMillis;
    }

    get videoPlayer(): VideoPlayerBase {
        return this._videoPlayer;
    }

    get videoView(): HTMLElement {
        return CommonUtil.ptr(this.videoPlayer) ? this.videoPlayer.view : null;
    }

    get options(): IEngineOptions {
        return this._options;
    }

    get blackCurtainView(): HTMLDivElement {
        return this._blackCurtainView;
    }

    private __updateVideoTime(timeInfo: TimeInfoEx): void {
        if (this.videoPlayer.state === VideoPlayerState.Playing) {
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
    private _options: IEngineOptions = null;
    private _blackCurtainView: HTMLDivElement = null;

}
