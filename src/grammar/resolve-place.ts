// grammar/resolve-place.ts

import type { NounEntry } from "../lexicon";

import { buildNounPhrase } from "./build-noun-phrase";

export function resolvePlace(place?: NounEntry): string {
  if (!place) return "";

  const phrase = buildNounPhrase(place);

  const preposition = place.grammar?.defaultPreposition;

  return preposition ? `${preposition} ${phrase}` : phrase;
}
