/**
 * Created by MIC on 2015/9/12.
 */

import bulletproof_flash = require("./bulletproof-flash");

export module bulletproof {

    import flash = bulletproof_flash.bulletproof.flash;

    export module bilidanmaku {

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

        export interface ICommentBitmapCreateParams extends IGeneralCreateParams {
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

    }

}
