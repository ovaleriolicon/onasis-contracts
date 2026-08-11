// pedagogy/structure-levels.ts

export type StructureLevelDefinition = {
  /** Stable identity. */
  key: string;

  /** Curricular position (modifiable; may diverge from legacyLevel). */
  order: number;

  /**
   * Frozen historical S0–S13 ordinal.
   * Absent for levels inserted after order/legacy decoupling.
   */
  legacyLevel?: number;

  /**
   * @deprecated Alias of `legacyLevel` for S0–S13 UI/API compat
   * (SessionSetup, AdminEnroll). Prefer `legacyLevel` / getByLegacyLevel.
   */
  level?: number;

  name: string;

  description?: string;
};

/** Stable key for attributive adjective + noun (objectAdjective). */
export const ADJECTIVE_NOUN_PHRASES_KEY = "adjective-noun-phrases";

function entry(
  legacyLevel: number,
  key: string,
  name: string,
  order: number,
  description?: string,
): StructureLevelDefinition {
  return {
    key,
    order,
    legacyLevel,
    level: legacyLevel,
    name,
    ...(description ? { description } : {}),
  };
}

function entryKeyOnly(
  order: number,
  key: string,
  name: string,
  description?: string,
): StructureLevelDefinition {
  return {
    key,
    order,
    name,
    ...(description ? { description } : {}),
  };
}

export const structureLevels: StructureLevelDefinition[] = [
  entry(0, "to-be-present-affirmative", "To Be Present Affirmative", 0),
  entry(1, "to-be-with-names", "To Be With Names", 1),
  entry(2, "to-be-present-negative", "To Be Present Negative", 2),
  entry(3, "present-actions-affirmative", "Present Actions Affirmative", 3),
  entry(4, "present-actions-negative", "Present Actions Negative", 4),
  entry(5, "present-questions-affirmative", "Present Questions Affirmative", 5),
  entryKeyOnly(
    6,
    ADJECTIVE_NOUN_PHRASES_KEY,
    "Adjective + Noun",
    "Attributive adjective + noun phrases (a cute dog). Placeholder explanation.",
  ),
  entry(6, "to-be-past-affirmative", "To Be Past Affirmative", 7),
  entry(7, "to-be-past-negative", "To Be Past Negative", 8),
  entry(8, "past-affirmative", "Past Affirmative", 9),
  entry(9, "past-negative", "Past Negative", 10),
  entry(10, "past-questions", "Past Questions", 11),
  entry(11, "present-progressive", "Present Progressive", 12),
  entry(12, "past-progressive", "Past Progressive", 13),
  entry(
    13,
    "possessive-pronouns",
    "Possessive Pronouns",
    14,
    "Placeholder: Structure Level reserved for possessive pronouns. Not implemented in the engine yet.",
  ),
];

function legacyOf(def: StructureLevelDefinition): number | undefined {
  return def.legacyLevel ?? def.level;
}

/** Existing API: lookup by legacy numeric level (S0–S13). */
export function getStructureLevel(
  level: number,
): StructureLevelDefinition | undefined {
  return structureLevels.find((item) => legacyOf(item) === level);
}

/** Lookup by stable key. */
export function getByKey(key: string): StructureLevelDefinition | undefined {
  return structureLevels.find((item) => item.key === key);
}

/** Alias of getStructureLevel — explicit legacy-level lookup. */
export function getByLegacyLevel(
  level: number,
): StructureLevelDefinition | undefined {
  return getStructureLevel(level);
}

/** Lookup by curricular order. */
export function getByOrder(
  order: number,
): StructureLevelDefinition | undefined {
  return structureLevels.find((item) => item.order === order);
}

/** Curricular order for a key; undefined if unknown. */
export function orderOf(key: string): number | undefined {
  return getByKey(key)?.order;
}

/** Frozen legacy ordinal for a key; undefined if unknown / no legacy. */
export function legacyLevelOf(key: string): number | undefined {
  const def = getByKey(key);
  return def ? legacyOf(def) : undefined;
}

/**
 * Catalog integrity (F4b):
 * - unique keys
 * - unique orders
 * - unique legacyLevels when present
 * - legacyLevel → key resolution
 * - key → order resolution
 *
 * Does NOT require order === legacyLevel.
 */
export function assertStructureLevelCatalogIntegrity(): void {
  const keys = new Set<string>();
  const orders = new Set<number>();
  const legacies = new Set<number>();

  for (const def of structureLevels) {
    if (!def.key || typeof def.key !== "string") {
      throw new Error("structureLevels entry missing key");
    }
    if (keys.has(def.key)) {
      throw new Error(`Duplicate structure level key: ${def.key}`);
    }
    keys.add(def.key);

    if (!Number.isFinite(def.order)) {
      throw new Error(`structureLevels (${def.key}): invalid order`);
    }
    if (orders.has(def.order)) {
      throw new Error(
        `Duplicate structure level order ${def.order} (${def.key})`,
      );
    }
    orders.add(def.order);

    const legacy = legacyOf(def);
    if (legacy !== undefined) {
      if (!Number.isFinite(legacy)) {
        throw new Error(`structureLevels (${def.key}): invalid legacyLevel`);
      }
      if (legacies.has(legacy)) {
        throw new Error(
          `Duplicate structure level legacyLevel ${legacy} (${def.key})`,
        );
      }
      legacies.add(legacy);

      const byLegacy = getByLegacyLevel(legacy);
      if (!byLegacy || byLegacy.key !== def.key) {
        throw new Error(
          `legacyLevel ${legacy} does not resolve to key "${def.key}"`,
        );
      }
    }

    if (orderOf(def.key) !== def.order) {
      throw new Error(`key "${def.key}" does not resolve to order ${def.order}`);
    }
  }
}

/**
 * @deprecated Use assertStructureLevelCatalogIntegrity.
 * Kept name for older tests; no longer requires order === legacyLevel.
 */
export function assertStructureLevelCatalogParity(): void {
  assertStructureLevelCatalogIntegrity();
}
