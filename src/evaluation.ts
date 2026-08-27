import type { Scene } from "./scene";

import type { ErrorId } from "./errors";

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

  tense: StructureTense;

  sentenceType: "statement" | "question";
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

  correctSentence: string;

  feedback: string;
};
