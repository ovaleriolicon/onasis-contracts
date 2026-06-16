"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildNounPhrase = buildNounPhrase;
const pluralize_1 = require("./pluralize");
function buildNounPhrase(noun, determinerOverride) {
    const { lemma, grammar: { defaultDeterminer }, } = noun;
    const determiner = determinerOverride ?? defaultDeterminer;
    const nounCore = lemma;
    const startsWithVowel = /^[aeiou]/i.test(lemma);
    switch (determiner) {
        case "none":
            return nounCore;
        case "definite":
            return `the ${nounCore}`;
        case "indefinite": {
            return `${startsWithVowel ? "an" : "a"} ${nounCore}`;
        }
        case "plural": {
            return (0, pluralize_1.pluralize)(lemma);
        }
        case "some":
            return `some ${nounCore}`;
        case "any":
            return `any ${nounCore}`;
        default:
            return nounCore;
    }
}
