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

/**
 * @class
 * @classdesc keyboard handler that listens to keyboard keys
 *
 * @property {map<int, int>} keyStateMap mapping { "key code" : "key state" }
 */
class Keyboard {
    constructor(...listenKeys) {
        this.keyStateMap = {};

        for (const key of listenKeys) {
            this.keyStateMap[key] = STATE_RELEASED;
            const keyHandler = keyboardKey(key);

            keyHandler.press = () => {
                this.keyStateMap[key] = this.keyStateMap[key] === STATE_RELEASED
                    ? STATE_CLICKED
                    : STATE_PRESSED;
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
}

const keyboard = new Keyboard(KEY_RIGHT, KEY_LEFT); /* Singleton */

exports = module.exports = {
    Keyboard  : Keyboard,
    current   : keyboard,
    KEY_LEFT  : KEY_LEFT,
    KEY_RIGHT : KEY_RIGHT
};