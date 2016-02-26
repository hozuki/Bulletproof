/**
 * Created by MIC on 2016/2/7.
 */

import {ISimpleDanmakuCreateParams} from "./ISimpleDanmakuCreateParams";
import {SimpleDanmakuType} from "./SimpleDanamkuType";
import {IBulletproofConfig} from "../../IBulletproofConfig";
import {GLUtil} from "../../../lib/glantern/lib/glantern-utils/src/GLUtil";

export abstract class SimpleDanmakuHelper {

    static getDefaultParams(config:IBulletproofConfig):ISimpleDanmakuCreateParams {
        return GLUtil.deepClone(config.defaultSimpleDanmakuCreateParams);
    }

    static fillInCreateParams(config:IBulletproofConfig, params:ISimpleDanmakuCreateParams):void {
        function applyValue(name:string):void {
            if (GLUtil.isUndefinedOrNull((<any>params)[name])) {
                (<any>params)[name] = (<any>config.defaultSimpleDanmakuCreateParams)[name];
            }
        }

        function setDefaultValue<T>(name:string, def:T):void {
            if (GLUtil.isUndefined((<any>params)[name])) {
                (<any>params)[name] = def;
            }
        }

        // Field bornTime is ignored. See SimpleDanmaku.initialize() for more information.
        applyValue("fontName");
        applyValue("fontStyle");
        applyValue("fontSize");
        applyValue("type");
        applyValue("border");
        applyValue("borderColor");
        applyValue("borderThickness");
        applyValue("background");
        applyValue("backgroundColor");
        applyValue("textColor");
        applyValue("outline");
        applyValue("outlineColor");
        applyValue("outlineThickness");
    }


}
