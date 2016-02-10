/**
 * Created by MIC on 2016/1/7.
 */

export abstract class PlayerState {

    static get PLAYING():string {
        return "playing";
    }

    static get STOP():string {
        return "stop";
    }

    static get PAUSE():string {
        return "pause";
    }

    static get INVALID():string {
        return "invalid";
    }

}
