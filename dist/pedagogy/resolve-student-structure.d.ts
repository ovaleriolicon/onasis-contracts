export type ResolveStudentStructureInput = {
    structureLevel?: number;
    structureLevelKey?: string;
};
export type ResolvedStudentStructure = {
    key: string;
    order: number;
    /**
     * Frozen legacy ordinal (S0–S13) when the catalog entry has one.
     * Absent for key-only Structure Levels (e.g. adjective-noun-phrases).
     */
    legacyLevel?: number;
};
/**
 * Resolve student structure from legacy number and/or stable key.
 *
 * Strict mode (default):
 * - Key wins when both are provided (must match the same catalog entry).
 * - Legacy-only input derives key from the catalog.
 * - Mismatched key + number throws (does not auto-correct).
 */
export declare function resolveStudentStructure(input: ResolveStudentStructureInput): ResolvedStudentStructure;
export type StudentStructureRead = ResolvedStudentStructure & {
    /**
     * True when both fields were present and disagreed.
     * Effective fields always follow the legacy number (see precedence).
     */
    mismatch: boolean;
    /** Stored key that was ignored because it disagreed with structureLevel. */
    ignoredStructureLevelKey?: string;
};
/**
 * Read Structure Level from a User-like document (F2 / F4a).
 *
 * Precedence:
 * - Key only → resolve from key (order + legacyLevel from catalog).
 * - Number only → derive key from legacy level.
 * - Both present and aligned → ok.
 * - Both present and disagree → **legacy number wins** for effective
 *   key/order/legacyLevel; stored key reported in ignoredStructureLevelKey
 *   (not auto-written back).
 */
export declare function readStudentStructure(user: {
    structureLevel?: number | null;
    structureLevelKey?: string | null;
}): StudentStructureRead;
/**
 * Dual-write payload for User.structureLevel + User.structureLevelKey.
 * Uses the catalog via resolveStudentStructure — no manual maps.
 */
export declare function structureLevelWriteFields(input: ResolveStudentStructureInput): {
    structureLevel: number;
    structureLevelKey: string;
};
/**
 * Curricular position for runtime gates (F4a).
 * key → order; legacy number-only → derive key → order.
 */
export declare function getEffectiveStructureOrder(user: {
    structureLevel?: number | null;
    structureLevelKey?: string | null;
}): number;
