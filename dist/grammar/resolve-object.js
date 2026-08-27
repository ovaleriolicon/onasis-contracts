"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveObject = resolveObject;
exports.resolveObjectDeterminerToken = resolveObjectDeterminerToken;
const resolve_determiner_1 = require("./resolve-determiner");
const build_noun_phrase_1 = require("./build-noun-phrase");
/**
 * Build the object surface string.
 *
 * `objectNumber` must already be resolved by NLG (Function ?? Verb ?? singular).
 * Grammar does not inspect Verb pedagogy here.
 *
 * Optional `adjective` is attributive only when the caller supplies it —
 * Grammar never selects adjectives.
 */
function resolveObject(object, objectPhrase, objectNumber = "singular", adjective) {
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
    }), adjective);
}
/**
 * Surface determiner token for an object NP (a/an/the/some/any), or null
 * when the NLG policy yields a bare noun (none / plural).
 * Same policy path as resolveObject → buildNounPhrase.
 */
function resolveObjectDeterminerToken(noun, objectNumber = "singular", adjective) {
    const policy = (0, resolve_determiner_1.resolveDeterminer)({ noun, objectNumber });
    const adjBase = adjective && typeof adjective.base === "string"
        ? adjective.base.trim()
        : "";
    const articleHead = adjBase.length > 0 ? adjBase : noun.lemma;
    const startsWithVowel = /^[aeiou]/i.test(articleHead.trim());
    switch (policy) {
        case "none":
            return null;
        case "definite":
            return "the";
        case "indefinite":
            return startsWithVowel ? "an" : "a";
        case "plural":
            return null;
        case "some":
            return "some";
        case "any":
            return "any";
        default:
            return null;
    }
}
