"use strict";
// grammar/degree-modifier.ts
//
// Degree Modifier V1. One closed catalog entry: predicative "very" before
// the adjective. Scene stores this object only when the modifier is present.
// Absent means the bare adjective. This file is the only source for the
// lemma, its position, and the predicative surface.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEGREE_MODIFIERS = exports.DEGREE_MODIFIER_POLICIES = void 0;
exports.isDegreeModifierPolicy = isDegreeModifierPolicy;
exports.degreeModifierFor = degreeModifierFor;
exports.renderPredicativeComplement = renderPredicativeComplement;
exports.DEGREE_MODIFIER_POLICIES = ["omit", "require"];
exports.DEGREE_MODIFIERS = [
    { lemma: "very", position: "before" },
];
function isDegreeModifierPolicy(value) {
    return (typeof value === "string" &&
        exports.DEGREE_MODIFIER_POLICIES.includes(value));
}
function degreeModifierFor(lemma) {
    const found = exports.DEGREE_MODIFIERS.find((item) => item.lemma === lemma);
    if (!found)
        return undefined;
    return { lemma: found.lemma, position: found.position };
}
/**
 * Predicative complement. Without a modifier the adjective base is unchanged.
 * "before" prefixes the catalog lemma. No other position exists in V1.
 */
function renderPredicativeComplement(adjectiveBase, degreeModifier) {
    const base = adjectiveBase.trim();
    if (!degreeModifier)
        return base;
    if (degreeModifier.position === "before") {
        return `${degreeModifier.lemma} ${base}`;
    }
    return base;
}
