/**
 * Created by MIC on 2015/12/29.
 */

import {Display} from "./danmaku_api/Display";
import {Player} from "./danmaku_api/Player";
import {StaticDanmakuApiContract} from "./StaticDanmakuApiContract";

export interface DanmakuApiContract extends StaticDanmakuApiContract {

    $: Display;
    Display: Display;

}
