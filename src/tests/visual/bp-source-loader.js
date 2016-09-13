/**
 * Created by MIC on 2016/2/25.
 */

"use strict";

(function loadBulletproofSource(useNodeVersion, useMinimizedVersion, forceNoCache) {
    function defaultValue(obj, value) {
        return obj === void(0) ? value : obj;
    }

    function appendScript(srcUrl) {
        var newScriptTag = document.createElement("script");
        newScriptTag.type = "text/javascript";
        newScriptTag.src = srcUrl;
        var thisScriptTag = document.getElementById("bp-source-loader");
        var parentElement = thisScriptTag.parentNode;
        if (parentElement) {
            if (parentElement.lastChild !== thisScriptTag) {
                parentElement.insertBefore(newScriptTag, thisScriptTag.nextSibling);
            } else {
                parentElement.appendChild(newScriptTag);
            }
        } else {
            console.error("Unreachable error: cannot append script tag.");
        }
    }

    useNodeVersion = defaultValue(useNodeVersion, false);
    useMinimizedVersion = defaultValue(useMinimizedVersion, false);
    forceNoCache = defaultValue(forceNoCache, true);
    if (window.global === void(0)) {
        useNodeVersion = false;
    }
    var src = null;
    if (useNodeVersion) {
        src = "./build/node/bp/index";
        window.Bulletproof = require(src);
    } else {
        src = "build/Bulletproof-browser" + (useMinimizedVersion ? ".min" : "") + ".js";
        if (forceNoCache) {
            var timeMillis = Date.now();
            src += "?time=" + timeMillis.toString();
        }
        appendScript(src);
    }
})(false, true);
