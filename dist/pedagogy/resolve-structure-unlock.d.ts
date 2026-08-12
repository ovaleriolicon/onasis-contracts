/** Unlock threshold: catalog key only. */
export type StructureUnlockRef = string;
/**
 * Resolve an unlock ref to curricular order.
 * Accepts catalog keys only.
 */
export declare function resolveStructureUnlockOrder(ref: StructureUnlockRef | null | undefined): number;
/**
 * Cumulative unlock: studentOrder >= unlock order.
 */
export declare function isStructureUnlockedAt(unlockRef: StructureUnlockRef | null | undefined, studentOrder: number): boolean;
/**
 * Pattern-level unlock via unlockedAtStructureKey.
 */
export declare function resolvePatternUnlockOrder(pattern: {
    unlockedAtStructureKey?: string | null;
}): number;
export declare function isPatternUnlockedAt(pattern: {
    unlockedAtStructureKey?: string | null;
}, studentOrder: number): boolean;
/**
 * Map entry unlock with fallback to pattern root unlock.
 * Prefers string value in the map; missing → pattern root.
 */
export declare function resolveMappedUnlockOrder(mapValue: StructureUnlockRef | null | undefined, pattern: {
    unlockedAtStructureKey?: string | null;
}): number;
