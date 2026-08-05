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
