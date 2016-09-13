/**
 * Created by MIC on 2016/1/7.
 */

import {BiliBiliDanmakuApiContainer} from "../BiliBiliDanmakuApiContainer";
import {BiliBiliDamakuApiObject} from "./BiliBiliDamakuApiObject";

export class ScriptManager extends BiliBiliDamakuApiObject {

    constructor(apiContainer: BiliBiliDanmakuApiContainer) {
        super(apiContainer);
    }

    clearTimer(): void {
        var globalScriptManager = this.apiContainer.danmaku.danmakuProvider.scriptManager;
        globalScriptManager.clearTimers();
    }

    clearEl(): void {
        var globalScriptManager = this.apiContainer.danmaku.danmakuProvider.scriptManager;
        globalScriptManager.clearElements();
    }

    clearTrigger(): void {
        var globalScriptManager = this.apiContainer.danmaku.danmakuProvider.scriptManager;
        globalScriptManager.clearTriggers();
    }

}
