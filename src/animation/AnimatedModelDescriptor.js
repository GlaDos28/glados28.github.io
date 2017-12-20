/**
 * ==========================
 * @description Graphical model descriptor that defines animation states (i.e. batch of sprites for each state).
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
 * @classdesc descriptor of a graphical model with animation. Contains states represented as linked lists of sprites
 *
 * @property {map<string, Sprite>} states map { state name : first state sprite }
 * @property {string} defaultStateName base state that triggers due the initialization of an animated model
 */
class AnimatedModelDescriptor {
    constructor(stateFirstSprites, defaultStateName) {
        this.stateFirstSprites = stateFirstSprites;
        this.defaultStateName  = defaultStateName;
    }

    getStateFirstSprite(stateName) {
        return this.stateFirstSprites[stateName];
    }

    getDefaultStateName() {
        return this.defaultStateName;
    }
}

exports = module.exports = AnimatedModelDescriptor;