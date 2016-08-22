/**
 * Created by MIC on 2016/7/2.
 */

import {SimpleLayoutBase} from "./SimpleLayoutBase";
import {SimpleDanmakuType} from "../SimpleDanamkuType";
import {IBatchMeasureParams} from "../IBatchMeasureParams";
import {SimpleDanmaku} from "../SimpleDanmaku";
import {BPUtil} from "../../../mic/bulletproof/BPUtil";
import {Rectangle} from "../../../../../lib/glantern/src/gl/flash/geom/Rectangle";
import {CommonUtil} from "../../../../../lib/glantern/src/gl/mic/CommonUtil";

export abstract class HorizontalLayout extends SimpleLayoutBase {

    constructor() {
        super();
        this._ySortedList = [];
    }

    positionX(danmaku: SimpleDanmaku, measureParams: IBatchMeasureParams): void {
        var elapsedLifeRatio = (measureParams.currentTime - danmaku.bornTime) / (danmaku.lifeTime * 1000);
        danmaku.x = this._$getNewX(danmaku, measureParams.stageWidth, elapsedLifeRatio);
    }

    positionY(danmaku: SimpleDanmaku, measureParams: IBatchMeasureParams): void {
        if (danmaku.isYSet) {
            return;
        }
        var ySortedList = this._ySortedList;
        var ySortedListLength = ySortedList.length;
        var currentHost: SimpleDanmaku;
        var stageWidth = measureParams.stageWidth;
        var stageHeight = measureParams.stageHeight;
        // if (ySortedListLength > 0) {
        //     var lastHostBottom = 0;
        //     for (var i = 0; i < ySortedListLength; ++i) {
        //         currentHost = ySortedList[i];
        //         if (currentHost.y - lastHostBottom > danmaku.height) {
        //             // If there is enough vertical space for current danmaku to insert into, just place it there.
        //             danmaku.y = lastHostBottom;
        //             danmaku.isYSet = true;
        //             break;
        //         }
        //         lastHostBottom = currentHost.bottom + 1;
        //     }
        // } else {
        //     danmaku.y = 0;
        //     danmaku.isYSet = true;
        // }
        if (ySortedListLength <= 0) {
            danmaku.y = 0;
            danmaku.isYSet = true;
        }
        if (!danmaku.isYSet) {
            // Scan to stage's top to bottom, and find a place which is able to fill in the new danmaku.
            // The host is fully on stage, and the host is able to "contain" the new danmaku
            // vertically, so the new danmaku should horizontally follow the host.
            var xForNewDanmaku = this._$getDefaultX(danmaku, stageWidth);
            var yForNewDanmaku = 0;
            for (var i = 0; i < ySortedListLength; ++i) {
                var danmakuRect = new Rectangle(xForNewDanmaku, yForNewDanmaku, danmaku.width, danmaku.height);
                var intersectionTestPassed = false;
                var testResultChanged = false;
                // Start the scan for space.
                // TODO: Lower the iteration cost.
                console.log(`Outer loop: i = ${i}`);
                for (var j = i; j < ySortedListLength; ++j) {
                    var testHost = ySortedList[j];
                    console.log(`Inner loop: j = ${j}`);
                    if (testHost.y > yForNewDanmaku + danmaku.height) {
                        // The test host is vertically too far from our test subject.
                        // TODO: Can we use 'i = j;' here to accelerate our search?
                        console.log("Inner loop: break - vertical");
                        intersectionTestPassed = true;
                        testResultChanged = true;
                        break;
                    }
                    var testHostRect = new Rectangle(testHost.x, testHost.y, testHost.width, testHost.height);
                    var intersects = Rectangle.testIntersection(testHostRect, danmakuRect);
                    console.log(`Comparing: v1{${testHost.x},${testHost.y},${testHost.width},${testHost.height}}v2{${xForNewDanmaku},${yForNewDanmaku},${danmaku.width},${danmaku.height}},i:${intersects}`);
                    if (intersects) {
                        //intersectionTestPassed = false;
                        console.log("Inner loop: break - test failed");
                        testResultChanged = true;
                        break;
                    }
                }
                if (!intersectionTestPassed && !testResultChanged && i >= ySortedListLength) {
                    if (yForNewDanmaku + danmaku.height < stageHeight) {
                        intersectionTestPassed = true;
                        console.log("Outer loop: extra passed");
                    }
                }
                if (intersectionTestPassed) {
                    danmaku.y = yForNewDanmaku;
                    danmaku.isYSet = true;
                    break;
                } else {
                    // Skip redundant iterations.
                    var oi = i;
                    do {
                        if (ySortedList[i].y <= yForNewDanmaku) {
                            ++i;
                        } else {
                            break;
                        }
                    } while (i < ySortedListLength);
                    if (i < ySortedListLength) {
                        --i;
                        console.log(`Outer loop: skipped from ${oi} to ${i}`);
                        yForNewDanmaku = ySortedList[i].bottom + 1;
                    } else {
                        break;
                    }
                }
            }
        }
        if (!danmaku.isYSet) {
            // If the new danmaku's Y coordinate is still unset, it should vertically follow the latest danmaku in the
            // displaying list. If there is an overflow, set the new danmaku's Y coordinate to 0.
            // The displaying list is sorted by birth time.
            // BTW, the case when the length of the displaying list is 0 is handled in `ySortedListLength > 0`.
            var displayingList = measureParams.displayingList;
            var displayingListLength = displayingList.length;
            var latestHorizontalDanmakuInDL: SimpleDanmaku = null;
            for (var i = displayingListLength - 1; i >= 0; --i) {
                var dan = displayingList[i];
                if (isDanmakuHorizontal(dan) && dan.isYSet) {
                    latestHorizontalDanmakuInDL = displayingList[i];
                    break;
                }
            }
            if (latestHorizontalDanmakuInDL !== null && latestHorizontalDanmakuInDL.bottom + danmaku.height <= stageHeight) {
                danmaku.y = latestHorizontalDanmakuInDL.bottom + 1;
            } else {
                danmaku.y = 0;
            }
            danmaku.isYSet = true;
        }
        console.info(`Y coord: ${danmaku.y}, yList:`, ySortedList);
        this.__updateYSortedList(danmaku);
    }

    add(danmaku: SimpleDanmaku): void {
    }

    remove(danmaku: SimpleDanmaku): void {
        CommonUtil.remove(this._ySortedList, danmaku);
    }

    private __updateYSortedList(danmaku: SimpleDanmaku): void {
        BPUtil.binaryInsert(this._ySortedList, danmaku, (toInsert: SimpleDanmaku, standard: SimpleDanmaku): number => {
            var yDiff = toInsert.y - standard.y;
            return yDiff !== 0 ? toInsert.x - standard.x : yDiff;
        });
    }

    protected abstract _$getNewX(danmaku: SimpleDanmaku, stageWidth: number, lifeRatio: number): number;

    protected abstract _$isDanmakuFullyOnStage(danmaku: SimpleDanmaku, stageWidth: number): boolean;

    protected abstract _$getDefaultX(danmaku: SimpleDanmaku, stageWidth: number): number;

    private _ySortedList: SimpleDanmaku[] = null;

}

function isDanmakuHorizontal(danmaku: SimpleDanmaku): boolean {
    return danmaku.isType(SimpleDanmakuType.R2L) || danmaku.isType(SimpleDanmakuType.L2R);
}
