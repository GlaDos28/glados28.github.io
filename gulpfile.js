"use strict";

const gulp        = require("gulp");
const browserify  = require("browserify");
const babelify    = require("babelify");
const { newGame } = require("./index");

gulp.task("run", () => {
    newGame();
});

gulp.task("build", () => browserify({ entries : "./**/*.js" })
    .transform("babelify", { presets : ["es2015"] })
    .bundle()
    .pipe(gulp.src("game.js"))
    .pipe(gulp.dest("built")));

gulp.task("default", ["run"]);

