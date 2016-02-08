/**
 * Created by MIC on 2016/2/8.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DisplayObjectContainer_1 = require("../../../lib/glantern/src/flash/display/DisplayObjectContainer");
var CodeDanmakuLayer = (function (_super) {
    __extends(CodeDanmakuLayer, _super);
    function CodeDanmakuLayer(root, parent) {
        _super.call(this, root, parent);
    }
    CodeDanmakuLayer.prototype.__update = function () {
    };
    CodeDanmakuLayer.prototype.__render = function (renderer) {
    };
    return CodeDanmakuLayer;
})(DisplayObjectContainer_1.DisplayObjectContainer);
exports.CodeDanmakuLayer = CodeDanmakuLayer;

//# sourceMappingURL=CodeDanmakuLayer.js.map
