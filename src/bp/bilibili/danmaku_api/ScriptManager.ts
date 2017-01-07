/**
 * Created by MIC on 2016/1/7.
 */
import KeyTriggerHandler from "../internal/KeyTriggerHandler";
import CommentTriggerHandler from "../internal/CommentTriggerHandler";
import CommonUtil from "../../../../lib/glantern/src/gl/mic/CommonUtil";
import CommentKeyEventArgs from "../../mic/bulletproof/events/CommentKeyEventArgs";
import BPEvents from "../../mic/bulletproof/events/BPEvents";
import CommentData from "./CommentData";
import ScriptedDanmakuProvider from "../../danmaku/scripted/ScriptedDanmakuProvider";
import TimeoutFunction from "../internal/TimeoutFunction";
import FiniteTimer from "../../danmaku/scripted/dco/FiniteTimer";
import Engine from "../../mic/Engine";

const $commentTriggers: CommentTriggerHandler[] = [];
const $keyTriggers: KeyTriggerHandler[] = [];
const $timers: FiniteTimer[] = [];

export default class ScriptManager {

    // Bulletproof
    static addCommentTrigger(f: (cd: CommentData) => void, timeout: number): number {
        if (!CommonUtil.isFunction(f)) {
            return -1;
        }
        const commentTriggers = $commentTriggers;
        for (let i = 0; i < commentTriggers.length; ++i) {
            if (commentTriggers[i].func === f) {
                return -1;
            }
        }
        const commentTrigger: CommentTriggerHandler = {
            timestamp: Engine.instance.elapsedMillis,
            timeout: timeout,
            func: f
        };
        commentTriggers.push(commentTrigger);
        return commentTriggers.length - 1;
    }

    // Bulletproof
    static addKeyTrigger(f: (key: number) => void, timeout: number, up: boolean): number {
        if (!CommonUtil.isFunction(f)) {
            return -1;
        }
        const keyTriggers = $keyTriggers;
        for (let i = 0; i < keyTriggers.length; ++i) {
            if (keyTriggers[i].func === f) {
                return -1;
            }
        }
        const keyTrigger: KeyTriggerHandler = {
            up: up,
            timestamp: Engine.instance.elapsedMillis,
            timeout: timeout,
            func: f
        };
        keyTriggers.push(keyTrigger);
        return keyTriggers.length - 1;
    }

    // Bulletproof
    static addTimer(timer: FiniteTimer): void {
        const timers = $timers;
        if (timers.indexOf(timer) < 0) {
            timers.push(timer);
        }
    }

    static clearTimer(): void {
        const timers = $timers;
        for (let i = 0; i < timers.length; ++i) {
            timers[i].dispose();
        }
        while (timers.length > 0) {
            timers.pop();
        }
    }

    static clearEl(): void {
        const layer = ScriptedDanmakuProvider.instance.layer;
        while (layer.numChildren > 0) {
            const child = layer.getChildAt(0);
            layer.removeChildAt(0);
            child.dispose();
        }
    }

    static clearTrigger(): void {
        const engine = Engine.instance;
        engine.removeEventListener(BPEvents.COMMENT_ADDED, __commentTriggerListener);
        engine.removeEventListener(BPEvents.COMMENT_KEY, __keyTriggerListener);
        const triggerCollectionList: TimeoutFunction[][] = [$commentTriggers, $keyTriggers];
        for (let i = 0; i < triggerCollectionList.length; ++i) {
            const triggers = triggerCollectionList[i];
            triggers.splice(0, triggers.length);
        }
    }

    // Bulletproof
    static $init(): void {
        const engine = Engine.instance;
        engine.addEventListener(BPEvents.COMMENT_ADDED, __commentTriggerListener);
        engine.addEventListener(BPEvents.COMMENT_KEY, __keyTriggerListener);
    }

}

function __commentTriggerListener(data: CommentData): void {
    const now = Engine.instance.elapsedMillis;
    const commentTriggers = $commentTriggers;
    for (let i = 0; i < commentTriggers.length; ++i) {
        const trigger = commentTriggers[i];
        if (now > trigger.timestamp + trigger.timeout) {
            CommonUtil.removeAt(commentTriggers, i);
            --i;
        }
        trigger.func(data);
    }
}

function __keyTriggerListener(e: CommentKeyEventArgs): void {
    const now = Engine.instance.elapsedMillis;
    const keyTriggers = $keyTriggers;
    for (let i = 0; i < keyTriggers.length; ++i) {
        const trigger = keyTriggers[i];
        if (now > trigger.timestamp + trigger.timeout) {
            CommonUtil.removeAt(keyTriggers, i);
            --i;
        }
        if (e.keyUp === trigger.up) {
            // Only listen to a subset of key codes.
            const keyCode = e.keyCode;
            const shouldListen =
                (96 <= keyCode && keyCode <= 105) || // Numpad0-Numpad9
                (33 <= keyCode && keyCode <= 40); // PgUp, PgDn, End, Home, LURD
            if (!shouldListen) {
                continue;
            }
            trigger.func(keyCode);
        }
    }
}
