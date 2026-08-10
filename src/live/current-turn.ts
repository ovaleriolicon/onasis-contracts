import type { FluencyTurn } from "./fluency-turn";
import type { VocabularyTurn } from "./vocabulary-turn";
import type { DrillTurn } from "./drill-turn";

export type CurrentTurn =
  | FluencyTurn
  | VocabularyTurn
  | DrillTurn;
