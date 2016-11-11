/**
 * Created by MIC on 2016/1/7.
 */

import CommentData from "./CommentData";
import VideoPlayerBase from "../../interactive/video/VideoPlayerBase";
import VideoPlayerState from "../../interactive/video/VideoPlayerState";
import PlayerState from "./PlayerState";
import DanmakuProviderBase from "../../danmaku/DanmakuProviderBase";
import DisplayObject from "../../../../lib/glantern/src/gl/flash/display/DisplayObject";
import Sound from "../../../../lib/glantern/src/gl/flash/media/Sound";
import CommonUtil from "../../../../lib/glantern/src/gl/mic/CommonUtil";
import URLRequest from "../../../../lib/glantern/src/gl/flash/net/URLRequest";
import ScriptedDanmakuProvider from "../../danmaku/scripted/ScriptedDanmakuProvider";
import VirtualDom from "../../../../lib/glantern/src/gl/mic/VirtualDom";
import NotSupportedError from "../../../../lib/glantern/src/gl/flash/errors/NotSupportedError";
import Engine from "../../mic/Engine";
import BiliApiContract from "../BiliApiContract";

export default class Player {

    static play(): void {
        var videoPlayer = Player._videoPlayer;
        if (videoPlayer !== null) {
            videoPlayer.play();
        }
    }

    static pause(): void {
        var videoPlayer = Player._videoPlayer;
        if (videoPlayer !== null) {
            videoPlayer.pause();
        }
    }

    static seek(offset: number): void {
        var videoPlayer = Player._videoPlayer;
        if (videoPlayer !== null) {
            videoPlayer.currentTime = offset;
        }
    }

    static jump(av: string, page: number = 1, newWindow: boolean = false): void {
        var url = CommonUtil.formatString("http://www.bilibili.com/video/{0}/index_{1}.html", av, page);
        if (newWindow) {
            VirtualDom.openWindow(url, "_blank");
        } else {
            VirtualDom.assignLocation(url);
        }
    }

    static get state(): string {
        var videoPlayer = Player._videoPlayer;
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

    static get time(): number {
        return Engine.instance.videoMillis;
    }

    static commentTrigger(f: (cd: CommentData) => void, timeout: number = 1000): number {
        return BiliApiContract.ScriptManager.addCommentTrigger(f, timeout);
    }

    static keyTrigger(f: (key: number) => void, timeout: number = 1000, up: boolean = false): number {
        return BiliApiContract.ScriptManager.addKeyTrigger(f, timeout, up);
    }

    static setMask(obj: DisplayObject): void {
        ScriptedDanmakuProvider.instance.layer.mask = obj;
    }

    static createSound(t: string, onLoad: Function = null): Sound {
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

    static get commentList(): CommentData[] {
        var comments: CommentData[] = [];
        var providers = Engine.instance.danmakuController.getProviders();
        var provider: DanmakuProviderBase;
        for (var j = 0; j < providers.length; ++j) {
            provider = providers[j];
            for (var i = 0; i < provider.fullDanmakuList.length; ++i) {
                comments.push(provider.fullDanmakuList[i].getCommentData());
            }
        }
        return comments;
    }

    static get refreshRate(): number {
        return 1 / Engine.instance.fps;
    }

    static set refreshRate(v: number) {
        throw new NotSupportedError();
    }

    static get width(): number {
        return Engine.instance.stage.stageWidth;
    }

    static get height(): number {
        return Engine.instance.stage.stageHeight;
    }

    static get videoWidth(): number {
        var videoPlayer = Player._videoPlayer;
        return videoPlayer !== null ? videoPlayer.videoWidth : 0;
    }

    static get videoHeight(): number {
        var videoPlayer = Player._videoPlayer;
        return videoPlayer !== null ? videoPlayer.videoHeight : 0;
    }

    static $init(): void {
        Player._videoPlayer = Engine.instance.videoPlayer;
    }

    private static _videoPlayer: VideoPlayerBase = null;

}
