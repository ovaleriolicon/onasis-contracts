// semantics/noun-semantic-type.ts
//
// Categorías semánticas de sustantivos (persona, objeto, lugar, comida,
// etc.). Vocabulario cerrado basado en los valores reales encontrados en
// la colección vocabulary_items (documentos type: "noun").
//
// Para agregar una categoría nueva: agregarla aquí. Nunca declarar una
// lista propia en el backend, el frontend o el motor de juego.

export const NOUN_SEMANTIC_TYPES = [
  "person",
  "object",
  "place",
  "animal",
  "abstract",
  "food",
  "beverage",
  "concept",
  "event",
  "activity",
] as const;

export type NounSemanticType = (typeof NOUN_SEMANTIC_TYPES)[number];

/** Subject semantic types reuse the shared noun taxonomy (no parallel list). */
export type SubjectSemanticType = NounSemanticType;

export const NOUN_SEMANTIC_TYPE_LABELS: Record<NounSemanticType, string> = {
  person: "Persona",
  object: "Objeto",
  place: "Lugar",
  animal: "Animal",
  abstract: "Abstracto",
  food: "Comida",
  beverage: "Bebida",
  concept: "Concepto",
  event: "Evento",
  activity: "Actividad",
};
