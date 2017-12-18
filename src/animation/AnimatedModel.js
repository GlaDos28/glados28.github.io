/**
 * ==========================
 * @description graphical model with 2D animation
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
 * @classdesc graphical object that represents an animated model. Consists of animated model descriptor and current model state attributes
 *
 * @property {AnimatedModelDescriptor} descriptor     an object that defines a model (its sprites)
 * @property {Sprite}                  curSprite      current active sprite that displays via draw calls
 * @property {double}                  spriteTimeLeft current time left before switching an active sprite
 */
class AnimatedModel {
    constructor(descriptor) {
        this.descriptor     = descriptor;
        this.curSprite      = this.descriptor.getStateFirstSprite(this.descriptor.getDefaultStateName());
        this.spriteLeftTime = 0;

        this.__initSpriteTime__();
    }

    getDescriptor() {
        return this.descriptor;
    }

    switchToState(stateName) {
        this.curSprite = this.descriptor.getStateFirstSprite(stateName);
        this.__initSpriteTime__();
    }

    draw(delta) {
        this.__tic__(delta);

        /* TODO */
    }

    /* Private methods */

    __goNextSprite__() {
        this.curSprite = this.curSprite.getNext();
        this.__initSpriteTime__();
    }

    __initSpriteTime__() {
        while (this.curSprite.getTime() <= 0) {
            this.curSprite = this.curSprite.getNext();
        }

        this.spriteLeftTime = this.curSprite.getTime();
    }

    __tic__(delta) {
        let ticsLeft = delta;
        this.spriteLeftTime -= ticsLeft;

        while (this.spriteLeftTime <= 0) {
            ticsLeft = -this.spriteLeftTime;
            this.__goNextSprite__();
            this.spriteLeftTime -= ticsLeft;
        }
    }
}

exports = module.exports = AnimatedModel;