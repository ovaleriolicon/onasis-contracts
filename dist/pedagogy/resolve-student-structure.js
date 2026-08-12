"use strict";
// pedagogy/resolve-student-structure.ts
//
// User / API progress: structureLevelKey → orderOf(key) → structureOrder.
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveStudentStructure = resolveStudentStructure;
exports.readStudentStructure = readStudentStructure;
exports.structureLevelWriteFields = structureLevelWriteFields;
exports.getEffectiveStructureOrder = getEffectiveStructureOrder;
exports.toStructureProgress = toStructureProgress;
const structure_levels_1 = require("./structure-levels");
function toResolved(def) {
    return {
        key: def.key,
        order: def.order,
    };
}
function normalizeKey(raw) {
    return raw != null ? String(raw).trim() : "";
}
/**
 * Resolve a Structure Level from catalog key.
 */
function resolveStudentStructure(input) {
    const rawKey = normalizeKey(input.structureLevelKey);
    if (!rawKey) {
        throw new Error("resolveStudentStructure: structureLevelKey required");
    }
    const byKey = (0, structure_levels_1.getByKey)(rawKey);
    if (!byKey) {
        throw new Error(`resolveStudentStructure: unknown structureLevelKey "${rawKey}"`);
    }
    return toResolved(byKey);
}
/**
 * Read Structure Level from a User-like document.
 * Requires structureLevelKey.
 */
function readStudentStructure(user) {
    return resolveStudentStructure({
        structureLevelKey: user.structureLevelKey,
    });
}
/**
 * Build User write fields. Requires structureLevelKey.
 */
function structureLevelWriteFields(input) {
    const resolved = resolveStudentStructure(input);
    return {
        structureLevelKey: resolved.key,
    };
}
/**
 * Curricular position for runtime gates.
 * Requires structureLevelKey.
 */
function getEffectiveStructureOrder(user) {
    return readStudentStructure(user).order;
}
/** Canonical progress payload for APIs (identity + curricular position). */
function toStructureProgress(user) {
    const read = readStudentStructure(user);
    return {
        structureLevelKey: read.key,
        structureOrder: read.order,
    };
}
