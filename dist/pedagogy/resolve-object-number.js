"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunctionObjectNumber = getFunctionObjectNumber;
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
