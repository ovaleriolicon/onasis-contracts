"use strict";
// semantics/verb-semantic-type.ts
//
// Categorías semánticas de verbos. Se declaran desde ahora las 12
// categorías previstas (decisión arquitectónica confirmada), aunque hoy
// solo algunas tengan datos reales en vocabulary_items. El resto queda
// reservado para cuando el vocabulario crezca hacia ellas.
//
// Para agregar una categoría nueva: agregarla aquí. Nunca declarar una
// lista propia en el backend, el frontend o el motor de juego.
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERB_SEMANTIC_TYPE_LABELS = exports.VERB_SEMANTIC_TYPES = void 0;
exports.VERB_SEMANTIC_TYPES = [
    "state",
    "movement",
    "consumption",
    "possession",
    "preference",
    "necessity",
    "communication",
    "cognition",
    "perception",
    "creation",
    "change",
    "existence",
];
exports.VERB_SEMANTIC_TYPE_LABELS = {
    state: "Estado",
    movement: "Movimiento",
    consumption: "Consumo",
    possession: "Posesión",
    preference: "Preferencia",
    necessity: "Necesidad",
    communication: "Comunicación",
    cognition: "Cognición",
    perception: "Percepción",
    creation: "Creación",
    change: "Cambio",
    existence: "Existencia",
};
