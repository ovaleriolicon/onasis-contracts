export declare const NOUN_SEMANTIC_TYPES: readonly ["person", "object", "place", "abstract", "food", "beverage", "concept", "event", "activity"];
export type NounSemanticType = (typeof NOUN_SEMANTIC_TYPES)[number];
export declare const NOUN_SEMANTIC_TYPE_LABELS: Record<NounSemanticType, string>;
