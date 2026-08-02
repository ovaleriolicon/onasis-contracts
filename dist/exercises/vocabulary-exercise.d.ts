export type VocabularyVerbForms = {
    /** Infinitive / base form */
    base: string;
    /** Simple past */
    past: string;
    /** Past participle */
    pastParticiple: string;
};
export type VocabularyExercise = {
    mode: "vocabulary";
    question: string;
    options: Array<{
        label: string;
        correct: boolean;
    }>;
    word: string;
    translation: string;
    vocabAudioUrl?: string;
    /** Lexical category for presentation (verbs show PPP forms). */
    vocabType?: "noun" | "adjective" | "verb";
    /** Present when vocabType is "verb" — from VocabularyItem.grammar.ppp */
    verbForms?: VocabularyVerbForms;
};
