/**
 * Created by MIC on 2016/1/7.
 */

import {StaticDanmakuApiObject} from "./internal/StaticDanmakuApiObject";
import {CommentData} from "./CommentData";
import {VideoPlayerBase} from "../../interactive/video/VideoPlayerBase";
import {VideoPlayerState} from "../../interactive/video/VideoPlayerState";
import {PlayerState} from "./PlayerState";
import {DanmakuProviderBase} from "../../danmaku/DanmakuProviderBase";
import {DisplayObject} from "../../../../lib/glantern/src/gl/flash/display/DisplayObject";
import {Sound} from "../../../../lib/glantern/src/gl/flash/media/Sound";
import {NotImplementedError} from "../../../../lib/glantern/src/gl/flash/errors/NotImplementedError";
import {CommonUtil} from "../../../../lib/glantern/src/gl/mic/CommonUtil";
import {URLRequest} from "../../../../lib/glantern/src/gl/flash/net/URLRequest";
import {ScriptedDanmakuProvider} from "../../danmaku/scripted/ScriptedDanmakuProvider";
import {StaticDanmakuApiContract} from "../StaticDanmakuApiContract";
import {VirtualDom} from "../../../../lib/glantern/src/gl/mic/VirtualDom";

export class Player extends StaticDanmakuApiObject {

    constructor(provider: ScriptedDanmakuProvider, contract: StaticDanmakuApiContract) {
        super();
        this._provider = provider;
        this._contract = contract;
        this._videoPlayer = provider.engine.videoPlayer;
    }

    play(): void {
        var videoPlayer = this._videoPlayer;
        if (videoPlayer !== null) {
            videoPlayer.play();
        }
    }

    pause(): void {
        var videoPlayer = this._videoPlayer;
        if (videoPlayer !== null) {
            videoPlayer.pause();
        }
    }

    seek(offset: number): void {
        var videoPlayer = this._videoPlayer;
        if (videoPlayer !== null) {
            videoPlayer.currentTime = offset;
        }
    }

    jump(av: string, page: number = 1, newWindow: boolean = false): void {
        var url = CommonUtil.formatString("http://www.bilibili.com/video/{0}/index_{1}.html", av, page);
        if (newWindow) {
            VirtualDom.openWindow(url, "_blank");
        } else {
            VirtualDom.assignLocation(url);
        }
    }

    get state(): string {
        var videoPlayer = this._videoPlayer;
        if (videoPlayer === null) {
            return PlayerState.INVALID;
        } else {
            var state = videoPlayer.state;
            switch (state) {
                case VideoPlayerState.Playing:
                case VideoPlayerState.Seeking:
                    return PlayerState.PLAYING;
                case VideoPlayerState.Paused:
                    return PlayerState.PAUSE;
                case VideoPlayerState.Created:
                case VideoPlayerState.Initialized:
                case VideoPlayerState.Loaded:
                case VideoPlayerState.Stopped:
                    return PlayerState.STOP;
                default:
                    return PlayerState.INVALID;
            }
        }
    }

    get time(): number {
        return this.$$danmakuProvider.engine.videoMillis;
    }

    commentTrigger(f: (cd: CommentData) => void, timeout: number = 1000): number {
        return this.$$contract.ScriptManager.addCommentTrigger(f, timeout);
    }

    keyTrigger(f: (key: number) => void, timeout: number = 1000, up: boolean = false): number {
        return this.$$contract.ScriptManager.addKeyTrigger(f, timeout, up);
    }

    setMask(obj: DisplayObject): void {
        throw new NotImplementedError();
    }

    createSound(t: string, onLoad: Function = null): Sound {
        var request = new URLRequest(t);
        var sound = new Sound(request);
        if (CommonUtil.isFunction(onLoad)) {
            var handler = ((): () => void => {
                return (): void => {
                    onLoad();
                    sound.removeEventListener(Sound.COMPLETE, handler);
                }
            })();
            sound.addEventListener(Sound.COMPLETE, handler);
        }
        return sound;
    }

    get commentList(): CommentData[] {
        var comments: CommentData[] = [];
        var providers = this.$$danmakuProvider.engine.danmakuController.getProviders();
        var provider: DanmakuProviderBase;
        for (var j = 0; j < providers.length; ++j) {
            provider = providers[j];
            for (var i = 0; i < provider.fullDanmakuList.length; ++i) {
                comments.push(provider.fullDanmakuList[i].getCommentData());
            }
        }
        return comments;
    }

    get refreshRate(): number {
        return 1 / this.$$danmakuProvider.engine.fps;
    }

    set refreshRate(v: number) {
        throw new NotImplementedError();
    }

    get width(): number {
        return this.$$danmakuProvider.engine.stage.stageWidth;
    }

    get height(): number {
        return this.$$danmakuProvider.engine.stage.stageHeight;
    }

    get videoWidth(): number {
        var videoPlayer = this._videoPlayer;
        return videoPlayer !== null ? videoPlayer.videoWidth : 0;
    }

    get videoHeight(): number {
        var videoPlayer = this._videoPlayer;
        return videoPlayer !== null ? videoPlayer.videoHeight : 0;
    }

    private get $$danmakuProvider(): ScriptedDanmakuProvider {
        return this._provider;
    }

    private get $$contract(): StaticDanmakuApiContract {
        return this._contract;
    }

    private _provider: ScriptedDanmakuProvider = null;
    private _contract: StaticDanmakuApiContract = null;
    private _videoPlayer: VideoPlayerBase = null;

}
