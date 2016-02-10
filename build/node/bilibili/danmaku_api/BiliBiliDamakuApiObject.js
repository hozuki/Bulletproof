/**
 * Created by MIC on 2015/12/29.
 */
var BiliBiliDamakuApiObject = (function () {
    function BiliBiliDamakuApiObject(apiContainer) {
        this._apiContainer = null;
        this._apiContainer = apiContainer;
    }
    Object.defineProperty(BiliBiliDamakuApiObject.prototype, "apiContainer", {
        get: function () {
            return this._apiContainer;
        },
        enumerable: true,
        configurable: true
    });
    BiliBiliDamakuApiObject.prototype.__getExtraCreateParams = function () {
        var r = Object.create(null);
        r.bulletproof = this.apiContainer.bulletproof;
        r.bornTime = this.apiContainer.bulletproof.timeElapsed;
        r.creator = this.apiContainer.danmaku;
        return r;
    };
    return BiliBiliDamakuApiObject;
})();
exports.BiliBiliDamakuApiObject = BiliBiliDamakuApiObject;

//# sourceMappingURL=BiliBiliDamakuApiObject.js.map
