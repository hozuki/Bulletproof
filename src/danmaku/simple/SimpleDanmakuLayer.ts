/**
 * Created by MIC on 2016/2/2.
 */

import {SimpleDanmakuProvider} from "./SimpleDanmakuProvider";
import {SimpleDanmaku} from "./SimpleDanmaku";
import {TextField} from "../../../lib/glantern/src/flash/text/TextField";
import {Stage} from "../../../lib/glantern/src/flash/display/Stage";
import {DisplayObjectContainer} from "../../../lib/glantern/src/flash/display/DisplayObjectContainer";
import {WebGLRenderer} from "../../../lib/glantern/src/webgl/WebGLRenderer";
import {RenderHelper} from "../../../lib/glantern/src/webgl/RenderHelper";
import {GLUtil} from "../../../lib/glantern/lib/glantern-utils/src/GLUtil";

export class SimpleDanmakuLayer extends TextField {

    constructor(root:Stage, parent:DisplayObjectContainer, provider:SimpleDanmakuProvider) {
        super(root, parent);
        this._provider = provider;
    }

    get danmakuProvider():SimpleDanmakuProvider {
        return this._provider;
    }

    get context2D():CanvasRenderingContext2D {
        return this._context2D;
    }

    protected __update():void {
        if (this.danmakuProvider.displayingDanmakuList.length > 0) {
            this._canvasTarget.updateImageSize();
            this.__drawTextElements(this.context2D);
        }
    }

    protected __render(renderer:WebGLRenderer):void {
        if (this.visible && this.alpha > 0 && this.danmakuProvider.displayingDanmakuList.length > 0) {
            this._canvasTarget.updateImageContent();
            RenderHelper.copyImageContent(renderer, this._canvasTarget, renderer.currentRenderTarget, false, renderer.currentRenderTarget.isRoot, this.transform.matrix3D, this.alpha, false);
        }
    }

    protected __drawTextElements(context2D:CanvasRenderingContext2D):void {
        var danmaku:SimpleDanmaku;
        var lastDanmaku:SimpleDanmaku = null;
        var danmakuList = this.danmakuProvider.displayingDanmakuList;
        context2D.clearRect(0, 0, context2D.canvas.width, context2D.canvas.height);
        for (var i = 0; i < danmakuList.length; ++i) {
            danmaku = danmakuList[i];
            this.__drawSimpleDanmaku(context2D, danmaku, lastDanmaku);
            lastDanmaku = danmaku;
        }
    }

    protected __drawSimpleDanmaku(context2D:CanvasRenderingContext2D, danmaku:SimpleDanmaku, last:SimpleDanmaku):void {
        if (!danmaku.visible) {
            return;
        }
        var x = danmaku.x, y = danmaku.y;
        var cp = danmaku.createParams;
        var baseX = cp.outline && cp.outlineThickness > 0 ? cp.outlineThickness : 0;
        var baseY = baseX;
        var borderThickness = cp.border && cp.borderThickness > 0 ? cp.borderThickness : 0;
        if (GLUtil.isUndefinedOrNull(last) || cp.fontName !== last.createParams.fontName || cp.fontSize !== last.createParams.fontSize) {
            context2D.font = cp.fontStyle.toString() + " " + cp.fontSize.toString() + "pt \"" + cp.fontName + "\"";
        }
        var textWidth = danmaku.textWidth;
        // See TextField.ts.
        var textHeight = danmaku.textHeight;
        if (cp.background) {
            context2D.fillStyle = GLUtil.colorToCssSharp(cp.backgroundColor);
            context2D.fillRect(x, y, textWidth + borderThickness * 2, textHeight + borderThickness * 2);
        }
        context2D.fillStyle = GLUtil.colorToCssSharp(cp.textColor);
        context2D.fillText(danmaku.getText(), x + baseX + borderThickness, y + textHeight * 0.75 + borderThickness);
        if (cp.outline && cp.outlineThickness > 0) {
            context2D.lineWidth = cp.outlineThickness;
            context2D.strokeStyle = GLUtil.colorToCssSharp(cp.outlineColor);
            context2D.strokeText(danmaku.getText(), x + baseX + borderThickness, y + textHeight * 0.75 + borderThickness);
        }
        if (cp.border && cp.borderThickness > 0) {
            context2D.lineWidth = cp.borderThickness;
            context2D.strokeStyle = GLUtil.colorToCssSharp(cp.borderColor);
            context2D.strokeRect(x + borderThickness, y + borderThickness, textWidth + borderThickness * 2, this.textHeight + borderThickness * 2);
        }
    }

    private _provider:SimpleDanmakuProvider = null;

}
