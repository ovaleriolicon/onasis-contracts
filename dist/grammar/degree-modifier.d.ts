export declare const DEGREE_MODIFIER_POLICIES: readonly ["omit", "require"];
export type DegreeModifierPolicy = (typeof DEGREE_MODIFIER_POLICIES)[number];
export declare const DEGREE_MODIFIERS: readonly [{
    readonly lemma: "very";
    readonly position: "before";
}];
export type DegreeModifierLemma = (typeof DEGREE_MODIFIERS)[number]["lemma"];
export type DegreeModifierPosition = (typeof DEGREE_MODIFIERS)[number]["position"];
export type DegreeModifier = {
    lemma: DegreeModifierLemma;
    position: DegreeModifierPosition;
};
export declare function isDegreeModifierPolicy(value: unknown): value is DegreeModifierPolicy;
export declare function degreeModifierFor(lemma: string): DegreeModifier | undefined;
/**
 * Predicative complement. Without a modifier the adjective base is unchanged.
 * "before" prefixes the catalog lemma. No other position exists in V1.
 */
export declare function renderPredicativeComplement(adjectiveBase: string, degreeModifier?: DegreeModifier | null): string;
