"use strict";
// grammar/object-number.ts
//
// Object-number policy used by Grammar realization and by NLG resolution.
//
// Precedence (resolved outside Grammar):
//   Function.objectNumber
//     ?? Verb.pedagogy.preferredObjectNumber  (lexical default)
//     ?? "singular"
//
// Grammar (resolveDeterminer) only receives the final ObjectNumber:
// - "generic"  → kind-reading: countable → bare plural; uncountable → bare
// - "singular" → noun.grammar.defaultDeterminer (typically a/an)
// - "plural"   → reserved; currently falls through to noun.defaultDeterminer
Object.defineProperty(exports, "__esModule", { value: true });
exports.OBJECT_NUMBER_LABELS = exports.OBJECT_NUMBERS = void 0;
exports.OBJECT_NUMBERS = ["generic", "singular", "plural"];
exports.OBJECT_NUMBER_LABELS = {
    generic: "Genérico",
    singular: "Singular",
    plural: "Plural",
};
