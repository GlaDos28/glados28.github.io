/**
 * ==========================
 * @description animation unit. Consists of corresponding state name, image, displaying time and next sprite
 * ==========================
 *
 * @author Evgeny Savelyev
 * @since   18.12.17
 * @version 1.0.0
 * @licence See the LICENCE file in the project root.
 */

"use strict";

/**
 * @class
 * @classdesc structure that stores related state name, image and related displaying interval of this image, as well as the link to the following sprite
 *
 * @property {string} stateName  name of containing this sprite state
 * @property {Image}  image      sprite image
 * @property {int}    time       displaying interval
 * @property {Sprite} nextSprite link to the next sprite (must not be null or undefined)
 */
class Sprite {
    constructor(stateName, image, time, nextSprite) {
        this.stateName = stateName;
        this.image     = image;
        this.time      = time;
        this.next      = nextSprite;
    }

    getStateName() {
        return this.stateName;
    }

    getImage() {
        return this.image;
    }

    getTime() {
        return this.time;
    }

    getNext() {
        return this.next;
    }

    /* Package-private methods */

    __setNext__(nextSprite) {
        this.next = nextSprite;
    }
}

exports = module.exports = Sprite;