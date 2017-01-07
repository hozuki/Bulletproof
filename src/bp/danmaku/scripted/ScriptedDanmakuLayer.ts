/**
 * Created by MIC on 2016/2/8.
 */

import DisplayObjectContainer from "../../../../lib/glantern/src/gl/flash/display/DisplayObjectContainer";
import Stage from "../../../../lib/glantern/src/gl/flash/display/Stage";
import WebGLRenderer from "../../../../lib/glantern/src/gl/webgl/WebGLRenderer";
import TimeInfo from "../../../../lib/glantern/src/gl/mic/TimeInfo";

export default class ScriptedDanmakuLayer extends DisplayObjectContainer {

    constructor(root: Stage, parent: DisplayObjectContainer) {
        super(root, parent);
    }

    protected _$update(timeInfo: TimeInfo): void {
    }

    protected _$render(renderer: WebGLRenderer): void {
    }


}
