/**
 * Created by MIC on 2016-11-11.
 */

import BitmapData from "../../../../lib/glantern/src/gl/flash/display/BitmapData";
import Rectangle from "../../../../lib/glantern/src/gl/flash/geom/Rectangle";
import CommentBitmap from "./CommentBitmap";
import ICommentBitmapCreateParams from "./data_types/ICommentBitmapCreateParams";

interface IBitmap {

    createBitmapData(width: number, height: number, transparent?: boolean, fillColor?: number): BitmapData;
    createRectangle(x?: number, y?: number, width?: number, height?: number): Rectangle;
    createBitmap(params: ICommentBitmapCreateParams): CommentBitmap;

}

export default IBitmap;
