import type { NounEntry } from "../lexicon";
import type { ObjectNumber } from "./object-number";

import { resolveDeterminer } from "./resolve-determiner";
import { buildNounPhrase } from "./build-noun-phrase";

/**
 * Build the object surface string.
 *
 * `objectNumber` must already be resolved by NLG (Function ?? Verb ?? singular).
 * Grammar does not inspect Verb pedagogy here.
 */
export function resolveObject(
  object?: string | NounEntry,
  objectPhrase?: string,
  objectNumber: ObjectNumber = "singular",
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
      noun: object,
      objectNumber,
    }),
  );
}
