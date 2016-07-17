/**
 * Created by MIC on 2016/1/7.
 */

import {BiliBiliDamakuApiObject} from "./BiliBiliDamakuApiObject";
import {BiliBiliDanmakuApiContainer} from "../BiliBiliDanmakuApiContainer";
import {ICommentBitmapCreateParams} from "./data_types/ICommentBitmapCreateParams";
import {CommentBitmap} from "./CommentBitmap";
import {BitmapData} from "../../../../lib/glantern/src/gl/flash/display/BitmapData";
import {NotImplementedError} from "../../../../lib/glantern/src/gl/flash/errors/NotImplementedError";
import {Rectangle} from "../../../../lib/glantern/src/gl/flash/geom/Rectangle";

export class Bitmap extends BiliBiliDamakuApiObject {

    constructor(apiContainer:BiliBiliDanmakuApiContainer) {
        super(apiContainer);
    }

    createBitmapData(width:number, height:number, transparent:boolean = true, fillColor:number = 0xffffffff):BitmapData {
        throw new NotImplementedError();
    }

    createRectangle(x:number = 0, y:number = 0, width:number = 0, height:number = 0):Rectangle {
        return new Rectangle(x, y, width, height);
    }

    createBitmap(params:ICommentBitmapCreateParams):CommentBitmap {
        throw new NotImplementedError();
    }

}
