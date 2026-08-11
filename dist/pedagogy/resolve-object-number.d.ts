import type { VerbEntry } from "../lexicon";
import type { ObjectNumber, ObjectNumberSource } from "../grammar/object-number";
import type { CommunicativeFunctionId, ObjectModifierPolicy } from "./communicative-functions";
export type ResolvedObjectNumber = {
    objectNumber: ObjectNumber;
    source: ObjectNumberSource;
};
/**
 * Look up the optional Function-level objectNumber override.
 * `ask-information` has none — callers should pass the content function id.
 */
export declare function getFunctionObjectNumber(functionId?: CommunicativeFunctionId | string | null): ObjectNumber | undefined;
/**
 * Ordered policy list for a Function, or undefined when bare NP only.
 * `ask-information` has none — callers should pass the content function id.
 */
export declare function getFunctionObjectModifierPolicies(functionId?: CommunicativeFunctionId | string | null): readonly ObjectModifierPolicy[] | undefined;
/**
 * Resolve one concrete policy for this turn (orchestrator only).
 * - no catalog entry → undefined (bare NP)
 * - single entry → that policy
 * - multiple → next after lastObjectModifierPolicy; no last → first (omit for possession)
 *
 * When `studentStructureOrder` is provided and `require` is selected but
 * adjective-noun-phrases is not unlocked, degrades cleanly to `omit`.
 */
export declare function resolveObjectModifierPolicy(functionId?: CommunicativeFunctionId | string | null, lastObjectModifierPolicy?: string | null, studentStructureOrder?: number): ObjectModifierPolicy | undefined;
/**
 * @deprecated Use resolveObjectModifierPolicy — kept for call-site migration.
 * Returns the first catalog policy only (no alternation).
 */
export declare function getFunctionObjectModifierPolicy(functionId?: CommunicativeFunctionId | string | null): ObjectModifierPolicy | undefined;
/**
 * NLG merge: Function override ?? Verb default ?? "singular".
 * Grammar never calls this — only the orchestrator / generateScene border.
 */
export declare function resolveObjectNumber({ functionObjectNumber, verb, }: {
    functionObjectNumber?: ObjectNumber | null;
    verb?: Pick<VerbEntry, "pedagogy"> | null;
}): ResolvedObjectNumber;
