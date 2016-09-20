/**
 * Created by MIC on 2016/1/7.
 */

import {StaticDanmakuApiObject} from "../internal/StaticDanmakuApiObject";
import {KeyTriggerHandler} from "../internal/KeyTriggerHandler";
import {CommentTriggerHandler} from "../internal/CommentTriggerHandler";
import {CommonUtil} from "../../../../lib/glantern/src/gl/mic/CommonUtil";
import {CommentKeyEventArgs} from "../../mic/bulletproof/events/CommentKeyEventArgs";
import {BPEvents} from "../../mic/bulletproof/events/BPEvents";
import {CommentData} from "./CommentData";
import {ScriptedDanmakuProvider} from "../../danmaku/scripted/ScriptedDanmakuProvider";
import {TimeoutFunction} from "../internal/TimeoutFunction";
import {FiniteTimer} from "../../danmaku/scripted/dco/FiniteTimer";

export class ScriptManager extends StaticDanmakuApiObject {

    constructor(provider: ScriptedDanmakuProvider) {
        super();
        this._provider = provider;
        var engine = provider.engine;
        this._commentTriggers = [];
        this._keyTriggers = [];
        this._timers = [];
        this._thisCommentTrigger = this.__commentTriggerListener.bind(this);
        this._thisKeyTrigger = this.__keyTriggerListener.bind(this);
        engine.addEventListener(BPEvents.COMMENT_ADDED, this._thisCommentTrigger);
        engine.addEventListener(BPEvents.COMMENT_KEY, this._thisKeyTrigger);
    }

    // Bulletproof
    addCommentTrigger(f: (cd: CommentData) => void, timeout: number): number {
        if (!CommonUtil.isFunction(f)) {
            return -1;
        }
        var commentTriggers = this._commentTriggers;
        for (var i = 0; i < commentTriggers.length; ++i) {
            if (commentTriggers[i].func === f) {
                return -1;
            }
        }
        var commentTrigger: CommentTriggerHandler = {
            timestamp: this.$$danmakuProvider.engine.elapsedMillis,
            timeout: timeout,
            func: f
        };
        commentTriggers.push(commentTrigger);
        return commentTriggers.length - 1;
    }

    // Bulletproof
    addKeyTrigger(f: (key: number) => void, timeout: number, up: boolean): number {
        if (!CommonUtil.isFunction(f)) {
            return -1;
        }
        var keyTriggers = this._keyTriggers;
        for (var i = 0; i < keyTriggers.length; ++i) {
            if (keyTriggers[i].func === f) {
                return -1;
            }
        }
        var keyTrigger: KeyTriggerHandler = {
            up: up,
            timestamp: this.$$danmakuProvider.engine.elapsedMillis,
            timeout: timeout,
            func: f
        };
        keyTriggers.push(keyTrigger);
        return keyTriggers.length - 1;
    }

    // Bulletproof
    addTimer(timer: FiniteTimer): void {
        var timers = this._timers;
        if (timers.indexOf(timer) < 0) {
            timers.push(timer);
        }
    }

    clearTimer(): void {
        var timers = this._timers;
        for (var i = 0; i < timers.length; ++i) {
            timers[i].dispose();
        }
        while (timers.length > 0) {
            timers.pop();
        }
    }

    clearEl(): void {
        var displayingList = this.$$danmakuProvider.displayingDanmakuList;
        // WARNING: this may cause one or more of the scripts in ScriptedDanmakus crash!
        for (var i = 0; i < displayingList.length; ++i) {
            displayingList[i].clearElements();
            // But don't destroy danmakus. Only the elements they created.
        }
    }

    clearTrigger(): void {
        var engine = this.$$danmakuProvider.engine;
        engine.removeEventListener(BPEvents.COMMENT_ADDED, this._thisCommentTrigger);
        engine.removeEventListener(BPEvents.COMMENT_KEY, this._thisKeyTrigger);
        var triggerCollectionList: TimeoutFunction[][] = [this._commentTriggers, this._keyTriggers];
        for (var i = 0; i < triggerCollectionList.length; ++i) {
            var triggers = triggerCollectionList[i];
            while (triggers.length > 0) {
                triggers.pop();
            }
        }
    }

    // Bulletproof
    private get $$danmakuProvider(): ScriptedDanmakuProvider {
        return this._provider;
    }

    private __commentTriggerListener(data: CommentData): void {
        var now = this.$$danmakuProvider.engine.elapsedMillis;
        var commentTriggers = this._commentTriggers;
        for (var i = 0; i < commentTriggers.length; ++i) {
            var trigger = commentTriggers[i];
            if (now > trigger.timestamp + trigger.timeout) {
                CommonUtil.removeAt(commentTriggers, i);
                --i;
            }
            trigger.func(data);
        }
    }

    private __keyTriggerListener(e: CommentKeyEventArgs): void {
        var now = this.$$danmakuProvider.engine.elapsedMillis;
        var keyTriggers = this._keyTriggers;
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

    private _thisKeyTrigger: Function = null;
    private _thisCommentTrigger: Function = null;

    private _provider: ScriptedDanmakuProvider = null;
    private _commentTriggers: CommentTriggerHandler[] = null;
    private _keyTriggers: KeyTriggerHandler[] = null;
    private _timers: FiniteTimer[] = null;

}
