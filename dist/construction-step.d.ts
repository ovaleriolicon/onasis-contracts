export type ConstructionStep = {
    type: "question";
    question: string;
    answer: string;
} | {
    type: "rule";
    text: string;
} | {
    type: "result";
    text: string;
};
