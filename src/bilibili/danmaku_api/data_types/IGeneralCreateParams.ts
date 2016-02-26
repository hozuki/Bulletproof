/**
 * Created by MIC on 2015/12/29.
 */

import {IMotion} from "./IMotion";
import {DisplayObjectContainer} from "../../../../lib/glantern/src/glantern/flash/display/DisplayObjectContainer";

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
