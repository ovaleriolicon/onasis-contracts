"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunctionObjectNumber = getFunctionObjectNumber;
exports.getFunctionObjectModifierPolicies = getFunctionObjectModifierPolicies;
exports.resolveObjectModifierPolicy = resolveObjectModifierPolicy;
exports.getFunctionObjectModifierPolicy = getFunctionObjectModifierPolicy;
exports.resolveObjectNumber = resolveObjectNumber;
const communicative_functions_1 = require("./communicative-functions");
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
 */
function resolveObjectModifierPolicy(functionId, lastObjectModifierPolicy) {
    const policies = getFunctionObjectModifierPolicies(functionId);
    if (!policies || policies.length === 0) {
        return undefined;
    }
    if (policies.length === 1) {
        return policies[0];
    }
    const last = lastObjectModifierPolicy === "omit" || lastObjectModifierPolicy === "require"
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
