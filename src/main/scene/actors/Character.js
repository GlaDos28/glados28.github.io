/**
 * ==========================
 * @description Character is a main hero of the game
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
const Keyboard   = require("../../controller/Keyboard");

/* eslint-disable no-undef, max-statements, no-magic-numbers, lines-around-comment, operator-linebreak */

const boundbox = new RectBox(-50, -60, 100, 140);
const moveSpriteTime = 4;

const actor = new Actor(
    "Character",
    new AMDBuilder()
        .startState("see")
        .nextSprite(new Texture("resources/lolCharacter.png"), -1)
        .startState("move-left")
        .nextSprite(new Texture("resources/lolCharacter3_1.png"),  moveSpriteTime)
        .nextSprite(new Texture("resources/lolCharacter3_2.png"),  moveSpriteTime)
        .nextSprite(new Texture("resources/lolCharacter3_3.png"),  moveSpriteTime)
        .nextSprite(new Texture("resources/lolCharacter3_4.png"),  moveSpriteTime)
        .nextSprite(new Texture("resources/lolCharacter3_5.png"),  moveSpriteTime)
        .nextSprite(new Texture("resources/lolCharacter3_6.png"),  moveSpriteTime)
        .nextSprite(new Texture("resources/lolCharacter3_7.png"),  moveSpriteTime)
        .nextSprite(new Texture("resources/lolCharacter3_8.png"),  moveSpriteTime)
        .nextSprite(new Texture("resources/lolCharacter3_9.png"),  moveSpriteTime)
        .nextSprite(new Texture("resources/lolCharacter3_10.png"), moveSpriteTime)
        .nextSprite(new Texture("resources/lolCharacter3_11.png"), moveSpriteTime)
        .nextSprite(new Texture("resources/lolCharacter3_12.png"), moveSpriteTime)
        .formLoop()
        .startState("move-right")
        .nextSprite(new Texture("resources/lolCharacter4_1.png"),  moveSpriteTime)
        .nextSprite(new Texture("resources/lolCharacter4_2.png"),  moveSpriteTime)
        .nextSprite(new Texture("resources/lolCharacter4_3.png"),  moveSpriteTime)
        .nextSprite(new Texture("resources/lolCharacter4_4.png"),  moveSpriteTime)
        .nextSprite(new Texture("resources/lolCharacter4_5.png"),  moveSpriteTime)
        .nextSprite(new Texture("resources/lolCharacter4_6.png"),  moveSpriteTime)
        .nextSprite(new Texture("resources/lolCharacter4_7.png"),  moveSpriteTime)
        .nextSprite(new Texture("resources/lolCharacter4_8.png"),  moveSpriteTime)
        .nextSprite(new Texture("resources/lolCharacter4_9.png"),  moveSpriteTime)
        .nextSprite(new Texture("resources/lolCharacter4_10.png"), moveSpriteTime)
        .nextSprite(new Texture("resources/lolCharacter4_11.png"), moveSpriteTime)
        .nextSprite(new Texture("resources/lolCharacter4_12.png"), moveSpriteTime)
        .formLoop()
        .startState("air")
        .nextSprite(new Texture("resources/lolCharacter2.png", 0.3, 0.3), -1)
        .setDefaultState("see")
        .build(),
    boundbox,
    (obj, delta) => {
        const attr = obj.getAttributes();

        /* Jumping */

        if (Keyboard.current.isClicked(Keyboard.KEY_SPACE) && attr.jumpedNum < attr.maxJumpNum) {
            attr.speedY = attr.jumpAcc;
            attr.jumpedNum += 1;
        }

        /* Moving left/right */

        let movedLeft  = false;
        let movedRight = false;

        if (Keyboard.current.isPressed(Keyboard.KEY_LEFT)) {
            obj.getPos().move(-attr.speedX, 0);
            movedLeft = true;
        }

        if (Keyboard.current.isPressed(Keyboard.KEY_RIGHT)) {
            obj.getPos().move(attr.speedX, 0);
            movedRight = true;
        }

        /* Processing fall out of the scene */

        if (obj.getPos().getY() + obj.getBox().getY2() < 0) {
            obj.getPos().set(400, 400);
        }

        /* Repel processing */

        attr.speedY -= attr.fallAcc;
        obj.getPos().move(0, attr.speedY);

        let inAir = true;

        for (let i = 0; i < obj.getSceneRef().getObjectsNum(); i += 1) {
            /* Objects' boundboxes sizes must be >> objects' max speed! */

            const curObj = obj.getSceneRef().getObjectByIndex(i);

            if (curObj.getActor().getName() === "Platform") {
                const repel = obj.getRepelFrom(curObj);

                if (repel) {
                    obj.getPos().move(repel.getX(), repel.getY());

                    if (repel.getY() > 0) { /* I.e. landed on the platform */
                        attr.jumpedNum = 0;
                        inAir = false;

                        if (attr.speedY < 0) {
                            attr.speedY = 0;
                        }
                    } else if (repel.getY() < 0 && attr.speedY > 0) {
                        attr.speedY = 0;
                    }
                }
            }
        }

        /* Animation processing */

        if (inAir) {
            obj.switchToState("air");
        } else if (movedLeft && obj.getCurStateName() !== "move-left") {
            obj.switchToState("move-left");
        } else if (movedRight && obj.getCurStateName() !== "move-right") {
            obj.switchToState("move-right");
        } else if (!movedLeft && !movedRight) {
            obj.switchToState("see");
        }
    },
    {
        /* Constants */
        speedX     : 8,
        fallAcc    : 1,
        jumpAcc    : 15,
        maxJumpNum : 3,

        /* Variables */
        speedY    : 0,
        jumpedNum : 0
    }
);

exports = module.exports = actor;