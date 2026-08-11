"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildNounPhrase = buildNounPhrase;
const pluralize_1 = require("./pluralize");
function startsWithVowelSound(word) {
    return /^[aeiou]/i.test(word.trim());
}
/**
 * Build a noun phrase surface: determiner + optional attributive adjective + noun.
 * When `adjective` is omitted, behavior is identical to the determiner-only path.
 * `a`/`an` uses the first pronounced word (adjective if present, else noun lemma).
 */
function buildNounPhrase(noun, determinerOverride, adjective) {
    const { lemma, grammar: { defaultDeterminer }, } = noun;
    const determiner = determinerOverride ?? defaultDeterminer;
    const adjBase = adjective && typeof adjective.base === "string"
        ? adjective.base.trim()
        : "";
    const hasAdjective = adjBase.length > 0;
    const nounCore = hasAdjective ? `${adjBase} ${lemma}` : lemma;
    const articleHead = hasAdjective ? adjBase : lemma;
    const startsWithVowel = startsWithVowelSound(articleHead);
    switch (determiner) {
        case "none":
            return nounCore;
        case "definite":
            return `the ${nounCore}`;
        case "indefinite": {
            return `${startsWithVowel ? "an" : "a"} ${nounCore}`;
        }
        case "plural": {
            const pluralNoun = (0, pluralize_1.pluralize)(lemma);
            return hasAdjective ? `${adjBase} ${pluralNoun}` : pluralNoun;
        }
        case "some":
            return `some ${nounCore}`;
        case "any":
            return `any ${nounCore}`;
        default:
            return nounCore;
    }
}
