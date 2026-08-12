// pedagogy/resolve-student-structure.ts
//
// Structure progress: structureLevelKey is canonical; structureLevel is optional legacy.

import {
  getByKey,
  getByLegacyLevel,
  type StructureLevelDefinition,
} from "./structure-levels";

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
 * Resolve student structure from stable key and/or legacy number.
 *
 * - Key preferred; must exist in catalog.
 * - Legacy-only derives key from catalog.
 * - Key + incompatible number → throws (writes must not silent-correct).
 * - Key without legacy may not be paired with a structureLevel number.
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
export function readStudentStructure(user: {
  structureLevel?: number | null;
  structureLevelKey?: string | null;
}): StudentStructureRead {
  const hasLevel =
    user.structureLevel !== undefined && user.structureLevel !== null;
  const level = hasLevel ? Number(user.structureLevel) : undefined;
  const rawKey = normalizeKey(user.structureLevelKey);

  if (rawKey) {
    const byKey = getByKey(rawKey);
    if (!byKey) {
      if (hasLevel && Number.isFinite(level)) {
        return {
          ...resolveStudentStructure({ structureLevel: level }),
          mismatch: true,
          ignoredStructureLevelKey: rawKey,
        };
      }
      throw new Error(
        `readStudentStructure: unknown structureLevelKey "${rawKey}"`,
      );
    }

    const resolved = toResolved(byKey);
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

  return {
    ...resolveStudentStructure({ structureLevel: level ?? 0 }),
    mismatch: false,
  };
}

/** Persist shape: Fase 1 writes only the canonical key (never mirrors legacy). */
export type StructureLevelWriteFields = {
  structureLevelKey: string;
};

/**
 * Build User write fields from key and/or legacy number input.
 * Prefer structureLevelKey. Resolves legacy-only input → key via catalog.
 * Does **not** include structureLevel — historical field is left untouched.
 */
export function structureLevelWriteFields(
  input: ResolveStudentStructureInput,
): StructureLevelWriteFields {
  // Prefer key alone when present so key-only SLs do not require a legacy pair.
  const rawKey = normalizeKey(input.structureLevelKey);
  const resolved = resolveStudentStructure(
    rawKey
      ? { structureLevelKey: rawKey }
      : { structureLevel: input.structureLevel },
  );
  return {
    structureLevelKey: resolved.key,
  };
}

/**
 * Curricular position for runtime gates.
 * Valid key → order; legacy-only (pre-Fase-2) → derive key → order.
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
