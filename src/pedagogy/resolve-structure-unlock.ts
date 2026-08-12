// pedagogy/resolve-structure-unlock.ts
//
// Resolve Pattern unlock refs (stable key) → curricular order.

import { orderOf } from "./structure-levels";

/** Unlock threshold: catalog key only. */
export type StructureUnlockRef = string;

/**
 * Resolve an unlock ref to curricular order.
 * Accepts catalog keys only.
 */
export function resolveStructureUnlockOrder(
  ref: StructureUnlockRef | null | undefined,
): number {
  if (ref === null || ref === undefined) {
    return 0;
  }

  if (typeof ref !== "string") {
    throw new Error(
      `resolveStructureUnlockOrder: numeric unlock refs are no longer accepted (got ${typeof ref})`,
    );
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
 * Cumulative unlock: studentOrder >= unlock order.
 */
export function isStructureUnlockedAt(
  unlockRef: StructureUnlockRef | null | undefined,
  studentOrder: number,
): boolean {
  return resolveStructureUnlockOrder(unlockRef) <= studentOrder;
}

/**
 * Pattern-level unlock via unlockedAtStructureKey.
 */
export function resolvePatternUnlockOrder(pattern: {
  unlockedAtStructureKey?: string | null;
}): number {
  const key =
    pattern.unlockedAtStructureKey != null
      ? String(pattern.unlockedAtStructureKey).trim()
      : "";

  if (key) {
    return resolveStructureUnlockOrder(key);
  }

  return 0;
}

export function isPatternUnlockedAt(
  pattern: {
    unlockedAtStructureKey?: string | null;
  },
  studentOrder: number,
): boolean {
  return resolvePatternUnlockOrder(pattern) <= studentOrder;
}

/**
 * Map entry unlock with fallback to pattern root unlock.
 * Prefers string value in the map; missing → pattern root.
 */
export function resolveMappedUnlockOrder(
  mapValue: StructureUnlockRef | null | undefined,
  pattern: {
    unlockedAtStructureKey?: string | null;
  },
): number {
  if (mapValue !== undefined && mapValue !== null && mapValue !== "") {
    return resolveStructureUnlockOrder(mapValue);
  }
  return resolvePatternUnlockOrder(pattern);
}
