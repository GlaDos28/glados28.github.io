/**
 * ==========================
 * @description object that contains all game data
 * ==========================
 *
 * @author  Evgeny Savelyev
 * @since   20.12.17
 * @version 1.0.0
 * @licence See the LICENCE file in the project root.
 */

"use strict";

const Scene    = require("./scene/Scene");
const Keyboard = require("./controller/Keyboard");

/**
 * @class
 * @classdesc game data object that contains the whole game
 *
 * @property {PIXI.Application} pixiApp pixi.js (graphics) application
 * @property {Scene}            scene   game scene
 * @property {bool}             started whether the game has been started
 */
class Game {
    constructor(pixiApp) {
        this.pixiApp = pixiApp;
        this.scene   = new Scene(this.pixiApp);
        this.started = false;
    }

    getPixiApp() {
        return this.pixiApp;
    }

    getScene() {
        return this.scene;
    }

    hasStarted() {
        return this.started;
    }

    start() {
        if (this.started) {
            throw new Error("The game has been already started.");
        }

        this.started = true;

        /* Flip stage of Y axis to make Y coordinate goes positive with moving up */
        this.pixiApp.stage.y += this.pixiApp.renderer.height;
        this.pixiApp.stage.scale.y = -1;

        this.pixiApp.ticker.add((delta) => {
            for (let i = 0; i < this.scene.getObjectsNum(); i += 1) {
                const object = this.scene.getObjectByIndex(i);

                object.process(delta);
                object.draw(delta);
            }

            Keyboard.current.__processIteration__();
        });
    }
}

exports = module.exports = Game;