/**
 * Created by MIC on 2016/2/7.
 */
var SimpleDanamkuType_1 = require("./SimpleDanamkuType");
var _util_1 = require("../../../lib/glantern/src/_util/_util");
var BulletproofConfig_1 = require("../../BulletproofConfig");
var SimpleDanmakuHelper = (function () {
    function SimpleDanmakuHelper() {
    }
    SimpleDanmakuHelper.getDefaultParams = function () {
        return {
            bornTime: undefined,
            fontName: "SimHei",
            fontStyle: "bold",
            fontSize: 18,
            type: SimpleDanamkuType_1.SimpleDanmakuType.Flying,
            border: false,
            borderColor: 0x000000,
            borderThickness: 1,
            background: false,
            backgroundColor: 0x000000,
            textColor: 0xffffff,
            outline: true,
            outlineColor: 0x000000,
            outlineThickness: 1
        };
    };
    SimpleDanmakuHelper.fillInCreateParams = function (params) {
        function applyValue(name) {
            if (_util_1._util.isUndefinedOrNull(params[name])) {
                params[name] = BulletproofConfig_1.BulletproofConfig.defaultSimpleDanmakuCreateParams[name];
            }
        }
        function setDefaultValue(name, def) {
            if (_util_1._util.isUndefined(params[name])) {
                params[name] = def;
            }
        }
        // Field bornTime is ignored. See SimpleDanmaku.initialize() for more information.
        applyValue("fontName");
        applyValue("fontStyle");
        applyValue("fontSize");
        applyValue("type");
        applyValue("border");
        applyValue("borderColor");
        applyValue("borderThickness");
        applyValue("background");
        applyValue("backgroundColor");
        applyValue("textColor");
        applyValue("outline");
        applyValue("outlineColor");
        applyValue("outlineThickness");
    };
    return SimpleDanmakuHelper;
})();
exports.SimpleDanmakuHelper = SimpleDanmakuHelper;

//# sourceMappingURL=SimpleDanmakuHelper.js.map
