import type { NounEntry } from "../lexicon";

import { pluralize } from "./pluralize";

export function buildNounPhrase(
  noun: NounEntry,
  determinerOverride?: string,
): string {
  const {
    lemma,

    grammar: { defaultDeterminer },
  } = noun;

  const determiner = determinerOverride ?? defaultDeterminer;

  const nounCore = lemma;

  const startsWithVowel = /^[aeiou]/i.test(lemma);

  switch (determiner) {
    case "none":
      return nounCore;

    case "definite":
      return `the ${nounCore}`;

    case "indefinite": {
      return `${startsWithVowel ? "an" : "a"} ${nounCore}`;
    }

    case "plural": {
      return pluralize(lemma);
    }

    case "some":
      return `some ${nounCore}`;

    case "any":
      return `any ${nounCore}`;

    default:
      return nounCore;
  }
}
