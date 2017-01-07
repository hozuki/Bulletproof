/**
 * Created by MIC on 2015/11/19.
 */

"use strict";

const gulp = require("gulp");
const ts = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const gutil = require("gulp-util");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const os = require("os");

const tsConfig = {
    target: "es5",
    module: "commonjs",
    noImplicitAny: true,
    noEmitOnError: true,
    removeComments: false
};

const helpers = {
    copyAll: () => {
        return gulp
            .src(["build/**/*.js", "build/**/*.js.map"])
            .pipe(gulp.dest("src/tests/visual/build"));
    },
    errorHandler: function (err) {
        const colors = gutil.colors;
        gutil.log(os.EOL);
        gutil.log(colors.red("Error:") + " " + colors.magenta(err.fileName));
        gutil.log("    on line " + colors.cyan(err.loc.line) + ": " + colors.red(err.message));
        gutil.log("    plugin: " + colors.yellow(err.plugin));
    }
};

gulp.task("default", ["build"]);

gulp.task("build", ["build-compile", "build-browserify"], helpers.copyAll);

gulp.task("build-compile", ["build-compile-glantern"], () => {
    return gulp
        .src(["src/bp/**/*.ts", "inc/**/*.ts"])
        .pipe(sourcemaps.init())
        .pipe(ts(tsConfig))
        .js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("build/node/bp"));
});

gulp.task("build-compile-glantern", () => {
    return gulp
        .src(["lib/glantern/src/gl/**/*.ts", "lib/glantern/inc/**/*.ts"])
        .pipe(sourcemaps.init())
        .pipe(ts(tsConfig))
        .js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("build/lib/glantern/src/gl"));
});

gulp.task("build-browserify", ["build-compile"], () => {
    return browserify({
        entries: [
            "build/node/bp/browser-bootstrap.js"
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

gulp.task("copy-all", helpers.copyAll);
