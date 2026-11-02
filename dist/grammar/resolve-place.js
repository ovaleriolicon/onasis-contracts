"use strict";
// grammar/resolve-place.ts
//
// Canonical place-preposition resolution for the current engine.
// A string requiresPreposition of "to" is the destination reading. Any other
// non-empty string is the location reading. { location, destination } uses
// goalRelation; without that selection the preposition stays unresolved.
// Priority:
//   1) destination reading + omitPlacePreposition → bare phrase
//   2) location reading + locationPreposition → that preposition
//   3) verb preposition from the reading above
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
function readingOfStringPreposition(preposition) {
    return preposition === "to" ? "destination" : "location";
}
function resolvePlace(place, verb, goalRelation) {
    if (!place)
        return "";
    const phrase = (0, build_noun_phrase_1.buildNounPhrase)(place);
    const raw = verb?.semantics?.requiresPreposition;
    const dual = dualPlacePrepositions(raw);
    let preposition;
    let reading;
    if (dual || (raw && typeof raw === "object")) {
        if (dual && (goalRelation === "location" || goalRelation === "destination")) {
            preposition = dual[goalRelation];
            reading = goalRelation;
        }
        else {
            throw new Error("Place preposition unresolved");
        }
    }
    else {
        const verbPrep = typeof raw === "string" ? raw.trim() : "";
        if (verbPrep.length > 0) {
            preposition = verbPrep;
            reading = readingOfStringPreposition(verbPrep);
        }
        else {
            const fallback = place.grammar?.defaultPreposition?.trim();
            if (fallback) {
                preposition = fallback;
                reading = readingOfStringPreposition(fallback);
            }
        }
    }
    if (place.grammar?.omitPlacePreposition === true && reading === "destination") {
        return phrase;
    }
    const locationPreposition = place.grammar?.locationPreposition?.trim();
    if (reading === "location" && locationPreposition) {
        return `${locationPreposition} ${phrase}`;
    }
    return preposition ? `${preposition} ${phrase}` : phrase;
}
