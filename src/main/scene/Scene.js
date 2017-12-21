/**
 * ==========================
 * @description scene as container of scene objects and main action area in the game
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
 * @classdesc game scene with scene objects. Game action goes here
 *
 * @property {PIXI.Application} pixiApp pixi.js application reference
 * @property {array<SceneObject>} objects array of scene objects. Any object can have a string ID
 * @property {map<string, SceneObject>} objectIdMap mapping { "object ID" : "object" }
 */
class Scene {
    constructor(pixiApp) {
        this.pixiApp     = pixiApp;
        this.objects     = [];
        this.objectIdMap = {};
    }

    getPixiAppRef() {
        return this.pixiApp;
    }

    addObject(object, objectId = undefined) {
        this.objects.push(object);

        if (objectId) {
            this.objectIdMap[objectId] = object;
        }

        object.__setSceneRef__(this.pixiApp, this);
    }

    getObjectsNum() {
        return this.objects.length;
    }

    getObjectByIndex(index) {
        return this.objects[index];
    }

    getObjectById(objectId) {
        return this.objectIdMap[objectId];
    }

    draw(delta) {
        for (const object of this.objects) {
            object.draw(delta);
        }
    }

    process(delta) {
        for (const object of this.objects) {
            object.process(delta);
        }
    }
}

exports = module.exports = Scene;