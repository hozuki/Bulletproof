/**
 * Created by MIC on 2015/12/29.
 */

const $map = new Map<any, any>();

export default class Global {

    static _set(key: any, val: any): void {
        $map.set(key, val);
    }

    static _get(key: any): any {
        $map.get(key);
    }

}
