/**
 * Created by MIC on 2015/12/29.
 */

import {IGeneralCreateParams} from "./IGeneralCreateParams";
import {BitmapData} from "../../../../../lib/glantern/src/gl/flash/display/BitmapData";

export interface ICommentBitmapCreateParams extends IGeneralCreateParams {

    bitmapData?: BitmapData;
    pixelSnapping?: string;
    smoothing?: boolean;
    scale?: number;

}
