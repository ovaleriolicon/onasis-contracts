import type { FluencyExercise } from "../exercises/fluency-exercise";

import type { CommunicativeFunctionTurnMetadata } from "../pedagogy/communicative-function-turn-metadata";

export type FluencyTurn = {
  mode: "fluency";

  studentId: string;

  /** Runtime turn id (optional in older clients). */
  turnId?: string;

  exercise: FluencyExercise;

  /**
   * F2: same Communicative Function selection as exercise.metadata.
   * Turn-level copy for Live analytics / anti-repeat echo.
   */
  metadata?: CommunicativeFunctionTurnMetadata;
};