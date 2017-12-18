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

/**
 * @description return hello-world message.
 *
 * @returns {string} "Hello, world!" string
 */
function helloWorld() {
    return "Hello, world!";
}

exports = module.exports = { helloWorld : helloWorld };