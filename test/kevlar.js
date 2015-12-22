/**
 * Created by MIC on 2015/8/29.
 */

(function (container, video) {
    var bulletproof = {};
    var injector = require("../src/core/lib/bulletproof-injector");

    function appendBulletproofModule(bp, injector, moduleName) {
        "use strict";
        var module = require(moduleName);
        injector.inject(module.bulletproof, bp);
    }

    appendBulletproofModule(bulletproof, injector, "../src/core/lib/bulletproof-org");
    appendBulletproofModule(bulletproof, injector, "../src/core/lib/bulletproof-mic");
    appendBulletproofModule(bulletproof, injector, "../src/core/lib/bulletproof-thirdparty");
    appendBulletproofModule(bulletproof, injector, "../src/core/lib/bulletproof-flash-base");
    appendBulletproofModule(bulletproof, injector, "../src/core/lib/bulletproof-shaders");
    appendBulletproofModule(bulletproof, injector, "../src/core/lib/bulletproof-webgl");
    appendBulletproofModule(bulletproof, injector, "../src/core/lib/bulletproof-flash-display");
    appendBulletproofModule(bulletproof, injector, "../src/core/lib/bulletproof-flash-graphics");
    appendBulletproofModule(bulletproof, injector, "../src/core/lib/bulletproof-fl");
    appendBulletproofModule(bulletproof, injector, "../src/core/lib/bulletproof-mx");
    appendBulletproofModule(bulletproof, injector, "../src/core/lib/bulletproof-data-interface");
    appendBulletproofModule(bulletproof, injector, "../src/core/lib/bulletproof-bilidanmaku");
    appendBulletproofModule(bulletproof, injector, "../src/core/lib/bulletproof");

    this.bp = bulletproof;
    this.bulletproof = new bulletproof.Bulletproof();
    this.bulletproof.initialize();
    this.ad = bulletproof.AdvancedDanmaku.createInstance(container, video);
    bulletproof.BiliBiliDanmakuApi.attachApi(this.ad);

    (function attachBiliBiliApis(ad) {
        "use strict";
        for (var key in ad.api) {
            if (ad.api.hasOwnProperty(key)) {
                // TODO: TRICK
                window[key] = ad.api[key];
            }
        }
    })(this.ad);

    this.startAnimation = function () {
        this.ad.start();
    }.bind(this);
})(document.getElementById('bp-div'), document.getElementById('bp-video'));


