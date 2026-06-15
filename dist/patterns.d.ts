import type { SemanticType } from "./lexicon";
import type { Tense, Polarity, SentenceType } from "./scene";
export type PatternType = "verb-object" | "to-be-adjective" | "go-place";
export type Pattern = {
    id: string;
    type: PatternType;
    unlockedAtStructureLevel: number;
    sentenceTypeUnlocks?: Partial<Record<SentenceType, number>>;
    tenseUnlocks?: Partial<Record<Tense, number>>;
    polarityUnlocks?: Partial<Record<Polarity, number>>;
    subjectUnlocks?: Partial<Record<"pronoun" | "name", number>>;
    structure: {
        verb: string;
        object?: "dynamic";
        adjective?: "dynamic";
        place?: "dynamic";
        pronoun?: "dynamic";
    };
    slots?: {
        object?: SemanticType[];
        place?: SemanticType[];
        adjective?: boolean;
        pronoun?: boolean;
    };
    meaning: {
        es: {
            third: string;
            nonThird: string;
            second?: string;
            first?: string;
            firstPlural?: string;
        };
    };
    allowedTenses: Tense[];
    allowedPolarity: Polarity[];
    allowedSentenceTypes: SentenceType[];
};
