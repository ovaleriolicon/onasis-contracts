import type { ObjectNumber, ObjectNumberSource } from "../grammar/object-number";
import type { CommunicativeFunctionId } from "./communicative-functions";
/**
 * Analytics / curriculum cursor for the selected Function of a turn.
 * Proto-Exponent fields are observability for F3.0 soft bias — not engine inputs.
 */
export type CommunicativeFunctionTurnMetadata = {
    functionId: CommunicativeFunctionId;
    ecosystemId: string;
    mode: string;
    /** ISO-8601 timestamp when the Function was selected. */
    timestamp: string;
    /** F3.0 Proto-Exponent id when this Function has a proto (else omitted/null). */
    protoExponent?: string | null;
    /** True when the Proto-Exponent successfully narrowed candidates. */
    protoExponentApplied?: boolean;
    /** True when Proto-Exponent was considered but fell back to full pool. */
    fallbackUsed?: boolean;
    /** Final object-number policy used for object realization (observability). */
    objectNumber?: ObjectNumber;
    /** Which layer supplied objectNumber: function | verb | fallback. */
    objectNumberSource?: ObjectNumberSource;
    /**
     * Function-level attributive object-modifier policy applied this turn
     * (observability; generateScene receives it via filters, not this object).
     */
    objectModifierPolicy?: "require";
};
