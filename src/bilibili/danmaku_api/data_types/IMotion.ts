/**
 * Created by MIC on 2015/12/29.
 */

import {IMotionPropertyAnimation} from "./IMotionPropertyAnimation";
import {DisplayObject} from "../../../../lib/glantern/src/flash/display/DisplayObject";
import {IDanmakuCreatedObject} from "../../../danmaku/code/dco/IDanmakuCreatedObject";

export interface IMotion {

    x?:IMotionPropertyAnimation;
    y?:IMotionPropertyAnimation;
    alpha?:IMotionPropertyAnimation;
    rotationZ?:IMotionPropertyAnimation;
    rotationY?:IMotionPropertyAnimation;
    createdTime:number;
    maximumLifeTime:number;
    sourceObject?:DisplayObject&IDanmakuCreatedObject;

}