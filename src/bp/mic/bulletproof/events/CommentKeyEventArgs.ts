/**
 * Created by MIC on 2016/9/13.
 */

export default class CommentKeyEventArgs {

    constructor(keyCode: number, keyUp: boolean) {
        this._keyCode = keyCode;
        this._keyUp = keyUp;
    }

    get keyCode(): number {
        return this._keyCode;
    }

    get keyUp(): boolean {
        return this._keyUp;
    }

    private _keyCode: number = 0;
    private _keyUp: boolean = false;

}
