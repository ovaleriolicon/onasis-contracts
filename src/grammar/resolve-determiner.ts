import type { NounEntry } from "../lexicon";

export function resolveDeterminer({
  verb,
  noun,
}: {
  verb: string;
  noun: NounEntry;
}): string {
  // LIKE + FOOD

  if (verb === "like" && noun.semantics?.type === "food") {
    if (noun.grammar?.countable) {
      return "plural";
    }

    return "none";
  }

  return noun.grammar?.defaultDeterminer ?? "indefinite";
}
