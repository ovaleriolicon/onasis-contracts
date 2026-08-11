"use strict";
// pedagogy/resolve-structure-unlock.ts
//
// Resolve Pattern unlock refs (stable key or legacy number) → curricular order.
// F3: Patterns prefer keys; numeric refs remain valid for legacy definitions.
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveStructureUnlockOrder = resolveStructureUnlockOrder;
exports.isStructureUnlockedAt = isStructureUnlockedAt;
exports.resolvePatternUnlockOrder = resolvePatternUnlockOrder;
exports.isPatternUnlockedAt = isPatternUnlockedAt;
exports.resolveMappedUnlockOrder = resolveMappedUnlockOrder;
exports.structureKeyForLegacyLevel = structureKeyForLegacyLevel;
exports.legacyLevelForStructureKey = legacyLevelForStructureKey;
const structure_levels_1 = require("./structure-levels");
/**
 * Resolve an unlock ref to curricular order.
 *
 * - string → orderOf(key)
 * - number → legacyLevel → catalog.order (unknown numbers pass through as-is)
 */
function resolveStructureUnlockOrder(ref) {
    if (ref === null || ref === undefined) {
        return 0;
    }
    if (typeof ref === "number") {
        if (!Number.isFinite(ref)) {
            throw new Error(`resolveStructureUnlockOrder: invalid number ${ref}`);
        }
        const byLegacy = (0, structure_levels_1.getByLegacyLevel)(ref);
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
    const order = (0, structure_levels_1.orderOf)(key);
    if (order === undefined) {
        throw new Error(`resolveStructureUnlockOrder: unknown structure level key "${key}"`);
    }
    return order;
}
/**
 * Cumulative unlock: studentOrder >= unlock order (same as legacy `unlock <= level`).
 */
function isStructureUnlockedAt(unlockRef, studentOrder) {
    return resolveStructureUnlockOrder(unlockRef) <= studentOrder;
}
/**
 * Pattern-level unlock: prefer unlockedAtStructureKey, else unlockedAtStructureLevel.
 */
function resolvePatternUnlockOrder(pattern) {
    const key = pattern.unlockedAtStructureKey != null
        ? String(pattern.unlockedAtStructureKey).trim()
        : "";
    if (key) {
        return resolveStructureUnlockOrder(key);
    }
    if (pattern.unlockedAtStructureLevel !== undefined &&
        pattern.unlockedAtStructureLevel !== null) {
        return resolveStructureUnlockOrder(pattern.unlockedAtStructureLevel);
    }
    return 0;
}
function isPatternUnlockedAt(pattern, studentOrder) {
    return resolvePatternUnlockOrder(pattern) <= studentOrder;
}
/**
 * Map entry unlock with fallback to pattern root unlock.
 * Prefers string/number value in the map; missing → pattern root.
 */
function resolveMappedUnlockOrder(mapValue, pattern) {
    if (mapValue !== undefined && mapValue !== null && mapValue !== "") {
        return resolveStructureUnlockOrder(mapValue);
    }
    return resolvePatternUnlockOrder(pattern);
}
/** Catalog key for a legacy level, if defined. */
function structureKeyForLegacyLevel(level) {
    return (0, structure_levels_1.getByLegacyLevel)(level)?.key;
}
/** Legacy level for a key, if defined. */
function legacyLevelForStructureKey(key) {
    return (0, structure_levels_1.getByKey)(key)?.legacyLevel ?? (0, structure_levels_1.getByKey)(key)?.level;
}
