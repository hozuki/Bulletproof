/**
 * Created by MIC on 2015/11/19.
 */

var gulp = require("gulp");
var ts = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var gutil = require("gulp-util");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");

var tsConfig = {
    target: "es5",
    module: "commonjs",
    noImplicitAny: true,
    noEmitOnError: true,
    removeComments: false
};

gulp.task("build", ["build-compile", "build-browserify"]);

gulp.task("build-compile", function () {
    "use strict";
    return gulp
        .src(["src/**/*.ts", "inc/**/*.ts"])
        .pipe(sourcemaps.init())
        .pipe(ts(tsConfig))
        .js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("build/node"))
});

gulp.task("build-compile-glantern", function () {
    "use strict";
    return gulp
        .src(["lib/glantern/src/**/*.ts", "lib/glantern/inc/**/*.ts"])
        .pipe(sourcemaps.init())
        .pipe(ts(tsConfig))
        .js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("build/lib/glantern/src"))
});

gulp.task("build-browserify", ["build-compile", "build-compile-glantern"], function () {
    "use strict";
    return browserify({
        entries: [
            "build/node/browser-bootstrap.js"
        ],
        debug: true
    })
        .bundle()
        .pipe(source("Bulletproof-browser.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(gulp.dest("build"))
        .pipe(rename({suffix: ".min"}))
        .pipe(uglify())
        .on("error", gutil.log)
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("build"));
});
