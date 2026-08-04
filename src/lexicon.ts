// packages/contracts/lexicon.ts

import type {
  NounSemanticType,
  SubjectSemanticType,
  VerbSemanticType,
  AdjectiveSemanticType,
  VerbRoles,
} from "./semantics";
import type { DeterminerPolicy } from "./grammar/determiner-policy";
import type { VerbBehavior } from "./grammar/verb-behavior";
import type { ComplementType } from "./grammar/complement-type";
import type { ObjectNumber } from "./grammar/object-number";
import type { Topic } from "./topics";

/**
 * @deprecated Usa `NounSemanticType`, `VerbSemanticType` o
 * `AdjectiveSemanticType` según corresponda (ver ./semantics). Se mantiene
 * únicamente por compatibilidad mientras se completa la migración de la
 * taxonomía semántica; no lo uses para declarar campos nuevos. Se
 * eliminará en una fase posterior de la migración.
 */
export type SemanticType =
  | NounSemanticType
  | VerbSemanticType
  | AdjectiveSemanticType;

// DeterminerPolicy, VerbBehavior, ComplementType y ObjectNumber ahora
// viven en grammar/ (fuente única de verdad). Se re-exportan igual desde
// @onasis/contracts a través del barrel de grammar/, así que ningún
// consumidor existente se rompe.

export type SubjectEntry = {
  value: string;

  translation: string;

  form: "pronoun" | "name";

  person: "third-singular" | "non-third";

  grammar: {
    person: 1 | 2 | 3;

    number: "singular" | "plural";
  };

  semantics: {
    /** Shared taxonomy with nouns (person, object, animal, place, …). */
    type: SubjectSemanticType;

    animate: boolean;
  };
};

export type NounEntry = {
  id: string;

  lemma: string;

  translations: {
    es: string;
  };

  adjective?: string;

  grammar: {
    countable: boolean;

    defaultDeterminer: DeterminerPolicy;

    defaultPreposition?: string;

    /**
     * When true, place phrases stay bare (e.g. "home") even if the verb
     * declares semantics.requiresPreposition.
     */
    omitPlacePreposition?: boolean;
  };

  semantics: {
    type: NounSemanticType;

    animate: boolean;
  };

  pedagogy?: {
    unlockedAtVocabularyLevel: number;

    interests?: string[];

    topics?: Topic[];
  };
};

export type VerbEntry = {
  base: string;

  behavior: VerbBehavior;

  complements: ComplementType[];

  transitive: boolean;

  semantics: {
    type: VerbSemanticType;

    /**
     * Semantic Ontology v2 role selection.
     * Optional; absent on all v1 documents. Runtime must ignore until dual-read.
     */
    roles?: VerbRoles;

    /**
     * @deprecated Use `roles.agent.selection.animate` (Semantic Ontology v2).
     */
    requiresAnimateSubject?: boolean;

    requiresPreposition?: string;

    /**
     * @deprecated Use `roles.theme.selection.classes` (Semantic Ontology v2).
     */
    objectTypes?: NounSemanticType[];

    /**
     * @deprecated Use `roles.goal.selection.classes` (Semantic Ontology v2).
     */
    placeTypes?: NounSemanticType[];

    /**
     * @deprecated Use `roles.attribute.selection.adjectiveTypes` when a partial
     * filter is needed; omit the filter when unconstrained (Semantic Ontology v2).
     */
    adjectiveTypes?: AdjectiveSemanticType[];
  };

  ppp?: readonly [string, string, string];

  forms?: {
    present: {
      firstSingular: string;
      thirdSingular: string;
      plural: string;
    };

    negative: {
      firstSingular: string;
      thirdSingular: string;
      plural: string;
    };
  };

  spanish?: {
    lemma: string;

    present?: {
      first: string;
      second: string;
      third: string;
      nonThird: string;
      firstPlural: string;
    };
  };

  pedagogy?: {
    unlockedAtStructureLevel?: number;

    unlockedAtVocabularyLevel?: number;

    preferredTopics?: Topic[];

    preferredObjectNumber?: ObjectNumber;
  };

  active?: boolean;

  audioUrl?: string;
};

export type AdjectiveEntry = {
  id: string;

  base: string;

  translation?: string;

  audioUrl?: string;

  unlockedAtVocabularyLevel: number;

  semantics: {
    type?: AdjectiveSemanticType;

    /**
     * Subject types this adjective may describe.
     * Prefer this field going forward.
     */
    applicableTo?: SubjectSemanticType[];

    /**
     * Legacy synonym of `applicableTo` (already present on many DB docs).
     * Engine treats `applicableTo ?? appliesTo` as the compatibility list.
     */
    appliesTo?: NounSemanticType[];

    /**
     * Semantic Ontology v2: when true, bare predicative is blocked
     * (e.g. "is favorite"). Optional; absent means false for v1 docs.
     */
    requiresDeterminer?: boolean;
  };
};
