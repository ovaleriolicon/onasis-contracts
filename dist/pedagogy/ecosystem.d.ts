import type { CommunicativeFunctionId } from "./communicative-functions";
/**
 * Editorial reference to a lexicon entry by type.
 * Does not embed grammar/semantics.
 *
 * For verb/noun/adjective: `lemma` is the VocabularyItem lemma.
 * For subject: `lemma` holds the Subject `value` (e.g. "I", "Alex").
 * Subjects are not VocabularyItems; the field name is kept for a uniform ref shape.
 */
export type EcosystemMemberRef = {
    type: "subject" | "verb" | "noun" | "adjective";
    lemma: string;
};
/**
 * Canonical Ecosystem (v1 — catalog + explorer only).
 *
 * `functions` (F1): authorized Communicative Function ids only.
 * Presence = authorization. Not weights, exponents, patterns, or selection policy.
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
    /**
     * Authorized communicative acts for this Ecosystem (F1).
     * Ids must belong to COMMUNICATIVE_FUNCTIONS.
     * Order is an editorial hint only — not runtime selection weight.
     */
    functions: CommunicativeFunctionId[];
    active: boolean;
    members: {
        subjects: EcosystemMemberRef[];
        verbs: EcosystemMemberRef[];
        nouns: EcosystemMemberRef[];
        adjectives: EcosystemMemberRef[];
    };
};
