/**
 * Created by MIC on 2016/1/7.
 */

import {BiliBiliDanmakuApiContainer} from "../BiliBiliDanmakuApiContainer";
import {BiliBiliDamakuApiObject} from "./BiliBiliDamakuApiObject";
import {NotImplementedError} from "../../../lib/glantern/src/_util/NotImplementedError";
import {DisplayObject} from "../../../lib/glantern/src/flash/display/DisplayObject";
import {CommentData} from "./CommentData";
import {Sound} from "../../../lib/glantern/src/flash/media/Sound";
import {_util} from "../../../lib/glantern/src/_util/_util";
import {VideoPlayerBase} from "../../interactive/video/VideoPlayerBase";
import {VideoPlayerState} from "../../interactive/video/VideoPlayerState";
import {PlayerState} from "./PlayerState";

export class Player extends BiliBiliDamakuApiObject {

    constructor(apiContainer:BiliBiliDanmakuApiContainer) {
        super(apiContainer);
        this._videoPlayer = this.apiContainer.bulletproof.videoPlayer;
    }

    play():void {
        this._videoPlayer.play();
    }

    pause():void {
        this._videoPlayer.pause();
    }

    seek(offset:number):void {
        this._videoPlayer.currentTime = offset;
    }

    jump(av:string, page:number = 1, newWindow:boolean = false):void {
        var url = _util.formatString("http://www.bilibili.com/video/{0}/index_{1}.html", av, page);
        if (newWindow) {
            window.open(url, "_blank");
        } else {
            window.location.assign(url);
        }
    }

    get state():string {
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
        throw new NotImplementedError();
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
        throw new NotImplementedError();
    }

    get videoHeight():number {
        throw new NotImplementedError();
    }

    private _videoPlayer:VideoPlayerBase = null;

}
