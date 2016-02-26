/**
 * Created by MIC on 2016/1/7.
 */

import {BiliBiliDanmakuApiContainer} from "../BiliBiliDanmakuApiContainer";
import {BiliBiliDamakuApiObject} from "./BiliBiliDamakuApiObject";
import {NotImplementedError} from "../../../lib/glantern/lib/glantern-utils/src/NotImplementedError";

export class ScriptManager extends BiliBiliDamakuApiObject {

    constructor(apiContainer:BiliBiliDanmakuApiContainer) {
        super(apiContainer);
    }

    clearTimer():void {
        throw new NotImplementedError();
    }

    clearEl():void {
        throw new NotImplementedError();
    }

    clearTrigger():void {
        throw new NotImplementedError();
    }

}
