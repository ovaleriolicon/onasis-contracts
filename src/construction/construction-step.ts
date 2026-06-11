// construction-step.ts

export type ConstructionSlot =
  | "subject"
  | "be"
  | "verb"
  | "object"
  | "negation"
  | "adjective"
  | "auxiliary"
  | "question-order";

export type ConstructionState = {
  subject: string;
  be: string;
  auxiliary: string;
  verb: string;
  object: string;
  adjective: string;
  negation: string;
  questionOrder: boolean;
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
      type: "rule";
      text: string;
    }
  | {
      type: "result";
      text: string;
    };
