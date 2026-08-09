// pedagogy/communicative-functions.ts
//
// Global Foundations catalog of Communicative Functions (F1).
// Curriculum authorization only — not used by the game engine / generateScene.
//
// Ecosystem.functions references these ids. Presence = authorized.
// Array order on an Ecosystem is an editorial hint only (not selection weights).

import type { ObjectNumber } from "../grammar/object-number";

// Foundations catalog (8).
// `report-activities` covers the speaker act of saying what you do / perform.
// Former draft id `talk-about-activities` was withdrawn (content-like naming);
// do not revive it as an alias.
export const COMMUNICATIVE_FUNCTIONS = [
  "describe",
  "express-preference",
  "express-desire",
  "express-need",
  "express-possession",
  "report-result",
  "report-activities",
  "ask-information",
] as const;

export type CommunicativeFunctionId =
  (typeof COMMUNICATIVE_FUNCTIONS)[number];

export const COMMUNICATIVE_FUNCTION_LABELS: Record<
  CommunicativeFunctionId,
  string
> = {
  describe: "Describe",
  "express-preference": "Express Preference",
  "express-desire": "Express Desire",
  "express-need": "Express Need",
  "express-possession": "Express Possession",
  "report-result": "Report Result",
  "report-activities": "Report Activities",
  "ask-information": "Ask Information",
};

/** Short blurbs for editorial / lab UI (not selection weights). */
export const COMMUNICATIVE_FUNCTION_DESCRIPTIONS: Record<
  CommunicativeFunctionId,
  string
> = {
  describe: "Say how someone or something is (qualities / states).",
  "express-preference": "Say what you like.",
  "express-desire": "Say what you want.",
  "express-need": "Say what you need.",
  "express-possession": "Say what you have.",
  "report-result": "Report an outcome or result.",
  "report-activities":
    "Say what you do or what activities you perform.",
  "ask-information": "Ask a question about authorized content acts.",
};

/**
 * Optional object-number override for the communicative act (global catalog).
 * Absent → NLG inherits Verb.pedagogy.preferredObjectNumber.
 * Ask Information has no entry: use the content function id instead.
 */
export const COMMUNICATIVE_FUNCTION_OBJECT_NUMBERS: Partial<
  Record<CommunicativeFunctionId, ObjectNumber>
> = {
  "express-preference": "generic",
  "express-desire": "singular",
  "express-need": "singular",
  "express-possession": "singular",
  "report-result": "singular",
  "report-activities": "generic",
  // describe — inherit verb
  // ask-information — inherit content function
};

export function isCommunicativeFunctionId(
  value: string,
): value is CommunicativeFunctionId {
  return (COMMUNICATIVE_FUNCTIONS as readonly string[]).includes(value);
}
