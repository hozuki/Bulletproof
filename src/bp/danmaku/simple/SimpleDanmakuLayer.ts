/**
 * Created by MIC on 2016/2/2.
 */

import {SimpleDanmakuProvider} from "./SimpleDanmakuProvider";
import {SimpleDanmaku} from "./SimpleDanmaku";
import {TextField} from "../../../../lib/glantern/src/gl/flash/text/TextField";
import {Stage} from "../../../../lib/glantern/src/gl/flash/display/Stage";
import {DisplayObjectContainer} from "../../../../lib/glantern/src/gl/flash/display/DisplayObjectContainer";
import {WebGLRenderer} from "../../../../lib/glantern/src/gl/webgl/WebGLRenderer";
import {RenderHelper} from "../../../../lib/glantern/src/gl/webgl/RenderHelper";
import {Engine} from "../../mic/Engine";
import {GLUtil} from "../../../../lib/glantern/src/gl/mic/glantern/GLUtil";
import {TimeInfo} from "../../../../lib/glantern/src/gl/mic/TimeInfo";
import {CommonUtil} from "../../../../lib/glantern/src/gl/mic/CommonUtil";

export class SimpleDanmakuLayer extends TextField {

    constructor(root: Stage, parent: DisplayObjectContainer, provider: SimpleDanmakuProvider) {
        super(root, parent);
        this._provider = provider;
        this._engine = provider.engine;
    }

    get danmakuProvider(): SimpleDanmakuProvider {
        return this._provider;
    }

    get context2D(): CanvasRenderingContext2D {
        return this._context2D;
    }

    get engine(): Engine {
        return this._engine;
    }

    protected _$update(timeInfo: TimeInfo): void {
        if (this.danmakuProvider.displayingDanmakuList.length > 0) {
            this._canvasTarget.updateImageSize();
            this._$drawTextElements(this.context2D);
        }
    }

    protected _$render(renderer: WebGLRenderer): void {
        if (this.visible && this.alpha > 0 && this.danmakuProvider.displayingDanmakuList.length > 0) {
            this._canvasTarget.updateImageContent();
            RenderHelper.copyImageContent(renderer, this._canvasTarget, renderer.currentRenderTarget, false, renderer.currentRenderTarget.isRoot, this.transform.matrix3D, this.alpha, false);
        }
    }

    protected _$drawTextElements(context2D: CanvasRenderingContext2D): void {
        var danmaku: SimpleDanmaku;
        var lastDanmaku: SimpleDanmaku = null;
        var danmakuList = this.danmakuProvider.displayingDanmakuList;
        context2D.clearRect(0, 0, context2D.canvas.width, context2D.canvas.height);
        for (var i = 0; i < danmakuList.length; ++i) {
            danmaku = danmakuList[i];
            SimpleDanmakuLayer.__drawSimpleDanmaku(context2D, danmaku, lastDanmaku);
            lastDanmaku = danmaku;
        }
    }

    private static __drawSimpleDanmaku(context2D: CanvasRenderingContext2D, danmaku: SimpleDanmaku, last: SimpleDanmaku): void {
        if (!danmaku.visible) {
            return;
        }
        var x = danmaku.x, y = danmaku.y;
        var cp = danmaku.createParams;
        var lastCP = last ? last.createParams : null;
        var metrics = danmaku.metrics;
        if (!CommonUtil.ptr(last) || cp.fontName !== lastCP.fontName ||
            cp.fontSize !== lastCP.fontSize || cp.fontStyle !== lastCP.fontStyle) {
            context2D.font = `${cp.fontStyle} ${cp.fontSize}pt \"${cp.fontName}\"`;
        }
        if (cp.background) {
            context2D.fillStyle = GLUtil.colorToCssSharp(cp.backgroundColor);
            context2D.fillRect(x + metrics.bgBaseX, y + metrics.bgBaseY, metrics.bgWidth, metrics.bgHeight);
        }
        context2D.fillStyle = GLUtil.colorToCssSharp(cp.textColor);
        context2D.fillText(danmaku.getText(), x + metrics.textBaseX, y + metrics.textBaseY);
        if (cp.outline && cp.outlineThickness > 0) {
            context2D.lineWidth = cp.outlineThickness;
            context2D.strokeStyle = GLUtil.colorToCssSharp(cp.outlineColor);
            context2D.strokeText(danmaku.getText(), x + metrics.outlineBaseX, y + metrics.outlineBaseY);
        }
        if (cp.border && cp.borderThickness > 0) {
            context2D.lineWidth = cp.borderThickness;
            context2D.strokeStyle = GLUtil.colorToCssSharp(cp.borderColor);
            context2D.strokeRect(x + metrics.borderBaseX, y + metrics.borderBaseY, metrics.borderWidth, metrics.borderHeight);
        }
    }

    private _provider: SimpleDanmakuProvider = null;
    private _engine: Engine = null;

}
