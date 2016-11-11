/**
 * Created by MIC on 2015/12/29.
 */

import Display from "./Display";
import Global from "./Global";
import Utils from "./Utils";
import Storage from "./Storage";
import CommentBitmap from "./CommentBitmap";
import Bitmap from "./Bitmap";
import ScriptManager from "./ScriptManager";
import Tween from "./Tween";
import TweenImpl from "./TweenImpl";
import Player from "./Player";
import PlayerState from "./PlayerState";
import MotionEasing from "./MotionEasing";
import CommentField from "./CommentField";

export {
    Display,
    Global,
    Utils,
    Storage,
    CommentBitmap,
    Bitmap,
    ScriptManager,
    Tween,
    TweenImpl,
    Player,
    PlayerState,
    MotionEasing,
    CommentField
};

export * from "./Functions";

// (function () {
//     var reg = /export \* from "\.\/([^"]+)"/;
//     String.prototype.form = function () {
//         if (!this) {
//             return;
//         }
//         var lines = this.split('\n');
//         var s = "";
//         for (var i = 0; i < lines.length; ++i) {
//             var match = reg.exec(lines[i]);
//             console.log(match);
//             var o = "import " + match[1] + " from \"./" + match[1] + "\";\n";
//             s += o;
//         }
//         return s;
//     };
// })();
