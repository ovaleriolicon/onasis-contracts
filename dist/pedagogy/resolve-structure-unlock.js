"use strict";
// pedagogy/resolve-structure-unlock.ts
//
// Resolve Pattern unlock refs (stable key) → curricular order.
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveStructureUnlockOrder = resolveStructureUnlockOrder;
exports.isStructureUnlockedAt = isStructureUnlockedAt;
exports.resolvePatternUnlockOrder = resolvePatternUnlockOrder;
exports.isPatternUnlockedAt = isPatternUnlockedAt;
exports.resolveMappedUnlockOrder = resolveMappedUnlockOrder;
const structure_levels_1 = require("./structure-levels");
/**
 * Resolve an unlock ref to curricular order.
 * Accepts catalog keys only.
 */
function resolveStructureUnlockOrder(ref) {
    if (ref === null || ref === undefined) {
        return 0;
    }
    if (typeof ref !== "string") {
        throw new Error(`resolveStructureUnlockOrder: numeric unlock refs are no longer accepted (got ${typeof ref})`);
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
 * Cumulative unlock: studentOrder >= unlock order.
 */
function isStructureUnlockedAt(unlockRef, studentOrder) {
    return resolveStructureUnlockOrder(unlockRef) <= studentOrder;
}
/**
 * Pattern-level unlock via unlockedAtStructureKey.
 */
function resolvePatternUnlockOrder(pattern) {
    const key = pattern.unlockedAtStructureKey != null
        ? String(pattern.unlockedAtStructureKey).trim()
        : "";
    if (key) {
        return resolveStructureUnlockOrder(key);
    }
    return 0;
}
function isPatternUnlockedAt(pattern, studentOrder) {
    return resolvePatternUnlockOrder(pattern) <= studentOrder;
}
/**
 * Map entry unlock with fallback to pattern root unlock.
 * Prefers string value in the map; missing → pattern root.
 */
function resolveMappedUnlockOrder(mapValue, pattern) {
    if (mapValue !== undefined && mapValue !== null && mapValue !== "") {
        return resolveStructureUnlockOrder(mapValue);
    }
    return resolvePatternUnlockOrder(pattern);
}
