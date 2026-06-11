export type SemanticType = "person" | "object" | "place" | "abstract" | "state" | "food" | "activity" | "concept" | "event" | "movement";
export type DeterminerPolicy = "none" | "indefinite" | "definite" | "plural" | "some" | "any";
export type SubjectEntry = {
    value: string;
    translation: string;
    form: "pronoun" | "name";
    person: "third-singular" | "non-third";
    grammar: {
        person: 1 | 2 | 3;
        number: "singular" | "plural";
    };
    semantics: {
        type: "person";
        animate: true;
    };
};
export type NounEntry = {
    id: string;
    lemma: string;
    translations: {
        es: string;
    };
    adjective?: string;
    grammar: {
        countable: boolean;
        defaultDeterminer: DeterminerPolicy;
    };
    semantics: {
        type: SemanticType;
        animate: boolean;
    };
    pedagogy?: {
        unlockedAtVocabularyLevel: number;
    };
};
export type VerbEntry = {
    base: string;
    behavior: "to-be" | "no-to-be";
    transitive: boolean;
    semantics: {
        type: SemanticType;
        requiresAnimateSubject?: boolean;
        requiresPreposition?: string;
    };
    ppp?: readonly [string, string, string];
    forms?: {
        present: {
            firstSingular: string;
            thirdSingular: string;
            plural: string;
        };
        negative: {
            firstSingular: string;
            thirdSingular: string;
            plural: string;
        };
    };
    spanish?: {
        lemma: string;
    };
};
export type AdjectiveEntry = {
    id: string;
    base: string;
    translation?: string;
    audioUrl?: string;
    unlockedAtVocabularyLevel: number;
    semantics: {
        type?: "state" | "quality";
        appliesTo?: SemanticType[];
    };
};
