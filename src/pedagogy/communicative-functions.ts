// pedagogy/communicative-functions.ts
//
// Global Foundations catalog of Communicative Functions (F1).
// Curriculum authorization only — not used by the game engine / generateScene.
//
// Ecosystem.functions references these ids. Presence = authorized.
// Array order on an Ecosystem is an editorial hint only (not selection weights).

import type { ObjectNumber } from "../grammar/object-number";
import {
  isStructureUnlockedAt,
  resolveStructureUnlockOrder,
} from "./resolve-structure-unlock";

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

export function isCommunicativeFunctionId(
  value: string,
): value is CommunicativeFunctionId {
  return (COMMUNICATIVE_FUNCTIONS as readonly string[]).includes(value);
}

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
 * Minimum Structure Level for each Communicative Function (stable keys).
 * Mirrors pre-migration mins: describe→0, verb-led→3, ask→5.
 */
export const COMMUNICATIVE_FUNCTION_MIN_STRUCTURE_KEYS: Record<
  CommunicativeFunctionId,
  string
> = {
  describe: "to-be-present-affirmative",
  "express-preference": "present-actions-affirmative",
  "express-desire": "present-actions-affirmative",
  "express-need": "present-actions-affirmative",
  "express-possession": "present-actions-affirmative",
  "report-result": "present-actions-affirmative",
  "report-activities": "present-actions-affirmative",
  "ask-information": "present-questions-affirmative",
};

/**
 * Resolve a Function's minimum unlock from its catalog key.
 */
export function resolveCommunicativeFunctionMinOrder(
  functionId: CommunicativeFunctionId,
  keyOverride?: string | null,
): number {
  if (keyOverride != null && String(keyOverride).trim() !== "") {
    return resolveStructureUnlockOrder(String(keyOverride).trim());
  }
  return resolveStructureUnlockOrder(
    COMMUNICATIVE_FUNCTION_MIN_STRUCTURE_KEYS[functionId],
  );
}

/** True when studentOrder unlocks the Function's minimum Structure Level. */
export function isCommunicativeFunctionAvailableAt(
  functionId: string,
  studentOrder: number,
): boolean {
  if (!isCommunicativeFunctionId(functionId)) {
    return false;
  }
  return isStructureUnlockedAt(
    COMMUNICATIVE_FUNCTION_MIN_STRUCTURE_KEYS[functionId],
    studentOrder,
  );
}

/**
 * Resolve appliesWhen.minStructureLevelKey → order.
 * Returns null when unset. Numeric minStructureLevel is rejected.
 */
export function resolveAppliesWhenMinOrder(appliesWhen: {
  minStructureLevelKey?: string | null;
  /** @deprecated Rejected — use minStructureLevelKey. */
  minStructureLevel?: unknown;
} | null | undefined): number | null {
  if (!appliesWhen) return null;
  if (
    appliesWhen.minStructureLevel !== undefined &&
    appliesWhen.minStructureLevel !== null
  ) {
    throw new Error(
      "resolveAppliesWhenMinOrder: minStructureLevel number is no longer accepted; use minStructureLevelKey",
    );
  }
  const key =
    appliesWhen.minStructureLevelKey != null
      ? String(appliesWhen.minStructureLevelKey).trim()
      : "";
  if (key) {
    return resolveStructureUnlockOrder(key);
  }
  return null;
}

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

/**
 * Attributive object-modifier policies for the communicative act (v2).
 * Absent → bare object NP (no objectAdjective).
 * List length 1 → always that policy.
 * List length >1 → orchestrator advances deterministically via lastObjectModifierPolicy.
 */
export type ObjectModifierPolicy = "omit" | "require";

export const COMMUNICATIVE_FUNCTION_OBJECT_MODIFIER_POLICIES: Partial<
  Record<CommunicativeFunctionId, readonly ObjectModifierPolicy[]>
> = {
  "express-possession": ["omit", "require"],
};
