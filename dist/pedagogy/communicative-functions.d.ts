import type { ObjectNumber } from "../grammar/object-number";
export declare const COMMUNICATIVE_FUNCTIONS: readonly ["describe", "express-preference", "express-desire", "express-need", "express-possession", "report-result", "report-activities", "ask-information"];
export type CommunicativeFunctionId = (typeof COMMUNICATIVE_FUNCTIONS)[number];
export declare const COMMUNICATIVE_FUNCTION_LABELS: Record<CommunicativeFunctionId, string>;
/** Short blurbs for editorial / lab UI (not selection weights). */
export declare const COMMUNICATIVE_FUNCTION_DESCRIPTIONS: Record<CommunicativeFunctionId, string>;
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
export declare function isCommunicativeFunctionId(value: string): value is CommunicativeFunctionId;
