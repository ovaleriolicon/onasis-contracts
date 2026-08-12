// pedagogy/resolve-student-structure.ts
//
// User / API progress: structureLevelKey → orderOf(key) → structureOrder.

import {
  getByKey,
  type StructureLevelDefinition,
} from "./structure-levels";

export type ResolveStudentStructureInput = {
  structureLevelKey?: string | null;
};

export type ResolvedStudentStructure = {
  key: string;
  order: number;
};

function toResolved(def: StructureLevelDefinition): ResolvedStudentStructure {
  return {
    key: def.key,
    order: def.order,
  };
}

function normalizeKey(raw: string | null | undefined): string {
  return raw != null ? String(raw).trim() : "";
}

/**
 * Resolve a Structure Level from catalog key.
 */
export function resolveStudentStructure(
  input: ResolveStudentStructureInput,
): ResolvedStudentStructure {
  const rawKey = normalizeKey(input.structureLevelKey);
  if (!rawKey) {
    throw new Error("resolveStudentStructure: structureLevelKey required");
  }

  const byKey = getByKey(rawKey);
  if (!byKey) {
    throw new Error(
      `resolveStudentStructure: unknown structureLevelKey "${rawKey}"`,
    );
  }
  return toResolved(byKey);
}

export type StudentStructureRead = ResolvedStudentStructure;

/**
 * Read Structure Level from a User-like document.
 * Requires structureLevelKey.
 */
export function readStudentStructure(user: {
  structureLevelKey?: string | null;
}): StudentStructureRead {
  return resolveStudentStructure({
    structureLevelKey: user.structureLevelKey,
  });
}

/** Persist shape: structureLevelKey only. */
export type StructureLevelWriteFields = {
  structureLevelKey: string;
};

/**
 * Build User write fields. Requires structureLevelKey.
 */
export function structureLevelWriteFields(input: {
  structureLevelKey?: string | null;
}): StructureLevelWriteFields {
  const resolved = resolveStudentStructure(input);
  return {
    structureLevelKey: resolved.key,
  };
}

/**
 * Curricular position for runtime gates.
 * Requires structureLevelKey.
 */
export function getEffectiveStructureOrder(user: {
  structureLevelKey?: string | null;
}): number {
  return readStudentStructure(user).order;
}

/** Canonical progress payload for APIs (identity + curricular position). */
export function toStructureProgress(user: {
  structureLevelKey?: string | null;
}): { structureLevelKey: string; structureOrder: number } {
  const read = readStudentStructure(user);
  return {
    structureLevelKey: read.key,
    structureOrder: read.order,
  };
}
