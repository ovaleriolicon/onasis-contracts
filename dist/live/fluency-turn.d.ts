import type { FluencyExercise } from "../exercises/fluency-exercise";
export type FluencyTurn = {
    mode: "fluency";
    studentId: string;
    exercise: FluencyExercise;
};
