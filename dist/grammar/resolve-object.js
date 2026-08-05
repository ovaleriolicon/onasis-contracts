"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveObject = resolveObject;
const resolve_determiner_1 = require("./resolve-determiner");
const build_noun_phrase_1 = require("./build-noun-phrase");
/**
 * Build the object surface string.
 *
 * `objectNumber` must already be resolved by NLG (Function ?? Verb ?? singular).
 * Grammar does not inspect Verb pedagogy here.
 */
function resolveObject(object, objectPhrase, objectNumber = "singular") {
    // Curated phrase wins
    if (objectPhrase) {
        return objectPhrase;
    }
    if (!object) {
        return "";
    }
    if (typeof object === "string") {
        return object;
    }
    return (0, build_noun_phrase_1.buildNounPhrase)(object, (0, resolve_determiner_1.resolveDeterminer)({
        noun: object,
        objectNumber,
    }));
}
