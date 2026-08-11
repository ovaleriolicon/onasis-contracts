import type { VerbEntry } from "../lexicon";
import type { ObjectNumber, ObjectNumberSource } from "../grammar/object-number";
import type {
  CommunicativeFunctionId,
  ObjectModifierPolicy,
} from "./communicative-functions";
import {
  COMMUNICATIVE_FUNCTION_OBJECT_NUMBERS,
  COMMUNICATIVE_FUNCTION_OBJECT_MODIFIER_POLICIES,
} from "./communicative-functions";

export type ResolvedObjectNumber = {
  objectNumber: ObjectNumber;
  source: ObjectNumberSource;
};

/**
 * Look up the optional Function-level objectNumber override.
 * `ask-information` has none — callers should pass the content function id.
 */
export function getFunctionObjectNumber(
  functionId?: CommunicativeFunctionId | string | null,
): ObjectNumber | undefined {
  if (functionId == null || functionId === "") {
    return undefined;
  }
  return COMMUNICATIVE_FUNCTION_OBJECT_NUMBERS[
    functionId as CommunicativeFunctionId
  ];
}

/**
 * Ordered policy list for a Function, or undefined when bare NP only.
 * `ask-information` has none — callers should pass the content function id.
 */
export function getFunctionObjectModifierPolicies(
  functionId?: CommunicativeFunctionId | string | null,
): readonly ObjectModifierPolicy[] | undefined {
  if (functionId == null || functionId === "") {
    return undefined;
  }
  const list =
    COMMUNICATIVE_FUNCTION_OBJECT_MODIFIER_POLICIES[
      functionId as CommunicativeFunctionId
    ];
  if (!list || list.length === 0) {
    return undefined;
  }
  return list;
}

/**
 * Resolve one concrete policy for this turn (orchestrator only).
 * - no catalog entry → undefined (bare NP)
 * - single entry → that policy
 * - multiple → next after lastObjectModifierPolicy; no last → first (omit for possession)
 */
export function resolveObjectModifierPolicy(
  functionId?: CommunicativeFunctionId | string | null,
  lastObjectModifierPolicy?: string | null,
): ObjectModifierPolicy | undefined {
  const policies = getFunctionObjectModifierPolicies(functionId);
  if (!policies || policies.length === 0) {
    return undefined;
  }
  if (policies.length === 1) {
    return policies[0];
  }

  const last =
    lastObjectModifierPolicy === "omit" || lastObjectModifierPolicy === "require"
      ? lastObjectModifierPolicy
      : null;

  if (last == null) {
    return policies[0];
  }

  const idx = policies.indexOf(last);
  if (idx < 0) {
    return policies[0];
  }

  return policies[(idx + 1) % policies.length];
}

/**
 * @deprecated Use resolveObjectModifierPolicy — kept for call-site migration.
 * Returns the first catalog policy only (no alternation).
 */
export function getFunctionObjectModifierPolicy(
  functionId?: CommunicativeFunctionId | string | null,
): ObjectModifierPolicy | undefined {
  const policies = getFunctionObjectModifierPolicies(functionId);
  return policies?.[0];
}

/**
 * NLG merge: Function override ?? Verb default ?? "singular".
 * Grammar never calls this — only the orchestrator / generateScene border.
 */
export function resolveObjectNumber({
  functionObjectNumber,
  verb,
}: {
  functionObjectNumber?: ObjectNumber | null;
  verb?: Pick<VerbEntry, "pedagogy"> | null;
}): ResolvedObjectNumber {
  if (
    functionObjectNumber === "generic" ||
    functionObjectNumber === "singular" ||
    functionObjectNumber === "plural"
  ) {
    return { objectNumber: functionObjectNumber, source: "function" };
  }

  const fromVerb = verb?.pedagogy?.preferredObjectNumber;
  if (
    fromVerb === "generic" ||
    fromVerb === "singular" ||
    fromVerb === "plural"
  ) {
    return { objectNumber: fromVerb, source: "verb" };
  }

  return { objectNumber: "singular", source: "fallback" };
}
