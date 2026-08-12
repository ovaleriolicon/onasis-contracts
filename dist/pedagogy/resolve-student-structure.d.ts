export type ResolveStudentStructureInput = {
    /**
     * @deprecated Operational contracts use structureLevelKey only (Fase 2).
     * Kept for catalog/import tooling via resolveStudentStructure — not for User reads.
     */
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
 * Resolve a Structure Level from catalog key and/or historical legacy number.
 *
 * Operational User/API paths must use structureLevelKey.
 * Legacy-number resolution remains for catalog/import tooling only (Fase 3).
 */
export declare function resolveStudentStructure(input: ResolveStudentStructureInput): ResolvedStudentStructure;
export type StudentStructureRead = ResolvedStudentStructure & {
    /**
     * True when a stored historical structureLevel disagreed with the key.
     * Effective fields always follow the key; mismatch is informational only.
     */
    mismatch: boolean;
    /** Historical number ignored because a valid key took precedence. */
    ignoredStructureLevel?: number;
};
/**
 * Read Structure Level from a User-like document.
 *
 * Fase 2: requires a valid structureLevelKey. Never derives identity from
 * User.structureLevel. Historical structureLevel is ignored for gates.
 */
export declare function readStudentStructure(user: {
    structureLevel?: number | null;
    structureLevelKey?: string | null;
}): StudentStructureRead;
/** Persist shape: structureLevelKey only. */
export type StructureLevelWriteFields = {
    structureLevelKey: string;
};
/**
 * Build User write fields. Requires structureLevelKey.
 * Does not accept structureLevel: number (Fase 2).
 * Does not include or update User.structureLevel.
 */
export declare function structureLevelWriteFields(input: {
    structureLevelKey?: string | null;
    /** @deprecated Rejected — use structureLevelKey. */
    structureLevel?: number | null;
}): StructureLevelWriteFields;
/**
 * Curricular position for runtime gates.
 * Requires structureLevelKey.
 */
export declare function getEffectiveStructureOrder(user: {
    structureLevel?: number | null;
    structureLevelKey?: string | null;
}): number;
/** Canonical progress payload for APIs (identity + curricular position). */
export declare function toStructureProgress(user: {
    structureLevel?: number | null;
    structureLevelKey?: string | null;
}): {
    structureLevelKey: string;
    structureOrder: number;
};
