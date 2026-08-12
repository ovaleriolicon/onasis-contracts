export type ResolveStudentStructureInput = {
    /**
     * Catalog/import tooling only (Fase 3b may remove).
     * Not a User field.
     */
    structureLevel?: number | null;
    structureLevelKey?: string | null;
};
export type ResolvedStudentStructure = {
    key: string;
    order: number;
    /**
     * Frozen catalog legacy ordinal (S0–S13) when the entry has one.
     * Absent for key-only Structure Levels (e.g. adjective-noun-phrases).
     */
    legacyLevel?: number;
};
/**
 * Resolve a Structure Level from catalog key and/or historical legacy number.
 *
 * User/API paths use structureLevelKey only.
 * Legacy-number resolution remains for catalog/import tooling (Fase 3b).
 */
export declare function resolveStudentStructure(input: ResolveStudentStructureInput): ResolvedStudentStructure;
export type StudentStructureRead = ResolvedStudentStructure;
/**
 * Read Structure Level from a User-like document.
 * Requires structureLevelKey. Ignores any other fields.
 */
export declare function readStudentStructure(user: {
    structureLevelKey?: string | null;
}): StudentStructureRead;
/** Persist shape: structureLevelKey only. */
export type StructureLevelWriteFields = {
    structureLevelKey: string;
};
/**
 * Build User write fields. Requires structureLevelKey.
 */
export declare function structureLevelWriteFields(input: {
    structureLevelKey?: string | null;
}): StructureLevelWriteFields;
/**
 * Curricular position for runtime gates.
 * Requires structureLevelKey.
 */
export declare function getEffectiveStructureOrder(user: {
    structureLevelKey?: string | null;
}): number;
/** Canonical progress payload for APIs (identity + curricular position). */
export declare function toStructureProgress(user: {
    structureLevelKey?: string | null;
}): {
    structureLevelKey: string;
    structureOrder: number;
};
