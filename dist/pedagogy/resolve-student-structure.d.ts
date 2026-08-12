export type ResolveStudentStructureInput = {
    structureLevelKey?: string | null;
};
export type ResolvedStudentStructure = {
    key: string;
    order: number;
};
/**
 * Resolve a Structure Level from catalog key.
 */
export declare function resolveStudentStructure(input: ResolveStudentStructureInput): ResolvedStudentStructure;
export type StudentStructureRead = ResolvedStudentStructure;
/**
 * Read Structure Level from a User-like document.
 * Requires structureLevelKey.
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
