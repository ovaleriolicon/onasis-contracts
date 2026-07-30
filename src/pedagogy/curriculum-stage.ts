// pedagogy/curriculum-stage.ts
//
// Pedagogical journey unit. References Structure + Vocabulary levels.
// The game engine must never import or depend on CurriculumStage.

export type CurriculumStage = {
  id: string;

  order: number;

  name: string;

  description: string;

  /** Engine grammar axis (patterns unlock). */
  structureLevel: number;

  /** Engine lexicon axis (VocabularyItem unlocks). */
  vocabularyLevel: number;

  /** Student-facing ability, e.g. "I can talk about how I feel." */
  communicativeGoal: string;

  /**
   * Why this stage exists in the journey (editors / curriculum design).
   * Not an engine gate.
   */
  rationale?: string;

  examples?: string[];

  /** Soft guidance for teachers / future automation (not an engine gate). */
  completionCriteria?: string;

  estimatedLessons?: number;

  previousStageId?: string;
};

export type CurriculumStageValidationIssue = {
  /** Stage id, or "*" for catalog-level issues (e.g. uncovered structure levels). */
  stageId: string;
  code:
    | "invalid_structure_level"
    | "invalid_vocabulary_level"
    | "unknown_previous_stage"
    | "duplicate_id"
    | "duplicate_order"
    | "uncovered_structure_level";
  message: string;
};

export type CurriculumStageValidationResult = {
  ok: boolean;
  issues: CurriculumStageValidationIssue[];
};
