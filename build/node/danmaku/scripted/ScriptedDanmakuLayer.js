/**
 * Created by MIC on 2016/2/8.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DisplayObjectContainer_1 = require("../../../lib/glantern/src/flash/display/DisplayObjectContainer");
var ScriptedDanmakuLayer = (function (_super) {
    __extends(ScriptedDanmakuLayer, _super);
    function ScriptedDanmakuLayer(root, parent) {
        _super.call(this, root, parent);
    }
    ScriptedDanmakuLayer.prototype.__update = function () {
    };
    ScriptedDanmakuLayer.prototype.__render = function (renderer) {
    };
    return ScriptedDanmakuLayer;
})(DisplayObjectContainer_1.DisplayObjectContainer);
exports.ScriptedDanmakuLayer = ScriptedDanmakuLayer;

//# sourceMappingURL=ScriptedDanmakuLayer.js.map
