/**
 * Created by MIC on 2016/2/11.
 */

import {IEngineOptions} from "../../bulletproof/IEngineOptions";
import {IScriptedDanmakuCreateParams} from "./IScriptedDanmakuCreateParams";

export abstract class ScriptedDanmakuHelper {

    static getDefaultParams(config:IEngineOptions):IScriptedDanmakuCreateParams {
        return {};
    }

}
