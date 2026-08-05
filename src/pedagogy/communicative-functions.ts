// pedagogy/communicative-functions.ts
//
// Global Foundations catalog of Communicative Functions (F1).
// Curriculum authorization only — not used by the game engine / generateScene.
//
// Ecosystem.functions references these ids. Presence = authorized.
// Array order on an Ecosystem is an editorial hint only (not selection weights).

export const COMMUNICATIVE_FUNCTIONS = [
  "describe",
  "express-preference",
  "express-desire",
  "express-need",
  "express-possession",
  "talk-about-activities",
  "report-result",
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
  "talk-about-activities": "Talk About Activities",
  "report-result": "Report Result",
  "ask-information": "Ask Information",
};

export function isCommunicativeFunctionId(
  value: string,
): value is CommunicativeFunctionId {
  return (COMMUNICATIVE_FUNCTIONS as readonly string[]).includes(value);
}
