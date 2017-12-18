"use strict";

const gulp           = require("gulp");
const { helloWorld } = require("./index");

gulp.task("run", () => {
    console.log(helloWorld());
});