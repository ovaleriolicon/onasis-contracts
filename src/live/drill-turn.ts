// packages/contracts/live/drill-turn.ts
//
// Live Drill turn — Hangman (and future drill kinds) fetch their own
// exercises; the turn only binds student + ecosystem for the session.

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
