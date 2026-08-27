import type { AdjectiveEntry, NounEntry } from "../lexicon";
import type { ObjectNumber } from "./object-number";
/**
 * Build the object surface string.
 *
 * `objectNumber` must already be resolved by NLG (Function ?? Verb ?? singular).
 * Grammar does not inspect Verb pedagogy here.
 *
 * Optional `adjective` is attributive only when the caller supplies it —
 * Grammar never selects adjectives.
 */
export declare function resolveObject(object?: string | NounEntry, objectPhrase?: string, objectNumber?: ObjectNumber, adjective?: AdjectiveEntry): string;
/**
 * Surface determiner token for an object NP (a/an/the/some/any), or null
 * when the NLG policy yields a bare noun (none / plural).
 * Same policy path as resolveObject → buildNounPhrase.
 */
export declare function resolveObjectDeterminerToken(noun: NounEntry, objectNumber?: ObjectNumber, adjective?: AdjectiveEntry): string | null;
