export type ConstructionSlot = "subject" | "be" | "negation" | "adjective" | "question-order";
export type ConstructionStep = {
    type: "question";
    question: string;
    answer: string;
} | {
    type: "multiple-choice";
    question: string;
    options: string[];
    correctAnswer: string;
    builderToken: string;
    slot: ConstructionSlot;
} | {
    type: "rule";
    text: string;
} | {
    type: "result";
    text: string;
};
