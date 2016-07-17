/**
 * Created by MIC on 2015/12/29.
 */

import {IMotionPropertyAnimation} from "./IMotionPropertyAnimation";
import {IDanmakuCreatedObject} from "../../../danmaku/scripted/dco/IDanmakuCreatedObject";
import {DisplayObject} from "../../../../../lib/glantern/src/gl/flash/display/DisplayObject";

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
