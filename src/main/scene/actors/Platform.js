/**
 * ==========================
 * @description Scene's platform object
 * ==========================
 *
 * @author  Evgeny Savelyev
 * @since   21.12.17
 * @version 1.0.0
 * @licence See the LICENCE file in the project root.
 */

"use strict";

const Actor      = require("../Actor");
const RectBox    = require("../../../geometry/RectBox");
const AMDBuilder = require("../../../graphics/animation/AMDBuilder");
const Texture    = require("../../../graphics/Texture");

/* eslint-disable no-magic-numbers */

const boundbox = new RectBox(-110, -30, 220, 60);

const actor = new Actor(
    "Platform",
    new AMDBuilder()
        .startState("spawn")
        .nextSprite(new Texture("resources/lolPlatform.jpg", 0.4, 0.2), -1)
        .setDefaultState("spawn")
        .build(),
    boundbox
);

exports = module.exports = actor;