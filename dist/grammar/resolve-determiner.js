"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveDeterminer = resolveDeterminer;
/**
 * Realize determiner/number policy for a noun object.
 *
 * Pure Grammar: receives an already-resolved `objectNumber`. Does not read
 * Verb, Function, Ecosystem, or Exponent.
 *
 * - "generic" → kind-reading: countable bare plural; uncountable bare
 * - "singular" | "plural" | other → noun.grammar.defaultDeterminer
 */
function resolveDeterminer({ noun, objectNumber, }) {
    if (objectNumber === "generic") {
        return noun.grammar?.countable ? "plural" : "none";
    }
    return noun.grammar?.defaultDeterminer ?? "indefinite";
}
