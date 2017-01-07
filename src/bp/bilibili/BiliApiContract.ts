/**
 * Created by MIC on 2015/12/29.
 */

import DanmakuApiContract from "./DanmakuApiContract";
import Display from "./danmaku_api/Display";
import * as Functions from "./danmaku_api/Functions";
import Utils from "./danmaku_api/Utils";
import Bitmap from "./danmaku_api/Bitmap";
import Player from "./danmaku_api/Player";
import ScriptManager from "./danmaku_api/ScriptManager";
import Storage from "./danmaku_api/Storage";
import Tween from "./danmaku_api/Tween";
import Global from "./danmaku_api/Global";

const BiliApiContract: DanmakuApiContract = <any>Object.create(null);
export default BiliApiContract;
((contract: DanmakuApiContract) => {
    contract.$G = contract.Global = Global;
    contract.Bitmap = Bitmap;
    contract.ScriptManager = ScriptManager;
    contract.Storage = Storage;
    contract.Tween = new Tween();
    contract.Utils = Utils;
    contract.Player = Player;
    contract.$ = contract.Display = Display;
    contract.trace = Functions.trace;
    contract.clear = Functions.clear;
    contract.getTimer = Functions.getTimer;
    contract.timer = Functions.timer;
    contract.interval = Functions.interval;
    contract.foreach = Functions.foreach;
    contract.clone = Functions.clone;
    contract.load = Functions.load;
})(BiliApiContract);
