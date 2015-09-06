/**
 * Created by MIC on 2015/8/30.
 */

import flash = require('./flash');

export interface IGeneralCreateParams {

    x?:number;
    y?:number;
    lifeTime?:number;
    alpha?:number;
    color?:number;
    fontsize?:number;
    parent?:flash.display.DisplayObjectContainer;
    motion?:IMotion;
    motionGroup?:Array<IMotion>

}

export interface ICommentButtonCreateParams extends IGeneralCreateParams {

    text?:string;
    onclick:()=>any;

}

export interface IBitmapCreateParams extends IGeneralCreateParams {

    bitmapData?:flash.display.BitmapData;
    pixelSnapping?:string;
    smoothing?:boolean;
    scale?:number;

}

export interface IMotionPropertyAnimation {

    fromValue:number;
    toValue?:number;
    lifeTime?:number;
    startDelay?:number;
    easing?:string;
    repeat?:number;

}

export interface IMotion {

    x?:IMotionPropertyAnimation;
    y?:IMotionPropertyAnimation;
    alpha?:IMotionPropertyAnimation;
    rotationZ?:IMotionPropertyAnimation;
    rotationY?:IMotionPropertyAnimation;
    createdTime:number;
    maximumLifeTime:number;
    sourceObject:Object;

}

