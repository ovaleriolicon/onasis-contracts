import type { NounEntry } from "../lexicon";

function resolveDeterminer({
  verb,
  noun,
}: {
  verb: string;
  noun: NounEntry;
}): string {
  // ---- LIKE + FOOD ----
  // I like pizza
  // She likes coffee
  // They like burgers

  if (verb === "like" && noun.semantics?.type === "food") {
    if (noun.grammar?.countable) {
      return "plural";
    }

    return "none";
  }

  // ---- DEFAULT ----

  return noun.grammar?.defaultDeterminer ?? "indefinite";
}
