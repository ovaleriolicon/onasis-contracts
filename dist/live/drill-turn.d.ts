export type DrillTurn = {
    mode: "drill";
    turnId: string;
    studentId: string;
    /**
     * Session Ecosystem for Drill word selection.
     * Required for Hangman; null/omit → client shows unavailable.
     */
    ecosystemId?: string | null;
};
