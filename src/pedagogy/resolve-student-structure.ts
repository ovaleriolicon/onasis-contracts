// pedagogy/resolve-student-structure.ts
//
// Dual resolution for Structure Level identity (key) vs position (order).
// F1: does not change runtime gates — callers may keep using legacyLevel.

import {
  getByKey,
  getByLegacyLevel,
  type StructureLevelDefinition,
} from "./structure-levels";

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

function toResolved(def: StructureLevelDefinition): ResolvedStudentStructure {
  const legacy = def.legacyLevel ?? def.level;
  return {
    key: def.key,
    order: def.order,
    ...(legacy !== undefined ? { legacyLevel: legacy } : {}),
  };
}

/**
 * Resolve student structure from legacy number and/or stable key.
 *
 * Strict mode (default):
 * - Key wins when both are provided (must match the same catalog entry).
 * - Legacy-only input derives key from the catalog.
 * - Mismatched key + number throws (does not auto-correct).
 */
export function resolveStudentStructure(
  input: ResolveStudentStructureInput,
): ResolvedStudentStructure {
  const rawKey =
    input.structureLevelKey != null
      ? String(input.structureLevelKey).trim()
      : "";
  const hasKey = rawKey !== "";
  const hasLevel =
    input.structureLevel !== undefined && input.structureLevel !== null;

  if (!hasKey && !hasLevel) {
    throw new Error(
      "resolveStudentStructure: provide structureLevel and/or structureLevelKey",
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
      if (!Number.isFinite(legacy) || entryLegacy !== legacy) {
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
export function readStudentStructure(user: {
  structureLevel?: number | null;
  structureLevelKey?: string | null;
}): StudentStructureRead {
  const hasLevel =
    user.structureLevel !== undefined && user.structureLevel !== null;
  const level = hasLevel ? Number(user.structureLevel) : undefined;
  const rawKey =
    user.structureLevelKey != null
      ? String(user.structureLevelKey).trim()
      : "";

  if (!rawKey) {
    return {
      ...resolveStudentStructure({ structureLevel: level ?? 0 }),
      mismatch: false,
    };
  }

  if (!hasLevel) {
    return {
      ...resolveStudentStructure({ structureLevelKey: rawKey }),
      mismatch: false,
    };
  }

  try {
    return {
      ...resolveStudentStructure({
        structureLevel: level,
        structureLevelKey: rawKey,
      }),
      mismatch: false,
    };
  } catch {
    return {
      ...resolveStudentStructure({ structureLevel: level }),
      mismatch: true,
      ignoredStructureLevelKey: rawKey,
    };
  }
}

/**
 * Dual-write payload for User.structureLevel + User.structureLevelKey.
 * Uses the catalog via resolveStudentStructure — no manual maps.
 */
export function structureLevelWriteFields(
  input: ResolveStudentStructureInput,
): { structureLevel: number; structureLevelKey: string } {
  const resolved = resolveStudentStructure(input);
  if (resolved.legacyLevel === undefined) {
    throw new Error(
      `structureLevelWriteFields: "${resolved.key}" has no legacyLevel — cannot dual-write User.structureLevel`,
    );
  }
  return {
    structureLevel: resolved.legacyLevel,
    structureLevelKey: resolved.key,
  };
}

/**
 * Curricular position for runtime gates (F4a).
 * key → order; legacy number-only → derive key → order.
 */
export function getEffectiveStructureOrder(user: {
  structureLevel?: number | null;
  structureLevelKey?: string | null;
}): number {
  return readStudentStructure(user).order;
}
