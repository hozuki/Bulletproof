/**
 * Created by MIC on 2016/2/11.
 */

import {IBulletproofConfig} from "../../IBulletproofConfig";
import {IScriptedDanmakuCreateParams} from "./IScriptedDanmakuCreateParams";

export abstract class ScriptedDanmakuHelper {

    static getDefaultParams(config:IBulletproofConfig):IScriptedDanmakuCreateParams {
        return {};
    }

}
