/**
 * Created by MIC on 2016/8/23.
 */

import {DisplayObject} from "../../../../lib/glantern/src/gl/flash/display/DisplayObject";
import {TimeInfo} from "../../../../lib/glantern/src/gl/mic/TimeInfo";
import {WebGLRenderer} from "../../../../lib/glantern/src/gl/webgl/WebGLRenderer";
import {ShaderManager} from "../../../../lib/glantern/src/gl/webgl/ShaderManager";
import {DisplayObjectContainer} from "../../../../lib/glantern/src/gl/flash/display/DisplayObjectContainer";
import {Stage} from "../../../../lib/glantern/src/gl/flash/display/Stage";
import {VirtualDom} from "../../../../lib/glantern/src/gl/mic/VirtualDom";

export class SimpleDanmakuLayer extends DisplayObject {

    constructor(root: Stage, parent: DisplayObjectContainer) {
        super(root, parent);
        this.__initCanvas();
    }

    dispose(): void {
        var canvas = this._canvas;
        canvas.parentElement.removeChild(canvas);
        this._canvas = null;
        super.dispose();
    }

    protected _$update(timeInfo: TimeInfo): void {
    }

    protected _$render(renderer: WebGLRenderer): void {
    }

    protected _$selectShader(shaderManager: ShaderManager): void {
    }

    private __initCanvas(): void {
        var canvas = VirtualDom.createElement<HTMLCanvasElement>("canvas");
        var view = this.stage.worldRenderer.view;
        canvas.width = view.width;
        canvas.height = view.height;
        canvas.style.position = "absolute";
        canvas.style.zIndex = "9998";
        view.parentElement.appendChild(canvas);
        this._canvas = canvas;
    }

    private _canvas: HTMLCanvasElement = null;

}
