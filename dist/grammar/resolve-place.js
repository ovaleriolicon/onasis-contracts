"use strict";
// grammar/resolve-place.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvePlace = resolvePlace;
const build_noun_phrase_1 = require("./build-noun-phrase");
function resolvePlace(place) {
    if (!place)
        return "";
    const phrase = (0, build_noun_phrase_1.buildNounPhrase)(place);
    const preposition = place.grammar?.defaultPreposition;
    return preposition ? `${preposition} ${phrase}` : phrase;
}
