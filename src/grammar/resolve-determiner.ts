import type { NounEntry } from "../lexicon";
import type { ObjectNumber } from "./object-number";
import {
  DETERMINER_POLICIES,
  type DeterminerPolicy,
} from "./determiner-policy";

const SINGULAR_COUNTABLE_PRESERVED = new Set<DeterminerPolicy>(
  DETERMINER_POLICIES.filter((policy) => policy !== "none"),
);

function preservedSingularCountableDeterminer(
  value: string | undefined,
): DeterminerPolicy | null {
  if (
    value != null &&
    SINGULAR_COUNTABLE_PRESERVED.has(value as DeterminerPolicy)
  ) {
    return value as DeterminerPolicy;
  }
  return null;
}

/**
 * Realize determiner/number policy for a noun object.
 *
 * Pure Grammar: receives an already-resolved `objectNumber`. Does not read
 * Verb, Function, Ecosystem, or Exponent.
 *
 * - "generic" → kind-reading: countable bare plural; uncountable bare
 * - "singular" + countable → never `none`; explicit valid defaultDeterminer
 *   is preserved; missing/`none` falls back to indefinite
 * - "singular" + uncountable → noun.grammar.defaultDeterminer (bare `none`
 *   stays bare)
 * - "plural" | other → noun.grammar.defaultDeterminer (reserved)
 */
export function resolveDeterminer({
  noun,
  objectNumber,
}: {
  noun: NounEntry;
  objectNumber: ObjectNumber;
}): string {
  if (objectNumber === "generic") {
    return noun.grammar?.countable ? "plural" : "none";
  }

  if (objectNumber === "singular" && noun.grammar?.countable) {
    return (
      preservedSingularCountableDeterminer(noun.grammar?.defaultDeterminer) ??
      "indefinite"
    );
  }

  return noun.grammar?.defaultDeterminer ?? "indefinite";
}
