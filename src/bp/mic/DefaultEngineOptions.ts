/**
 * Created by MIC on 2016/2/7.
 */

import EngineOptions from "./EngineOptions";

const DefaultEngineOptions: EngineOptions = Object.create(null);

export default DefaultEngineOptions;

/**
 * Gets the default life time for scripted danmakus, in seconds.
 * @type {Number}
 */
DefaultEngineOptions.codeDanmakuLifeTimeSecs = Number.MAX_VALUE;

/**
 * Global threshold of danmaku count. See {@link DanmakuController.shouldCreateDanmaku} for how the number is counted.
 * @type {Number}
 */
DefaultEngineOptions.globalDanmakuCountThreshold = 3000;

/**
 * Whether should enable scripted danmaku support.
 * @type {Boolean}
 */
DefaultEngineOptions.scriptedDanmakuEnabled = true;

/**
 * Whether should enable the default video player.
 * @type {Boolean}
 */
DefaultEngineOptions.videoPlayerEnabled = true;

/**
 * In an environment with WebChimera, this can set to true to use the WebChimera player rather than HTML5 video element.
 * It is used for WebChimera for NW.js or Electron, where the original integrated browser does not support H.264 etc.
 * due to copyright reasons.
 * @type {Boolean}
 */
DefaultEngineOptions.useWebChimeraForVideoPlayback = false;
