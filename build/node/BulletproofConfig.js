/**
 * Created by MIC on 2016/2/7.
 */
var SimpleDanamkuType_1 = require("./danmaku/simple/SimpleDanamkuType");
exports.BulletproofConfig = Object.create(null);
/**
 * Gets the default life time for simple (text-only) danmakus, in seconds.
 * @type {Number}
 */
exports.BulletproofConfig.simpleDanmakuLifeTimeSecs = 10;
/**
 * Gets the default life time for code danmakus, in seconds.
 * @type {Number}
 */
exports.BulletproofConfig.codeDanmakuLifeTimeSecs = Number.MAX_VALUE;
/**
 * Default parameters for creation of {@link SimpleDanmaku}.
 * @type {ISimpleDanmakuCreateParams}
 */
exports.BulletproofConfig.defaultSimpleDanmakuCreateParams = {
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
/**
 * Global threshold of danmaku count. See {@link DanmakuCoordinator.shouldCreateDanmaku} for how the number is counted.
 * @type {Number}
 */
exports.BulletproofConfig.globalDanmakuCountThreshold = 3000;
/**
 * Local threshold of number of each part of {@link SimpleDanmaku}.
 * @type {Number}
 */
exports.BulletproofConfig.simpleDanmakuPartCountThreshold = 1500;
/**
 * Whether should enable code danmaku support.
 * @type {Boolean}
 */
exports.BulletproofConfig.codeDanmakuEnabled = true;
/**
 * Whether should enable simple danmaku support.
 * @type {Boolean}
 */
exports.BulletproofConfig.simpleDanmakuEnabled = true;
/**
 * Whether should enable the default video player.
 * @type {Boolean}
 */
exports.BulletproofConfig.videoPlayerEnabled = true;
/**
 * In an environment with WebChimera, this can set to true to use the WebChimera player rather than HTML5 video element.
 * It is used for WebChimera for NW.js or Electron, where the original integrated browser does not support H.264 etc.
 * due to copyright reasons.
 * @type {Boolean}
 */
exports.BulletproofConfig.useWebChimeraForVideoPlayback = false;

//# sourceMappingURL=BulletproofConfig.js.map
