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
    /** Canonical Structure Level identity (catalog key). */
    structureLevelKey: string;
};
