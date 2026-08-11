"use strict";
// pedagogy/structure-levels.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.structureLevels = exports.ADJECTIVE_NOUN_PHRASES_KEY = void 0;
exports.getStructureLevel = getStructureLevel;
exports.getByKey = getByKey;
exports.getByLegacyLevel = getByLegacyLevel;
exports.getByOrder = getByOrder;
exports.orderOf = orderOf;
exports.legacyLevelOf = legacyLevelOf;
exports.assertStructureLevelCatalogIntegrity = assertStructureLevelCatalogIntegrity;
exports.assertStructureLevelCatalogParity = assertStructureLevelCatalogParity;
/** Stable key for attributive adjective + noun (objectAdjective). */
exports.ADJECTIVE_NOUN_PHRASES_KEY = "adjective-noun-phrases";
function entry(legacyLevel, key, name, order, description) {
    return {
        key,
        order,
        legacyLevel,
        level: legacyLevel,
        name,
        ...(description ? { description } : {}),
    };
}
function entryKeyOnly(order, key, name, description) {
    return {
        key,
        order,
        name,
        ...(description ? { description } : {}),
    };
}
exports.structureLevels = [
    entry(0, "to-be-present-affirmative", "To Be Present Affirmative", 0),
    entry(1, "to-be-with-names", "To Be With Names", 1),
    entry(2, "to-be-present-negative", "To Be Present Negative", 2),
    entry(3, "present-actions-affirmative", "Present Actions Affirmative", 3),
    entry(4, "present-actions-negative", "Present Actions Negative", 4),
    entry(5, "present-questions-affirmative", "Present Questions Affirmative", 5),
    entryKeyOnly(6, exports.ADJECTIVE_NOUN_PHRASES_KEY, "Adjective + Noun", "Attributive adjective + noun phrases (a cute dog). Placeholder explanation."),
    entry(6, "to-be-past-affirmative", "To Be Past Affirmative", 7),
    entry(7, "to-be-past-negative", "To Be Past Negative", 8),
    entry(8, "past-affirmative", "Past Affirmative", 9),
    entry(9, "past-negative", "Past Negative", 10),
    entry(10, "past-questions", "Past Questions", 11),
    entry(11, "present-progressive", "Present Progressive", 12),
    entry(12, "past-progressive", "Past Progressive", 13),
    entry(13, "possessive-pronouns", "Possessive Pronouns", 14, "Placeholder: Structure Level reserved for possessive pronouns. Not implemented in the engine yet."),
];
function legacyOf(def) {
    return def.legacyLevel ?? def.level;
}
/** Existing API: lookup by legacy numeric level (S0–S13). */
function getStructureLevel(level) {
    return exports.structureLevels.find((item) => legacyOf(item) === level);
}
/** Lookup by stable key. */
function getByKey(key) {
    return exports.structureLevels.find((item) => item.key === key);
}
/** Alias of getStructureLevel — explicit legacy-level lookup. */
function getByLegacyLevel(level) {
    return getStructureLevel(level);
}
/** Lookup by curricular order. */
function getByOrder(order) {
    return exports.structureLevels.find((item) => item.order === order);
}
/** Curricular order for a key; undefined if unknown. */
function orderOf(key) {
    return getByKey(key)?.order;
}
/** Frozen legacy ordinal for a key; undefined if unknown / no legacy. */
function legacyLevelOf(key) {
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
function assertStructureLevelCatalogIntegrity() {
    const keys = new Set();
    const orders = new Set();
    const legacies = new Set();
    for (const def of exports.structureLevels) {
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
            throw new Error(`Duplicate structure level order ${def.order} (${def.key})`);
        }
        orders.add(def.order);
        const legacy = legacyOf(def);
        if (legacy !== undefined) {
            if (!Number.isFinite(legacy)) {
                throw new Error(`structureLevels (${def.key}): invalid legacyLevel`);
            }
            if (legacies.has(legacy)) {
                throw new Error(`Duplicate structure level legacyLevel ${legacy} (${def.key})`);
            }
            legacies.add(legacy);
            const byLegacy = getByLegacyLevel(legacy);
            if (!byLegacy || byLegacy.key !== def.key) {
                throw new Error(`legacyLevel ${legacy} does not resolve to key "${def.key}"`);
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
function assertStructureLevelCatalogParity() {
    assertStructureLevelCatalogIntegrity();
}
