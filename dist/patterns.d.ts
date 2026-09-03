import type { NounSemanticType } from "./semantics";
import type { VerbBehavior } from "./grammar/verb-behavior";
import type { ComplementType } from "./grammar/complement-type";
import type { Tense, Polarity, SentenceType } from "./scene";
import type { StructureUnlockRef } from "./pedagogy/resolve-structure-unlock";
export type PatternType = "verb-object" | "verb-place" | "to-be-adjective" | "verb-infinitive-object" | "verb-infinitive-place";
export type Pattern = {
    id: PatternType;
    /**
     * Stable unlock identity (catalog key).
     * Runtime resolves key → order.
     */
    unlockedAtStructureKey?: string;
    sentenceTypeUnlocks?: Partial<Record<SentenceType, StructureUnlockRef>>;
    tenseUnlocks?: Partial<Record<Tense, StructureUnlockRef>>;
    polarityUnlocks?: Partial<Record<Polarity, StructureUnlockRef>>;
    /** Subject form unlocks (pronoun/name) — catalog keys only. */
    subjectUnlocks?: Partial<Record<"pronoun" | "name", StructureUnlockRef>>;
    structure: {
        verbBehavior: VerbBehavior;
        complements?: ComplementType[];
    };
    slots?: {
        object?: NounSemanticType[];
        place?: NounSemanticType[];
        adjective?: boolean;
        pronoun?: boolean;
    };
    allowedTenses: Tense[];
    allowedPolarity: Polarity[];
    allowedSentenceTypes: SentenceType[];
};
