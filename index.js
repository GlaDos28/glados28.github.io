/**
 * ==========================
 * @description Start point of a project.
 * ==========================
 *
 * @author Evgeny Savelyev
 * @since   17.12.17
 * @version 1.0.0
 * @licence See the LICENCE file in the project root.
 */

"use strict";

require("./node_modules/pixi.js/dist/pixi.min.js");
const Game        = require("./src/main/Game");
const Actor       = require("./src/main/scene/Actor");
const SceneObject = require("./src/main/scene/SceneObject");
const Point       = require("./src/geometry/Point");
const RectBox     = require("./src/geometry/RectBox");
const AMDBuilder  = require("./src/animation/AMDBuilder");
const Keyboard    = require("./src/main/controller/Keyboard");

const WIDTH            = 800;
const HEIGHT           = 600;
const BACKGROUND_COLOR = 0x1099bb;

function newGame() {
    const pixiApp = new PIXI.Application(WIDTH, HEIGHT, { backgroundColor : BACKGROUND_COLOR });
    const game    = new Game(pixiApp);

    /* Actors definitions */

    const testCharacter = new Actor(
        new AMDBuilder()
            .startState("see")
            .nextSprite("D://WebstormProjects/ForAndrey/lolCharacter.jpg", -1)
            .setDefaultState("see")
            .build(),
        new RectBox(-50, -50, 100, 100),
        (obj, delta) => {
            let fall = true;

            for (let i = 0; i < obj.getSceneRef().getObjectsNum(); i += 1) {
                const curObject = obj.getSceneRef().getObjectByIndex(i);

                if (obj !== curObject && curObject.getPos().getY() >= obj.getPos().getY()) { /* TODO also check it to be a platform (add name attribute to Actor) */
                    fall = false;
                    break;
                }
            }

            if (fall) {
                obj.getPos().move(0, -1); /* TODO acceleration (add possibility to add attributes to SceneObject) */
            }

            if (Keyboard.current.isPressed(Keyboard.KEY_LEFT)) {
                obj.getPos().move(-1, 0);
            }

            if (Keyboard.current.isPressed(Keyboard.KEY_RIGHT)) {
                obj.getPos().move(1, 0);
            }
        }
    );

    const testPlatform = new Actor(
        new AMDBuilder()
            .startState("spawn")
            .nextSprite("D://WebstormProjects/ForAndrey/lolPlatform.png", -1)
            .setDefaultState("spawn")
            .build(),
        new RectBox(-100, -25, 200, 50)
    );

    /* Scene init */

    const scene = game.getScene();

    scene.addObject(new SceneObject(testCharacter, new Point(100, 200), "character"));
    scene.addObject(new SceneObject(testPlatform,  new Point(100, 10)));

    /* Starting the game */

    game.start();

    return game;
}

exports = module.exports = { newGame: newGame };