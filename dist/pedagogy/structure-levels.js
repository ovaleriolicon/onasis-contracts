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
        key: "to-be-past-affirmative",
        name: "To Be Past Affirmative",
    },
    {
        level: 6,
        key: "to-be-past-negative",
        name: "To Be Past Negative",
    },
    {
        level: 7,
        key: "past-actions-affirmative",
        name: "Past Actions Affirmative",
    },
    {
        level: 8,
        key: "past-actions-negative",
        name: "Past Actions Negative",
    },
];
function getStructureLevel(level) {
    return exports.structureLevels.find((item) => item.level === level);
}
