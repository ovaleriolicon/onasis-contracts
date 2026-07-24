// packages/contracts/lexicon.ts

export type SemanticType =
  | "person"
  | "object"
  | "place"
  | "abstract"
  | "state"
  | "food"
  | "beverage"
  | "activity"
  | "concept"
  | "event"
  | "movement";

export type DeterminerPolicy =
  | "none"
  | "indefinite"
  | "definite"
  | "plural"
  | "some"
  | "any";

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
    type: "person";

    animate: true;
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
    type: SemanticType;

    animate: boolean;
  };

  pedagogy?: {
    unlockedAtVocabularyLevel: number;

    interests?: string[];

    topics?: string[];
  };
};

export type VerbEntry = {
  base: string;

  behavior: "to-be" | "no-to-be";

  complements: ("object" | "place" | "adjective")[];

  transitive: boolean;

  semantics: {
    type: SemanticType;

    requiresAnimateSubject?: boolean;

    requiresPreposition?: string;

    objectTypes?: SemanticType[];

    placeTypes?: SemanticType[];

    adjectiveTypes?: SemanticType[];
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

    preferredTopics?: string[];

    preferredObjectNumber?: "generic" | "singular";
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
    type?: "state" | "quality";

    appliesTo?: SemanticType[];
  };
};
