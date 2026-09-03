// grammar/complement-type.ts
//
// Tipos de complemento que puede exigir un verbo (objeto directo, lugar,
// adjetivo predicativo). Antes vivía como literal inline duplicado en
// VerbEntry.complements (lexicon.ts) y Pattern.structure.complements
// (patterns.ts). Esta es ahora la única fuente de verdad.

export const COMPLEMENT_TYPES = [
  "object",
  "place",
  "adjective",
  "infinitive",
] as const;

export type ComplementType = (typeof COMPLEMENT_TYPES)[number];

export const COMPLEMENT_TYPE_LABELS: Record<ComplementType, string> = {
  object: "Objeto",
  place: "Lugar",
  adjective: "Adjetivo",
  infinitive: "Infinitivo",
};
