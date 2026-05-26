import type { VocabularyExercise } from "../exercises";
export type VocabularyTurn = {
    mode: "vocabulary";
    turnId: string;
    studentId: string;
    exercise: VocabularyExercise;
};
