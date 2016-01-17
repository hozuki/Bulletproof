/**
 * Created by MIC on 2015/12/28.
 */

import {DanmakuLayoutManagerBase} from "../DanmakuLayoutManagerBase";
import {CodeDanmakuProvider} from "./CodeDanmakuProvider";
import {DanmakuKind} from "../DanmakuKind";
import {DanmakuBase} from "../DanmakuBase";
import {NotImplementedError} from "../../../lib/glantern/src/_util/NotImplementedError";
import {Point} from "../../../lib/glantern/src/flash/geom/Point";

export class CodeDanmakuLayoutManager extends DanmakuLayoutManagerBase {

    constructor(provider:CodeDanmakuProvider) {
        super(provider);
        this._danmakuProvider = provider;
    }

    dispose():void {
    }

    getAdvisedLocation(danmaku:DanmakuBase):Point {
        // Code danmakus decide their locations by themselves.
        return null;
    }

    performLayout():void{
        // Do nothing.
    }

    get danmakuProvider():CodeDanmakuProvider {
        return this._danmakuProvider;
    }

    get danmakuKind():DanmakuKind {
        return DanmakuKind.Code;
    }

    // Writing in this pattern avoids force initialization of type-overridden members.
    protected _danmakuProvider:CodeDanmakuProvider;

}
