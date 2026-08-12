"use strict";
// pedagogy/resolve-student-structure.ts
//
// Fase 3a: User progress is structureLevelKey only.
// Catalog legacyLevel / import tooling may still resolve by historical number
// via resolveStudentStructure — never via User.structureLevel.
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveStudentStructure = resolveStudentStructure;
exports.readStudentStructure = readStudentStructure;
exports.structureLevelWriteFields = structureLevelWriteFields;
exports.getEffectiveStructureOrder = getEffectiveStructureOrder;
exports.toStructureProgress = toStructureProgress;
const structure_levels_1 = require("./structure-levels");
function toResolved(def) {
    const legacy = def.legacyLevel ?? def.level;
    return {
        key: def.key,
        order: def.order,
        ...(legacy !== undefined ? { legacyLevel: legacy } : {}),
    };
}
function normalizeKey(raw) {
    return raw != null ? String(raw).trim() : "";
}
/**
 * Resolve a Structure Level from catalog key and/or historical legacy number.
 *
 * User/API paths use structureLevelKey only.
 * Legacy-number resolution remains for catalog/import tooling (Fase 3b).
 */
function resolveStudentStructure(input) {
    const rawKey = normalizeKey(input.structureLevelKey);
    const hasKey = rawKey !== "";
    const hasLevel = input.structureLevel !== undefined && input.structureLevel !== null;
    if (!hasKey && !hasLevel) {
        throw new Error("resolveStudentStructure: provide structureLevelKey (or structureLevel for import tooling)");
    }
    if (hasKey) {
        const byKey = (0, structure_levels_1.getByKey)(rawKey);
        if (!byKey) {
            throw new Error(`resolveStudentStructure: unknown structureLevelKey "${rawKey}"`);
        }
        return toResolved(byKey);
    }
    const legacy = Number(input.structureLevel);
    if (!Number.isFinite(legacy)) {
        throw new Error(`resolveStudentStructure: invalid structureLevel ${input.structureLevel}`);
    }
    const byLevel = (0, structure_levels_1.getByLegacyLevel)(legacy);
    if (!byLevel) {
        throw new Error(`resolveStudentStructure: unknown structureLevel ${legacy}`);
    }
    return toResolved(byLevel);
}
/**
 * Read Structure Level from a User-like document.
 * Requires structureLevelKey. Ignores any other fields.
 */
function readStudentStructure(user) {
    const rawKey = normalizeKey(user.structureLevelKey);
    if (!rawKey) {
        throw new Error("readStudentStructure: structureLevelKey required");
    }
    const byKey = (0, structure_levels_1.getByKey)(rawKey);
    if (!byKey) {
        throw new Error(`readStudentStructure: unknown structureLevelKey "${rawKey}"`);
    }
    return toResolved(byKey);
}
/**
 * Build User write fields. Requires structureLevelKey.
 */
function structureLevelWriteFields(input) {
    const rawKey = normalizeKey(input.structureLevelKey);
    if (!rawKey) {
        throw new Error("structureLevelWriteFields: structureLevelKey required");
    }
    const resolved = resolveStudentStructure({ structureLevelKey: rawKey });
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
