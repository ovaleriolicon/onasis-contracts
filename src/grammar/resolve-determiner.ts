import type { NounEntry } from "../lexicon";
import type { ObjectNumber } from "./object-number";
import { isNounLexicalObjectNumber } from "./object-number";
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
 * Pure Grammar: receives an already-resolved reading (`objectNumber`) and
 * the noun. Does not read Verb, Function, Ecosystem, or Exponent.
 *
 * - reading "generic" → kind-reading: countable bare plural; uncountable bare
 *   (Determiner V1; noun lexical number does not override kind-reading)
 * - instance + noun lexical "plural" + countable → bare plural
 * - "singular" + countable → never `none`; explicit valid defaultDeterminer
 *   is preserved; missing/`none` falls back to indefinite
 * - "singular" + uncountable → noun.grammar.defaultDeterminer (bare `none`
 *   stays bare)
 * - reading "plural" | other → noun.grammar.defaultDeterminer (reserved)
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

  const lexical = noun.pedagogy?.preferredObjectNumber;
  if (
    isNounLexicalObjectNumber(lexical) &&
    lexical === "plural" &&
    noun.grammar?.countable
  ) {
    return "plural";
  }

  if (objectNumber === "singular" && noun.grammar?.countable) {
    return (
      preservedSingularCountableDeterminer(noun.grammar?.defaultDeterminer) ??
      "indefinite"
    );
  }

  return noun.grammar?.defaultDeterminer ?? "indefinite";
}
