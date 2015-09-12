/**
 * Created by MIC on 2015/9/12.
 */

export declare module bulletproof.mic {

    export module util {
        export function limit(v:number, min:number, max:number):number;

        export function format(s:string, ...args:any[]):string;

        export function valueBetweenNE(v:number, min:number, max:number):boolean;

        export function matrixInvert(v:Array<number>, rank?:number):IMatrixInvertResult;

        export function loadFile(url:string, headers?:Map<string,string>):IXhrResult;

        export function loadFileAsync(url:string, onFinished:(result:IXhrResult)=>void, headers?:Map<string,string>):void;

        export function createTestEvent(type:string):Event;

        export function padLeft(s:string, targetLength:number, padChar:string):string;

        export function padRight(s:string, targetLength:number, padChar:string):string;

        export function alphaBlend(sR:number, sG:number, sB:number, sA:number, tR:number, tG:number, tB:number, tA:number,
                          sourceConstantAlpha?:number):number;
    }

    export class Color {
        constructor(r?:number, g?:number, b?:number, a?:number);

        r:number;
        g:number;
        b:number;
        a:number;
        argb:number;

        static fromArgb(r:number, g:number, b:number, a?:number):Color;

        static fromNumber(value:number, format?:string):Color;

        toNumber(format?:string):number;

        toNumberString(format?:string):string;

        static argbToCss(r:number, g:number, b:number, a?:number):string;

        static argbNumberToCss(argb:number, alpha?:number):string;

        static rgbToCss(r:number, g:number, b:number):string;

        static rgbToCssSharp(r:number, g:number, b:number):string;

        static rgbNumberToCss(rgb:number):string;

        static rgbNumberToCssSharp(rgb:number):string;

        static colorCombine(rgb:number, alpha:number):number;

        static TRANSPARENT:Color;
        static RED:Color;
        static GREEN:Color;
        static BLUE:Color;
        static BLACK:Color;
        static WHITE:Color;
    }

    export interface IXhrResult {
        statusCode:number;
        statusText:string;
        responseText:string;
    }

    export interface IMatrixInvertResult {
        canInvert:boolean;
        determinant:number;
        result:Array<number>;
    }

    export interface ColorFormat {
        ARGB:string;
        ABGR:string;
        RGBA:string;
        BGRA:string;
        RGB:string;
        BGR:string;
    }

    export var ColorFormat:ColorFormat;

    export function trace(message:string|any, title?:string):void;

}
