/**
 * Created by MIC on 2016-11-11.
 */

import FiniteTimer from "../../danmaku/scripted/dco/FiniteTimer";

interface IUtils {

    hue(v: number): number;
    rgb(r: number, g: number, b: number): number;
    formatTimes(time: number): string;
    delay(source: string, delay: number): number;
    delay(closure: Function, delay: number): number;
    interval(source: string, delay: number, times: number): FiniteTimer;
    interval(closure: Function, delay: number, times: number): FiniteTimer;
    distance(x1: number, y1: number, x2: number, y2: number): number;
    rand(min: number, max: number): number;

}

export default IUtils;
