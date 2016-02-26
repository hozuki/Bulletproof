/**
 * Created by MIC on 2016/1/7.
 */

import {BiliBiliDanmakuApiContainer} from "../BiliBiliDanmakuApiContainer";
import {BiliBiliDamakuApiObject} from "./BiliBiliDamakuApiObject";
import {CommentData} from "./CommentData";
import {VideoPlayerBase} from "../../interactive/video/VideoPlayerBase";
import {VideoPlayerState} from "../../interactive/video/VideoPlayerState";
import {PlayerState} from "./PlayerState";
import {DanmakuProviderBase} from "../../danmaku/DanmakuProviderBase";
import {GLUtil} from "../../../lib/glantern/lib/glantern-utils/src/GLUtil";
import {NotImplementedError} from "../../../lib/glantern/lib/glantern-utils/src/NotImplementedError";
import {DisplayObject} from "../../../lib/glantern/src/glantern/flash/display/DisplayObject";
import {Sound} from "../../../lib/glantern/src/glantern/flash/media/Sound";

export class Player extends BiliBiliDamakuApiObject {

    constructor(apiContainer:BiliBiliDanmakuApiContainer) {
        super(apiContainer);
        this._videoPlayer = apiContainer.bulletproof.videoPlayer;
    }

    play():void {
        if (this._videoPlayer !== null) {
            this._videoPlayer.play();
        }
    }

    pause():void {
        if (this._videoPlayer !== null) {
            this._videoPlayer.pause();
        }
    }

    seek(offset:number):void {
        if (this._videoPlayer !== null) {
            this._videoPlayer.currentTime = offset;
        }
    }

    jump(av:string, page:number = 1, newWindow:boolean = false):void {
        var url = GLUtil.formatString("http://www.bilibili.com/video/{0}/index_{1}.html", av, page);
        if (newWindow) {
            window.open(url, "_blank");
        } else {
            window.location.assign(url);
        }
    }

    get state():string {
        if (this._videoPlayer === null) {
            return PlayerState.INVALID;
        } else {
            var state = this._videoPlayer.state;
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

    get time():number {
        return this.apiContainer.bulletproof.timeElapsed;
    }

    commentTrigger(f:(cd:CommentData) => void, timeout:number = 1000):number {
        throw new NotImplementedError();
    }

    keyTrigger(f:(key:number) => void, timeout:number = 1000, up:boolean = false):number {
        throw new NotImplementedError();
    }

    setMask(obj:DisplayObject):void {
        throw new NotImplementedError();
    }

    createSound(t:string, onLoad:Function = null):Sound {
        throw new NotImplementedError();
    }

    get commentList():CommentData[] {
        var comments:CommentData[] = [];
        var providers = this.apiContainer.bulletproof.danmakuCoordinator.getDanmakuProviders();
        var provider:DanmakuProviderBase;
        for (var j = 0; j < providers.length; ++j) {
            provider = providers[j];
            for (var i = 0; i < provider.fullDanmakuList.length; ++i) {
                comments.push(provider.fullDanmakuList[i].getCommentData());
            }
        }
        return comments;
    }

    get refreshRate():number {
        return 1 / this.apiContainer.bulletproof.fps;
    }

    set refreshRate(v:number) {
        throw new NotImplementedError();
    }

    get width():number {
        return this.apiContainer.bulletproof.stage.stageWidth;
    }

    get height():number {
        return this.apiContainer.bulletproof.stage.stageHeight;
    }

    get videoWidth():number {
        return this._videoPlayer !== null ? this._videoPlayer.videoWidth : 0;
    }

    get videoHeight():number {
        return this._videoPlayer !== null ? this._videoPlayer.videoHeight : 0;
    }

    private _videoPlayer:VideoPlayerBase = null;

}
