import type { SubjectEntry, VerbEntry, NounEntry, AdjectiveEntry } from "./lexicon";
import type { PatternType } from "./patterns";
import type { VerbBehavior } from "./grammar/verb-behavior";
import type { ObjectNumber, ObjectNumberSource } from "./grammar/object-number";
export type Polarity = "affirmative" | "negative";
export type SentenceType = "statement" | "question";
export type Tense = "present" | "past" | "present-progressive" | "past-progressive";
export type Scene = {
    patternId: PatternType;
    correctSentence: string;
    subject: SubjectEntry;
    verb: VerbEntry;
    object?: NounEntry;
    place?: NounEntry;
    requiresObject?: boolean;
    adjective?: AdjectiveEntry;
    auxiliary?: string;
    polarity: Polarity;
    sentenceType: SentenceType;
    verbBehavior: VerbBehavior;
    tense: Tense;
    target: {
        index: number;
    };
    /** Final object-number used for object NP realization (NLG observability). */
    objectNumber?: ObjectNumber;
    /** Which layer supplied objectNumber: function | verb | fallback. */
    objectNumberSource?: ObjectNumberSource;
};
