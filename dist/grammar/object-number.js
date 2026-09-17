"use strict";
// grammar/object-number.ts
//
// Two concepts, composed in Grammar:
//
// A) Reading (resolved outside Grammar by resolveObjectNumber):
//      Function.objectNumber
//        ?? Verb.pedagogy.preferredObjectNumber
//        ?? "singular"
//    "generic"  = kind-reading
//    "singular" = instance
//    "plural"   = reserved as a reading (not a noun lexical number)
//
// B) Noun lexical number (NounEntry.pedagogy.preferredObjectNumber):
//      unset | "singular" | "plural"
//    Nouns must not store "generic". That value is a reading, not a
//    typical-number flag.
//
// Grammar (resolveDeterminer) receives the reading and the noun:
// - reading "generic" → kind-reading: countable → bare plural; uncountable → bare
// - instance + noun lexical "plural" + countable → bare plural
// - reading "singular" + countable → never `none` (missing/`none` → indefinite;
//   explicit valid defaultDeterminer preserved); uncountable uses
//   defaultDeterminer (bare `none` stays bare)
// - reading "plural" (reserved) → noun.defaultDeterminer unless lexical plural applies
Object.defineProperty(exports, "__esModule", { value: true });
exports.OBJECT_NUMBER_LABELS = exports.NOUN_LEXICAL_OBJECT_NUMBERS = exports.OBJECT_NUMBERS = void 0;
exports.isObjectNumber = isObjectNumber;
exports.isNounLexicalObjectNumber = isNounLexicalObjectNumber;
exports.OBJECT_NUMBERS = ["generic", "singular", "plural"];
exports.NOUN_LEXICAL_OBJECT_NUMBERS = ["singular", "plural"];
exports.OBJECT_NUMBER_LABELS = {
    generic: "Genérico",
    singular: "Singular",
    plural: "Plural",
};
function isObjectNumber(value) {
    return (value === "generic" || value === "singular" || value === "plural");
}
function isNounLexicalObjectNumber(value) {
    return value === "singular" || value === "plural";
}
