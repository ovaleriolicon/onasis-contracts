"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveDeterminer = resolveDeterminer;
const object_number_1 = require("./object-number");
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
 * Pure Grammar: receives an already-resolved reading (`objectNumber`) and
 * the noun. Does not read Verb, Function, Ecosystem, or Exponent.
 *
 * - reading "generic" → kind-reading: countable bare plural; uncountable bare.
 *   Exception: a countable noun that stores lexical "singular" and
 *   defaultDeterminer "definite" realizes "the" + the singular lemma.
 *   Lexical singular with any other determiner does not override kind-reading.
 *   Lexical "plural" stays bare plural.
 * - instance + noun lexical "plural" + countable → bare plural
 * - "singular" + countable → never `none`; explicit valid defaultDeterminer
 *   is preserved; missing/`none` falls back to indefinite
 * - "singular" + uncountable → noun.grammar.defaultDeterminer (bare `none`
 *   stays bare)
 * - reading "plural" | other → noun.grammar.defaultDeterminer (reserved)
 */
function resolveDeterminer({ noun, objectNumber, }) {
    const lexical = noun.pedagogy?.preferredObjectNumber;
    const countable = noun.grammar?.countable === true;
    const lexicalSingular = (0, object_number_1.isNounLexicalObjectNumber)(lexical) && lexical === "singular" && countable;
    if (objectNumber === "generic") {
        if (lexicalSingular && noun.grammar?.defaultDeterminer === "definite") {
            return "definite";
        }
        return countable ? "plural" : "none";
    }
    if ((0, object_number_1.isNounLexicalObjectNumber)(lexical) &&
        lexical === "plural" &&
        countable) {
        return "plural";
    }
    if (objectNumber === "singular" && countable) {
        return (preservedSingularCountableDeterminer(noun.grammar?.defaultDeterminer) ??
            "indefinite");
    }
    return noun.grammar?.defaultDeterminer ?? "indefinite";
}
