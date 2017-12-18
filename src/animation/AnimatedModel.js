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

const AnimatedModelDescriptor = require("./AnimatedModelDescriptor");

/**
 * @description graphical object that represents an animated model. Consists of animated model descriptor and current model state attributes
 *
 * @property {AnimatedModelDescriptor} descriptor that defines a model (its sprites)
 * @property {string} curStateName name of a current state
 * @property {int} curSpriteIndex index in tha array of a current sprite that are displayed
 * @property {int} spriteTimeLeft current time left before switching an active sprite
 */
class AnimatedModel {
    constructor(descriptor) {
        this.descriptor     = descriptor;
        this.curStateName   = this.descriptor.getDefaultStateName();
        this.curSpriteIndex = 0;
        this.spriteLeftTime = 0;
    }

    initSpriteTime() {
        while (this.spriteLeftTime === 0) {
            this.curSpriteIndex += 1;

            if (this.curSpriteIndex < this.descriptor.getStateSpriteNum(this.curStateName)) {
                break;
            }

            this.curStateName = this.descriptor.getSprite(this.curStateName, this.curSpriteIndex);
        }

        if (this.spriteLeftTime === 0) {

        }
    }

    draw(delta) {

    }
}

exports = module.exports = AnimatedModel;