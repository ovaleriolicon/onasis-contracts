import type { SemanticType } from "./lexicon";
import type { Tense, Polarity, SentenceType } from "./scene";

export type PatternType = "verb-object" | "verb-place" | "to-be-adjective";

export type Pattern = {
  id: PatternType;

  unlockedAtStructureLevel: number;

  sentenceTypeUnlocks?: Partial<Record<SentenceType, number>>;

  tenseUnlocks?: Partial<Record<Tense, number>>;

  polarityUnlocks?: Partial<Record<Polarity, number>>;

  subjectUnlocks?: Partial<Record<"pronoun" | "name", number>>;

  structure: {
    verbBehavior: "to-be" | "no-to-be";

    complements?: ("object" | "place" | "adjective")[];
  };

  slots?: {
    object?: SemanticType[];

    place?: SemanticType[];

    adjective?: boolean;

    pronoun?: boolean;
  };

  allowedTenses: Tense[];

  allowedPolarity: Polarity[];

  allowedSentenceTypes: SentenceType[];
};
