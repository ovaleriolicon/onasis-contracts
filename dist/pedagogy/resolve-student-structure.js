"use strict";
// pedagogy/resolve-student-structure.ts
//
// Structure progress: structureLevelKey is canonical; structureLevel is optional legacy.
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
 * Resolve student structure from stable key and/or legacy number.
 *
 * - Key preferred; must exist in catalog.
 * - Legacy-only derives key from catalog.
 * - Key + incompatible number → throws (writes must not silent-correct).
 * - Key without legacy may not be paired with a structureLevel number.
 */
function resolveStudentStructure(input) {
    const rawKey = normalizeKey(input.structureLevelKey);
    const hasKey = rawKey !== "";
    const hasLevel = input.structureLevel !== undefined && input.structureLevel !== null;
    if (!hasKey && !hasLevel) {
        throw new Error("resolveStudentStructure: provide structureLevel and/or structureLevelKey");
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
 * Precedence:
 * - Valid key → canonical (order + optional legacy from catalog).
 * - Legacy number only → derive key (legacy users without key).
 * - Valid key + incompatible number → **key wins**; mismatch flagged.
 * - Unknown key + legacy → legacy fallback; mismatch flagged.
 */
function readStudentStructure(user) {
    const hasLevel = user.structureLevel !== undefined && user.structureLevel !== null;
    const level = hasLevel ? Number(user.structureLevel) : undefined;
    const rawKey = normalizeKey(user.structureLevelKey);
    if (rawKey) {
        const byKey = (0, structure_levels_1.getByKey)(rawKey);
        if (!byKey) {
            if (hasLevel && Number.isFinite(level)) {
                return {
                    ...resolveStudentStructure({ structureLevel: level }),
                    mismatch: true,
                    ignoredStructureLevelKey: rawKey,
                };
            }
            throw new Error(`readStudentStructure: unknown structureLevelKey "${rawKey}"`);
        }
        const resolved = toResolved(byKey);
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
    return {
        ...resolveStudentStructure({ structureLevel: level ?? 0 }),
        mismatch: false,
    };
}
/**
 * Build User write fields from key and/or legacy number input.
 * Prefer structureLevelKey. Resolves legacy-only input → key via catalog.
 * Does **not** include structureLevel — historical field is left untouched.
 */
function structureLevelWriteFields(input) {
    // Prefer key alone when present so key-only SLs do not require a legacy pair.
    const rawKey = normalizeKey(input.structureLevelKey);
    const resolved = resolveStudentStructure(rawKey
        ? { structureLevelKey: rawKey }
        : { structureLevel: input.structureLevel });
    return {
        structureLevelKey: resolved.key,
    };
}
/**
 * Curricular position for runtime gates.
 * Valid key → order; legacy-only (pre-Fase-2) → derive key → order.
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
