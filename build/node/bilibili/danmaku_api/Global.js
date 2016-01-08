/**
 * Created by MIC on 2015/12/29.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BiliBiliDamakuApiObject_1 = require("./BiliBiliDamakuApiObject");
var Global = (function (_super) {
    __extends(Global, _super);
    function Global(apiContainer) {
        _super.call(this, apiContainer);
        this._map = null;
        this._map = new Map();
    }
    Global.prototype._set = function (key, val) {
        this._map.set(key, val);
    };
    Global.prototype._get = function (key) {
        return this._map.get(key);
    };
    return Global;
})(BiliBiliDamakuApiObject_1.BiliBiliDamakuApiObject);
exports.Global = Global;

//# sourceMappingURL=Global.js.map
