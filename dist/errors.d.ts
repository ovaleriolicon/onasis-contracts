export type ErrorId = "double_subject" | "present_simple_third_person_s" | "present_simple_third_person_doesnt" | "doesnt_with_non_third_person" | "missing_dont_doesnt" | "doesnt_with_s_verb" | "wrong_be_form" | "missing_be" | "be_with_do" | "wrong_be_negation" | "missing_object" | "missing_negation" | "unexpected_negation" | "missing_question_auxiliary" | "question_word_order" | "question_with_conjugated_main_verb";
export type EngineError = {
    errorId: ErrorId;
    name: string;
    rule: string;
    template: string;
    fix: string;
    priority: number;
    feedback: {
        text: string;
        audio: {
            url: string;
        };
    };
};
