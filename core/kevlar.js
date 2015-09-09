/**
 * Created by MIC on 2015/8/29.
 */

(function (container, video) {
    var bp = require('./lib/bp.js');
    var flash = require('./lib/flash.js');
    var fl = require('./lib/fl.js');

    function def(obj, name, rvalue) {
        Object.defineProperty(obj, name, {
            get: function () {
                return rvalue;
            },
            set: function (v) {
            }
        });
    }

    var bulletproof = new bp.bulletproof.Bulletproof();
    bulletproof.initialize(container, video);
    console.log(bulletproof);
    var bilidanmaku = bulletproof.module;

    // BSE basics
    def(this, '$', bilidanmaku.$);
    def(this, '$G', bilidanmaku.$G);
    def(this, 'Bitmap', bilidanmaku.Bitmap);
    def(this, 'Display', bilidanmaku.Display);
    def(this, 'Global', bilidanmaku.Global);
    //def(this, 'ITween', bd.ITween); // Interface, not a class
    def(this, 'Player', bilidanmaku.Player);
    def(this, 'ScriptManager', bilidanmaku.ScriptManager);
    def(this, 'Storage', bilidanmaku.Storage);
    def(this, 'Utils', bilidanmaku.Utils);
    def(this, 'Tween', bilidanmaku.Tween);

    // external libraries
    def(this, 'flash', flash);
    def(this, 'fl', fl);
    def(this, 'Bulletproof', bulletproof);

    // global functions
    def(this, 'trace', bilidanmaku.trace);
    def(this, 'clear', bilidanmaku.clear);
    def(this, 'getTimer', bilidanmaku.getTimer);
    def(this, 'timer', bilidanmaku.timer);
    def(this, 'interval', bilidanmaku.interval);
    def(this, 'foreach', bilidanmaku.foreach);
    def(this, 'clone', bilidanmaku.clone);
    def(this, 'load', bilidanmaku.load);

    // safety
    //def(bd, 'console', null);
    //def(this, 'window', null);
    //def(this, 'document', null);

    // test
    def(this, 'Timer', bilidanmaku.Timer);

    bulletproof.enterMainLoop();
})(document.getElementById('bp-div'), document.getElementById('bp-video'));


