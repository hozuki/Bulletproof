/**
 * Created by MIC on 2015/9/9.
 */

/// <reference path="../include/bulletproof-flash.d.ts"/>

import bulletproof_flash = require("./bulletproof-flash");

export module bulletproof.mx {

    import flash = bulletproof_flash.bulletproof.flash;

    export module containers {

        // The class located as mentioned in
        // http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/mx/containers/Canvas.html.
        // However, the hierarchy is too complicated, so only the most important members are implemented here.
        export class Canvas extends flash.display.DisplayObjectContainer {

            public constructor(root:flash.display.DisplayObject, parent:flash.display.DisplayObjectContainer) {
                super(root, parent, false);
            }

        }

    }

}
