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

    bd.bilidanmaku.initialize(root);

    function ExecContext() {
        "use strict";
        // turning arguments into an array
        var args = Array.prototype.slice.call(arguments);
        // the last argument is the callback
        var callback = args.pop();
        // make sure the function is called
        // as a constructor
        if (!(this instanceof ExecContext)) {
            return new ExecContext(callback);
        }
        // call the callback
        callback();
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

    /*
     var ev = Function('console.log(this.$); console.log(window);'); // Good test!
     //ev.bind(this);
     console.log("Call -- prototype");
     ExecContext(ev.bind(this));
     */

    // 如果帧率限制设置太低，会造成如果用小的 setInterval() 进行第三方绘制，就会出现闪屏的现象
    bd.bulletproof.Bulletproof.init(container, 50);
})(document.getElementById('bp-div'));


