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

    this.ad.start();
})(document.getElementById('bp-div'), document.getElementById('bp-video'));


