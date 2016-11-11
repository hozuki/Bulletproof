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
        var commentTriggers = $commentTriggers;
        for (var i = 0; i < commentTriggers.length; ++i) {
            if (commentTriggers[i].func === f) {
                return -1;
            }
        }
        var commentTrigger: CommentTriggerHandler = {
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
        var keyTriggers = $keyTriggers;
        for (var i = 0; i < keyTriggers.length; ++i) {
            if (keyTriggers[i].func === f) {
                return -1;
            }
        }
        var keyTrigger: KeyTriggerHandler = {
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
        var timers = $timers;
        if (timers.indexOf(timer) < 0) {
            timers.push(timer);
        }
    }

    static clearTimer(): void {
        var timers = $timers;
        for (var i = 0; i < timers.length; ++i) {
            timers[i].dispose();
        }
        while (timers.length > 0) {
            timers.pop();
        }
    }

    static clearEl(): void {
        var layer = ScriptedDanmakuProvider.instance.layer;
        while (layer.numChildren > 0) {
            var child = layer.getChildAt(0);
            layer.removeChildAt(0);
            child.dispose();
        }
    }

    static clearTrigger(): void {
        var engine = Engine.instance;
        engine.removeEventListener(BPEvents.COMMENT_ADDED, __commentTriggerListener);
        engine.removeEventListener(BPEvents.COMMENT_KEY, __keyTriggerListener);
        var triggerCollectionList: TimeoutFunction[][] = [$commentTriggers, $keyTriggers];
        for (var i = 0; i < triggerCollectionList.length; ++i) {
            var triggers = triggerCollectionList[i];
            while (triggers.length > 0) {
                triggers.pop();
            }
        }
    }

    // Bulletproof
    static $init(): void {
        var engine = Engine.instance;
        engine.addEventListener(BPEvents.COMMENT_ADDED, __commentTriggerListener);
        engine.addEventListener(BPEvents.COMMENT_KEY, __keyTriggerListener);
    }

}

function __commentTriggerListener(data: CommentData): void {
    var now = Engine.instance.elapsedMillis;
    var commentTriggers = $commentTriggers;
    for (var i = 0; i < commentTriggers.length; ++i) {
        var trigger = commentTriggers[i];
        if (now > trigger.timestamp + trigger.timeout) {
            CommonUtil.removeAt(commentTriggers, i);
            --i;
        }
        trigger.func(data);
    }
}

function __keyTriggerListener(e: CommentKeyEventArgs): void {
    var now = Engine.instance.elapsedMillis;
    var keyTriggers = $keyTriggers;
    for (var i = 0; i < keyTriggers.length; ++i) {
        var trigger = keyTriggers[i];
        if (now > trigger.timestamp + trigger.timeout) {
            CommonUtil.removeAt(keyTriggers, i);
            --i;
        }
        if (e.keyUp === trigger.up) {
            // Only listen to a subset of key codes.
            var keyCode = e.keyCode;
            var shouldListen =
                (96 <= keyCode && keyCode <= 105) || // Numpad0-Numpad9
                (33 <= keyCode && keyCode <= 40); // PgUp, PgDn, End, Home, LURD
            if (!shouldListen) {
                continue;
            }
            trigger.func(keyCode);
        }
    }
}
