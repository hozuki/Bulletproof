/**
 * Created by MIC on 2015/12/28.
 */

const VERSION = "Bulletproof/0.6.0-alpha (BiliBili, like BSE, like CCL, like Flash) HTML5/*";

export * from "./Bulletproof";

import * as bilibili from "./bilibili/index";
import * as danmaku from "./danmaku/index";
import {BulletproofConfig} from "./BulletproofConfig";

export {VERSION as version, bilibili, danmaku, BulletproofConfig as config};

export * from "../lib/glantern/src/index";
