/**
 * ==========================
 * @description AMD (Animated Model Descriptor) Builder. Is a DSL object. Helps to create animated model descriptors with handy-driven methods
 * ==========================
 *
 * @author Evgeny Savelyev
 * @since   18.12.17
 * @version 1.0.0
 * @licence See the LICENCE file in the project root.
 */

"use strict";

const Sprite = require("./Sprite");
const AnimatedModelDescriptor = require("./AnimatedModelDescriptor");

/**
 * @class
 * @classdesc animated model descriptor builder (DSL). Provides handy-driven methods for creating animated model descriptors
 *
 * @property {array<Sprite>} sprites array of all sprites added into the builder
 * @property {map<string, Sprite>} spriteIdMap mapping { "sprite ID" : "sprite" }
 * @property {map<string, Sprite>} stateFirstSprites mapping { "state name" : "first state sprite" }
 * @property {string} defaultStateName name of the default state
 * @property {string} curFillStateName current filling (with sprites) state name
 * @property {Sprite} lastAddedSprite sprite that was added the last time
 * @property {bool} built whether the builder has been already built a descriptor once
 */
class AMDBuilder {
    constructor() {
        this.sprites           = [];
        this.spriteIdMap       = {};
        this.stateFirstSprites = {};
        this.defaultStateName  = undefined;
        this.curFillStateName  = undefined;
        this.lastAddedSprite   = undefined;
        this.built             = false;
    }

    startState(stateName) {
        this.__ensureNotBuilt__();

        if (typeof stateName !== "string" || !stateName) {
            throw new Error(`Corrupt state name "${stateName}". This should be a nonempty string.`);
        }

        if (this.curFillStateName && !this.lastAddedSprite) {
            throw new Error("Should add at least one sprite into a state to start another one. Use nextSprite(...).");
        }

        this.curFillStateName = stateName;
        this.lastAddedSprite  = null; /* Nullify the last sprite, because last sprite meaning signifies only within state sprite batch */

        return this;
    }

    nextSprite(imagePath, time, spriteId = null, nextSpriteId = null) {
        this.__nextSpriteValidation__(imagePath, time, spriteId, nextSpriteId);

        /* Note that all sprite undefined 'next' links (i.e. states' last sprites) will be        */
        /* Translated into links to the first sprite of a default state, due the building process */

        const newSprite = new Sprite(this.curFillStateName, imagePath, time, undefined);

        this.sprites.push(newSprite);

        if (this.lastAddedSprite) { /* Whether this is not the first sprite in the current state */
            if (this.lastAddedSprite.getNext()) {
                this.lastAddedSprite = newSprite;
            } else {
                this.lastAddedSprite.__setNext__(newSprite);
                this.lastAddedSprite = this.lastAddedSprite.getNext();
            }
        } else {                    /* Otherwise set sprite as the first sprite of the current state */
            this.lastAddedSprite = newSprite;
            this.stateFirstSprites[this.curFillStateName] = this.lastAddedSprite;
        }

        /* Working with sprite ID */

        if (spriteId) { /* Register sprite identifier if there is one given in arguments */
            this.spriteIdMap[spriteId] = this.lastAddedSprite;
        }

        /* Working with next sprite ID                                                                 */
        /* Note that after setting next sprite of the last added sprite current state remains unharmed */

        this.lastAddedSprite.__setNext__(this.spriteIdMap[nextSpriteId]);

        return this;
    }

    setDefaultState(stateName) {
        this.__ensureNotBuilt__();

        if (typeof stateName !== "string" || !stateName) {
            throw new Error(`Corrupt state name "${stateName}". This should be a nonempty string.`);
        }

        if (!this.stateFirstSprites[stateName]) {
            throw new Error(`Nonexistent state "${stateName}". Create a state by startState() method.`);
        }

        this.defaultStateName = stateName;

        return this;
    }

    build() {
        this.__ensureNotBuilt__();

        if (!this.defaultStateName) {
            throw new Error("Should set a default state before building. Use setDefaultState(stateName).");
        }

        if (!this.lastAddedSprite) {
            throw new Error("Should add at least one sprite into a state to start building. Use nextSprite(...).");
        }

        /* Fill sprite 'next' links with the first sprite of the default state */

        for (const sprite of this.sprites) {
            if (!sprite.getNext()) {
                sprite.__setNext__(this.stateFirstSprites[this.defaultStateName]);
            }
        }

        return new AnimatedModelDescriptor(this.stateFirstSprites, this.defaultStateName);
    }

    /* Private methods */

    __ensureNotBuilt__() {
        if (this.built) {
            throw new Error("Animated model description has been already built with that builder.");
        }
    }

    __nextSpriteValidation__(image, time, spriteId, nextSpriteId) {

        /* Main */

        this.__ensureNotBuilt__();

        /* TODO check pixiSprite */

        if (typeof time !== "number" || time < -1) {
            throw new Error(`Corrupt sprite time "${time}". This should be a number from [-1, inf).`);
        }

        if (!this.curFillStateName) {
            throw new Error("Should start a state first. Use startState(stateName).");
        }

        /* Sprite ID */

        if (spriteId !== null && (typeof spriteId !== "string" || !spriteId)) {
            throw new Error(`Corrupt sprite ID "${spriteId}". This should be a nonempty string, or leave it blank.`);
        }

        /* Next sprite ID */

        if (nextSpriteId !== null) {
            if (typeof nextSpriteId !== "string" || !nextSpriteId) {
                throw new Error(`Corrupt sprite ID "${nextSpriteId}". This should be a nonempty string that has been already registered previously.`);
            }

            if (!this.spriteIdMap[nextSpriteId]) {
                throw new Error(`Unregistered sprite ID "${nextSpriteId}".
                This should be a string that has been already registered previously with pointing "spriteId" in nextSprite(...) method.`);
            }

            if (nextSpriteId && !this.lastAddedSprite) {
                throw new Error("Should add a first sprite into the state first. Use nextSprite(...).");
            }
        }
    }
}

exports = module.exports = AMDBuilder;