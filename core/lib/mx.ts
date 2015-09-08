/**
 * Created by MIC on 2015/9/9.
 */

/// <reference path="flash.ts"/>

import flash = require('./flash');

export module containers {

    export class Canvas extends flash.display.DisplayObjectContainer {

        public constructor(root:flash.display.DisplayObject, parent:flash.display.DisplayObjectContainer) {
            super(root, parent, false);
        }

        public remove():void {
            if (this._parent) {
                this._parent.removeChild(this);
            }
        }

    }

}
