/**
 * Created by MIC on 2016/2/25.
 */

(function loadBulletproofSource(useNodeVersion, useMinimizedVersion, forceNoCache) {
    function defaultValue(obj, value) {
        return typeof obj === "undefined" ? value : obj;
    }

    useNodeVersion = defaultValue(useNodeVersion, false);
    useMinimizedVersion = defaultValue(useMinimizedVersion, false);
    forceNoCache = defaultValue(forceNoCache, true);
    var src = null;
    if (useNodeVersion) {
        src = "../../build/node/index";
        window.Bulletproof = require(src);
    } else {
        src = "../../build/Bulletproof-browser" + (useMinimizedVersion ? ".min" : "") + ".js";
        if (forceNoCache) {
            var timeMillis = Date.now();
            src += "?time=" + timeMillis.toString();
        }
        var newScriptTag = document.createElement("script");
        newScriptTag.type = "text/javascript";
        newScriptTag.src = src;
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
})(undefined, true);
