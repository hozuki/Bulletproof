/**
 * Created by MIC on 2016/1/7.
 */

import {StaticDanmakuApiObject} from "../internal/StaticDanmakuApiObject";
import {ICommentBitmapCreateParams} from "./data_types/ICommentBitmapCreateParams";
import {CommentBitmap} from "./CommentBitmap";
import {BitmapData} from "../../../../lib/glantern/src/gl/flash/display/BitmapData";
import {NotImplementedError} from "../../../../lib/glantern/src/gl/flash/errors/NotImplementedError";
import {Rectangle} from "../../../../lib/glantern/src/gl/flash/geom/Rectangle";

export class Bitmap extends StaticDanmakuApiObject {

    constructor() {
        super();
    }

    createBitmapData(width: number, height: number, transparent: boolean = true, fillColor: number = 0xffffffff): BitmapData {
        throw new NotImplementedError();
    }

    createRectangle(x: number = 0, y: number = 0, width: number = 0, height: number = 0): Rectangle {
        return new Rectangle(x, y, width, height);
    }

    createBitmap(params: ICommentBitmapCreateParams): CommentBitmap {
        throw new NotImplementedError();
    }

}
