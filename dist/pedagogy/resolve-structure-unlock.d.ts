/** Unlock threshold: catalog key or frozen legacy ordinal. */
export type StructureUnlockRef = string | number;
/**
 * Resolve an unlock ref to curricular order.
 *
 * - string → orderOf(key)
 * - number → legacyLevel → catalog.order (unknown numbers pass through as-is)
 */
export declare function resolveStructureUnlockOrder(ref: StructureUnlockRef | null | undefined): number;
/**
 * Cumulative unlock: studentOrder >= unlock order (same as legacy `unlock <= level`).
 */
export declare function isStructureUnlockedAt(unlockRef: StructureUnlockRef | null | undefined, studentOrder: number): boolean;
/**
 * Pattern-level unlock: prefer unlockedAtStructureKey, else unlockedAtStructureLevel.
 */
export declare function resolvePatternUnlockOrder(pattern: {
    unlockedAtStructureKey?: string | null;
    unlockedAtStructureLevel?: number | null;
}): number;
export declare function isPatternUnlockedAt(pattern: {
    unlockedAtStructureKey?: string | null;
    unlockedAtStructureLevel?: number | null;
}, studentOrder: number): boolean;
/**
 * Map entry unlock with fallback to pattern root unlock.
 * Prefers string/number value in the map; missing → pattern root.
 */
export declare function resolveMappedUnlockOrder(mapValue: StructureUnlockRef | null | undefined, pattern: {
    unlockedAtStructureKey?: string | null;
    unlockedAtStructureLevel?: number | null;
}): number;
/** Catalog key for a legacy level, if defined. */
export declare function structureKeyForLegacyLevel(level: number): string | undefined;
/** Legacy level for a key, if defined. */
export declare function legacyLevelForStructureKey(key: string): number | undefined;
