export type LiveStudent = {
    id: string;
    name: string;
    /**
     * Session-only editorial Ecosystem pool.
     * Never persisted to User/Mongo. Omit or null = no ecosystem filter.
     */
    ecosystemId?: string | null;
    /**
     * Legacy field kept for API compatibility. Ignored by generation runtime.
     * Callers may omit or send 0.
     */
    vocabularyLevel?: number;
    /**
     * Frozen legacy ordinal (S0–S13) when the student sits on a historical SL.
     * Optional for key-only Structure Levels (e.g. adjective-noun-phrases).
     */
    structureLevel?: number;
    /** Stable Structure Level key when known (preferred for key-only SLs). */
    structureLevelKey?: string;
};
