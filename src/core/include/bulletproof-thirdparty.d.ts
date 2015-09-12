/**
 * Created by MIC on 2015/9/12.
 */

export declare module bulletproof.thirdparty {

    export module Klingemann.FastBlur {

        export function boxBlurCanvasRGBA2(canvas:HTMLCanvasElement, topX:number, topY:number, width:number, height:number, radius:number, iterations:number):void;

        export function boxBlurCanvasRGB2(canvas:HTMLCanvasElement, topX:number, topY:number, width:number, height:number, radius:number, iterations:number):void;

    }

    export module Klingemann.StackBoxBlur {

        export function stackBoxBlurCanvasRGBA2(canvas:HTMLCanvasElement, topX:number, topY:number, width:number, height:number, radius:number, iterations:number):void;

        export function stackBoxBlurCanvasRGB2(canvas:HTMLCanvasElement, topX:number, topY:number, width:number, height:number, radius:number, iterations:number):void;

    }

}
