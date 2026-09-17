"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveDeterminer = resolveDeterminer;
const determiner_policy_1 = require("./determiner-policy");
const SINGULAR_COUNTABLE_PRESERVED = new Set(determiner_policy_1.DETERMINER_POLICIES.filter((policy) => policy !== "none"));
function preservedSingularCountableDeterminer(value) {
    if (value != null &&
        SINGULAR_COUNTABLE_PRESERVED.has(value)) {
        return value;
    }
    return null;
}
/**
 * Realize determiner/number policy for a noun object.
 *
 * Pure Grammar: receives an already-resolved `objectNumber`. Does not read
 * Verb, Function, Ecosystem, or Exponent.
 *
 * - "generic" → kind-reading: countable bare plural; uncountable bare
 * - "singular" + countable → never `none`; explicit valid defaultDeterminer
 *   is preserved; missing/`none` falls back to indefinite
 * - "singular" + uncountable → noun.grammar.defaultDeterminer (bare `none`
 *   stays bare)
 * - "plural" | other → noun.grammar.defaultDeterminer (reserved)
 */
function resolveDeterminer({ noun, objectNumber, }) {
    if (objectNumber === "generic") {
        return noun.grammar?.countable ? "plural" : "none";
    }
    if (objectNumber === "singular" && noun.grammar?.countable) {
        return (preservedSingularCountableDeterminer(noun.grammar?.defaultDeterminer) ??
            "indefinite");
    }
    return noun.grammar?.defaultDeterminer ?? "indefinite";
}
