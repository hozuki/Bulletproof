/**
 * Created by MIC on 2016-11-11.
 */

import CommentData from "./CommentData";
import DisplayObject from "../../../../lib/glantern/src/gl/flash/display/DisplayObject";
import Sound from "../../../../lib/glantern/src/gl/flash/media/Sound";

interface IPlayer {

    play(): void;
    pause(): void;
    seek(offset: number): void;
    jump(av: string, page?: number, newWindow?: boolean): void;
    state: string;
    time: number;
    commentTrigger(f: (cd: CommentData) => void, timeout?: number): number;
    keyTrigger(f: (key: number) => void, timeout?: number, up?: boolean): number;
    setMask(obj: DisplayObject): void;
    createSound(t: string, onLoad?: Function): Sound;
    commentList: CommentData[];
    refreshRate: number;
    width: number;
    height: number;
    videoWidth: number;
    videoHeight: number;

}

export default IPlayer;
