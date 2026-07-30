export type LiveStudent = {
  id: string;

  name: string;

  /** CurriculumStage id when selected via Stage; optional for legacy guests. */
  stageId?: string | null;

  vocabularyLevel: number;

  structureLevel: number;
};