// pedagogy/curriculum-stages.ts
//
// Static catalog of CurriculumStages.
// Pedagogical truth for the student journey; does not replace structureLevels
// or VocabularyItem unlock numbers.
//
// Coverage rule: every Structure Level in structureLevels has exactly one
// entry Stage (structureLevel === that level). Vocabulary expands horizontally
// after V5 rather than inventing new Patterns.

import { getStructureLevel, structureLevels } from "./structure-levels";
import type {
  CurriculumStage,
  CurriculumStageValidationIssue,
  CurriculumStageValidationResult,
} from "./curriculum-stage";

export const curriculumStages: CurriculumStage[] = [
  {
    id: "stage-how-i-am",
    order: 0,
    name: "How I Am",
    description:
      "First stage: produce complete to-be statements about personal state.",
    structureLevel: 0,
    vocabularyLevel: 0,
    communicativeGoal: "I can talk about how I feel / how I am.",
    rationale:
      "Opens the course with the smallest complete sentence: identity and state with to-be.",
    examples: ["I am tired.", "She is busy.", "We are ready."],
    completionCriteria:
      "Student produces affirmative to-be + state adjective with correct am/are/is.",
    estimatedLessons: 3,
  },
  {
    id: "stage-what-i-think",
    order: 1,
    name: "What I Think",
    description:
      "Evaluate people, things, and experiences with opinion adjectives on to-be.",
    structureLevel: 1,
    vocabularyLevel: 1,
    communicativeGoal: "I can evaluate people, things, and experiences.",
    rationale:
      "Moves from inner state to simple opinions, still on the same to-be frame, now with names.",
    examples: ["It is fun.", "She is nice.", "The class is interesting."],
    completionCriteria:
      "Student uses opinion adjectives naturally with to-be and name/pronoun subjects.",
    estimatedLessons: 3,
    previousStageId: "stage-how-i-am",
  },
  {
    id: "stage-how-it-looks",
    order: 2,
    name: "How It Looks",
    description:
      "Describe appearance and physical condition; consolidates to-be including negation practice at Structure 2.",
    structureLevel: 2,
    vocabularyLevel: 2,
    communicativeGoal: "I can describe appearance and condition.",
    rationale:
      "Completes the to-be present runway with physical description and first negation.",
    examples: [
      "He is tall.",
      "The phone is broken.",
      "The house is not clean.",
    ],
    completionCriteria:
      "Student describes people/things with physical adjectives and handles basic to-be negation.",
    estimatedLessons: 4,
    previousStageId: "stage-what-i-think",
  },
  {
    id: "stage-likes-and-places",
    order: 3,
    name: "Likes and Places",
    description:
      "First action stage: preferences with like and movement with go (Structure 3 patterns).",
    structureLevel: 3,
    vocabularyLevel: 3,
    communicativeGoal: "I can say what I like and where I go.",
    rationale:
      "First step beyond to-be: object and place actions enter together because Structure 3 opens both patterns.",
    examples: ["I like pizza.", "I go to school.", "She likes music."],
    completionCriteria:
      "Student produces affirmative like + object and go + place with correct 3sg -s when needed.",
    estimatedLessons: 5,
    previousStageId: "stage-how-it-looks",
  },
  {
    id: "stage-what-i-need",
    order: 4,
    name: "What I Need",
    description:
      "Express necessity with need on the verb-object frame; reuses prior lexicon.",
    structureLevel: 4,
    vocabularyLevel: 4,
    communicativeGoal: "I can say what I need.",
    rationale:
      "Adds a second practical object verb (need) and practices negation on the action frame.",
    examples: ["I need a phone.", "She needs a book.", "We need water."],
    completionCriteria:
      "Student uses need + practical objects/roles; negation available when Structure allows.",
    estimatedLessons: 4,
    previousStageId: "stage-likes-and-places",
  },
  {
    id: "stage-more-places",
    order: 5,
    name: "More Places",
    description:
      "Expand place vocabulary for richer go practice without introducing a new verb.",
    structureLevel: 5,
    vocabularyLevel: 5,
    communicativeGoal: "I can talk about more places I go.",
    rationale:
      "Horizontal expansion: same go + place frame, richer places, and present questions.",
    examples: [
      "I go to the gym.",
      "She goes to the library.",
      "Do you go to the beach?",
    ],
    completionCriteria:
      "Student uses an expanded place set with go; questions when Structure 5 is active.",
    estimatedLessons: 3,
    previousStageId: "stage-what-i-need",
  },

  // -------------------------------------------------------------------------
  // Past runway (Structure 6–10) — reuse V5 lexicon; no new Patterns
  // -------------------------------------------------------------------------
  {
    id: "stage-how-things-were",
    order: 6,
    name: "How Things Were",
    description:
      "Look back at people and things with past to-be and known adjectives.",
    structureLevel: 6,
    vocabularyLevel: 5,
    communicativeGoal: "I can say how people and things were.",
    rationale:
      "First past step: reuse the adjective world from earlier stages with was/were, before past actions.",
    examples: [
      "I was tired.",
      "She was busy.",
      "The house was clean.",
    ],
    completionCriteria:
      "Student produces affirmative past to-be + familiar adjectives with correct was/were.",
    estimatedLessons: 3,
    previousStageId: "stage-more-places",
  },
  {
    id: "stage-what-wasnt-true",
    order: 7,
    name: "What Wasn't True",
    description:
      "Deny past states: how people and things were not.",
    structureLevel: 7,
    vocabularyLevel: 5,
    communicativeGoal: "I can say how people and things were not.",
    rationale:
      "Mirrors the present negation step, now in the past, still on to-be + known adjectives.",
    examples: [
      "I was not ready.",
      "He was not sick.",
      "The phone was not broken.",
    ],
    completionCriteria:
      "Student produces negative past to-be statements with familiar adjectives.",
    estimatedLessons: 3,
    previousStageId: "stage-how-things-were",
  },
  {
    id: "stage-what-i-did",
    order: 8,
    name: "What I Did",
    description:
      "Tell simple past actions and places with the verbs already known (like, go, need).",
    structureLevel: 8,
    vocabularyLevel: 5,
    communicativeGoal: "I can say what I did and where I went.",
    rationale:
      "Past actions arrive after past to-be is stable; same object/place frames, past tense unlock.",
    examples: [
      "I liked pizza.",
      "I went to school.",
      "She needed a book.",
    ],
    completionCriteria:
      "Student produces affirmative past statements with known action verbs and complements.",
    estimatedLessons: 4,
    previousStageId: "stage-what-wasnt-true",
  },
  {
    id: "stage-what-i-didnt-do",
    order: 9,
    name: "What I Didn't Do",
    description:
      "Say what did not happen yesterday with familiar actions and places.",
    structureLevel: 9,
    vocabularyLevel: 5,
    communicativeGoal: "I can say what I didn't do.",
    rationale:
      "Completes the past-action polarity pair before opening past questions.",
    examples: [
      "I did not like coffee.",
      "She did not go to the gym.",
      "We did not need a key.",
    ],
    completionCriteria:
      "Student produces negative past action statements with known verbs.",
    estimatedLessons: 3,
    previousStageId: "stage-what-i-did",
  },
  {
    id: "stage-asking-about-yesterday",
    order: 10,
    name: "Asking About Yesterday",
    description:
      "Ask about past actions, places, and needs with yes/no questions.",
    structureLevel: 10,
    vocabularyLevel: 5,
    communicativeGoal: "I can ask about what happened yesterday.",
    rationale:
      "Closes the past runway the same way present questions closed the present-action runway.",
    examples: [
      "Did you go to school?",
      "Did she like the movie?",
      "Did they need water?",
    ],
    completionCriteria:
      "Student asks affirmative past questions with known verbs and complements.",
    estimatedLessons: 3,
    previousStageId: "stage-what-i-didnt-do",
  },

  // -------------------------------------------------------------------------
  // Progressive runway (Structure 11–12) — currently go + place only
  // -------------------------------------------------------------------------
  {
    id: "stage-what-people-are-doing",
    order: 11,
    name: "What People Are Doing",
    description:
      "Talk about actions happening now (present progressive on the place frame).",
    structureLevel: 11,
    vocabularyLevel: 5,
    communicativeGoal: "I can say what people are doing now.",
    rationale:
      "Introduces ongoing present after past questions. ENRICHMENT CANDIDATE: today only go + place can generate progressive; expand with more place verbs, scenes, and place nouns before adding Patterns.",
    examples: [
      "I am going to school.",
      "She is going to the park.",
      "They are going to the gym.",
    ],
    completionCriteria:
      "Student produces affirmative present-progressive place statements with available place verbs.",
    estimatedLessons: 3,
    previousStageId: "stage-asking-about-yesterday",
  },
  {
    id: "stage-what-was-happening",
    order: 12,
    name: "What Was Happening",
    description:
      "Talk about actions that were in progress in the past.",
    structureLevel: 12,
    vocabularyLevel: 5,
    communicativeGoal: "I can say what was happening.",
    rationale:
      "Past progressive mirrors the previous stage in the past. ENRICHMENT CANDIDATE: same thin go-only progressive surface; enrich vocabulary/scenes before new grammar.",
    examples: [
      "I was going to work.",
      "He was going to the store.",
      "We were going to the beach.",
    ],
    completionCriteria:
      "Student produces affirmative past-progressive place statements with available place verbs.",
    estimatedLessons: 3,
    previousStageId: "stage-what-people-are-doing",
  },

  // -------------------------------------------------------------------------
  // Placeholder Structure 13 — no engine support yet
  // -------------------------------------------------------------------------
  {
    id: "stage-whats-mine",
    order: 13,
    name: "What's Mine",
    description:
      "Reserved stage for talking about belongings and possession. Not implemented in the engine yet.",
    structureLevel: 13,
    vocabularyLevel: 5,
    communicativeGoal: "I can talk about what belongs to me and others.",
    rationale:
      "Keeps Structure 13 on the pedagogical map. PLACEHOLDER / ENRICHMENT CANDIDATE: possessive pronouns are not in patterns or generation yet; do not enroll practice until the engine supports them. Enrich with possession vocabulary when grammar lands.",
    examples: [
      "This is my phone.",
      "That is her book.",
      "Is this yours?",
    ],
    completionCriteria:
      "Deferred until possessive forms exist in the engine.",
    estimatedLessons: 0,
    previousStageId: "stage-what-was-happening",
  },
];

export function getCurriculumStage(
  id: string,
): CurriculumStage | undefined {
  return curriculumStages.find((stage) => stage.id === id);
}

export function getCurriculumStagesSorted(): CurriculumStage[] {
  return [...curriculumStages].sort((a, b) => a.order - b.order);
}

/**
 * Validates that every stage references known structure/vocabulary levels
 * and that ids / previousStageId links are consistent.
 *
 * @param knownVocabularyLevels — level numbers that exist in the vocab axis
 *   (e.g. from curriculum_levels or distinct unlock values in content).
 */
export function validateCurriculumStages(
  stages: readonly CurriculumStage[] = curriculumStages,
  knownVocabularyLevels?: readonly number[],
): CurriculumStageValidationResult {
  const issues: CurriculumStageValidationIssue[] = [];
  const ids = new Set<string>();
  const orders = new Set<number>();

  const vocabSet =
    knownVocabularyLevels != null
      ? new Set(knownVocabularyLevels)
      : null;

  const structureSet = new Set(structureLevels.map((s) => s.level));

  for (const stage of stages) {
    if (ids.has(stage.id)) {
      issues.push({
        stageId: stage.id,
        code: "duplicate_id",
        message: `Duplicate CurriculumStage id "${stage.id}".`,
      });
    }
    ids.add(stage.id);

    if (orders.has(stage.order)) {
      issues.push({
        stageId: stage.id,
        code: "duplicate_order",
        message: `Duplicate CurriculumStage order ${stage.order}.`,
      });
    }
    orders.add(stage.order);

    if (
      !structureSet.has(stage.structureLevel) ||
      getStructureLevel(stage.structureLevel) == null
    ) {
      issues.push({
        stageId: stage.id,
        code: "invalid_structure_level",
        message: `Stage "${stage.id}" references unknown structureLevel ${stage.structureLevel}.`,
      });
    }

    if (vocabSet) {
      if (!vocabSet.has(stage.vocabularyLevel)) {
        issues.push({
          stageId: stage.id,
          code: "invalid_vocabulary_level",
          message: `Stage "${stage.id}" references unknown vocabularyLevel ${stage.vocabularyLevel}.`,
        });
      }
    } else if (
      !Number.isInteger(stage.vocabularyLevel) ||
      stage.vocabularyLevel < 0
    ) {
      issues.push({
        stageId: stage.id,
        code: "invalid_vocabulary_level",
        message: `Stage "${stage.id}" has non-integer or negative vocabularyLevel ${stage.vocabularyLevel}.`,
      });
    }
  }

  for (const stage of stages) {
    if (!stage.previousStageId) continue;

    if (!ids.has(stage.previousStageId)) {
      issues.push({
        stageId: stage.id,
        code: "unknown_previous_stage",
        message: `Stage "${stage.id}" previousStageId "${stage.previousStageId}" does not exist.`,
      });
    }
  }

  const coveredStructure = new Set(stages.map((s) => s.structureLevel));
  for (const def of structureLevels) {
    if (!coveredStructure.has(def.level)) {
      issues.push({
        stageId: "*",
        code: "uncovered_structure_level",
        message: `Structure Level ${def.level} (${def.key}) has no CurriculumStage entry.`,
      });
    }
  }

  return {
    ok: issues.length === 0,
    issues,
  };
}
