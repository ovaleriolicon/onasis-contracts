import type { SemanticType } from "./lexicon";

export type PatternType = "verb-object" | "to-be-adjective" | "go-place";

import type { Tense, Polarity } from "./scene";

export type Pattern = {
  id: string;

  unlockAtModule: number;

  unlockAtModuleByTense?: {
    [key in Tense]?: number;
  };

  type: PatternType;

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
