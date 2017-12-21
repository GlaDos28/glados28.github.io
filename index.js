/**
 * ==========================
 * @description start point of the project.
 * ==========================
 *
 * @author  Evgeny Savelyev
 * @since   17.12.17
 * @version 1.0.0
 * @licence See the LICENCE file in the project root.
 */

"use strict";

require("./node_modules/pixi.js/dist/pixi.js");
const Game           = require("./src/main/Game");
const SceneObject    = require("./src/main/scene/SceneObject");
const Point          = require("./src/geometry/Point");
const actorCharacter = require("./src/main/scene/actors/Character");
const actorPlatform  = require("./src/main/scene/actors/Platform");

const WIDTH            = 800;
const HEIGHT           = 800;
const BACKGROUND_COLOR = 0x1099bb;

/* eslint-disable no-undef, max-statements, no-magic-numbers, lines-around-comment, operator-linebreak */

function newGame() {
    const pixiApp = new PIXI.Application(WIDTH, HEIGHT, { backgroundColor : BACKGROUND_COLOR });
    const game    = new Game(pixiApp);

    /* Scene init */

    const scene = game.getScene();

    scene.addObject(new SceneObject(actorPlatform,  new Point(200, 100)));
    scene.addObject(new SceneObject(actorPlatform,  new Point(400, 300)));
    scene.addObject(new SceneObject(actorPlatform,  new Point(650, 306)));
    scene.addObject(new SceneObject(actorPlatform,  new Point(500, 600)));
    scene.addObject(new SceneObject(actorCharacter, new Point(400, 400), "character"));

    /* Starting the game */

    game.start();

    return game;
}

exports = module.exports = { newGame: newGame };