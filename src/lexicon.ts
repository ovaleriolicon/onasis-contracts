// packages/contracts/lexicon.ts

import type {
  NounSemanticType,
  SubjectSemanticType,
  VerbSemanticType,
  AdjectiveSemanticType,
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

    requiresAnimateSubject?: boolean;

    requiresPreposition?: string;

    objectTypes?: NounSemanticType[];

    placeTypes?: NounSemanticType[];

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
  };
};
