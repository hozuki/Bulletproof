/**
 * Created by MIC on 2015/12/28.
 */

import {DanmakuLayoutManagerBase} from "../DanmakuLayoutManagerBase";
import {ScriptedDanmakuProvider} from "./ScriptedDanmakuProvider";
import {DanmakuKind} from "../DanmakuKind";
import {IDanmaku} from "../IDanmaku";
import {StageResizedEventArgs} from "../StageResizedEventArgs";

export class ScriptedDanmakuLayoutManager extends DanmakuLayoutManagerBase {

    constructor(provider:ScriptedDanmakuProvider) {
        super(provider);
        this._danmakuProvider = provider;
    }

    dispose():void {
    }

    performLayout():void {
        // Do nothing.
    }

    onStageResize(sender:any, e:StageResizedEventArgs):void {
    }

    get danmakuProvider():ScriptedDanmakuProvider {
        return this._danmakuProvider;
    }

    get danmakuKind():DanmakuKind {
        return DanmakuKind.Scripted;
    }

    // Writing in this pattern avoids force initialization of type-overridden members.
    protected _danmakuProvider:ScriptedDanmakuProvider;

}
