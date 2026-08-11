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
 * Look up the optional Function-level attributive object-modifier policy.
 * Absent → bare object NP (no objectAdjective).
 * `ask-information` has none — callers should pass the content function id.
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
