// pedagogy/communicative-function-turn-metadata.ts
//
// F2: selected Communicative Function for a turn (authorization already on Ecosystem).
// Consumed as turn/exercise metadata only — generateScene must ignore this.

import type { CommunicativeFunctionId } from "./communicative-functions";

/**
 * Analytics / curriculum cursor for the selected Function of a turn.
 * Not a generation input. Not weights. Not exponents.
 */
export type CommunicativeFunctionTurnMetadata = {
  functionId: CommunicativeFunctionId;
  ecosystemId: string;
  mode: string;
  /** ISO-8601 timestamp when the Function was selected. */
  timestamp: string;
};
