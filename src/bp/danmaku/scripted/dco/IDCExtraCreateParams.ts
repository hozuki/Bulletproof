/**
 * Created by MIC on 2015/12/29.
 */

import {Engine} from "../../../bulletproof/Engine";
import {ScriptedDanmaku} from "../ScriptedDanmaku";

export interface IDCExtraCreateParams {

    engine:Engine;
    bornTime:number;
    creator:ScriptedDanmaku;

}