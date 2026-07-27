"use strict";
// grammar/object-number.ts
//
// Número gramatical preferido para el objeto de un verbo
// (VerbEntry.pedagogy.preferredObjectNumber). Incluye "plural" para
// alinear el contrato con el enum real de Mongoose (models/VocabularyItem.js)
// y con las opciones que el Content Editor ya ofrecía en el frontend.
Object.defineProperty(exports, "__esModule", { value: true });
exports.OBJECT_NUMBER_LABELS = exports.OBJECT_NUMBERS = void 0;
exports.OBJECT_NUMBERS = ["generic", "singular", "plural"];
exports.OBJECT_NUMBER_LABELS = {
    generic: "Genérico",
    singular: "Singular",
    plural: "Plural",
};
