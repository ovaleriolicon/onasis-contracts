import type { SemanticType } from "./lexicon";

import type {
  Tense,
  Polarity,
} from "./scene";

export type PatternType =
  | "verb-object"
  | "to-be-adjective"
  | "go-place"
  | "pronoun-to-be";

export type Pattern = {
  id: string;

  type: PatternType;

  unlockedAtStructureLevel: number;

  tenseUnlocks?: Partial<
    Record<Tense, number>
  >;

  polarityUnlocks?: Partial<
    Record<Polarity, number>
  >;

  structure: {
    verb: string;

    object?: "dynamic";

    adjective?: "dynamic";

    preposition?: "to";

    place?: "dynamic";
  };

  slots?: {
    object?: SemanticType[];

    place?: SemanticType[];

    adjective?: boolean;
  };

  meaning: {
    es: {
      third: string;

      nonThird: string;

      second?: string;

      first?: string;

      firstPlural?: string;
    };
  };

  allowedTenses: Tense[];

  allowedPolarity: Polarity[];
};