/**
 * Created by MIC on 2016/2/2.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DisplayObjectContainer_1 = require("../../../lib/glantern/src/flash/display/DisplayObjectContainer");
var DiscreteDisplayObjectContainer = (function (_super) {
    __extends(DiscreteDisplayObjectContainer, _super);
    function DiscreteDisplayObjectContainer() {
        _super.apply(this, arguments);
    }
    DiscreteDisplayObjectContainer.prototype.__update = function () {
        // Do no update work
    };
    DiscreteDisplayObjectContainer.prototype.__render = function (renderer) {
        // Do no render work
    };
    return DiscreteDisplayObjectContainer;
})(DisplayObjectContainer_1.DisplayObjectContainer);
exports.DiscreteDisplayObjectContainer = DiscreteDisplayObjectContainer;

//# sourceMappingURL=DiscreteDisplayObjectContainer.js.map
