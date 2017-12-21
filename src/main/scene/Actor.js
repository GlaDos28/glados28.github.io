/**
 * ==========================
 * @description scene object descriptor (a.k.a actor)
 * ==========================
 *
 * @author  Evgeny Savelyev
 * @since   19.12.17
 * @version 1.0.0
 * @licence See the LICENCE file in the project root.
 */

"use strict";

/**
 * @class
 * @classdesc descriptor of scene objects. Defines a class of objects, for instance, "health kit", "demon", "boulder", etc.
 *
 * @property {string} name actor's naming
 * @property {Actor} baseActor parent actor from which this one inherits
 * @property {AnimatedModelDescriptor} animatedModelDescriptor actor animation info
 * @property {RectBox} box bounding box with rectangular shape
 * @property {function} processFunc void function(obj, delta) that calls when the corresponding object processes
 * @property {dictionary} attributes dictionary of attributes that will be written into scene object due the object's initialization
 */
class Actor {
    constructor(actorName, animatedModelDescriptor, rectBox, processFunc = () => {}, attributes = {}, baseActor = null) {
        this.name = actorName;
        this.baseActor               = baseActor; /* TODO add actor attributes; use base actor */
        this.animatedModelDescriptor = animatedModelDescriptor;
        this.box                     = rectBox;
        this.processFunc             = processFunc;
        this.attributes              = attributes;
    }

    getName() {
        return this.name;
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

    getProcessFunction() {
        return this.processFunc;
    }

    getAttributes() {
        return this.attributes;
    }
}

exports = module.exports = Actor;