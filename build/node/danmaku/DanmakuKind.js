/**
 * Created by MIC on 2015/12/28.
 */
(function (DanmakuKind) {
    /**
     * Note: This type handles all types (0: flying, 1: fixed on top, 2: fixed on bottom) of danmaku
     */
    DanmakuKind[DanmakuKind["Simple"] = 0] = "Simple";
    DanmakuKind[DanmakuKind["Mode7"] = 7] = "Mode7";
    DanmakuKind[DanmakuKind["Code"] = 8] = "Code";
})(exports.DanmakuKind || (exports.DanmakuKind = {}));
var DanmakuKind = exports.DanmakuKind;

//# sourceMappingURL=DanmakuKind.js.map
