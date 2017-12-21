/**
 * ==========================
 * @description handler that listens to keyboard keys
 * ==========================
 *
 * @author  Evgeny Savelyev
 * @since   20.12.17
 * @version 1.0.0
 * @licence See the LICENCE file in the project root.
 */

"use strict";

const keyboardKey = require("./keyboardKey");

/* Must be STATE_RELEASED < STATE_CLICKED and STATE_RELEASED < STATE_PRESSED */
const STATE_RELEASED = 0;
const STATE_CLICKED  = 1;
const STATE_PRESSED  = 2;

const KEY_RIGHT = 39;
const KEY_LEFT  = 37;
const KEY_SPACE = 32;

/**
 * @class
 * @classdesc keyboard handler that listens to keyboard keys
 *
 * @property {map<int, int>} keyStateMap mapping { "key code" : "key state" }
 * @property {array<int>}    clickedKeys array of keys that was clicked for the current time. Used by pixi.js running loop to change clicked into pressed
 */
class Keyboard {
    constructor(...listenKeys) {
        this.keyStateMap = {};
        this.clickedKeys = [];

        for (const key of listenKeys) {
            this.keyStateMap[key] = STATE_RELEASED;
            const keyHandler = keyboardKey(key);

            keyHandler.press = () => {
                if (this.keyStateMap[key] === STATE_RELEASED) {
                    this.keyStateMap[key] = STATE_CLICKED;
                    this.clickedKeys.push(key);
                }
            };

            keyHandler.release = () => {
                this.keyStateMap[key] = STATE_RELEASED;
            };
        }
    }

    isPressed(keyCode) {
        return this.keyStateMap[keyCode] > STATE_RELEASED;
    }

    isReleased(keyCode) {
        return this.keyStateMap[keyCode] === STATE_RELEASED;
    }

    isClicked(keyCode) {
        return this.keyStateMap[keyCode] === STATE_CLICKED;
    }

    /* Package-private methods */

    __processIteration__() {
        for (const key of this.clickedKeys) {
            this.keyStateMap[key] = STATE_PRESSED;
        }

        this.clickedKeys = [];
    }
}

const keyboard = new Keyboard(KEY_RIGHT, KEY_LEFT, KEY_SPACE); /* Singleton */

exports = module.exports = {
    Keyboard  : Keyboard,
    current   : keyboard,
    KEY_LEFT  : KEY_LEFT,
    KEY_RIGHT : KEY_RIGHT,
    KEY_SPACE : KEY_SPACE
};