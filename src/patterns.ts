import type { NounSemanticType } from "./semantics";
import type { VerbBehavior } from "./grammar/verb-behavior";
import type { ComplementType } from "./grammar/complement-type";
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
    verbBehavior: VerbBehavior;

    complements?: ComplementType[];
  };

  slots?: {
    object?: NounSemanticType[];

    place?: NounSemanticType[];

    adjective?: boolean;

    pronoun?: boolean;
  };

  allowedTenses: Tense[];

  allowedPolarity: Polarity[];

  allowedSentenceTypes: SentenceType[];
};
