/**
 * ==========================
 * @description object (2D) position. Differs from (2D) Point by its non-immutability.
 * ==========================
 *
 * @author Evgeny Savelyev
 * @since   19.12.17
 * @version 1.0.0
 * @licence See the LICENCE file in the project root.
 */

"use strict";

const Point = require("../../geometry/Point");

/**
 * @class
 * @classdesc (2D) position of the scene object. Not immutable
 *
 * @property {Point} point position value as (2D) point
 */
class Position {
    constructor(point) {
        this.point = point;
    }

    getPoint() {
        return this.point;
    }

    getX() {
        return this.point.getX();
    }

    getY() {
        return this.point.getY();
    }

    move(x, y) {
        this.point = this.point.sum(new Point(x, y));
    }
}

exports = module.exports = Position;