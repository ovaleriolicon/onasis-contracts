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
};
