import type { NounSemanticType } from "../semantics/noun-semantic-type";
import type { AdjectiveSemanticType } from "../semantics/adjective-semantic-type";
export declare const LEXICON_PROBE_SCHEMA_VERSION: "1.0.0";
export type DualReadSource = "roles.theme" | "objectTypes" | "roles.goal" | "placeTypes" | "none";
export type SlotHardPoolEvidence = {
    source: DualReadSource;
    classes: NounSemanticType[];
    hardPoolSize: number;
    typeHistogram: Partial<Record<NounSemanticType, number>>;
    chosenType?: NounSemanticType;
};
export type LexiconProbeChosen = {
    verb: string;
    subject: string;
    object?: string;
    place?: string;
    adjective?: string;
};
export type LexiconProbePredicative = {
    lemma: string;
    type?: AdjectiveSemanticType;
    applicableTo: NounSemanticType[];
    requiresDeterminer: boolean;
};
/**
 * One scene → one probe. Evidence only.
 */
export type LexiconProbe = {
    schemaVersion: typeof LEXICON_PROBE_SCHEMA_VERSION;
    meta: {
        ecosystemId: string;
        seed: number | null;
        sceneIndex: number;
        fingerprint: string;
    };
    sentence: {
        correctSentence: string;
        patternId: string;
    };
    chosen: LexiconProbeChosen;
    /** Present when the scene has an object (or Theme was resolved for the verb). */
    theme?: SlotHardPoolEvidence;
    /** Present when the scene has a place (or Goal was resolved for the verb). */
    goal?: SlotHardPoolEvidence;
    predicative?: LexiconProbePredicative;
    catalog: {
        inputNounCount: number;
        inputVerbCount: number;
        inputAdjectiveCount: number;
        inputSubjectCount: number;
    };
};
