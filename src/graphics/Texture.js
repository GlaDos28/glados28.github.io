/**
 * ==========================
 * @description image with parameters
 * ==========================
 *
 * @author  Evgeny Savelyev
 * @since   21.12.17
 * @version 1.0.0
 * @licence See the LICENCE file in the project root.
 */

"use strict";

/**
 * @class
 * @classdesc image with parameters and attached pixi.js texture
 *
 * @property {PIXI.Texture} pixiTexture auto-generated (by given parameters) pixi texture
 * @property {double} scaleX image X-axis scale parameter
 * @property {double} scaleY image Y-axis scale parameter
 */
class Texture {
    constructor(imagePath, scaleX = 1, scaleY = 1) {
        this.pixiTexture = PIXI.Texture.fromImage(imagePath);
        this.scaleX      = scaleX;
        this.scaleY      = -scaleY; /* Stage of pixi.js get flipped by Y that is why we need to flip each texture to display it correctly */
    }

    getPixiTexture() {
        return this.pixiTexture;
    }

    getScaleX() {
        return this.scaleX;
    }

    getScaleY() {
        return this.scaleY;
    }
}

exports = module.exports = Texture;