/**
 * Created by MIC on 2015/9/12.
 */

export function inject(source:Object, destination:Object):void {
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            if (destination.hasOwnProperty[key]) {
                inject(source[key], destination[key]);
            } else {
                destination[key] = source[key];
            }
        }
    }
}
