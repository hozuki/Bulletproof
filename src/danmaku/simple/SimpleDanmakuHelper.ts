/**
 * Created by MIC on 2016/2/7.
 */

import {ISimpleDanmakuCreateParams} from "./ISimpleDanmakuCreateParams";
import {SimpleDanmakuType} from "./SimpleDanamkuType";
import {_util} from "../../../lib/glantern/src/_util/_util";
import {IBulletproofConfig} from "../../IBulletproofConfig";

export abstract class SimpleDanmakuHelper {

    static getDefaultParams(config:IBulletproofConfig):ISimpleDanmakuCreateParams {
        return _util.deepClone(config.defaultSimpleDanmakuCreateParams);
    }

    static fillInCreateParams(config:IBulletproofConfig, params:ISimpleDanmakuCreateParams):void {
        function applyValue(name:string):void {
            if (_util.isUndefinedOrNull((<any>params)[name])) {
                (<any>params)[name] = (<any>config.defaultSimpleDanmakuCreateParams)[name];
            }
        }

        function setDefaultValue<T>(name:string, def:T):void {
            if (_util.isUndefined((<any>params)[name])) {
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
