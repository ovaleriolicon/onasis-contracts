// construction-step.ts

export type ConstructionStep =
  | {
      type: "question";
      question: string;
      answer: string;
    }
  | {
      type: "explanation";
      text: string;
    }
  | {
      type: "result";
      text: string;
    };
