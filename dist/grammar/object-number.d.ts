export declare const OBJECT_NUMBERS: readonly ["generic", "singular", "plural"];
export type ObjectNumber = (typeof OBJECT_NUMBERS)[number];
export type ObjectNumberSource = "function" | "verb" | "fallback";
export declare const OBJECT_NUMBER_LABELS: Record<ObjectNumber, string>;
