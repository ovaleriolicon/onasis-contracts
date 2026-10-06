"use strict";
// grammar/resolve-place.ts
//
// Canonical place-preposition resolution for the current engine.
// Priority:
//   1) noun.grammar.omitPlacePreposition → bare
//   2) requiresPreposition object + goalRelation location|destination → that prep
//      object without a valid goalRelation → unresolved (no noun fallback)
//   3) requiresPreposition string (non-empty) → that prep
//   4) noun.grammar.defaultPreposition → fallback
//   5) bare
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvePlace = resolvePlace;
const build_noun_phrase_1 = require("./build-noun-phrase");
function dualPlacePrepositions(value) {
    if (!value || typeof value !== "object" || Array.isArray(value))
        return null;
    const record = value;
    const keys = Object.keys(record);
    if (keys.length !== 2 || !keys.includes("location") || !keys.includes("destination")) {
        return null;
    }
    const location = typeof record.location === "string" ? record.location.trim() : "";
    const destination = typeof record.destination === "string" ? record.destination.trim() : "";
    if (!location || !destination)
        return null;
    return { location, destination };
}
function resolvePlace(place, verb, goalRelation) {
    if (!place)
        return "";
    const phrase = (0, build_noun_phrase_1.buildNounPhrase)(place);
    if (place.grammar?.omitPlacePreposition === true) {
        return phrase;
    }
    const raw = verb?.semantics?.requiresPreposition;
    const dual = dualPlacePrepositions(raw);
    if (dual || (raw && typeof raw === "object")) {
        if (dual && (goalRelation === "location" || goalRelation === "destination")) {
            return `${dual[goalRelation]} ${phrase}`;
        }
        throw new Error("Place preposition unresolved");
    }
    const verbPrep = typeof raw === "string" ? raw.trim() : "";
    const preposition = (verbPrep.length > 0 ? verbPrep : undefined) ??
        place.grammar?.defaultPreposition;
    return preposition ? `${preposition} ${phrase}` : phrase;
}
