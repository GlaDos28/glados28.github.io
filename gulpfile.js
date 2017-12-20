"use strict";

const gulp          = require("gulp");
const { newGame } = require("./index");

gulp.task("run", () => {
    newGame();
});

gulp.task("default", ["run"]);