/**
 * Created by MIC on 2015/8/29.
 */

(function (container) {
    var bd = require('./lib/bd.js');
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

    // BSE basics
    def(this, '$', bd.bilidanmaku.$);
    def(this, '$G', bd.bilidanmaku.$G);
    def(this, 'Bitmap', bd.bilidanmaku.Bitmap);
    def(this, 'Display', bd.bilidanmaku.Display);
    def(this, 'Global', bd.bilidanmaku.Global);
    //def(this, 'ITween', bd.ITween); // Interface, not a class
    def(this, 'Player', bd.bilidanmaku.Player);
    def(this, 'ScriptManager', bd.bilidanmaku.ScriptManager);
    def(this, 'Storage', bd.bilidanmaku.Storage);
    def(this, 'Utils', bd.bilidanmaku.Utils);
    def(this, 'Tween', bd.bilidanmaku.Tween);

    // external libraries
    def(this, 'flash', flash);
    def(this, 'fl', fl);
    def(this, 'Bulletproof', bd.bulletproof.Bulletproof);
    def(this, 'bd', bd);

    // global functions
    def(this, 'trace', bd.bilidanmaku.trace);
    def(this, 'clear', bd.bilidanmaku.clear);
    def(this, 'getTimer', bd.bilidanmaku.getTimer);
    def(this, 'timer', bd.bilidanmaku.timer);
    def(this, 'interval', bd.bilidanmaku.interval);
    def(this, 'foreach', bd.bilidanmaku.foreach);
    def(this, 'clone', bd.bilidanmaku.clone);
    def(this, 'load', bd.bilidanmaku.load);

    // safety
    //def(bd, 'console', null);
    //def(this, 'window', null);
    //def(this, 'document', null);

    // test
    def(this, 'Timer', bd.bilidanmaku.Timer);

    bd.bulletproof.Bulletproof.init(container);
})(document.getElementById('bp-div'));


