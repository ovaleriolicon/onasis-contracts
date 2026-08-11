import type { ObjectNumber } from "../grammar/object-number";
import type { StructureUnlockRef } from "./resolve-structure-unlock";
export declare const COMMUNICATIVE_FUNCTIONS: readonly ["describe", "express-preference", "express-desire", "express-need", "express-possession", "report-result", "report-activities", "ask-information"];
export type CommunicativeFunctionId = (typeof COMMUNICATIVE_FUNCTIONS)[number];
export declare function isCommunicativeFunctionId(value: string): value is CommunicativeFunctionId;
export declare const COMMUNICATIVE_FUNCTION_LABELS: Record<CommunicativeFunctionId, string>;
/** Short blurbs for editorial / lab UI (not selection weights). */
export declare const COMMUNICATIVE_FUNCTION_DESCRIPTIONS: Record<CommunicativeFunctionId, string>;
/**
 * Minimum Structure Level for each Communicative Function (stable keys).
 * Mirrors pre-migration mins: describe→0, verb-led→3, ask→5.
 */
export declare const COMMUNICATIVE_FUNCTION_MIN_STRUCTURE_KEYS: Record<CommunicativeFunctionId, string>;
/**
 * Resolve a Function's minimum unlock (key preferred; legacy number accepted).
 */
export declare function resolveCommunicativeFunctionMinOrder(functionId: CommunicativeFunctionId, legacyOverride?: StructureUnlockRef | null): number;
/** True when studentOrder unlocks the Function's minimum Structure Level. */
export declare function isCommunicativeFunctionAvailableAt(functionId: string, studentOrder: number): boolean;
/**
 * Resolve appliesWhen.minStructureLevelKey | minStructureLevel → order.
 * Returns null when neither is set.
 */
export declare function resolveAppliesWhenMinOrder(appliesWhen: {
    minStructureLevelKey?: string | null;
    minStructureLevel?: number | null;
} | null | undefined): number | null;
/**
 * Optional object-number override for the communicative act (global catalog).
 * Absent → NLG inherits Verb.pedagogy.preferredObjectNumber.
 * Ask Information has no entry: use the content function id instead.
 */
export declare const COMMUNICATIVE_FUNCTION_OBJECT_NUMBERS: Partial<Record<CommunicativeFunctionId, ObjectNumber>>;
/**
 * Attributive object-modifier policies for the communicative act (v2).
 * Absent → bare object NP (no objectAdjective).
 * List length 1 → always that policy.
 * List length >1 → orchestrator advances deterministically via lastObjectModifierPolicy.
 */
export type ObjectModifierPolicy = "omit" | "require";
export declare const COMMUNICATIVE_FUNCTION_OBJECT_MODIFIER_POLICIES: Partial<Record<CommunicativeFunctionId, readonly ObjectModifierPolicy[]>>;
