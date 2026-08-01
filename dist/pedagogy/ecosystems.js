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
        description: "Core feelings and states with to be.",
        communicativeGoal: "I can talk about how I feel.",
        active: true,
        members: {
            subjects: [
                { type: "subject", lemma: "I" },
                { type: "subject", lemma: "You" },
                { type: "subject", lemma: "He" },
                { type: "subject", lemma: "She" },
            ],
            verbs: [{ type: "verb", lemma: "be" }],
            nouns: [],
            adjectives: [
                { type: "adjective", lemma: "tired" },
                { type: "adjective", lemma: "busy" },
                { type: "adjective", lemma: "happy" },
                { type: "adjective", lemma: "sad" },
                { type: "adjective", lemma: "sick" },
                { type: "adjective", lemma: "ready" },
            ],
        },
    },
    {
        id: "eco-food-1",
        familyId: "food",
        tier: 1,
        order: 1,
        name: "Food 1",
        description: "Basic foods I can say I like.",
        communicativeGoal: "I can say what food I like.",
        active: true,
        members: {
            subjects: [
                { type: "subject", lemma: "I" },
                { type: "subject", lemma: "We" },
                { type: "subject", lemma: "They" },
            ],
            verbs: [{ type: "verb", lemma: "like" }],
            nouns: [
                { type: "noun", lemma: "pizza" },
                { type: "noun", lemma: "burger" },
                { type: "noun", lemma: "apple" },
                { type: "noun", lemma: "banana" },
                { type: "noun", lemma: "coffee" },
            ],
            adjectives: [],
        },
    },
    {
        id: "eco-places-1",
        familyId: "places",
        tier: 1,
        order: 2,
        name: "Places 1",
        description: "Everyday places I can say I go to.",
        communicativeGoal: "I can say where I go.",
        active: true,
        members: {
            subjects: [
                { type: "subject", lemma: "I" },
                { type: "subject", lemma: "You" },
                { type: "subject", lemma: "We" },
                { type: "subject", lemma: "Alex" },
            ],
            verbs: [{ type: "verb", lemma: "go" }],
            nouns: [
                { type: "noun", lemma: "school" },
                { type: "noun", lemma: "park" },
                { type: "noun", lemma: "house" },
            ],
            adjectives: [],
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
