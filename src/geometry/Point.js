/**
 * ==========================
 * @description (2D) Point definition.
 * ==========================
 *
 * @author Evgeny Savelyev
 * @since   18.12.17
 * @version 1.0.0
 * @licence See the LICENCE file in the project root.
 */

"use strict";

/**
 * @description (2D) Point structure with floating-valued X- and Y-axis coordinates
 *
 * @property {double} x X-axis coordinate
 * @property {double} y Y-axis coordinate
 */
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    sum(p) {
        return new Point(this.x + p.x, this.y + p.y);
    }

    dif(p) {
        return new Point(this.x - p.x, this.y - p.y);
    }
}

exports = module.exports = Point;