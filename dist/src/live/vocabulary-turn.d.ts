import type { VocabularyItem } from "../vocabulary-item";
export type VocabularyTurn = {
    mode: "vocabulary";
    currentTurn: {
        studentId: string;
        item: VocabularyItem;
    };
};
