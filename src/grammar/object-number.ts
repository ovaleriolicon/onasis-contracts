// grammar/object-number.ts
//
// Número gramatical preferido para el objeto de un verbo
// (VerbEntry.pedagogy.preferredObjectNumber). Incluye "plural" para
// alinear el contrato con el enum real de Mongoose (models/VocabularyItem.js)
// y con las opciones que el Content Editor ya ofrecía en el frontend.

export const OBJECT_NUMBERS = ["generic", "singular", "plural"] as const;

export type ObjectNumber = (typeof OBJECT_NUMBERS)[number];

export const OBJECT_NUMBER_LABELS: Record<ObjectNumber, string> = {
  generic: "Genérico",
  singular: "Singular",
  plural: "Plural",
};
