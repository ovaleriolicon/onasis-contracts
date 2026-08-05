// pedagogy/ecosystems.ts
//
// Static editorial catalog of Ecosystems.
// Seed examples for concept validation — not wired to generation or unlocks.

import type { Ecosystem } from "./ecosystem";

export const ecosystems: Ecosystem[] = [
  {
    id: "eco-how-i-feel-1",
    familyId: "how-i-feel",
    tier: 1,
    order: 0,
    name: "How I Feel 1",
    description: "Core feelings and personal states with the verb 'be'.",
    communicativeGoal: "I can describe how people feel and are.",
    functions: ["describe", "ask-information"],
    active: true,

    members: {
      subjects: [
        { type: "subject", lemma: "I" },
        { type: "subject", lemma: "You" },
        { type: "subject", lemma: "He" },
        { type: "subject", lemma: "She" },
        { type: "subject", lemma: "We" },
        { type: "subject", lemma: "They" },
        { type: "subject", lemma: "Alex" },
        { type: "subject", lemma: "Emma" },
      ],

      verbs: [{ type: "verb", lemma: "be" }],

      nouns: [],

      adjectives: [
        { type: "adjective", lemma: "happy" },
        { type: "adjective", lemma: "sad" },
        { type: "adjective", lemma: "busy" },
        { type: "adjective", lemma: "tired" },
        { type: "adjective", lemma: "sick" },
        { type: "adjective", lemma: "ready" },
      ],
    },
  },

  {
    id: "eco-people-around-me-1",
    familyId: "people-around-me",
    tier: 1,
    order: 1,
    name: "People Around Me 1",
    description: "Describing people around me with the verb 'be'.",
    communicativeGoal: "I can describe people around me.",
    functions: ["describe", "ask-information"],
    active: true,

    members: {
      subjects: [
        { type: "subject", lemma: "I" },
        { type: "subject", lemma: "You" },
        { type: "subject", lemma: "He" },
        { type: "subject", lemma: "She" },
        { type: "subject", lemma: "We" },
        { type: "subject", lemma: "They" },
        { type: "subject", lemma: "Alex" },
        { type: "subject", lemma: "Emma" },
        { type: "subject", lemma: "My mom" },
        { type: "subject", lemma: "My dad" },
        { type: "subject", lemma: "My friend" },
        { type: "subject", lemma: "The teacher" },
        { type: "subject", lemma: "The doctor" },
        { type: "subject", lemma: "The student" },
      ],

      verbs: [{ type: "verb", lemma: "be" }],

      nouns: [
        { type: "noun", lemma: "mom" },
        { type: "noun", lemma: "dad" },
        { type: "noun", lemma: "friend" },
        { type: "noun", lemma: "teacher" },
        { type: "noun", lemma: "doctor" },
        { type: "noun", lemma: "student" },
      ],

      adjectives: [
        { type: "adjective", lemma: "kind" },
        { type: "adjective", lemma: "nice" },
        { type: "adjective", lemma: "friendly" },
        { type: "adjective", lemma: "smart" },
        { type: "adjective", lemma: "funny" },
        { type: "adjective", lemma: "busy" },
      ],
    },
  },
  {
    id: "eco-food-1",
    familyId: "food",
    tier: 1,
    order: 3,
    name: "Food 1",
    description: "Talking about everyday food and drinks.",
    communicativeGoal: "I can talk about food and drinks.",
    functions: [
      "describe",
      "express-preference",
      "express-desire",
      "talk-about-activities",
      "ask-information",
    ],
    active: true,

    members: {
      subjects: [
        { type: "subject", lemma: "I" },
        { type: "subject", lemma: "You" },

        { type: "subject", lemma: "My mom" },
        { type: "subject", lemma: "My friend" },

        { type: "subject", lemma: "The pizza" },
        { type: "subject", lemma: "The burger" },
        { type: "subject", lemma: "The salad" },
        { type: "subject", lemma: "The coffee" },
      ],

      verbs: [
        { type: "verb", lemma: "like" },
        { type: "verb", lemma: "eat" },
        { type: "verb", lemma: "drink" },
        { type: "verb", lemma: "want" },
        { type: "verb", lemma: "be" },
      ],

      nouns: [
        { type: "noun", lemma: "pizza" },
        { type: "noun", lemma: "burger" },
        { type: "noun", lemma: "apple" },
        { type: "noun", lemma: "banana" },
        { type: "noun", lemma: "salad" },
        { type: "noun", lemma: "rice" },
        { type: "noun", lemma: "water" },
        { type: "noun", lemma: "coffee" },
        { type: "noun", lemma: "juice" },
        { type: "noun", lemma: "mom" },
        { type: "noun", lemma: "friend" },
      ],

      adjectives: [
        { type: "adjective", lemma: "good" },
        { type: "adjective", lemma: "delicious" },
        { type: "adjective", lemma: "hot" },
        { type: "adjective", lemma: "cold" },
      ],
    },
  },
  {
    id: "eco-pets-1",
    familyId: "pets",
    tier: 1,
    order: 4,

    name: "Pets 1",

    description: "Talking about pets and animals.",

    communicativeGoal: "I can talk about pets.",

    functions: [
      "describe",
      "express-preference",
      "express-desire",
      "express-possession",
      "ask-information",
    ],

    active: true,

    members: {
      subjects: [
        { type: "subject", lemma: "I" },
        { type: "subject", lemma: "You" },

        { type: "subject", lemma: "My dog" },
        { type: "subject", lemma: "My cat" },

        { type: "subject", lemma: "The dog" },
        { type: "subject", lemma: "The cat" },
        { type: "subject", lemma: "The bird" },
        { type: "subject", lemma: "The fish" },
      ],

      verbs: [
        { type: "verb", lemma: "have" },
        { type: "verb", lemma: "like" },
        { type: "verb", lemma: "want" },
        { type: "verb", lemma: "be" },
      ],

      nouns: [
        { type: "noun", lemma: "dog" },
        { type: "noun", lemma: "cat" },
        { type: "noun", lemma: "bird" },
        { type: "noun", lemma: "fish" },
        { type: "noun", lemma: "food" },
        { type: "noun", lemma: "water" },
        { type: "noun", lemma: "ball" },
        { type: "noun", lemma: "toy" },
      ],

      adjectives: [
        { type: "adjective", lemma: "cute" },
        { type: "adjective", lemma: "friendly" },
        { type: "adjective", lemma: "happy" },
        { type: "adjective", lemma: "hungry" },
      ],
    },
  },

  {
    id: "eco-work-1",
    familyId: "work",
    tier: 1,
    order: 5,

    name: "Work 1",

    description: "Talking about work and the office.",

    communicativeGoal: "I can talk about my work.",

    functions: [
      "describe",
      "express-preference",
      "express-need",
      "express-possession",
      "talk-about-activities",
      "ask-information",
    ],

    active: true,

    members: {
      subjects: [
        { type: "subject", lemma: "I" },
        { type: "subject", lemma: "You" },

        { type: "subject", lemma: "My boss" },
        { type: "subject", lemma: "My manager" },
        { type: "subject", lemma: "My coworker" },

        { type: "subject", lemma: "The customer" },
        { type: "subject", lemma: "The client" },
      ],

      verbs: [
        { type: "verb", lemma: "be" },
        { type: "verb", lemma: "have" },
        { type: "verb", lemma: "work" },
        { type: "verb", lemma: "need" },
        { type: "verb", lemma: "like" },
      ],

      nouns: [
        { type: "noun", lemma: "job" },
        { type: "noun", lemma: "office" },
        { type: "noun", lemma: "meeting" },
        { type: "noun", lemma: "computer" },
        { type: "noun", lemma: "email" },
        { type: "noun", lemma: "report" },
        { type: "noun", lemma: "project" },
        { type: "noun", lemma: "schedule" },
        { type: "noun", lemma: "boss" },
        { type: "noun", lemma: "manager" },
        { type: "noun", lemma: "coworker" },
        { type: "noun", lemma: "customer" },
        { type: "noun", lemma: "client" },
      ],

      adjectives: [
        { type: "adjective", lemma: "busy" },
        { type: "adjective", lemma: "ready" },
        { type: "adjective", lemma: "available" },
        { type: "adjective", lemma: "important" },
      ],
    },
  },

  {
    id: "eco-travel-1",
    familyId: "travel",
    tier: 1,
    order: 6,

    name: "Travel 1",

    description: "Talking while traveling.",

    communicativeGoal: "I can travel using English.",

    functions: [
      "describe",
      "express-desire",
      "express-need",
      "express-possession",
      "talk-about-activities",
      "ask-information",
    ],

    active: true,

    members: {
      subjects: [
        { type: "subject", lemma: "I" },
        { type: "subject", lemma: "You" },

        { type: "subject", lemma: "The tourist" },
        { type: "subject", lemma: "The traveler" },
      ],

      verbs: [
        { type: "verb", lemma: "be" },
        { type: "verb", lemma: "have" },
        { type: "verb", lemma: "need" },
        { type: "verb", lemma: "want" },
        { type: "verb", lemma: "go" },
      ],

      nouns: [
        { type: "noun", lemma: "hotel" },
        { type: "noun", lemma: "passport" },
        { type: "noun", lemma: "ticket" },
        { type: "noun", lemma: "airport" },
        { type: "noun", lemma: "room" },
        { type: "noun", lemma: "map" },
        { type: "noun", lemma: "taxi" },
        { type: "noun", lemma: "reservation" },
        { type: "noun", lemma: "tourist" },
        { type: "noun", lemma: "traveler" },
      ],

      adjectives: [
        { type: "adjective", lemma: "ready" },
        { type: "adjective", lemma: "open" },
        { type: "adjective", lemma: "closed" },
        { type: "adjective", lemma: "available" },
      ],
    },
  },

  {
    id: "eco-daily-life-1",
    familyId: "daily-life",
    tier: 1,
    order: 7,

    name: "Daily Life 1",

    description: "Talking about everyday life.",

    communicativeGoal: "I can talk about my daily life.",

    functions: [
      "describe",
      "express-preference",
      "express-need",
      "express-possession",
      "talk-about-activities",
      "ask-information",
    ],

    active: true,

    members: {
      subjects: [
        { type: "subject", lemma: "I" },
        { type: "subject", lemma: "You" },

        { type: "subject", lemma: "My friend" },
        { type: "subject", lemma: "My family" },

        { type: "subject", lemma: "The boy" },
        { type: "subject", lemma: "The girl" },
      ],

      verbs: [
        { type: "verb", lemma: "be" },
        { type: "verb", lemma: "have" },
        { type: "verb", lemma: "need" },
        { type: "verb", lemma: "like" },
        { type: "verb", lemma: "go" },
      ],

      nouns: [
        { type: "noun", lemma: "house" },
        { type: "noun", lemma: "school" },
        { type: "noun", lemma: "work" },
        { type: "noun", lemma: "car" },
        { type: "noun", lemma: "phone" },
        { type: "noun", lemma: "coffee" },
        { type: "noun", lemma: "breakfast" },
        { type: "noun", lemma: "backpack" },
        { type: "noun", lemma: "friend" },
        { type: "noun", lemma: "family" },
        { type: "noun", lemma: "boy" },
        { type: "noun", lemma: "girl" },
      ],

      adjectives: [
        { type: "adjective", lemma: "busy" },
        { type: "adjective", lemma: "ready" },
        { type: "adjective", lemma: "late" },
        { type: "adjective", lemma: "tired" },
      ],
    },
  },

  {
    id: "eco-video-games-1",
    familyId: "video-games",
    tier: 1,
    order: 8,
    name: "Video Games 1",
    description: "Talking about video games and gaming.",
    communicativeGoal: "I can talk about video games.",
    functions: [
      "describe",
      "express-preference",
      "express-desire",
      "express-need",
      "express-possession",
      "talk-about-activities",
      "report-result",
      "ask-information",
    ],
    active: true,

    members: {
      subjects: [
        { type: "subject", lemma: "I" },
        { type: "subject", lemma: "You" },

        { type: "subject", lemma: "My friend" },
        { type: "subject", lemma: "My brother" },
        { type: "subject", lemma: "My sister" },

        { type: "subject", lemma: "The boy" },
        { type: "subject", lemma: "The girl" },

        { type: "subject", lemma: "The player" },
        { type: "subject", lemma: "The game" },
      ],

      verbs: [
        { type: "verb", lemma: "be" },
        { type: "verb", lemma: "have" },
        { type: "verb", lemma: "like" },
        { type: "verb", lemma: "need" },
        { type: "verb", lemma: "want" },

        { type: "verb", lemma: "play" },
        { type: "verb", lemma: "use" },
        { type: "verb", lemma: "choose" },
        { type: "verb", lemma: "win" },
        { type: "verb", lemma: "lose" },
      ],

      nouns: [
        { type: "noun", lemma: "game" },
        { type: "noun", lemma: "video game" },
        { type: "noun", lemma: "controller" },
        { type: "noun", lemma: "computer" },
        { type: "noun", lemma: "keyboard" },
        { type: "noun", lemma: "mouse" },
        { type: "noun", lemma: "screen" },
        { type: "noun", lemma: "level" },
        { type: "noun", lemma: "team" },
        { type: "noun", lemma: "player" },
      ],

      adjectives: [
        { type: "adjective", lemma: "fun" },
        { type: "adjective", lemma: "easy" },
        { type: "adjective", lemma: "hard" },
        { type: "adjective", lemma: "fast" },
        { type: "adjective", lemma: "slow" },
        { type: "adjective", lemma: "new" },
        { type: "adjective", lemma: "old" },
        { type: "adjective", lemma: "good" },
        { type: "adjective", lemma: "bad" },
        { type: "adjective", lemma: "favorite" },
      ],
    },
  },
];

export function getEcosystem(id: string): Ecosystem | undefined {
  return ecosystems.find((eco) => eco.id === id);
}

export function getEcosystemsSorted(): Ecosystem[] {
  return [...ecosystems].sort((a, b) => a.order - b.order);
}

export function getEcosystemsByFamily(familyId: string): Ecosystem[] {
  return getEcosystemsSorted().filter((eco) => eco.familyId === familyId);
}
