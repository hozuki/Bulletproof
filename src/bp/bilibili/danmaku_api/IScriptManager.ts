/**
 * Created by MIC on 2016-11-11.
 */

import CommentData from "./CommentData";
import FiniteTimer from "../../danmaku/scripted/dco/FiniteTimer";

interface IScriptManager {

    addCommentTrigger(f: (cd: CommentData) => void, timeout: number): number;
    addKeyTrigger(f: (key: number) => void, timeout: number, up: boolean): number;
    addTimer(timer: FiniteTimer): void;
    clearTimer(): void;
    clearEl(): void;
    clearTrigger(): void;

}

export default IScriptManager;
