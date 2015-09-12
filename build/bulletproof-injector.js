/**
 * Created by MIC on 2015/9/12.
 */
function inject(source, destination) {
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            if (destination.hasOwnProperty[key]) {
                inject(source[key], destination[key]);
            }
            else {
                destination[key] = source[key];
            }
        }
    }
}
exports.inject = inject;
//# sourceMappingURL=bulletproof-injector.js.map