/**
 * Created by MIC on 2015/8/27.
 */

import org = require('./org');

export class util {

    public static limit(v:number, min:number, max:number):number {
        (v < min) && (v = min);
        (v > max) && (v = max);
        return v;
    }

    private static __stringFormattingParams:any[] = null;

    private static __stringFormatter(matched:string):string {
        var index = matched.substring(1, matched.length - 1);
        if (util.__stringFormattingParams != null && util.__stringFormattingParams.hasOwnProperty(index)) {
            var indexValue = parseInt(index);
            return util.__stringFormattingParams[indexValue].toString();
        } else {
            return matched;
        }
    }

    public static format(s:string, ...args:any[]):string {
        var regex = /{[\d]+}/g;
        util.__stringFormattingParams = args;
        var r = s.replace(regex, util.__stringFormatter);
        util.__stringFormattingParams = null;
        return r;
    }

    /**
     * min < v < max
     * @param v
     * @param min
     * @param max
     * @returns {boolean}
     */
    public static valueBetweenNE(v:number, min:number, max:number):boolean {
        return min < v && v < max;
    }

    public static matrixInvert(v:Array<number>, rank:number = 3):MatrixInvertResult {
        function vget(v:Array<number>, row:number, col:number):number {
            return v[row + col * rank];
        }

        function vset(v:Array<number>, row:number, col:number, s:number):void {
            v[row + col * rank] = s;
        }

        function swap(v:Array<number>, row1:number, col1:number, row2:number, col2:number):void {
            var k = v[row1 + col1 * rank];
            v[row1 + col1 * rank] = v[row2 + col2 * rank];
            v[row2 + col2 * rank] = k;
        }

        var r:MatrixInvertResult;
        r.canInvert = false;
        r.determinant = 0;
        r.result = null;
        v = v.slice();
        var p:number;
        var i:number, j:number;

        // http://dev.gameres.com/Program/Visual/3D/Mnquick.htm
        var is:number[] = Array(rank);
        for (p = 0; p < rank; p++) {
            is[p] = 0;
        }
        var js = is.slice();
        var det:number = 1;
        var f:number = 1;

        for (var k = 0; k < rank; k++) {
            // 第一步，全选主元
            var max = 0;
            for (i = k; i < rank; i++) {
                for (j = k; j < rank; j++) {
                    f = Math.abs(vget(v, i, j));
                    if (f > max) {
                        max = f;
                        is[k] = i;
                        js[k] = j;
                    }
                }
            }
            if (Math.abs(max) < 0.0001) {
                return r;
            }
            if (is[k] != k) {
                f = -f;
                for (p = 0; k < rank; p++) {
                    swap(v, k, p, is[k], p);
                }
            }
            if (js[k] != k) {
                f = -f;
                for (p = 0; k < rank; p++) {
                    swap(v, k, p, p, js[k]);
                }
            }
            // 计算行列式
            det *= vget(v, k, k);
            // 计算逆矩阵
            // 第二步
            vset(v, k, k, 1 / vget(v, k, k));
            // 第三步
            for (j = 0; j < rank; j++) {
                if (j != k) {
                    vset(v, k, j, vget(v, k, j) * vget(v, k, k));
                }
            }
            // 第四步
            for (i = 0; i < rank; i++) {
                if (i != k) {
                    for (j = 0; j < rank; j++) {
                        if (j != k) {
                            vset(v, i, j, vget(v, i, j) - vget(v, i, k) * vget(v, k, j));
                        }
                    }
                }
            }
            // 第五步
            for (i = 0; i < rank; i++) {
                if (i != k) {
                    vset(v, i, k, vget(v, i, k) * (-vget(v, k, k)));
                }
            }
        }
        if (js[k] != k) {
            f = -f;
            for (p = 0; k < rank; p++) {
                swap(v, k, p, p, js[k]);
            }
        }
        if (is[k] != k) {
            f = -f;
            for (p = 0; k < rank; p++) {
                swap(v, k, p, is[k], p);
            }
        }
        r.canInvert = true;
        r.determinant = det * f;
        r.result = v;
        return r;
    }

    public static loadFile(url:string, headers:Map<string, string> = null):IXhrResult {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        if (headers != null && headers.size > 0) {
            headers.forEach((v, k, map):void => {
                xhr.setRequestHeader(k, v);
            });
        }
        xhr.send();
        var r:IXhrResult;
        r.statusCode = xhr.status;
        r.statusText = xhr.statusText;
        r.responseText = xhr.responseText;
        return r;
    }

    public static loadFileAsync(url:string, onFinished:(result:IXhrResult)=>void, headers:Map<string, string> = null):void {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        if (headers != null && headers.size > 0) {
            headers.forEach((v, k, map):void => {
                xhr.setRequestHeader(k, v);
            });
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                var r:IXhrResult;
                r.statusCode = xhr.status;
                r.statusText = xhr.statusText;
                r.responseText = xhr.responseText;
                onFinished(r);
            }
        };
        xhr.send();
    }

    public static createTestEvent(type:string):Event {
        return new org.EventClass(type);
    }

    public static padLeft(s:string, targetLength:number, padChar:string):string {
        if (s.length >= targetLength) {
            return s;
        } else {
            var t:string = padChar;
            targetLength--;
            while (targetLength > s.length) {
                t += padChar;
                targetLength--;
            }
            return t + s;
        }
    }

    public static padRight(s:string, targetLength:number, padChar:string):string {
        if (s.length >= targetLength) {
            return s;
        } else {
            var t:string = padChar;
            targetLength--;
            while (targetLength > s.length) {
                t += padChar;
                targetLength--;
            }
            return s + t;
        }
    }

    public static alphaBlend(sR:number, sG:number, sB:number, sA:number,
                             tR:number, tG:number, tB:number, tA:number,
                             sourceConstantAlpha = 0xff):{r:number, g:number, b:number, a:number} {
        var ret = {
            r: 0,
            g: 0,
            b: 0,
            a: 0
        };
        ret.r = sR + tR * (1 - sA / 0xff);
        ret.g = sG + tG * (1 - sA / 0xff);
        ret.b = sB + tB * (1 - sA / 0xff);
        ret.a = sA + tA * (1 - sA / 0xff);
        return ret;
    }

}

export interface IXhrResult {

    statusCode:number;
    statusText:string;
    responseText:string;

}

export interface MatrixInvertResult {

    canInvert:boolean;
    determinant:number;
    result:Array<number>;

}

export class Color {

    private _r:number;
    private _g:number;
    private _b:number;
    private _a:number;

    public constructor(r:number = 0, g:number = 0, b:number = 0, a:number = 255) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    public get r():number {
        return this._r;
    }

    public set r(v:number) {
        this._r = util.limit(v, 0, 255);
    }

    public get g():number {
        return this._g;
    }

    public set g(v:number) {
        this._g = util.limit(v, 0, 255);
    }

    public get b():number {
        return this._b;
    }

    public set b(v:number) {
        this._b = util.limit(v, 0, 255);
    }

    public get a():number {
        return this._a;
    }

    public set a(v:number) {
        this._a = util.limit(v, 0, 255);
    }

    public get argb():number {
        return (this.a << 24 ) | (this.r << 16 ) | (this.g << 8) | this.b;
    }

    public static fromArgb(r:number, g:number, b:number, a:number = 255):Color {
        return new Color(r, g, b, a);
    }

    public static fromNumber(value:number, format:string):Color {
        value = Math.floor(value);
        var t3, t2, t1, t0;
        var a = 0, r = 0, g = 0, b = 0;
        t3 = (value & 0xff000000) >>> 24;
        t2 = (value & 0x00ff0000) >> 16;
        t1 = (value & 0x0000ff00) >> 8;
        t0 = (value & 0x000000ff);
        switch (format) {
            case ColorFormat.ARGB:
                a = t3;
                r = t2;
                g = t1;
                b = t0;
                break;
            case ColorFormat.ABGR:
                a = t3;
                b = t2;
                g = t1;
                r = t0;
                break;
            case ColorFormat.BGRA:
                b = t3;
                g = t2;
                r = t1;
                a = t0;
                break;
            case ColorFormat.RGBA:
                r = t3;
                g = t2;
                b = t1;
                a = t0;
                break;
            case ColorFormat.RGB:
                r = t2;
                g = t1;
                b = t0;
                break;
            case ColorFormat.BGR:
                b = t2;
                g = t1;
                r = t0;
                break;
            default:
                break;
        }
        return new Color(r, g, b, a);
    }

    public toNumber(format:string):number {
        var s = 0;
        switch (format) {
            case ColorFormat.ARGB:
                s = (this.a << 24 ) | (this.r << 16 ) | (this.g << 8) | this.b;
                break;
            case ColorFormat.ABGR:
                s = (this.a << 24 ) | (this.b << 16 ) | (this.g << 8) | this.r;
                break;
            case ColorFormat.BGRA:
                s = (this.b << 24 ) | (this.g << 16 ) | (this.r << 8) | this.a;
                break;
            case ColorFormat.RGBA:
                s = (this.r << 24 ) | (this.g << 16 ) | (this.b << 8) | this.a;
                break;
            case ColorFormat.RGB:
                s = (this.r << 16 ) | (this.g << 8) | this.b;
                break;
            case ColorFormat.BGR:
                s = (this.b << 16 ) | (this.g << 8) | this.r;
                break;
            default:
                break;
        }
        return s;
    }

    public toNumberString(format:string):string {
        var number = this.toNumber(format);
        return util.padLeft(number.toString(16), 8, '0');
    }

    public static argbToCss(r:number, g:number, b:number, a:number = 255):string {
        r = util.limit(r, 0, 255);
        g = util.limit(g, 0, 255);
        b = util.limit(b, 0, 255);
        a = util.limit(a, 0, 1);
        return 'rgba(' + r.toString() + ', ' + g.toString() + ', ' + b.toString() + ', ' + a.toString() + ')';
    }

    public static argbNumberToCss(argb:number, alpha:number = null):string {
        var a = alpha == null ? ((argb & 0xff000000) >>> 24 / 255) : util.limit(alpha, 0, 1);
        var r = (argb & 0x00ff0000) >> 16;
        var g = (argb & 0x0000ff00) >> 8;
        var b = (argb & 0x000000ff);
        return 'rgba(' + r.toString() + ', ' + g.toString() + ', ' + b.toString() + ', ' + a.toString() + ')';
    }

    public static argbNumberToCssSharp(argb:number, alpha:number = null):string {
        var a = alpha == null ? ((argb & 0xff000000) >>> 24 / 255) : util.limit(alpha, 0, 1);
        var r = (argb & 0x00ff0000) >> 16;
        var g = (argb & 0x0000ff00) >> 8;
        var b = (argb & 0x000000ff);
        var sa = a < 16 ? '0' + a.toString(16) : a.toString(16);
        var sr = r < 16 ? '0' + r.toString(16) : r.toString(16);
        var sg = g < 16 ? '0' + g.toString(16) : g.toString(16);
        var sb = b < 16 ? '0' + b.toString(16) : b.toString(16);
        return '#' + sa + sr + sg + sb;
    }

    public static rgbToCss(r:number, g:number, b:number):string {
        r = util.limit(r, 0, 255);
        g = util.limit(g, 0, 255);
        b = util.limit(b, 0, 255);
        return 'rgb(' + r.toString() + ', ' + g.toString() + ', ' + b.toString() + ')';
    }

    public static rgbNumberToCss(rgb:number):string {
        var r = (rgb & 0x00ff0000) >> 16;
        var g = (rgb & 0x0000ff00) >> 8;
        var b = (rgb & 0x000000ff);
        return 'rgb(' + r.toString() + ', ' + g.toString() + ', ' + b.toString() + ')';
    }

    /**
     *
     * @param rgb
     * @param alpha 0 to 1
     * @returns {number}
     */
    public static colorCombine(rgb:number, alpha:number):number {
        rgb = rgb & 0x00ffffff;
        alpha = util.limit(Math.round(util.limit(alpha, 0, 1) * 255), 0, 255);
        return rgb | (alpha << 24);
    }

    public static get TRANSPARENT():Color {
        return new Color(0, 0, 0, 0);
    }

    public static get RED():Color {
        return new Color(255, 0, 0);
    }

    public static get GREEN():Color {
        return new Color(0, 255, 0);
    }

    public static get BLUE():Color {
        return new Color(0, 0, 255);
    }

    public static get BLACK():Color {
        return new Color(0, 0, 0);
    }

    public static get WHITE():Color {
        return new Color(255, 255, 255);
    }

}

export class ColorFormat {

    public static get ARGB():string {
        return 'argb';
    }

    public static get ABGR():string {
        return 'abgr';
    }

    public static get RGBA():string {
        return 'rgba';
    }

    public static get BGRA():string {
        return 'bgra';
    }

    public static get RGB():string {
        return 'rgb';
    }

    public static get BGR():string {
        return 'bgr';
    }

}

export function trace(message:string|any, title:string = null):void {
    if (typeof message == 'string') {
        if (title && title.length > 0) {
            console.debug(title + '\r\n' + message);
        } else {
            console.debug(message);
        }
    } else {
        console.log(message);
    }
}
