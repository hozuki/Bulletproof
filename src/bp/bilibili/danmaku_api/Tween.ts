/**
 * Created by MIC on 2016/1/7.
 */

import {StaticDanmakuApiObject} from "../internal/StaticDanmakuApiObject";
import {DanmakuApiContainer} from "../DanmakuApiContainer";
import {ITween} from "./ITween";
import {NotImplementedError} from "../../../../lib/glantern/src/gl/flash/errors/NotImplementedError";

export class Tween extends StaticDanmakuApiObject {

    constructor() {
        super();
    }

    tween(object: Object, dest: Object, src: Object, duration: number, easing: Function): Tween {
        throw new NotImplementedError();
    }

    to(object: Object, dest: Object, duration: number, easing: Function): Tween {
        throw new NotImplementedError();
    }

    bezier(object: Object, dest: Object, src: Object, control: Object): Tween {
        throw new NotImplementedError();
    }

    scale(src: ITween, scale: number): ITween {
        throw new NotImplementedError();
    }

    delay(src: ITween, delay: number): ITween {
        throw new NotImplementedError();
    }

    reverse(src: ITween): ITween {
        throw new NotImplementedError();
    }

    repeat(src: ITween, times: number): ITween {
        throw new NotImplementedError();
    }

    slice(src: ITween, from: number, to: number): ITween {
        throw new NotImplementedError();
    }

    serial(src1: ITween, ...other: Array<ITween>): ITween {
        throw new NotImplementedError();
    }

    parallel(src1: ITween, ...other: Array<ITween>): ITween {
        throw new NotImplementedError();
    }

}
