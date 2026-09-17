export declare const OBJECT_NUMBERS: readonly ["generic", "singular", "plural"];
export type ObjectNumber = (typeof OBJECT_NUMBERS)[number];
export type ObjectNumberSource = "function" | "verb" | "fallback";
export declare const NOUN_LEXICAL_OBJECT_NUMBERS: readonly ["singular", "plural"];
export type NounLexicalObjectNumber = (typeof NOUN_LEXICAL_OBJECT_NUMBERS)[number];
export declare const OBJECT_NUMBER_LABELS: Record<ObjectNumber, string>;
export declare function isObjectNumber(value: unknown): value is ObjectNumber;
export declare function isNounLexicalObjectNumber(value: unknown): value is NounLexicalObjectNumber;
