import type { NounSemanticType } from "./semantics";
import type { VerbBehavior } from "./grammar/verb-behavior";
import type { ComplementType } from "./grammar/complement-type";
import type { Tense, Polarity, SentenceType } from "./scene";
import type { StructureUnlockRef } from "./pedagogy/resolve-structure-unlock";

export type PatternType = "verb-object" | "verb-place" | "to-be-adjective";

export type Pattern = {
  id: PatternType;

  /**
   * Preferred stable unlock identity (catalog key).
   * When set, runtime resolves key → order.
   */
  unlockedAtStructureKey?: string;

  /**
   * Legacy numeric unlock (S0–S13). Used when key is absent.
   * Prefer unlockedAtStructureKey for new definitions.
   */
  unlockedAtStructureLevel?: number;

  sentenceTypeUnlocks?: Partial<Record<SentenceType, StructureUnlockRef>>;

  tenseUnlocks?: Partial<Record<Tense, StructureUnlockRef>>;

  polarityUnlocks?: Partial<Record<Polarity, StructureUnlockRef>>;

  /**
   * Subject form unlocks (pronoun/name). Prefer catalog keys;
   * legacy numbers still resolve via resolveStructureUnlockOrder.
   */
  subjectUnlocks?: Partial<Record<"pronoun" | "name", StructureUnlockRef>>;

  structure: {
    verbBehavior: VerbBehavior;

    complements?: ComplementType[];
  };

  slots?: {
    object?: NounSemanticType[];

    place?: NounSemanticType[];

    adjective?: boolean;

    pronoun?: boolean;
  };

  allowedTenses: Tense[];

  allowedPolarity: Polarity[];

  allowedSentenceTypes: SentenceType[];
};
