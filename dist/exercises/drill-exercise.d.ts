import type { ErrorId } from "../errors";
import type { Scene } from "../scene";
/**
 * Legacy cloze / MCQ drill (fill-the-blank over a Scene).
 * `drillKind` omitted or `"cloze"` — Hangman uses `drillKind: "hangman"`.
 */
export type ClozeDrillExercise = {
    mode: "drill";
    drillKind?: "cloze";
    scene: Scene;
    question: string;
    options: string[];
    correctIndex: number;
    errorId: ErrorId;
};
/**
 * Modern Hangman drill — one lemma from the runtime Ecosystem noun pool.
 */
export type HangmanDrillExercise = {
    mode: "drill";
    drillKind: "hangman";
    word: string;
    ecosystemId: string;
    /** Spanish gloss when the catalog entry has a non-empty `translations.es`. */
    hint?: string;
};
export type DrillExercise = ClozeDrillExercise | HangmanDrillExercise;
