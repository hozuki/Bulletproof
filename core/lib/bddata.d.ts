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
    parent?:any;
    motion?:any;

}

export interface ICommentButtonCreateParams {

    text?:string;
    onclick:()=>any;

}

export interface IBitmapCreateParams extends IGeneralCreateParams {

    bitmapData?:flash.display.BitmapData;
    pixelSnapping?:string;
    smoothing?:boolean;
    parent?:Object;
    scale?:number;

}
