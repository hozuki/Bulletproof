/**
 * Created by MIC on 2015/9/9.
 */

import bulletproof_flash_display = require("./bulletproof-flash-display");

export module bulletproof.mx {

    import flash = bulletproof_flash_display.bulletproof.flash;

    export module containers {

        // The class located as mentioned in
        // http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/mx/containers/Canvas.html.
        // However, the hierarchy is too complicated, so only the most important members are implemented here.
        export class Canvas extends flash.display.DisplayObjectContainer {

            public constructor(root:flash.display.Stage, parent:flash.display.DisplayObjectContainer) {
                super(root, parent);
            }

        }

    }

}
