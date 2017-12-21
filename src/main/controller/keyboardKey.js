/**
 * ==========================
 * @description keyboard binder function.
 * ==========================
 *
 * @author  Evgeny Savelyev
 * @since   20.12.17
 * @version 1.0.0
 * @licence See the LICENCE file in the project root.
 */

"use strict";

/**
 * @description keyboard binder function. Allows to bind handlers to keyboard keys
 *
 * @param {int} keyCode code of a keyboard key to handle
 * @returns {object} keyboard key structure which has handler (press, release, click) attributes that can be set
 */
function keyboardKey(keyCode) {
    const key = {};

    key.code    = keyCode;
    key.isDown  = false;
    key.press   = undefined;
    key.release = undefined;

    /* The 'downHandler' */
    key.downHandler = (event) => {
        if (event.keyCode === key.code) {
            if (key.press) {
                key.press();
            }

            key.isDown = true;
        }

        event.preventDefault();
    };

    /* The 'upHandler' */
    key.upHandler = (event) => {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) {
                key.release();
            }

            key.isDown = false;
        }

        event.preventDefault();
    };

    /* Attach event listeners */
    window.addEventListener("keydown", key.downHandler.bind(key), false);
    window.addEventListener("keyup",   key.upHandler.bind(key), false);

    return key;
}

exports = module.exports = keyboardKey;