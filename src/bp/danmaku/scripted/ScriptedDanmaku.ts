/**
 * Created by MIC on 2015/12/28.
 */
import DanmakuKind from "../DanmakuKind";
import ScriptedDanmakuLayoutManager from "./ScriptedDanmakuLayoutManager";
import Engine from "../../mic/Engine";
import ScriptedDanmakuProvider from "./ScriptedDanmakuProvider";
import IDanmaku from "../IDanmaku";
import ScriptedDanmakuCreateParams from "./ScriptedDanmakuCreateParams";
import CommentData from "../../bilibili/danmaku_api/CommentData";
import ScriptedDanmakuLayer from "./ScriptedDanmakuLayer";

export default class ScriptedDanmaku implements IDanmaku {

    constructor(layoutManager: ScriptedDanmakuLayoutManager, createParams: ScriptedDanmakuCreateParams) {
        this._layoutManager = layoutManager;
        this._danmakuProvider = layoutManager.danmakuProvider;
        this._engine = layoutManager.engine;
        this._createParams = createParams;
        this._layer = this.danmakuProvider.layer;
    }

    dispose(): void {
    }

    get danmakuKind(): DanmakuKind {
        return DanmakuKind.Scripted;
    }

    get layoutManager(): ScriptedDanmakuLayoutManager {
        return this._layoutManager;
    }

    get danmakuProvider(): ScriptedDanmakuProvider {
        return this._danmakuProvider;
    }

    getContent(): string {
        return this._content;
    }

    getText(): string {
        // No readable text.
        return "";
    }

    get layer(): ScriptedDanmakuLayer {
        return this._layer;
    }

    initialize(content: string, time: number): void {
        this._content = content;
        this._bornTime = typeof this.createParams.bornTime === "number" ? this.createParams.bornTime : time;
    }

    get isExecuted(): boolean {
        return this._isExecuted;
    }

    execute(): void {
        if (this.isExecuted) {
            return;
        }
        if (ScriptedDanmaku.__censor()) {
            this.__runInVM();
            this._isExecuted = true;
        }
    }

    get createParams(): ScriptedDanmakuCreateParams {
        return this._createParams;
    }

    get engine(): Engine {
        return this._engine;
    }

    get bornTime(): number {
        return this._bornTime;
    }

    get lifeTime(): number {
        return this.engine.options.codeDanmakuLifeTimeSecs;
    }

    visible: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
    right: number;
    bottom: number;

    getCommentData(): CommentData {
        return {
            txt: this.getContent(),
            time: this.bornTime.toString(),
            color: 0x000000,
            pool: this.danmakuProvider.pool,
            mode: 8,
            fontSize: 0
        };
    }

    private static __censor(): boolean {
        return true;
    }

    private __runInVM(): void {
        //vm.runInNewContext(this.getContent(), this.danmakuProvider.scriptContext);
        this.danmakuProvider.eval(this.getContent());
        //console.log(this.danmakuProvider.scriptContext);
    }

    private _content: string = null;
    private _bornTime: number = 0;
    private _engine: Engine = null;
    private _layoutManager: ScriptedDanmakuLayoutManager = null;
    private _danmakuProvider: ScriptedDanmakuProvider = null;
    private _layer: ScriptedDanmakuLayer = null;
    private _createParams: ScriptedDanmakuCreateParams = null;
    private _isExecuted: boolean = false;

}
