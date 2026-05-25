// packages/contracts/live/vocabulary-turn.ts

import type { VocabularyItem } from "../vocabulary-item";

export type VocabularyTurn = {
  mode: "vocabulary";

  currentTurn: {
    studentId: string;

    item: VocabularyItem;
  };
};