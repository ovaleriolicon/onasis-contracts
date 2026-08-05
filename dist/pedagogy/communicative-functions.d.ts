export declare const COMMUNICATIVE_FUNCTIONS: readonly ["describe", "express-preference", "express-desire", "express-need", "express-possession", "talk-about-activities", "report-result", "ask-information"];
export type CommunicativeFunctionId = (typeof COMMUNICATIVE_FUNCTIONS)[number];
export declare const COMMUNICATIVE_FUNCTION_LABELS: Record<CommunicativeFunctionId, string>;
export declare function isCommunicativeFunctionId(value: string): value is CommunicativeFunctionId;
