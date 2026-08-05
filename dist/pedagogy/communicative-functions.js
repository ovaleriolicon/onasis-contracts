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
exports.COMMUNICATIVE_FUNCTIONS = [
    "describe",
    "express-preference",
    "express-desire",
    "express-need",
    "express-possession",
    "talk-about-activities",
    "report-result",
    "ask-information",
];
exports.COMMUNICATIVE_FUNCTION_LABELS = {
    describe: "Describe",
    "express-preference": "Express Preference",
    "express-desire": "Express Desire",
    "express-need": "Express Need",
    "express-possession": "Express Possession",
    "talk-about-activities": "Talk About Activities",
    "report-result": "Report Result",
    "ask-information": "Ask Information",
};
function isCommunicativeFunctionId(value) {
    return exports.COMMUNICATIVE_FUNCTIONS.includes(value);
}
