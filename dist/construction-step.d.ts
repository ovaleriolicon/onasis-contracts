export type ConstructionStep = {
    type: "question";
    question: string;
    answer: string;
} | {
    type: "multiple-choice";
    question: string;
    options: string[];
    correctAnswer: string;
} | {
    type: "rule";
    text: string;
} | {
    type: "result";
    text: string;
};
