"use strict";
// pedagogy/structure-levels.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.structureLevels = void 0;
exports.getStructureLevel = getStructureLevel;
exports.structureLevels = [
    {
        level: 0,
        key: "to-be-present-affirmative",
        name: "To Be Present Affirmative",
    },
    {
        level: 1,
        key: "to-be-with-names",
        name: "To Be With Names",
    },
    {
        level: 2,
        key: "to-be-present-negative",
        name: "To Be Present Negative",
    },
    {
        level: 3,
        key: "present-actions-affirmative",
        name: "Present Actions Affirmative",
    },
    {
        level: 4,
        key: "present-actions-negative",
        name: "Present Actions Negative",
    },
    {
        level: 5,
        key: "present-questions-affirmative",
        name: "Present Questions Affirmative",
    },
    {
        level: 6,
        key: "to-be-past-affirmative",
        name: "To Be Past Affirmative",
    },
    {
        level: 7,
        key: "to-be-past-negative",
        name: "To Be Past Negative",
    },
    {
        level: 8,
        key: "past-affirmative",
        name: "Past Affirmative",
    },
    {
        level: 9,
        key: "past-negative",
        name: "Past Negative",
    },
    {
        level: 10,
        key: "past-questions",
        name: "Past Questions",
    },
    {
        level: 11,
        key: "present-progressive",
        name: "Present Progressive",
    },
    {
        level: 12,
        key: "past-progressive",
        name: "Past Progressive",
    },
    {
        level: 13,
        key: "possessive-pronouns",
        name: "Possessive Pronouns",
        description: "Placeholder: Structure Level reserved for possessive pronouns. Not implemented in the engine yet.",
    },
];
function getStructureLevel(level) {
    return exports.structureLevels.find((item) => item.level === level);
}
