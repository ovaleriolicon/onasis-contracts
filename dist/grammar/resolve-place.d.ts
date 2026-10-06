import type { NounEntry, VerbEntry } from "../lexicon";
export type GoalRelation = "location" | "destination";
export declare function resolvePlace(place?: NounEntry, verb?: VerbEntry, goalRelation?: string): string;
