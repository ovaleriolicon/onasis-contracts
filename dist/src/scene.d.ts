import { SubjectEntry } from "./lexicon";
export type Polarity = "affirmative" | "negative";
export type VerbBehavior = "to-be" | "no-to-be";
export type Tense = "present" | "past";
export type Scene = {
    patternId: string;
    correctSentence: string;
    subject: SubjectEntry;
    verb: string;
    object?: string;
    requiresObject?: boolean;
    adjective?: string;
    auxiliary?: string;
    polarity: Polarity;
    verbBehavior: VerbBehavior;
    tense: Tense;
    target: {
        index: number;
    };
};
