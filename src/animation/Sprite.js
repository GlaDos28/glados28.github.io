/**
 * ==========================
 * @description animation unit. Consists of corresponding state name, image, displaying time and next sprite
 * ==========================
 *
 * @author  Evgeny Savelyev
 * @since   18.12.17
 * @version 1.0.0
 * @licence See the LICENCE file in the project root.
 */

"use strict";

/**
 * @class
 * @classdesc structure that stores related state name, pixiSprite and related displaying interval of this pixiSprite, as well as the link to the following sprite
 *
 * @property {string}      stateName  name of containing this sprite state
 * @property {PIXI.Sprite} pixiSprite pixi attached sprite with image
 * @property {int}         time       displaying interval
 * @property {Sprite}      nextSprite link to the next sprite (must not be null or undefined)
 */
class Sprite {
    constructor(stateName, imagePath, time, nextSprite) {
        this.stateName  = stateName;
        this.pixiSprite = PIXI.Sprite.fromImage(imagePath);
        this.time       = time;
        this.next       = nextSprite;
    }

    getStateName() {
        return this.stateName;
    }

    getPixiSprite() {
        return this.pixiSprite;
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