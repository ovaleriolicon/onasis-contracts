// packages/contracts/live/fluency-turn.ts

import type { Scene } from "../scene";

export type FluencyTurn = {
  mode: "fluency";

  currentTurn: {
    studentId: string;

    question: {
      id: string;

      prompt: string;

      answer: string;

      scene: Scene;
    };
  };
};