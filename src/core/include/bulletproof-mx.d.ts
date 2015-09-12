/**
 * Created by MIC on 2015/9/12.
 */

/// <reference path="bulletproof-flash.d.ts"/>

import bulletproof_flash = require("bulletproof-flash.d");

export declare module bulletproof.mx {

    import flash = bulletproof_flash.bulletproof.flash;

    export module containers {

        class Canvas extends flash.display.DisplayObjectContainer {
            constructor(root:flash.display.DisplayObject, parent:flash.display.DisplayObjectContainer);
        }

    }

}
