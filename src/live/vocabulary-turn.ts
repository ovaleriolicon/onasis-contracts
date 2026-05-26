// packages/contracts/live/vocabulary-turn.ts

import type { VocabularyExercise } from "../exercises/vocabulary-exercise";

export type VocabularyTurn = {
  mode: "vocabulary";

  turnId: string;

  studentId: string;

  exercise: VocabularyExercise;
};