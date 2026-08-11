import type { AdjectiveEntry, NounEntry } from "../lexicon";
/**
 * Build a noun phrase surface: determiner + optional attributive adjective + noun.
 * When `adjective` is omitted, behavior is identical to the determiner-only path.
 * `a`/`an` uses the first pronounced word (adjective if present, else noun lemma).
 */
export declare function buildNounPhrase(noun: NounEntry, determinerOverride?: string, adjective?: AdjectiveEntry): string;
