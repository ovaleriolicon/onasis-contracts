"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunctionObjectNumber = getFunctionObjectNumber;
exports.getFunctionObjectModifierPolicies = getFunctionObjectModifierPolicies;
exports.resolveObjectModifierPolicy = resolveObjectModifierPolicy;
exports.getFunctionObjectModifierPolicy = getFunctionObjectModifierPolicy;
exports.resolveObjectNumber = resolveObjectNumber;
const communicative_functions_1 = require("./communicative-functions");
const structure_levels_1 = require("./structure-levels");
const resolve_structure_unlock_1 = require("./resolve-structure-unlock");
/**
 * Look up the optional Function-level objectNumber override.
 * `ask-information` has none — callers should pass the content function id.
 */
function getFunctionObjectNumber(functionId) {
    if (functionId == null || functionId === "") {
        return undefined;
    }
    return communicative_functions_1.COMMUNICATIVE_FUNCTION_OBJECT_NUMBERS[functionId];
}
/**
 * Ordered policy list for a Function, or undefined when bare NP only.
 * `ask-information` has none — callers should pass the content function id.
 */
function getFunctionObjectModifierPolicies(functionId) {
    if (functionId == null || functionId === "") {
        return undefined;
    }
    const list = communicative_functions_1.COMMUNICATIVE_FUNCTION_OBJECT_MODIFIER_POLICIES[functionId];
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
 *
 * When `studentStructureOrder` is provided and `require` is selected but
 * adjective-noun-phrases is not unlocked, degrades cleanly to `omit`.
 */
function resolveObjectModifierPolicy(functionId, lastObjectModifierPolicy, studentStructureOrder) {
    const policies = getFunctionObjectModifierPolicies(functionId);
    if (!policies || policies.length === 0) {
        return undefined;
    }
    let policy;
    if (policies.length === 1) {
        policy = policies[0];
    }
    else {
        const last = lastObjectModifierPolicy === "omit" || lastObjectModifierPolicy === "require"
            ? lastObjectModifierPolicy
            : null;
        if (last == null) {
            policy = policies[0];
        }
        else {
            const idx = policies.indexOf(last);
            policy =
                idx < 0 ? policies[0] : policies[(idx + 1) % policies.length];
        }
    }
    if (policy === "require" &&
        studentStructureOrder !== undefined &&
        !(0, resolve_structure_unlock_1.isStructureUnlockedAt)(structure_levels_1.ADJECTIVE_NOUN_PHRASES_KEY, studentStructureOrder)) {
        return "omit";
    }
    return policy;
}
/**
 * @deprecated Use resolveObjectModifierPolicy — kept for call-site migration.
 * Returns the first catalog policy only (no alternation).
 */
function getFunctionObjectModifierPolicy(functionId) {
    const policies = getFunctionObjectModifierPolicies(functionId);
    return policies?.[0];
}
/**
 * NLG merge: Function override ?? Verb default ?? "singular".
 * Grammar never calls this — only the orchestrator / generateScene border.
 */
function resolveObjectNumber({ functionObjectNumber, verb, }) {
    if (functionObjectNumber === "generic" ||
        functionObjectNumber === "singular" ||
        functionObjectNumber === "plural") {
        return { objectNumber: functionObjectNumber, source: "function" };
    }
    const fromVerb = verb?.pedagogy?.preferredObjectNumber;
    if (fromVerb === "generic" ||
        fromVerb === "singular" ||
        fromVerb === "plural") {
        return { objectNumber: fromVerb, source: "verb" };
    }
    return { objectNumber: "singular", source: "fallback" };
}
