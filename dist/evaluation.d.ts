import type { Scene } from "./scene";
import type { ErrorId } from "./errors";
export type EvaluateInput = {
    scene: Scene;
    answer: string;
};
export type ParsedInput = {
    subject?: string;
    auxiliary?: string;
    verb?: string;
    object?: string;
    adjective?: string;
    be?: string;
    negation?: boolean;
    tokens: string[];
};
export type EvaluatorContext = {
    scene: Scene;
    parsed: ParsedInput;
    normalizedAnswer: string;
    correctSentence: string;
};
export type DetectedError = {
    errorId: ErrorId;
};
export type CheckResult = {
    correct: boolean;
    detectedErrors: DetectedError[];
};
export type DebugCheckResult = {
    name: string;
    correct: boolean;
    detectedErrors: DetectedError[];
};
export type CheckFunction = (context: EvaluatorContext) => CheckResult;
export type ValidationResult = {
    correct: true;
} | {
    correct: false;
    detectedErrors: DetectedError[];
};
export type EvaluateResult = {
    success: boolean;
    correct: boolean;
    detectedErrors: DetectedError[];
    correctSentence: string;
    feedback: string;
};
export type EvaluateDebugResult = {
    success: boolean;
    correct: boolean;
    parsed: ParsedInput;
    checks: DebugCheckResult[];
    detectedErrors: DetectedError[];
    primaryError: DetectedError | null;
    correctSentence: string;
    feedback: string;
};
