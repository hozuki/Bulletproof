/**
 * Created by MIC on 2015/12/29.
 */

import {DisplayObjectContainer} from "../../../../lib/glantern/src/flash/display/DisplayObjectContainer";
import {IMotion} from "./IMotion";

export interface IGeneralCreateParams {

    x?:number;
    y?:number;
    lifeTime?:number;
    alpha?:number;
    color?:number;
    fontsize?:number;
    parent?:DisplayObjectContainer;
    motion?:IMotion;
    motionGroup?:IMotion[]

}
