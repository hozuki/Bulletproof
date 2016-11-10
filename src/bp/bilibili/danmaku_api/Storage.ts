/**
 * Created by MIC on 2016/1/7.
 */

import StaticDanmakuApiObject from "../internal/StaticDanmakuApiObject";
import NotImplementedError from "../../../../lib/glantern/src/gl/flash/errors/NotImplementedError";

export default class Storage extends StaticDanmakuApiObject {

    constructor() {
        super();
    }

    loadRank(complete: Function, err: Function = null): void {
        throw new NotImplementedError();
    }

    uploadScore(score: number, name: string = null, complete: Function = null, err: Function = null): void {
        throw new NotImplementedError();
    }

    saveData(userData: any, complete: Function = null, err: Function = null): void {
        throw new NotImplementedError();
    }

    loadData(complete: Function = null, err: Function = null): void {
        throw new NotImplementedError();
    }

}
