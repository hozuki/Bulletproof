/**
 * Created by MIC on 2016/2/7.
 */

import {IEngineOptions} from "./IEngineOptions";
import {SimpleDanmakuType} from "../danmaku/simple/SimpleDanmakuType";
import {ISimpleDanmakuCreateParams} from "../danmaku/simple/ISimpleDanmakuCreateParams";

export var DefaultEngineOptions: IEngineOptions = Object.create(null);

/**
 * Gets the default life time for simple (text-only) danmakus, in seconds.
 * @type {Number}
 */
DefaultEngineOptions.simpleDanmakuLifeTimeSecs = 8;

/**
 * Gets the default life time for scripted danmakus, in seconds.
 * @type {Number}
 */
DefaultEngineOptions.codeDanmakuLifeTimeSecs = Number.MAX_VALUE;

/**
 * Default parameters for creation of {@link SimpleDanmaku}.
 * @type {ISimpleDanmakuCreateParams}
 */
DefaultEngineOptions.defaultSimpleDanmakuCreateParams = {
    bornTime: void(0),
    fontName: "SimHei",
    fontStyle: "bold",
    fontSize: 20,
    type: SimpleDanmakuType.R2L,
    border: false,
    borderColor: 0x000000,
    borderThickness: 1,
    background: false,
    backgroundColor: 0x000000,
    textColor: 0xffffff,
    outline: true,
    outlineColor: 0x2f2f2f,
    outlineThickness: 1
};

/**
 * Global threshold of danmaku count. See {@link DanmakuController.shouldCreateDanmaku} for how the number is counted.
 * @type {Number}
 */
DefaultEngineOptions.globalDanmakuCountThreshold = 3000;

/**
 * Local threshold of number of each part of {@link SimpleDanmaku}.
 * @type {Number}
 */
DefaultEngineOptions.simpleDanmakuPartCountThreshold = 1500;

/**
 * Whether should enable scripted danmaku support.
 * @type {Boolean}
 */
DefaultEngineOptions.codeDanmakuEnabled = true;

/**
 * Whether should enable simple danmaku support.
 * @type {Boolean}
 */
DefaultEngineOptions.simpleDanmakuEnabled = true;

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
