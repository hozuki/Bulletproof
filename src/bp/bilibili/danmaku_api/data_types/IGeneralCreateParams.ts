/**
 * Created by MIC on 2015/12/29.
 */

import IMotion from "./IMotion";
import DisplayObjectContainer from "../../../../../lib/glantern/src/gl/flash/display/DisplayObjectContainer";

interface IGeneralCreateParams {

    x?: number;
    y?: number;
    lifeTime?: number;
    alpha?: number;
    color?: number;
    fontsize?: number;
    parent?: DisplayObjectContainer;
    motion?: IMotion;
    motionGroup?: IMotion[]

}

export default IGeneralCreateParams;
