/**
 * Created by MIC on 2015/12/29.
 */

import Display from "./danmaku_api/Display";
import StaticDanmakuApiContract from "./StaticDanmakuApiContract";

interface DanmakuApiContract extends StaticDanmakuApiContract {

    $: Display;
    Display: Display;

}

export default DanmakuApiContract;
