"use strict";
// grammar/resolve-place.ts
//
// Canonical place-preposition resolution for the current engine.
// Priority:
//   1) noun.grammar.omitPlacePreposition → bare
//   2) verb.semantics.requiresPreposition (non-empty) → that prep
//   3) noun.grammar.defaultPreposition → fallback
//   4) bare
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvePlace = resolvePlace;
const build_noun_phrase_1 = require("./build-noun-phrase");
function resolvePlace(place, verb) {
    if (!place)
        return "";
    const phrase = (0, build_noun_phrase_1.buildNounPhrase)(place);
    if (place.grammar?.omitPlacePreposition === true) {
        return phrase;
    }
    const verbPrep = verb?.semantics?.requiresPreposition?.trim();
    const preposition = (verbPrep && verbPrep.length > 0 ? verbPrep : undefined) ??
        place.grammar?.defaultPreposition;
    return preposition ? `${preposition} ${phrase}` : phrase;
}
