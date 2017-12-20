/**
 * ==========================
 * @description scene object definition
 * ==========================
 *
 * @author  Evgeny Savelyev
 * @since   19.12.17
 * @version 1.0.0
 * @licence See the LICENCE file in the project root.
 */

"use strict";

const Position      = require("./Position");
const AnimatedModel = require("../../animation/AnimatedModel");

/**
 * @class
 * @classdesc physical object for the scene. Has actor as object attributes descriptor and scene position
 *
 * @property {Actor}    actor    object descriptor
 * @property {Position} pos      object (2D) position in the scene. Transforms from Point into Position object automatically inside constructor
 * @property {Scene}    sceneRef reference to the owner scene. Filled when adding to the concrete scene
 */
class SceneObject {
    constructor(actor, posPoint) {
        this.actor         = actor;
        this.pos           = new Position(posPoint);
        this.animatedModel = new AnimatedModel(this.actor.getAnimatedModelDescriptor());
        this.sceneRef      = undefined;
    }

    getActor() {
        return this.actor;
    }

    getPos() {
        return this.pos;
    }

    getSceneRef() {
        return this.sceneRef;
    }

    draw(app, delta) {
        this.animatedModel.draw(app, this.pos.getPoint(), delta);
    }

    process(delta) {
        this.actor.getProcessFunction()(this, delta);
    }

    /* Package-private methods */

    __setSceneRef__(ownerScene) {
        this.sceneRef = ownerScene;
    }
}

exports = module.exports = SceneObject;