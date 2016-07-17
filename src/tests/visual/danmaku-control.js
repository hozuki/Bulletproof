/**
 * Created by MIC on 2016/2/22.
 */

/**
 * @type {Engine}
 */
var bp;

(function () {
    if (typeof window.document.body.onload === "function") {
        var __last = window.document.body.onload;
        window.document.body.onload = function () {
            __last();
            initDanmakuSendingEventHandlers();
        }
    } else {
        window.document.body.onload = initDanmakuSendingEventHandlers;
    }

    function initDanmakuSendingEventHandlers() {
        if (!bp) {
            return;
        }

        var button = document.getElementById("btn-danmaku-spawner");
        button.addEventListener("click", function () {
            /**
             * @type {HTMLInputElement}
             */
            var ctlText = document.getElementById("input-danmaku");
            var text = ctlText.value;
            /**
             * @type {HTMLSelectElement}
             */
            var ctlPosition = document.getElementById("input-danmaku-position");
            var selectedPositionTypeIndex = ctlPosition.selectedIndex;
            var type = parseInt(ctlPosition.options[selectedPositionTypeIndex].value);
            switch (type) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                    addSimpleDanmaku(text, type);
                    break;
                default:
                    break;
            }
        });

        function addSimpleDanmaku(text, positionType) {
            /**
             * @type {SimpleDanmakuProvider}
             */
            var provider = bp.danmakuController.getProvider(Bulletproof.danmaku.DanmakuKind.Simple);
            provider.addDanmaku(text, {
                type: positionType
            });
        }
    }
})();
