/**
 * Optional session context for Construction Tutor narrative (Engine input).
 * Clients may supply turnIndex in a later phase; firstName is resolved by the backend.
 */
export type TutorContext = {
    /**
     * Constructions already completed in this session. 0 = first construction.
     * Reserved for intro/continuity policy (Phase 4+).
     */
    turnIndex?: number;
    /**
     * Sanitized first name for optional personalization (Phase 5+).
     * Engine must treat as absent when undefined.
     */
    firstName?: string;
};
