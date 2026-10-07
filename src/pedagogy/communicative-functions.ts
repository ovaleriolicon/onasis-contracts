// pedagogy/communicative-functions.ts
//
// Global Foundations catalog of Communicative Functions (F1).
// Curriculum authorization only — not used by the game engine / generateScene.
//
// Ecosystem.functions references these ids. Presence = authorized.
// Array order on an Ecosystem is an editorial hint only (not selection weights).

import type { ObjectNumber } from "../grammar/object-number";
import type { VerbSemanticType } from "../semantics/verb-semantic-type";
import { VERB_SEMANTIC_TYPES } from "../semantics/verb-semantic-type";
import {
  isStructureUnlockedAt,
  resolveStructureUnlockOrder,
} from "./resolve-structure-unlock";

// Foundations catalog (9).
// `report-activities` = habitual / kind of practice.
// `report-event` = a specific performed action or occurred event.
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
  "report-event",
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
  "report-event": "Report Event",
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
  "report-event":
    "Say that you performed a specific action or that a specific event happened.",
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
  "report-event": "present-actions-affirmative",
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
  "report-event": "singular",
  // describe — inherit verb
  // ask-information — inherit content function
};

/**
 * Attributive object-modifier policies for the communicative act (v2).
 * Absent → bare object NP (no objectAdjective).
 * List length 1 → always that policy.
 * List length >1 → orchestrator advances deterministically via lastObjectModifierPolicy.
 * `optional` is not a catalog policy. An Exponent flag selects it for one
 * Function: attach an adjective only when the chosen pattern already has an
 * object and a compatible adjective.
 */
export type ObjectModifierPolicy = "omit" | "require" | "optional";

export const COMMUNICATIVE_FUNCTION_OBJECT_MODIFIER_POLICIES: Partial<
  Record<CommunicativeFunctionId, readonly ObjectModifierPolicy[]>
> = {
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
] as const satisfies readonly VerbSemanticType[];

export const COMMUNICATIVE_FUNCTION_GOVERNING_ACTS: Record<
  CommunicativeFunctionId,
  readonly VerbSemanticType[]
> = {
  describe: ["state", "existence"],
  "express-preference": ["preference"],
  "express-desire": ["preference"],
  "express-need": ["necessity"],
  "express-possession": ["possession"],
  "report-result": ["change", "creation"],
  "report-activities": ACTIVITY_ACTS,
  "report-event": ACTIVITY_ACTS,
  "ask-information": VERB_SEMANTIC_TYPES,
};

/** True when the verb's semantic act is one this Function accepts as verb1. */
export function verbGoverningActFitsFunction(
  functionId: string,
  verbSemanticType: unknown,
): boolean {
  if (!isCommunicativeFunctionId(functionId)) return false;
  if (typeof verbSemanticType !== "string" || !verbSemanticType.trim()) return false;
  return (
    COMMUNICATIVE_FUNCTION_GOVERNING_ACTS[functionId] as readonly string[]
  ).includes(verbSemanticType.trim());
}

/**
 * Editorial governing verbs. A Function in this map admits a verb1 only when
 * the lemma is listed. `VerbSemanticType` does not admit or reject that
 * Function. A Function absent from this map admits a verb1 only through
 * `verbGoverningActFitsFunction`.
 */
export const COMMUNICATIVE_FUNCTION_GOVERNING_VERBS: Partial<
  Record<CommunicativeFunctionId, readonly string[]>
> = {
  describe: ["be"],
  "express-preference": ["like"],
  "express-desire": ["want"],
  "express-need": ["need"],
  "express-possession": ["have"],
};

function governingVerbLemma(value: unknown): string {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

/** Lemmas that may govern the Function, or null when admission is the coarse type filter. */
export function communicativeFunctionGoverningVerbs(
  functionId: string,
): readonly string[] | null {
  if (!isCommunicativeFunctionId(functionId)) return null;
  const listed = COMMUNICATIVE_FUNCTION_GOVERNING_VERBS[functionId];
  return listed && listed.length > 0 ? listed : null;
}

/**
 * Final Function ↔ verb1 admission.
 * A named governing-verb list is the authority. Otherwise the coarse
 * `VerbSemanticType` filter is the authority.
 */
export function verbGovernsFunction(
  functionId: string,
  lemma: unknown,
  verbSemanticType: unknown,
): boolean {
  if (!isCommunicativeFunctionId(functionId)) return false;
  const listed = communicativeFunctionGoverningVerbs(functionId);
  if (listed) {
    const key = governingVerbLemma(lemma);
    return key !== "" && listed.some((item) => governingVerbLemma(item) === key);
  }
  return verbGoverningActFitsFunction(functionId, verbSemanticType);
}
