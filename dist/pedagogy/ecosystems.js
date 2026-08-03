"use strict";
// pedagogy/ecosystems.ts
//
// Static editorial catalog of Ecosystems.
// Seed examples for concept validation — not wired to generation or unlocks.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ecosystems = void 0;
exports.getEcosystem = getEcosystem;
exports.getEcosystemsSorted = getEcosystemsSorted;
exports.getEcosystemsByFamily = getEcosystemsByFamily;
exports.ecosystems = [
    {
        id: "eco-how-i-feel-1",
        familyId: "how-i-feel",
        tier: 1,
        order: 0,
        name: "How I Feel 1",
        description: "Core feelings and personal states with the verb 'be'.",
        communicativeGoal: "I can describe how people feel and are.",
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
            nouns: [],
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
];
function getEcosystem(id) {
    return exports.ecosystems.find((eco) => eco.id === id);
}
function getEcosystemsSorted() {
    return [...exports.ecosystems].sort((a, b) => a.order - b.order);
}
function getEcosystemsByFamily(familyId) {
    return getEcosystemsSorted().filter((eco) => eco.familyId === familyId);
}
