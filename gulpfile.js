"use strict";

const gulp        = require("gulp");
const concat      = require("gulp-concat");
const { newGame } = require("./index");

gulp.task("run", () => {
    newGame();
});

gulp.task("merge-js", () => gulp.src("./node_modules/**/*.js")
    .pipe(concat("merged_node_modules.js"))
    .pipe(gulp.dest("./merged_node_modules/")));

gulp.task("default", ["run"]);