/**
 * Created by MIC on 2016/1/7.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BiliBiliDamakuApiObject_1 = require("./BiliBiliDamakuApiObject");
var NotImplementedError_1 = require("../../../lib/glantern/lib/glantern-utils/src/NotImplementedError");
var Storage = (function (_super) {
    __extends(Storage, _super);
    function Storage(apiContainer) {
        _super.call(this, apiContainer);
    }
    Storage.prototype.loadRank = function (complete, err) {
        if (err === void 0) { err = null; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Storage.prototype.uploadScore = function (score, name, complete, err) {
        if (name === void 0) { name = null; }
        if (complete === void 0) { complete = null; }
        if (err === void 0) { err = null; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Storage.prototype.saveData = function (userData, complete, err) {
        if (complete === void 0) { complete = null; }
        if (err === void 0) { err = null; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Storage.prototype.loadData = function (complete, err) {
        if (complete === void 0) { complete = null; }
        if (err === void 0) { err = null; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    return Storage;
})(BiliBiliDamakuApiObject_1.BiliBiliDamakuApiObject);
exports.Storage = Storage;

//# sourceMappingURL=Storage.js.map
