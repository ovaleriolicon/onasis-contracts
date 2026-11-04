// grammar/degree-modifier.ts
//
// Degree Modifier V1. One closed catalog entry: predicative "very" before
// the adjective. Scene stores this object only when the modifier is present.
// Absent means the bare adjective. This file is the only source for the
// lemma, its position, and the predicative surface.

export const DEGREE_MODIFIER_POLICIES = ["omit", "require"] as const;

export type DegreeModifierPolicy = (typeof DEGREE_MODIFIER_POLICIES)[number];

export const DEGREE_MODIFIERS = [
  { lemma: "very", position: "before" },
] as const;

export type DegreeModifierLemma = (typeof DEGREE_MODIFIERS)[number]["lemma"];

export type DegreeModifierPosition = (typeof DEGREE_MODIFIERS)[number]["position"];

export type DegreeModifier = {
  lemma: DegreeModifierLemma;
  position: DegreeModifierPosition;
};

export function isDegreeModifierPolicy(
  value: unknown,
): value is DegreeModifierPolicy {
  return (
    typeof value === "string" &&
    (DEGREE_MODIFIER_POLICIES as readonly string[]).includes(value)
  );
}

export function degreeModifierFor(
  lemma: string,
): DegreeModifier | undefined {
  const found = DEGREE_MODIFIERS.find((item) => item.lemma === lemma);
  if (!found) return undefined;
  return { lemma: found.lemma, position: found.position };
}

/**
 * Predicative complement. Without a modifier the adjective base is unchanged.
 * "before" prefixes the catalog lemma. No other position exists in V1.
 */
export function renderPredicativeComplement(
  adjectiveBase: string,
  degreeModifier?: DegreeModifier | null,
): string {
  const base = adjectiveBase.trim();
  if (!degreeModifier) return base;
  if (degreeModifier.position === "before") {
    return `${degreeModifier.lemma} ${base}`;
  }
  return base;
}
