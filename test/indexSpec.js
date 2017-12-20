/**
 * ==========================
 * @description tests for index.js file. Provided for Mocha and Istanbul libraries.
 * ==========================
 *
 * @author  Evgeny Savelyev
 * @since   18.12.17
 * @version 1.0.0
 * @licence See the LICENCE file in the project root.
 */

"use strict";

const { expect } = require("chai");
const index      = require("../index");

describe("Example", () => {
    before((done) => {
        done();
    });

    afterEach((done) => {
        done();
    });

    it("'Hello-world' works", () => {
        expect(index.helloWorld()).to.equal("Hello, world!");
    });
});

exports = module.exports = {};