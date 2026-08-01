/**
 * Reference to a lexicon lemma by type.
 * Does not embed grammar/semantics — those stay on VocabularyItem.
 */
export type EcosystemMemberRef = {
    type: "verb" | "noun" | "adjective";
    lemma: string;
};
/**
 * Canonical Ecosystem (v1 — catalog + explorer only).
 *
 * Future fields under consideration (NOT in this contract yet):
 * - previousEcosystemId / inheritsMembersFromPrevious (family growth chain)
 * - suggestedVocabularyBand / suggestedStructureFocus (soft S/V hints)
 * - selection policy (preferMembers, allowFallbackOutside)
 * - interestKeys / legacyTopics (personalization bridges)
 * - rationale, examples, estimatedLessons, completionHints
 *
 * See backend docs/curriculum/ecosystems.md for evolution notes.
 */
export type Ecosystem = {
    id: string;
    /** Growth line, e.g. "food" for Food 1 / Food 2 / Food 3. */
    familyId: string;
    /** Depth within the family; starts at 1. */
    tier: number;
    /** Global catalog order for explorers. */
    order: number;
    name: string;
    description: string;
    /** Student-facing ability, e.g. "I can say what food I like." */
    communicativeGoal: string;
    active: boolean;
    members: {
        verbs: EcosystemMemberRef[];
        nouns: EcosystemMemberRef[];
        adjectives: EcosystemMemberRef[];
    };
};
