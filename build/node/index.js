/**
 * Created by MIC on 2015/12/28.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var VERSION = "Bulletproof/0.6.0-alpha (BiliBili, like BSE, like CCL, like Flash) HTML5/*";
exports.version = VERSION;
__export(require("./Bulletproof"));
var bilibili = require("./bilibili/index");
exports.bilibili = bilibili;
var danmaku = require("./danmaku/index");
exports.danmaku = danmaku;
var interactive = require("./interactive/index");
exports.interactive = interactive;
var BulletproofConfig_1 = require("./BulletproofConfig");
exports.configuration = BulletproofConfig_1.BulletproofConfig;
__export(require("../lib/glantern/src/index"));

//# sourceMappingURL=index.js.map
