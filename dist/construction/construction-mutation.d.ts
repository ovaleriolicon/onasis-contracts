export type ConstructionMutation = "add-subject" | "add-be" | "add-verb" | "add-object" | "add-adjective" | "add-negation" | "convert-to-question" | "convert-to-past";
export type MutationStep = {
    mutation: ConstructionMutation;
    before: string;
    after: string;
    explanation?: string;
};
