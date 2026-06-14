// construction-step.ts

export type ConstructionSlot =
  | "subject"
  | "be"
  | "verb"
  | "object"
  | "place"
  | "negation"
  | "adjective"
  | "auxiliary"
  | "moved-be";

export type ConstructionState = {
  subject: string;
  be: string;
  movedBe: string;
  auxiliary: string;
  verb: string;
  object: string;
  place: string;
  adjective: string;
  negation: string;
};

export type ConstructionStep =
  | {
      type: "question";
      question: string;
      answer: string;
    }
  | {
      type: "multiple-choice";
      question: string;

      options: string[];

      correctAnswer: string;

      builderToken: string;

      slot: ConstructionSlot;
    }
  | {
      type: "explanation";
      text: string;
    }
  | {
      type: "rule";
      text: string;
    }
  | {
      type: "result";
      text: string;
    }
  | {
      type: "transition";
      text: string;
    };
