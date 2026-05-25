import { ErrorId } from "../errors";
import { Scene } from "../scene";
export type DrillExercise = {
    mode: "drill";
    scene: Scene;
    question: string;
    options: string[];
    correctIndex: number;
    errorId: ErrorId;
};
