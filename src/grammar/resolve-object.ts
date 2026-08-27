import type { AdjectiveEntry, NounEntry } from "../lexicon";
import type { ObjectNumber } from "./object-number";

import { resolveDeterminer } from "./resolve-determiner";
import { buildNounPhrase } from "./build-noun-phrase";

/**
 * Build the object surface string.
 *
 * `objectNumber` must already be resolved by NLG (Function ?? Verb ?? singular).
 * Grammar does not inspect Verb pedagogy here.
 *
 * Optional `adjective` is attributive only when the caller supplies it —
 * Grammar never selects adjectives.
 */
export function resolveObject(
  object?: string | NounEntry,
  objectPhrase?: string,
  objectNumber: ObjectNumber = "singular",
  adjective?: AdjectiveEntry,
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
    adjective,
  );
}

/**
 * Surface determiner token for an object NP (a/an/the/some/any), or null
 * when the NLG policy yields a bare noun (none / plural).
 * Same policy path as resolveObject → buildNounPhrase.
 */
export function resolveObjectDeterminerToken(
  noun: NounEntry,
  objectNumber: ObjectNumber = "singular",
  adjective?: AdjectiveEntry,
): string | null {
  const policy = resolveDeterminer({ noun, objectNumber });
  const adjBase =
    adjective && typeof adjective.base === "string"
      ? adjective.base.trim()
      : "";
  const articleHead = adjBase.length > 0 ? adjBase : noun.lemma;
  const startsWithVowel = /^[aeiou]/i.test(articleHead.trim());

  switch (policy) {
    case "none":
      return null;
    case "definite":
      return "the";
    case "indefinite":
      return startsWithVowel ? "an" : "a";
    case "plural":
      return null;
    case "some":
      return "some";
    case "any":
      return "any";
    default:
      return null;
  }
}
