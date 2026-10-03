import type { AdjectiveEntry, NounEntry } from "../lexicon";

import { pluralize } from "./pluralize";

function startsWithVowelSound(word: string): boolean {
  return /^[aeiou]/i.test(word.trim());
}

/**
 * Plural NP surface. An attested plural wins. A plural-only lemma is already
 * that surface. Otherwise the lemma is a singular citation and pluralize runs.
 */
function pluralSurface(noun: NounEntry): string {
  const attested = noun.grammar?.attestedPlural;
  if (typeof attested === "string" && attested.trim()) return attested.trim();
  if (noun.grammar?.pluralOnly === true) return noun.lemma;
  return pluralize(noun.lemma);
}

/**
 * Build a noun phrase surface: determiner + optional attributive adjective + noun.
 * When `adjective` is omitted, behavior is identical to the determiner-only path.
 * `a`/`an` uses the first pronounced word (adjective if present, else noun lemma).
 */
export function buildNounPhrase(
  noun: NounEntry,
  determinerOverride?: string,
  adjective?: AdjectiveEntry,
): string {
  const {
    lemma,

    grammar: { defaultDeterminer },
  } = noun;

  const determiner = determinerOverride ?? defaultDeterminer;

  const adjBase =
    adjective && typeof adjective.base === "string"
      ? adjective.base.trim()
      : "";
  const hasAdjective = adjBase.length > 0;

  const nounCore = hasAdjective ? `${adjBase} ${lemma}` : lemma;

  const articleHead = hasAdjective ? adjBase : lemma;
  const startsWithVowel = startsWithVowelSound(articleHead);

  switch (determiner) {
    case "none":
      return nounCore;

    case "definite":
      return `the ${nounCore}`;

    case "indefinite": {
      return `${startsWithVowel ? "an" : "a"} ${nounCore}`;
    }

    case "plural": {
      const pluralNoun = pluralSurface(noun);
      return hasAdjective ? `${adjBase} ${pluralNoun}` : pluralNoun;
    }

    case "some":
      return `some ${nounCore}`;

    case "any":
      return `any ${nounCore}`;

    default:
      return nounCore;
  }
}
