// packages/contracts/scene.ts

import type {
  SubjectEntry,
  VerbEntry,
  NounEntry,
  AdjectiveEntry,
} from "./lexicon";

import type { PatternType } from "./patterns";

export type Polarity = "affirmative" | "negative";

export type SentenceType = "statement" | "question";

export type VerbBehavior = "to-be" | "no-to-be";

export type Tense =
  | "present"
  | "past"
  | "present-progressive"
  | "past-progressive";

export type Scene = {
  patternId: PatternType;

  correctSentence: string;

  subject: SubjectEntry;

  verb: VerbEntry;

  object?: NounEntry;

  place?: NounEntry;

  requiresObject?: boolean;

  adjective?: AdjectiveEntry;

  auxiliary?: string;

  polarity: Polarity;

  sentenceType: SentenceType;

  verbBehavior: VerbBehavior;

  tense: Tense;

  target: {
    index: number;
  };
};
