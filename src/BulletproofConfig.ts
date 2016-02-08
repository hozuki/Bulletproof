/**
 * Created by MIC on 2016/2/7.
 */

import {SimpleDanmakuType} from "./danmaku/simple/SimpleDanamkuType";
import {ISimpleDanmakuCreateParams} from "./danmaku/simple/ISimpleDanmakuCreateParams";

interface IBulletproofConfig {

    simpleDanmakuLifeTimeSecs:number;
    codeDanmakuLifeTimeSecs:number;

    globalDanmakuCountThreshold:number;
    simpleDanmakuPartCountThreshold:number;

    defaultSimpleDanmakuCreateParams:ISimpleDanmakuCreateParams;

    codeDanmakuEnabled:boolean;
    simpleDanmakuEnabled:boolean;

    useWebChimeraForVideoPlayback:boolean;

}

export var BulletproofConfig:IBulletproofConfig = Object.create(null);

/**
 * Gets the default life time for simple (text-only) danmakus, in seconds.
 * @type {Number}
 */
BulletproofConfig.simpleDanmakuLifeTimeSecs = 10;

/**
 * Gets the default life time for code danmakus, in seconds.
 * @type {Number}
 */
BulletproofConfig.codeDanmakuLifeTimeSecs = Number.MAX_VALUE;

/**
 * Default parameters for creation of {@link SimpleDanmaku}.
 * @type {ISimpleDanmakuCreateParams}
 */
BulletproofConfig.defaultSimpleDanmakuCreateParams = {
    bornTime: undefined,
    fontName: "SimHei",
    fontStyle: "bold",
    fontSize: 18,
    type: SimpleDanmakuType.Flying,
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
BulletproofConfig.globalDanmakuCountThreshold = 3000;

/**
 * Local threshold of number of each part of {@link SimpleDanmaku}.
 * @type {Number}
 */
BulletproofConfig.simpleDanmakuPartCountThreshold = 1500;

/**
 * Whether should enable code danmaku support.
 * @type {Boolean}
 */
BulletproofConfig.codeDanmakuEnabled = true;

/**
 * Whether should enable simple danmaku support.
 * @type {Boolean}
 */
BulletproofConfig.simpleDanmakuEnabled = true;

/**
 * In an environment with WebChimera, this can set to true to use the WebChimera player rather than HTML5 video element.
 * @type {Boolean}
 */
BulletproofConfig.useWebChimeraForVideoPlayback = false;
