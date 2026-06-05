import type { SubjectEntry, VerbEntry, NounEntry, AdjectiveEntry } from "./lexicon";
export type Polarity = "affirmative" | "negative";
export type SentenceType = "statement" | "question";
export type VerbBehavior = "to-be" | "no-to-be";
export type Tense = "present" | "past";
export type Scene = {
    patternId: string;
    correctSentence: string;
    subject: SubjectEntry;
    verb: VerbEntry;
    object?: NounEntry;
    place?: NounEntry;
    requiresObject?: boolean;
    adjective?: AdjectiveEntry;
    auxiliary?: string;
    polarity: Polarity;
    verbBehavior: VerbBehavior;
    tense: Tense;
    target: {
        index: number;
    };
};
