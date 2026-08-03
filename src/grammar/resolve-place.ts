// grammar/resolve-place.ts
//
// Canonical place-preposition resolution for the current engine.
// Priority:
//   1) noun.grammar.omitPlacePreposition → bare
//   2) verb.semantics.requiresPreposition (non-empty) → that prep
//   3) noun.grammar.defaultPreposition → fallback
//   4) bare

import type { NounEntry, VerbEntry } from "../lexicon";

import { buildNounPhrase } from "./build-noun-phrase";

export function resolvePlace(
  place?: NounEntry,
  verb?: VerbEntry,
): string {
  if (!place) return "";

  const phrase = buildNounPhrase(place);

  if (place.grammar?.omitPlacePreposition === true) {
    return phrase;
  }

  const verbPrep = verb?.semantics?.requiresPreposition?.trim();
  const preposition =
    (verbPrep && verbPrep.length > 0 ? verbPrep : undefined) ??
    place.grammar?.defaultPreposition;

  return preposition ? `${preposition} ${phrase}` : phrase;
}
