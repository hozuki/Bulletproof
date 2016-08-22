/**
 * Created by MIC on 2016/2/7.
 */

export class StageResizedEventArgs {

    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    private _width: number = 0;
    private _height: number = 0;

}
