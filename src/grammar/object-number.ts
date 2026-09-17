// grammar/object-number.ts
//
// Two concepts, composed in Grammar:
//
// A) Reading (resolved outside Grammar by resolveObjectNumber):
//      Function.objectNumber
//        ?? Verb.pedagogy.preferredObjectNumber
//        ?? "singular"
//    "generic"  = kind-reading
//    "singular" = instance
//    "plural"   = reserved as a reading (not a noun lexical number)
//
// B) Noun lexical number (NounEntry.pedagogy.preferredObjectNumber):
//      unset | "singular" | "plural"
//    Nouns must not store "generic". That value is a reading, not a
//    typical-number flag.
//
// Grammar (resolveDeterminer) receives the reading and the noun:
// - reading "generic" → kind-reading: countable → bare plural; uncountable → bare
// - instance + noun lexical "plural" + countable → bare plural
// - reading "singular" + countable → never `none` (missing/`none` → indefinite;
//   explicit valid defaultDeterminer preserved); uncountable uses
//   defaultDeterminer (bare `none` stays bare)
// - reading "plural" (reserved) → noun.defaultDeterminer unless lexical plural applies

export const OBJECT_NUMBERS = ["generic", "singular", "plural"] as const;

export type ObjectNumber = (typeof OBJECT_NUMBERS)[number];

export type ObjectNumberSource = "function" | "verb" | "fallback";

export const NOUN_LEXICAL_OBJECT_NUMBERS = ["singular", "plural"] as const;

export type NounLexicalObjectNumber =
  (typeof NOUN_LEXICAL_OBJECT_NUMBERS)[number];

export const OBJECT_NUMBER_LABELS: Record<ObjectNumber, string> = {
  generic: "Genérico",
  singular: "Singular",
  plural: "Plural",
};

export function isObjectNumber(value: unknown): value is ObjectNumber {
  return (
    value === "generic" || value === "singular" || value === "plural"
  );
}

export function isNounLexicalObjectNumber(
  value: unknown,
): value is NounLexicalObjectNumber {
  return value === "singular" || value === "plural";
}
