import type { CurriculumStage, CurriculumStageValidationResult } from "./curriculum-stage";
export declare const curriculumStages: CurriculumStage[];
export declare function getCurriculumStage(id: string): CurriculumStage | undefined;
export declare function getCurriculumStagesSorted(): CurriculumStage[];
/**
 * Validates that every stage references known structure/vocabulary levels
 * and that ids / previousStageId links are consistent.
 *
 * @param knownVocabularyLevels — level numbers that exist in the vocab axis
 *   (e.g. from curriculum_levels or distinct unlock values in content).
 */
export declare function validateCurriculumStages(stages?: readonly CurriculumStage[], knownVocabularyLevels?: readonly number[]): CurriculumStageValidationResult;
