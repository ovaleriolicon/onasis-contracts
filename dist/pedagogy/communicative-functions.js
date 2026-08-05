"use strict";
// pedagogy/communicative-functions.ts
//
// Global Foundations catalog of Communicative Functions (F1).
// Curriculum authorization only — not used by the game engine / generateScene.
//
// Ecosystem.functions references these ids. Presence = authorized.
// Array order on an Ecosystem is an editorial hint only (not selection weights).
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMUNICATIVE_FUNCTION_LABELS = exports.COMMUNICATIVE_FUNCTIONS = void 0;
exports.isCommunicativeFunctionId = isCommunicativeFunctionId;
// Foundations catalog (frozen temporarily at 7).
// `talk-about-activities` withdrawn — content-like, not a clear speaker act.
// Action sentences remain in Ecosystems; no Function covers that slot for now.
exports.COMMUNICATIVE_FUNCTIONS = [
    "describe",
    "express-preference",
    "express-desire",
    "express-need",
    "express-possession",
    "report-result",
    "ask-information",
];
exports.COMMUNICATIVE_FUNCTION_LABELS = {
    describe: "Describe",
    "express-preference": "Express Preference",
    "express-desire": "Express Desire",
    "express-need": "Express Need",
    "express-possession": "Express Possession",
    "report-result": "Report Result",
    "ask-information": "Ask Information",
};
function isCommunicativeFunctionId(value) {
    return exports.COMMUNICATIVE_FUNCTIONS.includes(value);
}
