/**
 * Created by MIC on 2015/12/29.
 */

import {BiliBiliDamakuApiObject} from "./BiliBiliDamakuApiObject";
import {BiliBiliDanmakuApiContainer} from "../BiliBiliDanmakuApiContainer";

export class Global extends BiliBiliDamakuApiObject {

    constructor(apiContainer: BiliBiliDanmakuApiContainer) {
        super(apiContainer);
        this._map = new Map<any, any>();
    }

    _set(key: any, val: any): void {
        this._map.set(key, val);
    }

    _get(key: any): any {
        return this._map.get(key);
    }

    private _map: Map<any, any> = null;

}
