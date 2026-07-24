import type { NounEntry, VerbEntry } from "../lexicon";

export function resolveDeterminer({
  verb,
  noun,
}: {
  verb: VerbEntry;
  noun: NounEntry;
}): string {
  if (
    verb.pedagogy?.preferredObjectNumber === "generic" &&
    noun.semantics?.type === "food"
  ) {
    return noun.grammar?.countable ? "plural" : "none";
  }

  return noun.grammar?.defaultDeterminer ?? "indefinite";
}
