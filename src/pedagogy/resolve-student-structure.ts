// pedagogy/resolve-student-structure.ts
//
// Fase 3a: User progress is structureLevelKey only.
// Catalog legacyLevel / import tooling may still resolve by historical number
// via resolveStudentStructure — never via User.structureLevel.

import {
  getByKey,
  getByLegacyLevel,
  type StructureLevelDefinition,
} from "./structure-levels";

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

function toResolved(def: StructureLevelDefinition): ResolvedStudentStructure {
  const legacy = def.legacyLevel ?? def.level;
  return {
    key: def.key,
    order: def.order,
    ...(legacy !== undefined ? { legacyLevel: legacy } : {}),
  };
}

function normalizeKey(raw: string | null | undefined): string {
  return raw != null ? String(raw).trim() : "";
}

/**
 * Resolve a Structure Level from catalog key and/or historical legacy number.
 *
 * User/API paths use structureLevelKey only.
 * Legacy-number resolution remains for catalog/import tooling (Fase 3b).
 */
export function resolveStudentStructure(
  input: ResolveStudentStructureInput,
): ResolvedStudentStructure {
  const rawKey = normalizeKey(input.structureLevelKey);
  const hasKey = rawKey !== "";
  const hasLevel =
    input.structureLevel !== undefined && input.structureLevel !== null;

  if (!hasKey && !hasLevel) {
    throw new Error(
      "resolveStudentStructure: provide structureLevelKey (or structureLevel for import tooling)",
    );
  }

  if (hasKey) {
    const byKey = getByKey(rawKey);
    if (!byKey) {
      throw new Error(
        `resolveStudentStructure: unknown structureLevelKey "${rawKey}"`,
      );
    }
    return toResolved(byKey);
  }

  const legacy = Number(input.structureLevel);
  if (!Number.isFinite(legacy)) {
    throw new Error(
      `resolveStudentStructure: invalid structureLevel ${input.structureLevel}`,
    );
  }

  const byLevel = getByLegacyLevel(legacy);
  if (!byLevel) {
    throw new Error(
      `resolveStudentStructure: unknown structureLevel ${legacy}`,
    );
  }

  return toResolved(byLevel);
}

export type StudentStructureRead = ResolvedStudentStructure;

/**
 * Read Structure Level from a User-like document.
 * Requires structureLevelKey. Ignores any other fields.
 */
export function readStudentStructure(user: {
  structureLevelKey?: string | null;
}): StudentStructureRead {
  const rawKey = normalizeKey(user.structureLevelKey);
  if (!rawKey) {
    throw new Error("readStudentStructure: structureLevelKey required");
  }

  const byKey = getByKey(rawKey);
  if (!byKey) {
    throw new Error(
      `readStudentStructure: unknown structureLevelKey "${rawKey}"`,
    );
  }

  return toResolved(byKey);
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
  const rawKey = normalizeKey(input.structureLevelKey);
  if (!rawKey) {
    throw new Error("structureLevelWriteFields: structureLevelKey required");
  }

  const resolved = resolveStudentStructure({ structureLevelKey: rawKey });
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
