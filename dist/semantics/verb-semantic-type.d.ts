export declare const VERB_SEMANTIC_TYPES: readonly ["state", "movement", "consumption", "possession", "preference", "necessity", "communication", "cognition", "perception", "creation", "change", "existence"];
export type VerbSemanticType = (typeof VERB_SEMANTIC_TYPES)[number];
export declare const VERB_SEMANTIC_TYPE_LABELS: Record<VerbSemanticType, string>;
