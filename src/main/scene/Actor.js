/**
 * ==========================
 * @description scene object descriptor (a.k.a actor)
 * ==========================
 *
 * @author Evgeny Savelyev
 * @since   19.12.17
 * @version 1.0.0
 * @licence See the LICENCE file in the project root.
 */

"use strict";

/**
 * @class
 * @classdesc descriptor of scene objects. Defines a class of objects, for instance, "health kit", "demon", "boulder", etc.
 *
 * @property {Actor} baseActor parent actor from which this one inherits
 * @property {AnimatedModelDescriptor} animatedModelDescriptor actor animation info
 * @property {RectBox} box bounding box with rectangular shape
 */
class Actor {
    constructor(baseActor = null, animatedModelDescriptor, rectBox) {
        this.baseActor = baseActor; /* TODO add actor attributes; use base actor */
        this.animatedModelDescriptor = animatedModelDescriptor;
        this.box = rectBox;
    }

    getAnimatedModelDescriptor() {
        return this.animatedModelDescriptor;
    }

    getBaseActor() {
        return this.baseActor;
    }

    getBox() {
        return this.box;
    }
}

exports = module.exports = Actor;