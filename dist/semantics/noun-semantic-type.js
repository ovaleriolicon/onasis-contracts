"use strict";
// semantics/noun-semantic-type.ts
//
// Categorías semánticas de sustantivos (persona, objeto, lugar, comida,
// etc.). Vocabulario cerrado basado en los valores reales encontrados en
// la colección vocabulary_items (documentos type: "noun").
//
// Para agregar una categoría nueva: agregarla aquí. Nunca declarar una
// lista propia en el backend, el frontend o el motor de juego.
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOUN_SEMANTIC_TYPE_LABELS = exports.NOUN_SEMANTIC_TYPES = void 0;
exports.NOUN_SEMANTIC_TYPES = [
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
];
exports.NOUN_SEMANTIC_TYPE_LABELS = {
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
