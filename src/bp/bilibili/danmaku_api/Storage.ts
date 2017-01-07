/**
 * Created by MIC on 2016/1/7.
 */

import NotImplementedError from "../../../../lib/glantern/src/gl/flash/errors/NotImplementedError";

export default class Storage {

    static loadRank(complete: Function, err: Function = null): void {
        throw new NotImplementedError();
    }

    static uploadScore(score: number, name: string = null, complete: Function = null, err: Function = null): void {
        throw new NotImplementedError();
    }

    static saveData(userData: any, complete: Function = null, err: Function = null): void {
        throw new NotImplementedError();
    }

    static loadData(complete: Function = null, err: Function = null): void {
        throw new NotImplementedError();
    }

}
