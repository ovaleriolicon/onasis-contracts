"use strict";
// pedagogy/resolve-student-structure.ts
//
// Fase 2: runtime progress is structureLevelKey only.
// User.structureLevel is historical and must not govern any runtime path.
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
 * Operational User/API paths must use structureLevelKey.
 * Legacy-number resolution remains for catalog/import tooling only (Fase 3).
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
        if (hasLevel) {
            const legacy = Number(input.structureLevel);
            const entryLegacy = byKey.legacyLevel ?? byKey.level;
            if (!Number.isFinite(legacy) ||
                entryLegacy === undefined ||
                entryLegacy !== legacy) {
                throw new Error(`resolveStudentStructure: structureLevelKey "${rawKey}" does not match structureLevel ${input.structureLevel}`);
            }
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
 *
 * Fase 2: requires a valid structureLevelKey. Never derives identity from
 * User.structureLevel. Historical structureLevel is ignored for gates.
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
    const resolved = toResolved(byKey);
    const hasLevel = user.structureLevel !== undefined && user.structureLevel !== null;
    const level = hasLevel ? Number(user.structureLevel) : undefined;
    if (hasLevel && Number.isFinite(level)) {
        const entryLegacy = byKey.legacyLevel ?? byKey.level;
        if (entryLegacy !== level) {
            return {
                ...resolved,
                mismatch: true,
                ignoredStructureLevel: level,
            };
        }
    }
    return { ...resolved, mismatch: false };
}
/**
 * Build User write fields. Requires structureLevelKey.
 * Does not accept structureLevel: number (Fase 2).
 * Does not include or update User.structureLevel.
 */
function structureLevelWriteFields(input) {
    if (input.structureLevel !== undefined &&
        input.structureLevel !== null &&
        !normalizeKey(input.structureLevelKey)) {
        throw new Error("structureLevelWriteFields: structureLevel number is no longer accepted; provide structureLevelKey");
    }
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
