export type StructureLevelDefinition = {
    /** Stable identity. */
    key: string;
    /** Curricular position. */
    order: number;
    name: string;
    description?: string;
};
/** Stable key for attributive adjective + noun (objectAdjective). */
export declare const ADJECTIVE_NOUN_PHRASES_KEY = "adjective-noun-phrases";
/**
 * Reserved unlock for Double Verb V1 (verb1 + to + verb2).
 * Patterns are catalogued but gated until a later phase wires generation.
 */
export declare const DOUBLE_VERB_INFINITIVE_KEY = "double-verb-infinitive";
export declare const structureLevels: StructureLevelDefinition[];
/** Lookup by stable key. */
export declare function getByKey(key: string): StructureLevelDefinition | undefined;
/** Lookup by curricular order. */
export declare function getByOrder(order: number): StructureLevelDefinition | undefined;
/** Curricular order for a key; undefined if unknown. */
export declare function orderOf(key: string): number | undefined;
/**
 * Catalog integrity:
 * - unique keys
 * - unique orders
 * - key → order resolution
 */
export declare function assertStructureLevelCatalogIntegrity(): void;
/**
 * @deprecated Use assertStructureLevelCatalogIntegrity.
 */
export declare function assertStructureLevelCatalogParity(): void;
