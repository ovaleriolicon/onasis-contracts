export type LiveStudent = {
    id: string;
    name: string;
    /** CurriculumStage id when selected via Stage; optional for legacy guests. */
    stageId?: string | null;
    /**
     * Session-only editorial Ecosystem pool (guests).
     * Never persisted to User/Student/Mongo. Omit or null = no ecosystem filter.
     */
    ecosystemId?: string | null;
    vocabularyLevel: number;
    structureLevel: number;
};
