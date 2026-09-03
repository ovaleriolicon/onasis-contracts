import type { Scene } from "./scene";

import type { ErrorId } from "./errors";

import type { ConstructionStep } from "./construction/construction-step";

//
// INPUT
//

export type EvaluateInput = {
  scene: Scene;

  answer: string;
};

//
// PARSER
//

export type ParsedInput = {
  subject?: string;

  auxiliary?: string;

  verb?: string;

  object?: string;

  adjective?: string;

  be?: string;

  negation?: boolean;

  /** Present when the learner produced "to" before verb2 (Double Verb). */
  infinitiveMarker?: "to";

  /** Observed verb2 base/form after "to" (Double Verb). */
  infinitiveVerb?: string;

  tense: "present" | "past" | "unknown";

  sentenceType: "statement" | "question";

  tokens: string[];
};

//
// STRUCTURAL IR (Path B)
// Neutral projection of Scene (expected) and ParsedInput (answer).
// Detectors may ignore these until migrated; evaluateAnswer result
// must not depend on them until an intentional detector PR.
//

export type StructureTense = "present" | "past" | "unknown";

export type SentenceStructure = {
  subject: string | null;

  auxiliary: string | null;

  be: string | null;

  negation: boolean;

  verb: string | null;

  object: string | null;

  adjective: string | null;

  /**
   * Expected/observed "to" before verb2. Null on single-verb structures.
   * Derived for expected IR from pattern; not stored on Scene.
   */
  infinitiveMarker: "to" | null;

  /** verb2 surface (base). Null on single-verb structures. */
  infinitiveVerb: string | null;

  tense: StructureTense;

  sentenceType: "statement" | "question";
};

/**
 * Minimal object NP IR (PR-NP1).
 * Does not replace SentenceStructure.object (still a surface blob).
 *
 * `modifierOrder` preserves attributive adjective vs noun order so
 * "a fast computer" and "a computer fast" are distinguishable without
 * re-parsing the original string. Null when no adjective slot is filled.
 */
export type ObjectNpModifierOrder = "before_noun" | "after_noun";

export type ObjectNpStructure = {
  determiner: string | null;

  adjective: string | null;

  noun: string | null;

  /** Relative order of adjective vs noun when both are non-null. */
  modifierOrder: ObjectNpModifierOrder | null;

  /**
   * True when segmentation abstained (unknown tokens / unsupported shape).
   * Detectors must not invent errors from ambiguous structures.
   */
  ambiguous: boolean;
};

//
// CONTEXT
//

export type EvaluatorContext = {
  scene: Scene;

  parsed: ParsedInput;

  normalizedAnswer: string;

  correctSentence: string;

  /** Pedagogical expected slots realized from Scene (not from parsing correctSentence). */
  expectedStructure: SentenceStructure;

  /** Answer slots projected from ParsedInput (inherits parser quirks). */
  answerStructure: SentenceStructure;

  /**
   * Expected object NP from Scene + NLG determiner policy (PR-NP1).
   * Null when Scene has no object. Unused by detectors until NP2+.
   */
  expectedObjectNp: ObjectNpStructure | null;

  /**
   * Answer object NP segmented from ParsedInput.object with Scene guidance (PR-NP1).
   * Null when no object blob. Unused by detectors until NP2+.
   */
  answerObjectNp: ObjectNpStructure | null;
};

//
// ERRORS
//

export type DetectedError = {
  errorId: ErrorId;
};

//
// CHECKS
//

export type CheckResult = {
  correct: boolean;

  detectedErrors: DetectedError[];
};

export type DebugCheckResult = {
  name: string;

  correct: boolean;

  detectedErrors: DetectedError[];
};

export type CheckFunction = (context: EvaluatorContext) => CheckResult;

//
// VALIDATION
//

export type ValidationResult =
  | {
      correct: true;
    }
  | {
      correct: false;

      detectedErrors: DetectedError[];
    };

//
// FINAL RESULT
//

export type EvaluateResult = {
  success: boolean;

  correct: boolean;

  detectedErrors: DetectedError[];

  /**
   * Priority V2 selection — the single error Correction should repair first.
   * Null when correct, when there are no detected errors, or when Priority
   * produces no selection. Same decision as evaluateAnswer uses for feedback.
   */
  primaryError: DetectedError | null;

  /**
   * Correction Tutor V1 steps for `primaryError` (MINIMUM NECESSARY REPAIR).
   * Empty when correct, when there is no primary, or when the primary ErrorId
   * is not yet supported by Correction Core. Never falls back to Construction 0→100.
   */
  correctionExplanation: ConstructionStep[];

  correctSentence: string;

  feedback: string;
};

export type EvaluateDebugResult = {
  success: boolean;

  correct: boolean;

  parsed: ParsedInput;

  checks: DebugCheckResult[];

  detectedErrors: DetectedError[];

  primaryError: DetectedError | null;

  correctionExplanation: ConstructionStep[];

  correctSentence: string;

  feedback: string;
};
