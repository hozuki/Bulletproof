/**
 * Created by MIC on 2016/2/7.
 */

import {ISimpleDanmakuCreateParams} from "./ISimpleDanmakuCreateParams";
import {IEngineOptions} from "../../bulletproof/IEngineOptions";
import {GLUtil} from "../../../../lib/glantern/src/gl/glantern/GLUtil";

export abstract class SimpleDanmakuHelper {

    static getDefaultParams(config:IEngineOptions):ISimpleDanmakuCreateParams {
        return GLUtil.deepClone(config.defaultSimpleDanmakuCreateParams);
    }

    static fillInCreateParams(config:IEngineOptions, params:ISimpleDanmakuCreateParams):void {
        function applyValue(name:string):void {
            if (!GLUtil.ptr((<any>params)[name])) {
                (<any>params)[name] = (<any>config.defaultSimpleDanmakuCreateParams)[name];
            }
        }

        function setDefaultValue<T>(name:string, def:T):void {
            if (GLUtil.isUndefined((<any>params)[name])) {
                (<any>params)[name] = def;
            }
        }

        // Field bornTime is ignored. See SimpleDanmaku.initialize() for more information.
        var optionNames:string[] = [
            "fontName", "fontStyle", "fontSize", "type", "border", "borderColor", "borderThickness", "background",
            "backgroundColor", "textColor", "outline", "outlineColor", "outlineThickness"
        ];
        for (var i = 0; i < optionNames.length; ++i) {
            applyValue(optionNames[i]);
        }
    }

}
