// packages/contracts/vocabulary-item.ts

export type VocabularyOption = {
  label: string;

  correct: boolean;
};

export type VocabularyItem = {
  type: string;

  question: string;

  word: string;

  translation: string;

  vocabAudioUrl?: string;

  options: VocabularyOption[];
};