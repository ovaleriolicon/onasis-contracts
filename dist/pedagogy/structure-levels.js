"use strict";
// pedagogy/structure-levels.ts
//
// Structure Level identity = key; curricular position = order.
Object.defineProperty(exports, "__esModule", { value: true });
exports.structureLevels = exports.ADJECTIVE_NOUN_PHRASES_KEY = void 0;
exports.getByKey = getByKey;
exports.getByOrder = getByOrder;
exports.orderOf = orderOf;
exports.assertStructureLevelCatalogIntegrity = assertStructureLevelCatalogIntegrity;
exports.assertStructureLevelCatalogParity = assertStructureLevelCatalogParity;
/** Stable key for attributive adjective + noun (objectAdjective). */
exports.ADJECTIVE_NOUN_PHRASES_KEY = "adjective-noun-phrases";
function entry(order, key, name, description) {
    return {
        key,
        order,
        name,
        ...(description ? { description } : {}),
    };
}
exports.structureLevels = [
    entry(0, "to-be-present-affirmative", "To Be Present Affirmative"),
    entry(1, "to-be-with-names", "To Be With Names"),
    entry(2, "to-be-present-negative", "To Be Present Negative"),
    entry(3, "present-actions-affirmative", "Present Actions Affirmative"),
    entry(4, "present-actions-negative", "Present Actions Negative"),
    entry(5, "present-questions-affirmative", "Present Questions Affirmative"),
    entry(6, exports.ADJECTIVE_NOUN_PHRASES_KEY, "Adjective + Noun", "Attributive adjective + noun phrases (a cute dog). Placeholder explanation."),
    entry(7, "to-be-past-affirmative", "To Be Past Affirmative"),
    entry(8, "to-be-past-negative", "To Be Past Negative"),
    entry(9, "past-affirmative", "Past Affirmative"),
    entry(10, "past-negative", "Past Negative"),
    entry(11, "past-questions", "Past Questions"),
    entry(12, "present-progressive", "Present Progressive"),
    entry(13, "past-progressive", "Past Progressive"),
    entry(14, "possessive-pronouns", "Possessive Pronouns", "Placeholder: Structure Level reserved for possessive pronouns. Not implemented in the engine yet."),
];
/** Lookup by stable key. */
function getByKey(key) {
    return exports.structureLevels.find((item) => item.key === key);
}
/** Lookup by curricular order. */
function getByOrder(order) {
    return exports.structureLevels.find((item) => item.order === order);
}
/** Curricular order for a key; undefined if unknown. */
function orderOf(key) {
    return getByKey(key)?.order;
}
/**
 * Catalog integrity:
 * - unique keys
 * - unique orders
 * - key → order resolution
 */
function assertStructureLevelCatalogIntegrity() {
    const keys = new Set();
    const orders = new Set();
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
        if (orderOf(def.key) !== def.order) {
            throw new Error(`key "${def.key}" does not resolve to order ${def.order}`);
        }
    }
}
/**
 * @deprecated Use assertStructureLevelCatalogIntegrity.
 */
function assertStructureLevelCatalogParity() {
    assertStructureLevelCatalogIntegrity();
}
