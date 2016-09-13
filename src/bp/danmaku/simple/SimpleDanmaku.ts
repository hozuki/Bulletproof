/**
 * Created by MIC on 2016/8/23.
 */

import {TextDanmakuBase} from "../TextDanmakuBase";
import {CommentData} from "../../bilibili/danmaku_api/CommentData";
import {SimpleDanmakuProvider} from "./SimpleDanmakuProvider";
import {SimpleDanmakuLayoutManager} from "./SimpleDanmakuLayoutManager";
import {SimpleDanmakuLayer} from "./SimpleDanmakuLayer";
import {DanmakuKind} from "../DanmakuKind";
import {ISimpleDanmakuCreateParams} from "./ISimpleDanmakuCreateParams";
import {SimpleDanmakuType} from "./SimpleDanmakuType";

export class SimpleDanmaku extends TextDanmakuBase {

    constructor(layoutManager: SimpleDanmakuLayoutManager, createParams: ISimpleDanmakuCreateParams) {
        super(layoutManager);
        this._layer = this.danmakuProvider.layer;
        this._createParams = createParams;
    }

    getContent(): string {
        return this._content;
    }

    getText(): string {
        return this._content;
    }

    initialize(content: string, time?: number): void {
        this._content = content;
        var born = this._createParams.bornTime;
        this._bornTime = typeof born === "number" ? born : time;
    }

    getCommentData(): CommentData {
        return {
            txt: this.getText(),
            time: this.bornTime.toString(),
            color: 0x000000,
            pool: this.danmakuProvider.pool,
            mode: 0,
            fontSize: 0
        };
    }

    get danmakuKind(): DanmakuKind {
        return DanmakuKind.Simple;
    }

    get danmakuProvider(): SimpleDanmakuProvider {
        return this._danmakuProvider;
    }

    get layoutManager(): SimpleDanmakuLayoutManager {
        return this._layoutManager;
    }

    get layer(): SimpleDanmakuLayer {
        return this._layer;
    }

    get bornTime(): number {
        return this._bornTime;
    }

    get lifeTime(): number {
        return this.engine.options.simpleDanmakuLifeTimeSecs;
    }

    get createParams(): ISimpleDanmakuCreateParams {
        return this._createParams;
    }

    get subtype(): SimpleDanmakuType {
        return this.createParams.type;
    }

    protected _danmakuProvider: SimpleDanmakuProvider;
    protected _layoutManager: SimpleDanmakuLayoutManager;
    protected _layer: SimpleDanmakuLayer;
    private _content: string = null;
    private _bornTime: number = -1;
    private _createParams: ISimpleDanmakuCreateParams = null;

}
