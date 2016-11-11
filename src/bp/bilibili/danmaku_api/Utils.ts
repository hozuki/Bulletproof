/**
 * Created by MIC on 2015/12/29.
 */

import FiniteTimer from "../../danmaku/scripted/dco/FiniteTimer";
import MathUtil from "../../../../lib/glantern/src/gl/mic/MathUtil";
import GLUtil from "../../../../lib/glantern/src/gl/mic/glantern/GLUtil";
import BiliApiContract from "../BiliApiContract";

const $date = new Date();

export default class Utils {

    static hue(v: number): number {
        v = v % 360;
        // http://blog.sina.com.cn/s/blog_5de73d0b0101baxq.html
        var lambda = v / 60 * 255;
        var r = MathUtil.clamp(510 - lambda, 0, 255);
        var g = MathUtil.clamp(v < 180 ? lambda : lambda - 510, 0, 255);
        var b = MathUtil.clamp(v < 180 ? lambda - 510 : lambda, 0, 255);
        return (0xff << 24) | (r << 16) | (g << 8) | b;
    }

    static rgb(r: number, g: number, b: number): number {
        return GLUtil.rgb(r, g, b);
    }

    static formatTimes(time: number): string {
        $date.setTime(time * 1000);
        return $date.toLocaleString();
    }

    static delay(source: string, delay: number): number;
    static delay(closure: Function, delay: number): number;
    static delay(obj: any, delay: number): number {
        return BiliApiContract.timer(obj, delay);
    }

    static interval(source: string, delay: number, times: number): FiniteTimer;
    static interval(closure: Function, delay: number, times: number): FiniteTimer;
    static interval(obj: any, delay: number, times: number): FiniteTimer {
        return BiliApiContract.interval(obj, delay, times);
    }

    static distance(x1: number, y1: number, x2: number, y2: number): number {
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }

    static rand(min: number, max: number): number {
        console.assert(min < max, "'max' must be bigger than 'min'.");
        return Math.random() * (max - min) + min;
    }

}
