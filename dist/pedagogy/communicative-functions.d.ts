import type { ObjectNumber } from "../grammar/object-number";
import type { VerbSemanticType } from "../semantics/verb-semantic-type";
export declare const COMMUNICATIVE_FUNCTIONS: readonly ["describe", "express-preference", "express-desire", "express-need", "express-possession", "report-result", "report-activities", "report-event", "ask-information"];
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
 * Resolve a Function's minimum unlock from its catalog key.
 */
export declare function resolveCommunicativeFunctionMinOrder(functionId: CommunicativeFunctionId, keyOverride?: string | null): number;
/** True when studentOrder unlocks the Function's minimum Structure Level. */
export declare function isCommunicativeFunctionAvailableAt(functionId: string, studentOrder: number): boolean;
/**
 * Resolve appliesWhen.minStructureLevelKey → order.
 * Returns null when unset. Numeric minStructureLevel is rejected.
 */
export declare function resolveAppliesWhenMinOrder(appliesWhen: {
    minStructureLevelKey?: string | null;
    /** @deprecated Rejected — use minStructureLevelKey. */
    minStructureLevel?: unknown;
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
export declare const COMMUNICATIVE_FUNCTION_GOVERNING_ACTS: Record<CommunicativeFunctionId, readonly VerbSemanticType[]>;
/** True when the verb's semantic act is one this Function accepts as verb1. */
export declare function verbGoverningActFitsFunction(functionId: string, verbSemanticType: unknown): boolean;
/**
 * Editorial governing verbs. A Function in this map admits a verb1 only when
 * the lemma is listed. `VerbSemanticType` does not admit or reject that
 * Function. A Function absent from this map admits a verb1 only through
 * `verbGoverningActFitsFunction`.
 */
export declare const COMMUNICATIVE_FUNCTION_GOVERNING_VERBS: Partial<Record<CommunicativeFunctionId, readonly string[]>>;
/** Lemmas that may govern the Function, or null when admission is the coarse type filter. */
export declare function communicativeFunctionGoverningVerbs(functionId: string): readonly string[] | null;
/**
 * Final Function ↔ verb1 admission.
 * A named governing-verb list is the authority. Otherwise the coarse
 * `VerbSemanticType` filter is the authority.
 */
export declare function verbGovernsFunction(functionId: string, lemma: unknown, verbSemanticType: unknown): boolean;
