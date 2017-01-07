/**
 * Created by MIC on 2016/9/13.
 */

abstract class BPEvents {

    static get COMMENT_KEY(): string {
        return "commentKey";
    }

    static get COMMENT_ADDED(): string {
        return "commentAdded";
    }

}

export default BPEvents;
