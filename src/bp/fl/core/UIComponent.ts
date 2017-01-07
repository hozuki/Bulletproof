/**
 * Created by MIC on 2016-11-10.
 */

import DisplayObjectContainer from "../../../../lib/glantern/src/gl/flash/display/DisplayObjectContainer";
import TimeInfo from "../../../../lib/glantern/src/gl/mic/TimeInfo";
import WebGLRenderer from "../../../../lib/glantern/src/gl/webgl/WebGLRenderer";
import Graphics from "../../../../lib/glantern/src/gl/flash/display/Graphics";
import Stage from "../../../../lib/glantern/src/gl/flash/display/Stage";

export default class UIComponent extends DisplayObjectContainer {

    constructor(root: Stage, parent: DisplayObjectContainer) {
        super(root, parent);
        this._graphics = new Graphics(this, root.$worldRenderer);
        this._styles = new Map<string, any>();
    }

    get graphics(): Graphics {
        return this._graphics;
    }

    dispose(): void {
        this.graphics.dispose();
        this._graphics = null;
        super.dispose();
    }

    setStyle(style: string, value: Object): void {
        // TODO
        this._styles.set(style, value);
    }

    getStyle(style: string): Object {
        return this._styles.get(style);
    }

    move(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    setSize(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }

    protected _$update(timeInfo: TimeInfo): void {
    }

    protected _$render(renderer: WebGLRenderer): void {
        this.graphics.$render(renderer);
    }

    private _graphics: Graphics = null;
    private _styles: Map<string, any> = null;

}
