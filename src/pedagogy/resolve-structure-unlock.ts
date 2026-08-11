// pedagogy/resolve-structure-unlock.ts
//
// Resolve Pattern unlock refs (stable key or legacy number) → curricular order.
// F3: Patterns prefer keys; numeric refs remain valid for legacy definitions.

import { getByKey, getByLegacyLevel, orderOf } from "./structure-levels";

/** Unlock threshold: catalog key or frozen legacy ordinal. */
export type StructureUnlockRef = string | number;

/**
 * Resolve an unlock ref to curricular order.
 *
 * - string → orderOf(key)
 * - number → legacyLevel → catalog.order (unknown numbers pass through as-is)
 */
export function resolveStructureUnlockOrder(
  ref: StructureUnlockRef | null | undefined,
): number {
  if (ref === null || ref === undefined) {
    return 0;
  }

  if (typeof ref === "number") {
    if (!Number.isFinite(ref)) {
      throw new Error(`resolveStructureUnlockOrder: invalid number ${ref}`);
    }
    const byLegacy = getByLegacyLevel(ref);
    if (byLegacy) {
      return byLegacy.order;
    }
    // Accept unknown legacy numbers as-is (pre-F3 / out-of-catalog).
    return ref;
  }

  const key = String(ref).trim();
  if (!key) {
    return 0;
  }

  const order = orderOf(key);
  if (order === undefined) {
    throw new Error(
      `resolveStructureUnlockOrder: unknown structure level key "${key}"`,
    );
  }
  return order;
}

/**
 * Cumulative unlock: studentOrder >= unlock order (same as legacy `unlock <= level`).
 */
export function isStructureUnlockedAt(
  unlockRef: StructureUnlockRef | null | undefined,
  studentOrder: number,
): boolean {
  return resolveStructureUnlockOrder(unlockRef) <= studentOrder;
}

/**
 * Pattern-level unlock: prefer unlockedAtStructureKey, else unlockedAtStructureLevel.
 */
export function resolvePatternUnlockOrder(pattern: {
  unlockedAtStructureKey?: string | null;
  unlockedAtStructureLevel?: number | null;
}): number {
  const key =
    pattern.unlockedAtStructureKey != null
      ? String(pattern.unlockedAtStructureKey).trim()
      : "";

  if (key) {
    return resolveStructureUnlockOrder(key);
  }

  if (
    pattern.unlockedAtStructureLevel !== undefined &&
    pattern.unlockedAtStructureLevel !== null
  ) {
    return resolveStructureUnlockOrder(pattern.unlockedAtStructureLevel);
  }

  return 0;
}

export function isPatternUnlockedAt(
  pattern: {
    unlockedAtStructureKey?: string | null;
    unlockedAtStructureLevel?: number | null;
  },
  studentOrder: number,
): boolean {
  return resolvePatternUnlockOrder(pattern) <= studentOrder;
}

/**
 * Map entry unlock with fallback to pattern root unlock.
 * Prefers string/number value in the map; missing → pattern root.
 */
export function resolveMappedUnlockOrder(
  mapValue: StructureUnlockRef | null | undefined,
  pattern: {
    unlockedAtStructureKey?: string | null;
    unlockedAtStructureLevel?: number | null;
  },
): number {
  if (mapValue !== undefined && mapValue !== null && mapValue !== "") {
    return resolveStructureUnlockOrder(mapValue);
  }
  return resolvePatternUnlockOrder(pattern);
}

/** Catalog key for a legacy level, if defined. */
export function structureKeyForLegacyLevel(
  level: number,
): string | undefined {
  return getByLegacyLevel(level)?.key;
}

/** Legacy level for a key, if defined. */
export function legacyLevelForStructureKey(
  key: string,
): number | undefined {
  return getByKey(key)?.legacyLevel ?? getByKey(key)?.level;
}
