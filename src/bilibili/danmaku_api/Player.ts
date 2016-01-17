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

export class Player extends BiliBiliDamakuApiObject {

    constructor(apiContainer:BiliBiliDanmakuApiContainer) {
        super(apiContainer);
    }

    play():void {
        throw new NotImplementedError();
    }

    pause():void {
        throw new NotImplementedError();
    }

    seek(offset:number):void {
        throw new NotImplementedError();
    }

    jump(av:string, page:number = 1, newWindow:boolean = false):void {
        var url = _util.formatString("http://www.bilibili.com/video/{0}/index_{1}.html", av, page);
        if (newWindow) {
            window.open(url, "_blank");
        } else {
            window.location.href = url;
        }
    }

    get state():string {
        throw new NotImplementedError();
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

    get commentList():Array<CommentData> {
        throw new NotImplementedError();
    }

    refreshRate:number = 0;

    get width():number {
        return this.apiContainer.bulletproof.stage.width;
    }

    get height():number {
        return this.apiContainer.bulletproof.stage.height;
    }

    get videoWidth():number {
        throw new NotImplementedError();
    }

    get videoHeight():number {
        throw new NotImplementedError();
    }

}
