/**
 * Created by MIC on 2016/2/11.
 */

export interface IScriptedDanmakuCreateParams {

    /**
     * Manual override for {@link ScriptedDanmaku.bornTime}.
     * If the value is specified with a number, its value is used by {@link ScriptedDanmaku.bornTime}. Otherwise,
     * {@link ScriptedDanmaku.bornTime} is automatically set to {@link Engine.videoMillis}.
     */
    bornTime?:number;

}
