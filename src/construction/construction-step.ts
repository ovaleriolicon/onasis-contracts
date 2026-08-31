// construction-step.ts

import type { PedagogySegment } from "./pedagogy-segment";

export type ConstructionSlot =
  | "subject"
  | "be"
  | "verb"
  | "object"
  | "object-adjective"
  | "place"
  | "negation"
  | "adjective"
  | "auxiliary"
  | "moved-be";

export type ConstructionState = {
  subject: string;
  be: string;
  movedBe: string;
  auxiliary: string;
  verb: string;
  object: string;
  /** Attributive modifier of the object NP (not predicative `adjective`). */
  objectAdjective: string;
  place: string;
  adjective: string;
  negation: string;
};

/** Speakable pedagogical steps: segments are canonical; text is display derived from them. */
type SpeakableConstructionStep = {
  segments: PedagogySegment[];
  /** Derived display string — clients may keep reading this field. */
  text: string;
};

export type ConstructionStep =
  | {
      type: "question";
      question: string;
      answer: string;
    }
  | {
      type: "multiple-choice";
      /**
       * Display string for the MC prompt. Always derived by Engine from
       * `promptSegments` via literal concatenation (not `renderDisplay` quotes).
       */
      question: string;

      /**
       * Canonical bilingual (or monolingual) speakable prompt for TTS.
       * Clients must not infer language from `question`.
       */
      promptSegments: PedagogySegment[];

      options: string[];

      correctAnswer: string;

      builderToken: string;

      slot: ConstructionSlot;

      /**
       * Optional Engine-authored feedback for incorrect options, keyed by option
       * value (never by shuffled index). Absent for correctAnswer. Clients look up
       * by option value — they must not infer grammar from scene.
       */
      incorrectFeedbackByOption?: {
        [option: string]: {
          segments: PedagogySegment[];
          /** Derived display string from segments. */
          text: string;
        };
      };
    }
  | ({
      type: "explanation";
    } & SpeakableConstructionStep)
  | ({
      type: "rule";
    } & SpeakableConstructionStep)
  | {
      type: "result";
      text: string;
    }
  | ({
      type: "transition";
    } & SpeakableConstructionStep);
