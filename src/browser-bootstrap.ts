/**
 * Created by MIC on 2015/12/4.
 */

/*
 Prepare to run in browsers.
 In browsers, we must find the "window" object as global object in highest priority,
 instead of Node's "global" object.
 */
(function ($global:any):void {
    ($global).Bulletproof = require("./index");
})(window || self || global || {});
