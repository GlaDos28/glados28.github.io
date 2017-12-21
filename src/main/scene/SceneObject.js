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

const Point           = require("../../geometry/Point");
const Position        = require("./Position");
const AnimatedModel   = require("../../graphics/animation/AnimatedModel");
const { lineTouches } = require("../../global");

const BOUNDBOX_LINE_WIDTH = 2;
const BOUNDBOX_COLOR      = 0xFF3300;
const BIG_NUM             = 1000000000;

/**
 * @class
 * @classdesc physical object for the scene. Has actor as object attributes descriptor and scene position
 *
 * @property {Actor}         actor         object descriptor
 * @property {Position}      pos           object (2D) position in the scene. Transforms from Point into Position object automatically inside constructor
 * @property {AnimatedModel} animatedModel object animation data
 * @property {Scene}         sceneRef      reference to the owner scene. Filled when adding to the concrete scene
 * @property {dictionary}    attributes    dictionary of object attributes. Can be changed at run-time, filled with actor attributes initially
 * @property {PIXI.Sprite}   pixiTexture    pixi.js animation sprite
 * @property {PIXI.Sprite}   pixiBoxSprite pixi.js boundbox sprite
 */
class SceneObject {
    constructor(actor, posPoint) {
        this.actor         = actor;
        this.pos           = new Position(posPoint);
        this.animatedModel = new AnimatedModel(this.actor.getAnimatedModelDescriptor());
        this.sceneRef      = undefined;
        this.attributes    = this.actor.getAttributes();

        /* Fills when __setSceneRef__(...) is called */
        this.pixiTexture    = null;
        this.pixiBoxSprite = null;
    }

    getActor() {
        return this.actor;
    }

    getPos() {
        return this.pos;
    }

    getBox() {
        return this.actor.getBox();
    }

    getSceneRef() {
        return this.sceneRef;
    }

    getAttributes() {
        return this.attributes;
    }

    draw(delta) {
        const p = this.pos.getPoint();

        this.pixiBoxSprite.x = p.getX();
        this.pixiBoxSprite.y = p.getY();
        this.animatedModel.draw(this.pixiTexture, p, delta);
    }

    process(delta) {
        this.actor.getProcessFunction()(this, delta);
    }

    getRepelFrom(object) {

        /* Boundbox intersection calculating */

        const intersecsByX = lineTouches(
            this.getPos().getX()   + this.getBox().getX(),
            this.getPos().getX()   + this.getBox().getX2(),
            object.getPos().getX() + object.getBox().getX(),
            object.getPos().getX() + object.getBox().getX2()
        );

        const intersecsByY = lineTouches(
            this.getPos().getY()   + this.getBox().getY(),
            this.getPos().getY()   + this.getBox().getY2(),
            object.getPos().getY() + object.getBox().getY(),
            object.getPos().getY() + object.getBox().getY2()
        );

        if (!intersecsByX || !intersecsByY) {
            return null;
        }

        /* Left X-axis repel */

        let repelXLeft = object.getPos().getX() + object.getBox().getX() - this.getPos().getX() - this.getBox().getX2();

        if (!intersecsByY || repelXLeft > 0) {
            repelXLeft = 0;
        }

        /* Right X-axis repel */

        let repelXRight = object.getPos().getX() + object.getBox().getX2() - this.getPos().getX() - this.getBox().getX();

        if (!intersecsByY || repelXRight < 0) {
            repelXRight = 0;
        }

        /* Down Y-axis repel */

        let repelYDown = object.getPos().getY() + object.getBox().getY() - this.getPos().getY() - this.getBox().getY2();

        if (!intersecsByX || repelYDown > 0) {
            repelYDown = 0;
        }

        /* Up Y-axis repel */

        let repelYUp = object.getPos().getY() + object.getBox().getY2() - this.getPos().getY() - this.getBox().getY();

        if (!intersecsByX || repelYUp < 0) {
            repelYUp = 0;
        }

        /* Selecting repel */

        const xLeftAbs  = repelXLeft  === 0 ? BIG_NUM : -repelXLeft;
        const xRightAbs = repelXRight === 0 ? BIG_NUM :  repelXRight;
        const yDownAbs  = repelYDown  === 0 ? BIG_NUM : -repelYDown;
        const yUpAbs    = repelYUp    === 0 ? BIG_NUM :  repelYUp;

        if (xLeftAbs < xRightAbs) {
            if (xLeftAbs < yDownAbs) {
                if (xLeftAbs < yUpAbs) {
                    return new Point(repelXLeft, 0);
                }

                return new Point(0, repelYUp);
            }

            if (yDownAbs < yUpAbs) {
                return new Point(0, repelYDown);
            }

            return new Point(0, repelYUp);
        }

        if (xRightAbs < yDownAbs) {
            if (xRightAbs < yUpAbs) {
                return new Point(repelXRight, 0);
            }

            return new Point(0, repelYUp);
        }

        if (yDownAbs < yUpAbs) {
            return new Point(0, repelYDown);
        }

        return new Point(0, repelYUp);
    }

    getCurStateName() {
        return this.animatedModel.getCurStateName();
    }

    switchToState(stateName) {
        this.animatedModel.switchToState(stateName);
    }

    /* Package-private methods */

    __setSceneRef__(pixiApp, ownerScene) {
        this.sceneRef   = ownerScene;

        /* Animation sprite */
        this.pixiTexture = new PIXI.Sprite(null);
        pixiApp.stage.addChild(this.pixiTexture);

        /* Boundbox sprite */
        this.pixiBoxSprite = new PIXI.Graphics();
        const box = this.actor.getBox();

        this.pixiBoxSprite.lineStyle(BOUNDBOX_LINE_WIDTH, BOUNDBOX_COLOR, 1);
        this.pixiBoxSprite.beginFill(0, 0);
        this.pixiBoxSprite.drawRect(box.getX(), box.getY(), box.getWidth(), box.getHeight());
        this.pixiBoxSprite.endFill();

        pixiApp.stage.addChild(this.pixiBoxSprite);
    }
}

exports = module.exports = SceneObject;