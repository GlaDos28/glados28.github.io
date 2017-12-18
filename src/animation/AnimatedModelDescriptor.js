/**
 * ==========================
 * @description Graphical model descriptor that defines animation states (i.e. batches of sprites).
 * ==========================
 *
 * @author Evgeny Savelyev
 * @since   18.12.17
 * @version 1.0.0
 * @licence See the LICENCE file in the project root.
 */

"use strict";

/**
 * @description descriptor of a graphical model with animation. Contains states represented as lists of sprites, for each model state
 *
 * @property {map<string, array<Sprite>>} states map { state name : state sprites }
 * @property {string} defaultStateName base state that triggers due the initialization of an animated model
 */
class AnimatedModelDescriptor {
    constructor(states, defaultStateName) {
        this.states = states;
        this.defaultStateName = defaultStateName;
    }

    getSprite(stateName, spriteIndex) {
        return this.states[stateName][spriteIndex];
    }

    getStateSpriteNum(stateName) {
        return this.states[stateName].size;
    }

    getDefaultStateName() {
        return this.defaultStateName;
    }
}

exports = module.exports = AnimatedModelDescriptor;