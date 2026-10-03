"use strict";
// pedagogy/communicative-functions.ts
//
// Global Foundations catalog of Communicative Functions (F1).
// Curriculum authorization only — not used by the game engine / generateScene.
//
// Ecosystem.functions references these ids. Presence = authorized.
// Array order on an Ecosystem is an editorial hint only (not selection weights).
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMUNICATIVE_FUNCTION_GOVERNING_VERBS = exports.COMMUNICATIVE_FUNCTION_GOVERNING_ACTS = exports.COMMUNICATIVE_FUNCTION_OBJECT_MODIFIER_POLICIES = exports.COMMUNICATIVE_FUNCTION_OBJECT_NUMBERS = exports.COMMUNICATIVE_FUNCTION_MIN_STRUCTURE_KEYS = exports.COMMUNICATIVE_FUNCTION_DESCRIPTIONS = exports.COMMUNICATIVE_FUNCTION_LABELS = exports.COMMUNICATIVE_FUNCTIONS = void 0;
exports.isCommunicativeFunctionId = isCommunicativeFunctionId;
exports.resolveCommunicativeFunctionMinOrder = resolveCommunicativeFunctionMinOrder;
exports.isCommunicativeFunctionAvailableAt = isCommunicativeFunctionAvailableAt;
exports.resolveAppliesWhenMinOrder = resolveAppliesWhenMinOrder;
exports.verbGoverningActFitsFunction = verbGoverningActFitsFunction;
exports.communicativeFunctionGoverningVerbs = communicativeFunctionGoverningVerbs;
exports.verbGovernsFunction = verbGovernsFunction;
const verb_semantic_type_1 = require("../semantics/verb-semantic-type");
const resolve_structure_unlock_1 = require("./resolve-structure-unlock");
// Foundations catalog (9).
// `report-activities` = habitual / kind of practice.
// `report-event` = a specific performed action or occurred event.
// Former draft id `talk-about-activities` was withdrawn (content-like naming);
// do not revive it as an alias.
exports.COMMUNICATIVE_FUNCTIONS = [
    "describe",
    "express-preference",
    "express-desire",
    "express-need",
    "express-possession",
    "report-result",
    "report-activities",
    "report-event",
    "ask-information",
];
function isCommunicativeFunctionId(value) {
    return exports.COMMUNICATIVE_FUNCTIONS.includes(value);
}
exports.COMMUNICATIVE_FUNCTION_LABELS = {
    describe: "Describe",
    "express-preference": "Express Preference",
    "express-desire": "Express Desire",
    "express-need": "Express Need",
    "express-possession": "Express Possession",
    "report-result": "Report Result",
    "report-activities": "Report Activities",
    "report-event": "Report Event",
    "ask-information": "Ask Information",
};
/** Short blurbs for editorial / lab UI (not selection weights). */
exports.COMMUNICATIVE_FUNCTION_DESCRIPTIONS = {
    describe: "Say how someone or something is (qualities / states).",
    "express-preference": "Say what you like.",
    "express-desire": "Say what you want.",
    "express-need": "Say what you need.",
    "express-possession": "Say what you have.",
    "report-result": "Report an outcome or result.",
    "report-activities": "Say what you do or what activities you perform.",
    "report-event": "Say that you performed a specific action or that a specific event happened.",
    "ask-information": "Ask a question about authorized content acts.",
};
/**
 * Minimum Structure Level for each Communicative Function (stable keys).
 * Mirrors pre-migration mins: describe→0, verb-led→3, ask→5.
 */
exports.COMMUNICATIVE_FUNCTION_MIN_STRUCTURE_KEYS = {
    describe: "to-be-present-affirmative",
    "express-preference": "present-actions-affirmative",
    "express-desire": "present-actions-affirmative",
    "express-need": "present-actions-affirmative",
    "express-possession": "present-actions-affirmative",
    "report-result": "present-actions-affirmative",
    "report-activities": "present-actions-affirmative",
    "report-event": "present-actions-affirmative",
    "ask-information": "present-questions-affirmative",
};
/**
 * Resolve a Function's minimum unlock from its catalog key.
 */
function resolveCommunicativeFunctionMinOrder(functionId, keyOverride) {
    if (keyOverride != null && String(keyOverride).trim() !== "") {
        return (0, resolve_structure_unlock_1.resolveStructureUnlockOrder)(String(keyOverride).trim());
    }
    return (0, resolve_structure_unlock_1.resolveStructureUnlockOrder)(exports.COMMUNICATIVE_FUNCTION_MIN_STRUCTURE_KEYS[functionId]);
}
/** True when studentOrder unlocks the Function's minimum Structure Level. */
function isCommunicativeFunctionAvailableAt(functionId, studentOrder) {
    if (!isCommunicativeFunctionId(functionId)) {
        return false;
    }
    return (0, resolve_structure_unlock_1.isStructureUnlockedAt)(exports.COMMUNICATIVE_FUNCTION_MIN_STRUCTURE_KEYS[functionId], studentOrder);
}
/**
 * Resolve appliesWhen.minStructureLevelKey → order.
 * Returns null when unset. Numeric minStructureLevel is rejected.
 */
function resolveAppliesWhenMinOrder(appliesWhen) {
    if (!appliesWhen)
        return null;
    if (appliesWhen.minStructureLevel !== undefined &&
        appliesWhen.minStructureLevel !== null) {
        throw new Error("resolveAppliesWhenMinOrder: minStructureLevel number is no longer accepted; use minStructureLevelKey");
    }
    const key = appliesWhen.minStructureLevelKey != null
        ? String(appliesWhen.minStructureLevelKey).trim()
        : "";
    if (key) {
        return (0, resolve_structure_unlock_1.resolveStructureUnlockOrder)(key);
    }
    return null;
}
/**
 * Optional object-number override for the communicative act (global catalog).
 * Absent → NLG inherits Verb.pedagogy.preferredObjectNumber.
 * Ask Information has no entry: use the content function id instead.
 */
exports.COMMUNICATIVE_FUNCTION_OBJECT_NUMBERS = {
    "express-preference": "generic",
    "express-desire": "singular",
    "express-need": "singular",
    "express-possession": "singular",
    "report-result": "singular",
    "report-activities": "generic",
    "report-event": "singular",
    // describe — inherit verb
    // ask-information — inherit content function
};
exports.COMMUNICATIVE_FUNCTION_OBJECT_MODIFIER_POLICIES = {
    "express-possession": ["omit", "require"],
};
/**
 * Coarse lexical classes that may govern a Function which does not name
 * governing verbs. `VerbSemanticType` is not sufficient admission when
 * `COMMUNICATIVE_FUNCTION_GOVERNING_VERBS` names lemmas for that Function.
 * `ask-information` asks about authorized content acts, so any declared verb
 * semantic type may head it.
 */
const ACTIVITY_ACTS = [
    "movement",
    "consumption",
    "communication",
    "perception",
    "creation",
    "change",
];
exports.COMMUNICATIVE_FUNCTION_GOVERNING_ACTS = {
    describe: ["state", "existence"],
    "express-preference": ["preference"],
    "express-desire": ["preference"],
    "express-need": ["necessity"],
    "express-possession": ["possession"],
    "report-result": ["change", "creation"],
    "report-activities": ACTIVITY_ACTS,
    "report-event": ACTIVITY_ACTS,
    "ask-information": verb_semantic_type_1.VERB_SEMANTIC_TYPES,
};
/** True when the verb's semantic act is one this Function accepts as verb1. */
function verbGoverningActFitsFunction(functionId, verbSemanticType) {
    if (!isCommunicativeFunctionId(functionId))
        return false;
    if (typeof verbSemanticType !== "string" || !verbSemanticType.trim())
        return false;
    return exports.COMMUNICATIVE_FUNCTION_GOVERNING_ACTS[functionId].includes(verbSemanticType.trim());
}
/**
 * Editorial governing verbs. A Function in this map admits a verb1 only when
 * the lemma is listed. `VerbSemanticType` does not admit or reject that
 * Function. A Function absent from this map admits a verb1 only through
 * `verbGoverningActFitsFunction`.
 */
exports.COMMUNICATIVE_FUNCTION_GOVERNING_VERBS = {
    describe: ["be"],
    "express-preference": ["like"],
    "express-desire": ["want"],
    "express-need": ["need"],
    "express-possession": ["have"],
};
function governingVerbLemma(value) {
    return typeof value === "string" ? value.trim().toLowerCase() : "";
}
/** Lemmas that may govern the Function, or null when admission is the coarse type filter. */
function communicativeFunctionGoverningVerbs(functionId) {
    if (!isCommunicativeFunctionId(functionId))
        return null;
    const listed = exports.COMMUNICATIVE_FUNCTION_GOVERNING_VERBS[functionId];
    return listed && listed.length > 0 ? listed : null;
}
/**
 * Final Function ↔ verb1 admission.
 * A named governing-verb list is the authority. Otherwise the coarse
 * `VerbSemanticType` filter is the authority.
 */
function verbGovernsFunction(functionId, lemma, verbSemanticType) {
    if (!isCommunicativeFunctionId(functionId))
        return false;
    const listed = communicativeFunctionGoverningVerbs(functionId);
    if (listed) {
        const key = governingVerbLemma(lemma);
        return key !== "" && listed.some((item) => governingVerbLemma(item) === key);
    }
    return verbGoverningActFitsFunction(functionId, verbSemanticType);
}
