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
 * Fixed attributive object-modifier policy for the communicative act (v1).
 * Absent → no objectAdjective (current bare NP behavior).
 * `"require"` → generateScene must attach a compatible attributive adjective.
 */
export type ObjectModifierPolicy = "require";
export declare const COMMUNICATIVE_FUNCTION_OBJECT_MODIFIER_POLICIES: Partial<Record<CommunicativeFunctionId, ObjectModifierPolicy>>;
export declare function isCommunicativeFunctionId(value: string): value is CommunicativeFunctionId;
