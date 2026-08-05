// grammar/object-number.ts
//
// Object-number policy used by Grammar realization and by NLG resolution.
//
// Precedence (resolved outside Grammar):
//   Function.objectNumber
//     ?? Verb.pedagogy.preferredObjectNumber  (lexical default)
//     ?? "singular"
//
// Grammar (resolveDeterminer) only receives the final ObjectNumber:
// - "generic"  → kind-reading: countable → bare plural; uncountable → bare
// - "singular" → noun.grammar.defaultDeterminer (typically a/an)
// - "plural"   → reserved; currently falls through to noun.defaultDeterminer

export const OBJECT_NUMBERS = ["generic", "singular", "plural"] as const;

export type ObjectNumber = (typeof OBJECT_NUMBERS)[number];

export type ObjectNumberSource = "function" | "verb" | "fallback";

export const OBJECT_NUMBER_LABELS: Record<ObjectNumber, string> = {
  generic: "Genérico",
  singular: "Singular",
  plural: "Plural",
};
