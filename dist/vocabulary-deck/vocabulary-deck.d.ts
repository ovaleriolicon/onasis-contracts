import type { VocabularyExercise } from "../exercises";
export type VocabularyDeck = {
    items: VocabularyExercise[];
};
export type CreateVocabularyDeckBody = {
    /**
     * Learner whose VocabularyKnowledge ranks the deck.
     * Practice: omit and the authenticated user is used.
     * Live: the LiveStudent id (enrolled or guest UUID).
     */
    userId?: string;
    /** Canonical Structure Level identity; server resolves to structureOrder. */
    structureLevelKey?: string;
    /** Legacy; ignored by the generator runtime. */
    vocabularyLevel?: number;
    /**
     * Session-only editorial pool. Omit / null / "all" → full catalog.
     */
    ecosystemId?: string | null;
};
export type CreateVocabularyDeckResponse = {
    success: true;
    items: VocabularyExercise[];
    ecosystemId: string | null;
};
export type RecordVocabularyExposureBody = {
    userId: string;
    words: string[];
};
export type RecordVocabularyExposureResponse = {
    success: true;
};
