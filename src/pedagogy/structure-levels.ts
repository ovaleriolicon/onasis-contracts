// pedagogy/structure-levels.ts
//
// Structure Level identity = key; curricular position = order.

export type StructureLevelDefinition = {
  /** Stable identity. */
  key: string;

  /** Curricular position. */
  order: number;

  name: string;

  description?: string;
};

/** Stable key for attributive adjective + noun (objectAdjective). */
export const ADJECTIVE_NOUN_PHRASES_KEY = "adjective-noun-phrases";

/**
 * Reserved unlock for Double Verb V1 (verb1 + to + verb2).
 * Patterns are catalogued but gated until a later phase wires generation.
 */
export const DOUBLE_VERB_INFINITIVE_KEY = "double-verb-infinitive";

function entry(
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
  entry(0, "to-be-present-affirmative", "To Be Present Affirmative"),
  entry(1, "to-be-with-names", "To Be With Names"),
  entry(2, "to-be-present-negative", "To Be Present Negative"),
  entry(3, "present-actions-affirmative", "Present Actions Affirmative"),
  entry(4, "present-actions-negative", "Present Actions Negative"),
  entry(5, "present-questions-affirmative", "Present Questions Affirmative"),
  entry(
    6,
    ADJECTIVE_NOUN_PHRASES_KEY,
    "Adjective + Noun",
    "Attributive adjective + noun phrases (a cute dog). Placeholder explanation.",
  ),
  entry(7, "to-be-past-affirmative", "To Be Past Affirmative"),
  entry(8, "to-be-past-negative", "To Be Past Negative"),
  entry(9, "past-affirmative", "Past Affirmative"),
  entry(10, "past-negative", "Past Negative"),
  entry(11, "past-questions", "Past Questions"),
  entry(12, "present-progressive", "Present Progressive"),
  entry(13, "past-progressive", "Past Progressive"),
  entry(
    14,
    "possessive-pronouns",
    "Possessive Pronouns",
    "Placeholder: Structure Level reserved for possessive pronouns. Not implemented in the engine yet.",
  ),
  entry(
    15,
    DOUBLE_VERB_INFINITIVE_KEY,
    "Double Verb (to-infinitive)",
    "Reserved: verb1 + to + verb2. Patterns registered; generation gated until Phase 2+.",
  ),
];

/** Lookup by stable key. */
export function getByKey(key: string): StructureLevelDefinition | undefined {
  return structureLevels.find((item) => item.key === key);
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

/**
 * Catalog integrity:
 * - unique keys
 * - unique orders
 * - key → order resolution
 */
export function assertStructureLevelCatalogIntegrity(): void {
  const keys = new Set<string>();
  const orders = new Set<number>();

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

    if (orderOf(def.key) !== def.order) {
      throw new Error(`key "${def.key}" does not resolve to order ${def.order}`);
    }
  }
}

/**
 * @deprecated Use assertStructureLevelCatalogIntegrity.
 */
export function assertStructureLevelCatalogParity(): void {
  assertStructureLevelCatalogIntegrity();
}
