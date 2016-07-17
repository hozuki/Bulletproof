/**
 * Created by MIC on 2015/12/28.
 */

const VERSION = "0.6.0-alpha";
const USER_AGENT = `Bulletproof/${VERSION} (BiliBili, like BSE, like CCL, like Flash)`;

// Bulletproof

import * as bilibili from "./bilibili/index";
import * as danmaku from "./danmaku/index";
import * as interactive from "./interactive/index";
import {DefaultEngineOptions} from "./bulletproof/DefaultEngineOptions";

export {
    VERSION as version,
    USER_AGENT as userAgent,
    bilibili,
    danmaku,
    interactive,
    DefaultEngineOptions as defaultOptions
};

import * as bulletproof from "./bulletproof/index";
const Engine = bulletproof.Engine;

export {bulletproof, Engine};

// GLantern

import * as gl_root from "../../lib/glantern/src/gl/index";

const flash = gl_root.flash;
const fl = gl_root.fl;
const mx = gl_root.mx;
const glantern = gl_root.glantern;
const webgl = gl_root.webgl;
const injectToGlobal = gl_root.injectToGlobal;
const isSupported = gl_root.isSupported;

export {flash, fl, mx, glantern, webgl, injectToGlobal, isSupported};

import * as flash_fix from "./flash/index";

fuse(flash, flash_fix);

function fuse(baseObject:Object, attachment:Object):void {
    for (var propName in attachment) {
        if (baseObject.hasOwnProperty(propName)) {
            fuse((<any>baseObject)[propName], (<any>attachment)[propName]);
        } else {
            (<any>baseObject)[propName] = (<any>attachment)[propName];
        }
    }
}
