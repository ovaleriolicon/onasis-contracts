export declare const NOUN_SEMANTIC_TYPES: readonly ["person", "object", "place", "animal", "abstract", "food", "beverage", "concept", "event", "activity"];
export type NounSemanticType = (typeof NOUN_SEMANTIC_TYPES)[number];
/** Subject semantic types reuse the shared noun taxonomy (no parallel list). */
export type SubjectSemanticType = NounSemanticType;
export declare const NOUN_SEMANTIC_TYPE_LABELS: Record<NounSemanticType, string>;
