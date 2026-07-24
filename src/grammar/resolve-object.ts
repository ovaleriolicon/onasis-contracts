import type { NounEntry, VerbEntry } from "../lexicon";

import { resolveDeterminer } from "./resolve-determiner";
import { buildNounPhrase } from "./build-noun-phrase";

export function resolveObject(
  verb: VerbEntry,
  object?: string | NounEntry,
  objectPhrase?: string,
): string {
  // Curated phrase wins

  if (objectPhrase) {
    return objectPhrase;
  }

  if (!object) {
    return "";
  }

  if (typeof object === "string") {
    return object;
  }

  return buildNounPhrase(
    object,
    resolveDeterminer({
      verb,
      noun: object,
    }),
  );
}
