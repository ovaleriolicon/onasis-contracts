import type { NounEntry } from "../lexicon";
import type { ObjectNumber } from "./object-number";
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
export declare function resolveDeterminer({ noun, objectNumber, }: {
    noun: NounEntry;
    objectNumber: ObjectNumber;
}): string;
