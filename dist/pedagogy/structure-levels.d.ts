export type StructureLevelDefinition = {
    /** Stable identity. */
    key: string;
    /** Curricular position (modifiable; may diverge from legacyLevel). */
    order: number;
    /**
     * Frozen historical S0–S13 ordinal.
     * Absent for levels inserted after order/legacy decoupling.
     */
    legacyLevel?: number;
    /**
     * @deprecated Alias of `legacyLevel` for S0–S13 UI/API compat
     * (SessionSetup, AdminEnroll). Prefer `legacyLevel` / getByLegacyLevel.
     */
    level?: number;
    name: string;
    description?: string;
};
/** Stable key for attributive adjective + noun (objectAdjective). */
export declare const ADJECTIVE_NOUN_PHRASES_KEY = "adjective-noun-phrases";
export declare const structureLevels: StructureLevelDefinition[];
/** Existing API: lookup by legacy numeric level (S0–S13). */
export declare function getStructureLevel(level: number): StructureLevelDefinition | undefined;
/** Lookup by stable key. */
export declare function getByKey(key: string): StructureLevelDefinition | undefined;
/** Alias of getStructureLevel — explicit legacy-level lookup. */
export declare function getByLegacyLevel(level: number): StructureLevelDefinition | undefined;
/** Lookup by curricular order. */
export declare function getByOrder(order: number): StructureLevelDefinition | undefined;
/** Curricular order for a key; undefined if unknown. */
export declare function orderOf(key: string): number | undefined;
/** Frozen legacy ordinal for a key; undefined if unknown / no legacy. */
export declare function legacyLevelOf(key: string): number | undefined;
/**
 * Catalog integrity (F4b):
 * - unique keys
 * - unique orders
 * - unique legacyLevels when present
 * - legacyLevel → key resolution
 * - key → order resolution
 *
 * Does NOT require order === legacyLevel.
 */
export declare function assertStructureLevelCatalogIntegrity(): void;
/**
 * @deprecated Use assertStructureLevelCatalogIntegrity.
 * Kept name for older tests; no longer requires order === legacyLevel.
 */
export declare function assertStructureLevelCatalogParity(): void;
