/**
 * Created by MIC on 2016/2/8.
 */

import {DisplayObjectContainer} from "../../../lib/glantern/src/flash/display/DisplayObjectContainer";
import {WebGLRenderer} from "../../../lib/glantern/src/webgl/WebGLRenderer";
import {Stage} from "../../../lib/glantern/src/flash/display/Stage";

export class CodeDanmakuLayer extends DisplayObjectContainer {

    constructor(root:Stage, parent:DisplayObjectContainer) {
        super(root, parent);
    }

    protected __update():void {
    }

    protected __render(renderer:WebGLRenderer):void {
    }


}
