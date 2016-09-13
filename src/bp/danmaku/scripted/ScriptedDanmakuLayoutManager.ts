/**
 * Created by MIC on 2015/12/28.
 */

import {DanmakuLayoutManagerBase} from "../DanmakuLayoutManagerBase";
import {ScriptedDanmakuProvider} from "./ScriptedDanmakuProvider";
import {DanmakuKind} from "../DanmakuKind";
import {StageResizedEventArgs} from "../../mic/bulletproof/events/StageResizedEventArgs";
import {TimeInfoEx} from "../../mic/TimeInfoEx";

export class ScriptedDanmakuLayoutManager extends DanmakuLayoutManagerBase {

    constructor(provider: ScriptedDanmakuProvider) {
        super(provider);
    }

    performLayout(timeInfo: TimeInfoEx): void {
        // Do nothing.
    }

    onStageResize(sender: any, e: StageResizedEventArgs): void {
    }

    get danmakuProvider(): ScriptedDanmakuProvider {
        return this._danmakuProvider;
    }

    get danmakuKind(): DanmakuKind {
        return DanmakuKind.Scripted;
    }

    // Writing in this pattern avoids force initialization of type-overridden members.
    protected _danmakuProvider: ScriptedDanmakuProvider;

}
