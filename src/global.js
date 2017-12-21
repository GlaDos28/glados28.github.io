/**
 * ==========================
 * @description global constants and functions
 * ==========================
 *
 * @author  Evgeny Savelyev
 * @since   20.12.17
 * @version 1.0.0
 * @licence See the LICENCE file in the project root.
 */

"use strict";

/* Constants */

const ANCHOR_CENTER = 0.5;

/* Static functions */

function between(value, left, right) {
    return value > left && value < right;
}

function lineTouches(lineLeft, lineRight, boundLeft, boundRight) {
    return lineLeft < boundRight && lineRight > boundLeft;
}

/* Exporting */

exports = module.exports = {
    ANCHOR_CENTER : ANCHOR_CENTER,
    between       : between,
    lineTouches   : lineTouches
};