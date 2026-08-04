// semantics/verb-roles.ts
//
// Semantic Ontology v2 — verb role selection (contracts only).
// See: backend/docs/curriculum/semantic-ontology-v2-specification.md

import type { NounSemanticType } from "./noun-semantic-type";
import type { AdjectiveSemanticType } from "./adjective-semantic-type";

export const VERB_ROLES = ["agent", "theme", "goal", "attribute"] as const;

export type VerbRole = (typeof VERB_ROLES)[number];

/** Agent: who performs or experiences the action (subject slot). */
export type VerbAgentRole = {
  selection: {
    animate?: boolean;
  };
};

/** Theme: affected / chosen / experienced participant (direct object). */
export type VerbThemeRole = {
  selection: {
    classes: NounSemanticType[];
  };
};

/** Goal: destination or location oriented by the action. */
export type VerbGoalRole = {
  selection: {
    classes: NounSemanticType[];
  };
};

/**
 * Attribute: adjectival predicative (copula).
 * `selection.adjectiveTypes` is optional; omit when unconstrained.
 */
export type VerbAttributeRole = {
  selection?: {
    adjectiveTypes?: AdjectiveSemanticType[];
  };
};

/**
 * Optional role map on VerbEntry.semantics.
 * Declare only roles the verb participates in.
 */
export type VerbRoles = {
  agent?: VerbAgentRole;
  theme?: VerbThemeRole;
  goal?: VerbGoalRole;
  attribute?: VerbAttributeRole;
};
