/**
 * Created by MIC on 2015/12/29.
 */

import StaticDanmakuApiObject from "../internal/StaticDanmakuApiObject";

export default class Global extends StaticDanmakuApiObject {

    constructor() {
        super();
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
