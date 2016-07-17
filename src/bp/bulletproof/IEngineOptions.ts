/**
 * Created by MIC on 2016/2/10.
 */

import {ISimpleDanmakuCreateParams} from "../danmaku/simple/ISimpleDanmakuCreateParams";

export interface IEngineOptions {

    simpleDanmakuLifeTimeSecs:number;
    codeDanmakuLifeTimeSecs:number;

    globalDanmakuCountThreshold:number;
    simpleDanmakuPartCountThreshold:number;

    defaultSimpleDanmakuCreateParams:ISimpleDanmakuCreateParams;

    codeDanmakuEnabled:boolean;
    simpleDanmakuEnabled:boolean;

    videoPlayerEnabled:boolean;
    useWebChimeraForVideoPlayback:boolean;

}
