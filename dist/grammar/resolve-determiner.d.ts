import type { NounEntry } from "../lexicon";
import type { ObjectNumber } from "./object-number";
/**
 * Realize determiner/number policy for a noun object.
 *
 * Pure Grammar: receives an already-resolved reading (`objectNumber`) and
 * the noun. Does not read Verb, Function, Ecosystem, or Exponent.
 *
 * - reading "generic" → kind-reading: countable bare plural; uncountable bare
 *   (Determiner V1; noun lexical number does not override kind-reading)
 * - instance + noun lexical "plural" + countable → bare plural
 * - "singular" + countable → never `none`; explicit valid defaultDeterminer
 *   is preserved; missing/`none` falls back to indefinite
 * - "singular" + uncountable → noun.grammar.defaultDeterminer (bare `none`
 *   stays bare)
 * - reading "plural" | other → noun.grammar.defaultDeterminer (reserved)
 */
export declare function resolveDeterminer({ noun, objectNumber, }: {
    noun: NounEntry;
    objectNumber: ObjectNumber;
}): string;
