import type { FluencyExercise } from "../exercises/fluency-exercise";

export type FluencyTurn = {
  turnId: string;

  studentId: string;

  exercise: FluencyExercise;
};