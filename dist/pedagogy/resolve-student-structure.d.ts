export type ResolveStudentStructureInput = {
    structureLevel?: number | null;
    structureLevelKey?: string | null;
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
 * Resolve student structure from stable key and/or legacy number.
 *
 * - Key preferred; must exist in catalog.
 * - Legacy-only derives key from catalog.
 * - Key + incompatible number → throws (writes must not silent-correct).
 * - Key without legacy may not be paired with a structureLevel number.
 */
export declare function resolveStudentStructure(input: ResolveStudentStructureInput): ResolvedStudentStructure;
export type StudentStructureRead = ResolvedStudentStructure & {
    /**
     * True when stored fields disagreed.
     * Effective fields follow a **valid key** when present.
     */
    mismatch: boolean;
    /** Legacy number ignored because a valid key took precedence. */
    ignoredStructureLevel?: number;
    /** Stored key ignored because it was unknown (legacy fallback). */
    ignoredStructureLevelKey?: string;
};
/**
 * Read Structure Level from a User-like document.
 *
 * Precedence:
 * - Valid key → canonical (order + optional legacy from catalog).
 * - Legacy number only → derive key (legacy users without key).
 * - Valid key + incompatible number → **key wins**; mismatch flagged.
 * - Unknown key + legacy → legacy fallback; mismatch flagged.
 */
export declare function readStudentStructure(user: {
    structureLevel?: number | null;
    structureLevelKey?: string | null;
}): StudentStructureRead;
/** Persist shape for User.structureLevelKey (+ optional legacy structureLevel). */
export type StructureLevelWriteFields = {
    structureLevelKey: string;
    /** Legacy ordinal, or null to unset (key-only Structure Levels). */
    structureLevel: number | null;
};
/**
 * Build User write fields from key and/or legacy number.
 * Prefer structureLevelKey. Uses contracts catalog only.
 */
export declare function structureLevelWriteFields(input: ResolveStudentStructureInput): StructureLevelWriteFields;
/**
 * Curricular position for runtime gates.
 * Valid key → order; legacy-only → derive key → order.
 */
export declare function getEffectiveStructureOrder(user: {
    structureLevel?: number | null;
    structureLevelKey?: string | null;
}): number;
