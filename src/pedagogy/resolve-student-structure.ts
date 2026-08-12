// pedagogy/resolve-student-structure.ts
//
// Fase 2: runtime progress is structureLevelKey only.
// User.structureLevel is historical and must not govern any runtime path.

import {
  getByKey,
  getByLegacyLevel,
  type StructureLevelDefinition,
} from "./structure-levels";

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
 * Operational User/API paths must use structureLevelKey.
 * Legacy-number resolution remains for catalog/import tooling only (Fase 3).
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

    if (hasLevel) {
      const legacy = Number(input.structureLevel);
      const entryLegacy = byKey.legacyLevel ?? byKey.level;
      if (
        !Number.isFinite(legacy) ||
        entryLegacy === undefined ||
        entryLegacy !== legacy
      ) {
        throw new Error(
          `resolveStudentStructure: structureLevelKey "${rawKey}" does not match structureLevel ${input.structureLevel}`,
        );
      }
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
export function readStudentStructure(user: {
  structureLevel?: number | null;
  structureLevelKey?: string | null;
}): StudentStructureRead {
  const rawKey = normalizeKey(user.structureLevelKey);
  if (!rawKey) {
    throw new Error(
      "readStudentStructure: structureLevelKey required",
    );
  }

  const byKey = getByKey(rawKey);
  if (!byKey) {
    throw new Error(
      `readStudentStructure: unknown structureLevelKey "${rawKey}"`,
    );
  }

  const resolved = toResolved(byKey);
  const hasLevel =
    user.structureLevel !== undefined && user.structureLevel !== null;
  const level = hasLevel ? Number(user.structureLevel) : undefined;

  if (hasLevel && Number.isFinite(level)) {
    const entryLegacy = byKey.legacyLevel ?? byKey.level;
    if (entryLegacy !== level) {
      return {
        ...resolved,
        mismatch: true,
        ignoredStructureLevel: level,
      };
    }
  }

  return { ...resolved, mismatch: false };
}

/** Persist shape: structureLevelKey only. */
export type StructureLevelWriteFields = {
  structureLevelKey: string;
};

/**
 * Build User write fields. Requires structureLevelKey.
 * Does not accept structureLevel: number (Fase 2).
 * Does not include or update User.structureLevel.
 */
export function structureLevelWriteFields(input: {
  structureLevelKey?: string | null;
  /** @deprecated Rejected — use structureLevelKey. */
  structureLevel?: number | null;
}): StructureLevelWriteFields {
  if (
    input.structureLevel !== undefined &&
    input.structureLevel !== null &&
    !normalizeKey(input.structureLevelKey)
  ) {
    throw new Error(
      "structureLevelWriteFields: structureLevel number is no longer accepted; provide structureLevelKey",
    );
  }

  const rawKey = normalizeKey(input.structureLevelKey);
  if (!rawKey) {
    throw new Error(
      "structureLevelWriteFields: structureLevelKey required",
    );
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
  structureLevel?: number | null;
  structureLevelKey?: string | null;
}): number {
  return readStudentStructure(user).order;
}

/** Canonical progress payload for APIs (identity + curricular position). */
export function toStructureProgress(user: {
  structureLevel?: number | null;
  structureLevelKey?: string | null;
}): { structureLevelKey: string; structureOrder: number } {
  const read = readStudentStructure(user);
  return {
    structureLevelKey: read.key,
    structureOrder: read.order,
  };
}
