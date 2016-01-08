/**
 * Created by MIC on 2015/12/28.
 */

import {DanmakuKind} from "./DanmakuKind";
import {IDisposable} from "../../lib/glantern/src/IDisposable";
import {Point} from "../../lib/glantern/src/flash/geom/Point";
import {DanmakuBase} from "./DanmakuBase";
import {DanmakuProviderBase} from "./DanmakuProviderBase";
import {NotImplementedError} from "../../lib/glantern/src/_util/NotImplementedError";

export abstract class DanmakuLayoutManagerBase implements IDisposable {

    constructor(provider:DanmakuProviderBase) {
        this._danmakuProvider = provider;
    }

    abstract getAdvisedLocation(danmaku:DanmakuBase):Point;

    get danmakuKind():DanmakuKind {
        throw new NotImplementedError();
    }

    abstract dispose():void;

    get danmakuProvider():DanmakuProviderBase {
        return this._danmakuProvider;
    }

    protected _danmakuProvider:DanmakuProviderBase = null;

}
