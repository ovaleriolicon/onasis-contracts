import type { VerbEntry } from "../lexicon";
import type { ObjectNumber, ObjectNumberSource } from "../grammar/object-number";
import type { CommunicativeFunctionId } from "./communicative-functions";
import { COMMUNICATIVE_FUNCTION_OBJECT_NUMBERS } from "./communicative-functions";

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
