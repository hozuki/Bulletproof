/**
 * Created by MIC on 2016/2/7.
 */

import {ISimpleDanmakuCreateParams} from "./ISimpleDanmakuCreateParams";
import {IEngineOptions} from "../../mic/IEngineOptions";
import {CommonUtil} from "../../../../lib/glantern/src/gl/mic/CommonUtil";

export abstract class SimpleDanmakuHelper {

    static getDefaultParams(config: IEngineOptions): ISimpleDanmakuCreateParams {
        return CommonUtil.deepClone(config.defaultSimpleDanmakuCreateParams);
    }

    static fillInCreateParams(config: IEngineOptions, params: ISimpleDanmakuCreateParams): void {
        function applyValue(name: string): void {
            if (!CommonUtil.ptr((<any>params)[name])) {
                (<any>params)[name] = (<any>config.defaultSimpleDanmakuCreateParams)[name];
            }
        }

        function setDefaultValue<T>(name: string, def: T): void {
            if (CommonUtil.isUndefined((<any>params)[name])) {
                (<any>params)[name] = def;
            }
        }

        // Field bornTime is ignored. See SimpleDanmaku.initialize() for more information.
        var optionNames: string[] = [
            "fontName", "fontStyle", "fontSize", "type", "border", "borderColor", "borderThickness", "background",
            "backgroundColor", "textColor", "outline", "outlineColor", "outlineThickness"
        ];
        for (var i = 0; i < optionNames.length; ++i) {
            applyValue(optionNames[i]);
        }
    }

}
