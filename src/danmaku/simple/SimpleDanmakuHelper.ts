/**
 * Created by MIC on 2016/2/7.
 */

import {ISimpleDanmakuCreateParams} from "./ISimpleDanmakuCreateParams";
import {SimpleDanmakuType} from "./SimpleDanamkuType";
import {_util} from "../../../lib/glantern/src/_util/_util";
import {BulletproofConfig} from "../../BulletproofConfig";

export abstract class SimpleDanmakuHelper {

    static getDefaultParams():ISimpleDanmakuCreateParams {
        return {
            bornTime: undefined,
            fontName: "SimHei",
            fontStyle: "bold",
            fontSize: 18,
            type: SimpleDanmakuType.Flying,
            border: false,
            borderColor: 0x000000,
            borderThickness: 1,
            background: false,
            backgroundColor: 0x000000,
            textColor: 0xffffff,
            outline: true,
            outlineColor: 0x000000,
            outlineThickness: 1
        };
    }

    static fillInCreateParams(params:ISimpleDanmakuCreateParams):void {
        function applyValue(name:string):void {
            if (_util.isUndefinedOrNull((<any>params)[name])) {
                (<any>params)[name] = (<any>BulletproofConfig.defaultSimpleDanmakuCreateParams)[name];
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
