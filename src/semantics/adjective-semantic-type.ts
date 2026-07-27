// semantics/adjective-semantic-type.ts
//
// Categorías semánticas de adjetivos. Formaliza con nombre propio lo que
// hoy ya existe como literal inline en AdjectiveEntry.semantics.type.

export const ADJECTIVE_SEMANTIC_TYPES = ["state", "quality"] as const;

export type AdjectiveSemanticType = (typeof ADJECTIVE_SEMANTIC_TYPES)[number];

export const ADJECTIVE_SEMANTIC_TYPE_LABELS: Record<
  AdjectiveSemanticType,
  string
> = {
  state: "Estado",
  quality: "Cualidad",
};
