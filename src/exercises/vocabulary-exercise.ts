// packages/contracts/vocabulary-exercise.ts

import type { VocabularyItem } from "../vocabulary-item";

export type VocabularyExercise = {
  mode: "vocabulary";

  item: VocabularyItem;
};