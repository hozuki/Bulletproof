/**
 * Created by MIC on 2016/2/7.
 */
var _util_1 = require("../../../lib/glantern/src/_util/_util");
var SimpleDanmakuHelper = (function () {
    function SimpleDanmakuHelper() {
    }
    SimpleDanmakuHelper.getDefaultParams = function (config) {
        return _util_1._util.deepClone(config.defaultSimpleDanmakuCreateParams);
    };
    SimpleDanmakuHelper.fillInCreateParams = function (config, params) {
        function applyValue(name) {
            if (_util_1._util.isUndefinedOrNull(params[name])) {
                params[name] = config.defaultSimpleDanmakuCreateParams[name];
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
