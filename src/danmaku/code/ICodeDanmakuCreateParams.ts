/**
 * Created by MIC on 2016/2/11.
 */

export interface ICodeDanmakuCreateParams {

    /**
     * Manual override for {@link CodeDanmaku.bornTime}.
     * If the value is specified with a number, its value is used by {@link CodeDanmaku.bornTime}. Otherwise,
     * {@link CodeDanmaku.bornTime} is automatically set to {@link Bulletproof.timeElapsed}.
     */
    bornTime?:number;

}
