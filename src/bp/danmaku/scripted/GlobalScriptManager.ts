/**
 * Created by MIC on 2016/9/13.
 */

import {KeyTriggerHandler} from "../../bilibili/internal/KeyTriggerHandler";
import {CommentTriggerHandler} from "../../bilibili/internal/CommentTriggerHandler";
import {ScriptedDanmakuProvider} from "./ScriptedDanmakuProvider";
import {BPEvents} from "../../mic/bulletproof/events/BPEvents";
import {TimeoutFunction} from "../../bilibili/internal/TimeoutFunction";
import {CommentData} from "../../bilibili/danmaku_api/CommentData";
import {CommentKeyEventArgs} from "../../mic/bulletproof/events/CommentKeyEventArgs";
import {CommonUtil} from "../../../../lib/glantern/src/gl/mic/CommonUtil";
import {NotImplementedError} from "../../../../lib/glantern/src/gl/flash/errors/NotImplementedError";

export class GlobalScriptManager {

    constructor(provider: ScriptedDanmakuProvider) {
        this._provider = provider;
        this._commentTriggers = [];
        this._keyTriggers = [];
        var engine = provider.engine;
        engine.addEventListener(BPEvents.COMMENT_ADDED, this.__commentTriggerListener);
        engine.addEventListener(BPEvents.COMMENT_KEY, this.__keyTriggerListener);
    }

    get danmakuProvider(): ScriptedDanmakuProvider {
        return this._provider;
    }

    addCommentTrigger(f: (cd: CommentData) => void, timeout: number): number {
        if (!CommonUtil.isFunction(f)) {
            return -1;
        }
        var commentTrigger = this._commentTriggers;
        for (var i = 0; i < commentTrigger.length; ++i) {
            if (commentTrigger[i].func === f) {
                return -1;
            }
        }
        var ct: CommentTriggerHandler = {
            timestamp: this.danmakuProvider.engine.elapsedMillis,
            timeout: timeout,
            func: f
        };
        commentTrigger.push(ct);
        return commentTrigger.length - 1;
    }

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
        var kt: KeyTriggerHandler = {
            up: up,
            timestamp: this.danmakuProvider.engine.elapsedMillis,
            timeout: timeout,
            func: f
        };
        keyTriggers.push(kt);
        return keyTriggers.length - 1;
    }

    clearTriggers(): void {
        var engine = this.danmakuProvider.engine;
        engine.removeEventListener(BPEvents.COMMENT_KEY, this.__keyTriggerListener);
        engine.removeEventListener(BPEvents.COMMENT_ADDED, this.__commentTriggerListener);
        var triggerCollectionList: TimeoutFunction[][] = [this._commentTriggers, this._keyTriggers];
        for (var i = 0; i < triggerCollectionList.length; ++i) {
            var triggers = triggerCollectionList[i];
            while (triggers.length > 0) {
                triggers.pop();
            }
        }
    }

    clearElements(): void {
        var displayingList = this.danmakuProvider.displayingDanmakuList;
        // WARNING: this may cause one or more of the scripts in ScriptedDanmakus crash!
        for (var i = 0; i < displayingList.length; ++i) {
            displayingList[i].clearElements();
            // But don't destroy danmakus. Only the elements they created.
        }
    }

    clearTimers(): void {
        throw new NotImplementedError();
    }

    private __commentTriggerListener(data: CommentData): void {
        var now = this.danmakuProvider.engine.elapsedMillis;
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
        var now = this.danmakuProvider.engine.elapsedMillis;
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

    private _provider: ScriptedDanmakuProvider = null;
    private _commentTriggers: CommentTriggerHandler[] = null;
    private _keyTriggers: KeyTriggerHandler[] = null;

}
