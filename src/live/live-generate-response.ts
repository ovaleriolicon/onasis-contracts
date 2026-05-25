// packages/contracts/live/live-generate-response.ts

import type { FluencyTurn } from "./fluency-turn";

import type { VocabularyTurn } from "./vocabulary-turn";

export type LiveGenerateResponse =
  | FluencyTurn
  | VocabularyTurn;