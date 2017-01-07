/**
 * Created by MIC on 2016/2/28.
 */
import OutOfRangeError from "../../flash/errors/OutOfRangeError";

abstract class BPUtil {

    static createNumberArray(length: number, zeroFill: boolean = true): number[] {
        length |= 0;
        const result: number[] = new Array<number>(length);
        if (zeroFill) {
            for (let i = 0; i < length; ++i) {
                result[i] = 0;
            }
        }
        return result;
    }

    static insertAt<T>(array: T[], item: T, index: number): void {
        array.splice(index, 0, item);
    }

    /**
     * Binary insertion. If the two
     * @template T
     * @param array {T[]} The array to insert into.
     * @param item {T} The new item to insert.
     * @param comparison {function (T, T): Number} The compare function. It should return a positive number when the first
     * argument is greater than the second one, a negative when less, and 0 when they are equal.
     * @returns {Number} The inserted index of the item.
     */
    static binaryInsert<T>(array: T[], item: T, comparison: (toCompare: T, standard: T) => number): number {
        if (array.length <= 0) {
            array.push(item);
            return 0;
        }
        const arrayLength = array.length;
        if (comparison(item, array[0]) <= 0) {
            array.unshift(item);
            return 0;
        } else if (comparison(item, array[arrayLength - 1]) > 0) {
            array.push(item);
            return arrayLength - 1;
        }
        const newIndex = getBSIndex(array, item, comparison);
        if (newIndex < 0) {
            throw new OutOfRangeError("Unexpected sorting result.");
        }
        BPUtil.insertAt(array, item, newIndex);
        return newIndex;
    }

}

/**
 * Returns the proposed insertion index for binary insertion. The index fulfills that, if there are equal items in the
 * array, the new item will be inserted before the first one; if there is not, the new item will be inserted to the place
 * where the array is still in order after insertion.
 * @template T
 * @param array {T[]}
 * @param item {T}
 * @param comparison {function (T, T): Number}
 */
function getBSIndex<T>(array: T[], item: T, comparison: (toCompare: T, standard: T) => number): number {
    const arrayLength = array.length;
    let low = 0, high = arrayLength - 1;
    let middle: number = -1;
    while (low < high) {
        middle = ((low + high) / 2) | 0;
        const compareResult = comparison(item, array[middle]);
        if (compareResult > 0) {
            // item > array[middle]
            low = middle + 1;
            if (low > high) {
                middle = low;
                break;
            }
        } else if (compareResult < 0) {
            // item < array[middle]
            high = middle - 1;
            if (high < low) {
                middle = low;
                break;
            }
        } else {
            //middle = middle;
            break;
        }
    }
    if (middle > 0) {
        do {
            if (comparison(item, array[middle]) >= 0) {
                --middle;
            } else {
                break;
            }
        } while (middle > 0);
    }
    return middle;
}

export default BPUtil;
