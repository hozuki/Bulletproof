/**
 * Created by MIC on 2016/2/11.
 */

import {IBulletproofConfig} from "../../IBulletproofConfig";
import {ICodeDanmakuCreateParams} from "./ICodeDanmakuCreateParams";

export abstract class CodeDanmakuHelper {

    static getDefaultParams(config:IBulletproofConfig):ICodeDanmakuCreateParams {
        return {};
    }

}
