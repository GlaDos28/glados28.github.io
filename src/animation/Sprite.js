/**
 * ==========================
 * @description animation unit. Consists of an image and displaying time
 * ==========================
 *
 * @author Evgeny Savelyev
 * @since   18.12.17
 * @version 1.0.0
 * @licence See the LICENCE file in the project root.
 */

"use strict";

/**
 * @description structure that stores an image and related displaying interval of this image
 *
 * @property {Image} image sprite image
 * @property {int}   time  displaying interval
 */
class Sprite {
    constructor(image, time) {
        this.image = image;
        this.time  = time;
    }

    getImage() {
        return this.image;
    }

    getTime() {
        return this.time;
    }
}

exports = module.exports = Sprite;