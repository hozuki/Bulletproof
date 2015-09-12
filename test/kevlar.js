/**
 * Created by MIC on 2015/8/29.
 */

(function (container, video) {
    var bulletproof = {};
    var injector = require("../build/bulletproof-injector");

    function appendBulletproofModule(bp, injector, moduleName) {
        "use strict";
        var module = require(moduleName);
        injector.inject(module.bulletproof, bp);
    }

    appendBulletproofModule(bulletproof, injector, "../build/bulletproof-org");
    appendBulletproofModule(bulletproof, injector, "../build/bulletproof-mic");
    appendBulletproofModule(bulletproof, injector, "../build/bulletproof-thirdparty");
    appendBulletproofModule(bulletproof, injector, "../build/bulletproof-flash");
    appendBulletproofModule(bulletproof, injector, "../build/bulletproof-fl");
    appendBulletproofModule(bulletproof, injector, "../build/bulletproof-mx");
    appendBulletproofModule(bulletproof, injector, "../build/bulletproof-data-interface");
    appendBulletproofModule(bulletproof, injector, "../build/bulletproof-bilidanmaku");
    appendBulletproofModule(bulletproof, injector, "../build/bulletproof");

    (function exposeBilibiliApis() {
        "use strict";
        var members = ['CommentData', 'CommentField', 'Display', 'Bitmap', 'Storage',
            'Global', 'ITween', 'Player', 'ScriptManager', 'Shape', 'Tween', 'Utils', '$', '$G',
            'trace', 'clear', 'getTimer', 'timer', 'interval', 'foreach', 'clone', 'load'];
        for (var key in bulletproof.bilidanmaku) {
            if (bulletproof.bilidanmaku.hasOwnProperty(key)) {
                if (members.indexOf(key) >= 0) {
                    // TRICK
                    window[key] = bulletproof.bilidanmaku[key];
                }
            }
        }
    })();

    this.bp = bulletproof;
    this.bulletproof = new bulletproof.Bulletproof();
    this.bulletproof.initialize();
    bulletproof.AdvancedDanamaku.initialize(container, video);
    bulletproof.AdvancedDanamaku.start();
})(document.getElementById('bp-div'), document.getElementById('bp-video'));


